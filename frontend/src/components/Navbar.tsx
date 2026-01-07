import { MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isHome ? 'bg-transparent' : 'bg-card/95 backdrop-blur-md shadow-soft'
    }`}>
      <div className="container-base section-padding py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft group-hover:shadow-hover transition-all duration-300">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-primary">Plan</span>
              <span className="text-foreground">Yours</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/trip-details" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Plan Trip
            </Link>
          </div>

          <Link to="/trip-details" className="btn-primary text-sm">
            Start Planning
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
