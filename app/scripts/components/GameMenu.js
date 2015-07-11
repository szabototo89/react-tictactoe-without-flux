/** jsx React.DOM */

export class GameMenu extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isStartNewGameDialogVisible: false
		}
	}

	handleStartNewGame(options) {
		const { state } = options;

		if (state === 'show-dialog') {
			this.setState({ 
				isStartNewGameDialogVisible: true 
			});
		}
		else if (state === 'select-table-size') {
			const tableSize = parseInt(this.refs.tableSizeInput.getDOMNode().value);

			this.setState({
				isStartNewGameDialogVisible: false
			});

			this.props.startNewGame({ size: tableSize });
		}
		else {
			this.setState({ isStartNewGameDialogVisible: false });
		}
	}

	render() {
		const defaultButtonClasses = 'mdl-button mdl-js-button mdl-button--raised';

		if (this.state.isStartNewGameDialogVisible) {
			let startGame = this.handleStartNewGame.bind(this, {
				state: 'select-table-size'
			});

			let showMenu = this.handleStartNewGame.bind(this, {
				state: 'show-menu'
			});

			return (
				<div>
					<form action="#">
						<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label textfield-demo">
							<input className="mdl-textfield__input"
								   type="text" 
								   id="tableSizeSelector"
								   ref="tableSizeInput"/>

							<label className="mdl-textfield__label" htmlFor="tableSizeSelector">table size ...</label>
						</div>
						<button className={defaultButtonClasses} onClick={startGame}>Start!</button>
						<button className={defaultButtonClasses} onClick={showMenu}>Cancel</button>
					</form>

				</div>
			);
		}

		let showTableSizeSelector = this.handleStartNewGame.bind(this, {
			state: 'show-dialog'
		});

		return (
			<div>
				<button className={`${defaultButtonClasses} mdl-button--colored`} onClick={showTableSizeSelector}>New Game</button>
			</div>
		)
	}
}