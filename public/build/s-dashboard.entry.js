import { r as registerInstance, h } from './index-9f98b401.js';

const sDashboardCss = ":host{display:block}";

const SDashboard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.loggedin = false;
    this.username = '';
    this.userId = '';
  }
  async componentWillLoad() {
    this.firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        if (this.username) {
          this.writeUserData(user.uid, this.username);
          this.loggedin = true;
          this.userId = user.uid;
        }
        else {
          const userData = await this.getUserData(user.uid);
          if (userData) {
            this.username = userData.username;
            this.loggedin = true;
            this.userId = user.uid;
          }
        }
      }
      else {
        this.userId = null;
        this.username = null;
        this.loggedin = false;
      }
    });
  }
  writeUserData(userId, name) {
    this.firebase.database().ref('users/' + userId).set({
      username: name,
    });
  }
  getUserData(userId) {
    const dbRef = this.firebase.database().ref();
    return dbRef.child("users").child(userId).get().then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      else {
        return null;
      }
    }).catch((error) => {
      console.error(error);
      return null;
    });
  }
  joinCompletedEventHandler(event) {
    this.username = event.detail.username;
  }
  render() {
    return (h("div", null, this.loggedin ?
      h("div", { class: "flex flex-wrap mt-4" }, h("div", { class: "w-full md:w-1/6 px-1" }, h("h2", { class: "text-xl font-semibold" }, "Players"), h("ul", { class: "list-inside list-disc" }, h("li", null, this.username))), h("div", { class: "w-full md:flex-1 px-1" }, h("s-voting-deck", null)), h("div", { class: "w-full md:w-1/5 px-1" }, h("s-button", { variant: "primary" }, "Start Voting"), h("s-button", { variant: "secondary" }, "Finish Voting")))
      :
        h("s-login", { firebase: this.firebase })));
  }
};
SDashboard.style = sDashboardCss;

export { SDashboard as s_dashboard };
