"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  MinusCircle,
  Maximize2
} from "lucide-react";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: "user" | "bot";
  content: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hi! I'm EcoBot. How can I help you with sustainable innovations today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai/chat`, {
        message: userMessage,
        history: messages.map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }]
        })).slice(-6) // Only send last 6 messages for context
      });

      if (response.data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: response.data.data.reply },
        ]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "64px" : "500px",
              width: isMinimized ? "300px" : "380px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={cn(
              "mb-4 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 dark:bg-black/20",
              isMinimized ? "flex items-center" : "flex flex-col"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-emerald-600/90 p-4 text-white backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                    <Bot size={20} />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-emerald-600 bg-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">EcoBot Assistant</h3>
                  {!isMinimized && <p className="text-[10px] opacity-80">Always Online</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="rounded-full p-1 hover:bg-white/20 transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <MinusCircle size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-white/20 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {messages.map((msg, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={idx}
                      className={cn(
                        "flex w-full gap-2",
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                        msg.role === "user" 
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                          : "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      )}>
                        {msg.role === "user" ? <User size={16} /> : <Sparkles size={16} />}
                      </div>
                      <div className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                        msg.role === "user"
                          ? "bg-emerald-600 text-white rounded-tr-none"
                          : "bg-white/80 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 rounded-tl-none border border-zinc-200 dark:border-zinc-800"
                      )}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600">
                        <Bot size={16} />
                      </div>
                      <div className="flex items-center gap-1 rounded-2xl bg-white/80 dark:bg-zinc-900/80 px-4 py-2 border border-zinc-200 dark:border-zinc-800">
                        <Loader2 size={16} className="animate-spin text-emerald-600" />
                        <span className="text-xs text-zinc-500">EcoBot is thinking...</span>
                      </div>
                    </div>
                  )}
                  {messages.length === 1 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {[
                        "What is EcoSpark?",
                        "How can I help?",
                        "Sustainability tips",
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            setMessage(suggestion);
                            // Optionally auto-send:
                            // setTimeout(() => handleSendMessage({ preventDefault: () => {} } as any), 0);
                          }}
                          className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all dark:text-emerald-400 dark:hover:bg-emerald-600"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <form 
                  onSubmit={handleSendMessage}
                  className="border-t border-zinc-200 dark:border-zinc-800 p-4 bg-white/50 dark:bg-black/50"
                >
                  <div className="relative flex items-center gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask me anything about sustainability..."
                      className="w-full rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-4 py-2.5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:text-white"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim() || isLoading}
                      className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white transition-all hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                  <p className="mt-2 text-center text-[10px] text-zinc-400">
                    EcoBot can make mistakes. Verify important info.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300",
          isOpen 
            ? "bg-zinc-800 text-white" 
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};
