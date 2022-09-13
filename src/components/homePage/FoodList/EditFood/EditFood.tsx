import React, { ReactElement } from "react";
import { useState, useEffect } from "react";
import { useThemeContext } from "../../../../context/themeContext";
import { getFood, updateFood } from "../Call_API";

interface Props {
  id: string;
}

function EditFood({ id }: Props): ReactElement {
  const themeContext = useThemeContext();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getSingleFood = async () => {
    await getFood(id, setName, setPrice, setImageURL);
  };

  const editFood = async () => {
    await updateFood(name, price, id);
  };

  useEffect(() => {
    getSingleFood();
  }, []);

  return (
    <div className="flex  flex-col  p-10">
      <input
        type="text"
        placeholder="Name"
        className="border rounded-md px-4 py-2 mt-4 outline-none text-gray-400"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="number"
        placeholder="Price"
        className="border rounded-md px-4 py-2 mt-4 outline-none text-gray-400"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <img src={imageURL} className="w-20 h-20 object-cover rounded-md mt-4" />
      <button
        className={`bg-${themeContext?.primaryColor} rounded-md px-4 py-2 mt-4 text-white shadow-md shadow-green-200 active:bg-gray-400`}
        onClick={() => editFood()}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
}

export default EditFood;
