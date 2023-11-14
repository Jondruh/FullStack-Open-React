const SearchBar = ({ search, searchHandler }) => {
  return (
    <div>Filter shown with: <input value={search} onChange={searchHandler} /></div>
  );
};

export default SearchBar;
