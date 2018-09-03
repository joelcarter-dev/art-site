import React from 'react'
import Svg from '../../img/logo.svg'
import styles from './logo.module.sass'
const Logo = ({ className }) => {
  return (
    <div className={styles.logoHolder}>
      <Svg className={styles.svg}/>
    </div>
  );
};


export default Logo