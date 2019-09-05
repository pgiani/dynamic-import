function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// imports/ui/components/PickDates.js                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  default: () => MyDateRangePicker
});
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 0);
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 1);
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 2);
let DateRangePicker;
module.link("react-dates", {
  DateRangePicker(v) {
    DateRangePicker = v;
  }

}, 3);
module.link("react-dates/lib/css/_datepicker.css");

class MyDateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.props.onAddDates({
      startDate: moment(this.state.startDate).toDate(),
      endDate: moment(this.state.endDate).toDate()
    });
    this.setState({
      focusedInput: null,
      startDate: null,
      endDate: null
    });
  }

  render() {
    return React.createElement("div", null, React.createElement(DateRangePicker, {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      onDatesChange: (_ref) => {
        let {
          startDate,
          endDate
        } = _ref;
        return this.setState({
          startDate,
          endDate
        });
      },
      focusedInput: this.state.focusedInput,
      onFocusChange: focusedInput => this.setState({
        focusedInput
      }),
      isDayBlocked: () => false,
      isOutsideRange: () => false
    }), "\xA0", React.createElement("button", {
      className: "btn btn-primary btn-lg",
      onClick: this.submit
    }, "Add \xA0", React.createElement("i", {
      className: "fa fa-plus"
    })));
  }

}

MyDateRangePicker.propTypes = {
  onAddDates: PropTypes.func.isRequired
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
//# sourceMappingURL=/dynamic/imports/ui/components/a3b0fa959de02567801f2274d4741d00d4c67530.map
