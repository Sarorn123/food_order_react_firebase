import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { getAllCarts, updateQuantity } from "./Call_Api";
import { useThemeContext } from "../../../../context/themeContext";
import { useAuthContext } from "../../../../context/authContext";
import { orderFood } from "../../Order/Api_Call";

type Props = {
  isOpen: boolean;
};

function CartList({ isOpen }: Props) {
  interface CartInterface {
    id: string;
    food: string;
    food_id: string;
    image_url: string;
    price: string;
    quantity: string;
    user_id: string;
    created_at: Timestamp;
  }

  const authContext = useAuthContext();
  const themeContext = useThemeContext();

  const [table, setTable] = useState<string>("");

  const [carts, setCarts] = useState<CartInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [updateQuantityLoading, setUpdateQuantityLoading] =
    useState<boolean>(false);

  const listenToCart = () => {
    isOpen &&
      getAllCarts(
        setCarts,
        setLoading,
        setTotal,
        authContext?.currentUser?.uid
      );
  };

  useEffect(() => {
    listenToCart();
  }, [isOpen]);

  const letOrderFoods = async () => {
    if (table !== "") {
      await orderFood(
        table,
        authContext?.currentUser?.displayName,
        authContext?.currentUser?.email,
        total,
        carts,
        setUpdateQuantityLoading
      );
    } else {
      alert("Please select table !");
    }
  };

  return (
    <div className="p-5">
      {loading ? (
        <h1>Loading</h1>
      ) : carts.length === 0 ? (
        <h1>No Data</h1>
      ) : (
        <>
          {
            <div className="flex justify-between my-2 md:my-10 lg:my-2 items-center  overflow-auto">
              {updateQuantityLoading ? (
                <button
                  className={`bg-gray-400 text-sm px-3 py-2 text-white rounded-md mt-1 shadow-md shadow-green-200`}
                >
                  Order
                </button>
              ) : (
                <div>
                  <button
                    className={`bg-${themeContext?.primaryColor} text-sm px-3 py-2 text-white rounded-md mt-1 shadow-md shadow-green-200`}
                    onClick={letOrderFoods}
                  >
                    Order
                  </button>
                  <select
                    name="table"
                    id="table"
                    className={`bg-${themeContext?.primaryColor} ml-2 px-3 py-2 rounded-md text-white outline-none`}
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                  >
                    <option value="" defaultChecked>
                    Table
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
              )}
              <p className="text-md font-semibold">Total : ${total}</p>
            </div>
          }
          {carts.map((item) => (
            <div
              className="flex shadow-md rounded-md  overflow-hidden justify-between p-5 mt-2 hover:shadow-lg hover:scale-105 transition ease-in-out duration-150"
              key={item.id}
            >
              <div className="flex">
                <img
                  src={item.image_url}
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div className="ml-5">
                  <p className="text-gray-500 font-semibold text-lg">
                    {item.food}
                  </p>
                  <p className="text-gray-400  text-sm">${item.price}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                {updateQuantityLoading ? (
                  <p>...</p>
                ) : (
                  <AiOutlinePlus
                    className="bg-green-500 text-white rounded-md h-6 w-6 p-1 cursor-pointer"
                    onClick={() =>
                      updateQuantity(
                        true,
                        item.food_id,
                        authContext?.currentUser?.uid,
                        setUpdateQuantityLoading,
                        item.id
                      )
                    }
                  />
                )}
                <p className="text-gray-500">{item.quantity}</p>
                {updateQuantityLoading ? (
                  <p>...</p>
                ) : (
                  <AiOutlineMinus
                    className="bg-red-500 text-white rounded-md h-6 w-6 p-1 cursor-pointer"
                    onClick={() =>
                      updateQuantity(
                        false,
                        item.food_id,
                        authContext?.currentUser?.uid,
                        setUpdateQuantityLoading,
                        item.id
                      )
                    }
                  />
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default CartList;
