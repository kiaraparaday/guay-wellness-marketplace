
// Google Calendar integration utilities
// This file provides functionality for Google Calendar button interactions

export const setupGlobalButtonHandler = () => {
  console.log("Setting up global button handlers");
  // Global button handler setup logic here
};

export const setupAgendarCitaRedirection = () => {
  console.log("Setting up Agendar cita redirection");
  // Setup direct redirection for "Agendar cita" buttons
  const buttons = document.querySelectorAll('button, a');
  buttons.forEach(button => {
    if (button.textContent && button.textContent.toLowerCase().includes('agendar')) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/appointment';
      });
    }
  });
};
