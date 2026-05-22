import "./Searchpage.css";

import QuestionCard from "../../components/questionCard/QuestionCard";

import placeholder from "../../assets/placeholder.jpg";

function Searchpage() {
  return (
    <>
      <div className="container">
        <section className="searchpage">
          <div className="searchpage-header">
            <h1 className="searchpage-title">
              3 resultaten voor ‘carburateur’
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
          </div>
        </section>
      </div>
    </>
  );
}
export default Searchpage;
