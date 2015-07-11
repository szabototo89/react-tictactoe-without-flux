/** jsx React.DOM */

const { GameCell, GameCellStatus } = require('./GameCell')
const utils = require('../utils');

export const GameStatus = {
    WIN: 'win',
    TIE: 'tie'
}

export class GameTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    getTableSize() {
        return this.props.size;
    }

    getCellStatus({ line: lineIndex, column: columnIndex }) {
        var line = this.props.table[lineIndex];
        if (!line) return GameCellStatus.NONE;

        var status = line[columnIndex];
        return status || GameCellStatus.NONE;
    }

    handleClickOnCell(coords) {
        if (this.getCellStatus(coords) !== GameCellStatus.NONE) {
            return;
        }

        this.props.selectGameCell(coords);
    }

    createCell({ line, column }) {
        var cellStatus = this.getCellStatus({ line, column });

        return (<GameCell status={cellStatus} 
                          line={line} 
                          column={column} 
                          clickOnCell={this.handleClickOnCell.bind(this)} />);
    }

    createLine({ size, line }) {
        const range = utils.range(0, size);
        const cells = range.map((value, column) => {
            return this.createCell({ line, column });
        });

        return (
            <div className="game-line">
                {cells}
            </div>
        )
    }

    render() {
        const range = utils.range(0, this.getTableSize());
        let lines = range.map((value, line) => {
            return this.createLine({ size: this.getTableSize(), line });
        });
        lines = _.flatten(lines);

        return (<div className={"game-table"}>{lines}</div>);
    }
}