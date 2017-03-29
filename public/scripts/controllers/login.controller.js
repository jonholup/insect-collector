myApp.controller("LogInController", ['InsectFactory', '$firebaseAuth', '$http', function (InsectFactory, $firebaseAuth, $http) {
    console.log('LogInController was loaded');
    var auth = $firebaseAuth();
    var self = this;

    self.logIn = function () {
        console.log('login function here');
        auth.$signInWithPopup("google").then(function (firebaseUser) {
            console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
        }).catch(function (error) {
            console.log("Authentication failed: ", error);
        });
    };

    // This code runs when the user logs out
    self.logOut = function () {
        auth.$signOut().then(function () {
            console.log('Logging the user out!');
        });
    };

    // This code runs whenever the user changes authentication states
    // e.g. whevenever the user logs in or logs out
    // this is where we put most of our logic so that we don't duplicate
    // the same things in the login and the logout code
    // auth.$onAuthStateChanged(getAllBugs);

    
    auth.$onAuthStateChanged(function (firebaseUser) {
        self.userIsLoggedIn = firebaseUser !== null;
        self.userIsLoggedOut = firebaseUser === null;
    });

    
}]);
