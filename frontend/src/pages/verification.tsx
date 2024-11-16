"use client";

import React, { useEffect, useState } from "react";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import ethersRPC from "@/utils/ethersRPC";

// Update the FormDataKeys type to exclude `proof` and handle new requirements
type FormDataKeys =
  | "name"
  | "age"
  | "height"
  | "weight"
  | "birthday"
  | "relationship_status";

// Update the FormData interface to exclude `proof`
interface FormData {
  name: string;
  age: string;
  height: string;
  weight: string;
  birthday: string;
  relationship_status: string;
}

const App = () => {
  const [step, setStep] = useState(0);
  const {
    status,
    connect,
    addAndSwitchChain,
    userInfo,
    provider,
    web3Auth,
    authenticateUser,
  } = useWeb3Auth();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    height: "",
    weight: "",
    birthday: "",
    relationship_status: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    if (!provider) {
      return;
    }
    const address = await ethersRPC.getAccounts(provider);
    setWalletAddress(address);
  };

  const fields: {
    name: FormDataKeys;
    label: string;
    type: string;
    options?: string[];
  }[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "age", label: "Age", type: "number" },
    { name: "height", label: "Height", type: "number" },
    { name: "weight", label: "Weight", type: "number" },
    { name: "birthday", label: "Birthday", type: "date" },
    {
      name: "relationship_status",
      label: "Relationship Status",
      type: "select",
      options: ["Single", "Married", "In a Relationship", "It's Complicated"],
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input change
  };

  const handleNext = () => {
    const field = fields[step];
    if (!formData[field.name]) {
      setErrors((prev) => ({
        ...prev,
        [field.name]: `${field.label} is required`,
      }));
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    const isFormComplete = Object.keys(formData).every(
      (key) => formData[key as FormDataKeys],
    );
    if (!isFormComplete) {
      const newErrors: Partial<FormData> = {};
      Object.keys(formData).forEach((key) => {
        if (!formData[key as FormDataKeys]) {
          newErrors[key as FormDataKeys] = `${key} is required`;
        }
      });
      setErrors(newErrors);
      return;
    }
    // alert("Form submitted successfully!");
    console.log("Submitted Data:", formData);
    console.log("User Info:", walletAddress);
  };

  const currentField = fields[step];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4">
          Step {step + 1} of {fields.length}
        </h1>
        <div className="mb-4">
          <label
            htmlFor={currentField.name}
            className="block text-gray-700 font-medium"
          >
            {currentField.label}
          </label>
          {currentField.type === "select" ? (
            <select
              id={currentField.name}
              name={currentField.name}
              value={formData[currentField.name]}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${
                errors[currentField.name] ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select {currentField.label}</option>
              {currentField.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={currentField.name}
              name={currentField.name}
              type={currentField.type}
              value={formData[currentField.name]}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${
                errors[currentField.name] ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          )}
          {errors[currentField.name] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[currentField.name]}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={step === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {step < fields.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
