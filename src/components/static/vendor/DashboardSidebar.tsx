import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Home, ReceiptText, Settings, ChevronDown, X } from "lucide-react";
import { motion } from "framer-motion";
import { MdRealEstateAgent, MdVerifiedUser } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { VscPreview } from "react-icons/vsc";
import { FcAutomotive } from "react-icons/fc";

import { useSelector } from "react-redux";
// import { get_single_vendor } from "@/utils/vendorApi";
interface DashboardSidebarProps {
  darkMode: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen = false, onClose }) => {


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
    <aside className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 shrink-0 flex-col justify-between overflow-y-auto bg-white p-5 text-[#012E19] shadow-xl transition-transform duration-300 md:static md:z-auto md:w-64 md:translate-x-0 md:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div>

        <div className="mb-5 flex items-center justify-between text-2xl font-bold text-[#012E19]">
           <span>TWINQLE</span>
           <button onClick={onClose} aria-label="Close menu" className="rounded p-2 text-[#012E19] hover:bg-[#fff8df] md:hidden"><X className="h-5 w-5" /></button>
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
            to="Customers"
            Icon={FaPersonCircleCheck}
          />

          <NavItem
            title="Automotive"
            subItems={["My Automotives", "New Automotive"]}
            Icon={FcAutomotive}
          />
          <NavItem title="Messages" to="inbox" Icon={TiMessages} />
          <NavItem title="Payment" to="Payment" Icon={RiSecurePaymentFill} />
          <NavItem title="Verification" to="kyc" Icon={MdVerifiedUser} />
          <NavItem title="Billing" to="billing" Icon={ReceiptText} />
          <NavItem title="Reviews" to="reviews" Icon={VscPreview} />
          <NavItem title="Settings" to="settings" Icon={Settings} />

          <br />
          <NavItem title="LogOut" Icon={AiOutlineLogout} />
        </nav>
      </div>
      <br />

      <div className="flex items-center gap-3 rounded-lg border border-[#dce8e0] bg-[#f7faf8] p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#012E19] text-white">
          <p>V</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#012E19]">Vendor</p>
          <div className="flex items-center justify-center mt-2">
            <div className="h-3 w-3 rounded-full bg-[#F2B60A]"></div>
            <span className="ml-[3px] rounded text-xs text-[#60756a]">
              Online
            </span>
          </div>
        </div>
      </div>
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

  const getSubItemPath = (item: string) => {
    if (item === "All Properties") return "All-Properties";
    if (item === "New Property") return "new-property";
    if (item === "All Automotives") return "All-Automotives";
    if (item === "New Automotive") return "new-automotive";
    return item.toLowerCase().replace(/ /g, "-");
  };

  return (
    <div>
      <div
        className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg p-2 transition-colors hover:bg-[#012E19] hover:text-white ${
          open ? "bg-[#012E19] text-white" : ""
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5" />}
          {to && !subItems ? (
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? "font-semibold text-[#012E19]" : "text-[#60756a]"
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
              to={getSubItemPath(item)}
              className={({ isActive }) =>
                `block py-1 ${
                  isActive
                    ? "font-semibold text-[#F2B60A]"
                    : "text-[#60756a] hover:text-[#012E19]"
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

export default DashboardSidebar;
