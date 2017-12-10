var config = require('./config');
var redis = require('redis');

var voteHandler = {}

voteHandler.getIndivVote = (event, callback) => {
  var redisClient = redis.createClient({ host: event.CacheHost })
  var redisAction = [];

  redisClient.on('error', function (err) {
    console.log('Error ' + err);
  });

  for (var i = 0; i < config.candidates.length; i++) {
    redisAction.push(["get", config.candidates[i]]);
  }

  redisClient.multi(redisAction)
    .exec(function (err, replies) {
      redisClient.quit();
      
      if (err) {
        callback(err, null);
      }

      var indivVotes = [];
      for (var i = 0; i < replies.length; i++) {
        var tmpObj = {};
        tmpObj.id = config.candidates[i];
        tmpObj.votes = replies[i] ? replies[i] : 0;
        indivVotes.push(tmpObj);
      }
      callback(null, indivVotes);
    })
}

voteHandler.getAllVote = (event, callback) => {
  var redisClient = redis.createClient({ host: event.CacheHost })
  var d = new Date();
  var now = d.getTime();

  redisClient.on('error', function (err) {
    console.log('Error ' + err);
  });

  redisClient.multi([
    ["zremrangebyscore", config.redisKey, 0, now - config.slidingWindow],
    ["zcount", config.redisKey, "-inf", "inf"],
    ["persist", config.redisKey]
  ]).exec(function (err, replies) {
    redisClient.quit();

    if (err) {
      callback(err, null)
    } else {
      voteCount = replies[1];
      callback(null, voteCount);
    }
  });
}

voteHandler.updateVoteCount = (event, callback) => {
  var redisClient = redis.createClient({ host: event.CacheHost })
  var d = new Date();
  var now = d.getTime();

  redisClient.on('error', function (err) {
    console.log('Error ' + err);
  });

  redisClient.multi([
    ["zremrangebyscore", config.redisKey, 0, now - config.slidingWindow],
    ["zadd", config.redisKey, now, now],
    ["persist", config.redisKey]
  ]).exec(function (err, replies) {
    redisClient.quit();

    if (err) {
      callback(err)
    }

    callback(null)
  });
}

voteHandler.upVote = (event, callback) => {
  var redisClient = redis.createClient({ host: event.CacheHost })

  redisClient.on('error', function (err) {
    console.log('Error ' + err);
  });

  redisClient.incr(event.voteTo, function (err, reply) {
    if (err) {
      callback(err);
      return;
    }
    console.log('upvoted ' + event.voteTo);

    voteHandler.updateVoteCount(event, function (err) {
      redisClient.quit();

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