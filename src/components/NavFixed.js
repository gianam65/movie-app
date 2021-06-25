import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { makeStyles, createMuiTheme ,ThemeProvider} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Badge from '@material-ui/core/Badge';
import PlaylistPlayRoundedIcon from '@material-ui/icons/PlaylistPlayRounded';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    background: '#2c3e50',
    zIndex: '20'
   
  },
  label: {
    color: '#ecf0f1'
  }
});

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#f1b722'
    }
  }
})

export default function NavFixed() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory()
  const movieCart = useSelector(state => state.movies.movieCart)

  useEffect(() => {
    if(value === 0) {
        history.push('/')
    } else if(value === 1) {
        history.push('/upcomming')
    } else if(value === 2) {
        history.push('/watch-list')
    } else if(value === 3) {
        history.push('/booking')
    } else {
        history.push('/error')
    }
  }, [value, history])

  return (
    <ThemeProvider theme={mainTheme}>
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
            >
            <BottomNavigationAction className={classes.label} label="Movies" icon={<MovieIcon />} />
            <BottomNavigationAction className={classes.label} label="Up comming" icon={<WhatshotIcon />} />
            <BottomNavigationAction className={classes.label} label="Watch list" icon={<Badge badgeContent={movieCart.length} color="error"><PlaylistPlayRoundedIcon /></Badge>} />
            <BottomNavigationAction className={classes.label} label="Booking" icon={<ConfirmationNumberIcon />} />
        </BottomNavigation>
    </ThemeProvider>
  );
}
