import { useState } from "react";
import "../styles/contact.css";

const isValidName = (value) => (value.match(/[A-Za-z]/g) || []).length >= 2;
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// outside the component = not recreated on every render
const EMPTY_FORM = {
  fullName: "",
  email: "",
  message: "",
  validation: "",
  business: false,
};

function validate(data) {
  const e = {};
  if (!isValidName(data.fullName.trim())) e.fullName = "Invalid name";
  if (!isValidEmail(data.email.trim())) e.email = "Invalid email";
  if (!data.message.trim()) e.message = "Invalid message";
  if (!data.validation.trim()) e.validation = "Invalid image validation text";
  return e;
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState({});

  function handleBlur(e) {
    const { name } = e.target;
    // spread so I don't overwrite other fields
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };
    setForm(newForm);
    // only re-validate if they've already touched this field
    if (touched[name]) {
      const fieldErrors = validate(newForm);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  }

  async function handleSubmit(e) {
    // prevent default page refresh on submit
    e.preventDefault();
    setErrorMessage("");
    const allTouched = Object.fromEntries(
      Object.keys(EMPTY_FORM).map((k) => [k, true]),
    );
    setTouched(allTouched);
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // formspree wants snake_case, my state is camelCase
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
      setTouched({});
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
          alt="a drawing of a bear complaining"
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
              onBlur={handleBlur}
            />
            {/* only show if there's an error for this field */}
            {touched.fullName && errors.fullName && (
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
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
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
              onBlur={handleBlur}
            />
            {touched.message && errors.message && (
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
              onBlur={handleBlur}
            />
            {touched.validation && errors.validation && (
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
      </div>
      {successMessage && <div id="success-message">{successMessage}</div>}
      {errorMessage && <div id="error-message">{errorMessage}</div>}
    </>
  );
}
