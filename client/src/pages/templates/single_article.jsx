import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/api";
import AuthService from "../../services/auth_services";
import axios from "axios";
import NavigationBar from "../../components/nav/nav";
import "../../style/index.css";
import "../styles/single_article.css";

const SingleArticle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const _authService = new AuthService();
  const [articleDatas, setArticleDatas] = useState([]);
  const [idArticle, setIdArticle] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const [titleCtrl, setTitleCtrl] = useState("");
  const [subtitleCtrl, setSubtitleCtrl] = useState("");
  const [contentCtrl, setContentCtrl] = useState("");
  const [articleImgCtrl, setArticleImgCtrl] = useState("");

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    };

    const formattedDate = date.toLocaleString("fr-FR", options);
    return formattedDate.replace(
      /(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/,
      "$3/$2/$1 $4:$5:$6"
    );
  }

  const fetchArticle = async () => {
    const path = location.pathname.split("/");
    await axios
      .get(apiUrl + "articles/" + (idArticle ?? path[path.length - 1]), {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setArticleDatas(response.data.article);
      });
  };

  useEffect(() => {
    const path = location.pathname.split("/");
    setIdArticle(path[path.length - 1]);
    fetchArticle();
  }, []);

  const SumbitEdit = async () => {
    if (isEditing) {
      await axios.put(
        apiUrl + "articles/update/" + idArticle,
        {
          title: titleCtrl != "" ? titleCtrl : articleDatas.title,
          subtitle: subtitleCtrl != "" ? subtitleCtrl : articleDatas.subtitle,
          illustrationLink:
            articleImgCtrl != ""
              ? articleImgCtrl
              : articleDatas.illustrationLink,
          content: contentCtrl != "" ? contentCtrl : articleDatas.content,
          publicationDate: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
        },
        {
          headers: {
            Authorization: "Bearer " + _authService.getCookie(),
            "Content-Type": "application/json",
          },
        }
      );
      setIsEditing(false);
      fetchArticle();
    } else {
      setIsEditing(true);
    }
  };

  const DeleteArticle = async () => {
    await axios.delete(apiUrl + "articles/delete/" + idArticle, {
      headers: {
        Authorization: "Bearer " + _authService.getCookie(),
        "Content-Type": "application/json",
      },
    }).then(()=> {
        navigate('/');
    }).catch((err)=> {
        console.error(err.message);
    });
  };
  return (
    <>
      <NavigationBar />
      <main className="columnContainer alignCenter container_single_article">
        <img
          src={articleDatas.illustrationLink ?? "No Img"}
          alt="article image"
        />
        <section className="container_single_header columnContainer alignCenter">
          {isEditing ? (
            <input
              type="text"
              placeholder={articleDatas.title}
              onChange={(e) => setTitleCtrl(e.target.value)}
            />
          ) : (
            <h1>{articleDatas.title ?? "No title"}</h1>
          )}
          {isEditing ? (
            <input
              type="text"
              placeholder={articleDatas.subtitle}
              onChange={(e) => setSubtitleCtrl(e.target.value)}
            />
          ) : (
            <h3>{articleDatas.subtitle ?? "No Subtitle"}</h3>
          )}
          <h5>By {articleDatas.authorName ?? "Unknowned"}</h5>

          <h5>Published on {formatDate(articleDatas.publicationDate)}</h5>
          {isEditing && (
            <input
              type="text"
              placeholder={articleDatas.illustrationLink}
              onChange={(e) => setArticleImgCtrl(e.target.value)}
            />
          )}
        </section>
        {articleDatas.canEdit && (
          <section className="rowContainer container_panel_single">
            <button onClick={SumbitEdit} className="btn_edit_article">
              {isEditing ? "Confirm" : "Edit"}
            </button>
            <button className="btn_delete_article" onClick={DeleteArticle}>Delete</button>
          </section>
        )}
        <span className="separator_article"/>
        {isEditing ? (
          <textarea
            cols="30"
            rows="10"
            onChange={(e) => setContentCtrl(e.target.value)}
            placeholder={articleDatas.content}
          ></textarea>
        ) : (
          <p>{articleDatas.content ?? "No content"}</p>
        )}
      </main>
    </>
  );
};

export default SingleArticle;
