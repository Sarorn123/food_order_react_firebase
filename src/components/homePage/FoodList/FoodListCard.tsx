import { useThemeContext } from "../../../context/themeContext";
import { FoodInterface } from "./interface";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useAuthContext } from "../../../context/authContext";
import Modal from "../../utils/Modal";
import { useState, useEffect } from "react";
import { deleteFood } from "./Call_API";
import EditFootDrawer from "./EditFood/EditFootDrawer";
import { addToCart } from "../Order/Api_Call";
import { Timestamp } from "firebase/firestore";
import { checkIfExistInCart } from "./Cart/Call_Api";

const FootListCard = ({
  id,
  name,
  image_url,
  price,
  image_path,
}: FoodInterface) => {
  const themeContext = useThemeContext();
  const authContext = useAuthContext();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const [carted, setCarted] = useState(false);

  const handleModalAction = async (action: boolean) => {
    if (action) {
      deleteFood(id, image_path, setLoading);
    } else {
      setOpenModal(false);
    }
  };

  const handleEditFood = () => {
    setOpenDrawer(true);
  };

  const addFood = () => {
    addToCart(
      {
        id: "",
        food: name,
        food_id: id,
        image_url: image_url,
        image_path: image_path,
        price: price,
        quantity: 1,
        user_id: authContext?.currentUser?.uid,
        created_at: Timestamp.now(),
      },
      setOrderLoading
    );
  };

  const checkIfExist = async () => {
    checkIfExistInCart(id, authContext?.currentUser?.uid, setCarted);
  };

  useEffect(() => {
    checkIfExist();
  }, []);

  return (
    <>
      <EditFootDrawer isOpen={openDrawer} setIsOpen={setOpenDrawer} id={id} />
      <div className="card overflow-hidden rounded-md  shadow-md cursor-pointer transition ease-in-out duration-150 group hover:shadow-lg h-[17rem] ">
        <img
          src={image_url}
          className="transition ease-in-out duration-150 h-[60%] w-full object-cover group-hover:scale-105"
        />
        <h1 className="text-gray-700 font-bold mt-2 mx-4">{name}</h1>
        <p className="text-slate-400 mx-4">${price}</p>
        <div className="flex items-center justify-between mr-4">
          {authContext?.role !== "Chef" &&
            (carted ? (
              <button
                className={`bg-gray-400 mx-4 text-sm px-3 py-2 text-white rounded-md mt-1 shadow-md shadow-gray-300`}
              >
                Added
              </button>
            ) : (
              <button
                className={`bg-${themeContext?.primaryColor} mx-4 text-sm px-3 py-2 text-white rounded-md mt-1 shadow-md shadow-green-200`}
                onClick={addFood}
                disabled={orderLoading}
              >
                {orderLoading ? "Loading..." : carted ? "Added" : "Order"}
              </button>
            ))}

          {authContext?.role !== "User" && (
            <div className={`flex items-center ml-4 mt-2`}>
              <AiFillEdit
                className="text-2xl cursor-pointer text-blue-500  px-1 rounded-md bg-gray-200 mr-1"
                onClick={handleEditFood}
              />
              <AiFillDelete
                className="text-2xl cursor-pointer text-red-500 px-1 rounded-md bg-gray-200"
                onClick={() => {
                  setOpenModal(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
      {openModal && (
        <Modal handleModalAction={handleModalAction} loading={loading} />
      )}
    </>
  );
};
export default FootListCard;
