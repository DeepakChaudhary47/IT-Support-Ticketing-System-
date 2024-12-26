// Fetch tickets from session storage
function fetchTickets() {
    const tickets = JSON.parse(sessionStorage.getItem("tickets")) || [];
    const ticketsDiv = document.getElementById("tickets");
    ticketsDiv.innerHTML = tickets.map(ticket => `
      <div class="ticket">
        <h3>${ticket.title}</h3>
        <p><strong>Description:</strong> ${ticket.description}</p>
        <p><strong>Priority:</strong> ${ticket.priority}</p>
        <p><strong>Status:</strong> ${ticket.status}</p>
        <button onclick="editTicket('${ticket.id}')">Edit</button>
        <button onclick="deleteTicket('${ticket.id}')">Delete</button>
      </div>
    `).join("");
  }
  
  // Save or update ticket
  document.getElementById("ticketForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("ticketId").value || Date.now().toString();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;
    const status = document.getElementById("status").value;
  
    let tickets = JSON.parse(sessionStorage.getItem("tickets")) || [];
    const existingTicketIndex = tickets.findIndex(ticket => ticket.id === id);
  
    if (existingTicketIndex >= 0) {
      tickets[existingTicketIndex] = { id, title, description, priority, status };
    } else {
      tickets.push({ id, title, description, priority, status });
    }
  
    sessionStorage.setItem("tickets", JSON.stringify(tickets));
    fetchTickets();
    document.getElementById("ticketForm").reset();
  });
  
  // Edit ticket
  function editTicket(id) {
    const tickets = JSON.parse(sessionStorage.getItem("tickets")) || [];
    const ticket = tickets.find(ticket => ticket.id === id);
    if (ticket) {
      document.getElementById("ticketId").value = ticket.id;
      document.getElementById("title").value = ticket.title;
      document.getElementById("description").value = ticket.description;
      document.getElementById("priority").value = ticket.priority;
      document.getElementById("status").value = ticket.status;
    }
  }
  
  // Delete ticket
  function deleteTicket(id) {
    let tickets = JSON.parse(sessionStorage.getItem("tickets")) || [];
    tickets = tickets.filter(ticket => ticket.id !== id);
    sessionStorage.setItem("tickets", JSON.stringify(tickets));
    fetchTickets();
  }
  
  // Initial fetch
  fetchTickets();
  