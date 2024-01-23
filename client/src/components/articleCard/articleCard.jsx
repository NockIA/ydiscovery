import "../../style/index.css";
import "./articleCard.css";
import { Link } from "react-router-dom";

export const ArticleCard = ({
    id,
  title,
  subtitle,
  publicationDate,
  illustrationLink,
  authorName,
}) => {
  const truncateDescription = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <Link
      to={"/single-article/" + id}
      className="columnContainer container_hero_card"
    >
      <img src={illustrationLink ?? "/no_image.png"} alt="" />
      <div className="container_content_hero_card columnContainer">
        <i className="i1" />
        <h2>{truncateDescription(title, 20)}</h2>
        <i className="i2" />
        <h5>{subtitle ? truncateDescription(subtitle, 50) : "No description"}</h5>
        <span className="separation"></span>
        <i className="i3" />
        <article className="rowContainer container_id_herocard">
          <p className="id_title_herocard">Author : </p>
          <p className="id_herocard">{authorName?? "Unknown"}</p>
        </article>
        <article className="rowContainer container_id_herocard">
          <p className="id_title_herocard">Published : </p>
          <p className="id_herocard">{publicationDate ?? "Unknown"}</p>
        </article>
        <i className="i4" />
        <span className="corner_styled"></span>
      </div>
    </Link>
  );
};
