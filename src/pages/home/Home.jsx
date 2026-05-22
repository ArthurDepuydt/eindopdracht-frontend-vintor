import { useState } from "react";
import "./Home.css";
import QuestionCard from "../../components/questionCard/QuestionCard";
import Sidebar from "../../components/sidebar/Sidebar";
import placeholder from "../../assets/placeholder.jpg";

function Home() {
  return (
    <>
      <div className="container">
        <div className="home-wrapper">
          <section className="questions-section">
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
            />
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
