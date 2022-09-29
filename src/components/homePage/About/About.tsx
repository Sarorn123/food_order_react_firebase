import { AiFillTool } from "react-icons/ai";
interface Props {}

const About = (props: Props) => {
  return (
    <div>
      <h1 className="text-gray-500 font-bold ">About</h1>
      <p className="mt-4 text-gray-400 font-[400]">
        My name is Ry Sarorn. I am stuying in year 4 at National University Of
        Management . This is my project about how we can order food in realtime
        it's mean that we can order food like Chat in messenger. Chef will
        automatic recieved your order and cook for you .
      </p>
      <h1 className="text-lg font-bold text-gray-400 mt-4">
        This is just pratice my skill only !
      </h1>

      <div className="flex items-center mt-4">
        <AiFillTool className="mr-2 text-3xl text-green-500 bg-gray-200 p-1 rounded-full" />
        <h1 className="font-bold"> Technology</h1>
      </div>
      <ul className="mt-4">
        <li className="text-gray-400 mt-2"> - React Js ( Typescript )</li>
        <li className="text-gray-400 mt-2"> - Tailwind Css</li>
        <li className="text-gray-400 mt-2"> - Firebase ( Back end )</li>
        <li className="text-gray-400 mt-2"> - Recharts ( Dashboard Chart )</li>
      </ul>
    </div>
  );
};

export default About;
