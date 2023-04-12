import { useState } from 'react'
import Grid from './Grid'
import ImgToMarkdown from './ImgToMarkdown'
import './App.css'

const defaultText = `![](https://user-images.githubusercontent.com/91133983/170726389-8236d7aa-0d91-4c39-8f01-e7d3a752019c.jpeg)
<img width="450" alt="Screenshot 2022-05-30 at 10 18 13" src="https://user-images.githubusercontent.com/62756189/171398768-2675795b-3eb5-4783-b7d4-484a8c475b03.png">
<img width="453" alt="Screenshot 2022-05-30 at 10 18 01" src="https://user-images.githubusercontent.com/62756189/171398772-ce2b27f6-7611-43a0-bf7b-13a5869450f7.png">
![](https://user-images.githubusercontent.com/91133983/170728683-f9a7885e-eb08-4405-9d4d-2d49959828fe.jpeg)`

const formatText = (str) => {
  try {
    return ImgToMarkdown(str)
      .trim()
      .match(/\((.*?)\)/g)
      .map((x) => x.slice(1, -1))
  } catch (error) {
    return []
  }
}

function App() {
  const [text, setText] = useState(defaultText)
  const [rows, setRows] = useState(['1', '2'])

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Grid images={formatText(text)} rows={rows} setRows={setRows} />
        <div className='body-content'>
          <textarea className='github-textarea' onChange={handleChange} value={text} />
        </div>
      </header>
    </div>
  )
}

export default App
