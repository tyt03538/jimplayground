var redis = require('redis');
var voteHandler = require('./voteHandler')
var config = require('./config')
var util = require('util');

exports.handler = (event, context, callback) => {
  // TODO implement
  //connect to redis
  var client = redis.createClient(config.redisURL);

  client.on("error", function (err) {
    console.log("Error " + err);
    callback(err, 'Aborted');
    return;
  });

  if (event.operation === 'upVote') {
    console.log("upvoting " + event.voteTo);
    voteHandler.upVote(client, event.voteTo, function(err) {
      if (err) {
        console.log(err);
        callback(err, null);
      }

      client.quit();

      callback(null, 'Completed');
    })
  }

  if (event.operation === 'getVotes') {
    voteHandler.getIndivVote(client, function(err, indivVotes) {
      if (err) {
        console.log(err);
        return;
      }
      
      voteHandler.getAllVote(client, function(err, allVotes) {
        if (err) {
          console.log(err);
          return
        }

        console.log('Individual Votes: ' + util.inspect(indivVotes));
        console.log('Votes in the last 10 mins: ' + allVotes);
      })

      client.quit();

      callback(null, 'Completed');
    })
  }
};