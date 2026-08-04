// import { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, Plus } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { Spinner } from "@/components/ui/spinner";
// import {
//   useCreateOrGetChat,
//   useSearchContacts,
// } from "@/hook/userVendorQueries";

// interface Message {
//   _id: string;
//   content: string;
//   sender: string;
//   timestamp: string;
//   isVendor: boolean;
// }

// interface Chat {
//   _id: string;
//   name: string;
//   avatar: string;
//   lastMessage: string;
//   timestamp: string;
//   isVendor: boolean;
//   isOnline: boolean;
//   messages: Message[];
// }

// interface Contact {
//   _id: string;
//   name: string;
//   avatar?: string;
//   isVendor: boolean;
//   email?: string;
//   storeName?: string;
//   profileImage?: string;
// }

// interface ChatListSidebarProps {
//   chats: Chat[];
//   activeChat: string;
//   setActiveChat: (chatId: string) => void;
//   token: string | null;
//   onNewChatCreated: (newChat: Chat) => void;
// }

// export function Chat({
//   chats,
//   activeChat,
//   setActiveChat,
//   token,
//   onNewChatCreated,
// }: ChatListSidebarProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [chatSearchQuery, setChatSearchQuery] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   const { data: searchResults = [], isLoading: isSearchLoading } =
//     useSearchContacts(searchQuery);
//   const createChatMutation = useCreateOrGetChat();

//   const filteredChats = chatSearchQuery
//     ? chats.filter((chat) =>
//         chat.name.toLowerCase().includes(chatSearchQuery.toLowerCase())
//       )
//     : chats;

//   const handleSelectContact = async (contact: Contact) => {
//     try {
//       setIsDropdownOpen(false);
//       const result = await createChatMutation.mutateAsync({
//         receiverId: contact._id,
//         token,
//       });

//       const newChat: Chat = {
//         _id: result.chatId,
//         name: contact.storeName || contact.name,
//         avatar: contact.profileImage || contact.avatar || "/placeholder.svg",
//         lastMessage: "Chat started",
//         timestamp: new Date().toISOString(),
//         isVendor: contact.isVendor,
//         isOnline: true,
//         messages: [],
//       };

//       onNewChatCreated(newChat);
//       setActiveChat(result.chatId);
//       setSearchQuery("");
//     } catch (error) {
//       console.error("Error creating chat:", error);
//       alert("Failed to start chat. Please try again.");
//       setIsDropdownOpen(true);
//     }
//   };

//   const formatContactName = (contact: Contact) => {
//     return contact.isVendor ? contact.storeName || contact.name : contact.name;
//   };

//   return (
//     <motion.div
//       initial={{ x: -300, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       className="flex flex-col bg-white border-r w-80"
//     >
//       {/* Header */}
//       <div className="flex-shrink-0 p-4 border-b">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-xl font-bold">Chats</h1>
//           <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
//             <DropdownMenuTrigger asChild>
//               <motion.button
//                 className="p-2 rounded-full hover:bg-gray-100"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <Plus className="w-5 h-5" />
//               </motion.button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-[320px] p-2 mr-60">
//               <DropdownMenuItem>New Chat</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <div className="relative mb-2">
//                 <Input
//                   type="text"
//                   placeholder="Search users/vendors..."
//                   className="w-full py-2 pl-8 pr-2 text-sm bg-gray-100 rounded-md"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   ref={searchInputRef}
//                 />
//                 <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-2 top-1/2" />
//               </div>

//               {isSearchLoading || createChatMutation.isLoading ? (
//                 <div className="flex items-center justify-center p-2">
//                   <Spinner className="w-4 h-4" />
//                 </div>
//               ) : searchResults.length > 0 ? (
//                 searchResults.map((contact: Contact) => (
//                   <DropdownMenuItem
//                     key={contact._id}
//                     onSelect={() => handleSelectContact(contact)}
//                     disabled={createChatMutation.isLoading}
//                   >
//                     <div className="flex items-center w-full gap-3">
//                       <div className="relative">
//                         <img
//                           src={
//                             contact.profileImage ||
//                             contact.avatar ||
//                             "/placeholder.svg"
//                           }
//                           alt={contact.name}
//                           className="w-8 h-8 rounded-full"
//                         />
//                         <div
//                           className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${
//                             contact.isVendor ? "bg-orange-500" : "bg-blue-500"
//                           }`}
//                         />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium truncate">
//                           {formatContactName(contact)}
//                         </p>
//                         <p className="text-xs text-gray-500 truncate">
//                           {contact.isVendor ? "Vendor" : "User"}
//                         </p>
//                       </div>
//                     </div>
//                   </DropdownMenuItem>
//                 ))
//               ) : searchQuery.trim() !== "" ? (
//                 <DropdownMenuItem disabled>No results found</DropdownMenuItem>
//               ) : (
//                 <DropdownMenuItem disabled>
//                   Start typing to search
//                 </DropdownMenuItem>
//               )}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <div className="relative">
//           <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
//           <input
//             type="text"
//             placeholder="Search chats..."
//             className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
//             value={chatSearchQuery}
//             onChange={(e) => setChatSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Chat List */}
//       <div className="flex-1 overflow-y-auto">
//         <AnimatePresence>
//           {filteredChats.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-500">
//               <p>No chats found</p>
//               <p className="mt-2 text-sm">
//                 {chatSearchQuery ? "No chats match your search" : "Start a new chat by clicking the + button"}
//               </p>
//             </div>
//           ) : (
//             filteredChats.map((chat) => (
//               <motion.button
//                 key={chat._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
//                 onClick={() => setActiveChat(chat._id)}
//                 className={`w-full p-4 flex items-start gap-3 border-b ${
//                   activeChat === chat._id ? "bg-orange-50" : ""
//                 }`}
//               >
//                 <div className="relative">
//                   <img
//                     src={chat.avatar}
//                     alt={chat.name}
//                     className="w-12 h-12 rounded-full"
//                   />
//                   {chat.isOnline && (
//                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0 text-left">
//                   <div className="flex items-start justify-between">
//                     <div className="truncate">
//                       <p className="font-semibold truncate">{chat.name}</p>
//                       <span className="text-xs text-orange-500">
//                         {chat.isVendor ? "Vendor" : "User"}
//                       </span>
//                     </div>
//                     <span className="text-xs text-gray-500 whitespace-nowrap">
//                       {new Date(chat.timestamp).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </span>
//                   </div>
//                   <p className="mt-1 text-sm text-gray-500 truncate">
//                     {chat.lastMessage}
//                   </p>
//                 </div>
//               </motion.button>
//             ))
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// }

import React from 'react'

const Chat: React.FC = () => {
  return (
    <div>Chat</div>
  )
}

export default Chat