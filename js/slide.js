











































// export default class Slide {
//   constructor(wrapper, slide) {
//     this.wrapper = document.querySelector(wrapper);
//     this.slide = document.querySelector(slide);
//     this.dist = { finalPosition: 0, startX: 0, movement: 0 };
//   }
//   init() {
//     if (this.wrapper && this.slide) {
//       this.bindEvents();
//       this.addSlideEvents();
//     }
//     return this;
//   }
//   bindEvents() {
//     this.onStart = this.onStart.bind(this);
//     this.onMove = this.onMove.bind(this);
//     this.onEnd = this.onEnd.bind(this);
//   }
//   addSlideEvents() {
//     this.wrapper.addEventListener("mousedown", this.onStart);
//     this.wrapper.addEventListener("mouseup", this.onEnd);
//   }
//   onStart(event) {
//     this.wrapper.addEventListener("mousemove", this.onMove);
//     this.dist.startX = event.clientX;
//   }
//   onMove(event) {
//     event.preventDefault();
//     const distance = this.updatePosition(event.clientX);
//     this.moveSlide(distance);
//   }
//   updatePosition(clientX) {
//     this.dist.movement = (this.dist.startX - clientX) * 1.6;
//     return this.dist.finalPosition - this.dist.movement;
//   }
//   moveSlide(distance) {
//     this.dist.movePosition = distance;
//     this.slide.style.transform = `translate3d(${distance}px, 0, 0)`;
//   }
//   onEnd() {
//     this.wrapper.removeEventListener("mousemove", this.onMove);
//     this.dist.finalPosition = this.dist.movePosition;
//     console.log(this.dist)
//   }
// }
