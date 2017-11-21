import React, {Component} from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

const test1 = require('../testJsonData/test1.json');
const test2 = require('../testJsonData/test2.json');
let count = 0;
const inTest = false;

const autocompleteStyle = {
    display: 'inline-block',
    width: 400
};

const submitButtonStyle = {
    marginLeft: 20,
    display: 'inline-block'
};

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            autoCompleteSource: [],
        };
        this.data = null;
        this.queryText = '';
        this.autoSearchAllowed = false;
        this.autoRequestStarted = false;
        this.submited = false;
        
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    makeRequest(url, query, callback) {
        axios.get(url, query)
            .then(callback)
            .catch(err => {
                console.error(err);
            })
    }

    handleUpdate(searchText) {
        this.setState({
            searchText: searchText
        });

        this.makeRequest(
            this.props.path + 'input',
            {
                params: {
                    q: searchText
                }
            },
            res => {
                let newSource = [];
                for(let placeInfo of res.data) {
                    newSource.push(placeInfo.description);
                }
                this.setState({
                    autoCompleteSource: newSource
                });
            }
        );
    }

    handleClick() {
        if(this.submited) {
            this.setState({
                searchText: ''
            });
            this.submited = false;
        }
    }

    handleSubmit() {
        this.submited = true;
        if(inTest) {
            const data = count === 0 ? test1 : test2;
            this.props.handleSearch(data, 'test' + (count + 1));
            count++;
            return;
        }
        // search text is different with the text used for auto request
        if(this.state.searchText !== this.queryText) {
            this.autoSearchAllowed = true;
            this.sendRequest();
        // auto request finished, need to handle search function by self
        } else if(!this.autoRequestStarted) {
            this.props.handleSearch(this.data, this.location);
        // auto request is running, allow it to handle search function
        } else {
            this.autoSearchAllowed = true;
        }
    }

    // handle click on autocompletion
    handleRequest() {
        if(this.state.searchText.length !== 0) {
            this.sendRequest();
        }
    }

    sendRequest() {
        this.queryText = this.state.searchText;
        this.autoRequestStarted = true;
        this.makeRequest(
            this.props.path + 'search',
            {
                params: {
                    q: this.queryText
                }
            },
            res => {
                this.data = res.data.data;
                this.location = res.data.location;
                console.log(this.data);
                if(this.autoSearchAllowed) {
                    this.props.handleSearch(this.data, this.location);
                    this.autoSearchAllowed = false;
                }
                this.autoRequestStarted = false;
            }
        );
    }
    
    render() {
        return (
            <div>
                <div style={autocompleteStyle}>
                    <AutoComplete
                        hintText="Please enter your place"
                        filter={AutoComplete.noFilter}
                        dataSource={this.state.autoCompleteSource}
                        fullWidth={true}
                        searchText={this.state.searchText}
                        onUpdateInput={this.handleUpdate}
                        onNewRequest={this.handleRequest}
                        onClick={this.handleClick}
                    />
                </div>
                <div style={submitButtonStyle}>

                    <RaisedButton
                        label="Primary"
                        primary={true}
                        onClick={this.handleSubmit}
                    />
                </div>
            </div>
        )
    }
}

export default InputForm;