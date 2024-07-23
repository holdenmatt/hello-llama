"use client";

import { useChat } from "ai/react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div className="sticky top-0 z-10 flex h-14 items-center">Header</div>

      <div className="flex w-full flex-1 overflow-y-scroll">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
          <div className="mx:px-6 flex w-full flex-1 flex-col px-4 py-24">
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? "User: " : "AI: "}
                {m.content}
              </div>
            ))}

            <form
              onSubmit={handleSubmit}
              className="fixed bottom-0 mb-8 flex w-full max-w-3xl items-center gap-2"
            >
              <Input
                className="h-14 rounded-full px-5 text-base"
                value={input}
                placeholder="Chat with Llama 3.1"
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                className={cn(
                  "rounded-full bg-gray-400 px-2.5 opacity-50 transition duration-300 group-hover:opacity-100",
                  input && "bg-primary",
                )}
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
