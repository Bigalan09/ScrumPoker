import { newE2EPage } from '@stencil/core/testing';

describe('s-dashboard', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<s-dashboard></s-dashboard>');

    const element = await page.find('s-dashboard');
    expect(element).toHaveClass('hydrated');
  });
});
