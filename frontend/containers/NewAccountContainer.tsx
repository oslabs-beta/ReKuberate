import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './NewAccountContainerStyles.module.scss';
import { useAppDispatch } from '../store/hooks';
import { setLoggedIn } from '../store/appSlice';

export default function CreateAcount() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const verifyNewAccount = async () => {
    const username = (document.getElementById('createUsername') as HTMLInputElement).value;
    const password = (document.getElementById('createPassword') as HTMLInputElement).value;
    try {
      const response = await fetch(`/api/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ createUsername: username, createPassword: password }),
      });
      if (!response.ok) throw new Error(`Invalid input`);
      else {
        dispatch(setLoggedIn(true));
        navigate('/');
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  };

  return (
    <div className={styles.create}>
      <div className={styles.createInput}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            verifyNewAccount();
          }}
        >
          <p>Username</p>
          <input type="text" name="username" id="createUsername" />
          <p>Password</p>
          <input type="password" name="password" id="createPassword" />
          <button id="loginButton" onClick={() => verifyNewAccount()}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
