import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewAccountContainerStyles.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setErrorMessage, setLoggedIn } from '../store/appSlice';

export default function CreateAccount() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.app.errorMessage);

  useEffect(() => {
    dispatch(setErrorMessage([]));
  }, []);

  const verifyNewAccount = async () => {
    const username = (document.getElementById('createUsername') as HTMLInputElement).value;
    const password = (document.getElementById('createPassword') as HTMLInputElement).value;

    if (!username || !password)
      dispatch(setErrorMessage([<p className={styles.errorMessage}>Missing username or password</p>]));
    else {
      try {
        const response = await fetch(`/api/user/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ createUsername: username, createPassword: password }),
        });
        if (!response.ok) {
          dispatch(setErrorMessage([<p className={styles.errorMessage}>Username already exists</p>]));
          throw new Error(`Invalid input`);
        } else {
          dispatch(setLoggedIn(true));
          navigate('/');
        }
      } catch (err) {
        console.error('Error: ', err);
      }
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
          {errorMessage}
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
