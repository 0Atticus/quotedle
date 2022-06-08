const inp = document.getElementById("guess");
let guesses = 6;
const div = document.getElementById("autocomplete");
const quoteBox = document.getElementById("quote");
let correctAnswer;
let selectionIndex = -1;
const close = document.getElementById("close");
var win = false;
let guessSpread = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};

var movies = [
  'The Godfather',
  "The Lego Batman Movie",
  'The Princess Bride',
  'The Shawshank Redemption',
  "Schindler's List",
  'Raging Bull',
  'Casablanca',
  "Terminator II: Judgement Day",
  'Citizen Kane',
  'Gone with the Wind',
  'The Wizard of Oz',
  "One Flew Over the Cuckoo's Nest",
  'Lawrence of Arabia',
  'Vertigo',
  'Psycho',
  'The Godfather: Part II',
  'On the Waterfront',
  'Sunset Blvd.',
  'Forrest Gump',
  'The Sound of Music',
  '12 Angry Men',
  'West Side Story',
  '2001: A Space Odyssey',
  'E.T. the Extra-Terrestrial',
  'The Silence of the Lambs',
  'Chinatown',
  'The Bridge on the River Kwai',
  "Singin' in the Rain",
  "It's a Wonderful Life",
  'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
  'Some Like It Hot',
  'Ben-Hur',
  'Apocalypse Now',
  'Amadeus',
  'The Lord of the Rings: The Return of the King',
  'Gladiator',
  'Titanic',
  'From Here to Eternity',
  'Saving Private Ryan',
  "Inside Man",
  'Unforgiven',
  'Indiana Jones and the Raiders of the Lost Ark',
  'Rocky',
  'A Streetcar Named Desire',
  'The Philadelphia Story',
  'To Kill a Mockingbird',
  'An American in Paris',
  'The Best Years of Our Lives',
  'My Fair Lady',
  'A Clockwork Orange',
  'Doctor Zhivago',
  'The Searchers',
  'Jaws',
  'Patton',
  'Butch Cassidy and the Sundance Kid',
  'The Treasure of the Sierra Madre',
  'The Good, the Bad and the Ugly',
  'The Apartment',
  'Platoon',
  'High Noon',
  'Braveheart',
  'Dances with Wolves',
  'Jurassic Park',
  'The Exorcist',
  'The Pianist',
  'Goodfellas',
  'The Deer Hunter',
  'All Quiet on the Western Front',
  'Bonnie and Clyde',
  'The French Connection',
  'City Lights',
  'It Happened One Night',
  'A Place in the Sun',
  'Midnight Cowboy',
  'Mr. Smith Goes to Washington',
  'Rain Man',
  'Annie Hall',
  'Fargo',
  'Giant',
  'Shane',
  'The Grapes of Wrath',
  'The Green Mile',
  'Close Encounters of the Third Kind',
  'Nashville',
  'Network',
  'The Graduate',
  'American Graffiti',
  'Pulp Fiction',
  'Terms of Endearment',
  'Good Will Hunting',
  'The African Queen',
  'Stagecoach',
  'Mutiny on the Bounty',
  'The Great Dictator',
  'Double Indemnity',
  'The Maltese Falcon',
  'Wuthering Heights',
  'Taxi Driver',
  'Rear Window',
  'The Third Man',
  'Rebel Without a Cause',
  'North by Northwest',
  'Yankee Doodle Dandy',
  "Back to the Future"
];
var quotes = {"Leave the gun, take the cannoli": "The Godfather", "I'm gonna make him an offer he can't refuse": "The Godfather", "Revenge is a dish best served cold": "The Godfather", "Let me see your shoe": "Inside Man", "Fact is, all lies, all evil deeds, they stink. You can cover them up for a while, but they don't go away": "Inside Man", "My name is Dalton Russell. Pay strict attention to what I say because I choose my words carefully and I never repeat myself": "Inside Man", "Inconceivable": "The Princess Bride", "Never go in against a Sicilian when death is on the line": "The Princess Bride", "Have fun stormin' da castle": "The Princess Bride", "Hasta la vista, baby": "Terminator II: Judgement Day", "I need your clothes, your boots and your motorcycle": "Terminator II: Judgement Day", "Come with me if you want to live": "Terminator II: Judgement Day", "It's funny. On the outside, I was an honest man. Straight as an arrow. I had to come to prison to be a crook": "The Shawshank Redemption", "Whatever mistakes I made, I paid for them and then some.": "The Shawshank Redemption", "He had enough rocks to keep him busy 'til rapture": "The Shawshank Redemption", "Power is when we have every justification to kill, and we don't": "Schindler's List", "Stern, if this factory ever produces a shell that can actually be fired, I'll be very unhappy": "Schindler's List", "War brings out the worst in people": "Schindler's List", "Hold on a sec. Are you trying to tell me that Bruce Wayne is Batman... 's roommate?": "The Lego Batman Movie", "You're the reason why I get up at 4:00 in the afternoon and pump iron until my chest is positively sick": "The Lego Batman Movie", "Black. All great movies start with a black screen": "The Lego Batman Movie", "You've no power here! Begone, before someone drops a house on you too!": "The Wizard of Oz", "You've always had the power my dear, you just had to learn it yourself": "The Wizard of Oz", "Lions, and tigers and bears! Oh my!": "The Wizard of Oz", "Make like a tree and... get outta here": "Back to the Future", "I Guess You Guys Aren't Ready For That Yet. But Your Kids Are Gonna Love It": "Back to the Future", "Roads? Where We're Going, We Don't Need Roads": "Back to the Future", "Nobody Calls Me Chicken": "Back to the Future"
             };


var hints = new Array();

function autocomplete() {

  let candidates = new Array();
  
  movies.forEach(i => {
    if (i.toLocaleLowerCase().includes(String(inp.value).toLocaleLowerCase())) {
      candidates.push(i);
    }
  })


  for (let i = 0; i < (candidates.length < 5 ? candidates.length : 5); i ++) {
    let option = document.createElement("p");
    option.className = "autocomplete-item";
    option.innerHTML = candidates[i];
    option.style.top = `${(i * 20) + 15}px`;
    option.onclick = function() {inp.value = candidates[i]};
    div.appendChild(option);
  }


  
}


function clearOptions() {
  document.querySelectorAll(".autocomplete-item").forEach(i => {
    div.removeChild(i);
  })
  selectionIndex = -1;
}

function generateQuote() {
  var keys = Object.keys(quotes);
  let quote = keys[Math.floor(Math.random() * keys.length)];
  quoteBox.innerHTML = `"${quote}"`;
  correctAnswer = quotes[quote];
  keys.forEach(key => {
    if (quotes[key] == correctAnswer && key != quote) {
      hints.push(key);
    }
  })
  let temp = [];
  while (temp.length < 2) {
    let x = hints[Math.floor(Math.random() * hints.length)];
    if (!temp.includes(x)) {
      temp.push(x);
    }
  }
}


function guess() {
  if (correctAnswer == inp.value) {
    if (!win) {
      document.getElementById("movie").innerHTML = `You won in ${7 - guesses} guesses! <br>The movie was ${correctAnswer}<br><br>Guess distribution:`;
      document.getElementById("winner-modal").style.display = "block";
      guessSpread[7 - guesses] = guessSpread[7 - guesses] + 1;
  
      let tempCookie = "";
      let keys = Object.keys(guessSpread);
      keys.forEach(i => {
        tempCookie += `${i}:${guessSpread[i]},`
      })
      document.cookie = tempCookie.slice(0, -1);
      console.log(document.cookie, tempCookie);
  
      
      win = true;
      plotGraph();
    }
  } else {
    let incorrect = document.createElement("p");
    incorrect.innerHTML = inp.value;
    inp.value = "";
    document.getElementById("incorrect").appendChild(incorrect);
    guesses--;
    if (guesses == 0) {
      document.getElementById("movie").innerHTML = `you lose <br> the movie was ${correctAnswer}<br><br>Guess distribution:`;
      plotGraph();
      document.getElementById("winner-modal").style.display = "block";
      win = true;
    } else if (guesses == 4) {
      quoteBox.innerHTML += `<br>"${hints[0]}"`;
    } else if (guesses == 2) {
      quoteBox.innerHTML += `<br>"${hints[1]}"`;
    }
  }
  
}


function plotGraph() {
  let keys = Object.keys(guessSpread);
  let total = guessSpread[1] +  guessSpread[2] +  guessSpread[3] +  guessSpread[4] +  guessSpread[5] +  guessSpread[6];
  keys.forEach(i => {
    let perc = guessSpread[i] / total;
    document.getElementById(String(i)).style.width = `${(perc * 100) + 10}%`;
    document.getElementById(String(i)).innerHTML = `${i}: ${Math.round(perc * 100)}%`
    document.getElementById(String(i)).style.display = "block";
    
  })
}





inp.addEventListener("input", function() {
  clearOptions();
  autocomplete();
});

document.querySelector("*").addEventListener("click", function() {
  clearOptions();
})

document.getElementById("submit").addEventListener("click", function() {
  guess();
})
// 38 up 40 down

document.addEventListener("keydown", function(e) {
  let key = e.keyCode;
  if (key == 27) {
    document.getElementById("winner-modal").style.display = "none";
  }
})


inp.addEventListener("keydown", function(e) {
  let key = e.keyCode;
    if (document.getElementsByClassName("autocomplete-item").length > 0 && key == "40") {
      try {
        document.getElementsByClassName("autocomplete-item")[selectionIndex].style.background = "lightgray";
        document.getElementsByClassName("autocomplete-item")[selectionIndex].style.color = "black";
      } catch {
        null;
      }
      selectionIndex++;
    
      selectionIndex + 1> document.getElementsByClassName("autocomplete-item").length ? selectionIndex = 0 : null;
      
      document.getElementsByClassName("autocomplete-item")[selectionIndex].style.background = "slategray";
      document.getElementsByClassName("autocomplete-item")[selectionIndex].style.color = "white";
    } else if (document.getElementsByClassName("autocomplete-item").length > 0 && key == "38") {
    try {
        document.getElementsByClassName("autocomplete-item")[selectionIndex].style.background = "lightgray";
        document.getElementsByClassName("autocomplete-item")[selectionIndex].style.color = "black";
      } catch {
        null;
      }
      selectionIndex--;
      selectionIndex < 0 ? selectionIndex = document.getElementsByClassName("autocomplete-item").length - 1 : null;
      document.getElementsByClassName("autocomplete-item")[selectionIndex].style.background = "slategray";
      document.getElementsByClassName("autocomplete-item")[selectionIndex].style.color = "white";

      
    } else if (key == 13 && selectionIndex > -1) {
      inp.value = document.getElementsByClassName("autocomplete-item")[selectionIndex].innerHTML;
      clearOptions();
    } else if (key == 13 && document.getElementsByClassName("autocomplete-item").length == 0) {
      guess();
    } 

  
})


document.body.onload = function() {
  generateQuote();
  document.getElementById("movie").innerHTML = `Welcome to Quotedle! <br><br> you have 6 chances to guess what movie the quote is from. <br><br>At 2 and 4 guesses you get another quote from the same movie.<br><br> There are very few quotes at the moment, but you can help by submitting some!<br><br> if you would like to submit a quote go <a href="https://tiny.cc/oy8suz" style="color: lightblue">here</a>`;
  document.getElementById("winner-modal").style.display = "block";
    document.cookie.split(";")[1].split(",").forEach(i => {
      console.log(i);
      let guessAmt = parseInt(i.split(":")[0]);
      let timesGuessed = parseInt(i.split(":")[1]);
      guessSpread[guessAmt] = timesGuessed;
      console.log(guessAmt, timesGuessed);
    })
  console.log(document.cookie);
  
  delete guessSpread[NaN];
}

close.addEventListener("click", function() {
  document.getElementById("winner-modal").style.display = "none";
  if (win) {
    location.replace("https://quotedle.atticus0.repl.co");
  }
})