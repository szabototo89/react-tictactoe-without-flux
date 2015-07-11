/** jsx React.DOM */

const { GameTable, GameStatus } = require('./GameTable');
const { GameMenu } = require('./GameMenu');
const { NotificationBar } = require('./NotificationBar');
const { GameCellStatus } = require('./GameCell')

export class MainApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.reinitializeGameState(props);
    }

    reinitializeGameState({ size: tableSize }) {
        return {
            winnerNotification: undefined,
            currentPlayer: 0,
            freeCellCount: tableSize * tableSize,
            size: tableSize,

            table: Array(tableSize).fill(0).map(() => {
                return Array(tableSize).fill(undefined);
            }),

            // scores: [row1, row2, row3, col1, col2, col3, diag1, diag2]
            scores: Array(2 * tableSize + 2).fill(0),

            isGameRunning: true
        };
    }

    getTableSize() {
        return this.state.size;
    }

    canChangeCellStatus({ line, column }) {
        var cell = this.state.table[line][column];
        return !cell;
    }

    getCellState({ line, column }) {
        return this.state.table[line][column];
    }

    getCellStatusByPlayer(playerIndex) {
        if (playerIndex === 0) {
            return GameCellStatus.X;
        }
        else if (playerIndex === 1) {
            return GameCellStatus.Y;
        }        

        throw Error(`undefined player index (${ playerIndex })`);
    }

    setCellState({ line, column }) {
        const { table } = this.state;
        const cell = this.getCellState({ line, column });
        table[line][column] = this.getCellStatusByPlayer(this.state.currentPlayer);
        
        return table;
    }

    updateScores({ line, column }) {
        const { scores } = this.state;
        const tableSize = this.getTableSize();
        const point = this.state.currentPlayer === 0 ? 1 : -1;

        // scores: [row1, row2, row3, col1, col2, col3, diag1, diag2]
        scores[line] += point;
        scores[tableSize + column] += point;

        if (line === column) {
            scores[2 * tableSize] += point;
        }

        if (tableSize - 1 - column === line) {
            scores[2 * tableSize + 1] += point;
        }
    }

    changePlayer() {
        return (this.state.currentPlayer + 1) % 2;
    }

    isGameOver() {
        const { scores, freeCellCount } = this.state;
        const tableSize = this.getTableSize();
        return freeCellCount === 0 || 
               scores.some((value) => { 
                   return [ tableSize, -tableSize ].indexOf(value) !== -1;
               });
    }

    calculateWinnerAndGameState() {
        const { scores } = this.state;

        for (let score of scores) {
            if (score === this.getTableSize()) {
                return { winner: 0, state: GameStatus.WIN }
            }
            else if (score === -this.getTableSize()) {
                return { winner: 1, state: GameStatus.WIN }
            }
        }

        return { winner: null, state: GameStatus.TIE };
    }

    handleGameOver({ winner, state }) {
        this.setState({ 
            winnerNotification: { winner, state }, 
            isGameRunning: false 
        });
    }
    
    handleGameCellSelection(coords) {
        if (!this.state.isGameRunning) return;
        const table = this.setCellState(coords);
        const currentPlayer = this.changePlayer();
        const freeCellCount = this.state.freeCellCount - 1;
        const scores = this.updateScores(coords);

        this.setState({
            table, currentPlayer, freeCellCount 
        });

        if (this.isGameOver()) {
            const { winner, state } = this.calculateWinnerAndGameState();
            this.handleGameOver({ winner, state });
        }
    }

    handleNewGame(options) {
        this.setState(this.reinitializeGameState(options));
    }

    render() {
        let notification = undefined;
        let { 
            winnerNotification, 
            currentPlayer,
            table
        } = this.state;

        return (
            <div>
                <GameMenu startNewGame={this.handleNewGame.bind(this)} />
                <NotificationBar gameOverResult={winnerNotification} currentPlayer={currentPlayer} />
                <GameTable size={this.getTableSize()} 
                           table={table} 
                           selectGameCell={this.handleGameCellSelection.bind(this)}
                           gameOverEvent={this.handleGameOver.bind(this)}/>
            </div>
        );
    }
};