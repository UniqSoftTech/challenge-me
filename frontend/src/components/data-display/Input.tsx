import React from "react";

interface InputProps {
  label: string;
  type?: "text" | "number" | "password" | "email" | "date";
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2 border-2 text-black rounded-2xl border-gray-400 focus:border-black ring:border-black ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
