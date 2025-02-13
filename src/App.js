import { useState, useEffect } from "react";
import logo from "./assests/images/logo.png";
import cloudDownload from "./assests/images/cloud-download.svg";
import envelope from "./assests/images/envelope.png";
import ticketimage from "./assests/images/ticket-image.png";
import barcode from "./assests/images/bar-code.png";
// import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    return (
      storedData || {
        fullName: "",
        email: "",
        avatar: "",
      }
    );
  });

  const [avatar, setAvatar] = useState(null);
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const avatarURL = URL.createObjectURL(file);
      setAvatar(avatarURL);
      setFormData({ ...formData, avatar: avatarURL });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!avatar) {
      newErrors.avatar = "Please upload a picture.";
    }
    setErrors(newErrors);
    console.log(Object.keys(newErrors).length);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({});
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  function handleNextStep(e) {
    e.preventDefault();

    if (step === 2) {
      if (!validateForm()) return;
    }

    setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : 1));
  }

  function handlePrevStep(e) {
    e.preventDefault();
    setStep((step) => (step > 1 ? step - 1 : 1));
  }

  function handleReset() {
    setStep(1);
    localStorage.removeItem("formData");
  }

  return (
    <main className="App">
      <Header />
      <FormContainer
        step={step}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        handleReset={handleReset}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        errorMsg={errors}
        avatar={avatar}
        handleAvatarChange={handleAvatarChange}
      />
    </main>
  );
}

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <ul>
        <li className="active">Events</li>
        <li>My Ticket</li>
        <li>About Project</li>
      </ul>
      <button>My Ticket &rarr;</button>
    </header>
  );
}

function FormContainer({
  step,
  handleNextStep,
  handlePrevStep,
  handleReset,
  formData,
  setFormData,
  handleChange,
  errorMsg,
  avatar,
  handleDownlaod,
  handleAvatarChange,
}) {
  return (
    <div className="form-container">
      <div className="step-details">
        <h1>Ticket Selection</h1>
        <p>Step 1/3</p>
      </div>
      <hr className="progress-bar step-1" />
      {step === 3 ? (
        ""
      ) : (
        <Form
          step={step}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errorMsg={errorMsg}
          avatar={avatar}
          handleAvatarChange={handleAvatarChange}
        />
      )}
      {step === 3 ? (
        <Ticket
          handleReset={handleReset}
          handleDownlaod={handleDownlaod}
          avatar={avatar}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function Form({
  step,
  handleNextStep,
  handlePrevStep,
  formData,
  setFormData,
  handleChange,
  errorMsg,
  avatar,
  handleAvatarChange,
}) {
  return (
    <form>
      <div className="steps">
        {step === 1 ? <TicketSelcection /> : ""}
        {step === 2 ? (
          <AttendeeDetails
            errorMsg={errorMsg}
            formData={formData}
            handleChange={handleChange}
            avatar={avatar}
            handleAvatarChange={handleAvatarChange}
          />
        ) : (
          ""
        )}
      </div>

      <div className="form-btn">
        <button className="cancel" onClick={handlePrevStep}>
          Cancel
        </button>
        <button className="next" onClick={handleNextStep}>
          Next
        </button>
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
        <div className="ticket-types">
          <TicketButton
            className="active-btn"
            price="free"
            type="Regular Access"
            noOfTicket="20/52"
          />

          <TicketButton
            className=""
            price="150"
            type="VIP Access"
            noOfTicket="20/52"
          />
          <TicketButton
            className=""
            price="300"
            type="VVIP ACCESS"
            noOfTicket="20/52"
          />
        </div>
      </div>

      <div className="number-of-ticket">
        <span>Number of Tickets</span>
        <select>
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

function TicketButton({ className, price, type, noOfTicket }) {
  return (
    <button className={className}>
      <span className="price">${price}</span>
      <span className="type">{type}</span>
      <span>{noOfTicket}</span>
    </button>
  );
}

function AttendeeDetails({
  formData,
  handleChange,
  errorMsg,
  avatar,
  handleAvatarChange,
}) {
  return (
    <>
      <div className="attendee-details">
        <span className="error-container">
          <p>Upload Profile Photo</p>
          <span className="errorMsg">{errorMsg.avatar}</span>
        </span>

        <label htmlFor="avatar" className="uploadcontainer">
          <span className={avatar ? "uploadbox avatar-active" : "uploadbox"}>
            {avatar && (
              <span>
                <img
                  src={avatar}
                  alt="Uploaded preview"
                  className="uploaded-image"
                />
              </span>
            )}

            <span className={avatar ? "text-preview overlay" : "text-preview"}>
              <img src={cloudDownload} alt="cloudDownload" />
              Drag & drop or click to upload
            </span>
          </span>
          <input
            id="avatar"
            type="file"
            hidden
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </label>
      </div>
      <hr />
      <div className="input-name">
        <span className="error-container">
          <label htmlFor="fullname">Enter your name</label>
          <span className="errorMsg">{errorMsg.fullName}</span>
        </span>
        <input
          type="text"
          id="fullname"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="input-email">
        <span className="error-container">
          <label htmlFor="email">Enter your email *</label>
          <span className="errorMsg">{errorMsg.email}</span>
        </span>

        <div className="input-wrapper">
          <span className="icon">
            <img src={envelope} alt="enevlope" />
          </span>
          <input
            type="email"
            id="email"
            placeholder="hello@avioflagos.io"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-conatiner">
        <label htmlFor="request">Special request?</label>
        <textarea id="request" placeholder="Textarea"></textarea>
      </div>
    </>
  );
}

function Ticket({ handleReset, handleDownlaod, avatar }) {
  return (
    <>
      <div className="ticket-container">
        <h1>Your Ticket is Booked!</h1>
        <p>You can download or Check your email for a copy</p>
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
                  <strong className="name"> Morin Sultan</strong>
                </span>
                <span className="attendee-email detail">
                  <span className="placeholder">Enter your name</span>
                  <strong className="name"> Morin Sultan</strong>
                </span>
              </div>
              <div className="attendee-ticket">
                <span className="ticket-type detail">
                  <span className="placeholder">Ticket Type:</span>
                  <span className="name"> VIP </span>
                </span>
                <span className="ticket-for detail">
                  <span className="placeholder">Ticket for:</span>
                  <span className="name"> 1</span>
                </span>
              </div>

              <div className="special-request">
                <p>Special request?</p>
                <span>
                  Nil ? Or the users sad story they write in there gets this
                  whole space, Max of three rows
                </span>
              </div>
            </div>
          </div>
          <div className="barcode">
            <img src={barcode} alt="barcode" />
          </div>
        </div>
      </div>

      <div className="new-ticket-container">
        <button className="new-ticket " onClick={handleReset}>
          Book Another Ticket
        </button>
        <button
          className="download-btn"
          aria-label="download-btn"
          onClick={handleDownlaod}
        >
          Download Ticket
        </button>
      </div>
    </>
  );
}

export default App;
