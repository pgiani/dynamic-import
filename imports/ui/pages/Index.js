import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import ExampleDates from '../components/ExampleDates';

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>Example for Meteor 1.5</h2>
      <p>We are making a very simple component to pick and render dates.</p>
      <ExampleDates />
    </Jumbotron>
  </div>
);

export default Index;
