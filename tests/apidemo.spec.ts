import { test, expect } from '../fixtures/auth.fixture';
import { getBookingId } from '../helpers/bookingHelper';

let booking_id: number;

test.describe.serial('API flow', () => {


test('Get first booking details', async ({ api }) => {
  try {
    booking_id = await getBookingId();
    const response = await api.get(`/booking/${booking_id}`);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('firstname');
    expect(response.data).toHaveProperty('lastname');
    
  } catch (error) {
    throw new Error(`Failed to get booking details: ${error}`);
  }
});

test('Update booking', async ({ api }) => {
  try {
    const response = await api.put(`/booking/${booking_id}`, {
      firstname: "Dejan",
      lastname: "Zivanovic",
      totalprice: 132,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-01-01",
        checkout: "2025-01-02"
      },
      additionalneeds: "Breakfast"
      
    });
   

    expect(response.status).toBe(200);
  } catch (error) {
    throw new Error(`Failed to update booking: ${error}`);
  }
});

test("Delete booking", async ({ api }) => {
  try {
    
    const response = await api.delete(`/booking/${booking_id}`);
    
    expect(response.status).toBe(201);
  } catch (error) {
    throw new Error(`Failed to delete booking: ${error}`);
  }
});
});


