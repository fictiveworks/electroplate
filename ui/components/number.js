/**
 * 
 */
class NumberElement extends HTMLElement {
  static get observedAttributes() {
    // Assumes all observed attributes map to the underlying input[type=number].
    // If this assumption changes, then two separate managed attribute lists should
    // be defined and merged here.
    return ["value", "min", "max", "step"];
  }

  constructor() {
    super();
    this.classList.add("el-control");
    this.input = this.createInput();
    this.stepDown = this.createStepDownButton();
    this.stepUp = this.createStepUpButton();
    this.appendChild(this.stepDown);
    this.appendChild(this.input);
    this.appendChild(this.stepUp);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.input.setAttribute(name, newValue);
  }

  select() {
    this.input.select();
  }

  stepDown() {
    this.input.stepDown();
  }

  stepUp() {
    this.input.stepUp();
  }

  createInput() {
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.classList.add("el-number");
    for (const attrName of NumberElement.observedAttributes) {
      input.setAttribute(attrName, this.getAttribute(attrName));
    }
    return input;
  }

  createStepDownButton(direction) {
    const button = document.createElement("button");
    button.classList.add("el-button");
    button.innerText = "-";
    button.addEventListener("click", () => {
      this.input.stepDown();
      this.input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    return button;
  }

  createStepUpButton(direction) {
    const button = document.createElement("button");
    button.classList.add("el-button");
    button.innerText = "+";
    button.addEventListener("click", () => {
      this.input.stepUp();
      this.input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    return button;
  }
}

customElements.define('el-number', NumberElement);
