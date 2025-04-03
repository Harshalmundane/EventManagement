import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            >
              Event Horizon
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>

              {user ? (
                <>
                  {user.role === "Event Poster" && (
                    <>
                      <Link to="/add-event" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Add Event
                      </Link>
                      <Link to="/events" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Events
                      </Link>
                    </>
                  )}

                  {user.role === "User" && (
                    <Link to="/events" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Events
                    </Link>
                  )}

                  <button onClick={handleLogout} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Logout
                  </button>

                  <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-purple-300">
                    {user.name || user.email.split('@')[0]}
                  </span>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                  <Link to="/register" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {user && (
              <span className="mr-2 text-xs text-gray-400">
                Hi, {user.name || user.email.split('@')[0]}
              </span>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>

            {user ? (
              <>
                {user.role === "Event Poster" && (
                  <>
                    <Link to="/add-event" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                      Add Event
                    </Link>
                    <Link to="/events" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                      Events
                    </Link>
                  </>
                )}
                {user.role === "User" && (
                  <Link to="/events" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Events
                  </Link>
                )}
                <button onClick={handleLogout} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white block px-3 py-2 rounded-md text-base font-medium text-center">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
