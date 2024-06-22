import debounce from "./debounce.js"

export class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide)
    this.values = {
      startPosition: 0,
      movePosition: 0,
      distance: 0,
      endPosition: 0
    }
    this.active = "active"
    this.controlEvent = new Event("controlEvent")
  }
  init() {
    if (this.wrapper && this.slide) {
      this.bindEvents()
      this.slideEvents()
      this.centralizeSlide(0)
      this.enableControl()
      this.enableTransition(true)
    }
    return this;
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.centralizeWhenResize = this.centralizeWhenResize.bind(this)
  }
  slideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart)
    this.wrapper.addEventListener("touchstart", this.onStart)
    this.wrapper.addEventListener("mouseup", this.onEnd)
    this.wrapper.addEventListener("touchend", this.onEnd)
    window.addEventListener("resize", debounce(this.centralizeWhenResize, 1000))
  }
  onStart(event) {
    if (event.type === "mousedown") {
      event.preventDefault()
      this.wrapper.addEventListener("mousemove", this.onMove)
      this.values.startPosition = event.clientX
    } else if (event.type === "touchstart") {
      this.values.startPosition = event.changedTouches[0].clientX
      this.wrapper.addEventListener("touchmove", this.onMove)
    }
    this.enableTransition(false)
  }
  onMove(event) {
    if (event.type === "mousemove") {
      this.values.movePosition = this.values.startPosition - event.clientX
    } else if (event.type === "touchmove") {
      this.values.movePosition = this.values.startPosition - event.changedTouches[0].clientX
    }
    this.values.distance = this.values.endPosition - this.values.movePosition
    this.moveSlide(this.values.distance)
  }
  moveSlide(distance) {
    this.slide.style.transform = `translate3d(${distance}px, 0, 0)`
  }
  onEnd(event) {
    let movetype;
    if (event.type === "mouseup") {
      movetype = "mousemove"
    } else if (event.type === "touchend") {
      movetype = "touchmove"
    }
    this.wrapper.removeEventListener(movetype, this.onMove)
    this.values.endPosition = this.values.distance
    this.changeSlide()
    this.enableTransition(true)
    this.wrapper.dispatchEvent(this.controlEvent)
  }
  centralizeSlide(index) {
    this.slideArray = [...this.slide.children].map((element) => {
      this.margin = (this.wrapper.offsetWidth - element.offsetWidth) / 2;
      const offsetLeft = this.margin - element.offsetLeft
      return {
        element,
        offsetLeft
      }
    })
    this.moveSlide(this.slideArray[index].offsetLeft)
    this.values.endPosition = this.slideArray[index].offsetLeft
    this.slideIndex(index)
    this.enableAnimation(index)
  }
  slideIndex(index) {
    this.index = {
      prev: index - 1 === -1 ? undefined : index - 1,
      active: index,
      next: index + 1 === 6 ? undefined : index + 1,
    }
  }
  changeSlide() {
    if (this.values.movePosition > 0 && this.index.next !== undefined) {
      this.centralizeSlide(this.index.next)
    } else if (this.values.movePosition < 0 && this.index.prev !== undefined) {
      this.centralizeSlide(this.index.prev)
    } else if (this.values.movePosition > 0 && this.index.next === undefined || this.values.movePosition < 0 && this.index.prev === undefined) {
      this.centralizeSlide(this.index.active)
    }
  }
  enableTransition(active) {
    this.slide.style.transition = active ? ".5s" : ""
  }
  enableAnimation(index) {
    [...this.slide.children].map((item) => {
      item.classList.remove(this.active)
    })
    this.slideArray[index].element.classList.add(this.active)
  }
  centralizeWhenResize() {
    this.centralizeSlide(this.index.active)
  }
} 
export default class SlideNav extends Slide {
  constructor(wrapper, slide, control) {
    super(wrapper, slide)
    this.control = document.querySelector(control)
    this.changeControl = this.changeControl.bind(this)
  }
  enableControl() {
    this.controlArray = [...this.control.children]
    this.controlArray[this.index.active].classList.add(this.active)
    this.controlArray.forEach((item, index) => {
      item.addEventListener("click", () => {
        this.controlArray.forEach((element) => {
          element.classList.remove(this.active)
        })
        item.classList.add(this.active)
        this.centralizeSlide(index)
      })
      this.wrapper.addEventListener("controlEvent", this.changeControl)
    })
  }
  changeControl() {
    this.controlArray.forEach((element) => {
      element.classList.remove(this.active)
    })
    this.controlArray[this.index.active].classList.add(this.active)
  }
}
