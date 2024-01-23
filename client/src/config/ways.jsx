import { Home } from "../pages/templates/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/templates/signIn";
import { SingUp } from "../pages/templates/signUp";
import AddArticle from "../pages/templates/add";

function Ways() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/add-article" element={<AddArticle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Ways;
