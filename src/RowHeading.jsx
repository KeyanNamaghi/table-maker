import { useEffect, useState } from 'react'

export const RowHeadings = ({ size }) => {
  const [rows, setRows] = useState(['1', '2'])

  // listen to changes in the height of div with className react-grid-layout-wrapper
  useEffect(() => {
    const numberOfRows = (size?.height - 10) / 200
    const newRows = [...rows].slice(0, numberOfRows)

    while (newRows.length < numberOfRows) {
      newRows.push(newRows.length + 1)
    }

    setRows(newRows)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  const headings = []
  for (let i = 0; i < rows.length; i++) {
    headings.push(
      <div key={`heading-${i}`}>
        <textarea
          className='font-bold'
          value={rows[i]}
          onChange={(e) => {
            setRows((prev) => {
              const newRows = [...prev]
              newRows[i] = e.target.value
              return newRows
            })
          }}
        />
      </div>,
    )
  }

  return <div className='react-grid-layout-row-headings'>{headings}</div>
}
