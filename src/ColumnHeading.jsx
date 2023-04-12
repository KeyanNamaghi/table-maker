import { useEffect } from 'react'

export const ColumnHeadings = ({ headings, dispatch }) => {
  // Trigger ReactGridLayout to re-render when the columns array changes
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }, [headings])

  const headingsArray = headings.map((text, i) => (
    <textarea
      className='font-bold'
      rows={1}
      value={text}
      onChange={(e) => {
        dispatch({ type: 'update', payload: { index: i, value: e.target.value } })
      }}
    />
  ))

  return <div className='react-grid-layout-column-headings'>{headingsArray}</div>
}
