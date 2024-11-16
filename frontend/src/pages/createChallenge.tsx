"use client";

import Button from "@/components/data-display/Button";
import Input from "@/components/data-display/Input";
import ReusableModal from "@/components/data-display/Modal";
import useGlobalRequestStore from "@/hooks/useGlobalRequestStore";
import useRequest from "@/hooks/useRequest";
import { useState } from "react";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import { useRouter } from "next/router";

function App() {
  const router = useRouter();
  const [question, setQuestion] = useState<string | undefined>();

  const { loading, data, trigger } = useRequest({
    key: "suggestedQuestions",
    url: "openai/suggest-question",
  });

  const { execute } = useGlobalRequestStore();

  const handleSave = async () => {
    await execute(
      "createMarket",
      { method: "POST", url: "contract/createMarket" },
      {
        data: { question: question },
        onSuccess: (data) => router.push("/challenges"),
        onError: (error) => console.log("error", error),
      },
    );
  };

  return (
    <div className="p-4">
      <button
        onClick={() => router.back()}
        className="pb-4 flex flex-row items-center justify-between"
      >
        <ArrowLeft size={25} />
      </button>

      <div className="flex flex-col gap-3">
        <h1>Choose emoji</h1>
        <div className="flex">
          <button className="bg-gray-200 p-3 rounded-full">
            <Plus />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h1>I can...</h1>
          <Input
            value={question || ""}
            label="Title"
            name="title"
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1>Suggessted Challenges</h1>
          {data?.data?.map?.((question: any, index: number) => {
            return (
              <button
                onClick={() => setQuestion(question)}
                key={index}
                className="flex flex-row items-center gap-3"
              >
                <h1 className="py-1 px-2 rounded-full bg-gray-200">
                  {index === 0 ? "💪" : "⏰"}
                </h1>
                <h1 className="font-bold">{question}</h1>
              </button>
            );
          })}
        </div>
        <div className="flex justify-end flex-end">
          <div>
            <Button title="Next" onPress={() => handleSave()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
