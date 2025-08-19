import { useState } from 'react';
import PropTypes from 'prop-types';
import './DatePicker.scss';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DatePicker = ({ value, onChange, placeholder = 'Select a date' }) => {
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [visible, setVisible] = useState(false);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = startOfMonth.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleDayClick = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    onChange(selected);
    setVisible(false);
  };

  const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

  return (
    <div className="aev-datepicker">
      <div className="input" onClick={() => setVisible(!visible)}>
        <span>{value ? value.toDateString() : placeholder}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
          <path d="M6 7L12 13L18 7" stroke="#D7DFE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {visible && (
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={prevMonth}>&lt;</button>
            <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentYear}</span>
            <button onClick={nextMonth}>&gt;</button>
          </div>

          <div className="days-of-week">
            {daysOfWeek.map((d) => (
              <div key={d} className="day-name">{d}</div>
            ))}
          </div>

          <div className="calendar-grid">
            {Array(startDay).fill(null).map((_, idx) => (
              <div key={`empty-${idx}`} className="empty-day" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => (
              <div
                key={i}
                className={`day ${value?.getDate() === i + 1 &&
                                    value?.getMonth() === currentMonth &&
                                    value?.getFullYear() === currentYear ? 'selected' : ''}`}
                onClick={() => handleDayClick(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default DatePicker;
