import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./jsComponent/Header";
import { FormContainer } from "./jsComponent/FormContainer";

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
    // console.error("Error uploading image:", error);
    return null;
  }
};

function App() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [selectedTicket, setSelectedTicket] = useState("Regular");
  const [noOfTickets, setNoOfTickets] = useState(1);
  const [avatar, setAvatar] = useState(null);

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
        setErrors({ ...errors, avatar: "Failed to upload image. Try Again" });
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

export default App;
