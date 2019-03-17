import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
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

  .text {
    padding-left: 1.5em;
  }
`;

const FacebookButton = styled(Button)`
  background: #3b5998;
  color: #f7f7f7;
  cursor: pointer;
  transition: all 0.3s ease-out;

  :hover {
    background: #f7f7f7;
    color: #3b5998;
  }
`;

const GoogleButton = styled(Button)`
  background: #db4437;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-out;

  :hover {
    background: white;
    color: #db4437;
  }
`;

const LoginButton = styled(Button)`
  background: dodgerblue;
  color: white;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 250px;
  padding: 0.75em;
  font-size: 1em;
  margin: 0.25em 0;
`;

class Login extends React.Component {
  state = {
    email: null,
    password: null,
    uid: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    await base.post('user', {
      data: authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <LoginContainer className="login">
        <h2>Log In</h2>
        <p>Sign in using existing profiles</p>
        <FacebookButton
          className="facebook"
          onClick={() => this.authenticate('Facebook')}
        >
          <FontAwesomeIcon icon={faFacebookF} />
          <span className="text">Continue with Facebook</span>
        </FacebookButton>
        <GoogleButton
          className="google"
          onClick={() => this.authenticate('Google')}
        >
          <FontAwesomeIcon icon={faGoogle} />
          <span className="text">Continue with Google</span>
        </GoogleButton>

        <p>Or enter email and password</p>
        <Form className="email-password">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={this.handleInputChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleInputChange}
          />
        </Form>
        <LoginButton>Log In</LoginButton>
        <p>Don't have an account?</p>
        <a href="">Sign up now</a>
      </LoginContainer>
    );
  }
}

export default Login;
