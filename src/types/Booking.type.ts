export interface Booking {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  tour: {
    _id: string;
    title: string;
    images?: string[]
  };
  payment?: {
    _id: string;
    status: string;
    amount: number;
  };
  guestCount: number;
  status: BookingStatus;
  createdAt: string;
}

export const BOOKING_STATUS = {
  PENDING: "PENDING",
  CANCEL: "CANCEL",
  COMPLETE: "COMPLETE",
  FAILED: "FAILED",
} as const;

export type BookingStatus = keyof typeof BOOKING_STATUS;

