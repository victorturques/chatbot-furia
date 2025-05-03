# Chatbot FURIA - Pantera 🐾

Bem-vindo ao **Chatbot FURIA**, um projeto desenvolvido para fornecer informações sobre o time de eSports **FURIA**. Este chatbot, chamado **Pantera**, é capaz de responder perguntas sobre jogadores, conquistas, próximos campeonatos, mapas favoritos e muito mais!

## 🚀 Tecnologias Utilizadas

- **Frontend**: React com Vite
- **Backend**: Node.js com Express
- **Estilização**: Tailwind CSS
- **Comunicação**: Axios para requisições HTTP
- **Gerenciamento de Estado**: React Hooks (`useState`, `useEffect`, `useRef`)

---

## 📂 Estrutura do Projeto

### **Frontend** (`web-furia`)
- **`src/App.jsx`**: Componente principal do frontend, responsável por renderizar o chatbot e gerenciar o estado das mensagens.
- **`src/assets`**: Contém imagens e outros recursos estáticos, como o logo da FURIA.
- **`src/style.css`**: Arquivo de estilos globais.

### **Backend** (`chatbot-furia/backend`)
- **`server.js`**: Servidor Node.js que processa as mensagens do usuário e retorna respostas do bot.
- **`furiaInfo`**: Objeto que contém informações sobre o time, jogadores, conquistas, mapas e campeonatos.

---

## 🛠️ Funcionalidades

### **Frontend**
1. **Interface de Chat**:
   - O usuário pode enviar mensagens e receber respostas do bot.
   - O chat rola automaticamente para a última mensagem.
2. **Mensagens do Bot**:
   - Mensagem inicial de boas-vindas.
   - Respostas dinâmicas baseadas nas perguntas do usuário.

### **Backend**
1. **Respostas Inteligentes**:
   - O bot responde perguntas sobre:
     - Jogadores
     - Técnico
     - Ranking
     - Conquistas
     - Mapas mais jogados, mais banidos, etc.
     - Próximos e últimos campeonatos
     - Redes sociais
   - Respostas padrão para perguntas não reconhecidas.
2. **Normalização de Texto**:
   - Remove acentos e caracteres especiais para melhorar o reconhecimento das mensagens.

---

## 🖥️ Como Executar o Projeto

### **Pré-requisitos**
- Node.js instalado na máquina
- Gerenciador de pacotes `npm` ou `yarn`

### **Passos para Executar**

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/seu-usuario/chatbot-furia.git
   cd chatbot-furia
   
   2. **Instale as Dependências**:
   - Para o **frontend**:
     ```bash
     cd web-furia
     npm install
     ```
   - Para o **backend**:
     ```bash
     cd ../chatbot-furia/backend
     npm install
     ```

3. **Inicie o Backend**:
   ```bash
   node server.js
   ```
   O servidor estará disponível em `http://localhost:5000`.

4. **Inicie o Frontend**:
   ```bash
   cd ../web-furia
   npm run dev
   ```
   O frontend estará disponível em `http://localhost:5173`.

---

## 📚 Exemplos de Perguntas

- **Jogadores**: "Quais são os jogadores da FURIA?"
- **Ranking**: "Qual é o ranking da FURIA?"
- **Conquistas**: "Quais são as conquistas da FURIA?"
- **Mapas**: "Qual é o mapa mais jogado pela FURIA?"
- **Redes Sociais**: "Quais são as redes sociais da FURIA?"
- **Camisas**: "Onde posso comprar a camisa da FURIA?"

## ✨ Créditos

- Desenvolvido por [Victor Turques]
- Inspirado no time de eSports **FURIA** 🐾