import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Wishlist from './pages/Wishlist';
import PopularList from './components/PopularList';
import SearchMovies from './pages/SearchMovies';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';

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
