
export const injectGoogleCalendarButton = (targetButton: HTMLElement) => {
  // Check if Google Calendar button already exists after this button
  const existingCalendarButton = targetButton.nextElementSibling?.classList.contains('google-calendar-container');
  if (existingCalendarButton) {
    return; // Don't inject if already exists
  }

  // Create container for the Google Calendar button
  const calendarContainer = document.createElement('div');
  calendarContainer.className = 'google-calendar-container mt-4 flex justify-center';

  // Create simple calendar link with Guay button styling
  const calendarLink = document.createElement('a');
  calendarLink.href = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0CSfvvxue3MDVfGyXgfjnhXcsu6XkxEoXnnPXjb3J54puN0BGDnntVlpwPMihC6RTbeQ0j1gRZ?gv=true';
  calendarLink.target = '_blank';
  calendarLink.rel = 'noopener noreferrer';
  calendarLink.className = 'inline-flex items-center justify-center gap-2 h-12 px-6 py-3 rounded-full text-base bg-[#131F36] text-white hover:bg-[#131F36]/90 font-quicksand font-medium transition-colors';
  calendarLink.textContent = 'Agendar una cita';

  calendarContainer.appendChild(calendarLink);

  // Insert the calendar button after the clicked button
  targetButton.parentNode?.insertBefore(calendarContainer, targetButton.nextSibling);
};

export const setupAgendarCitaRedirection = () => {
  // Replace "Agendar cita" buttons with simple calendar redirect link
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const button = target.closest('button, a') as HTMLElement;
    
    if (button && button.textContent?.trim().toLowerCase().includes('agendar cita')) {
      event.preventDefault();
      console.log('Replacing button with simple calendar redirect link');
      
      // Hide the original button
      button.style.display = 'none';
      
      // Check if Google Calendar button already exists after this button
      const existingCalendarButton = button.nextElementSibling?.classList.contains('google-calendar-container');
      if (existingCalendarButton) {
        return; // Don't inject if already exists
      }
      
      // Create container for the Google Calendar button
      const calendarContainer = document.createElement('div');
      calendarContainer.className = 'google-calendar-container mt-4 flex justify-center';
      
      // Create simple calendar link with Guay button styling
      const calendarLink = document.createElement('a');
      calendarLink.href = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0CSfvvxue3MDVfGyXgfjnhXcsu6XkxEoXnnPXjb3J54puN0BGDnntVlpwPMihC6RTbeQ0j1gRZ?gv=true';
      calendarLink.target = '_blank';
      calendarLink.rel = 'noopener noreferrer';
      calendarLink.className = 'inline-flex items-center justify-center gap-2 h-12 px-6 py-3 rounded-full text-base bg-[#A2C73F] text-white hover:bg-[#A2C73F]/90 font-quicksand font-medium transition-colors';
      calendarLink.textContent = 'Agendar una cita';

      calendarContainer.appendChild(calendarLink);
      
      // Insert the calendar button after the clicked button
      button.parentNode?.insertBefore(calendarContainer, button.nextSibling);
    }
  });
};

export const setupGlobalButtonHandler = () => {
  // Add global click handler for all buttons
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    
    // Check if clicked element is a button or has button role
    if (
      target.tagName === 'BUTTON' || 
      target.closest('button') || 
      target.getAttribute('role') === 'button' ||
      target.classList.contains('google-calendar-container') // Exclude calendar buttons
    ) {
      const buttonElement = target.tagName === 'BUTTON' 
        ? target 
        : target.closest('button') as HTMLElement;
      
      // Skip if it's already a Google Calendar button or if no button found
      if (!buttonElement || buttonElement.classList.contains('google-calendar-container')) {
        return;
      }
      
      // Skip if it's an "Agendar cita" button (handled by direct replacement)
      if (buttonElement.textContent?.trim().toLowerCase().includes('agendar cita')) {
        return;
      }
      
      console.log('Button clicked, injecting Google Calendar button');
      injectGoogleCalendarButton(buttonElement);
    }
  });
};
