import React, { useState } from "react";
import { FaPaperPlane, FaSearch, FaCircle } from "react-icons/fa";

const Messages = () => {
    const [selectedChat, setSelectedChat] = useState(1);
    const [messageInput, setMessageInput] = useState("");

    const chats = [
        { id: 1, name: "Sarah Connor", lastMsg: "Thank you for the kit!", time: "10:30 AM", unread: 2, status: "online" },
        { id: 2, name: "Admin Support", lastMsg: "Please verify your ID.", time: "Yesterday", unread: 0, status: "offline" },
        { id: 3, name: "Ellen Ripley", lastMsg: "Is the distribution today?", time: "Yesterday", unread: 0, status: "online" },
    ];

    const messages = [
        { id: 1, sender: "me", text: "Hi Sarah, I'm on my way.", time: "10:00 AM" },
        { id: 2, sender: "Sarah Connor", text: "Great! I'll be waiting.", time: "10:05 AM" },
        { id: 3, sender: "Sarah Connor", text: "Thank you for the kit!", time: "10:30 AM" },
    ];

    const handleSend = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        // Mock send
        console.log("Sending:", messageInput);
        setMessageInput("");
    };

    return (
        <div className="h-[calc(100vh-8rem)] rounded-[3rem] bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-pink-300/70 dark:border-slate-500/50 shadow-xl overflow-hidden flex animate-fadeIn">
            {/* Sidebar List */}
            <div className="w-1/3 border-r border-pink-200/50 dark:border-slate-500/50 flex flex-col">
                <div className="p-6 border-b border-pink-200/50 dark:border-slate-500/50">
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-4">Messages</h2>
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-white dark:border-slate-600 rounded-[3rem] font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat.id)}
                            className={`p-4 rounded-[3rem] cursor-pointer transition-all hover:bg-white/50 dark:hover:bg-slate-700/50 
                ${selectedChat === chat.id ? "bg-white dark:bg-slate-700 shadow-md transform scale-[1.02]" : ""}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-slate-800 dark:text-white">{chat.name}</h3>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{chat.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium truncate w-32">{chat.lastMsg}</p>
                                {chat.unread > 0 && (
                                    <span className="w-5 h-5 bg-pink-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-lg shadow-pink-500/30">
                                        {chat.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white/30 dark:bg-slate-900/30">
                {/* Header */}
                <div className="h-20 border-b border-pink-200/50 dark:border-slate-500/50 flex items-center px-8 justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                            S
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">Sarah Connor</h3>
                            <div className="flex items-center gap-1.5">
                                <FaCircle className="text-[8px] text-emerald-500" />
                                <span className="text-xs text-emerald-500 font-black uppercase tracking-widest">Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar flex flex-col-reverse">
                    {[...messages].reverse().map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-4 rounded-[3rem] shadow-sm text-sm font-medium leading-relaxed 
                ${msg.sender === 'me'
                                    ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-tr-sm'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-sm'}`}>
                                {msg.text}
                                <div className={`text-[9px] font-bold mt-2 uppercase tracking-widest opacity-70 ${msg.sender === 'me' ? 'text-pink-100' : 'text-slate-400'}`}>
                                    {msg.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-6 border-t border-pink-200/50 dark:border-slate-500/50">
                    <form onSubmit={handleSend} className="relative">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full pl-6 pr-14 py-4 bg-white dark:bg-slate-800 border-none rounded-[3rem] shadow-lg shadow-slate-200/50 dark:shadow-none font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-pink-500 text-white rounded-[3rem] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Messages;
