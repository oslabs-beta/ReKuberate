import React from 'react';
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
      const response = await fetch(`/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginUsername: username, loginPassword: password }),
      });
      if (!response.ok) throw new Error(`Incorrect username or password`);
      else {
        dispatch(setLoggedIn(true));
        navigate('/home');
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginInput}>
        <p>Username</p>
        <input type="text" name="username" id="loginUsername" />
        <p>Password</p>
        <input type="password" name="password" id="loginPassword" />
        <button id="loginButton" onClick={() => verifyLogin()}>
          Login
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
