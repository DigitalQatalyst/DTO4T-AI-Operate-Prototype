import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, X } from "lucide-react";
import { useState } from "react";

const AIChatInterface = () => {
    const [query, setQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const examplePrompts = [
        "Explain LLM vs RAG",
        "List available AI Agents",
        "Prompting Best Tips"
    ];

    const actionButtons = [
        "How do I work with AI",
        "Do something for me"
    ];

    const handleExampleClick = (prompt: string) => {
        setQuery(prompt);
        // Handle query submission here
        console.log("Query:", prompt);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            console.log("Submitted query:", query);
            // Handle query submission here
        }
    };

    const handleFocus = () => {
        setIsExpanded(true);
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 w-full px-6"
        >
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl relative">
                {/* Close Button - Only show when expanded */}
                {isExpanded && (
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                )}

                {/* Search Input */}
                <form onSubmit={handleSubmit} className="relative">
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
                        <Sparkles className="h-5 w-5 text-accent flex-shrink-0" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={handleFocus}
                            placeholder="Ask me anything about DWS... What do you need help with?"
                            className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none text-sm"
                        />
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                AI Ready
                            </span>
                            <button
                                type="submit"
                                className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                            >
                                <Search className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </form>

                {/* AI Assistant Examples - Only show when expanded */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="h-4 w-4 text-gray-500" />
                                    <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">
                                        AI Assistant Examples:
                                    </span>
                                </div>

                                {/* Example Prompts */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {examplePrompts.map((prompt, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleExampleClick(prompt)}
                                            className="px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm hover:bg-gray-100 hover:border-gray-300 transition"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-2">
                                    {actionButtons.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleExampleClick(action)}
                                            className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm hover:bg-accent/20 hover:border-accent/50 transition"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Powered by text */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500 text-center">
                                    Powered by AI • I can explain features, guide you, and help you find what you need
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default AIChatInterface;
