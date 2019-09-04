import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  rootFilms: {
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    maxWidth: "100%",
    height: "100%",
    margin: '0px',
    justifyContent: "space-evenly",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
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
  imgFilms: {
    transition: 'transform .5s',
    transform: 'translate(0, 0)',
    '&:hover': {
      transform: 'scale(1.2, 1.2)',
    },
    top: '0',
    left: '0',
    height: '100%',
  },
  breadcrumbs: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paperBreadcrumbs: {
    padding: theme.spacing(1, 2),
  },
  paperFilms: {
    padding: theme.spacing(3, 2)
  }
}
));

function FilmGrid(props) {
  console.log(props)
  const classes = useStyles();

  // Function to render particular genre if the page was updated

  if(props.match.path === '/genre') {    
    let pageGenre = props.location.pathname.slice(7, props.location.pathname.length)
    if(props.genre !== pageGenre){
      props.switchGenre(pageGenre)
    }    
  }

  return (<div>
    <Paper elevation={0} className={classes.paperBreadcrumbs}>
      <Breadcrumbs className={classes.breadCrumbsNav} separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumb">
        <Link to={`/`} onClick={() =>
          props.switchGenre(null)
        }>
          All Genres
          </Link>
        <Typography className={classes.fontInBreadCrumbs} color="textPrimary">
          {props.genre || "Genres"}
        </Typography>
      </Breadcrumbs>
    </Paper>
    <Paper className={classes.paperFilms}>
      <div className={classes.rootFilms}>
        <GridList cellHeight={350} className={classes.gridList}>
          {props.movies
            .filter(oneMovie => {
              return (oneMovie.genre === props.genre)
            }
            )
            .map(tile => {
              return (
                <GridListTile
                  className={classes.gridListTit}
                  style={{ 'width': '234px', }}
                  key={tile.original_title}
                  cols={0.5}
                  onClick={() => {
                    props.switchMovie(tile)
                  }}
                >
                  <Link to={`/movie/${tile.imdb_id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${tile.poster_path}`} alt={tile.title} className={classes.imgFilms} />
                  </Link>
                  <GridListTileBar
                    title={tile.title}
                    subtitle={
                      <span>rank: {tile.vote_average}</span>
                    }
                  />
                </GridListTile>
              )
            })}
        </GridList>
      </div>
    </Paper>
  </div>)
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  genre: state.page.currentGenre,
  onePage: state.page.currentMovie,
  isFetching: state.movies.isFetching,
})

const mapDispatchToProps = dispatch => {
  return {
    switchGenre: (newGenre) => {
      dispatch({ type: "SWITCH_GENRE", genre: newGenre })
    },
    switchMovie: (newMovie) => {
      dispatch({ type: "SWITCH_MOVIE", movie: newMovie })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmGrid)

