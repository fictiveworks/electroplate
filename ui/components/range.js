const HANDLE_GRIP = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>`;

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;

class RangeElement extends HTMLElement {
  static get observedAttributes() {
    return ["value", "min", "max"];
  }

  constructor() {
    super();
    this.classList.add("el-control");
    this.container = this.createWrapper();
    this.track = this.createTrack();
    this.fill = this.createFill();
    this.handle = this.createHandle();
    this.container.appendChild(this.track);
    this.container.appendChild(this.fill);
    this.container.appendChild(this.handle);
    this.appendChild(this.container);
    if (!this.hasAttribute("value")) this.setAttribute("value", this.defaultValue);
  }

  connectedCallback() {
    this.fill.style.width = this.fillWidth;
    this.handle.style.left = this.fillWidth;
  }

  get fillWidth() {
    const value = this.getAttribute("value");
    const toFill = Math.max(0, Math.min((value / this.defaultMax) * 100, 100));
    return `${toFill}%`;
  }

  get defaultValue() {
    return this.defaultMax < this.defaultMin ? this.defaultMin : this.defaultMin + (this.defaultMax - this.defaultMin) / 2;
  }

  get defaultMax() {
    return this.getAttribute("max") || DEFAULT_MAX;
  }

  get defaultMin() {
    return this.getAttribute("min") || DEFAULT_MIN;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    
  }

  createWrapper() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("el-range");
    return wrapper;
  }

  createTrack() {
    const track = document.createElement("div");
    track.classList.add("el-range-track");
    track.addEventListener("click", this.setTrackPosition);
    return track;
  }

  createFill() {
    const fill = document.createElement("div");
    fill.classList.add("el-range-fill");
    return fill;
  }

  createHandle() {
    const handle = document.createElement("button");
    handle.classList.add("el-button");
    handle.innerHTML = HANDLE_GRIP;
    handle.addEventListener("mousedown", this.onDragStart);
    return handle;
  }

  onDragStart = (ev) => {
    this.container.setAttribute("data-grabbing", true);
    this.target = ev.target.closest(".el-button");
    this.currentX = ev.clientX;
    document.addEventListener("mousemove", this.onDragUpdate);
    document.addEventListener("mouseup", this.onDragEnd);
  }

  onDragUpdate = (ev) => {
    const maxLeftPos = this.container.offsetWidth - this.target.offsetWidth;
    const leftPos = Math.max(0, Math.min(this.target.offsetLeft + (ev.clientX - this.currentX), maxLeftPos));
    this.target.style.left = `${leftPos}px`;
    this.fill.style.width = `${leftPos}px`;
    this.currentX = ev.clientX;
  }

  onDragEnd = (ev) => {
    this.container.removeAttribute("data-grabbing");
    document.removeEventListener("mousemove", this.onDragUpdate);
    document.removeEventListener("mouseup", this.onDragEnd);
  }

  setTrackPosition = (ev) => {
    const maxLeftPos = this.container.offsetWidth - this.handle.offsetWidth;
    const trackPos = ev.offsetX - (this.handle.offsetWidth / 2);
    const targetPos = Math.max(0, Math.min(trackPos, maxLeftPos));
    this.handle.style.left = `${targetPos}px`;
    this.fill.style.width = `${targetPos}px`;
  }
}

customElements.define("el-range", RangeElement);