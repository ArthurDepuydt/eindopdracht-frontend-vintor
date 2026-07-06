import { useState, useEffect } from "react";
import "./Home.css";
import QuestionCard from "../../components/questionCard/QuestionCard";
import Sidebar from "../../components/sidebar/Sidebar";
import placeholder from "../../assets/placeholder.jpg";
import usericon from "../../assets/usericon.svg";
import axios from "axios";

const API_HEADERS = {
  "novi-education-project-id": import.meta.env.VITE_API_PROJECT_ID,
};
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DOMAIN = import.meta.env.VITE_API_DOMAIN;

function Home() {
  const [enrichedPosts, setEnrichedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const postsResponse = await axios.get(`${BASE_URL}/posts`, {
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

      const posts = postsResponse.data;
      const users = usersResponse.data;
      const comments = commentsResponse.data;
      const allPostTags = tagsPostResponse.data;
      const allTags = tagsResponse.data;
      const postImages = postImagesResponse.data;

      const merged = [];

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const author = users.find((user) => user.id === post.authorId);
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

      merged.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

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
