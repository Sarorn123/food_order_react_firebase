import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import { useEffect } from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const checkRole = () => {
    if (authContext?.role === "Admin") {
      navigate("/");
    } else if (authContext?.role === "Chef") {
      navigate("/order");
    } else if (authContext?.role === "User") {
      navigate("/food-list");
    }
  };

  useEffect(() => {
    checkRole();
  }, [authContext?.role]);

  return <div className="text-red-400">Dashboard</div>;
};

export default Dashboard;
