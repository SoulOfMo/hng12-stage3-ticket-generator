import cloudDownload from "../assests/images/cloud-download.svg";
import envelope from "../assests/images/envelope.png";

export function AttendeeDetails({
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
          maxLength={100}
        ></textarea>
      </div>
    </>
  );
}
