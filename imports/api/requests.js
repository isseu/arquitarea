import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Requests = new Mongo.Collection('requests');

if (Meteor.isServer) {
  Meteor.publish('requests', function requestsPublication() {
    return Requests.find({}, { sort: { createdAt: -1 }, limit: 20 });
  });
}

Meteor.methods({
  'requests.insert'() {
    Requests.insert({
      ip: headers.methodClientIP(this),
      headers: headers.get(this),
      createdAt: new Date()
    });
  },
});
