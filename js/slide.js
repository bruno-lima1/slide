











































export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide)
    this.values = { startPosition: 0, movement: 0, distance: 0, endPosition: 0 }
  }
  init() {
    if (this.wrapper && this.slide) {
      this.bindEvents()
      this.addEvents()
      this.slideConfig()
    }
    return this;
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }
  addEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd)
    this.wrapper.addEventListener("touchend", this.onEnd)
  }
  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      this.values.startPosition = event.clientX;
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
    this.values.movement = (this.values.startPosition - clientX) * 1.6;
    this.values.distance = this.values.endPosition - this.values.movement;
    return this.moveSlide(this.values.distance)
  }
  moveSlide(distance) {
    this.slide.style.transform = `translate3d(${distance}px, 0, 0)`
  }
  onEnd(event) {
    const movetype = (event.type === "mouseup")
      ? "mousemove"
      : "touchmove"
    this.wrapper.removeEventListener(movetype, this.onMove)
    this.values.endPosition = this.values.distance
  }
  slideConfig() {
    this.slideArray = [...this.slide.children].map((image) => {
      const position = this.getPosition(image)
      return {
        position
      }
    })
  }
  getPosition(image) {
    const margin = (this.wrapper.offsetWidth - image.offsetWidth) / 2
    return -(image.offsetLeft - margin)
  }
  changeSlide(index) {
    this.moveSlide(this.slideArray[index].position)
    this.values.endPosition = this.slideArray[index].position
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
//       this.slideConfig()
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
//     ? event.clientX
//     : event.changedTouches[0].clientX
//     this.values.movement = (this.values.startPosition - clientX) * 1.6;
//     this.values.distance = this.values.endPosition - this.values.movement
//     return this.moveSlide(this.values.distance)
//   }
//   moveSlide(distance) {
//     this.slide.style.transform = `translate3d(${distance}px, 0, 0)`;
//   }
//   onEnd(event) {
//     const typemove = (event.type === "mouseup")
//     ? "mousemove"
//     : "touchmove"
//       this.wrapper.removeEventListener(typemove, this.onMove)
//       this.values.endPosition = this.values.distance
//       this.changeSlideOnEnd()
//   }
//   slideConfig() {
//     this.slideArray = [...this.slide.children].map((image) => {
//       const position = this.getPosition(image);
//       return {
//         position,
//       }
//     })
//   }
//   getPosition(image) {
//     const margin = (this.wrapper.offsetWidth - image.offsetWidth) / 2;
//     return -(image.offsetLeft - margin)
//   }
//   changeSlide(index) {
//     const activeSlide = this.slideArray[index]
//     this.moveSlide(activeSlide.position)
//     this.slideIndexNav(index)
//     this.values.endPosition = activeSlide.position
//   }
//   slideIndexNav(index) {
//     const last = this.slideArray.length - 1;
//     this.index = {
//       prev: index ? index - 1 : undefined,
//       active: index,
//       next: index === last ? undefined : index + 1
//     }
//   }
//   activePrevSlide() {
//     if (this.index.prev !== undefined) {
//       this.changeSlide(this.index.prev)
//     }
//   }
//   activeNextSlide() {
//     if (this.index.next !== undefined) {
//       this.changeSlide(this.index.next)
//     }
//   }
//   changeSlideOnEnd() {
//     if (this.values.movement > 120) {
//       this.activeNextSlide()
//     } else if (this.values.movement < -120) {
//       this.activePrevSlide()
//     }
//   }
// }



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
//       this.slideConfig()
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
//     ? event.clientX
//     : event.changedTouches[0].clientX
//     this.values.movement = (this.values.startPosition - clientX) * 1.6;
//     this.values.distance = this.values.endPosition - this.values.movement
//     return this.moveSlide(this.values.distance)
//   }
//   moveSlide(distance) {
//     this.slide.style.transform = `translate3d(${distance}px, 0, 0)`;
//   }
//   onEnd(event) {
//     const typemove = (event.type === "mouseup")
//     ? "mousemove"
//     : "touchmove"
//       this.wrapper.removeEventListener(typemove, this.onMove)
//       this.values.endPosition = this.values.distance
//       this.changeSlideOnEnd()
//   }
//   slideConfig() {
//     this.slideArray = [...this.slide.children].map((image) => {
//       const position = this.getPosition(image);
//       return {
//         position,
//       }
//     })
//   }
//   getPosition(image) {
//     const margin = (this.wrapper.offsetWidth - image.offsetWidth) / 2;
//     return -(image.offsetLeft - margin)
//   }
//   changeSlide(index) {
//     const activeSlide = this.slideArray[index]
//     this.moveSlide(this.slideArray[index].position)
//     this.slidesIndexNav(index)
//     this.values.endPosition = activeSlide.position
//   }
//   slidesIndexNav(index) {
//     const last = this.slideArray.length -1
//     this.index = {
//       prev: index ? index - 1 : undefined,
//       active: index,
//       next: index === last ? undefined : index + 1
//     }
//   }
//   enablePrevSlide() {
//     if (this.index.prev !== undefined) {
//       this.changeSlide(this.index.prev)
//     }
//   }
//   enableNextSlide() {
//     if (this.index.next !== undefined) {
//       this.changeSlide(this.index.next)
//     }
//   }
//   changeSlideOnEnd() {
//     if (this.values.movement > 120 && this.index.next !== undefined) {
//       this.enableNextSlide()
//     } else if (this.values.movement < -120 && this.index.prev !== undefined) {
//       this.enablePrevSlide()
//     } else {
//       this.changeSlide(this.index.active)
//     }
//   }
// }



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
//       this.slideConfig()
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
//     this.transition(false)
//   }
//   onMove(event) {
//     event.preventDefault()
//     const clientX = (event.type === "mousemove")
//     ? event.clientX
//     : event.changedTouches[0].clientX
//     this.values.movement = (this.values.startPosition - clientX) * 1.6;
//     this.values.distance = this.values.endPosition - this.values.movement
//     return this.moveSlide(this.values.distance)
//   }
//   moveSlide(distance) {
//     this.slide.style.transform = `translate3d(${distance}px, 0, 0)`;
//   }
//   onEnd(event) {
//     const typemove = (event.type === "mouseup")
//     ? "mousemove"
//     : "touchmove"
//       this.wrapper.removeEventListener(typemove, this.onMove)
//       this.values.endPosition = this.values.distance
//       this.changeSlideOnEnd()
//     this.transition(true)
//   }
//   slideConfig() {
//     this.slideArray = [...this.slide.children].map((image) => {
//       const position = this.getPosition(image);
//       return {
//         position,
//       }
//     })
//   }
//   getPosition(image) {
//     const margin = (this.wrapper.offsetWidth - image.offsetWidth) / 2;
//     return -(image.offsetLeft - margin)
//   }
//   changeSlide(index) {
//     const activeSlide = this.slideArray[index]
//     this.moveSlide(this.slideArray[index].position)
//     this.slidesIndexNav(index)
//     this.values.endPosition = activeSlide.position
//   }
//   slidesIndexNav(index) {
//     const last = this.slideArray.length -1
//     this.index = {
//       prev: index ? index - 1 : undefined,
//       active: index,
//       next: index === last ? undefined : index + 1
//     }
//   }
//   enablePrevSlide() {
//     if (this.index.prev !== undefined) {
//       this.changeSlide(this.index.prev)
//     }
//   }
//   enableNextSlide() {
//     if (this.index.next !== undefined) {
//       this.changeSlide(this.index.next)
//     }
//   }
//   changeSlideOnEnd() {
//     if (this.values.movement > 120 && this.index.next !== undefined) {
//       this.enableNextSlide()
//     } else if (this.values.movement < -120 && this.index.prev !== undefined) {
//       this.enablePrevSlide()
//     } else {
//       this.changeSlide(this.index.active)
//     }
//   }
//   transition(active) {
//     this.slide.style.transition = active ? `transform .3s` : ""
//   }
// }
