document.addEventListener('DOMContentLoaded', () => {
    const topicList = document.getElementById('topic-list');
    const topicDetails = document.getElementById('topic-details');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatResponse = document.getElementById('chat-response');
    const randomTipList = document.getElementById('random-tip-list');

    // Sample Beauty Tips (Expand this!)
    const beautyTips = [
        "Exfoliate your skin 1-2 times a week for a brighter complexion.",
        "Use a silk pillowcase to reduce wrinkles and hair breakage.",
        "Incorporate facial massage into your skincare routine to boost circulation.",
        "Don't forget to moisturize your neck and décolletage!",
        "Eat a balanced diet rich in antioxidants for healthy skin."
    ];

    // Function to display a random beauty tip
    function displayRandomTip() {
        const randomIndex = Math.floor(Math.random() * beautyTips.length);
        const tip = beautyTips[randomIndex];
        const li = document.createElement('li');
        li.textContent = tip;
        randomTipList.appendChild(li);
    }

    // Load a few random tips on page load
    for (let i = 0; i < 3; i++) {
        displayRandomTip();
    }

    // Function to collect selected topic details (keywords)
    const getSelectedTopicDetails = () => {
        const selectedDetails = [];
        const inputs = topicDetails.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked, input[type="number"], input[type="text"]');

        inputs.forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                selectedDetails.push(input.value);
            } else if (input.type === 'number' || input.type === 'text') {
                selectedDetails.push(`${input.name}: ${input.value}`);  // Include name and value
            }
        });
        return selectedDetails;
    };


    // Function to load topic details (same as before)
    const loadTopicDetails = (topic) => {
        topicDetails.innerHTML = ''; // Clear previous content

        switch (topic) {
            case 'skincare':
                topicDetails.innerHTML = `
                    <h3>Skincare Options</h3>
                    <label><input type="radio" name="skincare_goal" value="oily"> Oily Skin</label><br>
                    <label><input type="radio" name="skincare_goal" value="dry"> Dry Skin</label><br>
                    <label><input type="radio" name="skincare_goal" value="combination"> Combination Skin</label><br>
                    <label><input type="radio" name="skincare_goal" value="tone"> Improve Skin Tone</label><br>
                    <label><input type="radio" name="skincare_goal" value="acne"> Acne Treatment</label><br>
                    <label><input type="radio" name="skincare_goal" value="sensitive"> Sensitive/Irritated Skin</label><br>
                    <!-- More Keywords -->
                    <label><input type="checkbox" name="skincare_keyword" value="sunscreen"> Sunscreen</label><br>
                    <label><input type="checkbox" name="skincare_keyword" value="exfoliation"> Exfoliation</label><br>
                    <label><input type="checkbox" name="skincare_keyword" value="serum"> Serums</label><br>
                `;
                break;
            case 'body':
                topicDetails.innerHTML = `
                    <h3>Body Shape Goals</h3>
                    <label><input type="checkbox" name="body_part" value="abs"> Abs</label><br>
                    <label><input type="checkbox" name="body_part" value="legs"> Legs</label><br>
                    <label><input type="checkbox" name="body_part" value="arms"> Arms</label><br>
                    <label><input type="checkbox" name="body_part" value="butt"> Butt</label><br>
                     <!-- Measurement Inputs (kg for weight, cm for height) -->
                    <label for="weight">Weight (kg):</label>
                    <input type="number" id="weight" name="weight"><br>
                    <label for="height">Height (cm):</label>
                    <input type="number" id="height" name="height"><br>
                    <!-- More Keywords -->
                    <label><input type="checkbox" name="body_keyword" value="cardio"> Cardio</label><br>
                    <label><input type="checkbox" name="body_keyword" value="protein"> Protein Intake</label><br>
                `;
                break;
            case 'hair':
                topicDetails.innerHTML = `
                    <h3>Hair Options</h3>
                    <label><input type="radio" name="hair_goal" value="dye"> Color Selection</label><br>
                    <label><input type="radio" name="hair_goal" value="damage"> Prevent Hair Damage</label><br>
                    <label><input type="radio" name="hair_goal" value="repair"> Repair Hair</label><br>
                    <label><input type="radio" name="hair_goal" value="style"> Suitable Styles</label><br>
                    <label><input type="radio" name="hair_goal" value="trendy"> Trendy styles</label><br>
                    <!-- More Keywords -->
                    <label><input type="checkbox" name="hair_keyword" value="shampoo"> Shampoo Type</label><br>
                    <label><input type="checkbox" name="hair_keyword" value="conditioner"> Conditioner</label><br>
                    <label><input type="checkbox" name="hair_keyword" value="hairmask"> Hair mask</label><br>
                `;
                break;
            case 'nails':
                topicDetails.innerHTML = `
                    <h3>Nail Goals</h3>
                    <label><input type="radio" name="nail_goal" value="shape"> Nail Shape</label><br>
                    <label><input type="radio" name="nail_goal" value="design"> Nail Design</label><br>
                    <!-- More Keywords -->
                    <label><input type="checkbox" name="nail_keyword" value="acrylic"> Acrylic Nails</label><br>
                    <label><input type="checkbox" name="nail_keyword" value="gel"> Gel Nails</label><br>
                `;
                break;
            case 'clothing':
                topicDetails.innerHTML = `
                    <h3>Clothing Preferences</h3>
                    <label for="height">Height (cm):</label>
                    <input type="number" id="height" name="height"><br>
                    <label for="weight">Weight (kg):</label>
                    <input type="number" id="weight" name="weight"><br>
                    <label for="skin_tone">Skin Tone:</label>
                    <input type="text" id="skin_tone" name="skin_tone"><br>
                    <label for="eye_color">Eye Color:</label>
                    <input type="text" id="eye_color" name="eye_color"><br>
                    <label for="hair_color">Hair Color:</label>
                    <input type="text" id="hair_color" name="hair_color"><br>
                    <label for="undertone">Undertone:</label>
                    <input type="text" id="undertone" name="undertone"><br>
                    <!-- More Keywords -->
                    <label><input type="checkbox" name="clothing_keyword" value="casual"> Casual</label><br>
                    <label><input type="checkbox" name="clothing_keyword" value="formal"> Formal</label><br>
                    <label><input type="checkbox" name="clothing_keyword" value="summer"> Summer</label><br>
                `;
                break;
            default:
                topicDetails.innerHTML = '<p>Select a topic from the left.</p>';
        }
    };

    // Function to interact with the Gemini API (modified for chat)
    const getBeautyAdvice = async (prompt) => {
        const API_KEY = window.geminiApiKey; // Access the API key from api_key.js
        if (!API_KEY) {
            alert("Gemini API key not found! Please add it to api_key.js");
            return;
        }
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            const candidates = data.candidates;

            if (candidates && candidates.length > 0) {
                const answer = candidates[0].content.parts[0].text || "No answer provided.";
                displayChatMessage(answer, 'ai'); // Display AI response
            } else {
                displayChatMessage("No answer provided.", 'ai');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            displayChatMessage("Error occurred. Please try again later.", 'ai');
        }
    };

    // Function to display a chat message
    function displayChatMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-bubble');
        messageDiv.textContent = message;

        if (sender === 'user') {
            messageDiv.classList.add('user-message'); // Add a class for user messages
            messageDiv.style.textAlign = 'right'; // Align user messages to the right

        } else {
            messageDiv.classList.add('ai-message'); // Add a class for AI messages
            messageDiv.style.textAlign = 'left';// Align ai messages to the left
        }

        chatResponse.appendChild(messageDiv);
        chatResponse.scrollTop = chatResponse.scrollHeight; // Scroll to the bottom
    }

    // Event listeners
    topicList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const topic = e.target.dataset.topic;
            loadTopicDetails(topic);
        }
    });

    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        const selectedTopicDetails = getSelectedTopicDetails(); // Get selected keywords

        let fullPrompt = "";

        if (selectedTopicDetails.length > 0) {
            fullPrompt += "I am interested in: " + selectedTopicDetails.join(", ") + ". ";
        }

        if (message !== '') {
            fullPrompt += message;
        } else {
            fullPrompt += "Give me some advice based on my selections."; // Default question if no text is entered
        }

        if (fullPrompt.trim() !== '') {
            displayChatMessage(message || "Requesting advice...", 'user'); // Display user message/status
            getBeautyAdvice(fullPrompt);
            chatInput.value = ''; // Clear the input
        }
    });

    // Allow sending message with Enter key
    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
            event.preventDefault(); // Prevent newline in input
        }
    });
});