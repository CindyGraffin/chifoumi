// Images pierre, feuille et ciseaux
const pierre = document.getElementById('pierre');
const feuille = document.getElementById('feuille');
const ciseaux = document.getElementById('ciseaux');
let gameChoicesContainer = document.querySelector('.game__choices');

// Launcher's buttons
const startGame = document.querySelector('.start__launch button');
const nextTurn = document.querySelector('.next__turn');
const nextRound = document.querySelector('.next__round');
const validateChoice = document.querySelector('.game__validation')

// Round infos
const numOfRound = document.querySelector('.round');
const numOfTurn = document.querySelector('.turn');
const gamesPlayed = document.querySelector('.games__played');
const gameInstructions = document.querySelector('.game__instructions');
const turnResult = document.querySelector('.turn__result p');
const roundResult = document.querySelector('.round__result p');
const iaResult = document.querySelector('.ia__result');
const gameResult = document.querySelector('.game__result');

// Scores containers 
// player
const playerPoints = document.querySelector('.player__points');
const playerRoundWins = document.querySelector('.player__round__wins');
const playerWins = document.querySelector('.player__wins');
const playerLooses = document.querySelector('.player__looses');
// ia
const iaPoints = document.querySelector('.ia__points');
const iaRoundWins = document.querySelector('.ia__round__wins');
const iaWins = document.querySelector('.ia__wins');
const iaLooses = document.querySelector('.ia__looses');

// objects that allow to follow the scores
let player = {
    turnPoints: 0,
    roundPoints: 0,
    wins: 0,
    looses:0
}
let ia = {
    turnPoints: 0,
    roundPoints: 0,
    wins: 0,
    looses:0
}
let game = {
    turn: 0,
    round: 0,
    numberOfGames: 0
}



let iaChoices = ['pierre', 'feuille', 'ciseaux'];
let playerChoices = document.querySelectorAll('.choice');

const iaChoice = () => {
    let choice = iaChoices[Math.floor(Math.random()*iaChoices.length)];
    return choice;
}
const refreshRoundInfos = () => {
    gamesPlayed.textContent = game.numberOfGames
    numOfTurn.textContent = game.turn
    numOfRound.textContent = game.round
}
const enableButtons = () => {
    playerChoices.forEach(choice => {
        choice.removeAttribute('disabled')
    })
}
const refreshPlayerChoice = () => {
    playerChoices.forEach(choice => {
        choice.addEventListener('click', (e) => {
            playerChoice = e.target.id;
            console.log(playerChoice)
        });
    })
}
const refreshPlayersScores = () => {
    playerPoints.innerText = player.turnPoints;
    playerRoundWins.innerText = player.roundPoints;
    playerWins.innerText = player.wins;
    playerLooses.innerText = player.looses;
    iaPoints.innerText = ia.turnPoints;
    iaRoundWins.innerText = ia.roundPoints;
    iaWins.innerText = ia.wins;
    iaLooses.innerText = ia.looses;
}
let playerChoice;

// function that determine who win the game between the player and the IA
let whoWinTheTurn = (playerChoice, iaChoice) => {
    if (playerChoice === 'pierre') {
        if (iaChoice === 'feuille') {
            ia.turnPoints += 1;
            turnResult.textContent = `L'IA gagne ce tour !`;
        } else if (iaChoice === 'ciseaux') {
            player.turnPoints += 1;
            turnResult.textContent = `Le joueur gagne ce tour !`;
        } else if (iaChoice === playerChoice) {
            turnResult.textContent = `Egalité pour ce tour !`;
        }
    } else if (playerChoice === 'feuille') {
        if (iaChoice === 'feuille') {
            turnResult.textContent = `Egalité pour ce tour !`;
        } else if (iaChoice === 'ciseaux') {
            ia.turnPoints += 1;
            turnResult.textContent = `L'IA gagne ce tour !`;
        } else if (iaChoice === 'pierre') {
            player.turnPoints += 1;
            turnResult.textContent = `Le joueur gagne ce tour !`;
        }
    } else if (playerChoice === 'ciseaux') {
        if (iaChoice === 'feuille') {
            player.turnPoints += 1;
            turnResult.textContent = `Le joueur gagne ce tour !`;
        } else if (iaChoice === 'ciseaux') {
            turnResult.textContent = `Egalité pour ce tour !`;
        } else if (iaChoice === 'pierre') {
            ia.turnPoints += 1;
            turnResult.textContent = `L'IA gagne ce tour !`;
        }
    }
}

startGame.addEventListener('click', () => {
    if (game.turn === 0 && game.round === 0) {
        turnResult.innerText = '';
        iaResult.innerText = "";
        roundResult.innerText = '';
        gameResult.innerText = '' 
        startGame.style.display = 'none';
        validateChoice.style.display ='block'
        game.turn += 1;
        game.round += 1;
        refreshRoundInfos();
        enableButtons();
        refreshPlayerChoice();
    }   
})

validateChoice.addEventListener('click', () => {
    if (playerChoice !== undefined) {
        nextTurn.style.display = 'block';
        validateChoice.style.display = 'none';
        if (game.turn <= 5) {
            let iaChoiceForThatTurn = iaChoice();
            iaResult.innerText = `Le choix de l'ia est: ${iaChoiceForThatTurn}.`;
            whoWinTheTurn(playerChoice, iaChoiceForThatTurn);
            refreshPlayersScores();
            game.turn += 1;
        }
        if (game.turn > 5) {  
            if (player.turnPoints > ia.turnPoints) {
                player.roundPoints += 1;
                refreshPlayersScores();
                roundResult.innerText = 'Le joueur gagne la manche !'
            } else if (ia.turnPoints > player.turnPoints) {
                ia.roundPoints += 1;
                refreshPlayersScores();
                roundResult.innerText = `L'IA gagne la manche !` 
            } else {
                roundResult.innerText = `Personne ne remporte cette manche !` 
            } 
            nextRound.style.display = 'block';
            nextTurn.style.display = 'none';
            if (player.roundPoints === 2 || ia.roundPoints === 2) {
                if (player.roundPoints === 2) {
                    player.wins += 1;
                    ia.looses += 1;
                    gameResult.innerText = 'Le joueur remporte la partie !' 
                    refreshPlayersScores();  
                } else {
                    gameResult.innerText = `L'IA remporte la partie !`
                    ia.wins += 1;
                    player.looses += 1;
                    refreshPlayersScores();
                }
                player.turnPoints = 0;
                player.roundPoints = 0;
                ia.turnPoints = 0;
                ia.roundPoints = 0;
                game.turn = 0;
                game.round = 0;
                nextRound.style.display = 'none';
                startGame.style.display = 'block';
                game.numberOfGames += 1
                refreshPlayersScores();
                refreshRoundInfos();
            }      
        }
    }
})

nextTurn.addEventListener('click', () => {
    nextTurn.style.display = 'none';
    validateChoice.style.display = 'block';
    turnResult.innerText = ""
    iaResult.innerText = ""
    refreshRoundInfos();
})

nextRound.addEventListener('click', () => {
    ia.turnPoints = 0;
    player.turnPoints = 0  
    game.turn = 1
    game.round += 1
    refreshPlayersScores();
    nextRound.style.display ='none';
    validateChoice.style.display = 'block';
    turnResult.innerText = "";
    roundResult.innerText = "";
    iaResult.innerText = "";
    refreshRoundInfos();

})




