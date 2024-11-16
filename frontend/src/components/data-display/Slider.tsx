import { useEffect, useState } from "react";
import { Range } from "react-range";
import { Plus, Minus } from "@phosphor-icons/react";
import CaretLeft from "../../assets/caretleft.svg";
import CaretRight from "../../assets/caretright.svg";
import Image from "next/image";
import Input from "@/components/data-display/Input";
import Button from "@/components/data-display/Button";

export default function Slider({
  price,
  setPrice,
}: {
  price: number;
  setPrice: (value: number) => void;
}) {
  const [value, setValue] = useState([price]);

  useEffect(() => {
    setValue([price]); // Update slider value when `price` changes
  }, [price]);

  return (
    <Range
      step={1}
      min={0}
      max={50}
      values={value}
      onChange={(values) => {
        setValue(values);
        setPrice(values[0]); // Update the price state when the slider moves
      }}
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
