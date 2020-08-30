import './heading.css'
export default ()=> {
  const element = document.createElement('h2')
  element.textContent = 'hello world'
  element.classList.add('heading')
  element.addEventListener('click', ()=> {
    alert('hellp212')
  })
  return element
}
