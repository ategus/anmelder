

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

function CsvData(){

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

      for (var i=0; i<people.length; i++) {
        data.push([people[i].name,people[i].lname,people[i].email]);
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

    var csv = 'Name,Title,email\n';
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



    function MorseNode(ac, rate) {
        // ac is an audio context.
        this._oscillator = ac.createOscillator();
        this._gain = ac.createGain();

        this._gain.gain.value = 0;
        this._oscillator.frequency.value = 750;

        this._oscillator.connect(this._gain);

        if(rate == undefined)
            rate = 10;
        this._dot = 1.2 / rate; // formula from Wikipedia.

        this._oscillator.start(0);
    }

    MorseNode.prototype.connect = function(target) {
        return this._gain.connect(target);
    }

    MorseNode.prototype.MORSE = {
        "A": ".-",
        "B": "-...",
        "C": "-.-.",
        "D": "-..",
        "E": ".",
        "F": "..-.",
        "G": "--.",
        "H": "....",
        "I": "..",
        "J": ".---",
        "K": "-.-",
        "L": ".-..",
        "M": "--",
        "N": "-.",
        "O": "---",
        "P": ".--.",
        "Q": "--.-",
        "R": ".-.",
        "S": "...",
        "T": "-",
        "U": "..-",
        "V": "...-",
        "W": ".--",
        "X": "-..-",
        "Y": "-.--",
        "Z": "--..",
        "1": ".----",
        "2": "..---",
        "3": "...--",
        "4": "....-",
        "5": ".....",
        "6": "-....",
        "7": "--...",
        "8": "---..",
        "9": "----.",
        "0": "-----"
    };

    MorseNode.prototype.playChar = function(t, c) {
        for(var i = 0; i < c.length; i++) {
            switch(c[i]) {
            case '.':
                this._gain.gain.setValueAtTime(1.0, t);
                t += this._dot;
                this._gain.gain.setValueAtTime(0.0, t);
                break;
            case '-':
                this._gain.gain.setValueAtTime(1.0, t);
                t += 3 * this._dot;
                this._gain.gain.setValueAtTime(0.0, t);
                break;
            }
            t += this._dot;
        }
        return t;
    }

    MorseNode.prototype.playString = function(t, w) {
        w = w.toUpperCase();
        for(var i = 0; i < w.length; i++) {
            if(w[i] == ' ') {
                t += 3 * this._dot; // 3 dots from before, three here, and
                                    // 1 from the ending letter before.
            }
            else if(this.MORSE[w[i]] != undefined) {
                t = this.playChar(t, this.MORSE[w[i]]);
                t += 2 * this._dot;
            }
        }
        return t;
    }
