

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
 }

function NewData(){

  db.open().then (function(){
      //
      // Then when data is stored, read from it
      //
      return db.friends.toArray();
  }).then(function (people) {
      //var data = new Array;
      //
      // Display the result
      //
      //save("anmelder.txt",people)
      //downloadCSV(people);
      var data = new Array();
      /*
      var data2 = [
         ['Foo', 'programmer'],
         ['Bar', 'bus driver'],
         ['Moo', 'Reindeer Hunter']
      ];*/

      var data2 = [['Foo', 'programmer']];
      data2.push(['Bar', 'bus driver']);
      for (var i=0; i<people.length; i++) {

        var logi = i;
        //data.push([i],people[i].name);
        //data.push([people[i].name][people[i].lname]);
        data.push([people[i].name,people[i].lname]);
        //data[i][1]=people[i].lname;
        //console.log(`${people[i].name} ${people[i].lname}`);
        //console.log(logi + people[i].name + " " + people[i].lname);
        console.log(logi);

      }

      download_csv(data);

  }).catch(function(error) {
     //
     // Finally don't forget to catch any error
     // that could have happened anywhere in the
     // code blocks above.
     //
     alert ("Ooops: " + error);
  });

}

    function download_csv(data) {

    var csv = 'Name,Title\n';
    data.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });

    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
    }
