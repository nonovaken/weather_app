import React from 'react';
import styles from '../styles/LocationAndData.css'

function LocationAndDate(props) {
    const dayMap = ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const time = props.time;
    const date =
        monthMap[time.getMonth()] + ' ' +
        time.getDate() + ', ' +
        dayMap[time.getDay()] + ', ' +
        (time.getHours() % 12) + ' ' +
        (time.getHours() > 12 ? 'PM' : 'AM');
    return (
        <div>
            <div style={styles.locationStyle}>
                {props.location}
            </div>
            <div style={styles.infoStyle}>{date}, {props.summary}</div>
        </div>
    );
}

export default LocationAndDate;