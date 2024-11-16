import { useState } from "react";
import { Range } from "react-range";
import CaretLeft from "../../assets/caretleft.svg";
import CaretRight from "../../assets/caretright.svg";
import Image from "next/image";

export default function Slider() {
  const [value, setValue] = useState([30]);
  return (
    <Range
      step={1}
      min={0}
      max={50}
      values={value}
      onChange={(values) => setValue(values)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            height: "3px",
            background: "linear-gradient(to right, #4CAF50, #ccc)",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          className="flex font-bold flex-row justify-between px-2 h-8 w-12 bg-primary border-3 border-black rounded-3xl ring:none"
        >
          <Image src={CaretLeft} alt="Shape" width={8} height={8} />
          <Image src={CaretRight} alt="Shape" width={8} height={8} />
        </div>
      )}
    />
  );
}
