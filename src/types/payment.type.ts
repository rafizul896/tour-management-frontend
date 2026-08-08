import { Booking } from "./Booking.type";

 export interface PaymentGatewayData {
  card_type?: string;
  card_issuer?: string;
  bank_tran_id?: string;
  tran_date?: string;
}

export type PaymentWithInvoice = NonNullable<Booking["payment"]> & {
  paymentGatewayData?: PaymentGatewayData;
  invoiceUrl?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface PaymentRow {
  booking: Booking;
  payment: PaymentWithInvoice;
}
