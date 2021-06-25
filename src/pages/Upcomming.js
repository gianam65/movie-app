import { useEffect, useState } from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {setUpcomming} from '../redux/upcomming/upcommingActions'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import UpcommingItem from '../components/UpcommingItem';

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
          color: "#fff"
        }
    }
}));

const Trending = () => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1);
    const fetchUpcomming = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=e0736d63289d53e24ed1ac88947c37b6&page=${page}`).catch((error) => console.log(error))
        dispatch(setUpcomming(response.data))
    }
    const totalPage = useSelector((state) => state.upcomming.upcomming.total_pages)
    const classes = useStyles();
    const handleChange = (event, value) => {
        setPage(value);
        window.scrollTo(0,0)
    };
    useEffect(() => {
        fetchUpcomming()
        // eslint-disable-next-line
    }, [page])
    return (
        <>
            <UpcommingItem />
            <div className={classes.root}>
                <Pagination classes={{ul: classes.ul }} className={classes.center} color='primary' count={totalPage} page={page} onChange={handleChange} />
            </div>
        </>
        
    )
}

export default Trending
