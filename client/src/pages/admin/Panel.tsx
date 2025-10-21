import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

function Panel() {
  return (
    <section className="grid grid-cols-10 mt-8">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-8">
        <Outlet />
      </div>
    </section>
  );
}

export default Panel;
