import React from 'react'
import ReactDom from 'react-dom'
import './board.css'
import primera from '../imagenes/absolem.jpg'
import segunda from '../imagenes/alice.jpg'
import tercera from '../imagenes/bolitas.jpg'
import cuarta from '../imagenes/hatter.jpg'
import quinta from '../imagenes/mouse.jpg'
import sexta from '../imagenes/rabbit.jpg'
import septima from '../imagenes/redQ.jpg'
import octava from '../imagenes/whiteQ.jpg'

class Board extends React.Component{
	
	constructor(props){
		super(props)

		this.state = {
			selected: null,
			board: null,
			cols: 4,
			rows: 4,
			current: null,
			cartasState: Array(16).fill('carta'),
			refresh: true,
			images: [primera, segunda, tercera, cuarta, quinta, sexta, septima, octava],
			ranImgs: Array(16).fill(null),
			cont: 0
		}

		this.randomizeGrid();
	}

	handleClick(index){
		if (this.state.selected === index || !this.state.refresh) return;

		this.setState({current: index});
		this.state.cartasState[index] = 'carta vueltecita';

		if (this.state.selected != null) {

			this.setState({refresh: false})
			setTimeout(() => {
				if (this.state.board[index] == this.state.board[this.state.selected]) {
					console.log("Partida terminada.");
					this.state.cont++;
					if (this.state.cont == 8) {
						alert("Partida terminada.");
					}
				} else {
					this.state.cartasState[this.state.selected] = 'carta';
					this.state.cartasState[index] = 'carta';
				}
				this.setState({
					selected: this.state.selected == null ? index : null,
					refresh: true
				});
			}, 500);

		} else {
			this.setState({selected: this.state.selected == null ? index : null});
		}
	}

	randomizeGrid() {
		const cartasCont = this.state.cols * this.state.rows;
		let numbers = [...Array(cartasCont).keys()];

		let newGrid = [];
		for (let i = 0; i < cartasCont; i++) {
			let randomPos = Math.floor(Math.random()*numbers.length);
			newGrid.push(Math.floor(numbers[randomPos]/2));
			this.state.ranImgs[i] = (this.state.images[Math.floor(numbers[randomPos]/2)]);
			numbers.splice(randomPos,1);
		}
		this.state.board = newGrid;
	}

	render(){
		return (
			<div className = "main-completo">
			<div className = "super-grid">
				{
					this.state.board.map((el, index)=>{
						return (
							<div className="box-carta">
								<div className = {this.state.cartasState[index]}>
									<div
										key={index}
										className="front"
										onClick = {this.handleClick.bind(this, index)}>
									</div>
									<div
										style = {{backgroundImage: 'url(' +this.state.ranImgs[index]+ ')',
										backgroundPosition: 'center',
										backgroundSize: 'cover'}}
										key={40+index}
										className="esconder">
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
			</div>
		)
	}
}

ReactDom.render(
	<Board />,
	document.getElementById('root')
)
