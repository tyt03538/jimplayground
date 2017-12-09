var config = require('./config');

var voteHandler = {}

voteHandler.getIndivVote = (redisClient, callback) => {
  var redisAction = [];

  for (var i=0; i<config.candidates.length; i++) {
    redisAction.push(["get", config.candidates[i]]);
  }

  redisClient.multi(redisAction)
  .exec(function(err, replies) {
    if (err) {
      callback(err, null);
    }

    var indivVotes = [];
    for(var i=0; i<replies.length; i++) {
      var tmpObj = {};
      tmpObj.id = config.candidates[i];
      tmpObj.votes = replies[i] ? replies[i] : 0;
      indivVotes.push(tmpObj);
    }
    callback(null, indivVotes);
  })
}

voteHandler.getAllVote = (redisClient, callback) => {
  var d = new Date();
  var now = d.getTime();

  redisClient.multi([
    ["zremrangebyscore", config.redisKey, 0, now - config.slidingWindow],
    ["zcount", config.redisKey, "-inf", "inf"],
    ["persist", config.redisKey]
  ]).exec(function (err, replies) {
    if (err) {
      callback(err, null)
    } else {
      voteCount = replies[1];
      callback(null, voteCount);
    }
  });
}

voteHandler.updateVoteCount = (redisClient, callback) => {
  var d = new Date();
  var now = d.getTime();

  redisClient.multi([
    ["zremrangebyscore", config.redisKey, 0, now - config.slidingWindow],
    ["zadd", config.redisKey, now, now],
    ["persist", config.redisKey]
  ]).exec(function (err, replies) {
    if (err) {
      callback(err)
    }

    callback(null)
  });
}

voteHandler.upVote = (redisClient, voteTo, callback) => {
  redisClient.incr(voteTo, function (err, reply) {
    if (err) {
      callback(err);
      return;
    }
    console.log('upvoted ' + voteTo);

    voteHandler.updateVoteCount(redisClient, function (err) {
      if (err) {
        callback(err);
        return;
      }

      console.log('updated vote stat');
      callback(null);
    })
  })
}

module.exports = voteHandler;