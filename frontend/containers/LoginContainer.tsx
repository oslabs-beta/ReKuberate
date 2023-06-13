import React from 'react';
import { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginContainerStyles.module.scss';
import { useAppDispatch } from '../store/hooks';
import { setLoggedIn } from '../store/appSlice';

export default function LoginContainer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const verifyLogin = async () => {
    const username = (document.getElementById('loginUsername') as HTMLInputElement).value;
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value;
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ createUsername: username, createPassword: password }),
      });
      if (!response.ok) {
        throw new Error(`Incorrect username or password`);
      } else {
        dispatch(setLoggedIn(true));
        navigate('/');
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  };

  const verifyGithub = () => {
    //initiate OAuth
    console.log('test github');
    const CLIENT_ID = '4661c408155c78af4f09';
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID);
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginInput}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            verifyLogin();
          }}
        >
          <p>Username</p>
          <input type="text" name="username" id="loginUsername" />
          <p>Password</p>
          <input type="password" name="password" id="loginPassword" />
          <button id="loginButton" onClick={() => verifyLogin()}>
            Login
          </button>
          <button id="githubLogin" onClick={() => verifyGithub()}>
            Login with Github
          </button>
        </form>
        <div className="createAccount">
          <Nav.Link as={Link} to="/createAccount">
            Create an account
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}
