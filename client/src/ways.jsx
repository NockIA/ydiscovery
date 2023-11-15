import Home from "./pages/templates/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Ways() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Ways;
