const URL = 'http://localhost:5000/chat';

const messages = [
  "Hi I want engineering admission",
  "State Board",
  "Arun",
  "9876543210",
  "98", // Maths
  "96", // Physics
  "94", // Chemistry
  "OC",
  "Chennai",
  "100000",
  "EEE",
  "Monday 10AM"
];

async function runTest() {
  let history = [];
  let leadCapturedAnywhere = false;

  console.log("Starting full conversation flow test...\n");

  for (let i = 0; i < messages.length; i++) {
    const userMsg = messages[i];
    console.log(`Step ${i + 1}:`);
    console.log(`User: "${userMsg}"`);

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMsg,
          history: history
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      console.log(`Kavin: ${data.reply}`);
      console.log(`leadCaptured: ${data.leadCaptured}`);
      console.log(`escalated: ${data.escalated}`);

      if (data.leadCaptured) {
        leadCapturedAnywhere = true;
      }

      // Keep history growing with each turn (assistant reply added after each step)
      history.push({ role: 'user', content: userMsg });
      history.push({ role: 'assistant', content: data.reply });

    } catch (error) {
      console.error(`Error during Step ${i + 1}:`, error.message);
      break;
    }

    console.log("--------------------------------------------------\n");
  }

  if (leadCapturedAnywhere) {
    console.log("RESULT: LEAD CAPTURE SUCCESS");
  } else {
    console.log("RESULT: LEAD CAPTURE FAILED");
  }
}

runTest();
