import { useEffect, useState } from "react";
import { getAllFoods } from "./Call_API";
import FootListCard from "./FoodListCard";
import { FoodInterface } from "./interface";
import { useAuthContext } from "../../../context/authContext";
import { useThemeContext } from "../../../context/themeContext";
import Drawer from "../../utils/Drawer";
import { MdFastfood } from "react-icons/md";

// Icons
import { AiOutlinePlus } from "react-icons/ai";
import CartDrawer from "./Cart/CartDrawer";

type Props = {};
function FoodList({}: Props) {
  const authContext = useAuthContext();
  const themeContext = useThemeContext();
  const [foods, setFoods] = useState<FoodInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);

  const getAllFoodsData = async () => {
    getAllFoods(setFoods, setLoading);
  };

  useEffect(() => {
    getAllFoodsData();
  }, []);

  return (
    <>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <CartDrawer isOpen={openCart} setIsOpen={setOpenCart} />
      {!authContext?.loading && (
        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-500 font-bold ">Food List</h1>
          <div className="flex items-center ">
            {authContext?.role !== "User" && (
              <button
                className={`bg-${themeContext?.primaryColor} px-2 py-2 lg:px-3 lg:py-3 text-white rounded-md text-sm flex items-center shadow-md shadow-green-200`}
                onClick={() => setIsOpen(true)}
              >
                <span className="mr-1">Add Food </span> <AiOutlinePlus />
              </button>
            )}
            {authContext?.role !== "Chef" && (
              <button
                className={`bg-${themeContext?.primaryColor} px-2 py-2 lg:px-3 lg:py-3 text-white rounded-md text-lg flex items-center shadow-md shadow-green-200 mx-4`}
                onClick={() => setOpenCart(true)}
              >
                <MdFastfood />
              </button>
            )}
          </div>
        </div>
      )}
      {loading ? (
        <h1>Loading...</h1>
      ) : foods.length === 0 ? (
        <h1>No data</h1>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 4xl:flex 4xl:flex-wrap 4xl:justify-center gap-2 lg:gap-4">
          {foods.map((result) => (
            <FootListCard
              id={result.id}
              name={result.name}
              image_url={result.image_url}
              price={result.price}
              image_path={result.image_path}
              key={result.id}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default FoodList;
