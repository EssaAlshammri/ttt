var tiles = document.getElementsByClassName('tile')
var board = ['', '', '', '', '', '', '', '', '']
var playerTurn = true
var moves = 0

function claimIt(elem) {
    if (elem.innerHTML == '') {
        if (playerTurn == true) {
            elem.innerHTML = 'X';
            populate()
            playerTurn = false;
            document.getElementById('status').innerHTML = "It's my turn"
            var game = checkWin(board, 'X', false)
            if (game == false)
                computer()
        }
    }
};
function populate() {
    for (var index = 0; index < tiles.length; index++) {
        var element = tiles[index];
        board[index] = element.innerHTML
    }
};
function checkWin(board, player, trail) {
    function playerWon() {
        if (trail == true) {
            return
        }
        alert(player + ' Won')
        resetBoard()
    }
    if (board[0] == player && board[1] == player && board[2] == player) {
        playerWon()
        return true
    }
    if (board[3] == player && board[4] == player && board[5] == player) {
        playerWon()
        return true
    }
    if (board[6] == player && board[7] == player && board[8] == player) {
        playerWon()
        return true
    }
    if (board[0] == player && board[3] == player && board[6] == player) {
        playerWon()
        return true
    }
    if (board[1] == player && board[4] == player && board[7] == player) {
        playerWon()
        return true
    }
    if (board[2] == player && board[5] == player && board[8] == player) {
        playerWon()
        return true
    }
    if (board[0] == player && board[4] == player && board[8] == player) {
        playerWon()
        return true
    }
    if (board[2] == player && board[4] == player && board[6] == player) {
        playerWon()
        return true
    }
    if (trail == false) {
        moves += 1
    }
    if (moves == 9) {
        if (trail == true) {
            return
        }
        alert("It's a Tie :)")
        resetBoard()
        return false
    }
    return false
};
function resetBoard() {
    for (var index = 0; index < tiles.length; index++) {
        var element = tiles[index];
        element.innerHTML = ''
        board[index] = element.innerHTML
    }
    moves = 0
    playerTurn = true
};
function computer() {
    var ch = choosen(board, 0, 'O')
    tiles[ch].innerHTML = 'O'
    populate()
    document.getElementById('status').innerHTML = "It's your turn to play"
    playerTurn = true
    var game = checkWin(board, 'O', false)
    if (game == false)
        return
};
function choosen(board, depth, player) {
    player = player == 'X' ? 'O' : 'X'
    if (checkWin(board, player, true) == true) {
        return -10 + depth
    }
    if (!board.includes('') && checkWin(board, 'X', true) == false && checkWin(board, 'O', true) == false) {
        return 0
    }
    var value = player == 'X' ? 'O' : 'X'
    var max = -Infinity
    var index = 0
    for (var i = 0; i < board.length; i++) {
        var element = board[i];
        if (element == '') {
            var newBoard = board.slice()
            newBoard[i] = value
            var moveval = -choosen(newBoard, depth + 1, player)
            if (moveval > max) {
                max = moveval
                index = i
            }
        }
    }
    if (depth == 0) {
        return index
    }
    return max
}