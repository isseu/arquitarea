import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'
import  ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Requests } from '../api/requests.js'

import Request from './Request.jsx'

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
    this.timer = setInterval(() => this.forceUpdate(), 1000)
  }

  componentWillUnmount() {
      clearInterval(this.timer);
  }

 componentDidMount() {
   Meteor.call('requests.insert')
 }

  renderRequests() {
    if(this.props.requests.length == 0) {
      return <tr>
        <th colSpan="5">
          <h3 className="u-full-width">Loading ...</h3>
        </th>
      </tr>
    }
    return this.props.requests.map((request) => (
      <Request key={request._id} request={request} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Last requests</h1>
        </header>
        <table className="u-full-width">
          <thead>
            <tr>
              <th></th>
              <th>Time</th>
              <th>IP</th>
              <th>User Agent</th>
              <th></th>
            </tr>
          </thead>
          <ReactCSSTransitionGroup component="tbody" transitionName="table-tr" transitionLeaveTimeout={500} transitionEnterTimeout={500}>
            {this.renderRequests()}
          </ReactCSSTransitionGroup>
        </table>
      </div>
    )
  }
}

App.propTypes = {
  requests: PropTypes.array.isRequired,
}

export default createContainer(() => {
  Meteor.subscribe('requests')
  return {
    requests: Requests.find({}, { sort: { createdAt: -1 }}).fetch()
  }
}, App)
