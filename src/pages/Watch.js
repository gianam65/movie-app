import React from 'react'
import {removeMovie} from '../redux/movies/movieActions'
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      margin: '4rem auto',
      alignItems: 'center',
    },
    flexItem: {
        display: 'flex',
        marginTop: '2rem',
        boxShadow: '0.1rem -0.2rem 0.2rem rgba(255,255,255,0.3)',
        borderRadius: '1rem',
        overflow: 'hidden'
    },
    list: {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'flex-start',
        fontSize: '1.2rem',
        justifyContent: 'center',
        color: '#95a5a6',
        position: 'relative'
    },
    title: {
        color: '#f1b722',
        marginBottom: '0.5rem' 
    },
    noMovie: {
        color: '#f1b722',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.6rem'
    },
    item: {
        padding: '1rem 0rem'
    },
    desc: {
        margin: '2rem 0rem'
    },
    icon: {
        position: 'absolute',
        zIndex: '20',
        cursor: 'pointer',
        right: '1%',
    }
}));

const WatchPage = () => {
    const classes = useStyles();
    const movieCart = useSelector(state => state.movies.movieCart)
    const dispatch = useDispatch()
    const handleRemove = (id) => {
        dispatch(removeMovie(id))
    }
    return (
        <div className={classes.root}>
            {
                movieCart.length === 0 && <h2 className={classes.noMovie}> You don't have any movies to watch.Please go back to movies and select some movies to watch </h2>
            }
            <List component="nav" >
                {
                    movieCart.length !== 0 && <h2>You have {movieCart.length} movies in your watchlist</h2>
                }
                {
                    movieCart &&
                    movieCart.map((item) => {
                        return (
                            <div key={item.id} className={classes.flexItem}>
                                <CloseIcon className={classes.icon} onClick={() => handleRemove(item.id)}/>
                                <img src={item.poster_path ? `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` : 'https://cdn.bestmoviehd.net/share/images/no-cover.png'} alt={item.title} />
                                <ListItem button className={classes.list} divider>
                                    <p className={classes.title}>{item.title} </p>
                                    <span>Desc: {item.overview}</span>
                                    <p className={classes.desc}>Popularity: {item.popularity}</p>
                                    <span className={classes.title}>Vote: {item.vote_average} / 10</span>
                                </ListItem>
                            </div>
                        )
                    })
                }
                
            </List>
        </div>
    )
}

export default WatchPage
