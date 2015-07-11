/** jsx React.DOM */

export const GameCellStatus = {
	NONE: 'none',
	X: 'X',
	Y: 'Y'
};

export class GameCell extends React.Component {

	isEmptyCell() {
		return this.props.status === GameCellStatus.NONE;
	}

	render() {
		let classNames = ['game-cell', 'cell-status-' + this.props.status.toLowerCase()].join(' ');
		let symbol = !this.isEmptyCell() ? this.props.status : '';

		const clickOnCell = this.props.clickOnCell.bind(this, { 
			line: this.props.line, column: this.props.column 
		});

		return (
			<div className={ classNames } onClick={clickOnCell}>
				<span className="game-cell-symbol">{symbol}</span>
				{`${this.props.column}, ${this.props.line}`}
			</div>
		);
	}
};