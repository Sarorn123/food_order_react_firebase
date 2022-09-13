import { useAuthContext } from "../../context/authContext";
import { Navigate, Link } from "react-router-dom";
import signinSVG from "../../asset/images/signin.svg";
import { useThemeContext } from "../../context/themeContext";
import { useState, useEffect } from "react";

interface Props {}

const SignUp = (props: Props) => {
  const authContext = useAuthContext();
  const themeContext = useThemeContext();

  const [email, setEmail] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const checkUser = () => {
    if (authContext?.currentUser) {
      return <Navigate to="/" />;
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const SingIn = async () => {
    if (email === "" || password === "" || rePassword === "") {
      setMessage("Everything is required !");
    } else {
      if (password !== rePassword) {
        setMessage("Re Password Must Same as Password !");
      } else if (password.length < 6) {
        setMessage("Password Must Longger than 6 Character !");
      } else {
        const res: string = await authContext?.SignUpWithEmailAndPassword(
          email,
          password,
          displayName
        );
        setMessage(res);
      }
    }
  };

  return (
    <div className={`h-screen w-full bg-[${themeContext?.theme}]`}>
      <div
        className=" 
      mx-auto flex flex-col  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  justify-center rounded-md bg-[#42d4a7]  w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] h-[65vh]  md:h-[60vh] lg:h-[80vh] p-5 md:p-10 lg:p-20
      "
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Sign Up &#8594;</h1>
          <img src={signinSVG} alt="singin SVG" className="h-[100px]" />
        </div>

        <input
          type="Username"
          placeholder="Username"
          className="border px-4 py-2 rounded-md mt-5"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border px-4 py-2 rounded-md mt-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-2 rounded-md mt-5"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Re-Password"
          className="border px-4 py-2 rounded-md mt-5"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />

        <p className="text-red-500 text-md mt-4">{message}</p>

        <button
          className="bg-blue-500 text-white p-2 mt-4 rounded-md hover:bg-blue-400"
          onClick={SingIn}
          disabled={authContext?.loading}
        >
          {authContext?.loading ? "Loading... " : "Sign Up "}
          &#8594;
        </button>
        <p className="mt-5 text-sm lg:text-md text-white">
          Already Have An Account ?
          <Link to={"/auth/signin"}>
            <span className="hover:underline  text-blue-500">Log In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
