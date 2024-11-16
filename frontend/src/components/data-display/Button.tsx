import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ButtonProps {
  title: string;
  onPress: () => void;
  isBase?: boolean;
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  className,
  loading,
  isBase,
}) => {
  return (
    <div className="flex justify-between w-full gap-4">
      <motion.button
        disabled={loading}
        className={`px-16 py-3 border-2 border-black rounded-2xl font-semibold bg-primary text-2xl shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] transition-shadow duration-200 ${className}`}
        onClick={onPress}
      >
        {loading ? <div>Loading</div> : <>{title}</>}
      </motion.button>
    </div>
  );
};

export default Button;
