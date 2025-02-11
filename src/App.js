import { useState } from "react";
import logo from "./assests/images/logo.png";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  return (
    <main className="App">
      <Header />
      <FormContainer />
    </main>
  );
}

function Header() {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <ul>
        <li className="active">Events</li>
        <li>My Ticket</li>
        <li>About Project</li>
      </ul>
      <button>My Ticket &rarr; </button>
    </nav>
  );
}

function FormContainer() {
  return (
    <div className="form-container">
      <div className="step-details">
        <h1>Ticket Selection</h1>
        <p>Step 1/3</p>
      </div>
      <hr className="progress-bar step-1" />
      <Form />
    </div>
  );
}

function Form() {
  return (
    <form>
      <div className="steps">
        <TicketSelcection />
      </div>
      <div className="form-btn">
        <button className="cancel">Cancel</button>
        <button className="next">Next</button>
      </div>
    </form>
  );
}

function TicketSelcection() {
  return (
    <>
      <div className="ticket-details">
        <h2>Techember Fest ”25</h2>
        <p>
          Join us for an unforgettable experience at [Event Name]! Secure your
          spot now.
        </p>
        <p>📍[Event Location] || March 15, 2025 | 7:00 PM</p>
      </div>

      <hr></hr>
      <div className="ticket-container">
        <span className="label">Select Ticket Type:</span>
        <div className="ticket-type">
          <button className="active-btn">
            <span className="type">
              <span>Regular Access</span>
              <span>20 left</span>
            </span>
            <span className="price">$20</span>
          </button>

          <button className="">
            <span className="type">
              <span>Regular Access</span>
              <span>20 left</span>
            </span>
            <span className="price">$20</span>
          </button>

          <button className="">
            <span className="type">
              <span>Regular Access</span>
              <span>20 left</span>
            </span>
            <span className="price">$20</span>
          </button>
        </div>
      </div>

      <div className="number-of-ticket">
        <span>Number of Tickets</span>
        <select>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function AttendeeDetails() {
  return <div className=""></div>;
}

function Ticket() {
  return <div className=""></div>;
}

export default App;
