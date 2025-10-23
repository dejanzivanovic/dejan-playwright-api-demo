import axios from 'axios';
import apiData from '../api-data.json';

const jsonData = { ...apiData } as any;

export async function getBookingId(): Promise<number> {
  const bookingsResponse = await axios.get(jsonData.baseURL+'/booking'); 
  return bookingsResponse.data[0].bookingid;
}