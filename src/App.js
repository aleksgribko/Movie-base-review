import React, { Component } from 'react';

import Main from './components/Main.js'
import Footer from './components/Footer.js'
import './App.css';

import { filmsGridData } from "./components/filmsGridData.js";

import { connect } from 'react-redux'
import { fetchMovies } from './actions/action.js'


class App extends Component {   
  constructor() {
		super();				
  }
  
  componentDidMount() {	
		let allMoviesIds = []	
		let mappedGenre
		for (let oneGenre of filmsGridData) {  
			mappedGenre = oneGenre.search
			for (let oneId of oneGenre.moviesId) { 
				allMoviesIds = [...allMoviesIds, {id: oneId, genre: mappedGenre}]  
			}			    
		}	
		this.props.fetchMovies(allMoviesIds)
	}

  render(){
    return (
      <div className="App">        
        <Main />
        <Footer />
      </div>
    );
  }  
}

export default connect(null, { fetchMovies })(App) 
