import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  MessageSquare,
  Send,
  ChevronLeft,
  Paperclip,
  Check,
  Clock,
} from "lucide-react";

type MessageStatus = "sent" | "pending";

type Message = {
  id: number;
  text: string;
  fromMe: boolean;
  time: string;
  status?: MessageStatus;
  file?: { name: string; type: string; url?: string } | null;
};

type Conversation = {
  id: number;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    initials: "SM",
    lastMessage: "Great, let's schedule a viewing",
    time: "10:42 AM",
    unread: 2,
    online: true,
    messages: [
      { id: 1, text: "Hi, I'm interested in the 3-bedroom apartment on Allen Avenue.", fromMe: false, time: "10:30 AM" },
      { id: 2, text: "That's available! Would you like to schedule a viewing?", fromMe: true, time: "10:36 AM" },
      { id: 3, text: "Great, let's schedule a viewing.", fromMe: false, time: "10:42 AM" },
    ],
  },
  {
    id: 2,
    name: "James Carter",
    initials: "JC",
    lastMessage: "Can you reduce the price?",
    time: "09:15 AM",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Is the Mercedes you listed still available?", fromMe: false, time: "09:05 AM" },
      { id: 2, text: "Yes, it's still available for inspection.", fromMe: true, time: "09:10 AM" },
      { id: 3, text: "Can you reduce the price?", fromMe: false, time: "09:15 AM" },
    ],
  },
  {
    id: 3,
    name: "Twinqle Support",
    initials: "TS",
    lastMessage: "Your account has been verified ✅",
    time: "Yesterday",
    unread: 1,
    online: true,
    messages: [
      { id: 1, text: "Welcome to Twingle! How can we help you today?", fromMe: false, time: "Mon" },
      { id: 2, text: "Your account has been verified ✅", fromMe: false, time: "Yesterday" },
    ],
  },
  {
    id: 4,
    name: "Olivia Brown",
    initials: "OB",
    lastMessage: "Thank you!",
    time: "Sun",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Do you also handle property management?", fromMe: false, time: "Sun" },
      { id: 2, text: "Yes, we do. I'll send you the details.", fromMe: true, time: "Sun" },
      { id: 3, text: "Thank you!", fromMe: false, time: "Sun" },
    ],
  },
];

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeConversation =
    conversations.find((c) => c.id === activeId) ?? null;

  const openConversation = (id: number) => {
    setActiveId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text || !activeConversation) return;
    const newMessage: Message = {
      id: Date.now(),
      text,
      fromMe: true,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      status: "pending",
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? { ...c, lastMessage: text, messages: [...c.messages, newMessage] }
          : c,
      ),
    );
    setDraft("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeConversation) return;

    const isImage = file.type.startsWith("image/");
    const newMessage: Message = {
      id: Date.now(),
      text: file.name,
      fromMe: true,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      status: "pending",
      file: {
        name: file.name,
        type: file.type,
        url: isImage ? URL.createObjectURL(file) : undefined,
      },
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              lastMessage: `📎 ${file.name}`,
              messages: [...c.messages, newMessage],
            }
          : c,
      ),
    );
    e.target.value = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
            className="flex flex-col"
    >
      <div className="flex-shrink-0 mb-4 sm:mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Messages
        </h1>
        <p className="mt-2 text-gray-600">
          Chat with buyers, sellers and support
        </p>
      </div>

      {/* Two-panel chat container */}
                  <div className="flex h-[calc(100dvh-200px)] sm:h-[calc(100dvh-160px)] min-h-[360px] overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
        {/* ===== CHAT LIST PANEL ===== */}
        <aside
          className={`${
            activeConversation ? "hidden md:flex" : "flex"
          } w-full md:w-72 lg:w-80 flex-shrink-0 flex-col border-r border-gray-200`}
        >
          {/* List header: search + new chat */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <div className="flex flex-1 items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-[#004e27]">
              <Search size={16} className="flex-shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full text-sm bg-transparent outline-none placeholder:text-gray-400"
              />
            </div>
            <button
              className="flex items-center justify-center w-9 h-9 bg-[#004e27] text-white rounded-lg transition hover:bg-gold-500 hover:text-slate-900"
              aria-label="Start a new chat"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* List label */}
          <div className="px-4 pt-4 pb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Conversations
          </div>

          {/* Chat list body */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => {
              const isActive = conversation.id === activeId;
              return (
                <button
                  key={conversation.id}
                  onClick={() => openConversation(conversation.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                    isActive
                      ? "bg-[#004e27]/5 border-l-4 border-[#004e27]"
                      : "border-l-4 border-transparent"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className={`flex items-center justify-center w-11 h-11 rounded-full font-semibold text-white ${
                        conversation.id % 2 === 0
                          ? "bg-gold-500 text-slate-900"
                          : "bg-[#004e27]"
                      }`}
                    >
                      {conversation.initials}
                    </div>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {conversation.name}
                      </p>
                      <span className="flex-shrink-0 text-xs text-gray-400">
                        {conversation.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="flex-shrink-0 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 ml-2 text-xs font-semibold text-white bg-gold-500 rounded-full">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ===== MAIN CHAT CONTAINER ===== */}
        <section
          className={`${
            activeConversation ? "flex" : "hidden md:flex"
          } flex-1 flex-col min-w-0`}
        >
          {activeConversation ? (
            <>
              {/* Chat header */}
              <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                <button
                  className="text-gray-500 md:hidden hover:text-gray-700"
                  onClick={() => setActiveId(null)}
                  aria-label="Back to conversations"
                >
                  <ChevronLeft size={22} />
                </button>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-white ${
                    activeConversation.id % 2 === 0
                      ? "bg-gold-500 text-slate-900"
                      : "bg-[#004e27]"
                  }`}
                >
                  {activeConversation.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {activeConversation.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {activeConversation.online ? "Online" : "Offline"}
                  </p>
                </div>
              </header>

              {/* Message body */}
              <div className="flex-1 px-4 py-6 space-y-3 overflow-y-auto bg-gray-50 sm:px-6">
                {activeConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.fromMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
                        message.fromMe
                          ? "bg-[#004e27] text-white rounded-br-sm"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                      }`}
                    >
                      {message.file ? (
                        <div className="mb-1">
                          {message.file.url ? (
                            <img
                              src={message.file.url}
                              alt={message.file.name}
                              className="max-w-[200px] rounded-lg"
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <Paperclip
                                size={14}
                                className="flex-shrink-0"
                              />
                              <span className="text-xs font-medium break-all">
                                {message.file.name}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p>{message.text}</p>
                      )}
                      <span
                        className={`flex items-center gap-1 mt-1 text-[10px] ${
                          message.fromMe ? "text-white/70" : "text-gray-400"
                        }`}
                      >
                        {message.time}
                        {message.fromMe &&
                          (message.status === "pending" ? (
                            <Clock size={11} aria-label="Message not sent" />
                          ) : (
                            <Check size={11} aria-label="Message sent" />
                          ))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat input bar */}
              <footer className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-200">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-lg transition hover:text-[#004e27] hover:bg-[#004e27]/5"
                  aria-label="Attach a file"
                >
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 text-sm bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-[#004e27] placeholder:text-gray-400"
                />
                <button
                  onClick={handleSend}
                  className="flex items-center justify-center w-10 h-10 bg-[#004e27] text-white rounded-lg transition hover:bg-gold-500 hover:text-slate-900"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </footer>
            </>
          ) : (
            /* No conversation selected placeholder (input hidden) */
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center text-gray-400 bg-gray-50">
              <MessageSquare className="w-12 h-12 mb-3 text-gray-300" />
              <p className="text-sm font-medium text-gray-500">
                No chat conversation selected
              </p>
              <p className="mt-1 text-xs">
                Choose a conversation from the list to start chatting.
              </p>
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
};

export default MessagesPage;
