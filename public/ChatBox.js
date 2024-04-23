class ChatBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .chat-container {
                    position: fixed;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    bottom: 0px;
                    right: 20px;
                    width: 300px;
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

                    img {
                        filter: brightness(0) invert(1);
                    }
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
                    gap: 10px;
                
                    .bot {
                        text-align: left;
                        width: 70%;
                        background: #2d2d2d;
                        color: white;
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                        padding: 10px;
                        border-bottom-right-radius: 10px;
                    }
                
                    .client {
                        text-align: left;
                        align-self: end;
                        width: 50%;
                        background: #4CAF50;
                        color: white;
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                        padding: 10px;
                        border-bottom-left-radius: 10px;
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
                .maximize-button {
                    background: transparent;
                    border: none;
                    position: absolute;
                    left: 0;
                    top: 10px;
                    cursor: nw-resize;
                }

                .chat-toggle-div {
                    position: relative;
                }
            </style>
            <div style="position: fixed;">
                <div class="chat-container" id="chat-containerr">
                    <button class="chat-toggle-div" id="chat-toggle">
                        Chat 
                        <button id="maximize-item" class="maximize-button">
                            <img id="max-item" src="./assets/maximize-2.svg" width="13px" heigh="20px" />
                        </button>
                    </button>
                    <div id="chat-box">
                        <div class="bot">Hola 👋! Soy el chatbot del CIPFP Mislata 😊</div>
                    </div>
                    <div id="wrapper">
                        <div id="message-input">
                            <input type="text" id="message" placeholder="Escribe tu mensaje...">
                            <button id="send">Enviar</button>
                        </div>
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
        const maximize = this.shadowRoot.getElementById("maximize-item")
        const chatContainer = this.shadowRoot.getElementById("chat-containerr")

        let chatOpen = false;
        let isMaximized = false;

        function toggleChat() {
            console.log(chatOpen);
            if (chatOpen) {
                messageWrapper.style.display = "block";
                chatBox.style.display = "flex"
                chatBox.style.flexDirection = "column"
                chatBox.style.gap = "10px"
            } else {
                chatContainer.style = undefined
                chatBox.style.display = "none";
                messageWrapper.style.display = "none"
            }
        }

        chatToggle.addEventListener("click", function () {
            chatOpen = !chatOpen;
            toggleChat()
        });

        maximize.addEventListener("click", () => {
            isMaximized = !isMaximized
            chatOpen = true;

            toggleChat()

            if (isMaximized) {
                // chatContainer.style.position = "absolute"
                chatContainer.style.width = "50%"
                chatContainer.style.height = "50%"
            } else {
                chatContainer.style.width = "300px"
                chatContainer.style.position = "fixed"
                chatContainer.style.height = "300px"
            }
        })

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
