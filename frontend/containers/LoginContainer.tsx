import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './LoginContainerStyles.module.scss';

export default function LoginContainer() {
  const navigate = useNavigate();
  const verifyLogin = async () => {
    const loginUsername = (document.getElementById('loginUsername') as HTMLInputElement).value;
    const loginPassword = (document.getElementById('loginPassword') as HTMLInputElement).value;
    try {
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      if (!response.ok) throw new Error(`Incorrect username or password`);
      else {
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
          <a href="#">Create an account</a>
        </div>
      </div>
    </div>
  );
}
