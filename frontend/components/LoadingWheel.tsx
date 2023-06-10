import React from 'react';
import style from './LoadingWheel.module.scss';
import wheel from '../../assets/wheel.png';
import { useAppSelector } from '../store/hooks';

export default function LoadingWheel() {
  const loading = useAppSelector((state) => state.app.loading);
  return (
    <>
      <img className={style.loading} src={wheel} style={{ display: loading }}></img>
    </>
  );
}
