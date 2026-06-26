import { ArrowRight, Bot, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AiChatHeader from "./AiChatHeader";
import { sendAiMessage, type ChatHistory } from "@/actions/aiChatActions";
import { showToast } from "@/lib/toast";

const INITIAL_MESSAGE =
  "Hallo! Wie kann ich Ihnen bei der Suche nach einem Auto helfen?";

export default function AiChat({ handleClose }: { handleClose: () => void }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistory>([
    { role: "assistant", content: INITIAL_MESSAGE },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedFollowUpQuestion, setSuggestedFollowUpQuestion] =
    useState<string>("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedMessage = currentMessage.trim();
    if (!trimmedMessage || isLoading) return;

    setSuggestedFollowUpQuestion("");

    const historyBeforeSend = chatHistory;
    const historyWithUser: ChatHistory = [
      ...chatHistory,
      { role: "user", content: trimmedMessage },
    ];

    setChatHistory(historyWithUser);
    setCurrentMessage("");
    setIsLoading(true);

    const { success, result } = await sendAiMessage({
      message: trimmedMessage,
      chatHistory: historyBeforeSend,
    });
    console.log(result);
    if (success && result?.message) {
      setChatHistory([
        ...historyWithUser,
        { role: "assistant", content: result.message },
      ]);
      console.log(result?.suggested_follow_up_question);
      setSuggestedFollowUpQuestion(result?.suggested_follow_up_question ?? "");
    }
    if (!success) {
      showToast(result?.message ?? "Fehler beim Senden der Nachricht", "error");
    }

    setIsLoading(false);
  };
  return (
    <div className="flex h-[550px] w-[320px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl max-md:w-[90vw] max-h-[450px]">
      <AiChatHeader handleClose={handleClose} />

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        {chatHistory.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
              message.role === "user"
                ? "ml-auto rounded-br-md bg-gray-900 text-white"
                : "rounded-bl-md bg-gray-100 text-gray-700"
            }`}
          >
            {message.content}
          </div>
        ))}

        {isLoading && (
          <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-gray-100 px-3 py-2 text-sm text-gray-500">
            Schreibt...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="border-t border-gray-100 p-3"
        onSubmit={handleSendMessage}
      >
        {suggestedFollowUpQuestion && (
          <div className="mb-3 rounded-2xl border border-gray-100 bg-linear-to-br from-gray-50 via-white to-gray-50 p-3 shadow-inner">
            <p className="mb-2.5 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              Frage vorschlag
            </p>
            <button
              type="button"
              onClick={() => {
                setCurrentMessage(suggestedFollowUpQuestion);
                setSuggestedFollowUpQuestion("");
              }}
              disabled={isLoading}
              className="group flex w-full items-start gap-3 rounded-xl border border-gray-200/80 bg-white px-3 py-2.5 text-left shadow-sm transition-all duration-200 hover:-translate-y-px hover:border-gray-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors duration-200 group-hover:bg-gray-900 group-hover:text-white">
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-sm leading-snug text-gray-700 group-hover:text-gray-900">
                {suggestedFollowUpQuestion}
              </span>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            placeholder="Nachricht schreiben..."
            className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            aria-label="Nachricht senden"
            disabled={isLoading}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition-colors duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="size-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
