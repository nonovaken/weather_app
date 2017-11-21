import React from 'react';
import styles from '../styles/LocationAndData.css';

function Title(props) {
    return (
        <div>
            <div style={styles.locationStyle}>
                Welcome!
            </div>
            <div style={styles.infoStyle}>Here is some instruction about how to use this web site</div>
        </div>
    );
}

export default Title;