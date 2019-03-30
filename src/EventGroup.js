import React from 'react';
import { getEventType } from "./EventTypes";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { Collapse } from "react-bootstrap";
import Event from "./Event";

export default class EventGroup extends React.Component {
    state = {
        isExpanded: false
    };

    onToggleExpanded = () => {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    };

    render() {
        const events = this.props.events.map(event => <Event event={ event } key={ event.id } />);

        const type = getEventType(this.props.events[0].type);
        const when = this.props.events[0].occurredAt;

        const expandedRow = this.state.isExpanded
            ?
            (
                <tr>
                    <td colSpan={ 5 }>
                        <table className="table">
                            <Collapse in={ this.state.isExpanded }>
                                <tbody>
                                { events }
                                </tbody>
                            </Collapse>
                        </table>
                    </td>
                </tr>
            )
            : null;

        return (
            <React.Fragment>
                <tr>
                    <td>{ type.name }</td>
                    <td>{ distanceInWordsToNow(when) } ago</td>
                    <td colSpan={ 4 }>
                        <button className="btn btn-link btn-padding-none btn-border-none" onClick={ this.onToggleExpanded }>
                            { events.length } occurrences
                        </button>
                    </td>
                </tr>
                { expandedRow }
            </React.Fragment>
        );
    }
}
