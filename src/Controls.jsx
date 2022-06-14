const Controls = ({ columns, setColumns }) => {
  return (
    <div className='controls'>
      <button onClick={() => setColumns(columns - 1)}>-</button>
      {columns}
      <button onClick={() => setColumns(columns + 1)}>+</button>
    </div>
  )
}

export default Controls
