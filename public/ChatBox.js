class ChatBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .chat-container {
                    position: fixed;
                    bottom: 0px;
                    right: 20px;
                    width: 300px;
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                #chat-toggle {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    cursor: pointer;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                    width: 100%;
                }
                #chat-box {
                    height: 200px;
                    overflow-y: scroll;
                    padding: 10px;
                    display: none;
                
                    .bot {
                        text-align: left;
                    }
                
                    .client {
                        text-align: right;
                    }
                }
                #wrapper {
                    display: none;
                }
                #message-input {
                    padding: 10px;
                    display: flex;
                }
                #message-input input[type="text"] {
                    width: calc(100% - 70px);
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    margin-right: 10px;
                }
                #message-input button {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 8px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 5px;
                }            
            </style>
            <div class="chat-container">
                <button id="chat-toggle">Chat</button>
            <div id="chat-box">
            </div>
            <div id="wrapper">
                <div id="message-input">
                    <input type="text" id="message" placeholder="Escribe tu mensaje...">
                    <button id="send">Enviar</button>
                </div>
            </div>
        </div>
        `;
    }

    async postMessage(message, docElement) {
        try {
            if (message == "" || message == undefined) {
                alert("Message Empty")
            }
            const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
                method: "POST",
                body: JSON.stringify({ message }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            const { text } = responseData[0]
            docElement.textContent = text
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    connectedCallback() {
        const chatToggle = this.shadowRoot.getElementById("chat-toggle");
        const chatBox = this.shadowRoot.getElementById("chat-box");
        const messageInput = this.shadowRoot.getElementById("message");
        const sendButton = this.shadowRoot.getElementById("send");
        const messageWrapper = this.shadowRoot.getElementById("wrapper");

        let chatOpen = false;

        chatToggle.addEventListener("click", function () {
            chatOpen = !chatOpen;
            if (chatOpen) {
                chatBox.style.display = "block";
                messageWrapper.style.display = "block"
            } else {
                chatBox.style.display = "none";
                messageWrapper.style.display = "none"
            }
        });

        sendButton.addEventListener("click", () => {
            const message = messageInput.value;
            if (message.trim() !== "") {
                const newMessage = document.createElement("div");
                newMessage.classList.add("client")
                newMessage.textContent = message;
                chatBox.appendChild(newMessage);

                const botResponse = document.createElement("div")
                botResponse.classList.add("bot")
                this.postMessage(messageInput.value, botResponse)
                chatBox.appendChild(botResponse);

                messageInput.value = "";
            }
        });
    }
}

customElements.define("chat-box", ChatBox);
