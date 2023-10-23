import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Home from '../page'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () =>
      new Promise((resolve) => resolve({ userId: 'user_asdf34234asfa' })),
    ClerkProvider: ({ children }: any) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_asdf34234asfa',
        fullName: 'Molly Ringwald',
      },
    }),
  }
})

test('Home', async () => {
  render(await Home())

  expect(
    screen.getByText('MoodLens, Your Ultimate Writing Companion')
  ).toBeTruthy()
})

test('Get started button should be enabled and display get started', async () => {
  render(await Home())
  
	expect(screen.getByRole('button')).toBeEnabled

  await userEvent.click(screen.getByRole('button', { name: /Get Started/i }))
	
})
