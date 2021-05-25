import { newE2EPage } from '@stencil/core/testing';

describe('s-login', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<s-login></s-login>');

    const element = await page.find('s-login');
    expect(element).toHaveClass('hydrated');
  });
});
