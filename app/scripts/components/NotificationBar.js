/** jsx React.DOM */

export class NotificationBar extends React.Component {
	getSymbolOfPlayer(playerIndex) {
		return playerIndex === 0 ? 'X' : 'Y';
	}

	render() {
		const { gameOverResult, currentPlayer } = this.props;
		const currentPlayerSymbol = this.getSymbolOfPlayer(currentPlayer);

		if (gameOverResult) {
			return (
				<div>Game Over!</div>
			);
		}

		return <div>Current player: <span className="currentPlayer">{currentPlayerSymbol}</span></div>;
	}
}