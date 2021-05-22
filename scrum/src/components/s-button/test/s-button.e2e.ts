import { newE2EPage } from '@stencil/core/testing';

describe('s-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<s-button></s-button>');

    const element = await page.find('s-button');
    expect(element).toHaveClass('hydrated');
  });
});
