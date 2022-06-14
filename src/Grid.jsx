import React from 'react'
import { useEffect } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
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

const Grid = ({ images, setOutput, cols }) => {
  const layout = generateLayout(images)

  const layoutChangeHandler = (layout) => {
    setOutput(LayoutToHTML(layout, images))
  }

  // Trigger ReactGridLayout to re-render when the columns array changes
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }, [cols])

  return (
    <div className='react-grid-layout-container'>
      <div className='react-grid-layout-column-headings'>
        <ColumnHeadings cols={cols} />
      </div>
      <div className='react-grid-layout-row-headings'>Row Headings</div>
      <div className='react-grid-layout-wrapper'>
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
