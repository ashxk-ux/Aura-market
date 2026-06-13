/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, MessageSquare, ShoppingBag, ArrowRight } from "lucide-react";
import { PRODUCTS, Product } from "../data";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onViewProduct: (productId: string) => void;
}

export default function AIChatModal({ isOpen, onClose, onAddToCart, onViewProduct }: AIChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Welcome to **Aura Luxe**, your personal AI stylist & shopping concierge. Find rare items or ask for complete looks (e.g., 'Dress me for a chilly city weekend' or 'Suggest wireless gadgets for high focus'). How can I elevate your life today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const quickPrompts = [
    "Suggest a complete work outfit",
    "Best high-end audiophile gadgets",
    "Cozy morning coffee setup ideas",
    "Self-care and restoration picks",
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorText(null);
    const userMsgId = Date.now().toString();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Format history properly as requested in skills
      const historyPayload = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact the server. Please check that GEMINI_API_KEY is configured.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          text: data.text || "I was unable to process that. Please ask about items in my catalog.",
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "Failed to reach your AI guide. Please ensure the dev server is active and API keys are defined.");
    } finally {
      setIsLoading(false);
    }
  };

  // Parses [Product: prod-X] and extracts details to show high-fidelity mini cards
  const parseRecommendations = (text: string) => {
    const productsFound: Product[] = [];
    const rx = /\[Product:\s*(prod-\d+)\]/g;
    let match;
    while ((match = rx.exec(text)) !== null) {
      const prodId = match[1];
      const matchedProd = PRODUCTS.find((p) => p.id === prodId);
      if (matchedProd && !productsFound.some((p) => p.id === prodId)) {
        productsFound.push(matchedProd);
      }
    }
    return productsFound;
  };

  // Formats text block rendering Markdown bold nicely
  const renderMessageText = (text: string) => {
    const cleanText = text.replace(/\[Product:\s*prod-\d+\]/g, ""); // Strip token from inline text for clean reading
    return cleanText.split("\n").map((para, i) => {
      if (!para.trim()) return null;
      // Handle simple markdown bold **text**
      const boldRx = /\*\*(.*?)\*\*/g;
      let lastIdx = 0;
      const elements: React.ReactNode[] = [];
      let match;
      let elemKey = 0;

      while ((match = boldRx.exec(para)) !== null) {
        if (match.index > lastIdx) {
          elements.push(para.substring(lastIdx, match.index));
        }
        elements.push(
          <strong key={elemKey++} className="font-semibold text-stone-950">
            {match[1]}
          </strong>
        );
        lastIdx = boldRx.lastIndex;
      }
      if (lastIdx < para.length) {
        elements.push(para.substring(lastIdx));
      }

      return (
        <p key={i} className="text-sm leading-relaxed text-stone-700 font-normal mb-2 last:mb-0">
          {elements.length > 0 ? elements : para}
        </p>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-sm">
      {/* Drawer Container */}
      <div 
        id="ai-drawer"
        className="w-full max-w-lg h-full bg-white flex flex-col shadow-2xl relative border-l border-stone-200 transition-all duration-300 transform translate-x-0"
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-950 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Sparkles className="w-5 h-5 animate-pulse-slow font-semibold" />
            </div>
            <div>
              <h3 className="font-semibold text-base tracking-tight">Aura Luxe AI Assistant</h3>
              <p className="text-xs text-stone-400">Personal Shopping & Styling Guide</p>
            </div>
          </div>
          <button 
            id="close-ai-chat"
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-stone-850 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-stone-50">
          {messages.map((msg) => {
            const hasModel = msg.role === "model";
            const recommendations = hasModel ? parseRecommendations(msg.text) : [];

            return (
              <div key={msg.id} className={`flex ${hasModel ? "justify-start" : "justify-end"} gap-3 items-start`}>
                {hasModel && (
                  <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center shrink-0 border border-stone-800 text-amber-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                
                <div className="max-w-[85%] space-y-3">
                  <div className={`p-3.5 rounded-2xl ${
                    hasModel 
                      ? "bg-white border border-stone-200/80 shadow-sm" 
                      : "bg-stone-900 text-white shadow-sm"
                  }`}>
                    {renderMessageText(msg.text)}
                  </div>

                  {/* Render Parsed Interactive Product Recommendations */}
                  {recommendations.length > 0 && (
                    <div className="grid grid-cols-1 gap-3 pt-1">
                      {recommendations.map((prod) => (
                        <div 
                          key={prod.id} 
                          className="flex items-center gap-3 p-2.5 bg-white border border-stone-200/80 rounded-xl shadow-xs hover:border-amber-500/50 transition-all group"
                        >
                          <img 
                            src={prod.images[0]} 
                            alt={prod.name} 
                            className="w-16 h-16 object-cover rounded-md shrink-0 border border-stone-100" 
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-600 block">
                              {prod.brand}
                            </span>
                            <h4 className="text-xs font-semibold text-stone-900 truncate group-hover:text-amber-600 transition-colors">
                              {prod.name}
                            </h4>
                            <p className="text-xs font-medium text-stone-650 mt-0.5">${prod.price}</p>
                          </div>
                          <div className="flex flex-col gap-1.5 shrink-0">
                            <button
                              id={`ai-add-to-cart-${prod.id}`}
                              onClick={() => onAddToCart(prod)}
                              className="px-2.5 py-1 text-[11px] font-medium bg-stone-900 text-white rounded-md hover:bg-stone-800 flex items-center gap-1 transition-colors"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              Add
                            </button>
                            <button
                              id={`ai-view-details-${prod.id}`}
                              onClick={() => {
                                onViewProduct(prod.id);
                                onClose();
                              }}
                              className="text-[10px] text-stone-500 hover:text-stone-900 font-medium text-center hover:underline"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center shrink-0 text-amber-500 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="p-3.5 bg-white border border-stone-200 rounded-2xl shadow-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorText && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-650 leading-relaxed">
              <span className="font-semibold block mb-0.5">Styling Assistant Offline</span>
              {errorText}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Floating Quick Prompt Suggestions */}
        <div className="px-4 py-2 bg-stone-100/50 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          {quickPrompts.map((p, i) => (
            <button
              id={`quick-ai-prompt-${i}`}
              key={i}
              onClick={() => handleSendMessage(p)}
              className="px-3 py-1.5 rounded-full border border-stone-200 bg-white hover:border-amber-500 hover:text-amber-700 text-xs font-medium text-stone-650 transition-all shrink-0 shadow-xs"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          id="ai-chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="p-3 border-t border-stone-150 flex items-center gap-2.5 bg-white"
        >
          <input
            id="ai-chat-input"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your style request (e.g., matching watch)..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-250 bg-stone-50 text-sm focus:outline-none focus:border-stone-900 focus:bg-white text-stone-900 transition-colors"
          />
          <button
            id="send-ai-message"
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className={`p-2.5 rounded-xl ${
              inputMessage.trim() && !isLoading
                ? "bg-stone-900 text-white hover:bg-stone-800"
                : "bg-stone-200 text-stone-400 cursor-not-allowed"
            } transition-colors`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
