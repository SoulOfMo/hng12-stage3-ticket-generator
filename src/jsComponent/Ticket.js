import html2canvas from "html2canvas";
import ticketimage from "../assests/images/ticket-image.png";
import barcode from "../assests/images/bar-code.png";

export function Ticket({
  handleReset,
  handleDownlaod,
  avatar,
  selectedTicket,
  formData,
  noOfTickets,
}) {
  const handleDownload = () => {
    const ticketElement = document.querySelector(".ticket");

    html2canvas(ticketElement, {
      width: 300,
      height: 600,
      scale: 2,
      backgroundColor: "#197686",
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${formData.fullName}-ticket.png`;
      link.click();
    });
  };
  return (
    <>
      <div className="ticket-container">
        <h1>Your Ticket is Booked!</h1>
        <p>
          Check your email for a copy or you can
          <span
            className="download"
            aria-label="download-btn"
            onClick={handleDownlaod}
          >
            download
          </span>
        </p>
        <div
          className="ticket"
          style={{ backgroundImage: `url(${ticketimage})` }}
        >
          <div className="ticket-details">
            <div className="ticket-info">
              <p>Techember Fest ”25</p>
              <span className="location">📍 04 Rumens road, Ikoyi, Lagos</span>
              <span className="date">📅 March 15, 2025 | 7:00 PM</span>
            </div>
            <div className="attendee-image">
              <img src={avatar} alt="avatar" />
            </div>
            {/* AttendeeDetails  */}
            <div className="attendee-details">
              <div className="attendee-info">
                <span className="attendee-name detail">
                  <span className="placeholder">Enter your name</span>
                  <span className="name bold">
                    {formData.fullName.length > 16
                      ? formData.fullName.slice(0, 16) + "..."
                      : formData.fullName}
                  </span>
                </span>
                <span className="attendee-email detail">
                  <span className="placeholder">Enter your email</span>
                  <span className="name bold">
                    {formData.email.length > 15
                      ? formData.email.slice(0, 14) + "..."
                      : formData.email}
                  </span>
                </span>
              </div>
              <div className="attendee-ticket">
                <span className="ticket-type detail">
                  <span className="placeholder">Ticket Type:</span>
                  <span className="name">
                    {selectedTicket === undefined ? "Regular" : selectedTicket}
                  </span>
                </span>
                <span className="ticket-for detail">
                  <span className="placeholder">Ticket for:</span>
                  <span className="name"> {noOfTickets}</span>
                </span>
              </div>

              <div className="special-request">
                <p>Special request?</p>
                <span>{formData.request}</span>
              </div>
            </div>
          </div>
          <div className="barcode">
            <img src={barcode} alt="barcode" />
          </div>
        </div>
      </div>

      <div className="new-ticket-container">
        <button
          className="new-ticket"
          aria-label="new-ticket"
          onClick={handleReset}
        >
          Book Another Ticket
        </button>
        <button
          className="download-btn"
          aria-label="download-btn"
          onClick={handleDownload}
        >
          Download Ticket
        </button>
      </div>
    </>
  );
}
