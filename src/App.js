import { useState, useEffect } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import logo from "./assests/images/logo.png";
import cloudDownload from "./assests/images/cloud-download.svg";
import envelope from "./assests/images/envelope.png";
import ticketimage from "./assests/images/ticket-image.png";
import barcode from "./assests/images/bar-code.png";

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_upload_preset");
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dynbufh4j/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

function App() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [selectedTicket, setSelectedTicket] = useState("Regular");
  const [noOfTickets, setNoOfTickets] = useState(1);

  const [formData, setFormData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    return (
      storedData || {
        fullName: "",
        email: "",
        avatar: "",
        request: "",
      }
    );
  });

  const [avatar, setAvatar] = useState(null);
  // const handleAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const avatarURL = URL.createObjectURL(file);
  //     setAvatar(avatarURL);
  //     setFormData({ ...formData, avatar: avatarURL });
  //   }
  // };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const avatarURL = await uploadImageToCloudinary(file);

      if (avatarURL) {
        setAvatar(avatarURL);
        setFormData({ ...formData, avatar: avatarURL });
      } else {
        alert("Failed to upload image. Please try again.");
      }
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
    setFormData({
      fullName: "",
      email: "",
      avatar: "",
    });
    setAvatar("");
    localStorage.removeItem("formData");
  }

  function handleSelectedTicket(e) {
    e.preventDefault();
    setSelectedTicket(e.target.value);
    console.log(e.target.value);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        handleSelectedTicket={handleSelectedTicket}
        selectedTicket={selectedTicket}
        noOfTickets={noOfTickets}
        setNoOfTickets={setNoOfTickets}
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
  handleSelectedTicket,
  selectedTicket,
  noOfTickets,
  setNoOfTickets,
}) {
  return (
    <div className="form-container">
      <div className="step-details">
        <h1>
          {(step === 1 && "Ticket Selection") ||
            (step === 2 && "Attendee Details") ||
            (step === 3 && "Ready")}
        </h1>
        <p>Step {step}/3</p>
      </div>
      <hr className={`progress-bar step-${step}`} />
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
          handleSelectedTicket={handleSelectedTicket}
          selectedTicket={selectedTicket}
          noOfTickets={noOfTickets}
          setNoOfTickets={setNoOfTickets}
        />
      )}
      {step === 3 ? (
        <Ticket
          handleReset={handleReset}
          handleDownlaod={handleDownlaod}
          avatar={avatar}
          selectedTicket={selectedTicket}
          noOfTickets={noOfTickets}
          formData={formData}
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
  handleSelectedTicket,
  selectedTicket,
  noOfTickets,
  setNoOfTickets,
}) {
  return (
    <form>
      <div className="steps">
        {step === 1 ? (
          <TicketSelcection
            handleSelectedTicket={handleSelectedTicket}
            selectedTicket={selectedTicket}
            noOfTickets={noOfTickets}
            setNoOfTickets={setNoOfTickets}
          />
        ) : (
          ""
        )}
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
          {step === 2 && "Back"}
          {step === 1 && "Cancel"}
        </button>
        <button className="next" onClick={handleNextStep}>
          {step === 2 &&
            `Get My ${
              selectedTicket === "Regular" || selectedTicket === undefined
                ? "Free"
                : selectedTicket
            } Ticket`}
          {step === 1 && "Next"}
        </button>
      </div>
    </form>
  );
}

function TicketSelcection({
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

function TicketButton({
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
        <textarea
          id="request"
          name="request"
          placeholder="Textarea"
          value={formData.request}
          onChange={handleChange}
        ></textarea>
      </div>
    </>
  );
}

function Ticket({
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

export default App;
