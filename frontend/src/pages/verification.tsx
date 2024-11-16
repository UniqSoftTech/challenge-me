"use client";

import React, { useState, useEffect } from "react";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import ethersRPC from "@/utils/ethersRPC";
import useGlobalRequestStore from "@/hooks/useGlobalRequestStore";
import { useRouter } from "next/router";
import Button from "@/components/data-display/Button";

type FormDataKeys =
  | "name"
  | "birthday"
  | "height"
  | "weight"
  | "relationship_status";

interface FormData {
  name: string;
  birthday: string;
  height: string;
  weight: string;
  relationship_status: string;
}

const App = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const { provider } = useWeb3Auth();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { execute } = useGlobalRequestStore();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    height: "",
    weight: "",
    birthday: "",
    relationship_status: "",
  });

  const getAccounts = async () => {
    if (!provider) return;
    const address = await ethersRPC.getAccounts(provider);
    setWalletAddress(address);
  };

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const fields = [
    {
      name: "name",
      label: "How do we call you?",
      title: "We need some information about you.",
      type: "text",
      placeholder: "Username...",
    },
    {
      name: "birthday",
      label: "When’s your birthday?",
      type: "date",
      title: "It’s nice to meet you.",
    },
    {
      name: "gender",
      label: "How do you identify yourself?",
      title: "So you are a Scorpio.",
      type: "select",
      options: ["she/her", "he/him", "they/them", "other"],
    },
    {
      name: "height",
      label: "How tall do you stand?",
      title: "We’re all about celebrating individuality here.",
      type: "number",
      placeholder: "CM",
    },
    {
      name: "weight",
      label: "What’s the number on the scale?",
      title: "Perfect for reaching goals (and maybe high shelves).",
      type: "number",
      placeholder: "KG",
    },
    {
      name: "relationship_status",
      label: "What’s your current love story?",
      title: "Let’s make that number work for you.",
      type: "select",
      options: ["Single", "Married", "In a Relationship", "It's Complicated"],
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = () => {
    const field = fields[step];
    if (!formData[field.name as FormDataKeys]) {
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

  const handleSubmit = async () => {
    const isFormComplete = Object.keys(formData).every(
      (key) => formData[key as FormDataKeys]?.trim() !== "",
    );

    console.log("🚀 ~ handleSubmit ~ isFormComplete:", isFormComplete);

    if (!isFormComplete) {
      const newErrors: Partial<FormData> = {};
      Object.keys(formData).forEach((key) => {
        if (!formData[key as FormDataKeys]?.trim()) {
          newErrors[key as FormDataKeys] = `${key} is required`;
        }
      });
      setErrors(newErrors);
      return;
    }

    await execute(
      "user",
      { method: "POST", url: "user" },
      {
        data: { ...formData, wallet: walletAddress },
        onSuccess: (data) => console.log("data", data),
        onError: (error) => console.error("error", error),
      },
    );
  };

  const currentField = fields[step];

  return (
    <div className="flex flex-col min-h-screen bg-white gap-3">
      {/* Header */}
      <div className="flex flex-col pt-4 px-4">
        <div className="mb-4">
          <button
            onClick={handlePrevious}
            className={`text-lg ${step === 0 ? "invisible" : ""}`}
          >
            ←
          </button>
        </div>
        <div className="text-black text-xl">{fields[step].title}</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full px-4">
        <div className="relative h-1 bg-gray-300 rounded-full">
          <div
            className="absolute h-1 bg-black rounded-full transition-all"
            style={{ width: `${((step + 1) / fields.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-center px-6 gap-1">
        <h1 className="text-base mb-4">{currentField.label}</h1>

        {currentField.type === "select" ? (
          <select
            id={currentField.name}
            name={currentField.name}
            value={formData[currentField.name as FormDataKeys]}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 font-bold text-xl rounded-2xl border-2 ${
              errors[currentField.name as FormDataKeys]
                ? "border-red-500"
                : formData[currentField.name as FormDataKeys]
                ? "border-black"
                : "border-gray-300"
            } rounded focus:outline-none focus:ring-1 focus:border-black focus:ring-black`}
          >
            <option value="">Select...</option>
            {currentField.options?.map((option) => (
              <option key={option} className="font-bold text-xl" value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={currentField.name}
            name={currentField.name}
            type={currentField.type}
            placeholder={currentField.placeholder}
            value={formData[currentField.name as FormDataKeys]}
            onChange={handleInputChange}
            className={`w-full font-bold text-xl px-4 py-3 rounded-2xl border-2 ${
              errors[currentField.name as FormDataKeys]
                ? "border-red-500"
                : formData[currentField.name as FormDataKeys]
                ? "border-black"
                : "border-gray-300"
            } rounded focus:outline-none focus:ring-1 focus:border-black focus:ring-black`}
          />
        )}
        {errors[currentField.name as FormDataKeys] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[currentField.name as FormDataKeys]}
          </p>
        )}
        <div className="flex justify-end mt-4">
          <div className="w-1/2 flex-end">
            {step < fields.length - 1 ? (
              <Button
                title="Next"
                onPress={handleNext}
                disabled={
                  errors[currentField.name as FormDataKeys] ? true : false
                }
              />
            ) : (
              <Button title="Submit" onPress={handleSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
