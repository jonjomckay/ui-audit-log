import React, { Component } from 'react';
import { groupBy } from 'ramda';
import { Button, ButtonToolbar, Col, Fade, Grid, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import DayPicker, { DateUtils } from 'react-day-picker';
import Progress from 'react-progress-2';
import { format } from 'date-fns';

import EventContainer from './EventContainer';
import { listUsers, searchEvents } from './EventSource';
import { eventTypes } from './EventTypes';
import Select from './Select';

import 'react-day-picker/lib/style.css';
import 'react-progress-2/main.css'

const token = process.env.REACT_APP_TOKEN;

const defaultFilters = {
    filterDateRange: {
        from: '',
        to: ''
    },
    filterTypes: [],
    filterUsers: [],
};

class App extends Component {
    state = {
        ...defaultFilters,
        events: [],
        isLoadingEvents: true,
        isLoadingUsers: true,
        users: []
    };

    componentDidMount() {
        listUsers(token).then(response => this.setState({
            isLoadingUsers: false,
            users: response.items
        }));

        this.onClickSearch();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // NOTE: This is really only here to make is pretty locally - I'm guessing it'll be replaced with the spinner
        if (this.state.isLoadingEvents !== prevState.isLoadingEvents) {
            if (this.state.isLoadingEvents) {
                Progress.show();
            } else {
                Progress.hide();
            }
        }
    }

    onChangeFilterDate = (date) => {
        this.setState({
            filterDateRange: DateUtils.addDayToRange(date, this.state.filterDateRange)
        });
    };

    onChangeFilterTypes = (types) => {
        this.setState({
            filterTypes: types
        })
    };

    onChangeFilterUsers = (users) => {
        this.setState({
            filterUsers: users
        })
    };

    onClickReset = () => {
        this.setState({
            ...defaultFilters
        });
    };

    onClickSearch = () => {
        const parameters = {
            limit: 250,
            from: this.state.filterDateRange.from ? format(this.state.filterDateRange.from) : undefined,
            to: this.state.filterDateRange.to ? format(this.state.filterDateRange.to) : undefined,
            type: this.state.filterTypes.map(type => type.value),
            user: this.state.filterUsers.map(user => user.value),
        };

        this.setState({
            isLoadingEvents: true
        });

        searchEvents(token, parameters)
            .then(response => this.setState({
                events: response,
                isLoadingEvents: false
            }));
    };

    render() {
        const groupEventTypes = groupBy(eventType => {
            return eventType.split('.')[0];
        });

        const typeOptions = Object.entries(groupEventTypes(Object.keys(eventTypes))).map(([key, types]) => {
            return {
                label: key,
                options: types.map(type => {
                    return {
                        label: type,
                        value: type
                    }
                })
            };
        });

        const userOptions = this.state.users.map(user => {
            return {
                label: `${user.firstName} ${user.lastName} (${user.email})`,
                value: user.id
            }
        });

        const { from, to } = this.state.filterDateRange;

        const chooseDatePopover = (
            <Popover id="popover-datepicker">
                <DayPicker
                    numberOfMonths={ 2 }
                    selectedDays={ [from, { from, to }]}
                    modifiers={{
                        start: from,
                        end: to
                    }}
                    onDayClick={ this.onChangeFilterDate }
                />
            </Popover>
        );

        const filterDateRange = from && to
            ? `${format(from, 'YYYY-MM-DD')} to ${format(to, 'YYYY-MM-DD')}`
            : '';

        return (
            <Grid fluid style={{ marginTop: 20 }}>
                <Progress.Component />

                <Row>
                    <Col lg={ 4 }>
                        <Select
                            isMulti
                            onChange={ this.onChangeFilterTypes }
                            options={ typeOptions }
                            placeholder="Choose type(s)"
                            value={ this.state.filterTypes }
                        />
                    </Col>

                    <Col lg={ 3 }>
                        <Select
                            isDisabled={ this.state.isLoadingUsers }
                            isLoading={ this.state.isLoadingUsers }
                            isMulti
                            onChange={ this.onChangeFilterUsers }
                            options={ userOptions }
                            placeholder="Choose user(s)"
                            value={ this.state.filterUsers }
                        />
                    </Col>

                    <Col lg={ 3 }>
                        <div className="form-group">
                            <OverlayTrigger trigger="click" placement="bottom" overlay={ chooseDatePopover } rootClose>
                                <input
                                    className="form-control"
                                    onChange={ () => {} }
                                    placeholder="Choose date range"
                                    value={ filterDateRange }
                                />
                            </OverlayTrigger>
                        </div>
                    </Col>

                    <Col lg={ 2 }>
                        <ButtonToolbar className="flex">
                            <FlexButton bsStyle="primary" onClick={ this.onClickSearch }>
                                Search
                            </FlexButton>
                            <FlexButton onClick={ this.onClickReset }>
                                Reset
                            </FlexButton>
                        </ButtonToolbar>
                    </Col>
                </Row>

                <Fade in={ this.state.isLoadingEvents === false }>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Occurred At</th>
                                <th>User</th>
                                <th>Flow</th>
                                <th>State ID</th>
                                <th>Data</th>
                            </tr>
                        </thead>

                        <tbody>
                            <EventContainer events={ this.state.events }  />
                        </tbody>
                    </table>
                </Fade>
            </Grid>
        );
    }
}

const FlexButton = (props) => (
    <Button className="flex-grow" { ...props }>
        { props.children }
    </Button>
);

export default App;
