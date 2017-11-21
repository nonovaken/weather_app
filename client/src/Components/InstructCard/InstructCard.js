import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton';
import WelcomeNote from './WelcomeNote';
import styles from '../styles/PlaceCard.css';

class InstructCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleSelectorChange = this.handleSelectorChange.bind(this);
        this.handleExpandChange = this.handleExpandChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

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

        console.log(this.props.mouseOver);
        let removeButton = null;
        if(this.props.mouseOver && !this.props.expanded) {
            removeButton = (
                <IconButton
                    iconClassName="material-icons"
                    iconstyle={styles.iconStyle}
                    style={styles.buttonStyle}
                    onClick={this.handleClick}
                    disableTouchRipple={true}
                >
                    cancel
                </IconButton>
            )
        }

        return (
            <div id='row-container' onMouseOver={this.handleMouseOver}>
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
                            <WelcomeNote/>
                        </CardHeader>

                        <CardText id='card-text' style={styles.cardTextStyle} expandable = {true}>
                            More instruction
                        </CardText>
                    </Card>
                </div>
                {removeButton}

            </div>
        )
    };
}

export default InstructCard;