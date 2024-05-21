











































export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide)
    this.values = {
      startPosition: 0,
      movement: 0,
      distance: 0,
      endPosition: 0
    }
    this.active = "active"
  }
  init() {
    if (this.wrapper && this.slide) {
      this.bindEvents()
      this.slideEvents()
      this.getPosition()
      this.centralizeSlide(0)
      this.highlightMainImage()
      this.resizeEvent()
    }
    return this;
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onResize = this.onResize.bind(this)
  }
  slideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart)
    this.wrapper.addEventListener("touchstart", this.onStart)
    this.wrapper.addEventListener("mouseup", this.onEnd)
    this.wrapper.addEventListener("touchend", this.onEnd)
  }
  onStart(event) {
    event.preventDefault()
    let movetype
    if (event.type === "mousedown") {
      movetype = "mousemove"
      this.values.startPosition = event.clientX
    } else if (event.type === "touchstart") {
      movetype = "touchmove"
      this.values.startPosition = event.changedTouches[0].clientX
    }
    this.wrapper.addEventListener(movetype, this.onMove)
    return this.transition(false)
  }
  onMove(event) {
    const clientX = event.type === "mousemove"
      ? event.clientX
      : event.changedTouches[0].clientX
    this.values.movement = (this.values.startPosition - clientX) * 1.6
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
    this.changeSlide()
    this.transition(true)
    return this.highlightMainImage()
  }
  getPosition() {
    this.slideArray = [...this.slide.children].map((element) => {
      const margin = (this.wrapper.offsetWidth - element.offsetWidth) / 2
      const position = -(element.offsetLeft - margin)
      return {
        element,
        position
      }
    })
  }
  centralizeSlide(index) {
    this.moveSlide(this.slideArray[index].position)
    this.values.endPosition = this.slideArray[index].position
    return this.slideIndex(index)
  }
  slideIndex(index) {
    this.positions = {
      prev: index - 1 === -1 ? undefined : index - 1,
      active: index,
      next: index + 1 === 6 ? undefined : index + 1
    }
  }
  changeSlide() {
    return this.values.movement > 0
      ? this.changeNextSlide()
      : this.changePrevSlide()
  }
  changeNextSlide() {
    return this.positions.next === undefined
      ? this.centralizeSlide(this.positions.active)
      : this.centralizeSlide(this.positions.next)
  }
  changePrevSlide() {
    return this.positions.prev === undefined
      ? this.centralizeSlide(this.positions.active)
      : this.centralizeSlide(this.positions.prev)
  }
  transition(active) {
    this.slide.style.transition = active ? ".3s" : ""
  }
  highlightMainImage() {
    this.slideArray.forEach((image) => {
      image.element.classList.remove(this.active)
    })
    this.slideArray[this.positions.active].element.classList.add(this.active)
  }
  resizeEvent() {
    window.addEventListener("resize", this.onResize)
  }
  onResize() {
    setTimeout(() => {
      this.getPosition()
      this.centralizeSlide(this.positions.active)
    }, 1000)
  }
}
