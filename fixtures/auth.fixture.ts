import { test as base, expect, APIRequestContext } from '@playwright/test';

const { BASE_URL, API_USERNAME, PASSWORD } = process.env;

if (!BASE_URL || !API_USERNAME || !PASSWORD) {
  throw new Error('Missing required environment variables: BASE_URL, API_USERNAME, PASSWORD');
}

export interface ApiFixture {
  api: APIRequestContext;
}

export const test = base.extend<ApiFixture>({
  api: async ({ playwright }, use) => {
    const authResponse = await playwright.request.newContext({ baseURL: BASE_URL });

    const tokenRes = await authResponse.post('/auth', {
      data: { username: API_USERNAME, password: PASSWORD },
    });

    expect(tokenRes.status()).toBe(200);
    const { token } = await tokenRes.json();
    expect(token).toBeTruthy();

    await authResponse.dispose();

    const api = await playwright.request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`,
      },
    });

    await use(api);
    await api.dispose();
  },
});

export { expect };
