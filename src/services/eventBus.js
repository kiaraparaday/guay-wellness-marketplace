
// A simple event bus implementation for cross-component communication

class EventBus {
  constructor() {
    this.events = {};
  }

  // Subscribe to an event
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);

    // Return an unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
      
      // Clean up empty event arrays
      if (this.events[event].length === 0) {
        delete this.events[event];
      }
    };
  }

  // Publish an event with data
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  // Clear all event listeners
  clear() {
    this.events = {};
  }
}

// Create and export singleton instances for different features
export const filterEventBus = new EventBus();
