import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useThemeContext } from "../../../../context/themeContext";
import { addFood } from "../Call_API";
import { FileInterface } from "../interface";

type Props = {};

function AddFood({}: Props) {
  const themeContext = useThemeContext();
  const [files, setFiles] = useState<FileInterface[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { getRootProps, getInputProps } = useDropzone({
    // accept: "image/*",
    multiple: false,
    onDrop: (accepedFiles) => {
      setFiles(
        accepedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const addNewFood = async () => {
    if (name !== "" && price !== "" && files.length !== 0) {
      await addFood(name, price, files[0], setLoading);
    }
  };

  const removeItem = (name: string) => {
    setFiles(files.filter((file) => file.name !== name));
  };

  const images = files.map((file) => (
    <div
      className={`flex items-center rounded-md bg-${themeContext?.primaryColor} overflow-hidden p-2 cursor-pointer hover:bg-gray-300 mt-2 `}
      key={file.name}
      onClick={() => removeItem(file.name)}
    >
      <img src={file.preview} className="w-20 h-20 object-cover rounded-md" />
      <div className="ml-4">
        <h1 className=" text-white text-lg">{file.name}</h1>
        <h1 className=" text-white text-sm">{file.size / 1000}kb</h1>
        <h1 className=" text-white text-sm">{file.type}</h1>
      </div>
    </div>
  ));

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
        type="text"
        placeholder="Price"
        className="border rounded-md px-4 py-2 mt-4 outline-none text-gray-400"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <div className=" p-2 border rounded-md mt-4">
        <div
          className="rounded-md w-[50px] mx-auto cursor-grab border border-dotted border-gray-400"
          {...getRootProps()}
        >
          <img
            src="https://findicons.com/files/icons/2813/flat_jewels/512/file.png"
            className="w-[50px] h-[50px]"
          />
          <input {...getInputProps()} />
        </div>

        <div>{images}</div>
      </div>

      <button
        className={`bg-${themeContext?.primaryColor} rounded-md px-4 py-2 mt-4 text-white shadow-md shadow-green-200`}
        onClick={() => addNewFood()}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Food"}
      </button>
    </div>
  );
}

export default AddFood;
