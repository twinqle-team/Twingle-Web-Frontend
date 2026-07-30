import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Star,
  CheckCircle,
  Settings,
  LogOut,
  MessageSquare,
  Calendar,
} from "lucide-react";

const navItems = [
  { to: "/profile", label: "Overview", Icon: Home },
  { to: "/profile/saved", label: "Saved Properties", Icon: Star },
  { to: "/profile/visits", label: "My Visits", Icon: Calendar },
  { to: "/profile/messages", label: "Messages", Icon: MessageSquare },
  { to: "/profile/verification", label: "Verification", Icon: CheckCircle },
  { to: "/profile/settings", label: "Settings", Icon: Settings },
];

const ProfileSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-between h-full p-4 ">
      <div>
        <nav className="flex flex-col gap-2">
          {navItems.map(({ to, label, Icon }) => {
            const active =
              location.pathname === to ||
              location.pathname.startsWith(to + "/");
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-4 rounded-md px-3 py-3 text-base transition-colors ${
                  {
                    true: "bg-teal-50 text-teal-600 font-semibold",
                  }[String(active)] ?? "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="leading-none">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <Link
          to="/logout"
          className="flex items-center gap-3 px-3 py-2 text-base text-red-600 rounded-md hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default ProfileSidebar;
