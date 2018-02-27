// Initialize Firebase
var config = {
    apiKey: "AIzaSyDC6_WcQzmnxOdxNBHtVqaX9lTB64cxbog",
    authDomain: "bnfparser.firebaseapp.com",
    databaseURL: "https://bnfparser.firebaseio.com",
    projectId: "bnfparser",
    storageBucket: "bnfparser.appspot.com",
    messagingSenderId: "746636014096"
};
firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();
// setTimeout(doAuth, 500);


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("great!! you're in!!!");
        handleloggedIn()

    } else {
        handleLoggedOut();
       // doAuth();
    }
});

function doAuth() {

    console.log("here")
    firebase.auth().signInWithRedirect(provider);
    console.log("back from redirect");
    firebase.auth().getRedirectResult().then(function (result) {
        console.log("got result even")
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log("my token!", token);
            // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log("here is the result object", result);
    }).catch(function (error) {
        console.log("error occured", error)
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

}

//---------------------------MODIFY PAGE ACCORDING TO LOGGED IN STATUS.------------------------
let loggedin;
//handle a logged in user
function handleloggedIn() {
    loggedin = true;
    document.getElementById("greeting").innerHTML = "Thanks for logging in, " + firebase.auth().currentUser.displayName + "."


    //show logout btn:
    let logout = document.getElementById("logoutbtn"); // make it a logout button... 
    show(logout);
    //todo what it do?

    //hide login button
    let loginright = document.getElementById("loginbtn") //make it an account button or whatever. 
    hide(loginright);

    //show account button
    let accountbtn = document.getElementById("accountbtn") //make it an account button or whatever. 
    show(accountbtn);

    //lets read some data:
    // Get a reference to the database service
    var database = firebase.database();

}
function handleLoggedOut(){
    loggedin = false;
    //hide logout btn:
    let logout = document.getElementById("logoutbtn"); // make it a logout button... 
    hide(logout);
    //todo what it do?

    //show login button
    let loginright = document.getElementById("loginbtn") //make it an account button or whatever. 
    show(loginright);
    //hide account button
    let accountbtn = document.getElementById("accountbtn") //make it an account button or whatever. 
    hide(accountbtn);
}
function onclicklogin(){
    doAuth();
    handleloggedIn();
}
function onclicklogout(){
    firebase.auth().signOut().then(function() {
        handleLoggedOut();
      }, function(error) {
          console.log("Idk what could go wrong here in firebase logout:", error)
        // An error happened.
      });
}

function hide(ele){
    ele.style.display = 'none';
}
function show(ele){
    ele.style.display = 'block';
}