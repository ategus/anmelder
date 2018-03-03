

var db = new Dexie("friend_database");
db.version(1).stores({
    friends: 'name,lname,email'
});


function WriteToFile(passForm) {

    var firstName = document.getElementById('fname').value;
    var lastName  = document.getElementById('lname').value;
    var email  = document.getElementById('email').value;


    db.friends.put({name: firstName, lname: lastName, email: email}).catch(function(error) {
       //
       // Finally don't forget to catch any error
       // that could have happened anywhere in the
       // code blocks above.
       //
       alert ("Ooops: " + error);
    });
 };

 function ShowData(){
   db.open().then (function(){
       //
       // Then when data is stored, read from it
       //
       var sName = document.getElementById('sfname').value;
       return db.friends.get(sName);
   }).then(function (friend) {
       //
       // Display the result
       //
       alert (friend.name + " " + friend.lname + " " + friend.email);
   }).catch(function(error) {
      //
      // Finally don't forget to catch any error
      // that could have happened anywhere in the
      // code blocks above.
      //
      alert ("Ooops: " + error);
   });

/*

   db.friends.get({
       name: "Ronny"
   }).then(function (friend) {
       alter(friend.name);
   });
   */
 };
       /*
   }).catch(function(error) {
             //
             // Finally don't forget to catch any error
             // that could have happened anywhere in the
             // code blocks above.
             //
             alert ("Ooops: " + error)};*/


function NewData(){
  alert("Test");
};
