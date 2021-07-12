export default function(texts) {
  const obj = {}
  texts.forEach(t => obj[t.title] = t.text)
  return obj
}