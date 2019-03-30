import React from 'react';
import AceEditor from 'react-ace';
import { Button, Media, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import md5 from 'blueimp-md5';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { getEventType } from "./EventTypes";

import 'brace/mode/json';
import 'brace/theme/twilight';

function createTypePopover(type) {
    const description = type.description
        ? type.description
        : 'No description is currently available for this event type';

    return (
        <Popover id={ `popover-type` + type.id }>
            <strong>{ type.name }:</strong> { description }
        </Popover>
    )
}

function createUserPopover(user) {
    if (user == null) {
        return null;
    }

    const fullName = user.firstName + ' ' + user.lastName;

    return (
        <Popover id={ `popover-user-` + user.id }>
            <Media>
                <Media.Left>
                    <img src={ `https://www.gravatar.com/avatar/${md5(user.email)}?s=64` } alt={ fullName } />
                </Media.Left>
                <Media.Body>
                    <Media.Heading>{ fullName }</Media.Heading>

                    <div>{ user.email }</div>
                </Media.Body>
            </Media>
        </Popover>
    );
}

function createNotApplicable() {
    return (
        <span className="text-muted">
            n/a
        </span>
    )
}

export default class Event extends React.Component {
    state = {
        isPayloadOpen: false
    };

    onTogglePayloadOpen = () => {
        this.setState({
            isPayloadOpen: !this.state.isPayloadOpen
        })
    };

    render() {
        const event = this.props.event;

        const type = getEventType(event.type);

        const userName = event.user
            ? `${event.user.firstName} ${event.user.lastName}`
            : null;

        const flowName = event.flow
            ? event.flow.developerName
            : createNotApplicable();

        return (
            <tr className={ this.props.className }>
                <td>
                    <OverlayTrigger trigger={["focus", "hover"]} placement="bottom" overlay={ createTypePopover(type) }>
                        <div>{ type.name }</div>
                    </OverlayTrigger>
                </td>
                <td>
                <span title={ event.occurredAt }>
                    { distanceInWordsToNow(event.occurredAt) } ago
                </span>
                </td>
                <td>
                    <OverlayTrigger trigger={["focus", "hover"]} placement="bottom" overlay={ createUserPopover(event.user) }>
                        <div>{ userName }</div>
                    </OverlayTrigger>
                </td>
                <td>{ flowName }</td>
                <td>{ event.state || createNotApplicable() }</td>
                <td>
                    <PayloadModal
                        event={ event }
                        isOpen={ this.state.isPayloadOpen }
                        onHide={ this.onTogglePayloadOpen }
                    />

                    <Button className="btn-padding-none" bsStyle="link" onClick={ this.onTogglePayloadOpen }>
                        View payload
                    </Button>
                </td>
            </tr>
        );
    }
};

const PayloadModal = ({ event, isOpen, onHide }) => (
    <Modal show={ isOpen } onHide={ onHide }>
        <Modal.Header closeButton>
            <Modal.Title>Event payload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AceEditor
                mode="json"
                theme="twilight"
                value={ JSON.stringify(event, null, '\t') }
                width="100%"
            />
        </Modal.Body>
    </Modal>
)
