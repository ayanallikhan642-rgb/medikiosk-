import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, User } from 'lucide-react';
import { cn } from '../lib/utils';

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export default function CaseTaking() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: "Hello, I'm your AI case-taking assistant. Let's start with your main concern — what symptoms have been bothering you recently?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Reference to hold speech recognition instance
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        setInput(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setInput(''); // Clear input when starting a new voice command
      recognitionRef.current.start();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [
          ...prev, 
          { id: (Date.now() + 1).toString(), role: 'model', content: data.reply }
        ]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev, 
        { id: (Date.now() + 1).toString(), role: 'model', content: "I'm sorry, I'm having trouble connecting right now. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] lg:h-screen bg-gray-50 max-w-4xl mx-auto w-full">
      <div className="bg-white px-4 py-4 border-b border-gray-200 lg:hidden hidden">
        {/* Title is in layout for mobile, but let's keep a consistent header for desktop */}
      </div>
      
      <div className="hidden lg:flex items-center px-8 py-6 border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-serif font-bold text-gray-900">AI Case Taking</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={cn(
              "flex gap-3 max-w-[85%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
              msg.role === 'user' ? "bg-yellow-500 text-[#004d40]" : "bg-[#004d40] text-white"
            )}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl shadow-sm border",
              msg.role === 'user' 
                ? "bg-[#004d40] text-white border-transparent rounded-tr-sm" 
                : "bg-white text-gray-800 border-gray-100 rounded-tl-sm"
            )}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 max-w-[85%] mr-auto">
            <div className="w-8 h-8 rounded-full bg-[#004d40] text-white flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-5 h-5" />
            </div>
            <div className="p-4 rounded-2xl shadow-sm border bg-white border-gray-100 rounded-tl-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center shadow-sm border border-gray-200 rounded-full bg-gray-50 overflow-hidden">
            <button 
              onClick={toggleListening}
              className={cn("pl-4 pr-2 transition-colors", isListening ? "text-red-500 animate-pulse" : "text-gray-400 hover:text-[#004d40]")}
            >
              <Mic className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your answer..."
              className="flex-1 py-4 px-2 bg-transparent outline-none text-sm text-gray-700"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="m-2 p-2 rounded-full bg-[#004d40] text-white hover:bg-[#065f50] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Info Card - visible on initial load or large screens */}
      {messages.length === 1 && (
        <div className="p-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3">Why AI Case Taking?</h3>
            <p className="text-sm font-medium text-gray-700 mb-2">What it covers</p>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
              <li>Chief complaint & associated symptoms</li>
              <li>Dashavidha Pariksha (10-fold Ayurvedic examination)</li>
              <li>Nidana — probable causes & lifestyle factors</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
