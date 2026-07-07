import usericon from "../../assets/usericon.svg";

import "./Reaction.css";

function Reaction({ comment }) {
  return (
    <article className="reaction" key={comment.id}>
      <img src={usericon} alt="User Icon" className="reaction-author__image" />
      <div className="reaction-content">
        <div className="reaction-author">
          <span>
            {comment.author ? comment.author.email.split("@")[0] : "Onbekend"}
          </span>
          <span className="reaction-date">
            {new Date(comment.dateCreated).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <p className="reaction-description">{comment.content}</p>
      </div>
    </article>
  );
}

export default Reaction;
