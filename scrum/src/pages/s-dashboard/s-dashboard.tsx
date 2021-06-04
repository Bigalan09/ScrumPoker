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
  @State() db: any;
  @State() history: string[] = [];

  @Prop() firebase: any;

  async componentWillLoad() {
    this.loading = true;
    this.db = this.firebase.firestore();
    this.firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user.uid);
      }
      /*
      if (user) {
        if (this.username) {
          await this.writeUserData(user.uid, this.username, this.roomId);
          this.userId = user.uid;
        } else {
          const userData = await this.getUserData(user.uid);
          if (userData) {
            this.username = userData.username;
            this.userId = user.uid;
            this.loggedin = true;
          }
        }
      } else {
        this.userId = null;
        this.username = null;
        this.loggedin = false;
      }
      */
      this.rtdb_and_local_fs_presence();
      this.fs_listen_online();
      this.loading = false;
    });

  }

  async writeUserData(userId, name, roomId) {
    await this.db.collection('users').doc(userId).set({
      username: name,
    });

    const joinRoom = this.firebase.functions().httpsCallable('joinRoom');
    joinRoom({ roomId: roomId })
      .then((result) => {
        this.roomId = result.data;
        this.loggedin = true;
        if (this.roomId) {
          this.db.collection("rooms").doc(this.roomId)
            .onSnapshot((doc) => {
              console.log("Current data: ", doc.data());
            });
        }
      })
      .catch(err => console.error(err));
  }

  getUserData(userId) {
    const docRef = this.db.collection("users").doc(userId);

    return docRef.get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    }).catch((error) => {
      console.error(error);
      return null;
    });
  }

  rtdb_presence() {
    // [START rtdb_presence]
    // Fetch the current user's ID from Firebase Authentication.
    var uid = this.firebase.auth().currentUser.uid;

    // Create a reference to this user's specific status node.
    // This is where we will store data about being online/offline.
    var userStatusDatabaseRef = this.firebase.database().ref('/status/' + uid);

    // We'll create two constants which we will write to 
    // the Realtime database when this device is offline
    // or online.
    var isOfflineForDatabase = {
      state: 'offline',
      last_changed: this.firebase.database.ServerValue.TIMESTAMP,
    };

    var isOnlineForDatabase = {
      state: 'online',
      last_changed: this.firebase.database.ServerValue.TIMESTAMP,
    };

    // Create a reference to the special '.info/connected' path in 
    // Realtime Database. This path returns `true` when connected
    // and `false` when disconnected.
    this.firebase.database().ref('.info/connected').on('value', function (snapshot) {
      // If we're not currently connected, don't do anything.
      if (snapshot.val() == false) {
        return;
      };

      // If we are currently connected, then use the 'onDisconnect()' 
      // method to add a set which will only trigger once this 
      // client has disconnected by closing the app, 
      // losing internet, or any other means.
      userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
        // The promise returned from .onDisconnect().set() will
        // resolve as soon as the server acknowledges the onDisconnect() 
        // request, NOT once we've actually disconnected:
        // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

        // We can now safely set ourselves as 'online' knowing that the
        // server will mark us as offline once we lose connection.
        userStatusDatabaseRef.set(isOnlineForDatabase);
      });
    });
    // [END rtdb_presence]
  }

  rtdb_and_local_fs_presence() {
    // [START rtdb_and_local_fs_presence]
    // [START_EXCLUDE]
    var uid = this.firebase.auth().currentUser.uid;
    var userStatusDatabaseRef = this.firebase.database().ref('/status/' + uid);

    var isOfflineForDatabase = {
      state: 'offline',
      last_changed: this.firebase.database.ServerValue.TIMESTAMP,
    };

    var isOnlineForDatabase = {
      state: 'online',
      last_changed: this.firebase.database.ServerValue.TIMESTAMP,
    };

    // [END_EXCLUDE]
    var userStatusFirestoreRef = this.firebase.firestore().doc('/status/' + uid);

    // Firestore uses a different server timestamp value, so we'll 
    // create two more constants for Firestore state.
    var isOfflineForFirestore = {
      state: 'offline',
      last_changed: this.firebase.firestore.FieldValue.serverTimestamp(),
    };

    var isOnlineForFirestore = {
      state: 'online',
      last_changed: this.firebase.firestore.FieldValue.serverTimestamp(),
    };

    this.firebase.database().ref('.info/connected').on('value', function (snapshot) {
      if (snapshot.val() == false) {
        // Instead of simply returning, we'll also set Firestore's state
        // to 'offline'. This ensures that our Firestore cache is aware
        // of the switch to 'offline.'
        userStatusFirestoreRef.set(isOfflineForFirestore);
        return;
      };

      userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
        userStatusDatabaseRef.set(isOnlineForDatabase);

        // We'll also add Firestore set here for when we come online.
        userStatusFirestoreRef.set(isOnlineForFirestore);
      });
    });
    // [END rtdb_and_local_fs_presence]
  }

  fs_listen_online() {
    // [START fs_onsnapshot_online]
    this.firebase.firestore().collection('status')
      .where('state', '==', 'online')
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            var msg = 'User ' + change.doc.id + ' is online.';
            console.log(msg);
            // [START_EXCLUDE]
            this.history.push(msg);
            // [END_EXCLUDE]
          }
          if (change.type === 'removed') {
            var msg = 'User ' + change.doc.id + ' is offline.';
            console.log(msg);
            // [START_EXCLUDE]
            this.history.push(msg);
            // [END_EXCLUDE]
          }
        });
      });
    // [END fs_onsnapshot_online]
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
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" autocomplete="off" id="roomid" type="text" readOnly={true} value={this.roomId} />
                  <s-button variant="primary">Start Voting</s-button>
                  <s-button variant="secondary">Finish Voting</s-button>
                </div>
              </div>
              :
              <s-login firebase={this.firebase}></s-login>
            }
            {this.history}
          </div>
        }
      </Host>
    );
  }

}
