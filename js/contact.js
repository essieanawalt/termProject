// references
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const validationInput = document.getElementById("validation");
const isBusinessInquery = document.getElementById("contact-type");

const fullNameError = document.getElementById("full-name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const validationError = document.getElementById("validation-error");

const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

const btnSubmit = document.getElementById("btn-submit");

// helpers
const isValidName = (value) => (value.match(/[A-Za-z]/g) || []).length >= 2;
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// connect to the dom
btnSubmit.addEventListener("click", (event) => submit(event));

// connect to the dom with live feedback
fullName.addEventListener("input", () => {
  if (!isValidName(fullName.value.trim())) {
    fullNameError.textContent = "Invalid name";
  } else {
    fullNameError.textContent = "";
  }
});
email.addEventListener("input", () => {
  if (!isValidEmail(email.value.trim())) {
    emailError.textContent = "Invalid email";
  } else {
    emailError.textContent = "";
  }
});

// submit form with validaiton
function submit(event) {
  event.preventDefault();
}
