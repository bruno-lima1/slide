












































import debounce from "./debounce.js";

export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide)
    this.values = {
      startPosition: 0,
      distance: 0,
      movePosition: 0,
      endPosition: 0
    }
    this.active = "active"
  }
  init() {
    if (this.wrapper && this.slide) {
      this.bindEvents()
      this.addSlideEvents()
      this.centralizeSlide(0)
    }
    return this;
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.centralizeWhenResize = debounce(this.centralizeWhenResize.bind(this), 1000)
  }
  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart)
    this.wrapper.addEventListener("touchstart", this.onStart)
    this.wrapper.addEventListener("mouseup", this.onEnd)
    this.wrapper.addEventListener("touchend", this.onEnd)
    window.addEventListener("resize", this.centralizeWhenResize)
  }
  onStart(event) {
    event.preventDefault()
    if (event.type === "mousedown") {
      this.wrapper.addEventListener("mousemove", this.onMove)
      this.values.startPosition = event.clientX
    } else {
      this.wrapper.addEventListener("touchmove", this.onMove)
      this.values.startPosition = event.changedTouches[0].clientX
    }
    this.enableTransition(false)
  }
  onMove(event) {
    if (event.type === "mousemove") {
      this.values.distance = this.values.startPosition - event.clientX
    } else {
      this.values.distance = this.values.startPosition - event.changedTouches[0].clientX
    }
    this.values.movePosition = this.values.endPosition - this.values.distance
    this.moveSlide(this.values.movePosition)
  }
  moveSlide(position) {
    this.slide.style.transform = `translate3d(${position}px, 0, 0)`
  }
  onEnd() {
    this.wrapper.removeEventListener("mousemove", this.onMove)
    this.values.endPosition = this.values.movePosition
    this.changeSlide()
    this.enableTransition(true)
  }
  centralizeSlide(index) {
    this.slideArray = [...this.slide.children].map((element) => {
      const margin = (this.wrapper.offsetWidth - element.offsetWidth) / 2
      const offsetLeft = -(element.offsetLeft - margin)
      return {
        element,
        offsetLeft
      }
    })
    this.moveSlide(this.slideArray[index].offsetLeft)
    this.values.endPosition = this.slideArray[index].offsetLeft
    this.indexSlide(index)
    this.enableAnimation(index)
  }
  indexSlide(index) {
    this.index = {
      prev: index - 1 === -1 ? undefined : index - 1,
      active: index,
      next: index + 1 === 6 ? undefined : index + 1,
    }
  }
  changeSlide() {
    if (this.values.distance > 0 && this.index.next !== undefined) {
      this.centralizeSlide(this.index.next)
    } else if (this.values.distance < 0 && this.index.prev !== undefined) {
      this.centralizeSlide(this.index.prev)
    } else if (this.values.distance > 0 && this.index.next === undefined) {
      this.centralizeSlide(this.index.active)
    } else if (this.values.distance < 0 && this.index.prev === undefined) {
      this.centralizeSlide(this.index.active)
    }
  }
  enableTransition(active) {
    this.slide.style.transition = active ? ".5s" : "";
  }
  enableAnimation(index) {
    this.slideArray.forEach((item) => {
      item.element.classList.remove("active")
    })
    this.slideArray[index].element.classList.add(this.active)
  }
  centralizeWhenResize() {
    this.centralizeSlide(this.index.active)
  }
}



// export class Slide {
//   constructor(wrapper, slide) {
//     this.wrapper = document.querySelector(wrapper);
//     this.slide = document.querySelector(slide)
//     this.values = {
//       startPosition: 0,
//       movement: 0,
//       distance: 0,
//       endPosition: 0
//     }
//     this.active = "active"
//   }
//   init() {
//     if (this.wrapper && this.slide) {
//       this.bindEvents()
//       this.slideEvents()
//       this.getPosition()
//       this.centralizeSlide(0)
//       this.highlightMainImage()
//       this.resizeEvent()
//     }
//     return this;
//   }
//   bindEvents() {
//     this.onStart = this.onStart.bind(this)
//     this.onMove = this.onMove.bind(this)
//     this.onEnd = this.onEnd.bind(this)
//     this.onResize = this.onResize.bind(this)
//   }
//   slideEvents() {
//     this.wrapper.addEventListener("mousedown", this.onStart)
//     this.wrapper.addEventListener("touchstart", this.onStart)
//     this.wrapper.addEventListener("mouseup", this.onEnd)
//     this.wrapper.addEventListener("touchend", this.onEnd)
//   }
//   onStart(event) {
//     event.preventDefault()
//     let movetype
//     if (event.type === "mousedown") {
//       movetype = "mousemove"
//       this.values.startPosition = event.clientX
//     } else if (event.type === "touchstart") {
//       movetype = "touchmove"
//       this.values.startPosition = event.changedTouches[0].clientX
//     }
//     this.wrapper.addEventListener(movetype, this.onMove)
//     return this.transition(false)
//   }
//   onMove(event) {
//     const clientX = event.type === "mousemove"
//       ? event.clientX
//       : event.changedTouches[0].clientX
//     this.values.movement = (this.values.startPosition - clientX) * 1.6
//     this.values.distance = this.values.endPosition - this.values.movement
//     return this.moveSlide(this.values.distance)
//   }
//   moveSlide(distance) {
//     this.slide.style.transform = `translate3d(${distance}px, 0, 0)`
//   }
//   onEnd(event) {
//     const movetype = event.type === "mouseup"
//       ? "mousemove"
//       : "touchmove"
//     this.wrapper.removeEventListener(movetype, this.onMove)
//     this.values.endPosition = this.values.distance
//     this.changeSlide()
//     this.transition(true)
//     return this.highlightMainImage()
//   }
//   getPosition() {
//     this.slideArray = [...this.slide.children].map((element) => {
//       const margin = (this.wrapper.offsetWidth - element.offsetWidth) / 2
//       const position = -(element.offsetLeft - margin)
//       return {
//         element,
//         position
//       }
//     })
//   }
//   centralizeSlide(index) {
//     this.moveSlide(this.slideArray[index].position)
//     this.values.endPosition = this.slideArray[index].position
//     return this.slideIndex(index)
//   }
//   slideIndex(index) {
//     this.positions = {
//       prev: index - 1 === -1 ? undefined : index - 1,
//       active: index,
//       next: index + 1 === 6 ? undefined : index + 1
//     }
//   }
//   changeSlide() {
//     return this.values.movement > 0
//       ? this.changeNextSlide()
//       : this.changePrevSlide()
//   }
//   changeNextSlide() {
//     return this.positions.next === undefined
//       ? this.centralizeSlide(this.positions.active)
//       : this.centralizeSlide(this.positions.next)
//   }
//   changePrevSlide() {
//     return this.positions.prev === undefined
//       ? this.centralizeSlide(this.positions.active)
//       : this.centralizeSlide(this.positions.prev)
//   }
//   transition(active) {
//     this.slide.style.transition = active ? ".3s" : ""
//   }
//   highlightMainImage() {
//     this.slideArray.forEach((image) => {
//       image.element.classList.remove(this.active)
//     })
//     this.slideArray[this.positions.active].element.classList.add(this.active)
//   }
//   resizeEvent() {
//     window.addEventListener("resize", this.onResize)
//   }
//   onResize() {
//     setTimeout(() => {
//       this.getPosition()
//       this.centralizeSlide(this.positions.active)
//     }, 1000)
//   }
// }
// export class SlideNav extends Slide {
//   addArrow(prev, next) {
//     this.prevElement = document.querySelector(prev)
//     this.nextElement = document.querySelector(next)
//   }
// }
