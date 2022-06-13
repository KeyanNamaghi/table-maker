const outputHeader = (header) => {
  return `<th>${header}</th>`
}

const outputCell = (i, images) => {
  return `<td><img src='${images[i]}'/></td>`
}

const outputRow = (rowData, images) => {
  return `<tr>${rowData.map((x) => outputCell(x, images)).join('')}</tr>`
}

const LayoutToHTML = (layout, images, headers = ['Before', 'After']) => {
  const structuredData = []

  layout.forEach(({ x, y, i }) => {
    if (!structuredData[y / 10]) {
      structuredData[y / 10] = Array(x)
      structuredData[y / 10][x] = Number(i)
    } else {
      structuredData[y / 10][x] = Number(i)
    }
  })

  const table = `
  <table>
    <tr>${headers.map((header) => outputHeader(header)).join('')}</tr>
    ${structuredData.map((x) => outputRow(x, images)).join('')}
  </table>
  `

  // remove whitespace
  return table.replace(/\s+/g, ' ').trim()
}

export default LayoutToHTML
