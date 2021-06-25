import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { makeStyles , createMuiTheme ,ThemeProvider} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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
    },
    mainTitle: {
        color: '#f1b722',
        textAlign: 'center',
        fontSize: '1.2rem',
        letterSpacing: '0.2rem'
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
    desc: {
        color: 'white'       
    },
    badge: {
        position: 'absolute',
        right: '50%',
    },
    listRate: {
        background: 'rgba(0,0,0,0.6)',
        marginTop: '1.2rem',
        borderRadius: '5px',
        maxHeight: '600px',
        overflow: 'auto',
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

const UpcommingItem = () => {
    const upcommingList = useSelector((state) => state.upcomming.upcomming.results)
    const [upcommingGet, setUpcommingGet] = useState([])
    const [topRate, setTopRate] = useState([])
    const classes = useStyles();
    useEffect(() => {
        setUpcommingGet(upcommingList)
    }, [upcommingList])
    
    let load = false
    if(typeof upcommingGet === 'undefined') {
        load = true
    }

    useEffect(() => {
        const topRate = async () => {
            const response =  await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e0736d63289d53e24ed1ac88947c37b6')
            setTopRate(response.data.results)
        }
        topRate()
        return () => {
            setTopRate([])
        }
    }, [])
    
    return (
        <ThemeProvider theme={mainTheme}>
            <div className={classes.root}>
                <h2 className={classes.mainTitle}>{'Upcomming'.toUpperCase()}</h2>
                {
                    load && (
                        <>
                            <h2 className={classes.title}>No movies up comming loaded. Please wait a minute or reload this page to fix this problem</h2>
                            <img src='../../warning.svg' alt='Page not found' />
                        </>
                    )
                }
                <Grid container className={classes.root} spacing={2}>
                    <Grid container spacing={4}>
                        <Grid container item xs={12} sm={8} md={9} spacing={3}>
                            {
                                upcommingGet && 
                                upcommingGet.map((item) => {
                                    return (
                                        <Grid key={item.id} item xs={6} lg={3} sm={4} className={classes.container} cols={1}>
                                            <Badge className={classes.badge} style={{padding: '0.6rem 0.8rem'}} badgeContent={item.vote_average ? item.vote_average : item.vote_average = 8} color={item.vote_average > 7.5 ? 'primary' : 'secondary'} />
                                            <img className={classes.img} src={item.poster_path ? `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` : 'https://cdn.bestmoviehd.net/share/images/no-cover.png'} alt={item.title}/>
                                            <span className={classes.title}>{item.title}</span>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <h2 className={classes.mainTitle}>Top rated</h2>
                            <List className={classes.listRate}>
                                {
                                    topRate && 
                                    topRate.map((item) => {
                                        return <ListItem key={item.id}>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <img className={classes.img} src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`} alt={item.title}/>
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText className={classes.desc} primary={item.title}/>
                                        </ListItem>
                                    })
                                }
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
        </div>
        </ThemeProvider>
        
    )
}

export default UpcommingItem
