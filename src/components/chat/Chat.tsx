"use client";

import { useChat } from "ai/react";
import { ArrowUp } from "lucide-react";
import { useCallback, useRef } from "react";

import { ExpandableTextarea } from "@/components/atoms/ExpandableTextarea";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { ModelName } from "@/lib/types";
import { useAppStore } from "@/lib/useAppStore";
import { cn } from "@/lib/utils";

import { ChatMessages } from "./ChatMessage";

export function Chat() {
  const { toast } = useToast();
  const model = useAppStore((state) => state.model);
  const temperature = useAppStore((state) => state.temperature);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      model,
      temperature,
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Rate limit exceeded",
        description:
          "Groq's free plan is limited to 30 requests/min. Please try again later.",
      });
    },
  });

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

  const placeholder = `Message ${getModelName(model)}`;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
      <ScrollArea className="flex-1">
        <ChatMessages messages={messages} />
      </ScrollArea>

      <div className="sticky bottom-0 w-full pt-6">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mb-4 flex w-full flex-col gap-4"
        >
          <div className="group relative flex w-full items-center px-1">
            <ExpandableTextarea
              className="rounded-[30px] px-6 py-4 pr-16 text-base"
              value={input}
              placeholder={placeholder}
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
          <div className="mx-auto h-10 text-center text-xs leading-5 text-muted-foreground">
            {input.length > 3 ? (
              <>
                Use <span className="rounded-md bg-muted p-1">shift + return</span> for a
                new line
              </>
            ) : (
              <>
                {`Made by `}
                <ExternalLink href="https://x.com/holdenmatt">@holdenmatt</ExternalLink>
                {` using `}
                <br className="sm:hidden" />
                <ExternalLink href="https://llama.meta.com/docs/overview">
                  Llama 3.1
                </ExternalLink>
                {`, `}
                <ExternalLink href="https://wow.groq.com/now-available-on-groq-the-largest-and-most-capable-openly-available-foundation-model-to-date-llama-3-1-405b/">
                  Groq
                </ExternalLink>
                {`, and the `}
                <ExternalLink href="https://sdk.vercel.ai/docs/guides/llama-3_1">
                  Vercel AI SDK
                </ExternalLink>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function getModelName(model: ModelName) {
  switch (model) {
    case "llama-3.1-8b-instant":
      return "Llama 3.1 (8B)";
    case "llama-3.1-70b-versatile":
      return "Llama 3.1 (70B)";
    case "llama-3.1-405b-reasoning":
      return "Llama 3.1 (405B)";
    default:
      return "Llama 3.1";
  }
}
