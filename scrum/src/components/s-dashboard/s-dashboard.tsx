import { Component, h, Listen, Prop, Host, State } from '@stencil/core';

@Component({
  tag: 's-dashboard',
  styleUrl: 's-dashboard.css',
  shadow: false,
})
export class SDashboard {
  @State() loading: boolean = true;
  @State() loggedin: boolean = false;
  @State() username: string = '';
  @State() roomId: string = '';
  @State() userId: string = '';

  @Prop() firebase: any;

  async componentWillLoad() {
    this.loading = true;
    this.firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        if (this.username) {
          await this.writeUserData(user.uid, this.username);
          this.loggedin = true;
          this.userId = user.uid;
        } else {
          const userData = await this.getUserData(user.uid);
          if (userData) {
            this.username = userData.username;
            this.loggedin = true;
            this.userId = user.uid;
          }
        }
      } else {
        this.userId = null;
        this.username = null;
        this.loggedin = false;
      }
      this.loading = false;
    });
  }

  async writeUserData(userId, name) {
    await this.firebase.firestore().collection('users').doc(userId).add({
      username: name,
    });
  }

  getUserData(userId) {
    const docRef = this.firebase.firestore().collection("users").doc(userId);

    return docRef.get().then((doc) => {
      if (doc.exists) {
        return snapshot.data();
      } else {
        return null;
      }
    }).catch((error) => {
      console.error(error);
      return null;
    });
  }

  @Listen('joinCompleted')
  joinCompletedEventHandler(event: CustomEvent<any>) {
    this.username = event.detail.username;
    this.roomId = event.detail.roomId;
  }

  render() {
    return (
      <Host>
        {this.loading ?
          <div>
            Loading...
        </div> :
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
        }
      </Host>
    );
  }

}
