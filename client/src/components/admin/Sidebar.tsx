import { ChartLine, Package, UserCog } from "lucide-react";
import { NavLink } from "react-router";

interface Page {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const pages: Page[] = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <ChartLine className="w-5 h-5" />,
  },
  {
    name: "Product Management",
    path: "/admin/manage-products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    name: "User Management",
    path: "/admin/manage-users",
    icon: <UserCog className="w-5 h-5" />,
  },
];

function Sidebar() {
  return (
    <nav className="mr-4">
      <div className="flex flex-col gap-1 space-y-4">
        {pages.map((page, index) => (
          <NavLink
            to={page.path}
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-1 font-medium text-sm px-4 py-2 transition-colors rounded-lg ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`
            }
          >
            {page.icon}
            {page.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Sidebar;
