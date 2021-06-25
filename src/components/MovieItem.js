import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {selectedMovie} from '../redux/movies/movieActions'
import { makeStyles , createMuiTheme ,ThemeProvider} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import { useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: '2rem 1rem'
    },
    control: {
      padding: theme.spacing(2),
    },
    container: {
        position: 'relative',
        transition: '0.3s all',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    img: {
        width: '100%',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    title: {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '1.2rem',
    },
    badge: {
        position: 'absolute',
        right: '50%',
        
    }
}));

const mainTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#f1b722'
      },
      secondary: {
        main: '#3f51b5'
      }
    }
})

const MovieItem = () => {
    const dispatch = useDispatch();
    const [moviesGet, setMoviesGet] = useState([])
    const movies = useSelector(state => state.movies.movies.results)
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        setMoviesGet(movies)
    }, [movies])

    const handleClickMovie = (id, title) => {
        dispatch(selectedMovie(id, title))
        history.push(`/movie-detail/${title}/${id}`)
    }
    return (
        <ThemeProvider theme={mainTheme}>
            <div className={classes.root}>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                        {
                            moviesGet && 
                            moviesGet.map((movie) => {
                                return (
                                    <Grid key={movie.id} onClick={() => handleClickMovie(movie.id, movie.title)} item xs={4} lg={2} sm={3}  className={classes.container} cols={1}>
                                        <Badge className={classes.badge} style={{padding: '0.6rem 0.8rem'}} badgeContent={movie.vote_average ? movie.vote_average : movie.vote_average = 8} color={movie.vote_average > 7.5 ? 'primary' : 'secondary'} />
                                        <img className={classes.img} src={movie.poster_path ? `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}` : 'https://cdn.bestmoviehd.net/share/images/no-cover.png'} alt={movie.title}/>
                                        <span className={classes.title}>{movie.title}</span>
                                    </Grid>
                                )
                            })
                        }
                        </Grid>
                    </Grid>
                </Grid>
        </div>
        </ThemeProvider>
        
    )
}

export default MovieItem