import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import MovieItem from '../components/MovieItem'
import { setMovies } from '../redux/movies/movieActions'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: '7rem',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
    },
    ul: {
        "& .MuiPaginationItem-root": {
          color: "#fff",
        }
    }
}));

const MoviesPage = () => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1);
    const fetchMovie = async () => {
        const response  = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e0736d63289d53e24ed1ac88947c37b6&page=${page}`).catch((err) => {
            console.log(err)
        })
        dispatch(setMovies(response.data))
    }
    const totalPage = useSelector((state) => state.movies.movies.total_pages)
    const classes = useStyles();
    const handleChange = (event, value) => {
        setPage(value);
        window.scrollTo(0,0)
    };
    useEffect(() => {
        fetchMovie()
        // eslint-disable-next-line
    }, [page])
   
    return (
        <>
            <MovieItem />
            <div className={classes.root}>
                <Pagination classes={{ul: classes.ul }} className={classes.center} color='primary' count={totalPage} page={page} onChange={handleChange} />
            </div>
        </>
    )
}

export default MoviesPage
