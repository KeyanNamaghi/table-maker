import ImgToMarkdown from './ImgToMarkdown'
import LayoutToHTML from './LayoutToHTML'

const exampleLayout = [
  { w: 1, h: 10, x: 0, y: 10, i: '0' },
  { w: 1, h: 10, x: 0, y: 0, i: '1' },
  { w: 1, h: 10, x: 1, y: 10, i: '2' },
  { w: 1, h: 10, x: 1, y: 0, i: '3' },
]

const textBox = `![](https://user-images.githubusercontent.com/91133983/170726389-8236d7aa-0d91-4c39-8f01-e7d3a752019c.jpeg)
![](https://user-images.githubusercontent.com/91133983/170726524-b6fa4e04-62ba-46c9-add7-9d1ebc493aca.jpeg)
![](https://user-images.githubusercontent.com/91133983/170728615-1acf631b-98ec-4bef-b09f-2c023c1931af.jpeg)
![](https://user-images.githubusercontent.com/91133983/170728683-f9a7885e-eb08-4405-9d4d-2d49959828fe.jpeg)`

const images = textBox.match(/\((.*?)\)/g).map((x) => x.slice(1, -1))

test('LayoutToHTML', () => {
  const html = LayoutToHTML(exampleLayout, images)
  expect(html).toBe(`
    <table>
        <tr><th>Before</th><th>After</th></tr>
        <tr><td><img src='https://user-images.githubusercontent.com/91133983/170726389-8236d7aa-0d91-4c39-8f01-e7d3a752019c.jpeg' /></td><td><img src='https://user-images.githubusercontent.com/91133983/170726524-b6fa4e04-62ba-46c9-add7-9d1ebc493aca.jpeg' /></td></tr><tr><td><img src='https://user-images.githubusercontent.com/91133983/170728615-1acf631b-98ec-4bef-b09f-2c023c1931af.jpeg' /></td><td><img src='https://user-images.githubusercontent.com/91133983/170728683-f9a7885e-eb08-4405-9d4d-2d49959828fe.jpeg' /></td></tr>
    </table>`)
})

test('ImgToMarkdown', () => {
  const sample = `<img width="450" alt="Screenshot 2022-05-30 at 10 18 13" src="https://user-images.githubusercontent.com/62756189/171398768-2675795b-3eb5-4783-b7d4-484a8c475b03.png">
  <img width="453" alt="Screenshot 2022-05-30 at 10 18 01" src="https://user-images.githubusercontent.com/62756189/171398772-ce2b27f6-7611-43a0-bf7b-13a5869450f7.png">`
  // prettier-ignore
  const expectedReturn = `![](https://user-images.githubusercontent.com/62756189/171398768-2675795b-3eb5-4783-b7d4-484a8c475b03.png)
![](https://user-images.githubusercontent.com/62756189/171398772-ce2b27f6-7611-43a0-bf7b-13a5869450f7.png)`

  const markdown = ImgToMarkdown(sample)
  expect(markdown).toBe(expectedReturn)

  expect(ImgToMarkdown(expectedReturn)).toBe(expectedReturn)
})
