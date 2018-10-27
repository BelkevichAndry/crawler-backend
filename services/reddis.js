const redis = require("redis"),
    client = redis.createClient();

// client.get("javascript", function(err, reply) {
//     // reply is null when the key is missing
//     console.log(reply);
// });
// client.quit();
export default client;
