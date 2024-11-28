const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');
const toggler = document.querySelector(".chatbot-toggler"); // Add this line to define the toggler

// Initialize chat window (close icon hidden by default)
document.querySelector(".icon-close").style.display = "none";

// Toggle chatbot visibility
toggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatcontainer");

    const iconChat = document.querySelector(".icon-chat");
    const iconClose = document.querySelector(".icon-close");

    if (document.body.classList.contains("show-chatcontainer")) {
        toggler.setAttribute("aria-label", "Close Chatbot");
        iconChat.style.display = "none";  // Hide chat icon
        iconClose.style.display = "block"; // Show close icon
    } else {
        toggler.setAttribute("aria-label", "Open Chatbot");
        iconChat.style.display = "block"; // Show chat icon
        iconClose.style.display = "none";  // Hide close icon
    }
});

// Send message on button click or pressing Enter
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        const inputMessage = createMessage(messageText, 'input-message');
        chatMessages.appendChild(inputMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate bot typing indicator
        const typingIndicator = createMessage('Bot is typing...', 'output-message');
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            chatMessages.removeChild(typingIndicator); // Remove typing indicator
            const responseText = generateResponse(messageText);
            const outputMessage = createMessage(responseText, 'output-message');
            chatMessages.appendChild(outputMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);

        messageInput.value = '';
    }
}

function createMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = text;
    messageDiv.classList.add('message', className);
    return messageDiv;
}

function generateResponse(input) {
    const responses = {
        hello: ["Hey there! How can I assist you with tech today?", "Hi! Got any coding questions?", "Hello! Need help with machine learning?"],
        'how are you': ["I'm doing great, thanks for asking!", "I'm just a bot, but I'm feeling helpful!", "Ready to assist with your queries!"],
        'what is your name': ["You can call me TechBot!", "I'm your friendly chatbot for tech help!", "TechBot at your service!"],
        'who are you': ["I'm a chatbot designed to help with programming and tech questions!", "I'm your tech assistant, ask me anything!"],
        
        // Programming-related
        'what is python': ["Python is a popular programming language known for its simplicity and versatility."],
        'what is java': ["Java is a widely-used object-oriented programming language, known for its portability."],
        'what is sql': ["SQL (Structured Query Language) is used to manage and manipulate relational databases."],
        'what is machine learning': [
            "Machine learning is a field of AI where systems learn from data to make predictions or decisions without being explicitly programmed."
        ],
        'what is ai': ["AI (Artificial Intelligence) is the simulation of human intelligence by machines."],
        'what is data science': ["Data science involves extracting insights from structured and unstructured data using various tools and techniques."],
        'what is big data': ["Big Data refers to large datasets that traditional data processing tools cannot handle effectively."],

        // Tech FAQs
        'difference between ai and ml': [
            "AI is a broader concept where machines simulate human intelligence, while ML is a subset focusing on learning from data."
        ],
        'what is cloud computing': ["Cloud computing is the delivery of computing services like storage and processing over the internet."],
        'what is docker': ["Docker is a tool that allows developers to package applications into containers for portability and consistency."],
        'what is devops': ["DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten development cycles."],
        'what is git': ["Git is a distributed version control system used to track changes in source code during software development."],
        
        // Fun and miscellaneous
        'tell me a joke': [
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "Why was the computer cold? It left its Windows open!"
        ],
        'clear chat': ["Chat cleared!"],
        
        default: ["I'm sorry, I didn't understand. Can you try rephrasing?", "Hmm, I'm not sure about that. Can you ask another question?", "I don't have the answer to that, but I'm learning!"]
    };

    const lowerInput = input.toLowerCase();
    if (lowerInput === 'clear chat') {
        clearChat();
        return responses['clear chat'][0];
    }

    if (responses[lowerInput]) {
        const possibleResponses = responses[lowerInput];
        return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    }

    return responses.default[Math.floor(Math.random() * responses.default.length)];
}

function clearChat() {
    chatMessages.innerHTML = '';
}
