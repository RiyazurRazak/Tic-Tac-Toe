import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import styles from '../../styles/pages/Login.module.css'
import { baseurl } from '../../utils/baseurl'



function Login() {

    
    const loginHandller= async()=>{
      return  window.open(`${baseurl}/auth/login`,"_self") 
    }


    return (
        <div className={styles.root}>
            <h1>Tic-Tac-Toe</h1>
            <Link to="/single-game"><Button>Single Player</Button></Link>
            <Button onClick={loginHandller} className={styles.btn}>Multi Player</Button>

            <Footer />

        </div>
    )
}

export default Login
