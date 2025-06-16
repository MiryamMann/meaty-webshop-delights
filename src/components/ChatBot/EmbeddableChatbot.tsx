
import React, { useState, useRef, useEffect } from 'react';

// Standalone embeddable chatbot component - copy this entire file to use on any website
const EmbeddableChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "שלום! 👋 אני העוזר הידידותי של החנות. אני כאן כדי לעזור לך עם מידע על החנות שלנו, המוצרים והשירותים. איך אני יכול לעזור לך היום?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
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
    
    if (message.includes('אלקטרוניקה') || message.includes('טכנולוגיה') || message.includes('electronics') || message.includes('tech')) {
      return "המחלקה לאלקטרוניקה שלנו פנטסטית! יש לנו את הסמארטפונים, המחשבים הניידים, הטאבלטים והאביזרים החדשים ביותר. כל הפריטים מגיעים עם אחריות. איזה מוצר טכנולוגי מעניין אותך? 📱💻";
    }
    
    if (message.includes('ביגוד') || message.includes('אופנה') || message.includes('clothing') || message.includes('fashion')) {
      return "קולקציית האופנה שלנו תמיד במגמה! יש לנו ביגוד לכל העונות והאירועים. איזה סגנון אתה מחפש? 👕👗";
    }
    
    if (message.includes('תודה') || message.includes('thank')) {
      return "בבקשה! אני תמיד שמח לעזור. יש משהו נוסף שתרצה לדעת על החנות שלנו? 😊";
    }
    
    if (message.includes('שלום') || message.includes('היי') || message.includes('hello') || message.includes('hi')) {
      return "שלום! כל כך נחמד להכיר אותך! 😊 במה אני יכול לעזור לך היום?";
    }
    
    return "זו שאלה מעולה! לפרטים ספציפיים, אני ממליץ להתקשר לחנות שלנו בטלפון 03-1234567. הצוות שלנו ישמח לעזור לך! 🤗";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Properly typed inline styles for complete portability
  const styles = {
    chatButton: {
      position: 'fixed' as const,
      bottom: '24px',
      right: '24px',
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: '#3b82f6',
      border: 'none',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      animation: 'bounce 2s infinite'
    },
    chatWindow: {
      position: 'fixed' as const,
      bottom: '24px',
      right: '24px',
      width: '384px',
      height: '500px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden',
      animation: 'slideIn 0.3s ease-out'
    },
    header: {
      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      padding: '16px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    messages: {
      flex: 1,
      overflowY: 'auto' as const,
      padding: '16px',
      backgroundColor: '#f9fafb'
    },
    input: {
      padding: '16px',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      gap: '8px'
    },
    messageInput: {
      flex: 1,
      border: '1px solid #d1d5db',
      borderRadius: '20px',
      padding: '8px 16px',
      outline: 'none',
      direction: 'rtl' as const
    },
    sendButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#3b82f6',
      border: 'none',
      color: 'white',
      cursor: 'pointer'
    }
  };

  const ChatMessage = ({ message }) => (
    <div style={{
      display: 'flex',
      justifyContent: message.isBot ? 'flex-start' : 'flex-end',
      marginBottom: '16px',
      direction: 'rtl'
    }}>
      <div style={{
        maxWidth: '75%',
        padding: '8px 16px',
        borderRadius: '16px',
        backgroundColor: message.isBot ? 'white' : '#3b82f6',
        color: message.isBot ? '#374151' : 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'right'
      }}>
        {message.text}
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-10px); }
            70% { transform: translateY(-5px); }
          }
          @keyframes slideIn {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
      
      {!isOpen && (
        <button
          style={styles.chatButton}
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                🛍️
              </div>
              <div style={{ direction: 'rtl' }}>
                <div style={{ fontWeight: 'bold' }}>עוזר החנות</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>זמין עכשיו</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          <div style={styles.messages}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div style={{ textAlign: 'right', color: '#6b7280', fontStyle: 'italic', direction: 'rtl' }}>
                העוזר כותב...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.input}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="הקלד את ההודעה שלך..."
              style={styles.messageInput}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              style={styles.sendButton}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EmbeddableChatbot;
