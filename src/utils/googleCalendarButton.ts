
export const setupAgendarCitaRedirection = () => {
  // Direct redirection for "Agendar cita" buttons with updated URL
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const button = target.closest('button, a') as HTMLElement;
    
    if (button && button.textContent?.trim().toLowerCase().includes('agendar cita')) {
      event.preventDefault();
      console.log('Redirecting to Google Calendar...');
      
      // Updated Google Calendar URL as specified
      window.open(
        'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0CSfvvxue3MDVfGyXgfjnhXcsu6XkxEoXnnPXjb3J54puN0BGDnntVlpwPMihC6RTbeQ0j1gRZ?gv=true',
        '_blank',
        'noopener,noreferrer'
      );
    }
  });
};

export const setupGlobalButtonHandler = () => {
  // Remove this function since we only want direct redirection
  console.log('Global button handler disabled - using direct redirection only');
};

// Keep the injection function for compatibility but make it do direct redirection
export const injectGoogleCalendarButton = (targetButton: HTMLElement) => {
  // This function is kept for compatibility but won't be used
  console.log('Direct redirection is now handled globally');
};
