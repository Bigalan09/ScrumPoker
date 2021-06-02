import { newSpecPage } from '@stencil/core/testing';
import { SDashboard } from '../s-dashboard';

describe('s-dashboard', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SDashboard],
      html: `<s-dashboard></s-dashboard>`,
    });
    expect(page.root).toEqualHtml(`
      <s-dashboard>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </s-dashboard>
    `);
  });
});
