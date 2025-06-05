
// A simple event bus implementation for cross-component communication
type EventCallback<T = any> = (data: T) => void;

class EventBus {
  private events: Record<string, EventCallback[]> = {};

  // Subscribe to an event
  subscribe<T>(event: string, callback: EventCallback<T>): () => void {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback as EventCallback);

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
  publish<T>(event: string, data: T): void {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  // Clear all event listeners
  clear(): void {
    this.events = {};
  }
}

// Create and export singleton instances for different features
export const filterEventBus = new EventBus();
