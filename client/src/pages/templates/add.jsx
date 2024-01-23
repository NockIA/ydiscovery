import axios from "axios";
import { useState } from "react";
import { apiUrl } from "../../utils/api";
import AuthService from "../../services/auth_services";
import { useNavigate } from "react-router-dom";
import "../styles/add.css";
import NavigationBar from "../../components/nav/nav";

const AddArticle = () => {
  const [titleCtrl, setTitleCtrl] = useState("");
  const [subtitleCtrl, setSubtitleCtrl] = useState("");
  const [contentCtrl, setContentCtrl] = useState("");
  const [articleImgCtrl, setArticleImgCtrl] = useState("");
  const navigate = useNavigate();
  const _authService = new AuthService();
  const submitArticle = async () => {
    if (
      titleCtrl.trim() != "" &&
      subtitleCtrl.trim() != "" &&
      contentCtrl.trim() != "" &&
      articleImgCtrl.trim() != ""
    ) {
      await axios
        .post(
          apiUrl + "createArticle",
          {
            title: titleCtrl,
            subtitle: subtitleCtrl,
            content: contentCtrl,
            illustrationLink: articleImgCtrl,
          },
          {
            headers: {
              Authorization: `Bearer ${_authService.getCookie()}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };
  return (
    <>
      <NavigationBar />
      <main className="columnContainer container_add_form absolute_center">
        <section className="columnContainer container_header_add">
          <h1>Create your article</h1>
          <h3>Help us to enrich our site by adding your knowledge</h3>
        </section>

        <section className="columnContainer container_inputs_add">
          <article className="container_input_add columnContainer">
            <h5>Title</h5>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitleCtrl(e.target.value)}
            />
          </article>
          <article className="container_input_add columnContainer">
            <h5>Subtitle</h5>
            <input
              type="text"
              placeholder="Subtitle"
              onChange={(e) => setSubtitleCtrl(e.target.value)}
            />
          </article>
          <article className="container_input_add columnContainer">
            <h5>Link for article image</h5>

            <input
              type="text"
              placeholder="Link image"
              onChange={(e) => setArticleImgCtrl(e.target.value)}
            />
          </article>
          <article className="container_input_add columnContainer">
            <h5>Title</h5>

            <textarea
              placeholder="Content"
              cols={40}
              rows={10}
              onChange={(e) => setContentCtrl(e.target.value)}
            />
          </article>
        </section>

        <button onClick={submitArticle}>Create</button>
      </main>
    </>
  );
};

export default AddArticle;
