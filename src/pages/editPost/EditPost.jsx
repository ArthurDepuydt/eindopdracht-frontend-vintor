import "./EditPost.css";

import Select from "react-select";

import Sidebar from "../../components/sidebar/Sidebar";

import { useState, useEffect } from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import { useParams, useNavigate } from "react-router-dom";

const API_HEADERS = {
  "novi-education-project-id": import.meta.env.VITE_API_PROJECT_ID,
};
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DOMAIN = import.meta.env.VITE_API_DOMAIN;

function EditPost() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [actualUserId, setActualUserId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [errors, setError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [tagsError, setTagsError] = useState(null);

  const [existingPostTags, setExistingPostTags] = useState([]);
  const [existingPostImages, setExistingPostImages] = useState([]);

  const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
  const MAX_IMAGES = 5;
  const TITLE_MIN = 5;
  const TITLE_MAX = 200;
  const DESCRIPTION_MIN = 10;
  const DESCRIPTION_MAX = 5000;
  const TAGS_MAX = 2;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    setActualUserId(userId);

    async function initTagsAndPost() {
      const fetchedTags = await fetchTags();
      const fetchedImages = await fetchAllImages();
      fetchCurrentPost(fetchedTags, fetchedImages);
    }
    initTagsAndPost();
  }, []);

  function validateForm() {
    let isValid = true;

    if (title.trim().length < TITLE_MIN || title.trim().length > TITLE_MAX) {
      setTitleError(
        `Titel moet tussen ${TITLE_MIN} en ${TITLE_MAX} karakters lang zijn.`,
      );
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (
      description.trim().length < DESCRIPTION_MIN ||
      description.trim().length > DESCRIPTION_MAX
    ) {
      setDescriptionError(
        `Beschrijving moet tussen ${DESCRIPTION_MIN} en ${DESCRIPTION_MAX} karakters lang zijn.`,
      );
      isValid = false;
    } else {
      setDescriptionError(null);
    }

    if (selectedTags.length > TAGS_MAX) {
      setTagsError(`Je kan maximum ${TAGS_MAX} tags selecteren.`);
      isValid = false;
    } else if (selectedTags.length === 0) {
      setTagsError(`Selecteer minstens 1 tag.`);
      isValid = false;
    } else {
      setTagsError(null);
    }

    return isValid;
  }

  async function fetchCurrentPost(fetchedTags, fetchedImages) {
    try {
      const currentPostResponse = await axios.get(`${BASE_URL}/posts/${id}`, {
        headers: API_HEADERS,
      });
      const tagsResponse = await axios.get(`${BASE_URL}/postTags`, {
        headers: API_HEADERS,
      });
      const tagsData = tagsResponse.data;
      const postTagsCurrent = tagsData.filter(
        (tag) => tag.postId === parseInt(id),
      );

      const tags = postTagsCurrent.map((pt) => {
        const tag = fetchedTags.find((t) => t.id === pt.tagId);
        return { value: tag.id, label: tag.name };
      });

      const postImages = fetchedImages.filter(
        (img) => img.postId === parseInt(id),
      );

      setTitle(currentPostResponse.data.title);
      setDescription(currentPostResponse.data.description);
      setSelectedTags(tags);
      setSelectedFiles(postImages);
      setPreviewUrls(postImages.map((img) => `${DOMAIN}${img.image}`));
      setExistingPostImages(postImages);
      setExistingPostTags(postTagsCurrent);
    } catch (error) {
      console.error("Error fetching post:", error);
      setError("Er is een fout opgetreden bij het ophalen van de post.");
    }
  }

  async function fetchTags() {
    try {
      const response = await axios.get(`${BASE_URL}/tags`, {
        headers: API_HEADERS,
      });
      setAllTags(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching tags:", error);
      return [];
    }
  }

  async function fetchAllImages() {
    try {
      const response = await axios.get(`${BASE_URL}/postImages`, {
        headers: API_HEADERS,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  }

  async function submitEdit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("token");
    console.log("Token bij editNewPost:", token);

    try {
      const postPayload = {
        title: title,
        description: description,
        likes: 0,
        authorId: actualUserId,
        dateCreated: new Date().toISOString(),
        id: parseInt(id),
      };

      const editedPost = await axios.put(
        `${BASE_URL}/posts/${id}`,
        postPayload,
        {
          headers: { ...API_HEADERS, Authorization: `Bearer ${token}` },
        },
      );

      const currentTagIds = selectedTags.map((tag) => tag.value);
      const originalTagIds = existingPostTags.map((postTag) => postTag.tagId);

      const tagsToAdd = selectedTags.filter(
        (tag) => !originalTagIds.includes(tag.value),
      );
      const tagsToRemove = existingPostTags.filter(
        (postTag) => !currentTagIds.includes(postTag.tagId),
      );

      for (const tag of tagsToAdd) {
        await axios.post(
          `${BASE_URL}/postTags`,
          { postId: editedPost.data.id, tagId: tag.value },
          { headers: { ...API_HEADERS, Authorization: `Bearer ${token}` } },
        );
      }

      for (const postTag of tagsToRemove) {
        await axios.delete(`${BASE_URL}/postTags/${postTag.id}`, {
          headers: { ...API_HEADERS, Authorization: `Bearer ${token}` },
        });
      }

      const remainingExistingIds = selectedFiles
        .filter((item) => item.id)
        .map((item) => item.id);

      const imagesToRemove = existingPostImages.filter(
        (img) => !remainingExistingIds.includes(img.id),
      );

      const newFiles = selectedFiles.filter((item) => item instanceof File);

      for (const file of newFiles) {
        const formData = new FormData();
        formData.append("postId", editedPost.data.id);
        formData.append("image", file);
        await axios.post(`${BASE_URL}/postImages`, formData, {
          headers: { ...API_HEADERS, Authorization: `Bearer ${token}` },
        });
      }

      for (const img of imagesToRemove) {
        try {
          await axios.delete(`${BASE_URL}/postImages/${img.id}`, {
            headers: { ...API_HEADERS, Authorization: `Bearer ${token}` },
          });
        } catch (deleteError) {
          console.error(
            "Kon afbeelding niet verwijderen (vereist admin-rechten):",
            deleteError,
          );
        }
      }

      navigate(`/posts/${editedPost.data.id}`);
    } catch (error) {
      console.error("Error submitting edited post:", error);
    }
  }

  const options = allTags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
    e.target.value = "";
  }

  function handleRemove(index) {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  }

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "var(--primary)" : base.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px var(--primary)" : base.boxShadow,
      "&:hover": { borderColor: "var(--primary)" },
      borderRadius: "8px",
      padding: "4px 4px",
      fontSize: "14px",
      fontWeight: 300,
      fontFamily: "Inter",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "var(--secondary)",
      borderRadius: "40px",
      padding: "2px 4px",
      fontSize: "14px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "white",
      fontWeight: 500,
      fontSize: "14px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "white",
      borderRadius: "50%",
      "&:hover": {
        backgroundColor: "transparent",
        color: "white",
        opacity: 0.7,
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--primary)"
        : state.isFocused
          ? "var(--secondary-light, #f0f0f0)"
          : base.backgroundColor,
      color: state.isSelected ? "white" : base.color,
      cursor: state.isDisabled ? "not-allowed" : "default",
      "&:active": { backgroundColor: "var(--primary)", color: "white" },
    }),
  };

  return (
    <>
      <div className="container">
        <div className="new-post__wrapper">
          <section className="new-post__section">
            <section className="new-post__header">
              <div className="new-post__content">
                <h1 className="new-post__title">Post aanpassen</h1>
              </div>
            </section>
            <section className="new-post__main">
              <form className="new-post__form" onSubmit={submitEdit}>
                <Input
                  label="Titel"
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  setValue={setTitle}
                  style="text"
                  placeholder="Titel van je post"
                />
                <Input
                  label="Beschrijving"
                  type="textarea"
                  id="description"
                  name="description"
                  value={description}
                  setValue={setDescription}
                  style="textarea"
                  placeholder="Vertel meer over je post..."
                />
                <div>
                  <label className="mb-1" htmlFor="tags">
                    Tags(maximum 2)
                  </label>
                  <Select
                    id="tags"
                    options={options}
                    name="tags"
                    isMulti
                    value={selectedTags}
                    onChange={setSelectedTags}
                    isOptionDisabled={() => selectedTags.length >= 2}
                    styles={selectStyles}
                  />
                  <span className="new-post__tag-info">
                    Voeg relevante tags toe aan je post<br></br>
                  </span>
                </div>
                <div className="new-post__file-input">
                  <label>Afbeelding</label>
                  <div className="new-post__upload-area">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="new-post__file-input-field"
                    />
                    <label
                      htmlFor="image"
                      className="new-post__upload-placeholder"
                    >
                      <div className="new-post__upload-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="new-post__upload-icon-plus">+</span>
                      </div>
                      <p className="new-post__upload-text">
                        Klik om een afbeelding toe te voegen
                      </p>
                      <p className="new-post__upload-subtext">
                        JPG, PNG of WEBP, max 5MB
                      </p>
                    </label>
                    {previewUrls.length > 0 && (
                      <div className="new-post__preview-grid">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="new-post__preview-item">
                            <img src={url} alt={`Afbeelding ${index + 1}`} />
                            <button
                              type="button"
                              className="new-post__preview-remove"
                              onClick={() => handleRemove(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="new-post__buttons">
                  <Button
                    type="button"
                    value="Annuleren"
                    style="secondary wide"
                  ></Button>
                  <Button
                    type="submit"
                    value="Opslaan"
                    style="primary wide"
                  ></Button>
                </div>
              </form>
              {errors && <p className="error-message">{errors}</p>}
            </section>
          </section>
          <section className="sidebar-section">
            <Sidebar showPost={false} showTags={true} showLogin={false} />
          </section>
        </div>
      </div>
    </>
  );
}
export default EditPost;
