import Image from "next/image";
import { BsFillAlarmFill } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import { TbAlarmFilled } from "react-icons/tb";
import { Jersey_15 } from "next/font/google";
import { TbAlarm } from "react-icons/tb";

export default function Home() {
  return (
    <div className="bg-[#f5f5f5] w-screen h-screen">
    <div className="bg-[url('../woof.png')] w-screen h-screen bg-repeat bg-[length:100px_100px] animate-scroll">
      <div className="bg-[#f5f5f5] w-screen h-screen bg-opacity-50">
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center h-2/4">
          <h1 className="inline-flex items-center justify-center text-4xl mb-4 text-black"><TbAlarm className="mr-2"/>Ring Ring Bark Bark  🐶</h1>
          <p className="text-gray-600">This is a centered card with a background.</p>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}
