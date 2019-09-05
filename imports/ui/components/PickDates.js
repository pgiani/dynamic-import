import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class MyDateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
    };
    this.submit = this.submit.bind(this);
  }
  submit() {
    this.props.onAddDates({
      startDate: moment(this.state.startDate).toDate(),
      endDate: moment(this.state.endDate).toDate(),
    });
    this.setState({
      focusedInput: null,
      startDate: null,
      endDate: null,
    });
  }
  render() {
    return (
      <div>
        <DateRangePicker
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          isDayBlocked={() => false}
          isOutsideRange={() => false}
        />
        &nbsp;
        <button className="btn btn-primary btn-lg" onClick={this.submit}>
          Add
          &nbsp;
          <i className="fa fa-plus" />
        </button>
      </div>
    );
  }
}
MyDateRangePicker.propTypes = {
  onAddDates: PropTypes.func.isRequired,
};
