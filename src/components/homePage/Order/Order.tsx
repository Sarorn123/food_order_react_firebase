import Table from "./Table";
import { useEffect, useState } from "react";
import { getAllOrders } from "./Api_Call";
import { OrderInterface } from "./Interface";
import { useAuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

type Props = {};

function Order({}: Props) {
  const authContext = useAuthContext();

  const navigate = useNavigate();

  const checkRole = () => {
    if (authContext?.role == "User") {
      navigate("/order-history");
    }
  };

  useEffect(() => {
    checkRole();
  }, [authContext?.role]);

  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderInterface[]>([]);

  const listenToOrder = () => {
    getAllOrders(setOrders, setLoading);
  };

  useEffect(() => {
    listenToOrder();
  }, []);

  return (
    <>
      <div className="flex flex-col">
      <h1 className="text-gray-500 font-bold ">Order</h1>
        <div className="overflow-x-auto">
          <div className="flex justify-between py-3">
            <div className="relative max-w-xs">
              <label htmlFor="hs-table-search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                name="hs-table-search"
                id="hs-table-search"
                className="block w-full p-3 pl-10 text-sm border border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="h-3.5 w-3.5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
          </div>

          {!loading && orders.length === 0 ? (
            <p>No Data</p>
          ) : (
            <Table data={orders} />
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
