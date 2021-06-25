import './App.css';
import Header from './components/Header';
import NavFixed from './components/NavFixed';
import Upcomming from './pages/Upcomming'
import MoviesPage from './pages/MoviesPage'
import WatchPage from './pages/Watch'
import BookingPage from './pages/BookingPage'
import {Switch, Route} from 'react-router-dom'
import MovieDetail from './components/MovieDetail';
import { useSelector } from 'react-redux';

function App() {
  const title = useSelector(state =>  state.movies.titleSelected)
  const id = useSelector(state => state.movies.idSelected)
  return (
    <>
      <Header />  
      <NavFixed/>
      <Switch>
        <Route exact to path='/' component={MoviesPage} /> 
        <Route exact to path='/upcomming' component={Upcomming}/> 
        <Route exact to path={`/movie-detail/${title}/${id}`} component={MovieDetail}/> 
        <Route exact to path='/watch-list' component={WatchPage}/> 
        <Route exact to path='/booking' component={BookingPage} /> 
      </Switch>
    </>
  );
}

export default App;
