import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExampleState } from '../store/appSlice';

export default function MainContainer() {
  const exampleState = useSelector((state) => state.app.exampleState);
  const anotherState = useSelector((state) => state.app.anotherState);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{exampleState}</h1>
      <p>{anotherState}</p>
      <input
        onChange={(event) => {
          dispatch(setExampleState(event.target.value));
        }}></input>
    </div>
  );
}
