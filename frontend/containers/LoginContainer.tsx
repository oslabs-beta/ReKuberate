import React, { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginContainerStyles.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setErrorMessage, setLoggedIn } from '../store/appSlice';

export default function LoginContainer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.app.errorMessage);

  useEffect(() => {
    dispatch(setErrorMessage([]));
  }, []);

  //send user's login input to backend to verify their account
  //upon successful login, update loggedIn state to true and navigate to homepage
  //if there is an error, display it and update errorMessage state
  const verifyLogin = async () => {
    const username = (document.getElementById('loginUsername') as HTMLInputElement).value;
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value;

    if (!username || !password)
      dispatch(setErrorMessage([<p className={styles.errorMessage}>Missing username or password</p>]));
    else {
      try {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ createUsername: username, createPassword: password }),
        });
        if (!response.ok) {
          dispatch(setErrorMessage([<p className={styles.errorMessage}>Incorrect username or password</p>]));
          throw new Error('Incorrect username or password');
        } else {
          dispatch(setErrorMessage([]));
          dispatch(setLoggedIn(true));
          navigate('/');
        }
      } catch (err) {
        console.error('Error: ', err);
      }
    }
  };

  //initiate OAuth by sending user to github authorization page with app's client id
  const verifyGithub = () => {
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
          {errorMessage}
          <p>Username</p>
          <input type="text" name="username" id="loginUsername" />
          <p>Password</p>
          <input type="password" name="password" id="loginPassword" />
        </form>
        <button className={styles.loginButton} id="loginButton" onClick={() => verifyLogin()}>
          Login
        </button>
        <button className={styles.githubLogin} id="githubLogin" onClick={() => verifyGithub()}>
          <i className="fa-brands fa-github"></i> Login with Github
        </button>
        <div className="createAccount">
          <Nav.Link as={Link} to="/createAccount">
            Create an account
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}
