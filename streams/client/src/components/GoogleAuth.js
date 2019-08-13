import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  // Load method gets the specific sub-library in gapi
  // A callback function is then passed and invoked after the request to get the library is finished
  // The callback function allows us to initialize our auth instance with the api key we generated
  // A promise is then returned, so we use the '.then()' function to chain on some action with the promise
  // In the .then() call we invoke another function which grabs our instance of the previously instantiated authentication
  // We then set our state based off the user sign in status relative to our auth instance
  // Attack a listener to the isSignedIn object that is passed a callback function
  // Callback function updates the signed in state when isSignedIn changes in some way
  // Changes are detected by .listen() function
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1045128074754-bdvoc43svmefs3krurl2cjjjaqd6atin.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon">Sign Out</i>
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon">Sign In</i>
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
