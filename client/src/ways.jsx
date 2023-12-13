import {Home} from "./pages/templates/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/templates/signIn";
import { SingUp } from "./pages/templates/signUp";

function Ways() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SingUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Ways;
