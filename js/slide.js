export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide)
    this.values = { startPosition: 0, movement: 0, endPosition: 0, distance: 0}
  }
  init() {
    if (this.wrapper && this.slide) {
      this.bindEvents()
      this.addEvents()
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
    let movetype;
    if (event.type === "mousedown") {
      this.values.startPosition = event.clientX
      movetype = "mousemove"
    } else {
      this.values.startPosition = event.changedTouches[0].clientX
      movetype = "touchmove"
    }
    this.wrapper.addEventListener(movetype, this.onMove)
  }
  onMove(event) {
    event.preventDefault()
    const clientX = (event.type === "mousemove")
      ? event.clientX
      : event.changedTouches[0].clientX
    this.values.movement = Math.floor((this.values.startPosition - clientX) * 1.6);
    this.values.distance = Math.floor(this.values.endPosition - this.values.movement)
    this.slide.style.transform = `translate3d(${this.values.distance}px, 0, 0)`;
  }
  onEnd(event) {
    const typemove = (event.type === "mouseup")
      ? "mousemove"
      : "touchmove"
    this.wrapper.removeEventListener(typemove, this.onMove)
    this.values.endPosition = this.values.distance
  }
}











































// export default class Slide {
//   constructor(wrapper, slide) {
//     this.wrapper = document.querySelector(wrapper);
//     this.slide = document.querySelector(slide)
//     this.values = { startPosition: 0, movement: 0, endPosition: 0, distance: 0}
//   }
//   init() {
//     if (this.wrapper && this.slide) {
//       this.bindEvents()
//       this.addEvents()
//     }
//     return this;
//   }
//   bindEvents() {
//     this.onStart = this.onStart.bind(this)
//     this.onMove = this.onMove.bind(this)
//     this.onEnd = this.onEnd.bind(this)
//   }
//   addEvents() {
//     this.wrapper.addEventListener("mousedown", this.onStart)
//     this.wrapper.addEventListener("touchstart", this.onStart)
//     this.wrapper.addEventListener("mouseup", this.onEnd)
//     this.wrapper.addEventListener("touchend", this.onEnd)
//   }
//   onStart(event) {
//     let movetype;
//     if (event.type === "mousedown") {
//       this.values.startPosition = event.clientX
//       movetype = "mousemove"
//     } else {
//       this.values.startPosition = event.changedTouches[0].clientX
//       movetype = "touchmove"
//     }
//     this.wrapper.addEventListener(movetype, this.onMove)
//   }
//   onMove(event) {
//     event.preventDefault()
//     const clientX = (event.type === "mousemove")
//       ? event.clientX
//       : event.changedTouches[0].clientX
//     this.values.movement = Math.floor((this.values.startPosition - clientX) * 1.6);
//     this.values.distance = Math.floor(this.values.endPosition - this.values.movement)
//     this.slide.style.transform = `translate3d(${this.values.distance}px, 0, 0)`;
//   }
//   onEnd(event) {
//     const typemove = (event.type === "mouseup")
//       ? "mousemove"
//       : "touchmove"
//     this.wrapper.removeEventListener(typemove, this.onMove)
//     this.values.endPosition = this.values.distance
//   }
// }
