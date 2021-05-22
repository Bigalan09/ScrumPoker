import { newSpecPage } from '@stencil/core/testing';
import { SVotingCard } from '../s-voting-card';

describe('s-voting-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SVotingCard],
      html: `<s-voting-card></s-voting-card>`,
    });
    expect(page.root).toEqualHtml(`
      <s-voting-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </s-voting-card>
    `);
  });
});
