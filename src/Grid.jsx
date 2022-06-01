import React from 'react'
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
        <img key={i} src={image} alt='' />
      </div>
    )
  })

  console.log({ tiles })
  return tiles
}

const Grid = ({ images, setOutput }) => {
  const layout = generateLayout(images)

  const layoutChangeHandler = (layout) => {
    setOutput(LayoutToHTML(layout, images))
  }

  return (
    <ReactGridLayout
      layout={layout}
      onLayoutChange={layoutChangeHandler}
      cols={2}
      rowHeight={10}
      width={1000}
      items={images.length}>
      {generateTiles({ images })}
    </ReactGridLayout>
  )
}

export default Grid