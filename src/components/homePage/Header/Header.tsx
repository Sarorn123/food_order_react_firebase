import { BsPersonCircle } from "react-icons/bs";
import { AiFillBell } from "react-icons/ai";
import { useThemeContext } from "../../../context/themeContext";
import { FiLogOut } from "react-icons/fi";
import { useAuthContext } from "../../../context/authContext";
import { AiOutlineBgColors } from "react-icons/ai";
import { useState, useEffect } from "react";
import { getNotification } from "./Api_Call";

type Props = {};

function Header({}: Props) {
  const themeContext = useThemeContext();
  const authContext = useAuthContext();

  const [notices, setNotice] = useState<number>(0);

  useEffect(() => {
    !authContext?.loading &&
      getNotification(authContext?.currentUser?.email, setNotice);
  }, [authContext?.loading]);

  const colors = [
    {
      color: "red-500",
    },
    {
      color: "blue-500",
    },
    {
      color: "green-500",
    },
    
  ];

  return (
    <>
      <div
        className={`h-[10vh] bg-${themeContext?.primaryColor} max-h-[10vh] fixed top-0 w-full z-50`}
      >
        <div className="flex justify-between h-full items-center w-[90%] lg:w-[80%] mx-auto">
          <h1 className="text-white">MyFood</h1>
          <div className="flex items-center text-white">
            <p className="mr-2 lg:mr-4 text-sm">{authContext?.role}</p>

            <p className="mr-2 lg:mr-4 text-sm">
              {authContext?.currentUser?.displayName}
            </p>

            {authContext?.currentUser?.photoURL ? (
              <img
                src={authContext?.currentUser?.photoURL}
                className="w-7 h-7 rounded-full object-cover mr-2 lg:mr-4"
              />
            ) : (
              <BsPersonCircle className="mr-2 lg:mr-4 text-2xl cursor-pointer hover:text-gray-400 transition ease-in-out duration-250" />
            )}

            {notices !== 0 && (
              <div className="relative ">
                <p className="text-white bg-red-500 absolute -top-2 right-2 h-4 w-4 flex items-center justify-center rounded-lg ">
                  {notices}
                </p>
                <AiFillBell className="mr-2 lg:mr-4 text-2xl cursor-pointer hover:text-gray-400 transition ease-in-out duration-250" />
              </div>
            )}

            <div className="group inline-block relative">
              <AiOutlineBgColors className="mr-2 lg:mr-4 text-2xl cursor-pointer hover:text-gray-400 transition ease-in-out duration-250" />
              <ul className="absolute hidden text-gray-700 pt-1 group-hover:block w-[5rem] ">
                {colors.map((result) => (
                  <li
                    className={`bg-${result.color} p-2 rounded-md text-white text-sm cursor-pointer `}
                    key={result.color}
                    onClick={() =>
                      themeContext?.updatePrimaryColor(result.color)
                    }
                  >
                    {result.color}
                  </li>
                ))}
              </ul>
            </div>


            <FiLogOut
              className="text-2xl cursor-pointer hover:text-gray-400 transition ease-in-out duration-250"
              onClick={authContext?.logOut}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
