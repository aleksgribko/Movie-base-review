import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FilmGrid from "./FilmGrid.js";
import { filmsGridData } from "./filmsGridData.js";

const keyAPI = process.env.REACT_APP_FILMS_API_KEY;
const baseURL = "https://api.themoviedb.org/3/movie/";

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			comedies: [],
			fantastic: [],
			mainstream: [],
			action: [],
			criminal: [],
			drama: [],	

		};		
	}	

	componentDidMount() {		
		for (let oneGenre of filmsGridData) {
			for (let oneMovie of oneGenre.moviesId) {
				let url = `${baseURL}${oneMovie}?language=en-US&api_key=${keyAPI}`;
				fetch(url)
					.then(result => {
						return result.json();
					})
					.then(data => {
						let movie = {
							name: data.original_title,
							descr: data.overview,
							pic: `https://image.tmdb.org/t/p/w500${
								data.poster_path
							}`,
							tagline: data.tagline,
							rank: data.vote_average
						};

						console.log(oneGenre.search)

						switch (oneGenre.search) {
							case "comedies":							
								let comediesArray = [...this.state.comedies];
								comediesArray.push(movie);
								console.log(comediesArray)
								this.setState({ comedies: comediesArray });								
								break;
							case "fantastic":
								let fantasticArray = [...this.state.fantastic];
								fantasticArray.push(movie);
								this.setState({ fantastic: fantasticArray });
								break;
							case "mainstream":
								let mainstreamArray = [
									...this.state.mainstream
								];
								mainstreamArray.push(movie);
								this.setState({ mainstream: mainstreamArray });
								break;
							case "action":
								let actionArray = [...this.state.action];
								actionArray.push(movie);
								this.setState({ action: actionArray });
								break;
							case "criminal":
								let criminalArray = [...this.state.criminal];
								criminalArray.push(movie);
								this.setState({ criminal: criminalArray });
								break;
							case "drama":
								let dramaArray = [...this.state.drama];
								dramaArray.push(movie);
								this.setState({ drama: dramaArray });
								break;
							default:
								this.setState({
									comedies: [],
									fantastic: [],
									mainstream: [],
									action: [],
									criminal: [],
									drama: []
								});
						}
					})
					.catch(err => {
						//	result.json({
						//		error: error
						//	})
						console.log(err);
					});
			}
		}		
}
	render() {
		console.log(this.state);
		return (
			<React.Fragment>
				<CssBaseline />
				<Container maxWidth="lg">
					<FilmGrid moviesAll={this.state}/>
				</Container>
			</React.Fragment>
		);
	}
}
