
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
            color: '#039BE5',
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
  // Replace "Agendar cita" buttons with Google Calendar scheduling widget
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const button = target.closest('button, a') as HTMLElement;
    
    if (button && button.textContent?.trim().toLowerCase().includes('agendar cita')) {
      event.preventDefault();
      console.log('Replacing button with Google Calendar scheduling widget');
      
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
      calendarContainer.id = `calendar-agendar-${Date.now()}`; // Unique ID
      
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
                color: '#039BE5',
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
