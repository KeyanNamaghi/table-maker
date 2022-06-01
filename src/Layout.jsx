import React from 'react'
import _ from 'lodash'
import RGL, { WidthProvider } from 'react-grid-layout'
import LayoutToHTML from './LayoutToHTML'

const ReactGridLayout = WidthProvider(RGL)

const textBox = `![](https://user-images.githubusercontent.com/91133983/170726389-8236d7aa-0d91-4c39-8f01-e7d3a752019c.jpeg)
![](https://user-images.githubusercontent.com/91133983/170726524-b6fa4e04-62ba-46c9-add7-9d1ebc493aca.jpeg)
![](https://user-images.githubusercontent.com/91133983/170728615-1acf631b-98ec-4bef-b09f-2c023c1931af.jpeg)
![](https://user-images.githubusercontent.com/91133983/170728683-f9a7885e-eb08-4405-9d4d-2d49959828fe.jpeg)`

export default class BasicLayout extends React.PureComponent {
  static defaultProps = {
    className: 'layout',
    items: 4,
    rowHeight: 10,
    onLayoutChange: (layout) => {
      console.log(layout)
      const images = textBox.match(/\((.*?)\)/g).map((x) => x.slice(1, -1))
      console.log(LayoutToHTML(layout, images))
    },
    cols: 2,
  }

  constructor(props) {
    super(props)

    const layout = this.generateLayout()
    // get text between brackets
    const images = textBox.match(/\((.*?)\)/g).map((x) => x.slice(1, -1))
    this.state = { layout, images }
  }

  generateDOM(images) {
    return _.map(_.range(this.props.items), function (i) {
      return (
        <div key={i}>
          <img key={i} src={images[i]} />
        </div>
      )
    })
  }

  generateLayout() {
    const p = this.props
    return _.map(new Array(p.items), function (item, i) {
      const y = _.result(p, 'y') || 10
      return {
        x: i % 2,
        y: Math.floor(i / 6) * y,
        w: 1,
        h: y,
        i: i.toString(),
      }
    })
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout)
  }

  render() {
    return (
      <ReactGridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange} {...this.props}>
        {this.generateDOM(this.state.images)}
      </ReactGridLayout>
    )
  }
}
