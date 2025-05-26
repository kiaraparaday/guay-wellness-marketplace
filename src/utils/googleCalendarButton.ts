

export const injectGoogleCalendarButton = (targetButton: HTMLElement) => {
  // Check if Google Calendar button already exists after this button
  const existingCalendarButton = targetButton.nextElementSibling?.classList.contains('google-calendar-container');
  if (existingCalendarButton) {
    return; // Don't inject if already exists
  }

  // Create container for the Google Calendar button
  const calendarContainer = document.createElement('div');
  calendarContainer.className = 'google-calendar-container mt-4 flex justify-center';
  calendarContainer.id = `calendar-${Date.now()}`; // Unique ID

  // Inject the Google Calendar HTML
  calendarContainer.innerHTML = `
    <!-- Google Calendar Appointment Scheduling begin -->
    <link href="https://calendar.google.com/calendar/scheduling-button-script.css" rel="stylesheet">
    <script src="https://calendar.google.com/calendar/scheduling-button-script.js" async></script>
    <script>
    (function() {
      var target = document.getElementById('${calendarContainer.id}');
      window.addEventListener('load', function() {
        if (window.calendar && window.calendar.schedulingButton) {
          calendar.schedulingButton.load({
            url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0CSfvvxue3MDVfGyXgfjnhXcsu6XkxEoXnnPXjb3J54puN0BGDnntVlpwPMihC6RTbeQ0j1gRZ?gv=true',
            color: '#0F1A30',
            label: 'Programar una cita',
            target: target,
          });
        }
      });
    })();
    </script>
    <!-- end Google Calendar Appointment Scheduling -->
  `;

  // Insert the calendar button after the clicked button
  targetButton.parentNode?.insertBefore(calendarContainer, targetButton.nextSibling);
};

export const setupAgendarCitaRedirection = () => {
  // Handle direct redirection for "Agendar cita" buttons
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const button = target.closest('button, a') as HTMLElement;
    
    if (button && button.textContent?.trim().toLowerCase().includes('agendar cita')) {
      event.preventDefault();
      console.log('Redirecting to Google Calendar for appointment booking');
      window.open(
        'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0CSfvvxue3MDVfGyXgfjnhXcsu6XkxEoXnnPXjb3J54puN0BGDnntVlpwPMihC6RTbeQ0j1gRZ?gv=true',
        '_blank'
      );
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
      
      // Skip if it's an "Agendar cita" button (handled by direct redirection)
      if (buttonElement.textContent?.trim().toLowerCase().includes('agendar cita')) {
        return;
      }
      
      console.log('Button clicked, injecting Google Calendar button');
      injectGoogleCalendarButton(buttonElement);
    }
  });
};

