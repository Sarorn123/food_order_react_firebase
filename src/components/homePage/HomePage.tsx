import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import Dashboard from "./Dashboard/Dashboard";
import Header from "./Header/Header";
import Order from "./Order/Order";
import Sidebar from "./Sidebar/Sidebar";
import FoodList from "./FoodList/FoodList";
import OrderHistory from './OrderHistory/OrderHistory';
import Permission from "./Permission/Permission";

interface Props {}

function HomePage({}: Props): ReactElement {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="px-2 lg:px-5 w-[80%] absolute right-0 mt-[15vh]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/food-list" element={<FoodList />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/permission" element={<Permission />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default HomePage;
