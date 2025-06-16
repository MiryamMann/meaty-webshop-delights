import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "שלום! 👋 אני העוזר הידידותי של החנות. אני כאן כדי לעזור לך עם מידע על החנות שלנו, המוצרים והשירותים. איך אני יכול לעזור לך היום?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Store information responses in Hebrew
    if (message.includes('שעות') || message.includes('פתוח') || message.includes('זמן') || message.includes('hours') || message.includes('open') || message.includes('time')) {
      return "אנחנו פתוחים מיום ראשון עד חמישי מ-9:00 עד 20:00, ובימי שישי מ-9:00 עד 14:00. אנחנו כאן כדי לשרת אותך! 🕒";
    }
    
    if (message.includes('מיקום') || message.includes('כתובת') || message.includes('איפה') || message.includes('location') || message.includes('address') || message.includes('where')) {
      return "אתה יכול למצוא אותנו ברחוב הראשי 123, במרכז העיר. אנחנו ממש ליד בית הקפה עם הסוכך הכחול! 📍 תרצה הוראות הגעה?";
    }
    
    if (message.includes('החזרה') || message.includes('החלפה') || message.includes('זיכוי') || message.includes('return') || message.includes('exchange') || message.includes('refund')) {
      return "אנחנו מציעים מדיניות החזרה של 30 יום עבור פריטים שלא בשימוש עם קבלה. החלפות תמיד ברוכות הבאות! פשוט תביא את הפריט והקבלה לחנות. 🔄";
    }
    
    if (message.includes('משלוח') || message.includes('delivery') || message.includes('shipping')) {
      return "אנחנו מציעים משלוח חינם על הזמנות מעל ₪200! משלוח רגיל לוקח 3-5 ימי עסקים, ויש לנו גם אפשרויות משלוח מהיר. 📦✨";
    }
    
    if (message.includes('מוצר') || message.includes('פריט') || message.includes('קנייה') || message.includes('מחיר') || message.includes('product') || message.includes('item') || message.includes('buy') || message.includes('price')) {
      return "אני אשמח לעזור לך למצוא את המוצר המושלם! 🛍️ תוכל לספר לי באיזה קטגוריה אתה מעוניין? יש לנו אלקטרוניקה, ביגוד, מוצרי בית ועוד הרבה!";
    }
    
    if (message.includes('אלקטרוניקה') || message.includes('טכנולוגיה') || message.includes('electronics') || message.includes('tech') || message.includes('computer') || message.includes('phone')) {
      return "המחלקה לאלקטרוניקה שלנו פנטסטית! יש לנו את הסמארטפונים, המחשבים הניידים, הטאבלטים והאביזרים החדשים ביותר. כל הפריטים מגיעים עם אחריות. איזה מוצר טכנולוגי מעניין אותך? 📱💻";
    }
    
    if (message.includes('ביגוד') || message.includes('אופנה') || message.includes('clothing') || message.includes('fashion') || message.includes('clothes') || message.includes('wear')) {
      return "קולקציית האופנה שלנו תמיד במגמה! יש לנו ביגוד לכל העונות והאירועים - לבוש יומיומי, פורמלי, ספורט ואביזרים. איזה סגנון אתה מחפש? 👕👗";
    }
    
    if (message.includes('בית') || message.includes('רהיטים') || message.includes('עיצוב') || message.includes('home') || message.includes('furniture') || message.includes('decor')) {
      return "הפכו את הבית שלכם לבית עם המבחר היפה שלנו! יש לנו רהיטים, עיצוב, חיוני מטבח ופתרונות ארגון. איזה חדר אתם רוצים לעדכן? 🏠✨";
    }
    
    if (message.includes('מבצע') || message.includes('הנחה') || message.includes('deal') || message.includes('sale') || message.includes('discount')) {
      return "יש לך מזל! יש לנו מבצעים מדהימים כרגע. בדוק את המבצעים השבועיים שלנו ואל תשכח להירשם לניוזלטר להנחות בלעדיות! 💸🎉";
    }
    
    if (message.includes('צור קשר') || message.includes('טלפון') || message.includes('אימייל') || message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return "אתה יכול ליצור קשר איתנו בטלפון 03-1234567 או לכתוב לנו במייל help@ourstore.com. אנחנו בדרך כלל עונים למיילים תוך 24 שעות! 📞📧";
    }
    
    if (message.includes('תודה') || message.includes('thank') || message.includes('thanks')) {
      return "בבקשה! אני תמיד שמח לעזור. יש משהו נוסף שתרצה לדעת על החנות שלנו? 😊";
    }
    
    if (message.includes('שלום') || message.includes('היי') || message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "שלום! כל כך נחמד להכיר אותך! 😊 אני כאן כדי לעזור לך עם כל שאלה על החנות, המוצרים או השירותים שלנו. במה אני יכול לעזור לך היום?";
    }
    
    if (message.includes('להתראות') || message.includes('ביי') || message.includes('bye') || message.includes('goodbye')) {
      return "להתראות! תודה על השיחה היום. תרגיש חופשי לחזור בכל זמן אם יש לך עוד שאלות. שיהיה לך יום נפלא! 👋✨";
    }
    
    // Default response
    return "זו שאלה מעולה! למרות שאני מנסה לעזור ברוב הדברים, אולי אין לי את כל הפרטים. לשאלות ספציפיות על מוצרים או שאלות מורכבות, אני ממליץ להתקשר לחנות שלנו בטלפון 03-1234567 או לבקר אותנו אישית. הצוות שלנו ישמח לעזור לך! 🤗";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
          >
            <MessageCircle className="h-8 w-8 text-white" />
          </Button>
        )}
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-scale-in" dir="rtl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🛍️</span>
                </div>
                <div>
                  <h3 className="font-semibold">עוזר החנות</h3>
                  <p className="text-sm opacity-90">זמין עכשיו</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🤖</span>
                </div>
                <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2 space-x-reverse">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="הקלד את ההודעה שלך..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-right"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="rounded-full w-10 h-10 p-0 bg-blue-500 hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
