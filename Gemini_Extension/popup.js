document.getElementById('sendBtn').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value;
  const outputDiv = document.getElementById('output');
  
  // 1. Check if input is empty
  if (!userInput) {
    outputDiv.innerText = "Please type something first!";
    return;
  }

  outputDiv.innerText = "Thinking...";

  // 2. Your API Key
  const API_KEY = "AIzaSyD_sR_yu8T59kyM7ZGae7zzeZIdHRlvtDA"; 
  
  // 3. The API URL
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  try {
    // 4. Send the request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: userInput }]
        }]
      })
    });

    // 5. Get the result
    const data = await response.json();
    
    // 6. Show the result
    if (data.candidates && data.candidates[0].content) {
      outputDiv.innerText = data.candidates[0].content.parts[0].text;
    } else {
      outputDiv.innerText = "Error: " + JSON.stringify(data);
    }

  } catch (error) {
    outputDiv.innerText = "Network Error: " + error.message;
  }
});