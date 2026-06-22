"use server";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatHistory = ChatMessage[];

export type SendAiMessageProps = {
  message: string;
  chatHistory: ChatHistory;
};

export type AiChatResponse = {
  message: string;
  suggested_follow_up_question?: string;
};

export const sendAiMessage = async ({
  message,
  chatHistory,
}: SendAiMessageProps): Promise<{
  success: boolean;
  result: AiChatResponse | null;
}> => {
  const payload = {
    question: message,
    history: chatHistory,
  };

  const response = await fetch(`${process.env.API_BASE_URL}ai/chat-bot/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (response.ok) {
    return { success: true, result: data };
  } else {
    return { success: false, result: null };
  }
};
