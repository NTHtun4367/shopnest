import { Package } from "lucide-react";
import { Link } from "react-router";

interface Page {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const pages: Page[] = [
  {
    name: "Product Management",
    path: "/admin/manage-products",
    icon: <Package className="w-5 h-5" />,
  },
];

function Sidebar() {
  return (
    <div className="space-y-4">
      {pages.map((page, index) => (
        <div key={index} className="flex items-center gap-1">
          {page.icon}
          <Link to={page.path} className="font-medium">
            {page.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
