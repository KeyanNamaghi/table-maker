const Controls = ({ columns, setColumns }) => {
  return (
    <div className='controls'>
      <button onClick={() => setColumns(columns - 1)}>-</button>
      <span>Number of columns: {columns}</span>
      <button onClick={() => setColumns(columns + 1)}>+</button>
    </div>
  )
}

export default Controls
