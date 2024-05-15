











































export default class SLide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper)
    this.slide = document.querySelector(slide)
    this.values = {
      startPosition: 0,
      movement: 0,
      distance: 0,
      endPosition: 0
    }
  }
  init() {
    if (this.wrapper && this.slide) {
      this.bindEvents();
      this.addEvents()
      this.centralizeSlide(0)
    }
    return this;
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }
  addEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart)
    this.wrapper.addEventListener("touchstart", this.onStart)
    this.wrapper.addEventListener("mouseup", this.onEnd)
    this.wrapper.addEventListener("touchend", this.onEnd)
  }
  onStart(event) {
    let movetype
    if (event.type === "mousedown") {
      this.values.startPosition = event.clientX
      movetype = "mousemove"
    } else if (event.type === "touchstart") {
      this.values.startPosition = event.changedTouches[0].clientX
      movetype = "touchmove"
    }
    this.wrapper.addEventListener(movetype, this.onMove)
    return this.transition(false)
  }
  onMove(event) {
    event.preventDefault()
    const clientX = event.type === "mousemove"
      ? event.clientX
      : event.changedTouches[0].clientX
    this.values.movement = (this.values.startPosition - clientX) * 1.6;
    this.values.distance = this.values.endPosition - this.values.movement
    return this.moveSlide(this.values.distance)
  }
  moveSlide(distance) {
    this.slide.style.transform = `translate3d(${distance}px, 0, 0)`
  }
  onEnd(event) {
    const movetype = event.type === "mouseup"
      ? "mousemove"
      : "touchmove"
    this.wrapper.removeEventListener(movetype, this.onMove)
    this.values.endPosition = this.values.distance
    this.transition(true)
    return this.changeSlide()
  }
  centralizeSlide(index) {
    this.slideArray = [...this.slide.children].map((element) => {
      const margin = (this.wrapper.offsetWidth - element.offsetWidth) / 2
      const position = -(element.offsetLeft - margin)
      return {
        position
      }
    })
    this.moveSlide(this.slideArray[index].position)
    this.values.endPosition = this.slideArray[index].position
    return this.slideIndex(index)
  }
  slideIndex(index) {
    const last = this.slideArray.length - 1
    this.positions = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1
    }
  }
  changeSlide() {
    return this.values.movement > 0 
      ? this.enableNextSlide()
      : this.enablePrevSlide()
  }
  enableNextSlide() {
    return this.positions.next !== undefined
      ? this.centralizeSlide(this.positions.next)
      : this.centralizeSlide(this.positions.active)
  }
  enablePrevSlide() {
    return this.positions.prev !== undefined
      ? this.centralizeSlide(this.positions.prev)
      : this.centralizeSlide(this.positions.active)
  }
  transition(active) {
    this.slide.style.transition = active ? ".3s" : ""
  }
}
