import { useState } from 'react'
import Grid from './Grid'
import './App.css'

const defaultText = `![](https://user-images.githubusercontent.com/91133983/170726389-8236d7aa-0d91-4c39-8f01-e7d3a752019c.jpeg)
![](https://user-images.githubusercontent.com/91133983/170726524-b6fa4e04-62ba-46c9-add7-9d1ebc493aca.jpeg)
![](https://user-images.githubusercontent.com/91133983/170728615-1acf631b-98ec-4bef-b09f-2c023c1931af.jpeg)
![](https://user-images.githubusercontent.com/91133983/170728683-f9a7885e-eb08-4405-9d4d-2d49959828fe.jpeg)`

const formatText = (str) => {
  try {
    return str
      .trim()
      .match(/\((.*?)\)/g)
      .map((x) => x.slice(1, -1))
  } catch (error) {
    return []
  }
}

function App() {
  const [text, setText] = useState(defaultText)
  const [output, setOutput] = useState(null)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        {/* <BasicLayout /> */}
        <Grid images={formatText(text)} setOutput={setOutput} />
        <textarea onChange={handleChange} value={text} />

        <h2 className='html-table-heading'>HTML Output</h2>
        <button
          onClick={() => {
            navigator.clipboard.writeText(output)
          }}>
          Copy generated HTML table to clipboard
        </button>
        {/* <div className='html-table' dangerouslySetInnerHTML={{ __html: output }} /> */}
      </header>
    </div>
  )
}

export default App
