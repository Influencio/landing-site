export default function imageMap(images) {
  const obj = {}
  images.forEach(i => obj[i.title] = i.image)
  return obj
}