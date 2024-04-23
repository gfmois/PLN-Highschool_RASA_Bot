async function postMessage(message, domElement) {
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
        domElement.textContent = text
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const chatToggle = document.getElementById("chat-toggle");
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send");
    const messageWrapper = document.getElementById("wrapper")

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

    sendButton.addEventListener("click", function () {
        const message = messageInput.value;
        if (message.trim() !== "") {
            const newMessage = document.createElement("div");
            newMessage.classList.add("client")
            newMessage.textContent = message;
            chatBox.appendChild(newMessage);

            const botResponse = document.createElement("div")
            botResponse.classList.add("bot")
            postMessage(messageInput.value, botResponse)
            chatBox.appendChild(botResponse);

            messageInput.value = "";
        }
    });
});
