import { useState } from "react";
import "./QuestionCard.css";

import likesIcon from "../../assets/likes.svg";
import commentsIcon from "../../assets/comments.svg";

function QuestionCard({
  image,
  title,
  description,
  author,
  authorImage,
  date,
  likes,
  comments,
  tags,
}) {
  return (
    <>
      <article className="question-card">
        <div className="question-card__image-container">
          <img src={image} alt={title} className="question-card__image" />
        </div>
        <div className="question-card__content">
          <h2 className="question-card__title">{title}</h2>
          <p className="question-card__description">{description}</p>
          <div className="question-card__meta">
            <div className="question-card__info">
              <div className="question-card__author-container">
                <div className="question-card__author">
                  <img
                    src={authorImage}
                    alt={author}
                    className="question-card__author-image"
                  />
                  <span>{author}</span>
                </div>
                <span className="question-card__date">{date}</span>
              </div>
              <span className="question-card__stats">
                <span className="question-card__comments">
                  <img src={commentsIcon} alt="Comments" />
                  {comments}
                </span>
                <span className="question-card__likes">
                  <img src={likesIcon} alt="Likes" />
                  {likes}
                </span>
              </span>
            </div>
            <div className="question-card__tags-container">
              <div className="question-card__tags">
                {tags.map((tag, index) => (
                  <span key={index} className="question-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default QuestionCard;
