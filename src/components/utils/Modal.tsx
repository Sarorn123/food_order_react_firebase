import React from "react";
import { CgDanger } from "react-icons/cg";
import { useThemeContext } from '../../context/themeContext';

type Props = {
  loading : boolean;
  handleModalAction: (action: boolean) => void;
};

const Modal = ({ handleModalAction, loading }: Props) => {
  const themeContext = useThemeContext();
  return (
    <>
      <div className="w-full h-screen bg-black z-40 fixed top-0 left-0 flex flex-col justify-center items-center opacity-40"></div>
      <div className="bg-white  p-5 rounded-md z-50 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] lg:w-[40%]">
        <div className="flex items-center text-red-500 text-lg ">
          <CgDanger className="mr-2" />
          <p>Alert</p>
        </div>

        <p className="mt-2 text-slate-500">Do you wanna do this ?</p>
        <div className="mt-2 flex justify-end">
          <button className={`px-4 rounded-md py-1 mx-1 text-white active:bg-gray-400 bg-${themeContext?.primaryColor}`} onClick={() => handleModalAction(false)}>
            No
          </button>
          <button className="px-4 rounded-md py-1 bg-red-500  mx-1 text-white active:bg-gray-400" onClick={() => handleModalAction(true)} disabled={loading}>
            {
              loading ? "Loading" : "Yes"
            }
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
