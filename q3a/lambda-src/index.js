var redis = require('redis');
var voteHandler = require('./voteHandler')
var config = require('./config')
var util = require('util');

exports.handler = (event, context, callback) => {
  var operation = event.operation;

  console.log(event.operation);

  event.CacheHost = config.redisURL;
  console.log('connect to', event.CacheHost);

  switch (operation) {
    case 'getVotes':
      voteHandler.getIndivVote(event, function (err, indivVotes) {
        if (err) {
          return callback(err);
        }

        voteHandler.getAllVote(event, function (err, allVotes) {
          callback(err, { indivVote: indivVotes, voteInLastWindow: allVotes })
        })
      })
      break;
    case 'upVote':
      console.log("upvoting " + event.voteTo);
      voteHandler.upVote(event, function (err) {
        if (err) {
          return callback(err, null);
        }

        callback(null, { msg: "Completed" });
      })
      break;
    default:
      callback('Unsupported method');
  }
};