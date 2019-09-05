import React from 'react';
import Loadable from 'react-loadable';
import DateListGroupItem from './DateListGroupItem';

// generic loading component to show while transfering section of code
const LoadingComponent = () => <span className="text-muted"><i className="fa fa-refresh" /></span>;
// new version of the component, now: loading --> rendered
const PickDates = Loadable({
  // this does the dynamic import, and returns a promise
  loader: () => import('./PickDates'),
  // this is our generic loading display (optional)
  loading: LoadingComponent,
  // this is a delay before we decide to show our LoadingComponent (optional)
  delay: 200,
});

class ExampleDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dates: [] };
    this.addDates = this.addDates.bind(this);
    this.removeDate = this.removeDate.bind(this);
  }
  addDates(newDates) {
    console.log(newDates);
    this.setState({ dates: [...this.state.dates, newDates] });
  }
  removeDate(index) {
    this.setState({ dates: [
      ...this.state.dates.slice(0, index),
      ...this.state.dates.slice(index + 1),
    ] });
  }
  render() {
    return (
      <div>
        <PickDates onAddDates={this.addDates} />
        <hr />
        <div className="list-group">
          {this.state.dates.map((dates, index) => (
            <DateListGroupItem {...dates} key={index} index={index} remove={this.removeDate} />
          ))}
        </div>
      </div>
    );
  }
}
export default ExampleDates;
