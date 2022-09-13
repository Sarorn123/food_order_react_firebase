import React, { ReactElement } from "react";
import { useThemeContext } from "../../../context/themeContext";
import { OrderInterface } from "../Order/Interface";
import { useState } from "react";
import FoodOrderHistoryModal from "./FoodOrderHistoryModal";

interface OrderHistotryInterface {
  data: OrderInterface[];
}

function OrderHistoryTable({ data }: OrderHistotryInterface): ReactElement {
  const themeContext = useThemeContext();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const toggleModal = (action: boolean) => {
    setOpenModal(action);
  };

  return (
    <>
      {openModal && <FoodOrderHistoryModal id={id} toggleModal={toggleModal} />}

      <div className="w-full inline-block align-middle overflow-x-auto">
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className={`py-3 pl-4 bg-${themeContext?.primaryColor}`}
                >
                  <div className="flex items-center h-5">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="checkbox" className="sr-only">
                      Checkbox
                    </label>
                  </div>
                </th>

                <th
                  scope="col"
                  className={`px-6 py-3 text-xs font-bold text-left text-white uppercase bg-${themeContext?.primaryColor} `}
                >
                  Table
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-xs font-bold text-left text-white uppercase bg-${themeContext?.primaryColor} `}
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-xs font-bold text-left text-white uppercase bg-${themeContext?.primaryColor} `}
                >
                  Email
                </th>

                <th
                  scope="col"
                  className={`px-6 py-3 text-xs font-bold text-left text-white uppercase bg-${themeContext?.primaryColor} `}
                >
                  Price
                </th>

                <th
                  scope="col"
                  className={`px-6 py-3 text-xs font-bold text-left text-white uppercase bg-${themeContext?.primaryColor} `}
                >
                  Date
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-xs font-bold text-left text-white uppercase bg-${themeContext?.primaryColor} `}
                >
                  Status
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-xs font-bold text-left text-white uppercase bg-${themeContext?.primaryColor} `}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item: OrderInterface, index: number) => (
                <tr className="cursor-pointer hover:bg-gray-200" key={index}>
                  <td className="py-3 pl-4">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="checkbox" className="sr-only">
                        Checkbox
                      </label>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {item.table}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {item.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {item.email}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    ${item.price}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {item.date.toDate().toDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                    {item.status ? (
                      <p className=" text-green-500">Doned</p>
                    ) : (
                      <p className=" text-yellow-500">Cooking</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                    <button
                      className="bg-blue-500 px-3 py-2  text-white rounded-md hover:bg-blue-400"
                      onClick={() => {
                        setId(item.id);
                        setOpenModal(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OrderHistoryTable;
