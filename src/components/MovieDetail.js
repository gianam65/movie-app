import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import {addMovie} from '../redux/movies/movieActions'
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    height: '100%',
    padding: '2rem',
    dislay: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '2rem'
  },
  desc: {
    fontSize: '1.6rem',
    marginTop: '1.4rem',
    color: '#9cabb6'
  },
  detail: {
    fontSize: '1.6rem'
  },
  img: {
    width: '90%',
    objectFit: 'contain',
  },
  imgRes: {
    width: '100%',
  },
  button: {
    background: '#f1b722',
    marginRight: '1.2rem',
    fontFamily: 'inherit',
    color: 'white',
    fontSize: '1rem',
    marginTop: '1rem',
    transition: '0.2s all',
    '&:hover': {
      transform: 'translateY(-3px)',
  },
  }
  
}));

const MovieDetail = () => {
    const [spacing] = useState(2);
    const [initialMovie, setInitialMovie] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles();
    const movies = useSelector(state => state.movies.movies.results)
    const idSelected = useSelector(state => state.movies.idSelected)
    const matches = useMediaQuery('(max-width: 768px)')
    useEffect(() => {
      setInitialMovie(
        movies.filter((movie) => {
          return movie.id === idSelected
      })
    )
    }, [idSelected, movies])
    const handleReturn = () => {
      history.push('/')
    }

    const handleAdd = (id) => {
      dispatch(addMovie(id))
    }
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" className={classes.container} spacing={spacing}>
                    <Grid item sm={5} xs={12}>
                        {
                          initialMovie.map((movie) => {
                            return (
                              <img className={matches ? classes.imgRes : classes.img} key={movie.id} src={movie.poster_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` : 'https://cdn.bestmoviehd.net/share/images/no-cover.png'} alt={movie.title}/>)
                          })
                        }
                    </Grid>
                    <Grid item sm={7} xs={12}>
                        {
                          initialMovie.map((movie) => {
                            return (
                              <div key={movie.id}>
                                <h2 className={classes.title}>Movie name: {movie.title}</h2>
                                <p className={classes.desc}>Over view: {movie.overview}</p>
                                <p className={classes.detail}>Language: {movie.original_language.toUpperCase()}</p>
                                <span className={classes.detail}>Release date: {movie.release_date || '1/1/2021'}</span>
                                <p className={classes.detail}>Vote average: {movie.vote_average || 8}</p>
                                <Button variant="contained" className={classes.button} onClick={() => handleAdd(idSelected)}>Add to watch list</Button>
                                <Button variant="contained" className={classes.button} style={{background: '#000'}} onClick={handleReturn}>Return</Button>
                              </div> 
                            )
                          })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MovieDetail


