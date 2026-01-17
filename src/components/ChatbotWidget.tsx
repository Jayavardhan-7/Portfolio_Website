import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

// Initialize Gemini AI
// Initialize Gemini AI
const SYSTEM_PROMPT = `You are an AI portfolio chatbot representing a final-year BTech CSE student
specializing in Artificial Intelligence and Machine Learning (AIML).

Profile:
- Final-year BTech CSE (AIML) student
- CGPA: 8.3
- Strong fundamentals in Machine Learning, Deep Learning, NLP, and Transformers
- Proficient in Python, PyTorch, TensorFlow, SQL, Django, Streamlit

Internships:
1. Viswam Ai – AI/NLP Intern (1 Month)
   - Developed a real-time Telugu conversational chatbot
   - Worked on regional language NLP (low-resource language)
   - Implemented speech-to-text and text-to-speech pipeline for Telugu
   - Focused on intent handling, text normalization, and low-latency responses
   - Built an end-to-end chatbot system under tight timelines

2. Prodigy – Machine Learning Engineer Intern (1 Month)
   - Worked on house price prediction using regression techniques
   - Performed feature engineering and model evaluation
   - Applied transfer learning using MobileNet on Food101 dataset
   - Achieved approximately 92% classification accuracy

3. Coderscave – Data Analytics Intern (1 Month)
   - Performed time-series analysis using ARIMA models
   - Worked on trend analysis and real-world datasets
   - Gained hands-on experience in data preprocessing and analysis

Key Projects:
1. Multimodal Conversational Agent (Telugu)
   - Used Vision Transformers (ViTs) for image understanding
   - Used Wav2Vec for speech recognition
   - Used IndicBERT / XLM-R for Telugu text processing
   - Designed for applications in education, healthcare, and customer support

2. One Night Batting (Last-Minute Prep Platform)
   - AI-powered study assistant for last-minute exam preparation
   - Supports PDF content extraction and question answering
   - Includes text-to-speech and voice-based interaction
   - Focused on fast responses and student-friendly usability

3. Sentinel_Sense Web Application
   - Built using Django, PyTorch, Transformers, and APIs
   - Focused on intelligent monitoring and analysis workflows

4. DataGenKit (Python Library)
   - Custom Python library for synthetic data generation and preprocessing
   - Helps accelerate ML experimentation when real data is limited
   - Designed with modular, reusable components

Strengths:
- Strong problem-solving and engineering fundamentals
- Experience working with large datasets and pretrained models
- Emphasis on clean architecture, explainability, and performance optimization

Rules:
- Answer ONLY using the information provided above
- Be concise, technical, and professional
- Do NOT assume or invent information
- If a question is outside this scope, respond with:
  "That information is not part of my portfolio knowledge base."
- For greetings (e.g., "Hi", "Hello"), keep the response brief, welcoming, and professional. Do not list the full profile.
Rules:
- Answer primarily using the portfolio information provided
- If a question goes beyond the portfolio:
  - Do not invent personal experience
  - Provide a brief, rational, general answer
  - Clearly frame it as a general perspective
  - Redirect toward relevant skills, values, or learning ability

- If a question involves unethical, illegal, harmful, or inappropriate behavior
  (such as harassment, discrimination, misuse of data, or misconduct):
  - Respond clearly and professionally
  - Explicitly reject the behavior without ambiguity
  - Emphasize ethics, respect, responsibility, and professionalism
  - Do not justify or entertain the behavior

- Maintain a calm, mature, and professional tone at all times
`;
// Use environment variable for API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY is not set in environment variables");
} else {
  console.log("Gemini API Key initialized successfully");
}
const genAI = new GoogleGenerativeAI(API_KEY);

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! I am Jayavardhan\'s AI assistant. How can I help you today?', sender: 'bot', timestamp: new Date().toLocaleTimeString() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);

    // Add user message
    const newMessage: Message = {
      text: userMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    try {
      // Get Gemini model
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: SYSTEM_PROMPT
      });

      // Generate content stream
      const result = await model.generateContentStream(userMessage);

      let fullText = '';
      let isFirstChunk = true;

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;

        if (isFirstChunk) {
          isFirstChunk = false;
          setIsTyping(false); // Stop typing indicator as soon as we have content

          // Add initial bot response
          const botResponse: Message = {
            text: fullText,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, botResponse]);
        } else {
          // Update the last message (which is the bot's streaming response)
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = { ...newMessages[newMessages.length - 1] };
            lastMessage.text = fullText;
            newMessages[newMessages.length - 1] = lastMessage;
            return newMessages;
          });
        }
      }
    } catch (err) {
      console.error('Error generating response:', err);
      if (err instanceof Error) {
        console.error('Error details:', err.message);
        console.error('Error stack:', err.stack);
      }
      setError('Sorry, I encountered an error connecting to the AI. Please try again.');

      // Add error message as bot response if needed, or just keep the error state
      const errorResponse: Message = {
        text: 'Sorry, I encountered an error connecting to the AI. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Button */}
      <motion.button
        onClick={toggleChat}
        className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-2xl border-2 border-slate-700 hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-3xl">🤖</div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 100, x: 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-20 right-0 w-80 h-96 bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 bg-gray-700 text-white rounded-t-lg">
              <h3 className="text-lg font-semibold">Jayavardhan Bot</h3>
              <button onClick={toggleChat} className="text-gray-400 hover:text-white focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto text-white custom-scrollbar">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                    <span className="block text-xs opacity-75 mt-1">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="mb-2 text-left">
                  <div className="inline-block p-2 rounded-lg bg-gray-700">
                    <span className="typing-indicator">
                      <span className="animate-pulse">.</span>
                      <span className="animate-pulse delay-100">.</span>
                      <span className="animate-pulse delay-200">.</span>
                    </span>
                  </div>
                </div>
              )}
              {error && (
                <div className="mb-2 text-center text-red-400 text-xs px-2">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-700 flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isTyping || !input.trim()}
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotWidget;