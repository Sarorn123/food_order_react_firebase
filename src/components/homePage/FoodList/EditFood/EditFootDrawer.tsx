import React from "react";
import EditFood from "./EditFood";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

export default function EditFootDrawer({ isOpen, setIsOpen, id }: Props) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-50 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0 "
          : " transition-opacity opacity-0 duration-500 translate-x-full ")
      }
    >
      <section
        className={
          " w-[80%] lg:max-w-md right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-full lg:max-w-md pb-10 flex flex-col space-y-6 overflow-y-auto h-full">
          <div className="mt-10"></div>
          {/* body here */}
          <EditFood id={id} />
          {/* body here */}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
