const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo on the left */}
          <div className="flex items-center">
            <img className="block w-28" src="/logo.png" alt="MeroKotha" />
          </div>
          {/* Search bar */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 mr-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium aa">
              Search
            </button>
          </div>
          {/* Navigation items on the right */}
          <div className="hidden sm:flex sm:items-center">
            <div className="flex space-x-4">
              {/* Navigation links */}
              <a
                href="/"
                className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="/properties"
                className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Properties
              </a>
              <a
                href="/aboutus"
                className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                About Us
              </a>
              <a
                href="/contactus"
                className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact Us
              </a>
              <a
                href="/login"
                className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium aa"
              >
                Login
              </a>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              className="text-gray-500 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                // xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
