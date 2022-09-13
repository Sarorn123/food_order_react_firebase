import { useAuthContext } from "../../context/authContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import signinSVG from "../../asset/images/signin.svg";
import googleLogo from "../../asset/images/google-logo.png";
import { useThemeContext } from "../../context/themeContext";
import { useState } from 'react';

interface Props {}

const SingIn = (props: Props) => {
  const authContext = useAuthContext();
  const themeContext = useThemeContext();

  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const logInEmailPassword = async () => {
    const res = await authContext?.signInEmailPassword(email, password);
    setMessage(res);
  }

  if (authContext?.currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`h-screen w-full bg-[${themeContext?.theme}]`}>
      <div
        className=" 
      mx-auto flex flex-col  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  justify-center rounded-md bg-[#42d4a7]  w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] h-[65vh]  md:h-[60vh] lg:h-[80vh] p-5 md:p-10 lg:p-20
      "
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Login &#8594;</h1>
          <img src={signinSVG} alt="singin SVG" className="h-[100px]" />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="border px-4 py-2 rounded-md mt-5"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-2 rounded-md mt-5"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <p className="mt-4 text-red-500 ">{message}</p>

        <button className="bg-blue-500 text-white p-2 mt-4 rounded-md hover:bg-blue-400"
        onClick={logInEmailPassword}
        >
          {
            authContext?.loading ? "Loading..." : "Log In "
          } &#8594;
        </button>
        <button
          className="bg-gray-900 text-white p-2 mt-5 rounded-md hover:bg-gray-700 flex items-center justify-center"
          onClick={authContext?.signInPopup}
          disabled={authContext?.loading}
        >
          <span>
            <img src={googleLogo} alt="googleLogo" className="h-[20px] mr-5" />
          </span>
          Sing In With Google
        </button>

        <p className="mt-5 text-sm lg:text-md text-white">
          Don't Have An Account ?{" "}
          <Link to={"/auth/signup"}>
            <span className="hover:underline text-blue-500">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SingIn;
