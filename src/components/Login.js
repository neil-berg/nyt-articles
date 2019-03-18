import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faFacebookF,
  faTwitter,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px lightgrey solid;
  border-radius: 3px;
  width: 300px;
  height: 75vh;
  margin: 1em auto;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  padding: 0.75em;
  margin-bottom: 0.5em;
  font-size: 1em;
  border-radius: 4px;
  width: 250px;
  text-align: left;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-out;

  .text {
    padding-left: 1.5em;
  }
`;

const FacebookButton = styled(Button)`
  background: #3b5998;
  color: #f7f7f7;

  :hover {
    background: #f7f7f7;
    color: #3b5998;
  }
`;

const GoogleButton = styled(Button)`
  background: #db4437;
  color: white;

  :hover {
    background: white;
    color: #db4437;
  }
`;

const TwitterButton = styled(Button)`
  background: #1da1f2;
  color: white;

  :hover {
    background: white;
    color: #1da1f2;
  }
`;

const GithubButton = styled(Button)`
  background: #24292e;
  color: white;

  :hover {
    background: white;
    color: #24292e;
  }
`;

class Login extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    await base.post(`users/${authData.user.uid}/name`, {
      data: authData.user.displayName
    });

    // Store the user in local storage for refresh persistence
    localStorage.setItem('nf-user', JSON.stringify(authData.user));

    // Pass the user info up to App-level state
    this.props.retrieveUserInfo(authData.user);

    // Redirect to Home page
    this.props.history.push('/');
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  render() {
    return (
      <LoginContainer className="login">
        <h2>Log In</h2>
        <p>Sign in using existing profiles</p>
        <FacebookButton onClick={() => this.authenticate('Facebook')}>
          <FontAwesomeIcon icon={faFacebookF} />
          <span className="text">Continue with Facebook</span>
        </FacebookButton>
        <GoogleButton onClick={() => this.authenticate('Google')}>
          <FontAwesomeIcon icon={faGoogle} />
          <span className="text">Continue with Google</span>
        </GoogleButton>
        <TwitterButton onClick={() => this.authenticate('Twitter')}>
          <FontAwesomeIcon icon={faTwitter} />
          <span className="text">Continue with Twitter</span>
        </TwitterButton>
        <GithubButton onClick={() => this.authenticate('Github')}>
          <FontAwesomeIcon icon={faGithub} />
          <span className="text">Continue with Github</span>
        </GithubButton>
      </LoginContainer>
    );
  }
}

export default Login;
