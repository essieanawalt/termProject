// references
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const validationInput = document.getElementById("validation");
const isBusinessInquery = document.getElementById("business");

const fullNameError = document.getElementById("full-name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const validationError = document.getElementById("validation-error");

const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

const btnSubmit = document.getElementById("btn-submit");
const contactForm = document.getElementById("contact-form");

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

  errorMessage.innerHTML = "";

  // form validation
  const errors = [
    !isValidName(fullName.value.trim()) ? "Invalid name" : null,
    !isValidEmail(email.value.trim()) ? "Invalid email" : null,
    message.value.trim().length < 1 ? "Invalid message" : null,
    validationInput.value.trim().length < 1
      ? "Invalid image validation text"
      : null,
  ].filter((error) => error != null);

  // if errors exist, fail with validation list
  if (errors.length > 0) {
    const errorsList = document.createElement("ul");
    errors
      .map((error) => {
        const li = document.createElement("li");
        li.textContent = error;
        return li;
      })
      .map((li) => errorsList.appendChild(li));

    errorMessage.appendChild(errorsList);
    return;
  }

  // send to formspree
  sendForm();
}

function sendForm() {
  fetch("https://formspree.io/f/xdajjzbz", {
    method: "POST",
    body: new FormData(contactForm),
    headers: { Accept: "application/json" },
  }).then((res) => {
    if (res.ok) {
      successfulMessage();
      contactForm.reset();
    } else {
      errorMessage.textContent = "Something went wrong";
    }
  });
}

function successfulMessage() {
  // successful contact form submitted
  if (isBusinessInquery.checked) {
    successMessage.innerHTML = `Thank you ${fullName.value} for your business inquery!`;
  } else {
    successMessage.innerHTML = `Thank you ${fullName.value} for your message!`;
  }
}
