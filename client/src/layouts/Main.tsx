import { Outlet } from "react-router";
import NavBar from "../common/NavBar";

function Main() {
  return (
    <div>
      <NavBar />
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
