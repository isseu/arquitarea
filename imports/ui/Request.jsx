import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Requests } from '../api/requests.js';

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'Approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'Approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return 'Approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
}

// Task component - represents a single todo item
export default class Request extends Component {

  constructor() {
    super()
  }

  toggleShowMoreInfo(event) {
    event.preventDefault();
    alert(JSON.stringify(this.props.request.headers, null, 2))
  }

  render() {
    return (
      <tr>
        <td>{timeDifference(new Date(), this.props.request.createdAt)}</td>
        <td>{this.props.request.createdAt.toTimeString()}</td>
        <td>{this.props.request.ip}</td>
        <td>{this.props.request.headers['user-agent']}</td>
        <td>
          <a className="button" href="#" onClick={this.toggleShowMoreInfo.bind(this)}>More Info</a>
        </td>
      </tr>
    );
  }
}
