import { test as base, expect } from '@playwright/test';
import axios, { AxiosResponse, AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();


export interface AuthFixture {
  authToken: string;
  api: AxiosInstance;
}

export const test = base.extend<AuthFixture>({
  authToken: async ({}, use) => {
    try {
      const response: AxiosResponse = await axios.post(`${process.env.BASE_URL}/auth`, {
        username: process.env.API_USERNAME,
        password: process.env.PASSWORD
      }, {
        headers: { 'Accept': 'application/json' }
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('token');
      
      await use(response.data.token);
    } catch (error) {
      throw new Error(`Authentication failed: ${error}`);
    }
  },
  
  api: async ({ authToken }, use) => {
    const authenticatedApi = axios.create({
      baseURL: process.env.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${authToken}`
      }
    });
    
    await use(authenticatedApi);
  }
});

export { expect };