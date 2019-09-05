function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/ui/components/PickDates.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  "default": function () {
    return MyDateRangePicker;
  }
});
var moment;
module.link("moment", {
  "default": function (v) {
    moment = v;
  }
}, 0);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 1);
var PropTypes;
module.link("prop-types", {
  "default": function (v) {
    PropTypes = v;
  }
}, 2);
var DateRangePicker;
module.link("react-dates", {
  DateRangePicker: function (v) {
    DateRangePicker = v;
  }
}, 3);
module.link("react-dates/lib/css/_datepicker.css");

var MyDateRangePicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MyDateRangePicker, _React$Component);

  function MyDateRangePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null
    };
    _this.submit = _this.submit.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  var _proto = MyDateRangePicker.prototype;

  _proto.submit = function () {
    function submit() {
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

    return submit;
  }();

  _proto.render = function () {
    function render() {
      var _this2 = this;

      return React.createElement("div", null, React.createElement(DateRangePicker, {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        onDatesChange: function (_ref) {
          var startDate = _ref.startDate,
              endDate = _ref.endDate;
          return _this2.setState({
            startDate: startDate,
            endDate: endDate
          });
        },
        focusedInput: this.state.focusedInput,
        onFocusChange: function (focusedInput) {
          return _this2.setState({
            focusedInput: focusedInput
          });
        },
        isDayBlocked: function () {
          return false;
        },
        isOutsideRange: function () {
          return false;
        }
      }), "\xA0", React.createElement("button", {
        className: "btn btn-primary btn-lg",
        onClick: this.submit
      }, "Add \xA0", React.createElement("i", {
        className: "fa fa-plus"
      })));
    }

    return render;
  }();

  return MyDateRangePicker;
}(React.Component);

MyDateRangePicker.propTypes = {
  onAddDates: PropTypes.func.isRequired
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
//# sourceMappingURL=/dynamic/imports/ui/components/b1f585d8ca6a61f6ccd5d9a83d86b1f5ad38d9f9.map
