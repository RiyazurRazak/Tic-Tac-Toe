import React from 'react'
import styles from '../styles/components/Square.module.css'

interface Tprops{
    value? : number
    onClick? : ()=>void
    disabled? : boolean
}

function Square({value, onClick, disabled}:Tprops) {
    return (
        <div className={`${styles.root} ${value !== null && styles.disable}`} onClick={onClick}>
            {value}
        </div>
    )
}

export default Square
