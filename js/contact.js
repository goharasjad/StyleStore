// Form validation and feedback
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form form");
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("focused");
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const button = form.querySelector("button");
    button.textContent = "Sending...";

    setTimeout(() => {
      button.textContent = "Message Sent!";

      setTimeout(() => {
        alert("Your message has been sent successfully!");
        window.location.reload();
      }, 2000);
    }, 1000);
  });
});
