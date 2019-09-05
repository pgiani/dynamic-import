import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';

const niceDate = date => moment(date).calendar(null, {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: 'DD/MM/YYYY',
});

const DateListGroupItem = ({ startDate, endDate, index, remove }) => (
  <div className="list-group-item">
    {niceDate(startDate)}&ndash;{niceDate(endDate)}
    <button onClick={() => remove(index)} className="btn btn-sm btn-link">
      <i className="fa fa-remove" />
    </button>
  </div>
);
DateListGroupItem.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  index: PropTypes.number,
  remove: PropTypes.func,
};
export default DateListGroupItem;
