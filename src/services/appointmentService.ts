
import { addDays, format, isSameDay, startOfDay } from "date-fns";

// Mock data for available time slots
// In a real app, this would come from an API

// Helper to generate dates for next 14 days
const generateDates = (startDate: Date, numberOfDays: number) => {
  return Array.from({ length: numberOfDays }, (_, i) => addDays(startDate, i));
};

// Helper to create time slots with availability
interface TimeSlot {
  time: string;
  available: boolean;
}

// Generate available dates for the next 14 days
const availableDates = generateDates(new Date(), 14);

// Mock data for available time slots
// This would normally come from a backend API
const mockTimeSlots: Record<string, TimeSlot[]> = {};

// Fill in mock data for time slots
availableDates.forEach((date) => {
  const dateKey = format(date, "yyyy-MM-dd");
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  
  // No slots on weekends
  if (day === 0 || day === 6) {
    mockTimeSlots[dateKey] = [];
    return;
  }
  
  // Generate slots for weekdays
  const slots: TimeSlot[] = [
    { time: "09:00", available: Math.random() > 0.3 },
    { time: "10:00", available: Math.random() > 0.3 },
    { time: "11:00", available: Math.random() > 0.3 },
    { time: "12:00", available: Math.random() > 0.3 },
    { time: "13:00", available: false }, // Lunch break
    { time: "14:00", available: Math.random() > 0.3 },
    { time: "15:00", available: Math.random() > 0.3 },
    { time: "16:00", available: Math.random() > 0.3 },
    { time: "17:00", available: Math.random() > 0.3 },
  ];
  
  mockTimeSlots[dateKey] = slots;
});

export const getAvailableDates = (): Date[] => {
  return availableDates;
};

export const getTimeSlots = (date: Date): TimeSlot[] => {
  const dateKey = format(date, "yyyy-MM-dd");
  return mockTimeSlots[dateKey] || [];
};

export const isDateAvailable = (date: Date): boolean => {
  const dateKey = format(date, "yyyy-MM-dd");
  const slots = mockTimeSlots[dateKey] || [];
  return slots.some(slot => slot.available);
};

export const getFirstAvailableDate = (): Date | null => {
  const available = availableDates.find(date => isDateAvailable(date));
  return available || null;
};

export const formatAppointmentDate = (date: Date, time: string): string => {
  return `${format(date, "EEEE, d 'de' MMMM 'de' yyyy")} a las ${time}`;
};
