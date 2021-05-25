import { newSpecPage } from '@stencil/core/testing';
import { SLogin } from '../s-login';

describe('s-login', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SLogin],
      html: `<s-login></s-login>`,
    });
    expect(page.root).toEqualHtml(`
      <s-login>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </s-login>
    `);
  });
});
