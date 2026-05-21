import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { buildDataSummary } from '../utils/calculations';

function ChatAssistant({ data }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "👋 Hello! I'm your Property Tax AI Assistant. Ask me anything about the property tax data — like which city has the highest collection, approval rates, or any other insights!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const dataSummary = useMemo(() => buildDataSummary(data), [data]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);



    try {
      const apiKey = process.env.REACT_APP_GROQ_API_KEY;
      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: '⚠️ Groq API key is not configured. Please add REACT_APP_GROQ_API_KEY to your .env file and restart the app.',
          },
        ]);
        setIsLoading(false);
        return;
      }

      const callAPI = async (retries = 3, delay = 3000) => {
        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: "llama-3.1-8b-instant",
              messages: [
                {
                  role: "system",
                  content: `You are a helpful data analyst assistant for the UPYOG Property Tax platform. 
Answer questions about property tax data based on the following summary:
${JSON.stringify(dataSummary, null, 2)}
Provide a concise, helpful answer. Use numbers and percentages where relevant. Format your response clearly.`
                },
                {
                  role: "user",
                  content: trimmed
                }
              ]
            }),
          }
        );

        if (response.status === 429 && retries > 0) {
          console.warn(`Rate limited (429). Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return callAPI(retries - 1, delay * 2);
        }

        if (!response.ok) {
          const status = response.status;
          let errorMessage = `API request failed (status ${status})`;
          try {
            const errorData = await response.json();
            if (errorData?.error?.message) {
              errorMessage = errorData.error.message;
            }
          } catch (e) {}

          if (status === 429) throw new Error(`Groq API Quota Exceeded: ${errorMessage}`);
          if (status === 401) throw new Error('API key is invalid. Please check your Groq key.');
          throw new Error(errorMessage);
        }

        return response.json();
      };

      const result = await callAPI();
      const aiText =
        result?.choices?.[0]?.message?.content ||
        'I could not generate a response. Please try again.';

      setMessages((prev) => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `❌ Error: ${error.message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, dataSummary]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <section className="chat-container" id="chat-assistant">
      <h2 className="section-title"> AI Tax Assistant</h2>
      <p className="section-subtitle">Powered by Groq — ask questions about your property tax data</p>
      <div className="chat-messages" id="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message chat-message-${msg.role}`}>
            <div className="chat-avatar">
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className={`chat-bubble chat-bubble-${msg.role}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message chat-message-assistant">
            <div className="chat-avatar">🤖</div>
            <div className="chat-bubble chat-bubble-assistant">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-area">
        <input
          id="chat-input"
          type="text"
          className="chat-input"
          placeholder="Ask about property tax data..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
        />
        <button
          id="chat-send-btn"
          className="chat-send-btn"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          {isLoading ? (
            <span className="send-loading">⏳</span>
          ) : (
            <span>➤</span>
          )}
        </button>
      </div>
    </section>
  );
}

export default ChatAssistant;
