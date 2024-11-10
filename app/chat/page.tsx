"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your dental assistant bot. How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
];

const AUTOMATED_RESPONSES: Record<string, string> = {
  "tooth": "If you're experiencing tooth pain, it could be due to various reasons such as cavities, gum disease, or sensitivity. It's best to schedule an appointment for a proper diagnosis.",
  "braces": "We offer various orthodontic treatments including traditional braces and clear aligners. Would you like to schedule a consultation with our orthodontist?",
  "cleaning": "Regular dental cleanings are recommended every 6 months. They help prevent cavities and gum disease. Would you like to book a cleaning appointment?",
  "emergency": "If you're experiencing a dental emergency, please call our emergency line immediately at (555) 123-4567. For severe pain or injury, seek immediate care.",
  "whitening": "We offer professional teeth whitening services that are safe and effective. Would you like to learn more about our whitening treatments?",
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(AUTOMATED_RESPONSES)) {
      if (lowercaseMessage.includes(keyword)) {
        return response;
      }
    }
    
    return "I understand you have a question about dental care. For specific concerns, it's best to schedule an appointment with one of our dentists. Would you like me to help you book an appointment?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input),
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <Card className="h-[600px] flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Dental Care Assistant</h2>
          <p className="text-sm text-muted-foreground">
            Ask me anything about our dental services
          </p>
        </div>

        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar>
                  {message.role === "assistant" ? (
                    <>
                      <AvatarFallback>BOT</AvatarFallback>
                      <AvatarImage>
                        <Bot className="h-5 w-5" />
                      </AvatarImage>
                    </>
                  ) : (
                    <>
                      <AvatarFallback>YOU</AvatarFallback>
                      <AvatarImage>
                        <User className="h-5 w-5" />
                      </AvatarImage>
                    </>
                  )}
                </Avatar>
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bot className="h-4 w-4" />
                <span className="text-sm">Typing...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={handleSend} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}