export default function debounce(callback, delay) {
  let timer;
  return ((...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      callback(...args)
    }, delay)
  })
}
