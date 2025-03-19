import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { VscEmptyWindow } from "react-icons/vsc";
import { TbExchange } from "react-icons/tb";
import { BsArrowsAngleExpand } from "react-icons/bs";
import Dropdown from "./Dropdown";

interface WindowToolProps {
  id: string;
  tickers: string[];
  selectedTicker: string;
  onTickerChange: (id: string, ticker: string) => void;
  onExpand: () => void;
  onAdd: () => void;
  onClose: () => void;
  onSplit: () => void;
}

const WindowTool: React.FC<WindowToolProps> = ({
  id,
  tickers,
  selectedTicker,
  onTickerChange,
  onExpand,
  onAdd,
  onClose,
  onSplit,
}) => (
  <div className=" md:text-xs lg:text-base text-[8px] flex items-center space-x-2 w-full px-4 py-1 ml-1 rounded bg-gray-100 border-b border-gray-300">
    <span className="font-bold text-gray-800 text-xs sm:text-sm md:text-base leading-4">
      Company info
    </span>

    <Dropdown
      tickers={tickers}
      selectedTicker={selectedTicker}
      onChange={(ticker) => onTickerChange(id, ticker)}
    />
    <div className="flex items-center md:space-x-2 space-x-0 ml-auto">
      <button onClick={onSplit} className="p-1 hover:bg-gray-200 rounded">
        <TbExchange title="Split Window" />
      </button>
      <button onClick={onAdd} className="p-1 hover:bg-gray-200 rounded">
        <VscEmptyWindow title="Add New Window" />
      </button>
      <button onClick={onExpand} className="p-1 hover:bg-gray-200 rounded">
        <BsArrowsAngleExpand title="Expand Fullscreen" />
      </button>
      <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
        <IoCloseOutline title="Close Window" />
      </button>
    </div>
  </div>
);

export default WindowTool;
