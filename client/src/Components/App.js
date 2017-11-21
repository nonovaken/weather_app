import React from 'react';
import InputForm from './InputForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CardArea from './CardArea';

// import { Anchor } from 'antd';
// const { Link } = Anchor;

const testData = require('../testJsonData/test2.json');
const testLocation = 'Los Angeles, CA';
const serverPath = 'http://localhost:3001/';

const boardStyle = {
    margin: 'auto',
    width: 900
};
const inputFormStyle = {
    margin: 'auto',
    width: 600
};
const cardAreaStyle = {
    marginTop: 20
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            location: null,
            items: [
                {
                    location: 'instruction',
                    data: 'indtruction',
                    expanded: true,
                    mouseOver: false
                },
                {
                    location: testLocation,
                    data: testData,
                    expanded: false,
                    mouseOver: false
                }
            ]
        };
        this.itemLimit = 6;

        this.handleCardSelect = this.handleCardSelect.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(data, location) {
        const newItem = {
            location: location,
            data: data,
            expanded: true,
            mouseOver: false
        };
        const items = [newItem];

        this.state.items.forEach((item) => {
           if(newItem.location && newItem.location !== item.location) {
               item.expanded = false;
               items.push(item);
           }
        });

        this.setState({
            items: items.slice(0, this.itemLimit)
        });
    }

    handleRemove(index) {
        let items = [];

        this.state.items.forEach((item, i) => {
            if(index !== i) {
                items.push(item);
            }
        });

        this.setState({
            items: items
        });
    }

    handleCardSelect(index, expanded) {
        const items = this.state.items;

        console.log(index);

        if(expanded) {
            items.forEach((item, i) => {
                item.expanded = i === index;
            });
        } else {
            items[index].expanded = false;
        }

        this.setState({
            items: items
        });
    }

    handleMouseOver(index) {
        const items = this.state.items;

        items.forEach((item, i) => {
            item.mouseOver = index === i;
        });

        this.setState({
            items: items
        });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div className="board" style={boardStyle}>
                        <div style={inputFormStyle}>
                            <InputForm
                                path = {serverPath}
                                handleSearch={this.handleSearch}
                            />
                        </div>
                        <div style={cardAreaStyle}>
                            <CardArea
                                items = {this.state.items}
                                handleCardSelect = {this.handleCardSelect}
                                handleRemove = {this.handleRemove}
                                handleMouseOver = {this.handleMouseOver}
                            />
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
