import { useState } from "react";
import "../styles/contact.css";

const isValidName = (value) => (value.match(/[A-Za-z]/g) || []).length >= 2;
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// defined outside the component so it doesn't get recreated on every render
const EMPTY_FORM = {
  fullName: "",
  email: "",
  message: "",
  validation: "",
  business: false,
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //TODO: lost real-time validation
  function validate(data) {
    const e = {};
    if (!isValidName(data.fullName.trim())) e.fullName = "Invalid name";
    if (!isValidEmail(data.email.trim())) e.email = "Invalid email";
    if (!data.message.trim()) e.message = "Invalid message";
    if (!data.validation.trim()) e.validation = "Invalid image validation text";
    return e;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    // (prev) => spread pattern keeps all existing fields and only updates the one that changed
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    // stops the browser from refreshing the page on form submit
    e.preventDefault();
    setErrorMessage("");
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // formspree expects snake_case field names, my state uses camelCase -- this is workaround
    const formData = new FormData();
    formData.append("full_name", form.fullName);
    formData.append("email", form.email);
    formData.append("message", form.message);
    formData.append("validation", form.validation);
    formData.append("business", form.business);
    const res = await fetch("https://formspree.io/f/xdajjzbz", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      setSuccessMessage(
        form.business
          ? `Thank you ${form.fullName} for your business inquery!`
          : `Thank you ${form.fullName} for your message!`,
      );
      setForm(EMPTY_FORM);
      setErrors({});
    } else {
      setErrorMessage("Something went wrong");
    }
  }

  return (
    <>
      <h1>Contact</h1>
      <div className="split-layout">
        <img
          className="validation-img"
          src={`${import.meta.env.BASE_URL}img/bear-validation.jpg`}
          alt="an drawing of a bear complaining"
          width="300"
          height="300"
        />
        <form id="contact-form" onSubmit={handleSubmit}>
          <p className="stacked">
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              id="full-name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
            {/* only renders the error span if there's actually an error for this field */}
            {errors.fullName && (
              <span className="field-error">{errors.fullName}</span>
            )}
          </p>
          <p className="stacked">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </p>
          <p className="stacked">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && (
              <span className="field-error">{errors.message}</span>
            )}
          </p>
          <p className="stacked">
            <label htmlFor="validation">What is the image to the left?</label>
            <input
              type="text"
              id="validation"
              name="validation"
              value={form.validation}
              onChange={handleChange}
            />
            {errors.validation && (
              <span className="field-error">{errors.validation}</span>
            )}
          </p>
          <p>
            <input
              type="checkbox"
              id="business"
              name="business"
              checked={form.business}
              onChange={handleChange}
            />
            <label htmlFor="business">This is a business-related inquery</label>
          </p>
          <p>
            <button className="btn" type="submit">
              Submit
            </button>
          </p>
        </form>
        {successMessage && <div id="success-message">{successMessage}</div>}
        {errorMessage && <div id="error-message">{errorMessage}</div>}
      </div>
    </>
  );
}
