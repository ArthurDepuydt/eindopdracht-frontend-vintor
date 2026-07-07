import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import "./Post.css";
import Sidebar from "../../components/sidebar/Sidebar";
import placeholder from "../../assets/placeholder.jpg";

import usericon from "../../assets/usericon.svg";

import Input from "../../components/input/Input";

import { Navigation, Pagination } from "swiper/modules";

import likesIcon from "../../assets/likes.svg";
import likedIcon from "../../assets/liked.svg";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

import { jwtDecode } from "jwt-decode";

import { Swiper, SwiperSlide } from "swiper/react";

import { fetchPost, updatePost } from "../../api/posts";
import { createComment } from "../../api/comments";

import Reaction from "../../components/reaction/Reaction";

const DOMAIN = import.meta.env.VITE_API_DOMAIN;

import "swiper/css";

function Post() {
  const { isAuth } = useContext(AuthContext);

  let params = useParams();

  const [reactie, setReactie] = useState("");
  const [enrichedPost, setEnrichedPost] = useState(null);
  const [error, setError] = useState(null);
  const [reactieError, setReactieError] = useState(null);
  const [actualUserId, setActualUserId] = useState(null);
  const [submittingComment, setSubmittingComment] = useState(false);

  const REACTIE_MAX = 500;

  const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
  const isLiked = enrichedPost && likedPosts.includes(enrichedPost.id);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadPost();
    if (isAuth) {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setActualUserId(userId);
    }
  }, []);

  async function loadPost() {
    const [post, error] = await fetchPost(params.id);
    if (error) {
      console.error(error);
      setError("Er ging iets mis bij het ophalen van de data.");
      return;
    }
    setEnrichedPost(post);
  }

  async function toggleLike() {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    const alreadyLiked = likedPosts.includes(enrichedPost.id);

    const newLikes = Math.max(
      0,
      alreadyLiked ? enrichedPost.likes - 1 : enrichedPost.likes + 1,
    );

    const [, error] = await updatePost(
      enrichedPost.id,
      {
        title: enrichedPost.title,
        description: enrichedPost.description,
        likes: newLikes,
        authorId: enrichedPost.authorId,
        dateCreated: enrichedPost.dateCreated,
        id: enrichedPost.id,
      },
      token,
    );

    if (error) {
      console.error("Error toggling like:", error);
      return;
    }

    const updatedLikedPosts = alreadyLiked
      ? likedPosts.filter((postId) => postId !== enrichedPost.id)
      : [...likedPosts, enrichedPost.id];

    localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
    setEnrichedPost((prev) => ({ ...prev, likes: newLikes }));
  }

  async function submitComment(e) {
    e.preventDefault();
    if (!reactie.trim()) {
      setReactieError("Reactie mag niet leeg zijn.");
      return;
    }
    if (reactie.trim().length > REACTIE_MAX) {
      setReactieError(
        `Reactie mag maximum ${REACTIE_MAX} karakters lang zijn.`,
      );
      return;
    }

    const commentPayload = {
      postId: parseInt(params.id),
      authorId: actualUserId,
      content: reactie,
      dateCreated: new Date().toISOString(),
    };

    setSubmittingComment(true);
    const [, error] = await createComment(commentPayload, token);
    if (error) {
      console.error(error);
      setReactieError("Er ging iets mis bij het indienen van de reactie.");
      setSubmittingComment(false);
      return;
    }

    setReactie("");
    setReactieError(null);
    setSubmittingComment(false);
    loadPost();
  }

  const username = enrichedPost?.author
    ? enrichedPost.author.email.split("@")[0]
    : "Onbekend";

  const noImageAvailable = enrichedPost?.images.length === 0;

  return (
    <>
      <div className="container">
        <div className="post-detail__wrapper">
          <section className="post-detail__section">
            {error ? (
              <p>{error}</p>
            ) : enrichedPost ? (
              <div>
                <section className="post-detail__header">
                  {enrichedPost.images.length > 0 && (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={50}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      className="post-detail__swiper"
                    >
                      {enrichedPost.images.map((image, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <img
                              src={image ? `${DOMAIN}${image}` : placeholder}
                              className="post-detail__swiper-image"
                              alt="Placeholder"
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  )}

                  <div
                    className={`post-detail__content ${noImageAvailable ? "full-width" : ""}`}
                  >
                    <h1 className="post-detail__title">{enrichedPost.title}</h1>

                    <div className="post-detail__author-container">
                      <div className="post-detail__author">
                        <img
                          src={usericon}
                          alt="User Icon"
                          className="post-detail__author-image"
                        />
                        <span>{username}</span>
                      </div>
                      <span className="post-detail__date">
                        {new Date(enrichedPost.dateCreated).toLocaleDateString(
                          "nl-NL",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <div className="post-detail__tags-container ">
                      <div className="post-detail__tags">
                        {enrichedPost.tags.map((tag, index) => (
                          <span key={index} className="post-detail__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="post-detail__stats">
                      <span className="post-detail__likes" onClick={toggleLike}>
                        {isLiked ? (
                          <>
                            <img src={likedIcon} alt="Likes" />
                            {enrichedPost.likes}
                          </>
                        ) : (
                          <>
                            <img src={likesIcon} alt="Likes" />
                            {enrichedPost.likes}
                          </>
                        )}
                      </span>
                    </span>
                  </div>
                </section>
                <section className="post-detail__main">
                  <p className="post-detail__description">
                    {enrichedPost.description}
                  </p>
                  <hr className="post-detail__divider" />
                </section>
                <section className="post-detail__reactions">
                  <h2 className="post-detail__reactions-title">
                    Reacties({enrichedPost.comments.length})
                  </h2>

                  {enrichedPost.comments.map((comment) => (
                    <Reaction key={comment.id} comment={comment} />
                  ))}

                  <hr className="post-detail__divider" />
                  {isAuth ? (
                    <form
                      onSubmit={submitComment}
                      className="post-detail__comment-form"
                    >
                      <Input
                        type="reactie"
                        id="reactie"
                        name="reactie"
                        value={reactie}
                        setValue={setReactie}
                        style="text onInput comment-input"
                        placeholder="Schrijf een reactie"
                        disabled={submittingComment}
                      />
                      {reactieError && (
                        <p className="input-error-message">{reactieError}</p>
                      )}
                    </form>
                  ) : (
                    <p className="post-detail__login-message">
                      Log in om een reactie te plaatsen.
                    </p>
                  )}
                </section>
              </div>
            ) : (
              <p>Post is aan het laden...</p>
            )}
          </section>
          <section className="sidebar-section">
            <Sidebar showPost={true} showTags={true} showLogin={true} />
          </section>
        </div>
      </div>
    </>
  );
}
export default Post;
