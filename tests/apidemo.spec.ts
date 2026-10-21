import { test, expect } from '../fixtures/auth.fixture';
import { getBookingId } from '../helpers/bookingHelper';
import { updatedBooking } from '../data/bookingData';

test.describe.serial('API flow', () => {
  let bookingId: number;

  test('Get first booking details', async ({ api }) => {
    bookingId = await getBookingId(api);

    const response = await api.get(`/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      firstname: expect.any(String),
      lastname: expect.any(String),
      totalprice: expect.any(Number),
      depositpaid: expect.any(Boolean),
      bookingdates: {
        checkin: expect.any(String),
        checkout: expect.any(String),
      },
    });
  });

  test('Update booking', async ({ api }) => {
    const response = await api.put(`/booking/${bookingId}`, {
      data: updatedBooking,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject(updatedBooking);
  });

  test('Delete booking', async ({ api }) => {
    const response = await api.delete(`/booking/${bookingId}`);

    expect(response.status()).toBe(201);
  });
});
