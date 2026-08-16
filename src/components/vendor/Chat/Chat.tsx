import React, { useEffect, useRef, useState } from "react";
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
  Reply,
  Pencil,
  X,
  Download,
  Copy,
  Image as ImageIcon,
  FileText,
  ArrowLeft,
  ArrowRight,
  Eye,
  Video as VideoIcon,
  ArrowDown,
} from "lucide-react";

type MessageStatus = "sent" | "pending";

type ReplyTo = {
  id: number;
  text: string;
  fromMe: boolean;
  senderName: string;
};

type Attachment = {
  id: number;
  name: string;
  type: string;
  url?: string;
  size?: number;
};

type Message = {
  id: number;
  text: string;
  fromMe: boolean;
  time: string;
  status?: MessageStatus;
  file?: Attachment | null;
  files?: Attachment[];
  read?: boolean;
  replyTo?: ReplyTo | null;
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
      {
        id: 1,
        text: "Hi, I'm interested in the 3-bedroom apartment on Allen Avenue.",
        fromMe: false,
        time: "10:30 AM",
      },
      {
        id: 2,
        text: "That's available! Would you like to schedule a viewing?",
        fromMe: true,
        time: "10:36 AM",
      },
      {
        id: 3,
        text: "Great, let's schedule a viewing.",
        fromMe: false,
        time: "10:42 AM",
      },
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
      {
        id: 1,
        text: "Is the Mercedes you listed still available?",
        fromMe: false,
        time: "09:05 AM",
      },
      {
        id: 2,
        text: "Yes, it's still available for inspection.",
        fromMe: true,
        time: "09:10 AM",
      },
      {
        id: 3,
        text: "Can you reduce the price?",
        fromMe: false,
        time: "09:15 AM",
      },
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
      {
        id: 1,
        text: "Welcome to Twingle! How can we help you today?",
        fromMe: false,
        time: "Mon",
      },
      {
        id: 2,
        text: "Your account has been verified ✅",
        fromMe: false,
        time: "Yesterday",
      },
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
      {
        id: 1,
        text: "Do you also handle property management?",
        fromMe: false,
        time: "Sun",
      },
      {
        id: 2,
        text: "Yes, we do. I'll send you the details.",
        fromMe: true,
        time: "Sun",
      },
      { id: 3, text: "Thank you!", fromMe: false, time: "Sun" },
    ],
  },
];

const Chat: React.FC = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [replyToMessageId, setReplyToMessageId] = useState<number | null>(null);
  const [imageGallery, setImageGallery] = useState<{
    items: Attachment[];
    index: number;
  } | null>(null);
  const [uploadMenuOpen, setUploadMenuOpen] = useState(false);
  const [showScrollToLatest, setShowScrollToLatest] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const activeConversation =
    conversations.find((c) => c.id === activeId) ?? null;
  const replyTarget =
    activeConversation?.messages.find(
      (message) => message.id === replyToMessageId,
    ) ?? null;

  const getUnreadMessages = (conversation: Conversation | null) =>
    conversation
      ? conversation.messages.filter(
          (message) => !message.fromMe && message.read === false,
        )
      : [];

  const unreadMessagesForActiveChat =
    getUnreadMessages(activeConversation).length;

  const markConversationAsRead = (conversationId: number) => {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              unread: 0,
              messages: conversation.messages.map((message) =>
                !message.fromMe ? { ...message, read: true } : message,
              ),
            }
          : conversation,
      ),
    );
  };

  const getAttachmentIcon = (attachment: Attachment) => {
    if (attachment.type.startsWith("image/")) return <ImageIcon size={16} />;
    if (attachment.type.startsWith("video/")) return <VideoIcon size={16} />;
    return <FileText size={16} />;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const getAttachmentLabel = (attachment: Attachment) => {
    if (attachment.type.startsWith("image/")) return "Image";
    if (attachment.type.startsWith("video/")) return "Video";
    return "Document";
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
    setShowScrollToLatest(false);
  }, [activeId, conversations]);

  const scrollToMessage = (messageId: number) => {
    const target = messageRefs.current[messageId];
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("ring-2", "ring-[#004e27]/70", "ring-offset-2");
    window.setTimeout(() => {
      target.classList.remove("ring-2", "ring-[#004e27]/70", "ring-offset-2");
    }, 1200);
  };

  const scrollToLatestMessage = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    setShowScrollToLatest(false);
  };

  const openConversation = (id: number) => {
    setActiveId(id);
    markConversationAsRead(id);
  };

  const resetComposer = () => {
    setDraft("");
    setEditingMessageId(null);
    setReplyToMessageId(null);
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text || !activeConversation) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    if (editingMessageId !== null) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversation.id
            ? {
                ...c,
                lastMessage: text,
                messages: c.messages.map((message) =>
                  message.id === editingMessageId
                    ? { ...message, text, time: currentTime, status: "sent" }
                    : message,
                ),
              }
            : c,
        ),
      );
      resetComposer();
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      text,
      fromMe: true,
      time: currentTime,
      status: "pending",
      replyTo: replyTarget
        ? {
            id: replyTarget.id,
            text: replyTarget.text,
            fromMe: replyTarget.fromMe,
            senderName: replyTarget.fromMe ? "You" : activeConversation.name,
          }
        : null,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? { ...c, lastMessage: text, messages: [...c.messages, newMessage] }
          : c,
      ),
    );
    resetComposer();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    kind: "image" | "video" | "document" = "document",
  ) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (!selectedFiles.length || !activeConversation) return;

    const attachments: Attachment[] = selectedFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type || `${kind}/${file.name.split(".").pop() ?? "file"}`,
      url: URL.createObjectURL(file),
      size: file.size,
    }));

    const fileText =
      attachments.length > 1
        ? `${attachments.length} files`
        : attachments[0].name;

    const newMessage: Message = {
      id: Date.now(),
      text: draft.trim() || fileText,
      fromMe: true,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      status: "pending",
      files: attachments,
      file: attachments.length === 1 ? attachments[0] : null,
      read: true,
      replyTo: replyTarget
        ? {
            id: replyTarget.id,
            text: replyTarget.text,
            fromMe: replyTarget.fromMe,
            senderName: replyTarget.fromMe ? "You" : activeConversation.name,
          }
        : null,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              lastMessage: `📎 ${fileText}`,
              messages: [...c.messages, newMessage],
            }
          : c,
      ),
    );

    resetComposer();
    setUploadMenuOpen(false);
    e.target.value = "";
  };

  const triggerUploadMenu = (type: "image" | "video" | "document") => {
    setUploadMenuOpen(false);

    const inputRef =
      type === "image"
        ? imageInputRef.current
        : type === "video"
          ? videoInputRef.current
          : documentInputRef.current;

    inputRef?.click();
  };

  const copyMessageText = async (message: Message) => {
    if (!message.text.trim() || message.file || message.files?.length) return;

    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(message.text);
      }
      setCopiedMessageId(message.id);
      window.setTimeout(() => {
        setCopiedMessageId((prev) => (prev === message.id ? null : prev));
      }, 1200);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col"
    >
      <div
        className={`${
          activeConversation ? "hidden md:flex" : "flex"
        } flex-shrink-0 mb-4 sm:mb-6 flex-col`}
      >
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Messages
        </h1>
        <p className="mt-2 text-gray-600">
          Chat with buyers, sellers
        </p>
      </div>

      {/* Two-panel chat container */}
      <div className="flex h-[calc(100dvh-160px)] sm:h-[calc(100dvh-120px)] min-h-[420px] overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
        {/* ===== CHAT LIST PANEL ===== */}
        <aside
          className={`${
            activeConversation ? "hidden md:flex" : "flex"
          } w-full md:w-64 lg:w-72 flex-shrink-0 flex-col border-r border-gray-200`}
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
                {unreadMessagesForActiveChat > 0 && (
                  <span className="inline-flex items-center justify-center rounded-full bg-[#004e27]/10 px-2.5 py-1 text-[11px] font-medium text-[#004e27]">
                    {unreadMessagesForActiveChat} unread
                  </span>
                )}
              </header>

              {/* Message body */}
              <div
                ref={messagesContainerRef}
                onScroll={() => {
                  const container = messagesContainerRef.current;
                  if (!container) return;

                  const isNearBottom =
                    container.scrollHeight -
                      container.scrollTop -
                      container.clientHeight <
                    120;
                  setShowScrollToLatest(!isNearBottom);
                }}
                className="flex-1 px-4 py-6 space-y-3 overflow-y-auto bg-gray-50 sm:px-6"
              >
                {activeConversation.messages.map((message) => {
                  const attachments =
                    message.files ?? (message.file ? [message.file] : []);
                  const isTextMessage =
                    !attachments.length || !!message.text.trim();

                  return (
                    <div
                      key={message.id}
                      ref={(node) => {
                        messageRefs.current[message.id] = node;
                      }}
                      className={`group flex ${
                        message.fromMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[78%] ${
                          message.fromMe ? "items-end" : "items-start"
                        } flex flex-col`}
                      >
                        <div className="mb-1 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => {
                              setReplyToMessageId(message.id);
                              setEditingMessageId(null);
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 hover:text-[#004e27]"
                            aria-label="Reply to this message"
                          >
                            <Reply size={14} />
                          </button>
                          {!attachments.length && message.text.trim() && (
                            <button
                              type="button"
                              onClick={() => copyMessageText(message)}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 hover:text-[#004e27]"
                              aria-label="Copy message text"
                            >
                              {copiedMessageId === message.id ? (
                                <Check size={14} />
                              ) : (
                                <Copy size={14} />
                              )}
                            </button>
                          )}
                          {message.fromMe && !attachments.length && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingMessageId(message.id);
                                setReplyToMessageId(null);
                                setDraft(message.text);
                              }}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 hover:text-[#004e27]"
                              aria-label="Edit this message"
                            >
                              <Pencil size={14} />
                            </button>
                          )}
                        </div>

                        <div
                          className={`w-full rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            message.fromMe
                              ? "bg-[#004e27] text-white rounded-br-sm"
                              : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                          }`}
                        >
                          {message.replyTo && (
                            <button
                              type="button"
                              onClick={() =>
                                scrollToMessage(message.replyTo!.id)
                              }
                              className={`mb-2 w-full rounded-lg border px-2 py-1.5 text-left ${
                                message.fromMe
                                  ? "border-white/20 bg-white/10"
                                  : "border-gray-200 bg-gray-50"
                              }`}
                            >
                              <p
                                className={`text-[10px] font-medium ${
                                  message.fromMe
                                    ? "text-white/70"
                                    : "text-gray-500"
                                }`}
                              >
                                {message.replyTo.senderName}
                              </p>
                              <p
                                className={`mt-0.5 text-[11px] ${
                                  message.fromMe
                                    ? "text-white/80"
                                    : "text-gray-600"
                                }`}
                              >
                                {message.replyTo.text}
                              </p>
                            </button>
                          )}

                          {attachments.length > 0 && (
                            <div className="space-y-2">
                              {attachments.length === 1 ? (
                                <div className="space-y-2">
                                  {attachments[0].type.startsWith("image/") ? (
                                    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                      <img
                                        src={attachments[0].url}
                                        alt={attachments[0].name}
                                        className="max-h-[260px] w-full cursor-pointer object-cover"
                                        onClick={() =>
                                          setImageGallery({
                                            items: attachments,
                                            index: 0,
                                          })
                                        }
                                      />
                                    </div>
                                  ) : attachments[0].type.startsWith(
                                      "video/",
                                    ) ? (
                                    <div className="overflow-hidden rounded-xl bg-black">
                                      <video
                                        controls
                                        playsInline
                                        preload="metadata"
                                        className="max-h-[260px] w-full rounded-xl border border-white/10 bg-black"
                                        src={attachments[0].url}
                                      />
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        attachments[0].url &&
                                        window.open(
                                          attachments[0].url,
                                          "_blank",
                                          "noopener,noreferrer",
                                        )
                                      }
                                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3 text-left transition hover:border-[#004e27] hover:bg-[#004e27]/5"
                                    >
                                      <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#004e27]/10 text-[#004e27]">
                                          {getAttachmentIcon(attachments[0])}
                                        </div>
                                        <div className="min-w-0">
                                          <p className="truncate text-sm font-medium text-gray-800">
                                            {attachments[0].name}
                                          </p>
                                          <p className="text-[11px] text-gray-500">
                                            {getAttachmentLabel(attachments[0])}{" "}
                                            •{" "}
                                            {formatFileSize(
                                              attachments[0].size,
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                      <a
                                        href={attachments[0].url}
                                        download={attachments[0].name}
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#004e27] text-white"
                                        aria-label={`Download ${attachments[0].name}`}
                                      >
                                        <Download size={16} />
                                      </a>
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div
                                  className={`grid gap-2 ${
                                    attachments.length === 2 ||
                                    attachments.length === 4
                                      ? "grid-cols-2"
                                      : "grid-cols-3"
                                  }`}
                                >
                                  {attachments.map((attachment) => {
                                    const imageOnly =
                                      attachment.type.startsWith("image/");
                                    const isVideo =
                                      attachment.type.startsWith("video/");

                                    if (imageOnly || isVideo) {
                                      return (
                                        <div
                                          key={attachment.id}
                                          className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                                        >
                                          {imageOnly ? (
                                            <img
                                              src={attachment.url}
                                              alt={attachment.name}
                                              className="h-28 w-full cursor-pointer object-cover"
                                              onClick={() =>
                                                setImageGallery({
                                                  items: attachments.filter(
                                                    (item) =>
                                                      item.type.startsWith(
                                                        "image/",
                                                      ),
                                                  ),
                                                  index: attachments
                                                    .filter((item) =>
                                                      item.type.startsWith(
                                                        "image/",
                                                      ),
                                                    )
                                                    .findIndex(
                                                      (item) =>
                                                        item.id ===
                                                        attachment.id,
                                                    ),
                                                })
                                              }
                                            />
                                          ) : (
                                            <video
                                              controls
                                              playsInline
                                              preload="metadata"
                                              className="h-28 w-full object-cover"
                                              src={attachment.url}
                                            />
                                          )}
                                          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/65 to-transparent px-2 py-1.5 text-[10px] text-white">
                                            <span className="truncate max-w-[72%]">
                                              {attachment.name}
                                            </span>
                                            <a
                                              href={attachment.url}
                                              download={attachment.name}
                                              className="flex h-6 w-6 items-center justify-center rounded-md bg-white/15"
                                              aria-label={`Download ${attachment.name}`}
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <Download size={12} />
                                            </a>
                                          </div>
                                        </div>
                                      );
                                    }

                                    return (
                                      <button
                                        key={attachment.id}
                                        type="button"
                                        onClick={() =>
                                          attachment.url &&
                                          window.open(
                                            attachment.url,
                                            "_blank",
                                            "noopener,noreferrer",
                                          )
                                        }
                                        className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3 text-center"
                                      >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#004e27]/10 text-[#004e27]">
                                          <FileText size={18} />
                                        </div>
                                        <div className="min-w-0">
                                          <p className="truncate text-[11px] font-medium text-gray-800">
                                            {attachment.name}
                                          </p>
                                        </div>
                                        <a
                                          href={attachment.url}
                                          download={attachment.name}
                                          onClick={(e) => e.stopPropagation()}
                                          className="flex h-7 w-7 items-center justify-center rounded-md bg-[#004e27] text-white"
                                          aria-label={`Download ${attachment.name}`}
                                        >
                                          <Download size={12} />
                                        </a>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}

                          {isTextMessage && message.text && (
                            <p className="mt-2 break-words">{message.text}</p>
                          )}

                          <span
                            className={`flex items-center gap-1 mt-2 text-[10px] ${
                              message.fromMe ? "text-white/70" : "text-gray-400"
                            }`}
                          >
                            {message.time}
                            {message.fromMe &&
                              (message.status === "pending" ? (
                                <Clock
                                  size={11}
                                  aria-label="Message not sent"
                                />
                              ) : (
                                <Check size={11} aria-label="Message sent" />
                              ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} className="h-1" />
              </div>

              {showScrollToLatest && (
                <button
                  type="button"
                  onClick={scrollToLatestMessage}
                  className="absolute bottom-24 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#004e27] text-white shadow-lg transition hover:scale-105 hover:bg-[#003b20]"
                  aria-label="Scroll to latest message"
                >
                  <ArrowDown size={18} />
                </button>
              )}

              {/* Chat input bar */}
              <footer className="flex flex-col gap-2 border-t border-gray-200 bg-white px-4 py-3">
                {(replyTarget || editingMessageId !== null) && (
                  <div className="flex items-center justify-between rounded-lg border border-[#004e27]/20 bg-[#004e27]/5 px-3 py-2 text-sm text-gray-700">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#004e27]">
                        {editingMessageId !== null
                          ? "Editing message"
                          : "Replying to"}
                      </p>
                      <p className="truncate text-xs text-gray-600">
                        {editingMessageId !== null
                          ? activeConversation.messages.find(
                              (message) => message.id === editingMessageId,
                            )?.text
                          : replyTarget?.text}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={resetComposer}
                      className="ml-2 flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      aria-label="Cancel composer action"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="relative flex items-center gap-2">
                  <input
                    ref={imageInputRef}
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "image")}
                  />
                  <input
                    ref={videoInputRef}
                    type="file"
                    className="hidden"
                    multiple
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, "video")}
                  />
                  <input
                    ref={documentInputRef}
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                    onChange={(e) => handleFileChange(e, "document")}
                  />

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setUploadMenuOpen((prev) => !prev)}
                      className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-lg transition hover:text-[#004e27] hover:bg-[#004e27]/5"
                      aria-label="Attach a file"
                    >
                      <Paperclip size={20} />
                    </button>

                    {uploadMenuOpen && (
                      <div className="absolute bottom-full left-0 z-20 mb-2 w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                        <button
                          type="button"
                          onClick={() => triggerUploadMenu("image")}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <ImageIcon size={16} className="text-[#004e27]" />
                          Image
                        </button>
                        <button
                          type="button"
                          onClick={() => triggerUploadMenu("video")}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <VideoIcon size={16} className="text-[#004e27]" />
                          Video
                        </button>
                        <button
                          type="button"
                          onClick={() => triggerUploadMenu("document")}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <FileText size={16} className="text-[#004e27]" />
                          Document
                        </button>
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                      if (e.key === "Escape") resetComposer();
                    }}
                    placeholder={
                      editingMessageId !== null
                        ? "Edit your message..."
                        : "Type a message..."
                    }
                    className="flex-1 min-w-0 px-4 py-2.5 text-sm bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-[#004e27] placeholder:text-gray-400"
                  />
                  <button
                    onClick={handleSend}
                    className="flex items-center justify-center w-10 h-10 bg-[#004e27] text-white rounded-lg transition hover:bg-gold-500 hover:text-slate-900"
                    aria-label={
                      editingMessageId !== null
                        ? "Save message"
                        : "Send message"
                    }
                  >
                    {editingMessageId !== null ? (
                      <Check size={18} />
                    ) : (
                      <Send size={18} />
                    )}
                  </button>
                </div>
              </footer>
            </>
          ) : (
            /* No conversation selected placeholder (input hidden) */
            <div className="flex flex-col items-center justify-center flex-1 px-6 text-center text-gray-400 bg-gray-50">
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

      {imageGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-4xl rounded-2xl bg-white p-3 shadow-2xl">
            <button
              type="button"
              onClick={() => setImageGallery(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50"
              aria-label="Close gallery"
            >
              <X size={18} />
            </button>

            <div className="flex items-center justify-between border-b border-gray-200 px-3 pb-3 pt-2">
              <div className="flex items-center gap-2 text-gray-700">
                <ImageIcon size={18} />
                <span className="text-sm font-semibold">
                  {imageGallery.index + 1} / {imageGallery.items.length}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Eye size={14} />
                <span>{imageGallery.items.length} images</span>
              </div>
            </div>

            <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-gray-100 p-2">
              <button
                type="button"
                onClick={() =>
                  setImageGallery((current) =>
                    current && current.index > 0
                      ? { ...current, index: current.index - 1 }
                      : current,
                  )
                }
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/55 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={imageGallery.index === 0}
                aria-label="Previous image"
              >
                <ArrowLeft size={18} />
              </button>

              <img
                src={imageGallery.items[imageGallery.index]?.url}
                alt={imageGallery.items[imageGallery.index]?.name}
                className="max-h-[70vh] w-full rounded-xl object-contain"
              />

              <button
                type="button"
                onClick={() =>
                  setImageGallery((current) =>
                    current && current.index < current.items.length - 1
                      ? { ...current, index: current.index + 1 }
                      : current,
                  )
                }
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/55 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={imageGallery.index === imageGallery.items.length - 1}
                aria-label="Next image"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 px-2 pb-2">
              <div className="min-w-0 flex-1 text-sm text-gray-700">
                <p className="truncate font-medium">
                  {imageGallery.items[imageGallery.index]?.name}
                </p>
              </div>
              <a
                href={imageGallery.items[imageGallery.index]?.url}
                download={imageGallery.items[imageGallery.index]?.name}
                className="inline-flex items-center gap-2 rounded-lg bg-[#004e27] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#003b20]"
              >
                <Download size={16} />
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Chat;