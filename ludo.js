// Main Ludo Game Class
class LudoGame {
    constructor() {
        // Game elements
        this.gameSetup = document.getElementById('gameSetup');
        this.playerSetup = document.getElementById('playerSetup');
        this.gameContainer = document.getElementById('gameContainer');
        this.gameBoard = document.getElementById('gameBoard');
        this.diceContainer = document.getElementById('diceContainer');
        this.dice = document.getElementById('dice');
        this.statusBar = document.getElementById('statusBar');
        this.gameStatus = document.getElementById('gameStatus');
        this.playerTurns = document.getElementById('playerTurns');
        this.winnerDisplay = document.getElementById('winnerDisplay');
        this.winnerName = document.getElementById('winnerName');
        
        // Game state
        this.mode = 'computer';
        this.players = [];
        this.currentPlayerIndex = 0;
        this.diceValue = 1;
        this.isRolling = false;
        this.gameStarted = false;
        this.selectablePawns = [];
        this.gameEnded = false;
        
        // Color mapping
        this.colorMap = {
            0: 'red',
            1: 'green',
            2: 'yellow',
            3: 'blue',
            4: 'purple',
            5: 'cyan'
        };
        
        // Path colors for start and end points
        this.pathColors = {
            red: '#ff0000',
            green: '#00aa00',
            yellow: '#ffcc00',
            blue: '#0066ff',
            purple: '#8338ec',
            cyan: '#00b4d8'
        };
        
        // Default player names
        this.defaultNames = {
            0: 'Red Player',
            1: 'Green Player',
            2: 'Yellow Player',
            3: 'Blue Player',
            4: 'Purple Player', 
            5: 'Cyan Player',
            'computer': 'Computer'
        };
        
        // Board configuration
        this.boardSetup = {
            red: {
                home: [0, 0],
                start: [6, 1],
                pawns: [
                    { position: 'home', index: 0, steps: 0 },
                    { position: 'home', index: 1, steps: 0 },
                    { position: 'home', index: 2, steps: 0 },
                    { position: 'home', index: 3, steps: 0 }
                ],
                homeCells: [[1, 1], [1, 4], [4, 1], [4, 4]],
                pathEnd: [7, 7],
                finalLane: [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]]
            },
            green: {
                home: [0, 10],
                start: [1, 8],
                pawns: [
                    { position: 'home', index: 0, steps: 0 },
                    { position: 'home', index: 1, steps: 0 },
                    { position: 'home', index: 2, steps: 0 },
                    { position: 'home', index: 3, steps: 0 }
                ],
                homeCells: [[1, 10], [1, 13], [4, 10], [4, 13]],
                pathEnd: [7, 7],
                finalLane: [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]]
            },
            yellow: {
                home: [10, 10],
                start: [8, 13],
                pawns: [
                    { position: 'home', index: 0, steps: 0 },
                    { position: 'home', index: 1, steps: 0 },
                    { position: 'home', index: 2, steps: 0 },
                    { position: 'home', index: 3, steps: 0 }
                ],
                homeCells: [[10, 10], [10, 13], [13, 10], [13, 13]],
                pathEnd: [7, 7],
                finalLane: [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7]]
            },
            blue: {
                home: [10, 0],
                start: [13, 6],
                pawns: [
                    { position: 'home', index: 0, steps: 0 },
                    { position: 'home', index: 1, steps: 0 },
                    { position: 'home', index: 2, steps: 0 },
                    { position: 'home', index: 3, steps: 0 }
                ],
                homeCells: [[10, 1], [10, 4], [13, 1], [13, 4]],
                pathEnd: [7, 7],
                finalLane: [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]]
            },
            purple: {
                home: [0, 5],
                start: [1, 6],
                pawns: [
                    { position: 'home', index: 0, steps: 0 },
                    { position: 'home', index: 1, steps: 0 },
                    { position: 'home', index: 2, steps: 0 },
                    { position: 'home', index: 3, steps: 0 }
                ],
                homeCells: [[1, 6], [1, 8], [3, 6], [3, 8]],
                pathEnd: [7, 7],
                finalLane: [[5, 7], [6, 7], [7, 7], [7, 7], [7, 7], [7, 7]]
            },
            cyan: {
                home: [5, 14],
                start: [6, 13],
                pawns: [
                    { position: 'home', index: 0, steps: 0 },
                    { position: 'home', index: 1, steps: 0 },
                    { position: 'home', index: 2, steps: 0 },
                    { position: 'home', index: 3, steps: 0 }
                ],
                homeCells: [[6, 11], [6, 13], [8, 11], [8, 13]],
                pathEnd: [7, 7],
                finalLane: [[7, 9], [7, 8], [7, 7], [7, 7], [7, 7], [7, 7]]
            }
        };
        
        // Path configuration for each color
        this.paths = {
            red: [
                [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [5, 6], 
                [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7],
                [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8],
                [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14],
                [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10],
                [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
                [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6],
                [10, 6], [9, 6], [8, 5], [8, 4], [8, 3], [8, 2],
                [8, 1], [8, 0], [7, 0], [6, 0], [7, 1], [7, 2],
                [7, 3], [7, 4], [7, 5], [7, 6]
            ],
            green: [
                [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9],
                [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14],
                [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9],
                [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8],
                [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6],
                [9, 6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1],
                [8, 0], [7, 0], [6, 0], [6, 1], [6, 2], [6, 3],
                [6, 4], [6, 5], [5, 6], [4, 6], [3, 6], [2, 6],
                [1, 6], [0, 6], [0, 7], [0, 8], [1, 7], [2, 7],
                [3, 7], [4, 7], [5, 7], [6, 7]
            ],
            yellow: [
                [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8],
                [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7],
                [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [9, 6],
                [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
                [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4],
                [6, 5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6],
                [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8],
                [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12],
                [6, 13], [6, 14], [7, 14], [8, 14], [7, 13], [7, 12],
                [7, 11], [7, 10], [7, 9], [7, 8]
            ],
            blue: [
                [13, 6], [12, 6], [11, 6], [10, 6], [9, 6], [8, 5],
                [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0],
                [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
                [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
                [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8],
                [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13],
                [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11],
                [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8],
                [13, 8], [14, 8], [14, 7], [14, 6], [13, 7], [12, 7],
                [11, 7], [10, 7], [9, 7], [8, 7]
            ],
            purple: [
                [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 5],
                [6, 4], [6, 3], [6, 2], [6, 1], [6, 0], [7, 0],
                [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
                [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6],
                [14, 7], [14, 8], [13, 8], [12, 8], [11, 8], [10, 8],
                [9, 8], [8, 9], [8, 10], [8, 11], [8, 12], [8, 13],
                [8, 14], [7, 14], [6, 14], [6, 13], [6, 12], [6, 11],
                [6, 10], [6, 9], [5, 8], [4, 8], [3, 8], [2, 8],
                [1, 8], [0, 8], [0, 7], [0, 6], [5, 7], [6, 7]
            ],
            cyan: [
                [6, 13], [6, 12], [6, 11], [6, 10], [6, 9], [5, 8],
                [4, 8], [3, 8], [2, 8], [1, 8], [0, 8], [0, 7],
                [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
                [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0],
                [7, 0], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4],
                [8, 5], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
                [14, 6], [14, 7], [14, 8], [13, 8], [12, 8], [11, 8],
                [10, 8], [9, 8], [8, 9], [8, 10], [8, 11], [8, 12],
                [8, 13], [8, 14], [7, 14], [6, 14], [7, 13], [7, 12],
                [7, 11], [7, 10], [7, 9], [7, 8]
            ]
        };
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    // Initialize event listeners
    setupEventListeners() {
        // Mode selection
        const modeButtons = document.querySelectorAll('.mode-selection .btn');
        modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                modeButtons.forEach(btn => btn.classList.remove('btn-primary'));
                button.classList.add('btn-primary');
                this.mode = button.getAttribute('data-mode');
                this.generatePlayerSetup();
            });
        });
        
        // Start game button
        document.getElementById('startGame').addEventListener('click', () => {
            this.initializeGame();
        });
        
        // Dice roll
        this.dice.addEventListener('click', () => {
            if (!this.isRolling && this.gameStarted && !this.gameEnded) {
                this.rollDice();
            }
        });
        
        // New game button
        document.getElementById('newGame').addEventListener('click', () => {
            this.resetGame();
            this.gameSetup.style.display = 'block';
            this.gameContainer.style.display = 'none';
        });
        
        // Reset game button
        document.getElementById('resetGame').addEventListener('click', () => {
            this.resetGame();
            this.initializeGame();
        });
        
        // Play again button (after winner)
        document.getElementById('playAgain').addEventListener('click', () => {
            this.winnerDisplay.style.display = 'none';
            this.resetGame();
            this.gameSetup.style.display = 'block';
            this.gameContainer.style.display = 'none';
        });
        
        // Rules button
        document.getElementById('rulesBtn').addEventListener('click', () => {
            document.getElementById('rulesModal').style.display = 'flex';
        });
        
        // Close rules
        document.getElementById('closeRules').addEventListener('click', () => {
            document.getElementById('rulesModal').style.display = 'none';
        });
        
        // Close rules when clicking outside
        document.getElementById('rulesModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('rulesModal')) {
                document.getElementById('rulesModal').style.display = 'none';
            }
        });
    }
    
    // Generate player setup based on selected mode
    generatePlayerSetup() {
        this.playerSetup.innerHTML = '';
        
        let numPlayers = 0;
        let showComputer = false;
        
        switch(this.mode) {
            case 'computer':
                numPlayers = 1;
                showComputer = true;
                break;
            case '2player':
                numPlayers = 2;
                break;
            case '3player':
                numPlayers = 3;
                break;
            case '4player':
                numPlayers = 4;
                break;
            case '5player':
                numPlayers = 5;
                break;
            case '6player':
                numPlayers = 6;
                break;
        }
        
        // Create player name inputs
        for (let i = 0; i < numPlayers; i++) {
            const color = this.colorMap[i];
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player-input';
            
            const label = document.createElement('label');
            label.innerHTML = `<span class="color-indicator" style="background-color: var(--${color});"></span> Player ${i + 1} Name:`;
            
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `player${i}`;
            input.placeholder = this.defaultNames[i];
            input.value = this.defaultNames[i];
            
            playerDiv.appendChild(label);
            playerDiv.appendChild(input);
            this.playerSetup.appendChild(playerDiv);
        }
        
        // Add computer player for computer mode
        if (showComputer) {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player-input';
            
            const label = document.createElement('label');
            label.innerHTML = `<span class="color-indicator" style="background-color: var(--green);"></span> Computer Name:`;
            
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'computerPlayer';
            input.placeholder = this.defaultNames['computer'];
            input.value = this.defaultNames['computer'];
            
            playerDiv.appendChild(label);
            playerDiv.appendChild(input);
            this.playerSetup.appendChild(playerDiv);
        }
    }
    
    // Initialize the game
    initializeGame() {
        // Setup players
        this.players = [];
        let numPlayers = 0;
        
        switch(this.mode) {
            case 'computer':
                numPlayers = 2;
                // Human player
                const playerName = document.getElementById('player0').value || this.defaultNames[0];
                this.players.push({
                    name: playerName,
                    color: this.colorMap[0],
                    isComputer: false,
                    pawnsHome: 4,
                    pawnsFinished: 0
                });
                
                // Computer player
                const computerName = document.getElementById('computerPlayer').value || this.defaultNames['computer'];
                this.players.push({
                    name: computerName,
                    color: this.colorMap[1],
                    isComputer: true,
                    pawnsHome: 4,
                    pawnsFinished: 0
                });
                break;
            default:
                numPlayers = parseInt(this.mode.charAt(0));
                for (let i = 0; i < numPlayers; i++) {
                    const playerName = document.getElementById(`player${i}`).value || this.defaultNames[i];
                    this.players.push({
                        name: playerName,
                        color: this.colorMap[i],
                        isComputer: false,
                        pawnsHome: 4,
                        pawnsFinished: 0
                    });
                }
        }
        
        // Setup board
        this.createBoard();
        
        // Setup pawns
        this.setupPawns();
        
        // Show game container, hide setup
        this.gameSetup.style.display = 'none';
        this.gameContainer.style.display = 'block';
        
        // Update player turn indicators
        this.updatePlayerTurns();
        
        // Set game as started
        this.gameStarted = true;
        this.currentPlayerIndex = 0;
        this.gameStatus.textContent = `${this.players[0].name}'s turn. Roll the dice!`;
        
        // If computer goes first, trigger its turn
        if (this.players[0].isComputer) {
            setTimeout(() => this.computerTurn(), 1000);
        }
    }
    
    // Create the game board
    createBoard() {
        this.gameBoard.innerHTML = '';
        
        // Create cells
        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 15; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                
                // Add color to starting points
                Object.entries(this.boardSetup).forEach(([color, config]) => {
                    const [startX, startY] = config.start;
                    if (x === startX && y === startY) {
                        cell.classList.add(`start-point`, `start-point-${color}`);
                    }
                });
                
                // Add color to ending points
                Object.entries(this.boardSetup).forEach(([color, config]) => {
                    const [endX, endY] = config.pathEnd;
                    if (x === endX && y === endY) {
                        cell.classList.add(`end-point`, `end-point-${color}`);
                    }
                });
                
                // Add home areas
                if (this.isInHomeArea(x, y, 'red')) {
                    cell.classList.add('home-red');
                } else if (this.isInHomeArea(x, y, 'green')) {
                    cell.classList.add('home-green');
                } else if (this.isInHomeArea(x, y, 'yellow')) {
                    cell.classList.add('home-yellow');
                } else if (this.isInHomeArea(x, y, 'blue')) {
                    cell.classList.add('home-blue');
                } else if (this.isInHomeArea(x, y, 'purple')) {
                    cell.classList.add('home-purple');
                } else if (this.isInHomeArea(x, y, 'cyan')) {
                    cell.classList.add('home-cyan');
                }
                
                // Add colored paths
                if (this.isInPath(x, y, 'red')) {
                    cell.classList.add('path-red');
                } else if (this.isInPath(x, y, 'green')) {
                    cell.classList.add('path-green');
                } else if (this.isInPath(x, y, 'yellow')) {
                    cell.classList.add('path-yellow');
                } else if (this.isInPath(x, y, 'blue')) {
                    cell.classList.add('path-blue');
                } else if (this.isInPath(x, y, 'purple')) {
                    cell.classList.add('path-purple');
                } else if (this.isInPath(x, y, 'cyan')) {
                    cell.classList.add('path-cyan');
                }
                
                // Add center
                if (x === 7 && y === 7) {
                    cell.classList.add('center');
                    cell.innerHTML = '<i class="fas fa-trophy"></i>';
                }
                
                this.gameBoard.appendChild(cell);
            }
        }
    }
    
    // Check if coordinates are in a home area
    isInHomeArea(x, y, color) {
        if (color === 'red' && x >= 0 && x <= 5 && y >= 0 && y <= 5) {
            return true;
        } else if (color === 'green' && x >= 0 && x <= 5 && y >= 9 && y <= 14) {
            return true;
        } else if (color === 'yellow' && x >= 9 && x <= 14 && y >= 9 && y <= 14) {
            return true;
        } else if (color === 'blue' && x >= 9 && x <= 14 && y >= 0 && y <= 5) {
            return true;
        } else if (color === 'purple' && x >= 0 && x <= 4 && y >= 5 && y <= 9) {
            return true;
        } else if (color === 'cyan' && x >= 5 && x <= 9 && y >= 10 && y <= 14) {
            return true;
        }
        return false;
    }
    
    // Check if coordinates are in a path
    isInPath(x, y, color) {
        const colorPaths = this.paths[color] || [];
        return colorPaths.some(([pathX, pathY]) => pathX === x && pathY === y);
    }
    
    // Setup pawns on the board
    setupPawns() {
        for (let playerIndex = 0; playerIndex < this.players.length; playerIndex++) {
            const player = this.players[playerIndex];
            const color = player.color;
            const boardConfig = this.boardSetup[color];
            
            // Reset pawn data
            boardConfig.pawns = [
                { position: 'home', index: 0, steps: 0 },
                { position: 'home', index: 1, steps: 0 },
                { position: 'home', index: 2, steps: 0 },
                { position: 'home', index: 3, steps: 0 }
            ];
            
            // Place pawns in home cells
            for (let i = 0; i < 4; i++) {
                const [homeX, homeY] = boardConfig.homeCells[i];
                const pawnElement = document.createElement('div');
                pawnElement.className = `pawn pawn-${color}`;
                pawnElement.dataset.player = playerIndex.toString();
                pawnElement.dataset.pawn = i.toString();
                pawnElement.dataset.position = 'home';
                pawnElement.textContent = (i + 1).toString();
                
                pawnElement.addEventListener('click', () => {
                    this.handlePawnClick(playerIndex, i);
                });
                
                // Get the cell and append the pawn
                const cell = this.getCellAt(homeX, homeY);
                if (cell) {
                    cell.appendChild(pawnElement);
                }
            }
        }
    }
    
    // Get a cell element at specific coordinates
    getCellAt(x, y) {
        return document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    }
    
    // Add sound effects
playDiceSound() {
    const diceAudio = new Audio('https://www.soundjay.com/misc/sounds/dice-roll-01.mp3');
    diceAudio.play().catch(error => console.log('Audio playback failed:', error));
}

// Modify the rollDice method to include sound
rollDice() {
    if (this.isRolling) return;
    
    this.isRolling = true;
    this.dice.classList.add('rolling');
    
    // Play dice rolling sound
    this.playDiceSound();
    
    // Visual dice rolling
    const rollInterval = setInterval(() => {
        const randomFace = Math.floor(Math.random() * 6) + 1;
        this.updateDiceFace(randomFace);
    }, 100);
    
    // After a short delay, show the final result
    setTimeout(() => {
        clearInterval(rollInterval);
        this.dice.classList.remove('rolling');
        
        // Determine result (1-6)
        this.diceValue = Math.floor(Math.random() * 6) + 1;
        this.updateDiceFace(this.diceValue);
        
        // Add a bounce animation
        this.dice.classList.add('bounce');
        setTimeout(() => {
            this.dice.classList.remove('bounce');
        }, 1000);
        
        // Process turn based on dice roll
        this.processTurn();
    }, 1000);
}
    
    // Update the dice face display
    updateDiceFace(value) {
        // Clear previous dots
        this.dice.innerHTML = '';
        
        // Remove any previous classes
        this.dice.className = 'dice';
        
        // Use FontAwesome dice icons
        let icon;
        switch(value) {
            case 1: icon = 'fa-dice-one'; break;
            case 2: icon = 'fa-dice-two'; break;
            case 3: icon = 'fa-dice-three'; break;
            case 4: icon = 'fa-dice-four'; break;
            case 5: icon = 'fa-dice-five'; break;
            case 6: icon = 'fa-dice-six'; break;
            default: icon = 'fa-dice-one';
        }
        
        this.dice.innerHTML = `<i class="fas ${icon}"></i>`;
    }
    
    // Process the player's turn after rolling the dice
    processTurn() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        const color = currentPlayer.color;
        
        this.gameStatus.textContent = `${currentPlayer.name} rolled a ${this.diceValue}!`;
        
        // Get all pawns for current player
        const playerPawns = this.boardSetup[color].pawns;
        
        // Check if player can move any pawn
        const movablePawns = this.getMovablePawns(this.currentPlayerIndex, this.diceValue);
        
        setTimeout(() => {
            if (movablePawns.length === 0) {
                this.gameStatus.textContent = `${currentPlayer.name} can't move any pawn. Passing turn.`;
                
                // If rolled 6, player gets another turn
                if (this.diceValue === 6) {
                    this.gameStatus.textContent = `${currentPlayer.name} rolled a 6 but can't move. Roll again!`;
                } else {
                    // Next player's turn
                    setTimeout(() => {
                        this.nextPlayer();
                    }, 1500);
                }
            } else {
                // If computer player
                if (currentPlayer.isComputer) {
                    setTimeout(() => {
                        this.computerMovePawn(movablePawns);
                    }, 1000);
                } else {
                    // Human player - highlight movable pawns
                    this.selectablePawns = movablePawns;
                    this.highlightSelectablePawns();
                    this.gameStatus.textContent = `${currentPlayer.name}, select a pawn to move`;
                }
            }
            
            this.isRolling = false;
        }, 500);
    }
    
    // Get movable pawns for a player
    getMovablePawns(playerIndex, diceValue) {
        const player = this.players[playerIndex];
        const color = player.color;
        const boardConfig = this.boardSetup[color];
        const pawns = boardConfig.pawns;
        const movablePawns = [];
        
        for (let i = 0; i < pawns.length; i++) {
            const pawn = pawns[i];
            
            // If pawn is home and dice is 6, can move
            if (pawn.position === 'home' && diceValue === 6) {
                movablePawns.push(i);
            }
            // If pawn is on the path, check if it can move
            else if (pawn.position === 'path') {
                // Check if moving would exceed the path length
                if (pawn.steps + diceValue <= 56) {
                    movablePawns.push(i);
                }
            }
        }
        
        return movablePawns;
    }
    
    // Highlight selectable pawns
    highlightSelectablePawns() {
        // Remove previous highlights
        document.querySelectorAll('.pawn.selectable').forEach(pawn => {
            pawn.classList.remove('selectable');
        });
        
        // Add new highlights
        this.selectablePawns.forEach(pawnIndex => {
            const pawnElement = document.querySelector(`.pawn[data-player="${this.currentPlayerIndex}"][data-pawn="${pawnIndex}"]`);
            if (pawnElement) {
                pawnElement.classList.add('selectable');
            }
        });
    }
    
    // Handle pawn click
    handlePawnClick(playerIndex, pawnIndex) {
        // Only allow current player to move their pawns
        if (playerIndex !== this.currentPlayerIndex || this.isRolling) {
            return;
        }
        
        // Check if this pawn is selectable
        if (!this.selectablePawns.includes(pawnIndex)) {
            return;
        }
        
        this.movePawn(playerIndex, pawnIndex, this.diceValue);
    }
    
    // Move a pawn
    movePawn(playerIndex, pawnIndex, steps) {
        const player = this.players[playerIndex];
        const color = player.color;
        const boardConfig = this.boardSetup[color];
        const pawn = boardConfig.pawns[pawnIndex];
        
        // Get pawn element
        const pawnElement = document.querySelector(`.pawn[data-player="${playerIndex}"][data-pawn="${pawnIndex}"]`);
        
        // If pawn is in home and steps is 6, move to start position
        if (pawn.position === 'home' && steps === 6) {
            const [startX, startY] = boardConfig.start;
            pawn.position = 'path';
            pawn.steps = 0;
            
            // Check if there's an opponent pawn at the start position
            this.checkCapture(startX, startY, playerIndex);
            
            // Move pawn to start position
            const startCell = this.getCellAt(startX, startY);
            if (startCell) {
                startCell.appendChild(pawnElement);
                pawnElement.dataset.position = 'path';
                
                // Update counter
                player.pawnsHome--;
                
                // Animation
                pawnElement.classList.add('bounce');
                setTimeout(() => {
                    pawnElement.classList.remove('bounce');
                }, 1000);
            }
            
            // Player gets another turn for rolling a 6
            this.gameStatus.textContent = `${player.name} moved a pawn out! Roll again.`;
            
            // Clear selectable pawns
            this.selectablePawns = [];
            this.highlightSelectablePawns();
            
            // Computer plays again immediately
            if (player.isComputer) {
                setTimeout(() => {
                    this.computerTurn();
                }, 1500);
            }
            
            return;
        }
        
        // If pawn is on the path, move it
        if (pawn.position === 'path') {
            const path = this.paths[color];
            const currentStep = pawn.steps;
            const newStep = currentStep + steps;
            
            // Check if pawn will finish
            if (newStep === 56) {
                // Move pawn to center (finish)
                const finishCell = this.getCellAt(7, 7);
                if (finishCell) {
                    // Animation before removing
                    pawnElement.classList.add('celebrate');
                    setTimeout(() => {
                        // Remove pawn from board (reached center)
                        if (pawnElement.parentNode) {
                            pawnElement.parentNode.removeChild(pawnElement);
                        }
                        
                        // Update player's finished pawns
                        player.pawnsFinished++;
                        
                        // Check if player has won
                        if (player.pawnsFinished === 4) {
                            this.declareWinner(playerIndex);
                        } else {
                            // Player gets another turn for finishing a pawn
                            this.gameStatus.textContent = `${player.name} finished a pawn! Roll again.`;
                            
                            // Clear selectable pawns
                            this.selectablePawns = [];
                            this.highlightSelectablePawns();
                            
                            // Computer plays again immediately
                            if (player.isComputer) {
                                setTimeout(() => {
                                    this.computerTurn();
                                }, 1500);
                            }
                        }
                    }, 1000);
                }
                
                pawn.position = 'finished';
                return;
            }
            
            // Check if pawn will exceed the path
            if (newStep > 56) {
                this.gameStatus.textContent = `Can't move this pawn, it would exceed the finish line.`;
                return;
            }
            
            // Get the new position coordinates
            const [newX, newY] = path[newStep];
            
            // Check if there's an opponent pawn at the new position
            this.checkCapture(newX, newY, playerIndex);
            
            // Move pawn to new position
            const newCell = this.getCellAt(newX, newY);
            if (newCell) {
// Animate movement
const oldPosition = pawnElement.getBoundingClientRect();
newCell.appendChild(pawnElement);
const newPosition = pawnElement.getBoundingClientRect();

// Calculate translation distances
const deltaX = oldPosition.left - newPosition.left;
const deltaY = oldPosition.top - newPosition.top;

// Apply initial position
pawnElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

// Force browser reflow
pawnElement.offsetHeight;

// Transition to final position
pawnElement.style.transition = 'transform 0.5s ease-out';
pawnElement.style.transform = 'translate(0, 0)';

// Clear transition after animation
setTimeout(() => {
    pawnElement.style.transition = '';
}, 500);

// Update pawn data
pawn.steps = newStep;
}

// Clear selectable pawns
this.selectablePawns = [];
this.highlightSelectablePawns();

// Check if player gets another turn (rolled 6)
if (steps === 6) {
this.gameStatus.textContent = `${player.name} rolled a 6! Roll again.`;

// Computer plays again immediately
if (player.isComputer) {
    setTimeout(() => {
        this.computerTurn();
    }, 1500);
}
} else {
this.gameStatus.textContent = `${player.name} moved a pawn.`;

// Next player's turn
setTimeout(() => {
    this.nextPlayer();
}, 1000);
}
}
}

// Process capture and handle extra turn
processCaptureAndExtraTurn(currentPlayerIndex, captureOccurred) {
    if (captureOccurred) {
        const currentPlayer = this.players[currentPlayerIndex];
        
        // Show message about extra turn
        this.gameStatus.textContent = `${currentPlayer.name} gets an extra turn for capturing!`;
        
        // If computer player, take the extra turn after a delay
        if (currentPlayer.isComputer) {
            setTimeout(() => {
                this.computerTurn();
            }, 1500);
        }
        
        return true; // Indicates an extra turn should be given
    }
    return false;
}

// Check if there's an opponent pawn at the coordinates and capture it
checkCapture(x, y, currentPlayerIndex) {
    const cell = this.getCellAt(x, y);
    if (!cell) return;
    
    let captureOccurred = false;
    
    // Look for pawns in this cell
    const pawns = cell.querySelectorAll('.pawn');
    if (pawns.length === 0) return false;
    
    for (const pawn of pawns) {
        const pawnPlayerIndex = parseInt(pawn.dataset.player);
        const pawnIndex = parseInt(pawn.dataset.pawn);
        
        // Skip if it's the current player's pawn
        if (pawnPlayerIndex === currentPlayerIndex) continue;
        
        // Get opponent's data
        const opponent = this.players[pawnPlayerIndex];
        const opponentColor = opponent.color;
        const opponentConfig = this.boardSetup[opponentColor];
        
        // Check if the cell is a safe cell (colored path or star)
        if (this.isInPath(x, y, opponentColor) || cell.classList.contains('safe-cell')) {
            continue;
        }
        
        // Capture the pawn
        const capturedPawn = opponentConfig.pawns[pawnIndex];
        const [homeX, homeY] = opponentConfig.homeCells[pawnIndex];
        
        // Add capture animation class
        pawn.classList.add('captured');
        
        // Play capture sound
        const captureSound = new Audio('https://www.soundjay.com/misc/sounds/fail-buzzer-01.mp3');
        captureSound.play();
        
        setTimeout(() => {
            // Move back to home
            const homeCell = this.getCellAt(homeX, homeY);
            if (homeCell) {
                homeCell.appendChild(pawn);
                pawn.dataset.position = 'home';
                pawn.classList.remove('captured');
                
                // Update opponent's data
                capturedPawn.position = 'home';
                capturedPawn.steps = 0;
                opponent.pawnsHome++;
                
                // Show message
                this.gameStatus.textContent = `${this.players[currentPlayerIndex].name} captured ${opponent.name}'s pawn! Roll again!`;
            }
        }, 500);
        
        captureOccurred = true;
    }
    
    return captureOccurred;
}

// Switch to the next player
nextPlayer() {
    // Move to next player
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    const nextPlayer = this.players[this.currentPlayerIndex];
    
    // Update player turn indicators
    this.updatePlayerTurns();
    
    // Update status
    this.gameStatus.textContent = `${nextPlayer.name}'s turn. Roll the dice!`;
    
    // If next player is computer, trigger its turn
    if (nextPlayer.isComputer) {
        setTimeout(() => this.computerTurn(), 1000);
    }
}

// Computer's turn logic
computerTurn() {
    if (!this.gameStarted || this.gameEnded) return;
    
    // Roll dice
    this.rollDice();
}

// Computer's pawn movement logic
computerMovePawn(movablePawns) {
    if (movablePawns.length === 0) return;
    
    // Simple AI: prioritize moving pawns out of home, then move the furthest pawn
    let selectedPawnIndex;
    
    const player = this.players[this.currentPlayerIndex];
    const color = player.color;
    const pawns = this.boardSetup[color].pawns;
    
    // First priority: move pawns out of home if dice is 6
    if (this.diceValue === 6) {
        // Check if any pawn is in home
        for (const pawnIndex of movablePawns) {
            if (pawns[pawnIndex].position === 'home') {
                selectedPawnIndex = pawnIndex;
                break;
            }
        }
    }
    
    // If no pawn selected yet, move the furthest pawn
    if (selectedPawnIndex === undefined) {
        let furthestPawnIndex = movablePawns[0];
        let furthestSteps = pawns[furthestPawnIndex].steps;
        
        for (const pawnIndex of movablePawns) {
            const steps = pawns[pawnIndex].steps;
            if (steps > furthestSteps) {
                furthestPawnIndex = pawnIndex;
                furthestSteps = steps;
            }
        }
        
        selectedPawnIndex = furthestPawnIndex;
    }
    
    // Move the selected pawn
    this.movePawn(this.currentPlayerIndex, selectedPawnIndex, this.diceValue);
}

// Update player turn indicators
updatePlayerTurns() {
    this.playerTurns.innerHTML = '';
    
    this.players.forEach((player, index) => {
        const playerTurn = document.createElement('div');
        playerTurn.className = 'player-turn';
        playerTurn.style.backgroundColor = `var(--${player.color})`;
        playerTurn.textContent = player.name;
        
        if (index === this.currentPlayerIndex) {
            playerTurn.classList.add('active');
        }
        
        this.playerTurns.appendChild(playerTurn);
    });
}

// Declare a winner
declareWinner(playerIndex) {
    const winner = this.players[playerIndex];
    this.gameEnded = true;
    
    // Show winner display
    this.winnerName.textContent = winner.name;
    this.winnerDisplay.style.display = 'flex';
    
    // Create confetti effect
    this.createConfetti();
}

// Create confetti animation
createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random position
        confetti.style.left = Math.random() * 100 + 'vw';
        
        // Random color
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size
        const size = Math.random() * 10 + 5;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Random rotation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Random animation delay
        confetti.style.animationDelay = Math.random() * 5 + 's';
        
        // Append to winner display
        this.winnerDisplay.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Reset the game
resetGame() {
    // Reset game state
    this.gameStarted = false;
    this.gameEnded = false;
    this.currentPlayerIndex = 0;
    this.diceValue = 1;
    this.isRolling = false;
    this.selectablePawns = [];
    
    // Clear the board
    this.gameBoard.innerHTML = '';
    
    // Reset dice display
    this.updateDiceFace(1);
    
    // Reset status
    this.gameStatus.textContent = 'Choose a game mode to begin';
    this.playerTurns.innerHTML = '';
    
    // Hide winner display
    this.winnerDisplay.style.display = 'none';
    
    // Remove all confetti
    document.querySelectorAll('.confetti').forEach(el => el.remove());
}
}

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
const ludoGame = new LudoGame();

// Generate initial player setup for default mode (computer)
ludoGame.generatePlayerSetup();
});