class ChatBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .chat-container {
                    position: relative;
                    width: 300px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    font-family: Arial, sans-serif;
                }
                .chat-box {
                    display: none;
                    padding: 10px;
                    background-color: #f9f9f9;
                    overflow-y: auto;
                    max-height: 200px;
                }
                .message-input {
                    display: none;
                    padding: 10px;
                    background-color: #fff;
                    border-top: 1px solid #ccc;
                }
                .client {
                    margin-bottom: 5px;
                }
                .bot {
                    margin-bottom: 5px;
                    color: #007bff;
                }
            </style>
            <div class="chat-container">
                <button id="chat-toggle">Chat</button>
                <div class="chat-box">
                    <p class="bot">Welcome!</p>
                </div>
                <div class="message-input">
                    <input type="text" id="message" placeholder="Write your message...">
                    <button id="send">Send</button>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        const chatToggle = this.shadowRoot.getElementById("chat-toggle");
        const chatBox = this.shadowRoot.querySelector(".chat-box");
        const messageInput = this.shadowRoot.getElementById("message");
        const sendButton = this.shadowRoot.getElementById("send");
        const messageWrapper = this.shadowRoot.querySelector(".message-input");

        let chatOpen = false;

        chatToggle.addEventListener("click", () => {
            chatOpen = !chatOpen;
            if (chatOpen) {
                chatBox.style.display = "block";
                messageWrapper.style.display = "block";
            } else {
                chatBox.style.display = "none";
                messageWrapper.style.display = "none";
            }
        });

        sendButton.addEventListener("click", async () => {
            const message = messageInput.value;
            if (message.trim() !== "") {
                const newClientMessage = document.createElement("p");
                newClientMessage.classList.add("client");
                newClientMessage.textContent = message;
                chatBox.appendChild(newClientMessage);

                const botResponse = document.createElement("p");
                botResponse.classList.add("bot");
                chatBox.appendChild(botResponse);

                try {
                    const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
                        method: "POST",
                        body: JSON.stringify({ message }),
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const responseData = await response.json();
                    const { text } = responseData[0];
                    botResponse.textContent = text;
                } catch (e) {
                    console.log(`Error: ${e}`);
                    botResponse.textContent = "Error occurred. Please try again later.";
                }

                messageInput.value = "";
            }
        });
    }
}

customElements.define("chat-box", ChatBox);
