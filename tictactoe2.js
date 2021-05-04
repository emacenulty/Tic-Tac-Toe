 var Ticnum = 3,
 empty = '&nbsp;',
 boxes = [],
 turn = 'X',
 score,
 moves;


function createboard() {
 var board = document.createElement('table');
 board.setAttribute('border', 4);
 board.setAttribute('cellspacing', 1);

 var identifier = 1;
 for (var i = 0; i < Ticnum; i++) {
   var row = document.createElement('tr');
   board.appendChild(row);
   for (var x = 0; x < Ticnum; x++) {
     var cell = document.createElement('td');
     cell.setAttribute('height', 120);
     cell.setAttribute('width', 120);
     cell.setAttribute('align', 'center');
     cell.setAttribute('valign', 'center');
     cell.classList.add('col' + x, 'row' + i);
     if (i == x) {
       cell.classList.add('diagonal0');
     }
     if (x == Ticnum - i - 1) {
       cell.classList.add('diagonal1');
     }
     cell.identifier = identifier;
     cell.addEventListener('click', set);
     row.appendChild(cell);
     boxes.push(cell);
     identifier += identifier;
   }
 }

 document.getElementById('tictactoe').appendChild(board);
 NewGame();
}


function Winner(clicked) {

 var memberOf = clicked.className.split(/\s+/);
 for (var i = 0; i < memberOf.length; i++) {
   var testClass = '.' + memberOf[i];
   var items = contains('#tictactoe ' + testClass, turn);
   if (items.length == Ticnum) {
     return true;
   }
 }
 return false;
}

function contains(selector, text) {
 var elements = document.querySelectorAll(selector);
 return [].filter.call(elements, function (element) {
   return RegExp(text).test(element.textContent);
 });
}

function set() {
 if (this.innerHTML !== empty) {
   return;
 }
 this.innerHTML = turn;
 moves += 1;
 score[turn] += this.identifier;
 if (Winner(this)) {
   alert('Winner: Player ' + turn);
   NewGame();
 } else if (moves === Ticnum * Ticnum) {
   alert('Draw');
   NewGame();
 } else {
   turn = turn === 'X' ? 'O' : 'X';
   document.getElementById('turn').textContent = 'Player ' + turn;
 }
}

function NewGame() {
    score = {
      'X': 0,
      'O': 0
    };
    moves = 0;
    turn = 'X';
    boxes.forEach(function (square) {
      square.innerHTML = empty;
    });
   }

createboard();