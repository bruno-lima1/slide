












































import debounce from "./debounce.js";

export class Slide {
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
    this.changeEvent = new Event("changeEvent")
  }
  init() {
    if (this.wrapper && this.slide) {
      this.bindEvents()
      this.addSlideEvents()
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
    this.wrapper.dispatchEvent(this.changeEvent)
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
export default class SlideNav extends Slide {
  constructor(wrapper, slide) {
    super(wrapper, slide)
    this.bindControlEvents()
  }
  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this)
    this.activeControlItem = this.activeControlItem.bind(this)
  }
  enableControl() {
    this.control = document.querySelector("[data-control] ul");
    this.controlArray = [...this.control.children]
    this.activeControlItem()
    this.controlArray.forEach(this.eventControl)
  }
  eventControl(item, index) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      this.centralizeSlide(index)
    })
    this.wrapper.addEventListener("changeEvent", this.activeControlItem)
  }
  activeControlItem() {
    this.controlArray.forEach((item) => {
      item.classList.remove(this.active)
    })
    this.controlArray[this.index.active].classList.add(this.active)
  }
}



// import debounce from "./debounce.js";

// export class Slide {
//   constructor(wrapper, slide) {
//     this.wrapper = document.querySelector(wrapper);
//     this.slide = document.querySelector(slide)
//     this.values = {
//       startPosition: 0,
//       distance: 0,
//       movePosition: 0,
//       endPosition: 0
//     }
//     this.active = "active"
//   }
//   init() {
//     if (this.wrapper && this.slide) {
//       this.bindEvents()
//       this.addSlideEvents()
//       this.centralizeSlide(0)
//       this.enableControl()
//       this.enableTransition(true)
//     }
//     return this;
//   }
//   bindEvents() {
//     this.onStart = this.onStart.bind(this)
//     this.onMove = this.onMove.bind(this)
//     this.onEnd = this.onEnd.bind(this)
//     this.centralizeWhenResize = debounce(this.centralizeWhenResize.bind(this), 1000)
//   }
//   addSlideEvents() {
//     this.wrapper.addEventListener("mousedown", this.onStart)
//     this.wrapper.addEventListener("touchstart", this.onStart)
//     this.wrapper.addEventListener("mouseup", this.onEnd)
//     this.wrapper.addEventListener("touchend", this.onEnd)
//     window.addEventListener("resize", this.centralizeWhenResize)
//   }
//   onStart(event) {
//     event.preventDefault()
//     if (event.type === "mousedown") {
//       this.wrapper.addEventListener("mousemove", this.onMove)
//       this.values.startPosition = event.clientX
//     } else {
//       this.wrapper.addEventListener("touchmove", this.onMove)
//       this.values.startPosition = event.changedTouches[0].clientX
//     }
//     this.enableTransition(false)
//   }
//   onMove(event) {
//     if (event.type === "mousemove") {
//       this.values.distance = this.values.startPosition - event.clientX
//     } else {
//       this.values.distance = this.values.startPosition - event.changedTouches[0].clientX
//     }
//     this.values.movePosition = this.values.endPosition - this.values.distance
//     this.moveSlide(this.values.movePosition)
//   }
//   moveSlide(position) {
//     this.slide.style.transform = `translate3d(${position}px, 0, 0)`
//   }
//   onEnd() {
//     this.wrapper.removeEventListener("mousemove", this.onMove)
//     this.values.endPosition = this.values.movePosition
//     this.changeSlide()
//     this.enableTransition(true)
//   }
//   centralizeSlide(index) {
//     this.slideArray = [...this.slide.children].map((element) => {
//       const margin = (this.wrapper.offsetWidth - element.offsetWidth) / 2
//       const offsetLeft = -(element.offsetLeft - margin)
//       return {
//         element,
//         offsetLeft
//       }
//     })
//     this.moveSlide(this.slideArray[index].offsetLeft)
//     this.values.endPosition = this.slideArray[index].offsetLeft
//     this.indexSlide(index)
//     this.enableAnimation(index)
//   }
//   indexSlide(index) {
//     this.index = {
//       prev: index - 1 === -1 ? undefined : index - 1,
//       active: index,
//       next: index + 1 === 6 ? undefined : index + 1,
//     }
//   }
//   changeSlide() {
//     if (this.values.distance > 0 && this.index.next !== undefined) {
//       this.centralizeSlide(this.index.next)
//     } else if (this.values.distance < 0 && this.index.prev !== undefined) {
//       this.centralizeSlide(this.index.prev)
//     } else if (this.values.distance > 0 && this.index.next === undefined) {
//       this.centralizeSlide(this.index.active)
//     } else if (this.values.distance < 0 && this.index.prev === undefined) {
//       this.centralizeSlide(this.index.active)
//     }
//   }
//   enableTransition(active) {
//     this.slide.style.transition = active ? ".5s" : "";
//   }
//   enableAnimation(index) {
//     this.slideArray.forEach((item) => {
//       item.element.classList.remove("active")
//     })
//     this.slideArray[index].element.classList.add(this.active)
//   }
//   centralizeWhenResize() {
//     this.centralizeSlide(this.index.active)
//   }
// }
// export default class SlideNav extends Slide {
//   constructor(wrapper, slide) {
//     super(wrapper, slide)
//     this.bindControlEvents()
//   }
//   bindControlEvents() {
//     this.changeSlideWhenControl = this.changeSlideWhenControl.bind(this)
//   }
//   enableControl() {
//     this.control = document.querySelector("[data-control] ul");
//     this.controlArray = [...this.control.children]
//     this.controlArray[this.index.active].classList.add(this.active)
//     this.controlArray.forEach(this.changeSlideWhenControl)
//   }
//   changeSlideWhenControl(item, index) {
//     item.addEventListener("click", () => {
//       this.centralizeSlide(index)
//       this.controlArray.forEach((item) => {
//         item.classList.remove(this.active)
//       })
//       item.classList.add(this.active)
//     })
//   }
// }
