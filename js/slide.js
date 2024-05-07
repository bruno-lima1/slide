export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.values = { startPosition: 0, movement: 0, endPosition: 0, distance: 0 };
  }
  init() {
    if (this.wrapper && this.slide) {
      this.bindEvents();
      this.addEvent();
    }
    return this;
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  addEvent() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }
  onStart(event) {
    this.wrapper.addEventListener("mousemove", this.onMove);
    this.values.startPosition = event.clientX;
  }
  onMove(event) {
    event.preventDefault()
    this.values.movement = (this.values.startPosition - event.clientX) * 1.6;
    this.values.distance = this.values.endPosition - this.values.movement
    return this.moveSlide();
  }
  moveSlide() {
    this.slide.style.transform = `translate3d(${this.values.distance}px, 0, 0)`;
  }
  onEnd() {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.values.endPosition = this.values.distance;
  }
}










































// export default class Slide {
//   constructor(wrapper, slide) {
//     this.wrapper = document.querySelector(wrapper);
//     this.slide = document.querySelector(slide)
//     this.values = { startPosition: 0, movement: 0, distance: 0, endPosition: 0 }
//   }
//   init() {
//     if (this.wrapper && this.slide) {
//       this.bindEvents()
//       this.addEvents()
//     }
//     return this;
//   }
//   bindEvents() {
//     this.onStart = this.onStart.bind(this);
//     this.onMove = this.onMove.bind(this);
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
//       event.preventDefault()
//       this.values.startPosition = event.clientX
//       movetype = "mousemove"
//     } else {
//       this.values.startPosition = event.changedTouches[0].clientX
//       movetype = "touchmove"
//     }
//     this.wrapper.addEventListener(movetype, this.onMove)
//   }
//   onMove(event) {
//     const pointerPosition = (event.type === "mousemove") 
//       ? event.clientX 
//       : event.changedTouches[0].clientX
//     event.preventDefault();
//     this.values.movement = (this.values.startPosition - pointerPosition) * 1.6
//     this.values.distance = this.values.endPosition - this.values.movement
//     return this.moveSlide()
//   }
//   moveSlide() {
//     this.slide.style.transform = `translate3d(${this.values.distance}px, 0, 0)`
//   }
//   onEnd(event) {
//     const movetype = (event.type === "mouseup")
//       ? "mousemove"
//       : "touchmove"
//     this.wrapper.removeEventListener(movetype, this.onMove)
//     this.values.endPosition = this.values.distance
//   }
// }
