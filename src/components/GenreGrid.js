import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { filmsGridData } from "./filmsGridData.js";
import getMovies from "./filmsData.js";


// films API:
// process.env.REACT_APP_FILMS_API_KEY
// example https://api.themoviedb.org/3/movie/76341?api_key=process.env.REACT_APP_FILMS_API_KEY





function GenreGrid (props) {

  const [genre, setGenre] = useState(null); 
  

  return (
    <div
      style={{'flexWrap': "wrap",
    'justifyContent': "space-around",
    'overflow': "hidden",}}      
    >    
        {this.fetchMovies()}
      
    </div>
  );


}
export default GenreGrid