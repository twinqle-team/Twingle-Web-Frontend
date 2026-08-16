import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Home, ReceiptText, Settings, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { MdRealEstateAgent } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { VscPreview } from "react-icons/vsc";
import { FcAutomotive } from "react-icons/fc";
import {  useSelector } from "react-redux";
// import { useQuery } from "@tanstack/react-query";

// import { logoutVendor } from "@/redux/slices/vendorSlice";
// import { useDarkMode } from "../Context/DarkModeContext";

import { Link } from "react-router-dom";
// import { get_single_vendor } from "@/utils/vendorApi";
interface SideBarProps {
  darkMode: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ darkMode }) => {


  interface RootState {
    vendor: {
      token: string;
      _id: string;
      vendor: {
        id: string;
      };
    };
  }
  const user = useSelector((state: RootState) => state.vendor)

  console.log(user)

 

  // const { data: vendors } = useQuery({
  //   queryKey: ["vendor"],
  //   queryFn: () => get_single_vendor(user.token),
  // });
  // const { darkMode } = useDarkMode();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handle_logOut = () => {
  //   dispatch(logoutVendor());
  //   navigate("/login-vendor");
  // };
  return (
    <aside
      className={`w-64 p-5 h-screen flex flex-col justify-between overflow-y-auto transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-[#F5F8FA] text-gray-900"
      }`}
    >
      <div>

        <div className="mb-5 text-2xl font-bold text-[#1E8863]">
          <Link to="/">
            <span>TWINQLE</span>
          </Link>
        </div>
        <nav>
          <NavItem title="Dashboard" to="/app" Icon={Home} />

          <NavItem
            title="Real Estate"
            subItems={["My Properties", "New Property"]}
            Icon={MdRealEstateAgent}
          />

          <NavItem
            title="Customers"
            to="customers"
            Icon={FaPersonCircleCheck}
          />

          <NavItem
            title="Automotive"
            subItems={["My Automotives", "New Automotive"]}
            Icon={FcAutomotive}
          />
          <NavItem title="Messages" to="inbox" Icon={TiMessages} />


          <NavItem title="Payment" to="payment" Icon={RiSecurePaymentFill} />

          <NavItem title="USers Manger" to="all" Icon={ReceiptText} />

          <NavItem title="Reviews" to="reviews" Icon={VscPreview} />

          <NavItem title="Settings" to="settings" Icon={Settings} />

          {/* <NavItem title="LogOut" onClick={handle_logOut} Icon={LogOutIcon} /> */}
          <br />
          <NavItem title="LogOut" Icon={AiOutlineLogout} />
        </nav>
      </div>
      <br />

    </aside>
  );
};

const NavItem = ({
  title,
  to,
  subItems,
  Icon,
  onClick,
}: {
  title: string;
  to?: string;
  onClick?: () => void;
  subItems?: string[];
  Icon?: React.ComponentType<{ className?: string }>;
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (subItems) {
      setOpen(!open);
    }
  };

  return (
    <div>
      <div
        className={`p-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#004e27] rounded ${
          open ? "bg-[#004e27] text-white" : ""
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5" />}
          {to && !subItems ? (
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-[#004e27]"
                  : "text-gray-700 dark:text-gray-300"
              }
            >
              {title}
            </NavLink>
          ) : (
            <span>{title}</span>
          )}
        </div>
        {subItems && (
          <ChevronDown className={`w-5 h-5 ${open && "rotate-180"}`} />
        )}
      </div>
      {subItems && (
        <motion.div
          className="pl-8 overflow-hidden"
          initial={false}
          animate={{ height: open ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          {subItems.map((item) => (
            <NavLink
              key={item}
              to={item.toLowerCase().replace(/ /g, "-")}
              className={({ isActive }) =>
                `block py-1 ${
                  isActive
                    ? "text-[orange-500] font-semibold"
                    : "hover:text-gray-600 dark:hover:text-gray-300"
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SideBar;
