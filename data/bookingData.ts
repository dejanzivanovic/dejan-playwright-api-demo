import { Booking } from '../types/booking';

export const updatedBooking: Booking = {
  firstname: 'Dejan',
  lastname: 'Zivanovic',
  totalprice: 132,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-01-01',
    checkout: '2025-01-02',
  },
  additionalneeds: 'Breakfast',
};
