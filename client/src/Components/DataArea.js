import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const background = require('../Asset/Image/clear-sky.png');
const icons = {
    sunrise: require('../Asset/detail-icons/sunrise.png'),
    sunset: require('../Asset/detail-icons/sunset.png'),
    wind: require('../Asset/detail-icons/wind.png'),
    precip: require('../Asset/detail-icons/precip.png')
};

const mainColor = 'black';
const subColor = '#9E9E9E';
const dayMap = ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function LocationAndDate(props) {
    const locationStyle = {
        fontSize: 27,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        color: mainColor
    };
    const infoStyle = {
        fontSize: 16,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        color: subColor,
        marginTop: 2
    };
    const time = props.time;
    const date =
        monthMap[time.getMonth()] + ' ' +
        time.getDate() + ', ' +
        dayMap[time.getDay()] + ', ' +
        (time.getHours() % 12) + ' ' +
        (time.getHours() > 12 ? 'PM' : 'AM');
    return (
        <div>
            <div style={locationStyle}>
                {props.location}
            </div>
            <div style={infoStyle}>{date}, {props.summary}</div>
        </div>
    );
}

function MainData(props) {
    const currentTempStyle = {
        padding: 8,
        fontSize: 60,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        color: mainColor
    };
    const rangeTempStyle = {
        position: 'relative',
        paddingTop: 14,
        fontSize: 16,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        color: subColor
        // background: '#DCE775'
    };
    const maxTempStyle = {
        height: 26
    };
    const imgContainerStyle = {
        flexGrow: 1
    };
    const imgStyle = {
        margin: 'auto',
        width: 60,
        height: 60,
        paddingTop: 14,
        paddingBottom: 10,
        // background: '#DCE775'
    };
    const ditailStyle = {
        marginLeft: 80
    };
    const flexContainerStyle = {
        display: 'flex'
    };
    const iconContainerStyle = {
        margin: 0
    };
    const arrowStyle = {
        top: 7
    };

    const data = props.data;
    const tempMin = Math.round(data.temperatureMin || props.detail.temperatureMin) + '\xB0';
    const tempMax = Math.round(data.temperatureMax || props.detail.temperatureMax) + '\xB0';
    const temp = Math.round(data.temperature || data.temperatureMax) + '\xB0';

    return (
        <div id='main-data' style={flexContainerStyle}>
                <div style={imgContainerStyle}>
                    <img alt='' style={imgStyle} src={props.imgs[data.icon.toString()]}/>
                </div>
                <div style={currentTempStyle}>
                    {temp}
                </div>

                <div style={rangeTempStyle}>
                    <div style={maxTempStyle}>
                        <span>
                            <FontIcon className="material-icons" style={arrowStyle}>
                                arrow_drop_up
                            </FontIcon>
                        </span>
                        <span>
                            {tempMax}
                        </span>
                    </div>
                    <div>
                        <span>
                            <FontIcon className="material-icons" style={arrowStyle}>
                                arrow_drop_down
                            </FontIcon>
                        </span>
                        <span>
                            {tempMin}
                        </span>
                    </div>
                </div>
                <div style={ditailStyle}>
                    <Detail
                        data={data}
                        detail={props.detail}
                    />
                </div>
        </div>
    )
}

function Detail(props) {
    const detailStyle = {
        display: 'flex',
        marginTop: 12
    };
    const textStyle = {
        fontSize: 15,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        paddingTop: 10,
        color: mainColor
    };
    const iconStyle = {
        width: 13,
        height: 13,
        marginRight: 8
    };
    const sunIconStyle = {
        width: 13,
        height: 13,
        marginRight: 8,
    };
    const colStyle = {
        marginRight: 15
    };
    const data = props.data;
    const sunriseTime = genTime(new Date((data.sunriseTime || props.detail.sunriseTime) * 1000));
    const sunsetTime = genTime(new Date((data.sunsetTime || props.detail.sunsetTime) * 1000));
    const precip = Math.round(data.precipIntensity * 100) + '%';


    return (
        <div id='detail' style={detailStyle}>
            <div style={colStyle}>
                <div style={textStyle}>
                    <span><img alt='icon' src={icons.precip} style={iconStyle}/></span>
                    <span>Precip:   </span>
                    <span>{precip}</span>
                </div>
                <div style={textStyle}>
                    <span><img alt='icon' src={icons.wind} style={iconStyle}/></span>
                    <span>Wind:   </span>
                    <span>{data.windSpeed} MPH</span>
                </div>
            </div>
            <div>
                <div style={textStyle}>
                    <span><img alt='icon' src={icons.sunrise} style={sunIconStyle}/></span>
                    <span>Sunrise:   </span>
                    <span>{sunriseTime}</span>
                </div>
                <div style={textStyle}>
                    <span><img alt='icon' src={icons.sunset} style={sunIconStyle}/></span>
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

function DataArea(props) {
    const cardStyle = {
        // backgroundColor: '#00BCD4',
        paddingTop: 0,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    };
    const mainDataStyle = {
        display: 'inline-block',

        backgroundSize: 10000,
        width: 300
    };
    const detailStyle = {
        margin: 'auto',
        display: 'inline-block',
    };
    const dataAreaStyle = {
        height: 150
    };
    const flexContainerStyle = {
        display: 'flex',
        height: 160,
    };

    const data = props.displayData;
    const time = new Date(data.time * 1000);

    return (
        <div style={cardStyle}>
            <div>
                <LocationAndDate
                    location = {props.location}
                    time = {time}
                    summary = {data.summary}
                />
            </div>
            <div style={mainDataStyle}>
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