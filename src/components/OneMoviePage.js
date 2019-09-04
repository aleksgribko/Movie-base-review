import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import ReviewsList from "./ReviewsList.js"
import OverlayComment from './OverlayComment.js'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  photoMovie: {
    paddingTop: "10px",
    paddingLeft: "10px",
    maxHeight: "50vmin",
    textAlign: "left"
  },
  movieName: {
    fontSize: '3vmax',
    color: '#3f51b5'
     
  },
  movieTagline: {
    fontSize: '2vmax',
    fontStyle : 'italic',

  },
  movieDescr: {
    fontSize: '1vmax',
    marginTop: '2%'
  },
  button: {
    margin: theme.spacing(1),
    zIndex: '49',
  },
  breadCrumbsNav: {
    fontSize: '1.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'fit-content',
    '&:hover': {
      cursor: 'pointer',      
   },
  },
   fontInBreadCrumbs: {
    fontSize: '1.5rem',
   },
   paperBreadcrumbs: {
    padding: theme.spacing(1, 2),
  },  
}));

function OneMoviePage(props) {  

  const classes = useStyles();
  console.log(props)

  // Function to render particular movie if the page was updated

  if(props.match.path === '/movie') {    
    let pageMovie = props.location.pathname.slice(7, props.location.pathname.length)
    console.log (props.onePage, props.movies, pageMovie, props.isFetching)
    if(!props.onePage && props.movies.length && !props.isFetching){
      let returnedMovie = props.movies.filter(oneMovie => oneMovie.imdb_id === pageMovie)
      console.log(returnedMovie[0])
      props.switchMovie(returnedMovie[0])
      props.switchGenre(returnedMovie[0].genre)
    }    
  }

  // Render loading while fetching

  function renderOneMovie(){
    if(props.onePage){
      return(
        <React.Fragment>
        <Paper elevation={0} className={classes.paperBreadcrumbs}>
        <Breadcrumbs className={classes.breadCrumbsNav} separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumb">
          <Link to={`/`} onClick={() => {props.switchGenre(null); props.switchMovie(null)}}>
            All Genres
          </Link>
          <Link to={`/genre/${props.genre}`} onClick={() => props.switchMovie(null)}>
            {props.genre || "Genres"}
          </Link>
          <Typography className={classes.fontInBreadCrumbs} color="textPrimary">{props.onePage ? props.onePage.title : ''}</Typography>
        </Breadcrumbs>
      </Paper>
      <Paper className={classes.root}>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }}>
            <img
              className={classes.photoMovie}
              src={`https://image.tmdb.org/t/p/w500${props.onePage.poster_path}`}
              alt={props.onePage.title}
            />
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.button}
              onClick={() => props.toggleCommentForm(true)}
            >                
                Leave a comment
            </Button>
          </div>
          <div style={{ flexGrow: "5", marginLeft: '1%', marginRight: '1%' }}>
            <div className={classes.movieName}>
              {props.onePage.title}
            </div>
            <div className={classes.movieTagline}>
              {props.onePage.tagline}
            </div>
            <div className={classes.movieDescr}>
              {props.onePage.overview}
            </div>
          </div>
        </div>
        <ReviewsList/>
      </Paper>
      </React.Fragment>
      )
    } else {
      return <LinearProgress className='linear' color="secondary" />      
    }
  }

  return (
    <div>     
      <OverlayComment/> 
      { renderOneMovie() }      
    </div>
  );
}

const mapStateToProps = state => ({
  onePage: state.page.currentMovie,
  genre: state.page.currentGenre,
  allComments: state.allComments,
  movies: state.movies.movies,
  isFetching: state.movies.isFetching,
})

const mapDispatchToProps = dispatch => {
  return {
    switchGenre: (newGenre) => {
      dispatch({type: "SWITCH_GENRE", genre: newGenre})
    },
    switchMovie: (newMovie) => {
      dispatch({type: "SWITCH_MOVIE", movie: newMovie})
    },
    toggleCommentForm: (id, topic, description, positive) => {
      dispatch({type: 'TOGGLE_COMMENT_FORM', payload: {id, topic, description, positive}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneMoviePage)
