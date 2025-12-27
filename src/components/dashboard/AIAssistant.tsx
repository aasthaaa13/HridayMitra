import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const healthResponses: Record<string, string[]> = {
  heart: [
    "To maintain a healthy heart, aim for at least 150 minutes of moderate aerobic activity weekly. This can include brisk walking, swimming, or cycling.",
    "Key heart health indicators include blood pressure (ideally below 120/80), cholesterol levels (LDL under 100 mg/dL), and resting heart rate (60-100 BPM for adults).",
    "Heart-healthy foods include fatty fish rich in omega-3s, leafy greens, berries, nuts, and whole grains. Limit saturated fats and sodium."
  ],
  blood: [
    "Normal blood pressure is typically below 120/80 mm Hg. Elevated readings consistently above this may require lifestyle changes or medical attention.",
    "To lower blood pressure naturally: reduce sodium intake, exercise regularly, maintain a healthy weight, limit alcohol, and manage stress.",
    "Blood sugar levels are important for heart health. Fasting glucose should be below 100 mg/dL. Higher levels may indicate prediabetes or diabetes risk."
  ],
  exercise: [
    "For cardiovascular health, the American Heart Association recommends 150 minutes of moderate exercise or 75 minutes of vigorous exercise weekly.",
    "Good exercises for heart health include walking, jogging, swimming, cycling, and dancing. Start slowly and gradually increase intensity.",
    "Warning signs to stop exercise: chest pain, severe shortness of breath, dizziness, or irregular heartbeat. Always consult your doctor if you experience these."
  ],
  diet: [
    "The Mediterranean diet is excellent for heart health: emphasize olive oil, fish, vegetables, fruits, and whole grains while limiting red meat and processed foods.",
    "Limit sodium to 2,300 mg daily (about 1 teaspoon of salt). Most sodium comes from processed and restaurant foods, not the salt shaker.",
    "Omega-3 fatty acids from fatty fish (salmon, mackerel, sardines) can help reduce inflammation and lower triglycerides."
  ],
  stress: [
    "Chronic stress can raise blood pressure and contribute to heart disease. Practice relaxation techniques like deep breathing, meditation, or yoga.",
    "The 4-7-8 breathing technique can help reduce stress: inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.",
    "Regular physical activity is one of the best stress relievers. Even a 10-minute walk can help reduce anxiety and improve mood."
  ],
  sleep: [
    "Poor sleep is linked to higher risk of heart disease. Aim for 7-9 hours of quality sleep per night.",
    "Sleep apnea is a serious condition that can affect heart health. Symptoms include loud snoring, gasping during sleep, and daytime fatigue.",
    "Tips for better sleep: maintain a consistent schedule, avoid screens before bed, keep your room cool and dark."
  ],
  symptoms: [
    "Heart attack warning signs: chest discomfort, pain in arm/back/jaw, shortness of breath, cold sweats, nausea. Call emergency services immediately if you experience these.",
    "Palpitations (feeling your heart beating) are often harmless but should be evaluated if frequent, accompanied by dizziness, or lasting more than a few seconds.",
    "Sudden severe headache with chest pain could indicate a cardiovascular emergency. Seek immediate medical attention."
  ],
  medication: [
    "Never stop taking prescribed heart medications without consulting your doctor. Some medications require gradual reduction.",
    "Common heart medications include statins (for cholesterol), ACE inhibitors (for blood pressure), and antiplatelet drugs (blood thinners).",
    "Take medications at the same time daily for best results. Use a pill organizer or set reminders on your phone."
  ],
  general: [
    "I'm Cura, your AI health assistant. I can help with questions about heart health, blood pressure, exercise, diet, and general wellness.",
    "Regular health assessments are important. Use our Health Assessment feature to check your heart disease risk factors.",
    "Remember, I provide general health information. Always consult with a healthcare professional for personalized medical advice."
  ]
};

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Determine topic
  let topic = 'general';
  if (lowerMessage.includes('heart') || lowerMessage.includes('cardiac') || lowerMessage.includes('cardiovascular')) {
    topic = 'heart';
  } else if (lowerMessage.includes('blood') || lowerMessage.includes('pressure') || lowerMessage.includes('bp') || lowerMessage.includes('sugar') || lowerMessage.includes('glucose')) {
    topic = 'blood';
  } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('walk') || lowerMessage.includes('run') || lowerMessage.includes('gym')) {
    topic = 'exercise';
  } else if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition') || lowerMessage.includes('meal')) {
    topic = 'diet';
  } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('relax') || lowerMessage.includes('meditation')) {
    topic = 'stress';
  } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('rest') || lowerMessage.includes('tired')) {
    topic = 'sleep';
  } else if (lowerMessage.includes('symptom') || lowerMessage.includes('pain') || lowerMessage.includes('chest') || lowerMessage.includes('dizzy') || lowerMessage.includes('breath')) {
    topic = 'symptoms';
  } else if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('drug') || lowerMessage.includes('pill')) {
    topic = 'medication';
  }

  const responses = healthResponses[topic];
  return responses[Math.floor(Math.random() * responses.length)];
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Cura, your AI health assistant. Ask me anything about heart health, blood pressure, exercise, diet, or general wellness!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 800 + Math.random() * 700);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const quickQuestions = [
    "How can I lower blood pressure?",
    "Best foods for heart health?",
    "How much exercise do I need?",
    "Tips for better sleep?"
  ];

  return (
    <>
      <Button
        variant="hero"
        size="sm"
        onClick={handleOpen}
        className="hidden md:flex gap-2"
      >
        <Sparkles className="h-4 w-4" />
        Ask Cura
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
          
          {/* Chat Window */}
          <div className="fixed bottom-4 right-4 w-[400px] h-[550px] glass-card flex flex-col z-50 animate-scale-in shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Cura</p>
                  <p className="text-xs text-muted-foreground">AI Health Assistant</p>
                </div>
              </div>
              <button 
                onClick={handleClose} 
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-br-md' 
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(q)}
                      className="text-xs px-3 py-1.5 bg-muted hover:bg-accent rounded-full text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about heart health..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-2">
                For medical emergencies, please call your local emergency services.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
