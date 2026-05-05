import { useState } from 'react';

const quickQuestions = [
  'What is the event timing?',
  'What is the ticket price?',
  'How many tickets are left?',
  'Where is the venue?',
  'How do I contact the organizers?'
];

function getBotReply(message, eventContext) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('time') || lowerMessage.includes('date')) {
    return `${eventContext.eventName} starts at ${eventContext.eventTime}.`;
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('ticket')) {
    return `Each ticket costs Rs. ${eventContext.ticketPrice}.`;
  }

  if (lowerMessage.includes('left') || lowerMessage.includes('available') || lowerMessage.includes('availability')) {
    return `There are currently ${eventContext.availability} tickets available.`;
  }

  if (lowerMessage.includes('venue') || lowerMessage.includes('location') || lowerMessage.includes('map')) {
    return `The event venue is ${eventContext.venue}. You can also check the embedded map in the event details section.`;
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('organizer')) {
    return `You can contact the organizers at ${eventContext.contactEmail}.`;
  }

  return 'I can help with event timing, ticket price, venue, availability, or organizer contact details.';
}

function Chatbot({ eventContext }) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Hi! Ask me anything about ${eventContext.eventName}.`
    }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (message) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    const reply = getBotReply(trimmedMessage, eventContext);

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmedMessage },
      { role: 'bot', text: reply }
    ]);
    setInput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div>
      <div className="panel-header">
        <div>
          <h2>Event FAQ Chatbot</h2>
          <p className="micro-text">Quick answers for timing, pricing, venue, and availability.</p>
        </div>
      </div>

      <div className="quick-question-row">
        {quickQuestions.map((question) => (
          <button
            key={question}
            type="button"
            className="question-chip"
            onClick={() => sendMessage(question)}
          >
            {question}
          </button>
        ))}
      </div>

      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`chat-bubble ${message.role}`}>
            {message.text}
          </div>
        ))}
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about tickets, venue, or timing"
        />
        <button type="submit" className="primary-btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
