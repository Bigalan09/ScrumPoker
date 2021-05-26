import { Component, h, Prop, Host, Watch, Element } from '@stencil/core';

@Component({
  tag: 's-voting-card',
  styleUrl: 's-voting-card.css',
  shadow: false,
})
export class SVotingCard {
  @Element() el: HTMLElement;

  @Prop() value: string;
  @Prop({ reflect: true, mutable: true }) checked?: boolean = false;

  @Watch('checked')
  checkedChanged() {
    console.log({ id: this.value, checked: this.checked });
  }

  handleCheckChange = (event) => {
    this.checked = event.target.checked;
  };


  render() {
    return (
      <Host>
        <div class="card">
          <input type="radio" name="card" id={this.value} onChange={this.handleCheckChange} /><label htmlFor={this.value}>{this.value}</label>
        </div>
      </Host>
    );
  }

}
