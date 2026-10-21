import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { UserPen , Star, Logs, LogOut, MessageSquare } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logoutUser, logout } from "../../../redux/slices/userSlice";

const navItems = [
  { to: "/profile", label: "Profile", Icon: UserPen  },
  { to: "/profile/orders", label: "Orders", Icon: Logs },
  { to: "/profile/saved", label: "Saved", Icon: Star },
  { to: "/profile/messages", label: "Messages", Icon: MessageSquare },
];

const ProfileSidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { refreshToken } = useAppSelector((state) => state.user);
  const currentPath = window.location.pathname;

  const handleLogout = () => {
    // Optimistic logout: clear state and redirect immediately
    dispatch(logout());
    navigate("/login");

    // Call API in background (fire and forget)
    if (refreshToken) {
      dispatch(logoutUser({ refreshToken }));
    }
  };

  return (
    <div className="flex flex-col justify-between h-full p-4 ">
      <div>
        <nav className="flex flex-col gap-2">
          {navItems.map(({ to, label, Icon }) => {
            // Fix active state: exact match for index, startsWith for nested routes
            const active = to === "/profile" 
              ? currentPath === to
              : currentPath.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-4 rounded-md px-3 py-3 text-base transition-colors ${
                  active ? "bg-teal-50 text-teal-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
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
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-base text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
