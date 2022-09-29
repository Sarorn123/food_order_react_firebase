import React from "react";

type Props = {
  data: any,
};

const Table = ({ data }: Props) => {
  return (
    <div className="border shadow-md rounded-md p-4 overflow-auto">
      <h3 className="text-gray-400 font-semibold">Today Order</h3>

      {data.map((order: any, index:number) => {
        return (
          <div className="item flex items-center justify-between mt-2 border-b-[1px] py-2 hover:scale-105" key={index}>
            <h3 className="text-gray-400">{order?.customer}</h3>
            <div className="flex items-center">
              <p className="text-gray-400">${order?.price}</p>
              {
                order?.status ? <p className="text-green-500 ml-4">Doned</p> : <p className="text-red-500 ml-4">Cooking</p>
              }
              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
