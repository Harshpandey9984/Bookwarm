import React, { useState, useEffect } from 'react';
import './AIAssistant.css';

const AIAssistant = ({ isActive = false, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'Welcome to BookWarm Neural Interface. How may I assist you today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const responses = [
    "I'm analyzing your reading preferences through quantum algorithms...",
    "Based on blockchain data, I recommend exploring our Fiction collection.",
    "Your neural pattern suggests an affinity for Marvel universe literature.",
    "Initiating personalized book curation protocol...",
    "Scanning literary database for optimal matches...",
    "Your taste profile indicates high compatibility with our Mythology section.",
    "Processing request through advanced AI recommendation engine...",
    "Cross-referencing your preferences with cosmic book algorithms..."
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { type: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const aiMessage = { type: 'ai', text: randomResponse };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const quickActions = [
    { label: 'Recommend Books', icon: '📚' },
    { label: 'Check Orders', icon: '📦' },
    { label: 'Account Status', icon: '👤' },
    { label: 'Help & Support', icon: '🔧' }
  ];

  return (
    <>
      {/* AI Assistant Button */}
      <div className={`ai-assistant-toggle ${isActive ? 'active' : ''}`} onClick={onToggle}>
        <div className="ai-icon">
          <div className="neural-core">
            <div className="pulse-ring"></div>
            <div className="pulse-ring pulse-ring-2"></div>
            <div className="ai-symbol">🤖</div>
          </div>
        </div>
        <div className="ai-status">
          <div className="status-text">AI Assistant</div>
          <div className="status-indicator">
            <span className="status-dot"></span>
            Online
          </div>
        </div>
      </div>

      {/* AI Assistant Panel */}
      {isActive && (
        <div className={`ai-assistant-panel ${isExpanded ? 'expanded' : ''}`}>
          <div className="panel-header">
            <div className="ai-info">
              <div className="ai-avatar">
                <div className="avatar-core">
                  <div className="neural-network">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={`neural-node node-${i + 1}`}></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="ai-details">
                <h3>BookWarm AI</h3>
                <p>Neural Reading Assistant v2.1</p>
              </div>
            </div>
            <div className="panel-controls">
              <button 
                className="expand-btn" 
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? '⬇️' : '⬆️'}
              </button>
              <button className="close-btn" onClick={onToggle}>✕</button>
            </div>
          </div>

          {isExpanded && (
            <div className="panel-content">
              {/* Quick Actions */}
              <div className="quick-actions">
                <h4>Quick Actions</h4>
                <div className="action-grid">
                  {quickActions.map((action, index) => (
                    <button key={index} className="action-btn">
                      <span className="action-icon">{action.icon}</span>
                      <span className="action-label">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Interface */}
              <div className="chat-interface">
                <div className="chat-messages">
                  {messages.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                      <div className="message-content">
                        {message.text}
                      </div>
                      <div className="message-timestamp">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="message ai typing">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="chat-input-container">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask AI about books, orders, or anything..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className="send-btn" onClick={handleSendMessage}>
                    <span className="send-icon">➤</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AIAssistant;
