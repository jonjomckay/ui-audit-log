import React from 'react';
import differenceInSeconds from 'date-fns/difference_in_seconds';

import Event from './Event';
import EventGroup from './EventGroup';

function groupEventsBySibling(events) {
    return events.reduce((accumulator, current, index, source) => {
        const previous = source[index - 1];

        // If we have a previous element, check if the type matches and the time is close to the current item
        if (previous && previous.type === current.type) {
            if (differenceInSeconds(previous.occurredAt, current.occurredAt) < 120) {
                const lastGroup = accumulator.pop();

                return accumulator.concat([
                    [...lastGroup, current]
                ]);
            }
        }

        return accumulator.concat([[current]]);
    }, []);
}

const EventContainer = ({ events }) => {
    return groupEventsBySibling(events).map((group, i) => {
        if (group.length === 1) {
            return <Event event={ group[0] } key={ group[0].id } />
        }

        return <EventGroup events={ group } key={ i } />;
    });
};

export default EventContainer;
