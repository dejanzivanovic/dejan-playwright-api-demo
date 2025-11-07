import axios from 'axios';
import apiData from '../api-data.json' with { type: 'json' };

const jsonData = { ...apiData } as any;

export async function getBookingId(): Promise<number> {
  try {
    const bookingsResponse = await axios.get(`${jsonData.baseURL}/booking?firstname=John&lastname=Smith`);
    
    if (bookingsResponse.data.length === 0) {
      throw new Error('No bookings found');
    }
    
    return bookingsResponse.data[0].bookingid;
  } catch (error) {
    throw new Error(`Failed to get booking ID: ${error}`);
  }
}