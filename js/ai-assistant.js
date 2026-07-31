const chatBox = document.getElementById("chatBox");
const question = document.getElementById("question");
const sendBtn = document.getElementById("sendBtn");

// Backend URL
const API_URL = "http://localhost:3000/chat";

sendBtn.addEventListener("click", sendMessage);

question.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {

    const text = question.value.trim();

    if (text === "") return;

    addUserMessage(text);

    question.value = "";

    const typing = document.createElement("div");
    typing.className = "bot";
    typing.id = "typing";
    typing.innerHTML = "🤖 Thinking...";
    chatBox.appendChild(typing);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        document.getElementById("typing")?.remove();

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.reply || "Unable to connect.");
        }

        addBotMessage(data.reply);

    } catch (err) {

        document.getElementById("typing")?.remove();

        addBotMessage("❌ " + err.message);

        console.error(err);

    }

}

function addUserMessage(text) {

    const div = document.createElement("div");
    div.className = "user";
    div.textContent = text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;

}

function addBotMessage(text) {

    const div = document.createElement("div");
    div.className = "bot";
    div.innerHTML = formatMessage(text);

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;

}

function formatMessage(text) {

    return text
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");

}