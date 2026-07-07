import "./MyPosts.css";

import QuestionCard from "../../components/questionCard/QuestionCard";

import SidebarButton from "../../components/sidebarButton/SidebarButton";

import placeholder from "../../assets/placeholder.jpg";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { fetchUserPosts } from "../../api/posts";

const DOMAIN = import.meta.env.VITE_API_DOMAIN;

function MyPosts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enrichedPosts, setEnrichedPosts] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    loadMyPosts(userId);
  }, []);

  async function loadMyPosts(userId) {
    setLoading(true);
    const [posts, error] = await fetchUserPosts(userId);
    if (error) {
      console.error(error);
      setError("Er is een fout opgetreden bij het ophalen van je posts.");
      setLoading(false);
      return;
    }
    setEnrichedPosts(posts);
    setLoading(false);
  }

  function handlePostDeleted(deletedId) {
    setEnrichedPosts((prev) => prev.filter((post) => post.id !== deletedId));
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
        <section className="my-posts-results">
          {loading ? (
            <p>Posts zijn aan het laden...</p>
          ) : enrichedPosts && enrichedPosts.length > 0 ? (
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
                token={token}
                onDelete={handlePostDeleted}
              />
            ))
          ) : (
            <p>Je hebt nog geen posts gemaakt.</p>
          )}

          {error && <p className="error-message">{error}</p>}
        </section>
      </div>
    </>
  );
}
export default MyPosts;
