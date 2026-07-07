function logout() {

  localStorage.removeItem("token");

  window.location.reload();

}

function Navbar({
  searchBlog,
  setSearchBlog
}) {

  const token =
    localStorage.getItem("token");

  return (

    <nav>

      <h2>My Blog</h2>

      <input
        type="text"
        placeholder="Search..."
        value={searchBlog}
        onChange={(e) =>
          setSearchBlog(
            e.target.value
          )
        }
      />

      {
        token && (

          <button
            onClick={logout}
          >
            Logout
          </button>

        )
      }

    </nav>

  );

}

export default Navbar;