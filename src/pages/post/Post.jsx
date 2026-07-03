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

import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { Swiper, SwiperSlide } from "swiper/react";

const API_HEADERS = {
  "novi-education-project-id": "0aa01fc3-b0dd-4ad7-9f9e-82b0c9688601",
};

const BASE_URL = "https://novi-backend-api-wgsgz.ondigitalocean.app/api";
const DOMAIN = "https://novi-backend-api-wgsgz.ondigitalocean.app";

import "swiper/css";

function Post() {
  const { isAuth } = useContext(AuthContext);

  let params = useParams();

  const [reactie, setReactie] = useState("");
  const [enrichedPost, setEnrichedPost] = useState(null);
  const [error, setError] = useState(null);
  const [actualUserId, setActualUserId] = useState(null);

  const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
  const isLiked = enrichedPost && likedPosts.includes(enrichedPost.id);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPost();
    if (isAuth) {
      const token = localStorage.getItem("token");
      console.log("Token bij useEffect:", token);
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setActualUserId(userId);
    }
  }, []);

  async function fetchPost() {
    try {
      const postsResponse = await axios.get(`${BASE_URL}/posts/${params.id}`, {
        headers: API_HEADERS,
      });
      const usersResponse = await axios.get(`${BASE_URL}/users`, {
        headers: API_HEADERS,
      });
      const commentsResponse = await axios.get(`${BASE_URL}/comments`, {
        headers: API_HEADERS,
      });
      const tagsPostResponse = await axios.get(`${BASE_URL}/postTags`, {
        headers: API_HEADERS,
      });
      const tagsResponse = await axios.get(`${BASE_URL}/tags`, {
        headers: API_HEADERS,
      });
      const postImagesResponse = await axios.get(`${BASE_URL}/postImages`, {
        headers: API_HEADERS,
      });

      const post = postsResponse.data;
      const users = usersResponse.data;
      const comments = commentsResponse.data;
      const allPostTags = tagsPostResponse.data;
      const allTags = tagsResponse.data;
      const postImages = postImagesResponse.data;

      const author = users.find((user) => user.id === post.authorId);
      const postComments = comments.filter(
        (comment) => comment.postId === post.id,
      );
      const commentsWithAuthors = postComments.map((comment) => {
        const commentAuthor = users.find(
          (user) => user.id === comment.authorId,
        );
        return {
          id: comment.id,
          postId: comment.postId,
          authorId: comment.authorId,
          content: comment.content,
          dateCreated: comment.dateCreated,
          author: commentAuthor,
        };
      });
      const postTags = allPostTags.filter((pt) => pt.postId === post.id);
      const tags = postTags.map((pt) => {
        const tag = allTags.find((t) => t.id === pt.tagId);
        return tag ? tag.name : null;
      });
      const postImageAssembled = postImages
        .filter((pi) => Number(pi.postId) === post.id)
        .map((pi) => pi.image);
      const allImages = postImageAssembled;

      setEnrichedPost({
        id: post.id,
        title: post.title,
        description: post.description,
        likes: post.likes,
        images: allImages,
        dateCreated: post.dateCreated,
        author: author,
        comments: commentsWithAuthors,
        tags: tags,
        authorId: post.authorId,
      });
    } catch (error) {
      console.error("Er ging iets mis bij het ophalen van de data:", error);
      setError("Er ging iets mis bij het ophalen van de data.");
    }
  }

  function toggleLike() {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    const alreadyLiked = likedPosts.includes(enrichedPost.id);

    const newLikes = alreadyLiked
      ? enrichedPost.likes - 1
      : enrichedPost.likes + 1;

    axios
      .put(
        `${BASE_URL}/posts/${enrichedPost.id}`,
        {
          title: enrichedPost.title,
          description: enrichedPost.description,
          likes: newLikes,
          authorId: enrichedPost.authorId,
          dateCreated: enrichedPost.dateCreated,
          id: enrichedPost.id,
        },
        { headers: { ...API_HEADERS, Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        const updatedLikedPosts = alreadyLiked
          ? likedPosts.filter((postId) => postId !== enrichedPost.id)
          : [...likedPosts, enrichedPost.id];

        localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
        setEnrichedPost((prev) => ({ ...prev, likes: newLikes }));
      })
      .catch((error) => {
        console.error("Error toggling like:", error);
      });
  }

  async function createComment(e) {
    e.preventDefault();
    try {
      const postPayload = {
        postId: parseInt(params.id),
        authorId: actualUserId,
        content: reactie,
        dateCreated: new Date().toISOString(),
      };

      await axios.post(`${BASE_URL}/comments`, postPayload, {
        headers: { ...API_HEADERS, Authorization: `Bearer ${token}` },
      });
      setReactie("");
      fetchPost();
    } catch (error) {
      console.error("Error submitting new post:", error);
    }
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
                        console.log("Image URL:", image);
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
                    <div className="post-detail__tags-container mt-2 mb-2">
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
                <section className="post-detail__main mt-5">
                  <p className="post-detail__description">
                    {enrichedPost.description}
                  </p>
                  <hr className="post-detail__divider mt-5 mb-5" />
                </section>
                <section className="post-detail__reactions">
                  <h2 className="post-detail__reactions-title">
                    Reacties({enrichedPost.comments.length})
                  </h2>

                  {enrichedPost.comments.map((comment) => (
                    <article className="reaction" key={comment.id}>
                      <img
                        src={usericon}
                        alt="User Icon"
                        className="reaction-author__image"
                      />
                      <div className="reaction-content">
                        <div className="reaction-author">
                          <span>
                            {comment.author
                              ? comment.author.email.split("@")[0]
                              : "Onbekend"}
                          </span>
                          <span className="reaction-date">
                            {new Date(comment.dateCreated).toLocaleDateString(
                              "nl-NL",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <p className="reaction-description">
                          {comment.content}
                        </p>
                      </div>
                    </article>
                  ))}

                  <hr className="post-detail__divider mt-5 mb-5" />
                  <form
                    onSubmit={createComment}
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
                    />
                  </form>
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
