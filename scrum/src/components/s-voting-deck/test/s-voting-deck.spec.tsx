import { newSpecPage } from '@stencil/core/testing';
import { SVotingDeck } from '../s-voting-deck';

describe('s-voting-deck', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SVotingDeck],
      html: `<s-voting-deck></s-voting-deck>`,
    });
    expect(page.root).toEqualHtml(`
      <s-voting-deck>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </s-voting-deck>
    `);
  });
});
