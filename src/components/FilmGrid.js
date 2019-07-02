import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { filmsGridData } from "./filmsGridData.js";
import getMovies from "./filmsData.js";
import GenreGrid from "./GenreGrid.js";
import OneMoviePage from "./OneMoviePage.js"
import MenuGrid from "./MenuGrid.js"

// films API:
// process.env.REACT_APP_FILMS_API_KEY
// example https://api.themoviedb.org/3/movie/76341?api_key=process.env.REACT_APP_FILMS_API_KEY

const useStyles = makeStyles(theme => ({
  root: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    maxWidth: "100%",
    height: "100%"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

export default function FilmGrid(props) {
  const classes = useStyles();

  const [genre, setGenre] = useState(null); 
  const [onePage, setOnePage] = useState(null);
  const [clickedMovies, setClickedMovies] = useState(null); 

  //props.filmPage(tile.search, tile.title)

  function filmPage(search, title){
    props.filmPage(search)
    setGenre(title)
  }

  function changeRender() {    
 
    if (props.clickedGenre && !onePage) {
      console.log('movies')      
      return (<div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div">{genre || "Genres"}</ListSubheader>
            </GridListTile>
           {props.clickedGenre.map(tile => (
             <GridListTile
                key={tile.name}  
                 onClick={() => {                  
                  setOnePage(tile.name, props.clickedGenre)
                }}              
              >
                <img src={tile.pic} alt={tile.title} />
                <GridListTileBar
                  title={tile.name}
                  subtitle={
                    <span>rank: {tile.rank}</span>
                  }
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${tile.name}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      )      
    } else if (onePage) {   
      console.log('onepage')   
       return <OneMoviePage onePage={onePage}/>      
    } else if (!props.clickedGenre && !onePage){      
      console.log('menu') 
        return (<MenuGrid genre={genre} filmPage={filmPage}/> 
      )
    }
    
  }

  return <div>{changeRender()}</div>;
}











   
        
      