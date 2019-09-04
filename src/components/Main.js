import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FilmGrid from "./FilmGrid.js";
import OneMoviePage from "./OneMoviePage.js"
import MenuGrid from "./MenuGrid.js"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav.js'


function Main(props) {

	return (
		<React.Fragment>
			<CssBaseline />
			<Router>
			<Container maxWidth="lg">
			<Nav />
					<Switch>
						<Route path='/' exact component={MenuGrid}></Route>
						<Route path='/genre' component={FilmGrid}></Route>
						<Route path='/movie' component={OneMoviePage}></Route>
					</Switch>
				
			</Container>
			</Router>
		</React.Fragment>
	);

}

const mapStateToProps = state => ({
	movies: state.movies.movies,
	genre: state.page.currentGenre,
	onePage: state.page.currentMovie,
	isFetching: state.movies.isFetching,
})

export default connect(mapStateToProps, null)(Main) 