// src/components/Navbar.tsx
import React, { useState } from "react";
import { AuthContext } from "../auth";

const AdminNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { logout, user } = React.useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
    // Perform search action with searchQuery
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleNavigation = (path: string) => {
    // Handle navigation logic (e.g., using React Router)
    console.log(`Navigating to: ${path}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    // Handle logout logic here (e.g., clear user session, redirect to login page)
    logout();
  };

  return (
    <>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo on the left */}
            <div className="flex items-center">
              <img className="block w-28" src="/logo.png" alt="MeroKotha" />
            </div>
            {/* Search bar */}
            <div className="flex items-center">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-2 mr-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={handleSearchInput}
                />
                <button
                  type="submit"
                  className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Search
                </button>
              </form>
            </div>
            {/* Navigation items on the right */}
            <div
              className={`${isOpen ? "block" : "hidden"} sm:flex sm:items-center`}
            >
              <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4">
                {/* Navigation links */}

                <a
                  href="/properties"
                  className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => handleNavigation("/properties")}
                >
                  Property Listing
                </a>
                <a
                  href="/aboutus"
                  className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => handleNavigation("/aboutus")}
                >
                  User Management
                </a>
                <a
                  href="/contactus"
                  className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => handleNavigation("/contactus")}
                >
                  Complain
                </a>
                {user ? (
                  <a
                    href="/logout"
                    className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                ) : (
                  <a
                    href="/login"
                    className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </a>
                )}
              </div>
            </div>
            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button
                className="text-gray-500 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
                onClick={toggleMenu}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
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
      {/* Search Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Search
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Enter your search query and press Enter to search.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
