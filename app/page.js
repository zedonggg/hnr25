'use client';
import React, { useState, useEffect } from "react";
import { TbAlarm } from "react-icons/tb";

export default function Home() {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [alarmTriggered, setAlarmTriggered] = useState(false); // To track if alarm has been triggered

  // Reference to the audio element
  const alarmAudio = new Audio("hnr25_alarm.mp3");

  

  // Update current time to system time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const isAM = hours < 12;

      // Format time into 12-hour format with AM/PM
      const formattedTime = `${hours % 12 || 12}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${
        isAM ? "AM" : "PM"
      }`;
      setCurrentTime(formattedTime);
    };

    const interval = setInterval(updateTime, 1000);
    updateTime(); // Initial update
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Function to handle alarm time
  useEffect(() => {
    if (!alarmTime || alarmTriggered) return;

    const alarmDate = new Date();
    let [hourPart, minutePart] = alarmTime.split(':');
    let [minute, ampm] = minutePart.split(' ');
    hourPart = parseInt(hourPart);
    minute = parseInt(minute);

    if (ampm === "PM" && hourPart !== 12) {
      hourPart += 12; // Convert PM to 24-hour format
    } else if (ampm === "AM" && hourPart === 12) {
      hourPart = 0; // Convert 12 AM to 0 hours (midnight)
    }

    alarmDate.setHours(hourPart);
    alarmDate.setMinutes(minute);
    alarmDate.setSeconds(0); // Trigger at the exact minute

    // Check every second if the alarm time is reached
    const interval = setInterval(() => {
      const now = new Date();
      if (now >= alarmDate && !alarmTriggered) {
        setAlarmTriggered(true); // Alarm has been triggered
        alarmAudio.play(); // Play the alarm sound
        clearInterval(interval); // Stop checking once the alarm triggers
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [alarmTime, alarmTriggered]);

  const handleSetAlarm = () => {
    if (hour && minute && ampm) {
      const formattedTime = `${hour}:${minute} ${ampm}`;
      setAlarmTime(formattedTime);
      alert(`Alarm set for ${formattedTime}`);
    } else {
      alert("Please select a valid time for the alarm!");
    }
  };

  return (
    <div className="bg-[#f5f5f5] w-screen h-screen">
      <div className="bg-[url('../woof.png')] w-screen h-screen bg-repeat bg-[length:100px_100px] animate-scroll">
        <div className="bg-[#f5f5f5] w-screen h-screen bg-opacity-50">
          <div className="flex items-center justify-center w-full h-full">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center">
              <h1 className="inline-flex items-center justify-center text-4xl mb-4 text-black">
                <TbAlarm className="mr-2" />
                Ring Ring Bark Bark 🐶
              </h1>
              <div className="wrapper">
                <h2 className="text-7xl text-indigo-500 font-semibold">{currentTime}</h2>
                <div className="content grid grid-cols-3 gap-6 mt-6 text-black">
                  {/* Hour Selection */}
                  <div className="column flex flex-col items-center text-black">
                    <label htmlFor="hour" className="text-lg text-black">
                      Set Hour
                    </label>
                    <select
                      id="hour"
                      value={hour}
                      onChange={(e) => setHour(e.target.value)}
                      className="border-2 border-gray-400 rounded-none p-4 text-xl w-auto mt-2"
                    >
                      <option value="" disabled hidden>
                        Hour
                      </option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Minute Selection */}
                  <div className="column flex flex-col items-center">
                    <label htmlFor="minute" className="text-lg">
                      Set Minute
                    </label>
                    <select
                      id="minute"
                      value={minute}
                      onChange={(e) => setMinute(e.target.value)}
                      className="border-2 border-gray-400 rounded-lg p-4 text-xl w-auto mt-2"
                    >
                      <option value="" disabled hidden>
                        Minute
                      </option>
                      {Array.from({ length: 60 }, (_, i) =>
                        i < 10 ? `0${i}` : `${i}`
                      ).map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* AM/PM Selection */}
                  <div className="column flex flex-col items-center">
                    <label htmlFor="ampm" className="text-lg">
                      Set AM/PM
                    </label>
                    <select
                      id="ampm"
                      value={ampm}
                      onChange={(e) => setAmpm(e.target.value)}
                      className="border-2 border-gray-400 rounded-lg p-4 text-xl w-auto mt-2"
                    >
                      <option value="" disabled hidden>
                        AM/PM
                      </option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleSetAlarm}
                  className="bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-8 hover:bg-blue-700"
                >
                  Set Alarm
                </button>
              </div>
              <audio id="alarm-audio" src="/hnr25_alarm.mp3" preload="auto"></audio>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
