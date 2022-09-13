import React, { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useThemeContext } from "../../../context/themeContext";
import { BiFoodMenu } from "react-icons/bi";
import { useAuthContext } from "../../../context/authContext";

interface Props {}

function Sidebar({}: Props): ReactElement {
  const themeContext = useThemeContext();
  interface MenuType {
    name: string;
    url: string;
    icon: any;
  }

  let menu: MenuType[] = [];
  const authContext = useAuthContext();

  if (authContext?.role === "Admin") {
    menu = [
      {
        name: "Dashboard",
        url: "/",
        icon: <MdDashboard />,
      },
      {
        name: "Food List",
        url: "/food-list",
        icon: <BiFoodMenu />,
      },
      {
        name: "Order",
        url: "/order",
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: "Order History",
        url: "/order-history",
        icon: <AiOutlineShoppingCart />,
      },
    ];
  } else if (authContext?.role == "Chef") {
    menu = [
      {
        name: "Food List",
        url: "/food-list",
        icon: <BiFoodMenu />,
      },
      {
        name: "Order",
        url: "/order",
        icon: <AiOutlineShoppingCart />,
      },
    ];
  } else if (authContext?.role == "User"){
    menu = [
      {
        name: "Food List",
        url: "/food-list",
        icon: <BiFoodMenu />,
      },
      {
        name: "Order History",
        url: "/order-history",
        icon: <AiOutlineShoppingCart />,
      },
    ];
  }

  const location = useLocation();

  return (
    <div className="h-[90vh]  border border-l-4 py-4 w-[20%] fixed bottom-0 bg-white shadow-xl">
      <h1 className="text-slate-400  pb-5 font-semibold pl-2 lg:pl-10">Menu</h1>
      {menu.map((result, index) => (
        <Link to={result.url} key={index}>
          <div
            className={`group py-2 mt-1  rounded-md flex items-center bg-${
              location.pathname === result.url && themeContext?.primaryColor
            } hover:bg-gray-400 pl-2 lg:pl-10`}
          >
            <span
              className={`text-[white] bg-${themeContext?.primaryColor} rounded-md mr-1 lg:mr-2 p-1 lg:p-2`}
            >
              {result.icon}
            </span>
            <p
              className={` text-sm group-hover:text-white hidden md:block ${
                location.pathname === result.url
                  ? "text-white"
                  : "text-slate-400"
              }`}
            >
              {result.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
