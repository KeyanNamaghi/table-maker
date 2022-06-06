const Header = ({ columns, setColumns }) => {
  return (
    <div className='header'>
      <button onClick={() => setColumns(columns - 1)}>-</button>
      {columns}
      <button onClick={() => setColumns(columns + 1)}>+</button>
    </div>
  )
}

export default Header
