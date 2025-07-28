import { Outlet } from "react-router";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";

function Main() {
  return (
    <div>
      <NavBar />
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
