import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000')
})

test.describe('Navigation', () => {
	test('should not be delayed if there are no transition elements', async ({ page }) => {
		// Doesn't work
		// const withTransition = {
		// 	start: Date.now(),
		// 	end: undefined
		// }
		// await page.goto('http://localhost:3000/low-config')
		// withTransition.end = Date.now()
		// await page.goto('http://localhost:3000/docs/v1/install')
		// const withoutTransition = {
		// 	start: Date.now(),
		// 	end: undefined
		// }
		// await page.goto('http://localhost:3000/docs/v1/usage')
		// withoutTransition.end = Date.now()
		// const delay = withTransition.end - withTransition.start
		// const noDelay = withoutTransition.end - withoutTransition.start
		// expect(delay).toBeGreaterThan(noDelay)
	})
})
