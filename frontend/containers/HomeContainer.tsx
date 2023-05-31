import React from 'react';
import { setExampleState } from '../store/appSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import styles from './HomeContainerStyles.module.scss'

export default function HomeContainer() {
  const exampleState = useAppSelector((state) => state.app.exampleState);
  const anotherState = useAppSelector((state) => state.app.anotherState);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1 className={styles.title}>{exampleState}</h1>
      <p>{anotherState}</p>
      <input
        onChange={(event) => {
          dispatch(setExampleState(event.target.value));
        }}></input>
    </div>
  );
}
