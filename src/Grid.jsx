import React, { useRef } from 'react'
import { useEffect } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import useResizeObserver from '@react-hook/resize-observer'
import LayoutToHTML from './LayoutToHTML'

const ReactGridLayout = WidthProvider(RGL)

const generateLayout = (images) => {
  return images.map((_image, i) => {
    return {
      x: i % 2,
      y: Math.floor(i / 6) * 10,
      w: 1,
      h: 10,
      i: i.toString(),
    }
  })
}

const generateTiles = ({ images }) => {
  const tiles = images.map((image, i) => {
    return (
      <div key={i}>
        <img key={i} src={image} alt='' draggable='false' />
      </div>
    )
  })

  return tiles
}

const ColumnHeadings = ({ cols }) => {
  const headings = []
  for (let i = 0; i < cols.length; i++) {
    headings.push(<textarea className='font-bold' rows={1} value={cols[i]} />)
  }

  return headings
}

const RowHeadings = ({ rows }) => {
  const headings = []
  for (let i = 0; i < rows.length; i++) {
    headings.push(
      <div>
        <textarea className='font-bold' value={rows[i]} />
      </div>,
    )
  }

  return headings
}

const useSize = (target) => {
  const [size, setSize] = React.useState()

  React.useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect())
  }, [target])

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  return size
}

const Grid = ({ images, setOutput, cols, rows, setRows }) => {
  const layout = generateLayout(images)
  const ref = useRef()
  const size = useSize(ref)

  const layoutChangeHandler = (layout) => {
    setOutput(LayoutToHTML(layout, images))
  }

  // Trigger ReactGridLayout to re-render when the columns array changes
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }, [cols])

  // listen to changes in the height of div with className react-grid-layout-wrapper
  useEffect(() => {
    console.log({ size })
    const numberOfRows = (size?.height - 10) / 200
    const newRows = [...rows].slice(0, numberOfRows)

    while (newRows.length < numberOfRows) {
      newRows.push('')
    }

    console.log({ newRows })
    setRows(newRows)
  }, [size])

  return (
    <div className='react-grid-layout-container'>
      <div className='react-grid-layout-column-headings'>
        <ColumnHeadings cols={cols} />
      </div>
      <div className='react-grid-layout-row-headings'>
        <RowHeadings rows={rows} />
      </div>
      <div className='react-grid-layout-wrapper' ref={ref}>
        <ReactGridLayout
          layout={layout}
          onLayoutChange={layoutChangeHandler}
          cols={cols.length}
          rowHeight={10}
          width={1000}
          items={images.length}>
          {generateTiles({ images })}
        </ReactGridLayout>
      </div>
    </div>
  )
}

export default Grid
