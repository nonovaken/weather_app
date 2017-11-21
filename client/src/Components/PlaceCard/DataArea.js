import React from 'react';
import styles from '../styles/DataArea.css';
import LocationAndDate from './LocationAndDate';
import MainData from './MainData';

function DataArea(props) {

    const data = props.displayData;
    const time = new Date(data.time * 1000);

    return (
        <div style={styles.cardStyle}>
            <div>
                <LocationAndDate
                    location = {props.location}
                    time = {time}
                    summary = {data.summary}
                />
            </div>
            <div style={styles.mainDataStyle}>
                <MainData
                    data = {data}
                    detail = {props.currentlyDetail}
                    imgs = {props.imgs}
                    location = {props.location}
                />
            </div>
        </div>

    )
}

export default DataArea;