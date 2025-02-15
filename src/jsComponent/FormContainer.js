import { Ticket } from "./Ticket";
import { Form } from "./Form";

export function FormContainer({
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
