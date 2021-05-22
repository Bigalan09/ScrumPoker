import { newE2EPage } from '@stencil/core/testing';

describe('s-voting-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<s-voting-card></s-voting-card>');

    const element = await page.find('s-voting-card');
    expect(element).toHaveClass('hydrated');
  });
});
