// Team member hover effect
document.addEventListener("DOMContentLoaded", () => {
  const teamMembers = document.querySelectorAll(".team-member");

  // Fade in testimonials when they come into view
  const testimonials = document.querySelectorAll(".testimonial");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  testimonials.forEach((testimonial) => observer.observe(testimonial));
});
