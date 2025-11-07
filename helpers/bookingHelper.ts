import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export async function getBookingId(): Promise<number> {
  try {
    const bookingsResponse = await axios.get(`${process.env.BASE_URL}/booking?firstname=John&lastname=Smith`);
    
    if (bookingsResponse.data.length === 0) {
      throw new Error('No bookings found');
    }
    
    return bookingsResponse.data[0].bookingid;
  } catch (error) {
    throw new Error(`Failed to get booking ID: ${error}`);
  }
}