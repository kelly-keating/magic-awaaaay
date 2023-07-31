interface Props {
  changeSearch: (str: string) => void
}

function Search({ changeSearch }: Props) {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        placeholder="Search for a set"
        onChange={(e) => changeSearch(e.target.value)}
      />
      <button onClick={() => changeSearch('')}>Clear</button>
    </div>
  )
}

export default Search
