import React from 'react';
import PropTypes from 'prop-types';
import './Timeline.scss';

const Timeline = ({ events }) => {
    return (
        <div className="aev-timeline">
            {events.map((event, index) => (
                <div key={index} className="timeline-event">
                    <div className={`timeline-point ${event.status || 'default'} ${index === events.length - 1 ? 'no-line' : ''}`}>
                        {event.icon && <span className="icon">{event.icon}</span>}
                    </div>

                    <div className="timeline-content">
                        <div className="event-date">{event.date}</div>
                        <div className="event-title">{event.title}</div>
                        <div className="event-description">{event.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

Timeline.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            date: PropTypes.string.isRequired,
            icon: PropTypes.node,
            status: PropTypes.oneOf(['done', 'active', 'upcoming', 'default']),
        })
    ).isRequired,
};

export default Timeline;
