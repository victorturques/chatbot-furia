import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import panteraLogo from './assets/img/Furia_Esports_logo.png';

const App = () => {
  // Estado para armazenar a mensagem digitada pelo usuário
  const [message, setMessage] = useState('');
  // Estado para armazenar o histórico de mensagens do chat
  const [chat, setChat] = useState([]);
  // Estado para indicar se o bot está digitando
  const [isTyping, setIsTyping] = useState(false);
  // Referência para o final do chat, usada para rolar automaticamente
  const chatEndRef = useRef(null);

  // useEffect para exibir a mensagem inicial do bot com um atraso
  useEffect(() => {
    setTimeout(() => {
      const initialMessages = [
        {
          sender: "bot",
          text: "👋 Olá, torcedor Furioso! Eu sou o Pantera, o bot oficial da FURIA Esports! 🐾\n\nEstou aqui para te ajudar com tudo o que você precisa saber sobre o nosso time de CS2, conquistas, próximos campeonatos, curiosidades e muito mais! 🎮\n\nPergunte sobre nossos jogadores, mapas favoritos, ou até mesmo nossas redes sociais. Vamos começar? 🚀"
        }
      ];
      setChat(initialMessages); // Define a mensagem inicial no estado do chat
    }, 1000); // Delay de 1 segundo (1000ms)
  }, []);

  // useEffect para rolar automaticamente para o final do chat quando uma nova mensagem é adicionada
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // Função para enviar a mensagem do usuário e obter a resposta do bot
  const sendMessage = async () => {
    if (!message) return; // Não envia se a mensagem estiver vazia

    // Adiciona a mensagem do usuário ao chat
    const userMessage = { sender: 'user', text: message };
    setChat([...chat, userMessage]);
    setIsTyping(true); // Indica que o bot está "digitando"

    try {
      // Envia a mensagem para o backend e obtém a resposta
      const response = await axios.post('http://localhost:5000/api/chat', { message });
      const botMessage = { sender: 'bot', text: response.data.reply };
      // Adiciona a resposta do bot ao chat
      setChat((prevChat) => [...prevChat, botMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setIsTyping(false); // Para de indicar que o bot está "digitando"
    }

    setMessage(''); // Limpa o campo de entrada de texto
  };

  // Função para enviar a mensagem ao pressionar a tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Função para renderizar mensagens com links clicáveis
  const renderMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g; // Regex para detectar URLs
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      {/* Cabeçalho com o logo e o título */}
      <header className="flex items-center justify-center p-4 bg-gray-900 shadow-md">
        <div className="flex items-center">
          <img src={panteraLogo} alt="FURIA Logo" className="w-10 h-10 mr-3" />
          <h1 className="text-xl font-bold text-white">FURIA</h1>
        </div>
      </header>

      {/* Área do chat */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg shadow-lg">
        {chat.map((msg, index) => (
          <div key={index} className={`my-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            {/* Exibe o nome e a imagem do bot */}
            {msg.sender === 'bot' && (
              <div className="flex items-center text-3xlsm font-bold text-black mb-1">
                <img src={panteraLogo} alt="Pantera" className="w-7 h-7 mr-2" />
                Pantera
              </div>
            )}
            {/* Exibe o nome do usuário */}
            {msg.sender === 'user' && (
              <div className="text-3xlsm font-bold text-black mb-1 mr-2">Usuario</div>
            )}
            {/* Exibe a mensagem com animação */}
            <div
              className={`inline-block p-3 rounded-lg shadow-md transition-transform duration-300 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white animate-slide-in-right'
                  : 'bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white animate-slide-in-left'
              }`}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {renderMessage(msg.text)}
            </div>
            {/* Exibe o horário da mensagem */}
            <div className="text-xs text-black mt-1">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        {/* Indica que o bot está digitando */}
        {isTyping && (
          <div className="flex items-center text-black italic mt-2">
            <span>Pantera está digitando</span>
            <div className="typing-indicator ml-2">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        {/* Referência para rolar automaticamente para o final */}
        <div ref={chatEndRef} />
      </div>

      {/* Rodapé com o campo de entrada e botão de envio */}
      <footer className="flex items-center p-4 bg-gradient-to-r from-black via-gray-900 to-black border-t border-gray-800 shadow-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white placeholder-gray-400"
          placeholder="Digite sua mensagem..."
        />
        <button
          onClick={sendMessage}
          className="ml-4 p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-md hover:scale-105 transition-transform flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default App;