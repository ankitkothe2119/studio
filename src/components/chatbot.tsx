'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatWithWebsite } from '@/ai/flows/chat-flow';
import { Avatar, AvatarFallback } from './ui/avatar';
import { usePathname } from 'next/navigation';
import { 
    homePageContent, 
    aboutPageContent, 
    projectsPageContent, 
    howToHelpPageContent, 
    newsPageContent, 
    contactPageContent 
} from '@/lib/content';

const pageContentMap: { [key: string]: any } = {
    '/': homePageContent,
    '/about': aboutPageContent,
    '/projects': projectsPageContent,
    '/how-to-help': howToHelpPageContent,
    '/news': newsPageContent,
    '/contact': contactPageContent
};


type Message = {
    role: 'user' | 'bot';
    text: string;
};

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [pageContent, setPageContent] = useState<any>(null);

    useEffect(() => {
        setPageContent(pageContentMap[pathname] || null);
    }, [pathname]);
    

    useEffect(() => {
        if (isOpen) {
            setMessages([
                {
                    role: 'bot',
                    text: "Hello! I'm the Sarthi Shiksha assistant. How can I help you today?"
                }
            ]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);


    const handleSend = async () => {
        if (input.trim() === '' || isLoading || !pageContent) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatWithWebsite({
                query: input,
                context: JSON.stringify(pageContent)
            });
            
            const botMessage: Message = { role: 'bot', text: result.response };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            const errorMessage: Message = {
                role: 'bot',
                text: "Sorry, I'm having trouble connecting right now. Please try again later."
            };
            setMessages(prev => [...prev, errorMessage]);
            console.error("Chatbot error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 transition-transform duration-300 hover:scale-110"
                size="icon"
            >
                {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
            </Button>

            <div
                className={cn(
                    "fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[60vh] bg-card border rounded-lg shadow-xl flex flex-col transition-all duration-300 origin-bottom-right",
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                )}
            >
                <div className="p-4 border-b flex items-center gap-3 bg-primary text-primary-foreground rounded-t-lg">
                   <Bot className="h-6 w-6" />
                   <h3 className="font-bold text-lg">Sarthi Shiksha Assistant</h3>
                </div>
                
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                               {message.role === 'bot' && (
                                    <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                                       <AvatarFallback><Bot size={20}/></AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={cn(
                                        "p-3 rounded-lg max-w-[80%]",
                                        message.role === 'bot'
                                            ? 'bg-secondary text-secondary-foreground'
                                            : 'bg-primary text-primary-foreground'
                                    )}
                                >
                                    <p className="text-sm">{message.text}</p>
                                </div>
                                {message.role === 'user' && (
                                     <Avatar className="w-8 h-8 bg-muted text-muted-foreground">
                                       <AvatarFallback><User size={20}/></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                         {isLoading && (
                             <div className="flex items-start gap-3">
                                <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                                    <AvatarFallback><Bot size={20}/></AvatarFallback>
                                </Avatar>
                                <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                             </div>
                         )}
                    </div>
                </ScrollArea>
                
                <div className="p-4 border-t">
                    <div className="relative">
                         <Input
                            type="text"
                            placeholder="Ask a question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            disabled={isLoading}
                            className="pr-12"
                        />
                         <Button 
                            size="icon" 
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                            onClick={handleSend}
                            disabled={isLoading}
                         >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                         </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
