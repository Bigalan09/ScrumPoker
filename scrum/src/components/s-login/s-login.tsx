import { Component, Event, h, EventEmitter, State, Prop } from '@stencil/core';

@Component({
  tag: 's-login',
  styleUrl: 's-login.css',
  shadow: false,
})
export class SLogin {
  @State() username: string;
  @State() roomId: string;
  @State() joining: boolean;

  @Prop() firebase: any;

  @Event({
    eventName: 'joinCompleted',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) joinCompleted: EventEmitter<any>;

  handleSubmit(e) {
    e.preventDefault();
    this.joining = true;
    this.firebase.auth().signInAnonymously()
      .then(() => {
        // Signed in..
        this.joinCompleted.emit({
          username: this.username,
          roomId: this.roomId,
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.joining = false;
        // ...
      });
  }

  handleUsernameChange(event) {
    this.username = event.target.value;

    if (event.target.validity.typeMismatch) {
      console.log('this element is not valid')
    }
  }

  handleRoomIdChange(event) {
    this.roomId = event.target.value;

    if (event.target.validity.typeMismatch) {
      console.log('this element is not valid')
    }
  }

  render() {
    return (
      <form class="flex flex-wrap mt-6 justify-center" onSubmit={(e) => this.handleSubmit(e)}>
        <div class="w-full md:w-4/6">
          <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">Name</label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" autocomplete="off" id="username" type="text" disabled={this.joining} readOnly={this.joining} value={this.username} required onInput={(e) => this.handleUsernameChange(e)} placeholder="Your name" />
            </div><div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" htmlFor="roomid">Room ID <span class="italic">(Optional)</span></label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="roomid" type="text" value={this.roomId}  disabled={this.joining} readOnly={this.joining} onInput={(e) => this.handleRoomIdChange(e)} placeholder="------" />
            </div>
            <div class="mb-6">
              <s-button type="submit" variant="tertiary" disabled={this.joining}>Join</s-button>
            </div>
          </div>
        </div>
      </form>
    );
  }

}
