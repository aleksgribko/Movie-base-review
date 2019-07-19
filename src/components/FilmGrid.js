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
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Grid for showing either (1) menu of genres, (2) movies of a genre, (3) page of one movie

//I AM ABLE TO GET PROPS WITH MOVIES HERE! props.moviesAll

const useStyles = makeStyles(theme => ({
  root: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    maxWidth: "100%",
    height: "100%",
    margin: '0px',
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  img: {
    transition: 'transform .2s',
    margin: '0 auto',
    '&:hover': {
       transform: 'scale(2.0, 2.0)',      
    },
    breadcrumbs: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    paperBreadcrumbs: {
      padding: theme.spacing(1, 2),
    },
  }
}));

export default function FilmGrid(props) {
  const classes = useStyles();

  const [genre, setGenre] = useState(null); 
  const [onePage, setOnePage] = useState(null);
  const [clickedMovies, setClickedMovies] = useState(null); 


  function filmPage(search, title){
    changeMovies(search)
    setGenre(title)
  }

  function backToMenu(){    
    filmPage('empty', null)
    setOnePage(null)
  }  

  function backToGenre(){   
    debugger 
    setOnePage(null)
  }  

  function changeMovies(genre) {		
		switch (genre) {
			case "comedies":
        setClickedMovies(props.moviesAll.comedies);
				break;
			case "fantastic":
        setClickedMovies(props.moviesAll.fantastic);
				break;
			case "mainstream":
        setClickedMovies(props.moviesAll.mainstream);
				break;
			case "action":
        setClickedMovies(props.moviesAll.action);      
				break;
			case "criminal":
        setClickedMovies(props.moviesAll.criminal);
				break;
			case "drama":
        setClickedMovies(props.moviesAll.drama);
        break;
      case "empty":
        setClickedMovies(null);
        break;
			default:
        setClickedMovies(null);
		}
	}

  function changeRender() {    
 
    if (clickedMovies && !onePage) {
      console.log('movies')      
      return (<div className={classes.root}>
          <GridList cellHeight={350} className={classes.gridList}>
            <GridListTile cols={2} className={classes.breadcrumbs} key="Subheader"  style={{ height: "auto" }}>
                                                    
                <Paper elevation={0} className={classes.paperBreadcrumbs}>
                  <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumb">
                    <Link color="inherit" onClick={() => backToMenu()}>
                      All Genres
                    </Link>
                    <Typography color="textPrimary">
                    {genre || "Genres"}
                    </Typography>               
                  </Breadcrumbs>
                </Paper>     

            </GridListTile>
           {clickedMovies.map(tile => (
             <GridListTile
                key={tile.name} 
                 cols={0.5}
                 onClick={() => {                  
                  setOnePage({name: tile.name, descr: tile.descr, pic: tile.pic, tagline: tile.tagline, rank: tile.rank, genreList: props.clickedGenre})
                }}              
              >
                <img src={tile.pic} alt={tile.title} className={classes.img}/>
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
       return <OneMoviePage genre={genre} onePage={onePage} backToGenre={backToGenre} backToMenu={backToMenu}/>      
    } else {      
      console.log('menu') 
        return (<MenuGrid genre={genre} filmPage={filmPage}/> 
      )
    }
    
  }
  
  return <div>{changeRender()}</div>;
}