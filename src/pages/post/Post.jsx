import { useState } from "react";
import "./Post.css";
import Sidebar from "../../components/sidebar/Sidebar";
import placeholder from "../../assets/placeholder.jpg";

import Input from "../../components/input/Input";

import { Navigation, Pagination } from "swiper/modules";

import likesIcon from "../../assets/likes.svg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

function Post() {
  let [reactie, setReactie] = useState("");

  return (
    <>
      <div className="container">
        <div className="post-detail__wrapper">
          <section className="post-detail__section">
            <section className="post-detail__header">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                className="post-detail__swiper"
              >
                <SwiperSlide>
                  <img
                    src={placeholder}
                    className="post-detail__swiper-image"
                    alt="Placeholder"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={placeholder}
                    className="post-detail__swiper-image"
                    alt="Placeholder"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={placeholder}
                    className="post-detail__swiper-image"
                    alt="Placeholder"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={placeholder}
                    className="post-detail__swiper-image"
                    alt="Placeholder"
                  />
                </SwiperSlide>
              </Swiper>
              <div className="post-detail__content">
                <h1 className="post-detail__title">
                  Carburateur afstellen of vervangen?
                </h1>

                <div className="post-detail__author-container">
                  <div className="post-detail__author">
                    <img
                      src={placeholder}
                      alt="Placeholder"
                      className="post-detail__author-image"
                    />
                    <span>Author Name</span>
                  </div>
                  <span className="post-detail__date">Date</span>
                </div>
                <div className="post-detail__tags-container mt-2 mb-2">
                  <div className="post-detail__tags">
                    {["carburateur", "restauratie"].map((tag, index) => (
                      <span key={index} className="post-detail__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="post-detail__stats">
                  <span className="post-detail__likes">
                    <img src={likesIcon} alt="Likes" />
                    34
                  </span>
                </span>
              </div>
            </section>
            <section className="post-detail__main mt-5">
              <p className="post-detail__description">
                Mijn motor draait onregelmatig stationair en valt soms uit. Denk
                dat het aan de carburateur ligt. Is het de moeite om die nog af
                te stellen of beter meteen vervangen?
              </p>
              <hr className="post-detail__divider mt-5 mb-5" />
            </section>
            <section className="post-detail__reactions">
              <h2 className="post-detail__reactions-title">Reacties(2)</h2>
              <article className="reaction">
                <img
                  src={placeholder}
                  alt="Placeholder"
                  className="reaction-author__image"
                />
                <div className="reaction-content">
                  <div className="reaction-author">
                    <span>Reactie Auteur</span>
                    <span className="reaction-date">Datum</span>
                  </div>
                  <p className="reaction-description">
                    Ik zou eerst proberen de carburateur af te stellen, soms kan
                    dat al veel verschil maken. Als dat niet helpt, dan zou ik
                    inderdaad overwegen om hem te vervangen.
                  </p>
                </div>
              </article>
              <article className="reaction">
                <img
                  src={placeholder}
                  alt="Placeholder"
                  className="reaction-author__image"
                />
                <div className="reaction-content">
                  <div className="reaction-author">
                    <span>Reactie Auteur</span>
                    <span className="reaction-date">Datum</span>
                  </div>
                  <p className="reaction-description">
                    Ik zou eerst proberen de carburateur af te stellen, soms kan
                    dat al veel verschil maken. Als dat niet helpt, dan zou ik
                    inderdaad overwegen om hem te vervangen.
                  </p>
                </div>
              </article>
              <hr className="post-detail__divider mt-5 mb-5" />
              <Input
                type="reactie"
                id="reactie"
                name="reactie"
                value={reactie}
                setValue={setReactie}
                style="text onInput"
                placeholder="Schrijf een reactie"
              />
            </section>
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
