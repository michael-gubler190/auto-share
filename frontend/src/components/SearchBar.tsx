import { MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [fromDate, setFromDate] = useState("3/12/2026");
  const [fromTime, setFromTime] = useState("10:00 AM");
  const [untilDate, setUntilDate] = useState("3/12/2026");
  const [untilTime, setUntilTime] = useState("11:00 AM");

  const times = [
    "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
    "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
    "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM",
  ];

  return (
    <div className="flex items-stretch bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden w-full max-w-4xl">

      {/* Where */}
      <div className="flex flex-col justify-center px-5 py-3 flex-1 min-w-0">
        <label className="text-xs font-semibold text-gray-500 mb-1 tracking-wide">
          Where
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, airport, address or hotel"
          className="text-sm text-gray-400 placeholder-gray-400 bg-transparent outline-none w-full"
        />
      </div>

      <div className="w-px bg-gray-200 my-3" />

      {/* From Date */}
      <div className="flex flex-col justify-center px-5 py-3">
        <label className="text-xs font-semibold text-gray-500 mb-1 tracking-wide">
          From
        </label>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-1">
            <input
              type="text"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="text-sm font-medium text-gray-800 bg-transparent outline-none w-24 cursor-pointer"
            />
            <ChevronDownIcon className="w-4 h-4 text-gray-400 shrink-0" />
          </div>
          <div className="w-px bg-gray-200 h-5" />
          <div className="relative flex items-center gap-1">
            <select
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="text-sm font-medium text-gray-800 bg-transparent outline-none appearance-none cursor-pointer pr-5"
            >
              {times.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 text-gray-400 shrink-0 pointer-events-none absolute right-0" />
          </div>
        </div>
      </div>

      <div className="w-px bg-gray-200 my-3" />

      {/* Until Date */}
      <div className="flex flex-col justify-center px-5 py-3">
        <label className="text-xs font-semibold text-gray-500 mb-1 tracking-wide">
          Until
        </label>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-1">
            <input
              type="text"
              value={untilDate}
              onChange={(e) => setUntilDate(e.target.value)}
              className="text-sm font-medium text-gray-800 bg-transparent outline-none w-24 cursor-pointer"
            />
            <ChevronDownIcon className="w-4 h-4 text-gray-400 shrink-0" />
          </div>
          <div className="w-px bg-gray-200 h-5" />
          <div className="relative flex items-center gap-1">
            <select
              value={untilTime}
              onChange={(e) => setUntilTime(e.target.value)}
              className="text-sm font-medium text-gray-800 bg-transparent outline-none appearance-none cursor-pointer pr-5"
            >
              {times.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 text-gray-400 shrink-0 pointer-events-none absolute right-0" />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button className="bg-sky-500 hover:bg-sky-600 transition-colors px-5 flex items-center justify-center shrink-0 hover:cursor-pointer">
        <MagnifyingGlassIcon className="w-5 h-5 text-white font-bold" />
      </button>

    </div>
  );
}