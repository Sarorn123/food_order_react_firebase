import React from "react";
import OrderHistoryTable from "./OrderHistoryTable";
import { useState, useEffect } from "react";
import { OrderInterface } from "../Order/Interface";
import { getAllOrdersHistory } from "./Call_Api";
import { useAuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

interface Props {}

const OrderHistory = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderInterface[]>([]);

  const authContext = useAuthContext();

  const navigate = useNavigate();
  const checkRole = () => {
    if (authContext?.role == "Chef") {
      navigate("/order");
    }
  };

  useEffect(() => {
    checkRole();
  }, [authContext?.role]);

  const listenOrder = async () => {
    !authContext?.loading &&
      getAllOrdersHistory(
        authContext?.currentUser?.email,
        setOrders,
        setLoading
      );
  };

  useEffect(() => {
    listenOrder();
  }, [authContext?.loading]);

  return (
    <div>
      <h1 className="text-gray-500 font-bold mb-4">Your History</h1>
      {authContext?.loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No Data</p>
      ) : (
        <OrderHistoryTable data={orders} />
      )}
    </div>
  );
};

export default OrderHistory;
