// // unchanged from 'nodeFire'
// // import router?

// var admin = require("firebase-admin");

// admin.initializeApp({
//   credential: admin.credential.cert("./server/firebase-service-account.json"),
//   databaseURL: "https://insect-collector.firebaseio.com"
// });

// // this block from insect-collector firebase (what is serviceAccount?)
// var admin = require("firebase-admin");

// var serviceAccount = require("./server/firebase-service-account.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://insect-collector.firebaseio.com"
// });

// /* This is where the magic happens. We pull the id_token off of the request,
// verify it against our firebase service account private_key.
// Then we add the decodedToken */
// var tokenDecoder = function(req, res, next){
//   if (req.headers.id_token) {
//     admin.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
//       // Adding the decodedToken to the request so that downstream processes can use it
//       // console.log('req');
//       req.decodedToken = decodedToken;
//       ///// search for user email in database
//       // db.getCollection('users').find({});
//       ///// if it finds one, then add that userId to req.decodedToken.mongoId
//       ///// if it doesn't find one, then add the user to the database, and return that id, then add that userId to req.decodedToken.mongoId
//       ///// when those are done (in the then) call next()
//       next();
//     })
//     .catch(function(error) {
//       // If the id_token isn't right, you end up in this callback function
//       // Here we are returning a forbidden error
//       console.log('User token could not be verified');
//       res.sendStatus(403);
//     });
//   } else {
//     // Seems to be hit when chrome makes request for map files
//     // Will also be hit when user does not send back an idToken in the header
//     res.sendStatus(403);
//   }
// };

// module.exports = { token: tokenDecoder };
