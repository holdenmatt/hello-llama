import { DarkModeToggle } from "@/components/atoms/DarkModeToggle";
import { Chat } from "@/components/chat/Chat";
import { SettingsPanel } from "@/components/chat/SettingsPanel";

export default function ChatPage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden px-4 md:px-6 lg:px-8">
      <div className="sticky top-0 z-10 flex h-14 items-center justify-between">
        <div>Hello, Llama 3.1</div>
        <div className="flex gap-1">
          <DarkModeToggle />
          <SettingsPanel />
        </div>
      </div>

      <div className="flex w-full flex-1 overflow-y-scroll">
        <Chat />
      </div>
    </div>
  );
}
