import { describe, expect, it, jest } from '@jest/globals';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('../auth-lib/auth', () => ({
  auth: jest.fn(),
}));

const { redirect } = require('next/navigation') as typeof import('next/navigation');
const { default: Page } = require('../app/page') as typeof import('../app/page');
const { auth } = require('../auth-lib/auth') as typeof import('../auth-lib/auth');
const mockedAuth = auth as unknown as jest.MockedFunction<() => Promise<null>>;

describe('Page', () => {
  it('redirects unauthenticated users to sign in', async () => {
    mockedAuth.mockResolvedValue(null);

    await Page();

    expect(redirect).toHaveBeenCalledWith('/auth/login?callbackUrl=/dashboards/ecommerce');
  });
});
