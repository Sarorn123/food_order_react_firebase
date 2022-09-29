import React, { ReactElement } from "react";
import { useThemeContext } from "../../../context/themeContext";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getOneOrder, makeOrderDone } from './Api_Call';
import { OrderInterface } from "./Interface";

interface Props {
  id: string;
  toggleModal: any;
}

function FoodOrderModal({ id, toggleModal }: Props): ReactElement {
  const [order, setOrder] = useState<OrderInterface>();
  useEffect(() => {
    getOneOrder(id, setOrder);
  }, []);

  const themeContext = useThemeContext();

  return (
    <>
      <div
        className="w-full h-screen fixed top-0 left-0 z-30 bg-black opacity-50"
        onClick={() => {
          toggleModal(false);
        }}
      ></div>
      <div className="w-[90%] md:w-[70%] lg:w-[50%] p-10  bg-white z-50 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-slate-500 font-semibold capitalize">
              {order?.customer}
            </h1>
            <p className="text-gray-400">{order?.email}</p>
            <p className="text-gray-400">Table No : {order?.table}</p>
          </div>
          {order?.status ? (
            <p className={`text-green-500 font-bold`}>Doned</p>
          ) : (
            <button
              className={`p-2 rounded-md bg-${themeContext?.primaryColor} text-white shadow-md shadow-green-200 active:bg-gray-400`}
              onClick={() => makeOrderDone(id)}
            >
              MakeDone
            </button>
          )}
        </div>

        {order?.foods.map((food: any) => (
          <div
            className="card bg-white shadow-md p-2 flex items-center rounded-md hover:shadow-xl cursor-pointer mt-4 border"
            key={food.name}
          >
            <img
              src={food.image_url}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="ml-4">
              <h1 className="font-semibold text-lg">{food.food}</h1>
              <p className="text-gray-400">${food.price}</p>
              <p className="text-gray-400"> * {food.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FoodOrderModal;
