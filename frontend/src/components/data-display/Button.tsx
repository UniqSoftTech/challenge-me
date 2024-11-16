import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ButtonProps {
  title: string;
  onPress: () => void;
  isBase?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  className,
  loading,
  isBase,
  disabled,
}) => {
  return (
    <div className="flex justify-between w-full gap-4">
      {disabled ? (
        <motion.button
          disabled={loading || disabled}
          className={`px-4 py-2 border-2 border-gray-500 text-gray-500 w-full rounded-2xl font-semibold bg-gray-300 text-xl shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] transition-shadow duration-200 ${className}`}
          onClick={onPress}
        >
          {loading ? <div>Loading</div> : <>{title}</>}
        </motion.button>
      ) : (
        <motion.button
          disabled={loading || disabled}
          className={`px-4 py-2 border-2 border-black w-full rounded-2xl font-semibold bg-primary text-xl shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] transition-shadow duration-200 ${className}`}
          onClick={onPress}
        >
          {loading ? <div>Loading</div> : <>{title}</>}
        </motion.button>
      )}
    </div>
  );
};

export default Button;
