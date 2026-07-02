import "./MyPosts.css";

import QuestionCard from "../../components/questionCard/QuestionCard";

import SidebarButton from "../../components/sidebarButton/SidebarButton";

import placeholder from "../../assets/placeholder.jpg";

function MyPosts() {
  async function getMyPosts(userId) {
    try {
      const loginPost = await axios.post(
        `https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}/posts`,
        {
          headers: API_HEADERS,
        },
      );
      setResult(loginPost.data);
      console.log(loginPost.data.token);
      login(e, mail, loginPost.data.token);
    } catch (error) {
      console.error(error);
    }

    console.log(
      `Gebruiker is ingelogd! Emailadres: ${mail}, Wachtwoord: ${password}`,
    );
  }

  return (
    <>
      <div className="container">
        <section className="my-posts-header">
          <h1 className="my-posts-title">Mijn posts (2)</h1>
          <div>
            <SidebarButton buttonStyle="post" size="small" />
          </div>
        </section>
        <section className="my-posts-results mt-3">
          <QuestionCard
            image={placeholder}
            title="Carburateur afstellen of vervangen?"
            description="Mijn motor draait onregelmatig stationair en valt soms uit. Denk dat het aan de carburateur ligt. Is het de moeite om die nog af te stellen of beter meteen vervangen?"
            author="John Doe"
            authorImage={placeholder}
            date="1 uur geleden"
            tags={["carburateur", "restauratie"]}
            likes={10}
            comments={5}
            type="mypost"
          />
        </section>
      </div>
    </>
  );
}
export default MyPosts;
