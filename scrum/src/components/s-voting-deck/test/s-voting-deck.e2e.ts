import { newE2EPage } from '@stencil/core/testing';

describe('s-voting-deck', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<s-voting-deck></s-voting-deck>');

    const element = await page.find('s-voting-deck');
    expect(element).toHaveClass('hydrated');
  });
});
