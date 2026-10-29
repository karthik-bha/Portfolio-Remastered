"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const MAX_USER_CHARS = 500;
const CHATBOT_API_URL =
  process.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://127.0.0.1:8000";

const QUICK_PROMPTS = [
  "What are Karthik's core skills?",
  "Tell me about his featured projects",
  "What is his experience in React & Next.js?",
  "How can I get in touch with Karthik?",
];

// Concentric circles tech logo component
const TechCirclesLogo: React.FC<{ size?: string; className?: string }> = ({
  size = "w-5 h-5",
  className = "text-white",
}) => (
  <svg
    className={`${size} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
  >
    {/* Outer dashed ring */}
    <circle
      cx="12"
      cy="12"
      r="9.5"
      strokeWidth="1.2"
      strokeOpacity="0.35"
      strokeDasharray="2.5 2"
    />
    {/* Middle concurrent ring */}
    <circle cx="12" cy="12" r="6.5" strokeWidth="1.6" strokeOpacity="0.75" />
    {/* Inner core ring */}
    <circle cx="12" cy="12" r="3.4" strokeWidth="2" strokeOpacity="0.95" />
    {/* Center node */}
    <circle cx="12" cy="12" r="1.3" fill="currentColor" />
  </svg>
);

// Helper to format assistant message with lightweight markdown support
const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Split into code blocks and normal paragraphs
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-sm leading-relaxed break-words overflow-hidden text-neutral-200 font-content">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n");
          const firstLine = lines[0].trim();
          const hasLang = firstLine && !firstLine.includes(" ");
          const language = hasLang ? firstLine : "";
          const code = (hasLang ? lines.slice(1) : lines).join("\n");

          return (
            <div
              key={index}
              className="my-2.5 rounded-lg border border-white/10 bg-[#0a0a0a] overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/10 text-xs text-[#848484]">
                <span className="font-mono lowercase">{language || "code"}</span>
                <button
                  type="button"
                  onClick={() => copyCode(code, index)}
                  className="hover:text-white transition-colors flex items-center gap-1 font-content"
                  aria-label="Copy code"
                >
                  {copiedIndex === index ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[11px] text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 font-mono text-xs overflow-x-auto text-neutral-200">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Process markdown text (bold, inline code, links, bullet points)
        const lines = part.split("\n");
        return (
          <div key={index} className="space-y-1">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) {
                return <div key={lIdx} className="h-1.5" />;
              }

              // List item
              const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
              const contentToFormat = isBullet ? trimmed.slice(2) : trimmed;

              const formatted = formatInline(contentToFormat);

              if (isBullet) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1">
                    <span className="text-[#848484] text-xs mt-1">•</span>
                    <span className="flex-1">{formatted}</span>
                  </div>
                );
              }

              return <p key={lIdx}>{formatted}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
};

// Generates a human-friendly purpose/title for URLs instead of displaying long raw links
function getReadableLinkLabel(urlStr: string): string {
  try {
    const parsed = new URL(urlStr);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    const pathname = parsed.pathname.replace(/\/$/, "");
    const hash = parsed.hash.toLowerCase();

    // Portfolio site routes
    if (host.includes("karthikbuilds.in") || host === "localhost" || host === "127.0.0.1") {
      if (pathname === "/contact" || hash.includes("contact")) return "Contact Page";
      if (pathname === "/guestbook" || hash.includes("guestbook")) return "Guestbook";
      if (hash.includes("projects") || pathname.includes("projects")) return "Projects";
      if (hash.includes("experience") || pathname.includes("experience")) return "Experience";
      if (hash.includes("skills") || pathname.includes("skills")) return "Skills";
      if (pathname === "" || pathname === "/") return "Portfolio Home";
      const slug = pathname.split("/").filter(Boolean).pop();
      if (slug) {
        return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/[-_]/g, " ");
      }
      return "Portfolio Link";
    }

    // Google Drive Resume
    if (host.includes("drive.google.com")) {
      return "Karthik's Resume";
    }

    // GitHub
    if (host.includes("github.com") || host.includes("github.io")) {
      const parts = pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        return `GitHub: ${parts[1]}`;
      }
      if (parts.length === 1 && parts[0] !== "karthik-bha") {
        return `GitHub: ${parts[0]}`;
      }
      return "GitHub Profile";
    }

    // LinkedIn
    if (host.includes("linkedin.com")) {
      return "LinkedIn Profile";
    }

    // Known project domains
    if (host.includes("nexus")) return "Nexus Platform";
    if (host.includes("deliveroo")) return "Deliveroo";
    if (host.includes("bookeasy")) return "BookEasy";
    if (host.includes("coffee") || host.includes("get-me-a-coffee")) return "Get Me a Coffee";
    if (host.includes("firstbench")) return "FirstBench";

    // General fallback: clean slug or host name
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0) {
      const slug = segments[segments.length - 1];
      if (slug.length < 24 && !slug.includes(".")) {
        return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/[-_]/g, " ");
      }
    }

    // Short host (e.g., example.vercel.app -> Example)
    const hostParts = host.split(".");
    if (hostParts.length > 1) {
      return hostParts[0].charAt(0).toUpperCase() + hostParts[0].slice(1);
    }

    return host;
  } catch {
    return "Visit Link";
  }
}

// Formats inline markdown elements, markdown links, and raw URLs
function formatInline(text: string): React.ReactNode[] {
  // Pattern matching: **bold**, `code`, [label](url), or raw http(s) URLs
  const regex = /(\*\*.*?\*\*|`[^`]+`|\[.*?\]\(.*?\)|\bhttps?:\/\/[^\s<>)"]+)/g;
  const parts = text.split(regex);

  return parts.map((segment, i) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {segment.slice(2, -2)}
        </strong>
      );
    }
    if (segment.startsWith("`") && segment.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-200 text-xs font-mono"
        >
          {segment.slice(1, -1)}
        </code>
      );
    }
    // Markdown link: [text](url)
    const linkMatch = segment.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const rawLabel = linkMatch[1];
      const url = linkMatch[2];
      // If label itself is a raw URL, resolve to readable title
      const label =
        rawLabel.startsWith("http://") || rawLabel.startsWith("https://")
          ? getReadableLinkLabel(rawLabel)
          : rawLabel;

      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={url}
          className="text-sky-400 hover:text-sky-300 underline underline-offset-4 decoration-sky-400/50 hover:decoration-sky-300 font-medium inline-flex items-center gap-0.5 transition-colors"
        >
          <span>{label}</span>
          <svg
            className="w-3 h-3 inline-block shrink-0 opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      );
    }
    // Raw HTTP / HTTPS URL
    if (segment.startsWith("http://") || segment.startsWith("https://")) {
      let cleanUrl = segment;
      let trailingPunctuation = "";
      const trailingMatch = cleanUrl.match(/[.,;:?!)]+$/);
      if (trailingMatch) {
        trailingPunctuation = trailingMatch[0];
        cleanUrl = cleanUrl.slice(0, -trailingPunctuation.length);
      }

      const displayLabel = getReadableLinkLabel(cleanUrl);

      return (
        <React.Fragment key={i}>
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={cleanUrl}
            className="text-sky-400 hover:text-sky-300 underline underline-offset-4 decoration-sky-400/50 hover:decoration-sky-300 font-medium inline-flex items-center gap-0.5 transition-colors"
          >
            <span>{displayLabel}</span>
            <svg
              className="w-3 h-3 inline-block shrink-0 opacity-80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          {trailingPunctuation}
        </React.Fragment>
      );
    }
    return <React.Fragment key={i}>{segment}</React.Fragment>;
  });
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content:
        "Hello! 👋 I'm Karthik's assistant. Ask me anything about his projects, skills, experience, or background!",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom of messages container
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("auto");
      if (window.innerWidth > 640) {
        inputRef.current?.focus();
      }
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages, isStreaming, isLoading, scrollToBottom]);

  // Clean up abort controller on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setIsLoading(false);
  };

  const handleResetChat = () => {
    handleStopGeneration();
    setMessages([
      {
        id: "welcome-msg",
        role: "assistant",
        content:
          "Hello! 👋 I'm Karthik's assistant. Ask me anything about his projects, skills, experience, or background!",
        timestamp: new Date(),
      },
    ]);
    setErrorMessage(null);
  };

  const sendMessage = async (rawContent?: string) => {
    const textToSend = (rawContent ?? inputValue).trim();

    // Frontend Validations
    if (!textToSend) {
      return;
    }
    if (textToSend.length > MAX_USER_CHARS) {
      setErrorMessage(`Message must not exceed ${MAX_USER_CHARS} characters.`);
      return;
    }

    setErrorMessage(null);
    setInputValue("");

    const userMessageId = "user-" + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    // ChatRequest history formatting
    const history = messages
      .filter((m) => m.content.trim().length > 0)
      .map((m) => ({ role: m.role, content: m.content }));

    let payloadMessages = [...history, { role: "user" as const, content: textToSend }];
    while (payloadMessages.length > 0 && payloadMessages[0].role !== "user") {
      payloadMessages.shift();
    }
    if (payloadMessages.length === 0) {
      payloadMessages = [{ role: "user", content: textToSend }];
    }

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    const assistantMessageId = "assistant-" + Date.now();
    let accumulatedText = "";

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(`${CHATBOT_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: payloadMessages,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let errDetail = "Failed to get response from server.";
        try {
          const errData = await response.json();
          if (errData?.detail) {
            errDetail =
              typeof errData.detail === "string"
                ? errData.detail
                : Array.isArray(errData.detail)
                ? errData.detail[0]?.msg || JSON.stringify(errData.detail)
                : JSON.stringify(errData.detail);
          }
        } catch {
          // not json
        }

        if (response.status === 429) {
          errDetail = "Rate limit exceeded. Please wait a moment and try again.";
        }
        throw new Error(errDetail);
      }

      setIsLoading(false);
      setIsStreaming(true);

      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (!reader) {
        throw new Error("Response body is not readable.");
      }

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const decoded = decoder.decode(value, { stream: true });
        buffer += decoded;

        if (buffer.includes("data:")) {
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const clean = line.trim();
            if (clean.startsWith("data:")) {
              const token = clean.replace(/^data:\s?/, "");
              if (token === "[DONE]") continue;
              accumulatedText += token;
            } else if (clean) {
              accumulatedText += clean;
            }
          }
        } else {
          accumulatedText += buffer;
          buffer = "";
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: accumulatedText }
              : msg
          )
        );
      }

      if (buffer.trim()) {
        const token = buffer.startsWith("data:")
          ? buffer.replace(/^data:\s?/, "")
          : buffer;
        if (token !== "[DONE]") {
          accumulatedText += token;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: accumulatedText }
                : msg
            )
          );
        }
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while communicating with the chatbot.";
      setErrorMessage(message);

      if (!accumulatedText) {
        setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessageId));
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && !isStreaming) {
        sendMessage();
      }
    }
  };

  return (
    <div className="fixed z-50 bottom-5 right-5 sm:bottom-6 sm:right-6 pointer-events-auto">
      {/* Floating Action Button (FAB) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative"
          >
            {/* Tooltip hint on hover */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-[#121212] border border-white/10 text-xs text-[#848484] px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap font-content">
                Chat with Assistant
              </span>
            </div>

            <motion.button
              type="button"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open Assistant"
              className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#121212] text-white shadow-xl shadow-black/70 border border-white/15 hover:border-white/30 transition-all"
            >
              {/* Concentric circles logo icon */}
              <TechCirclesLogo size="w-6 h-6" className="text-white group-hover:scale-105 transition-transform" />

              {/* Online pulse indicator */}
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#121212]" />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
            className={`flex flex-col bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/90 rounded-2xl overflow-hidden transition-all duration-300 ease-out font-content ${
              isEnlarged
                ? "w-[94vw] sm:w-[580px] md:w-[680px] h-[84vh] max-h-[760px]"
                : "w-[92vw] sm:w-[390px] h-[550px] max-h-[82vh]"
            }`}
            style={{
              maxWidth: "calc(100vw - 1.5rem)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Karthik's Portfolio Assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#121212] border-b border-white/10 select-none">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white">
                  <TechCirclesLogo size="w-5 h-5" className="text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#121212] rounded-full" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white tracking-wide font-header">
                    Karthik&apos;s Assistant
                  </h2>
                  <p className="text-[11px] text-[#848484] flex items-center gap-1.5 font-content">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Portfolio Assistant
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {/* Reset Chat */}
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-1.5 text-[#848484] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>

                {/* Enlarge / Compress Toggle */}
                <button
                  type="button"
                  onClick={() => setIsEnlarged(!isEnlarged)}
                  title={isEnlarged ? "Collapse to standard size" : "Enlarge window"}
                  aria-label={isEnlarged ? "Collapse window" : "Enlarge window"}
                  className="p-1.5 text-[#848484] hover:text-white hover:bg-white/5 rounded-lg transition-colors hidden sm:inline-flex"
                >
                  {isEnlarged ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 9L4 4m0 0v4m0-4h4m6 6l5 5m0 0v-4m0 4h-4"
                      />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="p-1.5 text-[#848484] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`relative max-w-[86%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                        isUser
                          ? "bg-white/10 text-white rounded-br-xs border border-white/15"
                          : "bg-white/5 text-neutral-200 rounded-bl-xs border border-white/10"
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      ) : (
                        <MarkdownContent content={message.content} />
                      )}
                    </div>
                    <span className="text-[10px] text-[#848484] mt-1 px-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-[#848484] text-xs py-1"
                >
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-2 rounded-2xl rounded-bl-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#848484] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#848484] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#848484] animate-bounce" />
                    <span className="text-[11px] text-[#848484] ml-1.5 font-content">Thinking...</span>
                  </div>
                </motion.div>
              )}

              {/* Quick suggestions when conversation has only the welcome prompt */}
              {messages.length === 1 && !isLoading && !isStreaming && (
                <div className="pt-2">
                  <p className="text-[11px] uppercase tracking-wider text-[#848484] font-header mb-2">
                    Suggested topics
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => sendMessage(prompt)}
                        className="text-left text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-xl transition-all font-content"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error notice */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-200 flex items-start justify-between gap-2"
                >
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-red-400 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-red-400 hover:text-red-200 text-xs shrink-0"
                  >
                    Dismiss
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input & Footer */}
            <div className="p-3 bg-[#121212] border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isLoading && !isStreaming) {
                    sendMessage();
                  }
                }}
                className="relative flex flex-col gap-1.5"
              >
                <div className="relative flex items-center rounded-xl bg-white/5 border border-white/10 focus-within:border-white/25 focus-within:bg-white/[0.07] transition-all">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={inputValue}
                    maxLength={MAX_USER_CHARS}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Karthik's work..."
                    className="w-full resize-none bg-transparent px-3.5 py-2.5 text-sm text-white placeholder-[#848484] focus:outline-none max-h-32 min-h-[42px] font-content"
                  />

                  {/* Send or Stop button */}
                  <div className="pr-2 flex items-center">
                    {isStreaming ? (
                      <button
                        type="button"
                        onClick={handleStopGeneration}
                        title="Stop response"
                        aria-label="Stop response"
                        className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="6" y="6" width="12" height="12" rx="2" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!inputValue.trim() || isLoading}
                        title="Send message"
                        aria-label="Send message"
                        className={`p-1.5 rounded-lg transition-all ${
                          inputValue.trim() && !isLoading
                            ? "bg-white text-black hover:bg-neutral-200 active:scale-95"
                            : "bg-white/10 text-neutral-500 cursor-not-allowed"
                        }`}
                      >
                        <svg className="w-4 h-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19V5m0 0l-7 7m7-7l7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Character Counter & Helper Text */}
                <div className="flex items-center justify-between px-1 text-[11px] text-[#848484] font-content">
                  <span>Enter to send · Shift+Enter newline</span>
                  <span
                    className={
                      inputValue.length > MAX_USER_CHARS * 0.9
                        ? "text-amber-400 font-semibold"
                        : "text-[#848484]"
                    }
                  >
                    {inputValue.length}/{MAX_USER_CHARS}
                  </span>
                </div>

                {/* Privacy disclaimer */}
                <p className="text-[10px] text-[#848484]/80 text-center px-1 pt-0.5 leading-tight font-content">
                  Please do not enter personal or sensitive info; conversations may be processed by AI model providers.
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;