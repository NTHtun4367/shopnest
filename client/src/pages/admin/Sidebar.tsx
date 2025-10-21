import { PackagePlus } from "lucide-react";
import { Link } from "react-router";

const pages = [
  {
    name: "Create Product",
    path: "/admin/create-product",
    icon: <PackagePlus className="w-5 h-5" />,
  },
];

function Sidebar() {
  return (
    <div>
      {pages.map((page, index) => (
        <div key={index} className="flex items-center gap-1">
          {page.icon}
          <Link to={page.path} className="font-medium">{page.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
