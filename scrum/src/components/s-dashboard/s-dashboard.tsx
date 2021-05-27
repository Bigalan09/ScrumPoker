import { Component, h, Listen, Prop, State } from '@stencil/core';

@Component({
  tag: 's-dashboard',
  styleUrl: 's-dashboard.css',
  shadow: false,
})
export class SDashboard {
  @State() loggedin: boolean = false;
  @State() username: string = '';
  @State() userId: string = '';
  @Prop() firebase: any;

  componentWillLoad() {
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = null;
        this.username = null;
        this.loggedin = false;
      }
    });
  }

  @Listen('joinCompleted')
  joinCompletedEventHandler(event: CustomEvent<any>) {
    this.loggedin = true;
    this.username = event.detail.username;
  }

  render() {
    return (
      <div>
        {this.loggedin ?
          <div class="flex flex-wrap mt-4">
            <div class="w-full md:w-1/6 px-1">
              <h2 class="text-xl font-semibold">Players</h2>
              <ul class="list-inside list-disc">
                <li>{this.username}</li>
              </ul>
            </div>
            <div class="w-full md:flex-1 px-1">
              <s-voting-deck></s-voting-deck>
            </div>
            <div class="w-full md:w-1/5 px-1">
              <s-button variant="primary">Start Voting</s-button>
              <s-button variant="secondary">Finish Voting</s-button>
            </div>
          </div>
          :
            <s-login firebase={this.firebase}></s-login>
        }
      </div>
    );
  }

}
