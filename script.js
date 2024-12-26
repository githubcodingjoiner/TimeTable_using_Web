const tableBody = document.querySelector("#timetable tbody");
const toggleSunday = document.getElementById("toggleSunday");
const addRowButton = document.getElementById("addRow");
const openChatbot = document.getElementById("openChatbot");
const chatbot = document.getElementById("chatbot");
const chatContent = document.getElementById("chatContent");
const userInput = document.getElementById("userInput");
const sendMessage = document.getElementById("sendMessage");
const closeChatbot = document.getElementById("closeChatbot");

// Initialize with sample data
function initializeTable() {
  const sampleData = [
    { time: "8:00 am - 9:00 am", activities: ["", "", "", "", "", ""] },
    { time: "9:00 am - 10:00 am", activities: ["", "", "", "", "", ""] },
    { time: "10:00 am - 11:00 am", activities: ["", "", "", "", "", ""] },
  ];

  sampleData.forEach(row => addRow(row.time, row.activities));
}

// Add a new row to the table
function addRow(time = "", activities = ["", "", "", "", "", "", ""]) {
  const row = document.createElement("tr");

  // Add time column
  const timeCell = document.createElement("td");
  timeCell.textContent = time;
  timeCell.classList.add("editable");
  timeCell.addEventListener("click", () => editCell(timeCell));
  row.appendChild(timeCell);

  // Add activity columns
  activities.forEach(activity => {
    const cell = document.createElement("td");
    cell.textContent = activity;
    cell.classList.add("editable");
    cell.addEventListener("click", () => editCell(cell));
    row.appendChild(cell);
  });

  tableBody.appendChild(row);
}

// Enable editing for a cell
function editCell(cell) {
  const originalText = cell.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = originalText;
  cell.textContent = "";
  cell.appendChild(input);

  input.addEventListener("blur", () => {
    cell.textContent = input.value;
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      input.blur();
    }
  });

  input.focus();
}

// Toggle Sunday column
toggleSunday.addEventListener("change", () => {
  const tableHead = document.querySelector("#timetable thead tr");
  const rows = document.querySelectorAll("#timetable tbody tr");

  if (toggleSunday.checked) {
    const sundayHeader = document.createElement("th");
    sundayHeader.textContent = "Sunday";
    tableHead.appendChild(sundayHeader);

    rows.forEach(row => {
      const sundayCell = document.createElement("td");
      sundayCell.classList.add("editable");
      sundayCell.addEventListener("click", () => editCell(sundayCell));
      row.appendChild(sundayCell);
    });
  } else {
    tableHead.lastChild.remove();
    rows.forEach(row => row.lastChild.remove());
  }
});

// Add new row button functionality
addRowButton.addEventListener("click", () => addRow());

// Chatbot functionality
function addMessage(content, sender = "user") {
  const message = document.createElement("p");
  message.textContent = content;
  message.classList.add(sender);
  chatContent.appendChild(message);
  chatContent.scrollTop = chatContent.scrollHeight;
}

sendMessage.addEventListener("click", () => {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Display user message
  addMessage(userMessage, "user");

  // Simulate AI response
  setTimeout(() => {
    const aiResponse = generateTimetable(userMessage);
    addMessage(aiResponse, "ai");
  }, 1000);

  userInput.value = "";
});

function generateTimetable(message) {
  // Example response based on user requirements
  if (message.toLowerCase().includes("create")) {
    tableBody.innerHTML = "";
    const times = [
      "8:00 am - 9:00 am",
      "9:00 am - 10:00 am",
      "10:00 am - 11:00 am",
      "11:00 am - 12:00 pm"
    ];
    times.forEach(time => addRow(time, ["Math", "Science", "English", "PE", "Art", "Music"]));
    return "Your timetable has been generated based on a standard schedule.";
  } else {
    return "I'm sorry, I didn't understand your request. Please specify your requirements.";
  }
}

// Open and close chatbot
openChatbot.addEventListener("click", () => {
  chatbot.style.display = "flex";
});

closeChatbot.addEventListener("click", () => {
  chatbot.style.display = "none";
});

// Initialize table on page load
initializeTable();
