import React from 'react';
import styles from '../styles/Detail.css'

const icons = {
    sunrise: require('../../Asset/detail-icons/sunrise.png'),
    sunset: require('../../Asset/detail-icons/sunset.png'),
    wind: require('../../Asset/detail-icons/wind.png'),
    precip: require('../../Asset/detail-icons/precip.png')
};

function Detail(props) {
    const data = props.data;
    const sunriseTime = genTime(new Date((data.sunriseTime || props.detail.sunriseTime) * 1000));
    const sunsetTime = genTime(new Date((data.sunsetTime || props.detail.sunsetTime) * 1000));
    const precip = Math.round(data.precipIntensity * 100) + '%';


    return (
        <div id='detail' style={styles.detailStyle}>
            <div style={styles.colStyle}>
                <div style={styles.textStyle}>
                    <span><img alt='icon' src={icons.precip} style={styles.iconStyle}/></span>
                    <span>Precip:   </span>
                    <span>{precip}</span>
                </div>
                <div style={styles.textStyle}>
                    <span><img alt='icon' src={icons.wind} style={styles.iconStyle}/></span>
                    <span>Wind:   </span>
                    <span>{data.windSpeed} MPH</span>
                </div>
            </div>
            <div>
                <div style={styles.textStyle}>
                    <span><img alt='icon' src={icons.sunrise} style={styles.sunIconStyle}/></span>
                    <span>Sunrise:   </span>
                    <span>{sunriseTime}</span>
                </div>
                <div style={styles.textStyle}>
                    <span><img alt='icon' src={icons.sunset} style={styles.sunIconStyle}/></span>
                    <span>Sunset:   </span>
                    <span>{sunsetTime}</span>
                </div>
            </div>
        </div>
    )
}

function genTime(time) {
    const hour = time.getHours() % 12;
    const minute = time.getMinutes() % 60;
    const period = time.getHours() > 12 ? 'PM' : 'AM';

    return hour + ':' + minute + ' ' + period;
}

export default Detail;