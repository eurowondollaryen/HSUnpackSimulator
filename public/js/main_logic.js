var data = [];
var legendary = 10;
var epic = 50;
var rare = 230;
var common = 710;
var index = 0;
var cardCapacity = [ 49, 36, 27, 23 ];
var legendary10 = false;
//do not touch variables above
var numOfPacks = 0;
var sequence = 0;
var numOfCommon = 0;
var numOfRare = 0;
var numOfEpic = 0;
var numOfLegendary = 0;

function unpack() {
	var result = [];
	for(var i = 0; i < 5; ++i) {
		result.push(data[Math.floor(Math.random() * 1000)]);
	}
	if(result.every((value) => value == 'c' || value == 'C')) {
		result[Math.floor(Math.random() * 5)] = 'r';
		//console.log('modified');
	}

	if(legendary10 == false && sequence <= 10 && numOfLegendary < 1) {
		var modifiedProbs = [];
		for(var j = 0; j < 10; ++j) {
			modifiedProbs[j] = false;
		}
		for(var j = 0; j < sequence; ++j) {
			modifiedProbs[j] = true;
		}
		if(modifiedProbs[Math.floor(Math.random() * 10)]) {
			legendary10 = true;
			result[Math.floor(Math.random() * 5)] = 'l';
			console.log('legendary10 modified to ' + legendary10);
		}
	}

	for(var i = 0; i < 5; ++i) {//record the result into numOf variables
		if(result[i] == 'c') {numOfCommon++;}
		else if (result[i] == 'r') {numOfRare++;}
		else if (result[i] == 'e') {numOfEpic++;}
		else {numOfLegendary++;}
	}


	var text = "";//text for result cards
	for(var i = 0; i < 5; ++i) {
		var whatType = -1;
		if(result[i] == 'c') {
			whatType = 0;
		}
		else if(result[i] == 'r') {
			whatType = 1;
		}
		else if(result[i] == 'e') {
			whatType = 2;
		}
		else if(result[i] == 'l') {
			whatType = 3;
		}

		text += "<div class='scene scene--card'><div class='card" + (i + 1) + "'><div class='card__face card__face--front' id='" + result[i] + "'><img src='images/Backs/Default.png' style='width:100%;height:100%;'></div><div class='card__face card__face--back'><img src='images/Cards/Boomsday/NotGold/" + result[i] + "/" + (Math.floor(Math.random() * cardCapacity[whatType])+1) + ".png' style='width:100%;height:100%;'></div></div></div>";
	}
	document.getElementById('result').innerHTML = text;
	var card1 = document.querySelector('.card1');
	card1.addEventListener( 'click', function() {
	  card1.classList.toggle('is-flipped');
	});
	var card2 = document.querySelector('.card2');
	card2.addEventListener( 'click', function() {
	  card2.classList.toggle('is-flipped');
	});
	var card3 = document.querySelector('.card3');
	card3.addEventListener( 'click', function() {
	  card3.classList.toggle('is-flipped');
	});
	var card4 = document.querySelector('.card4');
	card4.addEventListener( 'click', function() {
	  card4.classList.toggle('is-flipped');
	});
	var card5 = document.querySelector('.card5');
	card5.addEventListener( 'click', function() {
	  card5.classList.toggle('is-flipped');
	});


	sequence = sequence + 1;
	document.getElementById('count').innerHTML = "<h3 id='count'>count : " + sequence + " / " + numOfPacks + "</h3>";
	if(sequence >= numOfPacks) {
		document.getElementById('unpack').innerHTML = 'Finish!';
		document.getElementById('unpack').setAttribute('onClick', 'getResult()');
	}
}
function probabilityInit() {
	subInit(data, index, legendary, 'l');
	subInit(data, index, epic, 'e');
	subInit(data, index, rare, 'r');
	subInit(data, index, common, 'c');
	//console.log(data);
}
function subInit(arr, ind, number, letter) {
	for(var i = ind; i < ind + number; ++i) {
		data.push(letter);
	}
}
function start() {
	numOfPacks = document.getElementById('numOfPacks').value;
	if(numOfPacks === undefined || numOfPacks === "" || numOfPacks === null) {
		alert("not available number");
		return;
	}
	document.getElementById('initialMenu').innerHTML = "<h3 id='count'>count : 0 / " + numOfPacks + "</h3>"	+ "<button class='btn' id='unpack' onClick='unpack()'>Unpack</button>";
	sequence = 0;
	numOfCommon = 0;
	numOfRare = 0;
	numOfEpic = 0;
	numOfLegendary = 0;
}
function getResult() {
	document.getElementById('initialMenu').innerHTML = "<h2>Results</h2>" +
	"<p>Common : " + numOfCommon + "</p>" +
	"<p>Rare : " + numOfRare + "</p>" +
	"<p>Epic : " + numOfEpic + "</p>" +
	"<p>Legendary : " + numOfLegendary + "</p>" +
	"<button class='btn' onClick='refresh()'>Restart?</button>"
}
function refresh() { location.reload(true); }