import { test, expect } from '@playwright/test';
import axios from 'axios';
import apiData from '../api-data.json';
import fs from "fs-extra";
import { getBookingId } from '../helpers/bookingHelper';
import { describe } from 'node:test';

const jsonData = { ...apiData } as any;
let booking_id:number;

test.describe.serial('API flow', () => {

test('Authenticate', async () => {


  const response = await axios.post(jsonData.baseURL+'/auth',
    {
      username: jsonData.username,
      password: jsonData.password
    },
     {
      headers: { 'Accept': 'application/json' }
     }
  ).then(function (response) {

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
    const authToken = response.data.token;
    console.log('Auth token:', authToken);
    jsonData.token = authToken;
    fs.writeJSONSync("api-data.json", jsonData);

  })
  .catch(function (error) {
    console.log(error);
  });;

});


test('Get first booking details', async () => {
  
  booking_id = await getBookingId();

  const response = await axios.get(
    jsonData.baseURL+`/booking/${booking_id}`,
    {
      headers: { 'Accept': 'application/json' }
    }
  );

  console.log('Response data:', response.data);

  expect(response.status).toBe(200);
  expect(response.data).toHaveProperty('firstname');
  expect(response.data).toHaveProperty('lastname');
});

test('Update booking', async () => {

  booking_id = await getBookingId();

  const response = await axios.put(jsonData.baseURL+`/booking/${booking_id}`,
    {
      firstname : "Dejan",
      lastname : "Zivanovic",
      totalprice : 132,
      depositpaid : true,
      bookingdates : {
        checkin : "2025-01-01",
        checkout : "2025-01-02"
      },
      additionalneeds : "Breakfast"
    },
     {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json','Cookie': `token=${jsonData.token}` }
      
     }
  );
  console.log('Response data:', response.data);

  expect(response.status).toBe(200);

});

test("Delete booking", async() => {

  booking_id = await getBookingId();

  const response = await axios.delete(jsonData.baseURL+`/booking/${booking_id}`,
     {
      headers: { 'Content-Type': 'application/json', 'Cookie': `token=${jsonData.token}` }
     }
  );
  expect(response.status).toBe(201);

});
});


