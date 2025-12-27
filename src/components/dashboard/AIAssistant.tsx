import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Cura, your AI health assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your query, I recommend maintaining a heart-healthy diet rich in omega-3 fatty acids, fiber, and antioxidants.",
        "Regular exercise of 30 minutes daily can significantly reduce heart disease risk. Start with walking and gradually increase intensity.",
        "Monitoring your blood pressure and cholesterol levels regularly is crucial for heart health. Consider scheduling a checkup.",
        "Stress management through meditation, deep breathing, or yoga can help lower blood pressure and improve heart health.",
        "Adequate sleep of 7-8 hours is essential for cardiovascular health. Poor sleep can increase heart disease risk.",
      ];
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responses[Math.floor(Math.random() * responses.length)] 
      }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <Button
        variant="hero"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="hidden md:flex"
      >
        <Bot className="h-4 w-4 mr-1" />
        Ask Cura
      </Button>

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] glass-card flex flex-col z-50 animate-scale-in">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Cura</p>
                <p className="text-xs text-muted-foreground">AI Health Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-br-sm' 
                    : 'bg-muted text-foreground rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about heart health..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
