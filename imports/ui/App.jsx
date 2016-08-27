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
    this.state = {
      hideCompleted: false,
    }
    this.timer = setInterval(() => this.forceUpdate(), 5000)
  }

  componentWillUnmount() {
      clearInterval(this.timer);
  }

  toggleHideCompleted() {
   this.setState({
     hideCompleted: !this.state.hideCompleted,
   })
 }

 componentDidMount() {
   Meteor.call('requests.insert')
 }

  renderRequests() {
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
