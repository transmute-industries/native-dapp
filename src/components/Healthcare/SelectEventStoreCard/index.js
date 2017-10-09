import React, { Component } from 'react';
import { Picker, Button, Card, CardItem, Body, Text } from 'native-base';
// import { Card, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
// import RaisedButton from 'material-ui/RaisedButton';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import {
    updateSelectedContract,
    createEventStore,
} from '../../../actions/transmute';

export class SelectEventStoreCard extends Component {
    state = {
        value: null
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.transmute.selectedContract) {
            this.setState({
                value: nextProps.transmute.selectedContract
            });
        }
    }
    render() {
        return (
            <Card>
                <CardItem header>
                    Event Store
                    <Button block
                        style={{ float: 'right' }}
                        label="New Store"
                        secondary={true}
                        onTouchTap={() => {
                            this.props.dispatch(
                                createEventStore(this.props.transmute.defaultAddress)
                            );
                        }}
                    />
                </CardItem>
                <CardItem>
                    <Picker
                        mode="dropdown"
                        placeholder="Event Store"
                        selectedValue={this.state.value}
                        onValueChange={(event, index, value) => {
                            this.setState({ value });
                            this.props.dispatch(
                                updateSelectedContract(
                                    value,
                                    this.props.transmute.defaultAddress
                                )
                            );
                        }}
                        style={{ width: '100%' }}
                    >
                        {
                            this.props.transmute.RBACFactory &&
                            this.props.transmute.RBACFactory.model &&
                            Object.keys(this.props.transmute.RBACFactory.model).map((address) => {
                                return (
                                    <Picker.Item key={address} value={address} label={address} />
                                );
                            })
                        }
                    </Picker>
                </CardItem>
            </Card>
        );
    }
}

export default connect((state) => ({
    transmute: state.transmute
}))(SelectEventStoreCard);