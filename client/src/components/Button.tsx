import React from 'react'
import styles from '../styles/components/Button.module.css'

interface Tprops{
    children : string
    onClick? : ()=>void
    className? : string
}

function Button({children, onClick, className}: Tprops) {
    return (
        <div>
          <button onClick={onClick} className={`${styles.root} ${className}`}>
            {children}
          </button>
        </div>
    )
}

export default Button
