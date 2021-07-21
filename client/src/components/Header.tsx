import React from 'react'
import styles from '../styles/components/Header.module.css'


function Header({userData}:any) {

   
    return (
        <div className={styles.root}>
            <div className={styles.box}>
                <h1>X</h1>
                <div className={styles.row}>
                  <img className={styles.avatar} src={userData[0].avatar} alt={userData[0].name}></img>
                  <h1>{userData[0].name.slice(0,8)}...</h1>
                </div>
             
            </div>
            <div className={styles.box}>
                <h1>O</h1>
                <div className={styles.row}>
                  <img className={styles.avatar} src={userData[1].avatar} alt={userData[1].name}></img>
                  <h1>{userData[1].name.slice(0,8)}...</h1>
                </div>
            </div>
        </div>
    )
}

export default Header
