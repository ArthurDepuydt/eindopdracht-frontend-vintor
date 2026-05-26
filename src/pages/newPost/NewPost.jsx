import "./NewPost.css";

import Select from "react-select";

import Sidebar from "../../components/sidebar/Sidebar";

import { useState } from "react";

import Input from "../../components/input/Input";

import placeholder from "../../assets/placeholder.jpg";

function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

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
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "var(--secondary)",
      borderRadius: "40px",
      padding: "2px 4px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "white",
      fontWeight: 500,
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

  const options = [
    { value: "motor", label: "Motor" },
    { value: "carburateur", label: "Carburateur" },
    { value: "restauratie", label: "Restauratie" },
    { value: "elektrisch", label: "Elektrisch" },
    { value: "interieur", label: "Interieur" },
    { value: "onderhoud", label: "Onderhoud" },
  ];

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
              <form className="new-post__form">
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
                    isMulti
                    value={selectedTags}
                    onChange={setSelectedTags}
                    isOptionDisabled={() => selectedTags.length >= 2}
                    styles={selectStyles}
                  />
                  <span className="new-post__tag-info">
                    Voeg relevante tags toe aan je post
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
                    <label htmlFor="image" className="new-post__upload-placeholder">
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
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
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
