const removeLast = (arr) => {
  const copy = [...arr]
  copy.pop()
  return copy
}

const addColumn = (arr) => {
  const copy = [...arr]
  if (copy.length === 0) {
    copy.push('Before')
  } else if (copy.length === 1) {
    copy.push('After')
  } else {
    copy.push('Heading')
  }
  return copy
}

const Controls = ({ columns, setColumns }) => {
  return (
    <div className='controls'>
      <button onClick={() => setColumns(removeLast(columns))}>-</button>
      <span>Number of columns: {columns.length}</span>
      <button onClick={() => setColumns(addColumn(columns))}>+</button>
    </div>
  )
}

export default Controls
