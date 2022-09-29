import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import { useEffect, useState } from 'react';
import React from "react";
import Table from "./Table";
import Chart from "./Chart";
import { useThemeContext } from "../../../context/themeContext";
import { getDashboardData } from './Call_API';
import moment from 'moment';

type Props = {};

const Dashboard = (props: Props) => {
  const authContext = useAuthContext();
  const themeContext = useThemeContext();
  const navigate = useNavigate();
  const [money, setMoney] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  });
  const [today, setToday] = useState(new Date().toDateString());
  const [orderToday, setOrderToday] = useState([]);

  const checkRole = () => {
    switch (authContext?.role) {
      case "Admin":
        navigate("/");
        break;
      case "Chef":
        navigate("/order");
        break;
      case "User":
        navigate("/food-list");
        break;
    }

    // if (authContext?.role === "Admin") {
    //   navigate("/");
    // } else if (authContext?.role === "Chef") {
    //   navigate("/order");
    // } else if (authContext?.role === "User") {
    //   navigate("/food-list");
    // }
  };

  useEffect(() => {
    checkRole();
    getDashboardData(money, setMoney, setOrderToday);
  }, [authContext?.role]);

  return (
    <>
      <h1 className="text-gray-500 font-bold ">Dashboard</h1>
      <h2 className="text-gray-400">{today}</h2>
      <div className="mt-2 lg:mt-5 lg:flex lg:gap-4">
        <div className="wrapper lg:w-[60%] flex flex-col gap-4">
          <div className="left lg:flex lg:justify-between lg:gap-4 w-full">
            <div
              className={`bg-${themeContext?.primaryColor} shadow-md border w-full rounded-md p-4 mt-2 lg:mt-0 hover:shadow-lg hover:scale-105`}
            >
              <p className="font-semibold text-gray-100">Today</p>
              <h3 className="mt-2 font-bold text-white text-xl">
                $ {money.today}
                <span className="text-green-200 font-[500] text-xs ml-2">
                  +$ 200
                </span>
              </h3>
            </div>

            <div className="shadow-md border w-full rounded-md p-4 mt-2 lg:mt-0  hover:shadow-lg hover:scale-105">
              <p className="font-semibold text-gray-400">This Week</p>
              <h3 className="mt-2 font-bold text-gray-700 text-xl">
                $ 10,000
                <span className="text-green-500 font-[500] text-xs ml-2">
                  +$ 200
                </span>
              </h3>
            </div>

            <div className="shadow-md border w-full rounded-md p-4 mt-2 lg:mt-0  hover:shadow-lg hover:scale-105">
              <p className="font-semibold text-gray-400">This Month</p>
              <h3 className="mt-2 font-bold text-gray-700 text-xl">
                $ 20,000
                <span className="text-green-500 font-[500] text-xs ml-2">
                  +$ 200
                </span>
              </h3>
            </div>
          </div>
          <Chart />
        </div>

        <div className="right lg:w-[40%]">
          <Table data={orderToday} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
