/* Importação dos módulos do google */

import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { marked } from "https://esm.run/marked";    
  
let chat;
let currentModel = "gemini-2.0-flash";
let historico = [];
let systemInstruction = "Você é um assistente IA que ajudará o usuário com suas dúvidas.";

/* module pattern para encapsulamento das funções do client gemini */
var gemini = (() => {

    // A API KEY é pega pelo prompt do browser, mas ao fechar a página é removida do localstorage no evento onbeforeunload
    function getApiKey() {
        let apiKey = localStorage.getItem("GEMINI_API_KEY");
        if (!apiKey) {
            apiKey = prompt("Informe a Gemini API key:");
        }
        if (apiKey) {
            localStorage.setItem("GEMINI_API_KEY", apiKey);
        }
        return apiKey;
    }
    async function initChat() {
        try {
            const genAI = new GoogleGenerativeAI(getApiKey());
            const model = await genAI.getGenerativeModel({
                model: currentModel,
                systemInstruction
            });
            chat = model.startChat({
                history: historico,
            });
            displayMessage("System", `${systemInstruction}`);
        } catch (error) {
            displayError("Failed to initialize chat: " + error.message);
        }
    }
    async function sendMessage() {
        const userInput = document.getElementById("user-input");
        const message = userInput.value.trim();
        if (message) {
            displayMessage("Você", message);
            userInput.value = "";
            try {
                const startTime = performance.now();
                const result = await chat.sendMessageStream(message);
                let fullResponse = "";
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    fullResponse += chunkText;
                    updateModelResponse(fullResponse);
                }
                const endTime = performance.now();
                const duration = ((endTime - startTime) / 1000).toFixed(2);
                historico.push({
                    role: "user",
                    parts: [{
                        text: message
                    }]
                });
                historico.push({
                    role: "model",
                    parts: [{
                        text: fullResponse
                    }]
                });
                let usage = (await result.response).usageMetadata;
                updateUsageMetadata(usage);
                updateDuration(duration);
            } catch (error) {
                displayError("Error: " + error.message);
            }
        }
    }

    function displayMessage(enviarer, message) {
        const chatMessages = document.getElementById("chat-messages");
        const messageElement = document.createElement("div");
        messageElement.innerHTML = `
                        <strong>${enviarer}:</strong> ${marked.parse(message)}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function displayError(message) {
        const chatMessages = document.getElementById("chat-messages");
        const errorElement = document.createElement("div");
        errorElement.innerHTML = `
                        <strong style="color: red;">Error:</strong>
                        <span style="color: red;">${message}</span>`;
        chatMessages.appendChild(errorElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function updateModelResponse(response) {
        const chatMessages = document.getElementById("chat-messages");
        let modelResponse = chatMessages.lastElementChild;
        if (!modelResponse || !modelResponse.querySelector("strong")?.textContent.includes("Model")) {
            modelResponse = document.createElement("div");
            modelResponse.innerHTML = " < strong > Model: < /strong> " + currentModel;
            chatMessages.appendChild(modelResponse);
        }
        modelResponse.innerHTML = `
                        <strong>Model: ${currentModel} </strong> ${marked.parse(response)}`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function updateUsageMetadata(metadata) {
        const usageMetadataElement = document.getElementById("usage-metadata");
        usageMetadataElement.textContent = JSON.stringify(metadata, null, 2);
    }

    function updateDuration(duration) {
        const durationElement = document.getElementById("api-duration");
        durationElement.textContent = `Detalhes última chamada API # duração: ${duration} segundos`;
        $('#collapsePanel').toggle();
    }

    function changeModel() {
        const modelSelect = document.getElementById("model-select");
        currentModel = modelSelect.value;
        displayMessage("System", `Changing model to ${currentModel}. Reinitializing chat...`);
        historico = [];
        initChat();
    }

    function limparChat() {
        historico = [];
        document.getElementById("chat-messages").innerHTML = "";
        document.getElementById("usage-metadata").textContent = "";
        document.getElementById("api-duration").textContent = "";
        initChat();
    }
    return {
        initChat,
        sendMessage,
        changeModel,
        limparChat
    }
})();
window.onload = () => {
    gemini.initChat();
    document.getElementById("enviar-button").addEventListener("click", gemini.sendMessage);
    document.getElementById("user-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") gemini.sendMessage();
    });
    document.getElementById("model-select").addEventListener("change", gemini.changeModel);
    document.getElementById("limpar-button").addEventListener("click", gemini.limparChat);
};

window.onbeforeunload = () => {
    localStorage.removeItem("GEMINI_API_KEY");
};

