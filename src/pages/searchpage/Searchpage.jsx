import "./Searchpage.css";

import QuestionCard from "../../components/questionCard/QuestionCard";

import usericon from "../../assets/usericon.svg";

import Fuse from "fuse.js";

import { useEffect, useState } from "react";
import fetchPosts from "../../hooks/fetchPosts";

import { useParams } from "react-router-dom";
const DOMAIN = import.meta.env.VITE_API_DOMAIN;

function Searchpage() {
  const { query } = useParams();

  const [enrichedPosts, setEnrichedPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialisation() {
      const [posts, fetchError] = await fetchPosts();
      setEnrichedPosts(posts);
      setError(fetchError);
      setLoading(false);
    }
    initialisation();
  }, []);

  useEffect(() => {
    const fuse = new Fuse(enrichedPosts, {
      keys: ["title", "description", "tags"],
      includeScore: true,
      threshold: 0.3,
    });

    setFilteredPosts(fuse.search(query).map((result) => result.item));
    console.log("Filtered posts:", filteredPosts);
  }, [query, enrichedPosts]);

  useEffect(() => {
    console.log(filteredPosts);
  }, [filteredPosts]);

  return (
    <>
      <div className="container">
        <section className="searchpage">
          <div className="searchpage-header">
            <h1 className="searchpage-title">
              {filteredPosts.length} resultaten voor ‘{query}’
            </h1>
            <select
              name="filter"
              className="searchpage-select"
              id="filter-select"
            >
              <option value="" selected>
                Sorteren
              </option>
              <option value="date">Datum</option>
              <option value="comments">Aantal reacties</option>
              <option value="likes">Aantal likes</option>
            </select>
          </div>
          <div className="searchpage-results mt-3">
            {error ? (
              <p>{error.message}</p>
            ) : loading ? (
              <p>Posts zijn aan het laden...</p>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
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
              <p>Geen posts gevonden voor deze zoekopdracht.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
export default Searchpage;
