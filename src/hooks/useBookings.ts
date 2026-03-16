import { useState, useCallback } from "react";
import type { Booking } from "../types";
import { demoBookings } from "../data/demo";

let globalBookings = [...demoBookings];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function useBookings() {
  const [, setTick] = useState(0);
  const rerender = useCallback(() => setTick((t) => t + 1), []);

  useState(() => {
    listeners.add(rerender);
    return () => listeners.delete(rerender);
  });

  const addBooking = useCallback((booking: Booking) => {
    globalBookings = [booking, ...globalBookings];
    notify();
  }, []);

  const updateBooking = useCallback((id: string, updates: Partial<Booking>) => {
    globalBookings = globalBookings.map((b) =>
      b.id === id ? { ...b, ...updates } : b,
    );
    notify();
  }, []);

  const isTimeSlotBooked = useCallback(
    (date: string, timeSlot: string, staffId?: string) => {
      return globalBookings.some(
        (b) =>
          b.date === date &&
          b.timeSlot === timeSlot &&
          b.status !== "cancelled" &&
          (!staffId || b.staffId === staffId),
      );
    },
    [],
  );

  return {
    bookings: globalBookings,
    addBooking,
    updateBooking,
    isTimeSlotBooked,
  };
}
