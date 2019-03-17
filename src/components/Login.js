import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px grey solid;
  border-radius: 3px;
  width: 300px;
  height: 70vh;
  margin: 1em auto;
`;

const Button = styled.button`
  padding: 0.75em;
  margin-bottom: 0.5em;
  font-size: 1em;
  border-radius: 4px;
  width: 250px;
  text-align: left;

  .text {
    padding-left: 1.5em;
  }
`;

const FacebookButton = styled(Button)`
  background: #3b5998;
  color: #f7f7f7;
`;

const GoogleButton = styled(Button)`
  background: #db4437;
  color: white;
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
  render() {
    return (
      <LoginContainer className="login">
        <h2>Log In</h2>
        <p>Sign in to view the news!</p>
        <FacebookButton className="facebook">
          <FontAwesomeIcon icon={faFacebookF} />
          <span className="text">Sign in with Facebook</span>
        </FacebookButton>
        <GoogleButton className="google">
          <FontAwesomeIcon icon={faGoogle} />
          <span className="text">Sign in with Google</span>
        </GoogleButton>
        <hr />
        <hr />
        <Form className="email-password">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </Form>
        <LoginButton>Log In</LoginButton>
        <p>Don't have an account?</p>
        <a href="">Sign up now</a>
      </LoginContainer>
    );
  }
}

export default Login;
