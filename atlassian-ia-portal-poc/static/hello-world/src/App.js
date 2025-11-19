import React, { useState, useEffect } from 'react';
// import { invoke } from '@forge/bridge'; // No es necesario para un mock simple de UI

// Mensajes de ejemplo para inicializar el chat
const mockMessages = [
  { id: 1, text: 'Hola! Soy un asistente virtual. ¿En qué puedo ayudarte hoy?', sender: 'bot' },
  { id: 2, text: 'Necesito un mock de un chat para reemplazar el "hola mundo".', sender: 'user' },
  { id: 3, text: '¡Por supuesto! Aquí tienes un ejemplo de la interfaz de chat.', sender: 'bot' },
];

// Estilos sencillos para el mock
const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
    //maxWidth: '500px',
    margin: '20px 0',
    backgroundColor: '#fff',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  messagesArea: {
    maxHeight: '200px',
    flexShrink: 0,
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: '#f4f5f7',
  },
  message: (sender) => ({
    padding: '8px 12px',
    borderRadius: '15px',
    marginBottom: '10px',
    maxWidth: '80%',
    wordWrap: 'break-word',
    // Alineación basada en el remitente
    marginLeft: sender === 'user' ? 'auto' : 'unset',
    marginRight: sender === 'user' ? 'unset' : 'auto',
    // Colores basados en el remitente (usando colores similares a Atlassian)
    backgroundColor: sender === 'user' ? '#0052cc' : '#e0e0e0',
    color: sender === 'user' ? 'white' : 'black',
  }),
  inputArea: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ccc',
  },
  inputField: {
    flexGrow: 1,
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px',
    fontSize: '14px',
  },
  sendButton: {
    padding: '8px 15px',
    backgroundColor: '#0052cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

function App() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  
  
  const handleSend = () => {
    if (input.trim() !== '') {
      const newMessage = {
        id: Date.now(), // Usamos la marca de tiempo como ID único
        text: input.trim(),
        sender: 'user', 
      };
      
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput(''); 

      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: 'Gracias por tu mensaje. Este es un mock simple de UI.',
          sender: 'bot',
        };

        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    // Permite enviar el mensaje al presionar 'Enter'
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // El componente de renderizado principal
  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesArea}>
        {messages.map((message) => (
          // El estilo del mensaje se adapta al remitente (user o bot)
          <div key={message.id} style={styles.message(message.sender)}>
            {message.text}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          style={styles.inputField}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
        />
        <button style={styles.sendButton} onClick={handleSend}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default App;