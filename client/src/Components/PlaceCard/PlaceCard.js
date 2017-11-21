import React, {Component} from 'react';
import DataArea from './DataArea';
import SelectorArea from '../SelectorArea';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton';
import styles from '../styles/PlaceCard.css';

const imgs = {
    'clear-day': require('../../weather-icon/clear-day.png'),
    'clear-night': require('../../weather-icon/clear-night.png'),
    'fog': require('../../weather-icon/fog.png'),
    'partly-cloudy-day': require('../../weather-icon/partly-cloudy-day.png'),
    'partly-cloudy-night': require('../../weather-icon/partly-cloudy-night.png'),
    'rain-night': require('../../weather-icon/rain-night.png'),
    'sleet': require('../../weather-icon/sleet.png'),
    'snow': require('../../weather-icon/snow.png'),
    'wind': require('../../weather-icon/wind.png')
};

class PlaceCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forecastType: 'currently',
            data: {
                currently: this.props.data.currently,
                currentlyDetail: {
                    temperatureMin: this.props.data.daily.data[0].temperatureMin,
                    temperatureMax: this.props.data.daily.data[0].temperatureMax,
                    sunriseTime: this.props.data.daily.data[0].sunriseTime,
                    sunsetTime: this.props.data.daily.data[0].sunsetTime
                },
                hourly: this.props.data.hourly,
                daily: this.props.data.daily,
            },
            displayData: this.props.data.currently
        };

        this.handleSelectorChange = this.handleSelectorChange.bind(this);
        this.handleExpandChange = this.handleExpandChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);

    }

    // place card only
    handleSelectorChange(type, index) {
        let data = null;
        if(type === 'currently') {
            data = this.state.data[type];
        } else if(this.state.data.hasOwnProperty(type)){
            data = this.state.data[type].data[index];
        } else {
            console.error("Error: invalid selector type '" + type + "'");
            return;
        }

        this.setState({
            displayData: data,
            forecastType: type
        });
    }

    handleClick() {
        this.props.handleRemove(this.props.index);
    }

    handleExpandChange(expanded) {
        if(!expanded) {
            this.setState({
                displayData: this.props.data.currently
            })
        }
        this.props.handleCardSelect(this.props.index, expanded);
    };

    handleMouseOver() {
        this.props.handleMouseOver(this.props.index);
    }

    render() {
        /*
        Desplay remove button when mouse is over current card
         */

        let removeButton = null;
        if(this.props.mouseOver && !this.props.expanded) {
            removeButton = (
                <IconButton
                    iconClassName="material-icons"
                    iconStyle={styles.iconStyle}
                    style={styles.buttonStyle}
                    onClick={this.handleClick}
                    disableTouchRipple={true}
                >
                    cancel
                </IconButton>
            )
        }

        return (
            <div id='row-container' style={styles.rowContainerStyle} onMouseOver={this.handleMouseOver}>
                <div id='card-container' style={styles.cardContainerStyle}>
                    <Card
                        expanded={this.props.expanded}
                        onExpandChange={this.handleExpandChange}
                        style={styles.cardStyle}
                    >
                        <CardHeader
                            actAsExpander = {true}
                            style={styles.cardHeaderStyle}
                        >
                            <DataArea
                                location = {this.props.location}
                                displayData = {this.state.displayData}
                                currentData = {this.state.data.currently}
                                forecastType = {this.state.forecastType}
                                currentlyDetail = {this.state.data.currentlyDetail}
                                imgs = {imgs}
                                style={styles.dataAreaStyle}
                            />
                        </CardHeader>

                        <CardText id='card-text' style={styles.cardTextStyle} expandable = {true}>
                            <SelectorArea
                                handleSelectorChange = {this.handleSelectorChange}
                                data = {this.state.data}
                                imgs = {imgs}
                            />
                        </CardText>
                    </Card>
                </div>
                {removeButton}

            </div>
        )
    };
}

export default PlaceCard;