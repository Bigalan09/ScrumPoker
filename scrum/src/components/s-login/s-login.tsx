import { Component, Event, h, EventEmitter } from '@stencil/core';

@Component({
  tag: 's-login',
  styleUrl: 's-login.css',
  shadow: true,
})
export class SLogin {

  @Event({
    eventName: 'joinCompleted',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) joinCompleted: EventEmitter<boolean>;

  join() {
    this.joinCompleted.emit(true);
  }

  render() {
    return (
      <s-button onClick={this.join.bind(this)}>Join</s-button>
    );
  }

}
