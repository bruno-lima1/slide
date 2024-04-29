export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)
    this.wrapper = document.querySelector(wrapper)
  }
  init() {
    if (this.slide && this.wrapper) {
      this.bindEvents()
      this.addSlideEvents()
    }
    return this;
  }
  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart)
    this.wrapper.addEventListener("mouseup", this.onEnd)
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }
  onStart(event) {
    event.preventDefault()
    console.log("mousedown")
    this.wrapper.addEventListener("mousemove", this.onMove)

  }
  onMove() {
    console.log("moveu")
  }
  onEnd() {
    console.log("mouseup")
    this.wrapper.removeEventListener("mousemove", this.onMove)

  }
}
