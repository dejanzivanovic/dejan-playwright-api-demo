import { test as base, expect } from '@playwright/test';
import axios, { AxiosResponse, AxiosInstance } from 'axios';
import apiData from '../api-data.json' with { type: 'json' };
import fs from 'fs-extra';

export interface AuthFixture {
  authToken: string;
  api: AxiosInstance;
}

export const test = base.extend<AuthFixture>({
  authToken: async ({}, use) => {
    try {
      const response: AxiosResponse = await axios.post(`${apiData.baseURL}/auth`, {
        username: apiData.username,
        password: apiData.password
      }, {
        headers: { 'Accept': 'application/json' }
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('token');
      
      const token = response.data.token;
      const updatedData = { ...apiData, token };
      fs.writeJSONSync("api-data.json", updatedData);
      
      await use(token);
    } catch (error) {
      throw new Error(`Authentication failed: ${error}`);
    }
  },
  
  api: async ({ authToken }, use) => {
    const authenticatedApi = axios.create({
      baseURL: apiData.baseURL,
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