import "./MyPosts.css";

import QuestionCard from "../../components/questionCard/QuestionCard";

import SidebarButton from "../../components/sidebarButton/SidebarButton";

import placeholder from "../../assets/placeholder.jpg";


import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_HEADERS = {
  "novi-education-project-id": import.meta.env.VITE_API_PROJECT_ID,
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DOMAIN = import.meta.env.VITE_API_DOMAIN;

function MyPosts() {
  const [ownPosts, setOwnPosts] = useState(null);
  const [error, setError] = useState(null);
  const [enrichedPosts, setEnrichedPosts] = useState(null);
  const [actualUserId, setActualUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    setActualUserId(userId);

    console.log(`Opgehaalde userId uit token: ${userId}`);
    getMyPosts(userId);
  }, []);

  useEffect(() => {
    if (ownPosts) {
      mergeDataPosts({ posts: ownPosts.data });
      console.log("Merged data in useEffect:", ownPosts);
    }
  }, [ownPosts]);

  async function getMyPosts(userId) {
    try {
      const userPosts = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
        headers: API_HEADERS,
      });
      console.log(`Posts van de gebruiker met ID ${userId}:`, userPosts.data);
      setOwnPosts(userPosts);
    } catch (error) {
      console.error(error);
      setError("Er is een fout opgetreden bij het ophalen van je posts.");
    }

    console.log(
      `Posts van de gebruiker met ID ${userId} zijn opgehaald: ${ownPosts}`,
    );
  }

  async function mergeDataPosts({ posts }) {
    try {
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

      const allPosts = posts;
      const comments = commentsResponse.data;
      const allPostTags = tagsPostResponse.data;
      const allTags = tagsResponse.data;
      const postImages = postImagesResponse.data;

      console.log("Alle posts:", allPosts);

      const merged = [];

      for (let i = 0; i < allPosts.length; i++) {
        const post = allPosts[i];

        const author =
          actualUserId === post.authorId ? { id: actualUserId } : null;
        const postComments = comments.filter(
          (comment) => comment.postId === post.id,
        );

        const postTags = allPostTags.filter((pt) => pt.postId === post.id);
        const tags = postTags.map((pt) => {
          const tag = allTags.find((t) => t.id === pt.tagId);
          return tag ? tag.name : null;
        });

        const coverImage = postImages.find(
          (pi) => Number(pi.postId) === post.id,
        );

        merged.push({
          id: post.id,
          title: post.title,
          description: post.description,
          likes: post.likes,
          image: coverImage ? coverImage.image : null,
          dateCreated: post.dateCreated,
          author: author,
          comments: postComments,
          tags: tags,
        });
      }

      setEnrichedPosts(merged);
      console.log("Merged data:", merged);
    } catch (error) {
      console.error("Er ging iets mis bij het ophalen van de data:", error);
      setError("Er ging iets mis bij het ophalen van de data.");
    }
  }

  return (
    <>
      <div className="container">
        <section className="my-posts-header">
          <h1 className="my-posts-title">
            Mijn posts ({enrichedPosts ? enrichedPosts.length : 0})
          </h1>
          <div>
            <SidebarButton buttonStyle="post" size="small" />
          </div>
        </section>
        <section className="my-posts-results mt-3 ">
          {enrichedPosts && enrichedPosts.length > 0 ? (
            (console.log("Enriched posts data:", enrichedPosts),
            enrichedPosts.map((post) => (
              <QuestionCard
                key={post.id}
                image={post.image ? `${DOMAIN}${post.image}` : placeholder}
                title={post.title}
                description={post.description}
                date={new Date(post.dateCreated).toLocaleDateString("nl-NL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                likes={post.likes}
                comments={post.comments.length}
                tags={post.tags}
                type="mypost"
                id={post.id}
              />
            )))
          ) : (
            <p>Posts zijn aan het laden...</p>
          )}
          {error && <p className="error-message">{error}</p>}
        </section>
      </div>
    </>
  );
}
export default MyPosts;
