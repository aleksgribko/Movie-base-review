import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { filmsGridData } from "./filmsGridData.js";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    maxWidth: "100%",
    height: "100%",
    justifyContent: "space-evenly",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  img: {
    transition: 'transform .5s',
    '&:hover': {
      transform: 'scale(1.2, 1.2) translateY(-50%)',
    },
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    position: 'relative',
  },
  fontInBreadCrumbs: {
    fontSize: '1.5rem',
  },
  paperBreadcrumbs: {
    padding: theme.spacing(1, 2),
  },
  paperMenu: {
    padding: theme.spacing(3, 2)
  }
}));

function MenuGrid(props) {
  const classes = useStyles();

 

  function renderMenu() {
    if (!props.isFetching) {
      return (
        <React.Fragment>
          <Paper elevation={0} className={classes.paperBreadcrumbs}>
            <Typography className={classes.fontInBreadCrumbs} component="div">Genres</Typography>
          </Paper>
          <Paper className={classes.paperMenu}>
            <div className={classes.root}>
              <GridList cellHeight={250} className={classes.gridList}>
                {filmsGridData.map(tile => (
                  <GridListTile
                    style={{ minWidth: '445px', }}
                    key={tile.img}
                  >
                    <Link to={`/genre/${tile.search}`}>
                      <img onClick={() => {
                        props.switchGenre(tile.search)
                      }}
                        className={classes.img}
                        src={require(`../img/${tile.img}.gif`)}
                        alt={tile.title} />
                    </Link>
                    <GridListTileBar
                      title={tile.title}
                      subtitle={
                        <span>number of movies: {tile.moviesId.length}</span>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Paper>
        </React.Fragment>)
    } else {
      return <LinearProgress className='linear' color="secondary" />
    }
  }

  return (<div id='menuFilms'>
    {renderMenu()}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuGrid)

