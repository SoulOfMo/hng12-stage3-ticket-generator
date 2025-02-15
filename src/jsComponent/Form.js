import { AttendeeDetails } from "./AttendeeDetails";
import { TicketSelcection } from "./TicketSelcection";

export function Form({
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
