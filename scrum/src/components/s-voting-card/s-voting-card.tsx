import { Component, h, Prop, Host, Event, EventEmitter } from '@stencil/core';

export interface InputChangeEventDetail {
  checked?: boolean;
  value?: string;
}

@Component({
  tag: 's-voting-card',
  styleUrl: 's-voting-card.css',
  shadow: false,
})
export class SVotingCard {
  @Prop() disabled?: boolean;
  @Prop({ reflect: true, mutable: true }) checked?: boolean = false;
  @Prop({ mutable: true }) value: string = '?';

  @Event() selected!: EventEmitter<InputChangeEventDetail>;

  emitChange() {
    this.selected.emit({ value: this.value, checked: this.checked });
  }
  handleCheckChange = (event) => {
    this.checked = event.target.checked;
    this.emitChange();
  };

  render() {
    return (
      <Host>
        <div class="card">
          <input
            type="radio"
            name="vote"
            id={this.value}
            onChange={this.handleCheckChange}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
          /><label htmlFor={this.value}>{this.value}</label>
        </div>
      </Host>
    );
  }

}
