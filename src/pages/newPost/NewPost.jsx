import "./NewPost.css";

import Select from "react-select";

import Sidebar from "../../components/sidebar/Sidebar";

import { useState, useEffect } from "react";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import {
  createPost,
  addPostTag,
  uploadPostImage,
  fetchTags,
} from "../../api/posts";

function NewPost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [actualUserId, setActualUserId] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [tagsError, setTagsError] = useState(null);

  const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
  const MAX_IMAGES = 5;
  const TITLE_MIN = 5;
  const TITLE_MAX = 200;
  const DESCRIPTION_MIN = 10;
  const DESCRIPTION_MAX = 5000;
  const TAGS_MAX = 2;

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

  function handleFileChange(e) {
    const files = Array.from(e.target.files);

    const validSizeFiles = files.filter((file) => file.size <= MAX_IMAGE_SIZE);
    const tooLargeFiles = files.filter((file) => file.size > MAX_IMAGE_SIZE);

    const remainingSlots = MAX_IMAGES - selectedImages.length;
    const validFiles = validSizeFiles.slice(0, remainingSlots);
    const excessFiles = validSizeFiles.slice(remainingSlots);

    const errors = [];
    if (tooLargeFiles.length > 0) {
      errors.push(
        `Deze afbeelding(en) zijn groter dan 2MB en werden niet toegevoegd: ${tooLargeFiles.map((file) => file.name).join(", ")}`,
      );
    }
    if (excessFiles.length > 0) {
      errors.push(`Je kan maximum ${MAX_IMAGES} afbeeldingen toevoegen.`);
    }
    setImageError(errors.length > 0 ? errors.join(" ") : null);

    setSelectedImages((prev) => [...prev, ...validFiles]);
    const urls = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
    e.target.value = "";
  }

  function handleRemove(index) {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token bij useEffect:", token);
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    setActualUserId(userId);
    loadTags();
    console.log(`Opgehaalde userId uit token: ${userId}`);
  }, []);

  async function loadTags() {
    const [tags, error] = await fetchTags();
    if (error) {
      console.error(error);
      return;
    }
    setAllTags(tags);
  }
  const options = allTags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  async function submitNewPost(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!validateForm()) {
      return;
    }

    const postPayload = {
      title: title,
      description: description,
      likes: 0,
      authorId: actualUserId,
      dateCreated: new Date().toISOString(),
    };

    const [newPost, postError] = await createPost(postPayload, token);
    if (postError) {
      console.error(postError);
      return;
    }

    for (const tag of selectedTags) {
      await addPostTag(newPost.id, tag.value, token);
    }

    for (const image of selectedImages) {
      await uploadPostImage(newPost.id, image, token);
    }

    navigate(`/posts/${newPost.id}`);
  }

  return (
    <>
      <div className="container">
        <div className="new-post__wrapper">
          <section className="new-post__section">
            <section className="new-post__header">
              <div className="new-post__content">
                <h1 className="new-post__title">Nieuwe post maken</h1>
              </div>
            </section>
            <section className="new-post__main">
              <form className="new-post__form" onSubmit={submitNewPost}>
                <Input
                  label="Titel"
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  setValue={setTitle}
                  style="text"
                  placeholder="Titel van je post"
                  error={titleError}
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
                  error={descriptionError}
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
                    Voeg relevante tags toe aan je post <br></br>
                  </span>
                  {tagsError && (
                    <span className="input-error-message">{tagsError}</span>
                  )}
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
                      disabled={selectedImages.length >= MAX_IMAGES}
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
                        JPG, PNG of WEBP, max 2MB
                      </p>
                    </label>
                    {imageError && (
                      <p className="new-post__upload-error">{imageError}</p>
                    )}
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
                    value="Plaatsen"
                    style="primary wide"
                  ></Button>
                </div>
              </form>
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
export default NewPost;
