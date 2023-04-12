import React, { useRef, useLayoutEffect, useReducer, useState } from 'react'
import { useEffect } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import useResizeObserver from '@react-hook/resize-observer'
import LayoutToHTML from './LayoutToHTML'
import { ColumnHeadings } from './ColumnHeading'
import { RowHeadings } from './RowHeading'

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

const useSize = (target) => {
  const [size, setSize] = React.useState()

  useLayoutEffect(() => {
    setSize(target.current.children[0].getBoundingClientRect())
  }, [target])

  // Where the magic happens
  useResizeObserver(target?.current?.children[0], (entry) => setSize(entry.contentRect))
  return size
}

const Grid = ({ images, rows, setRows }) => {
  const [output, setOutput] = useState(null)
  const layout = generateLayout(images)
  const ref = useRef()
  const size = useSize(ref)

  // Setup a useReducer to handle the state of the headings
  const [headings, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'add':
          return [...state, action.payload.number === 1 ? 'After' : 'Heading']
        case 'remove':
          if (state.length <= 2) return state
          return state.slice(0, state.length - 1)
        case 'update':
          return state.map((heading, index) => {
            if (index === action.payload.index) {
              return action.payload.value
            }
            return heading
          })
        default:
          return state
      }
    },
    ['Before', 'After'],
  )

  const layoutChangeHandler = (layout) => {
    setOutput(LayoutToHTML({ layout, images, headers: headings }))
  }

  useEffect(() => {
    setOutput(LayoutToHTML({ layout, images, headers: headings }))
  }, [headings])

  return (
    <div className='react-grid-layout-container'>
      <ColumnHeadings headings={headings} dispatch={dispatch} />
      <RowHeadings rows={rows} size={size} />
      <div className='react-grid-layout-wrapper' ref={ref}>
        <ReactGridLayout
          layout={layout}
          onLayoutChange={layoutChangeHandler}
          cols={headings.length}
          rowHeight={10}
          width={1000}
          items={images.length}>
          {generateTiles({ images })}
        </ReactGridLayout>
      </div>
      <div className='controls'>
        <button onClick={() => dispatch({ type: 'remove', payload: { number: headings.length } })}>&lt;</button>
        <span>Number of columns: {headings.length}</span>
        <button onClick={() => dispatch({ type: 'add', payload: { number: headings.length } })}>&gt;</button>
      </div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(output)
        }}
        className='font-bold button copy-clipboard'>
        Copy generated HTML table to clipboard
      </button>
    </div>
  )
}

export default Grid
