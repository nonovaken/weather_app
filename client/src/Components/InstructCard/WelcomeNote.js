import React from 'react';
import Title from './Title';
import styles from '../styles/DataArea.css';

function WelcomeNote() {
    return (
        <div style={styles.cardStyle}>
            <div>
                <Title/>
            </div>
            <div style={styles.mainDataStyle}>
                Instruction
            </div>
        </div>
    )
}

export default WelcomeNote;