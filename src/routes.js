import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './view/Home';
import SignIn from './view/SignIn';
import Wishlist from './view/Wishlist';
import PopularList from './components/PopularList';
import SearchMovies from './view/SearchMovies';
import MovieList from './view/MovieList';
import MovieDetail from './view/MovieDetail';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/popular" element={<MovieList movies={PopularList} />} />
      <Route path="/search" element={<MovieList movies={SearchMovies} />} />
      <Route path="/movie/:id" component={MovieDetail} /> 
    </Routes>
  </Router>
);

export default AppRoutes;
