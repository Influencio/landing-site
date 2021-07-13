export default function textMap(texts) {
  const obj = {}
  texts.forEach(t => obj[t.title] = t.text)
  return obj
}