import { useState, useEffect } from "react";
import "./Home.css";
import QuestionCard from "../../components/questionCard/QuestionCard";
import Sidebar from "../../components/sidebar/Sidebar";
import usericon from "../../assets/usericon.svg";

import fetchPosts from "../../hooks/fetchPosts";

const DOMAIN = import.meta.env.VITE_API_DOMAIN;

function Home() {
  const [enrichedPosts, setEnrichedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initialisation() {
      const [posts, fetchError] = await fetchPosts();
      setEnrichedPosts(posts);
      setError(fetchError);
    }
    initialisation();
  }, []);

  return (
    <>
      <div className="container">
        <div className="home-wrapper">
          <section className="questions-section">
            {error ? (
              <p>{error}</p>
            ) : enrichedPosts.length > 0 ? (
              enrichedPosts.map((post) => (
                <QuestionCard
                  id={post.id}
                  key={post.id}
                  image={post.image ? `${DOMAIN}${post.image}` : null}
                  title={post.title}
                  description={post.description}
                  author={post.author?.email}
                  authorImage={usericon}
                  date={new Date(post.dateCreated).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  likes={post.likes}
                  comments={post.comments.length}
                  tags={post.tags}
                />
              ))
            ) : (
              <p>Posts zijn aan het laden...</p>
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

export default Home;
