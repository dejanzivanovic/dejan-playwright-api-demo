import { APIRequestContext } from '@playwright/test';

export async function getBookingId(api: APIRequestContext): Promise<number> {
  const response = await api.get('/booking', {
    params: { firstname: 'John', lastname: 'Smith' },
  });

  const bookings = await response.json();

  if (!Array.isArray(bookings) || bookings.length === 0) {
    throw new Error('No bookings found for John Smith');
  }

  return bookings[0].bookingid;
}
