// I know but I don't have time to refactor this

const ImgToMarkdown = (text) => {
  return text
    .split('\n')
    .map((line) => {
      if (line.match(/src="(.*?)"/)) {
        return `![](${[...line.matchAll(/src="(.*?)"/g)][0][1]})`
      }
      return line
    })
    .join('\n')
}

export default ImgToMarkdown
