"use client";

import { useChat } from "ai/react";
import { ArrowUp } from "lucide-react";
import { useCallback, useRef } from "react";

import { ExpandableTextarea } from "@/components/atoms/ExpandableTextarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const formRef = useRef<HTMLFormElement>(null);

  // Dispatch certain keys to command input
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Add a new line
      } else {
        // Submit the form
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    }
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
      <div className="flex w-full flex-1 flex-col py-24">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 w-full pt-6">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mb-4 flex w-full flex-col gap-4"
        >
          <div className="group relative flex w-full items-center">
            <ExpandableTextarea
              className="rounded-[30px] px-6 py-4 pr-16 text-base"
              value={input}
              placeholder="Hello, Llama"
              autoComplete="off"
              autoCorrect="off"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute right-0 mx-2.5">
              <Button
                type="submit"
                className={cn(
                  "rounded-full bg-muted-foreground px-2.5 opacity-50 transition duration-300 group-hover:opacity-100",
                  input && "bg-primary opacity-100",
                )}
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="mx-auto text-xs text-muted-foreground">
            {input.length > 3 ? (
              <>
                Use <span className="rounded-md bg-muted p-1">shift + return</span> for a
                new line
              </>
            ) : (
              "Built with..."
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
