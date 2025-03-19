import React from "react";

interface DropdownProps {
  tickers: string[];
  selectedTicker: string;
  onChange: (ticker: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  tickers,
  selectedTicker,
  onChange,
}) => {
  return (
    <select
      value={selectedTicker}
      onChange={(e) => onChange(e.target.value)}
      className="rounded"
      title="#"
    >
      {tickers.map((ticker) => (
        <option key={ticker} value={ticker}>
          {ticker}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
