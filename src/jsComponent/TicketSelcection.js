export function TicketSelcection({
  handleSelectedTicket,
  selectedTicket,
  noOfTickets,
  setNoOfTickets,
}) {
  return (
    <>
      <div className="ticket-details">
        <h2>Techember Fest ”25</h2>
        <p>
          Join us for an unforgettable experience at [Event Name]! Secure your
          spot now.
        </p>
        <p className="location">
          📍[Event Location] || March 15, 2025 | 7:00 PM
        </p>
      </div>

      <hr></hr>

      <div className="ticket-selection">
        <span className="label">Select Ticket Type:</span>
        <div className="ticket-types">
          <TicketButton
            handleSelectedTicket={handleSelectedTicket}
            price="free"
            type="Regular"
            noOfTicket="20/52"
            selectedTicket={selectedTicket}
          />

          <TicketButton
            selectedTicket={selectedTicket}
            handleSelectedTicket={handleSelectedTicket}
            price="$150"
            type="VIP"
            noOfTicket="20/52"
          />
          <TicketButton
            selectedTicket={selectedTicket}
            handleSelectedTicket={handleSelectedTicket}
            price="$300"
            type="VVIP"
            noOfTicket="20/52"
          />
        </div>
      </div>

      <div className="number-of-ticket">
        <span>Number of Tickets</span>
        <select onChange={(e) => setNoOfTickets(e.target.value)}>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
export function TicketButton({
  price,
  type,
  noOfTicket,
  handleSelectedTicket,
  selectedTicket,
}) {
  return (
    <button
      className={selectedTicket === type ? "active-btn" : ""}
      value={type}
      onClick={handleSelectedTicket}
    >
      <span className="price">{price}</span>
      <span className="type">{type} Access</span>
      <span>{noOfTicket}</span>
    </button>
  );
}
