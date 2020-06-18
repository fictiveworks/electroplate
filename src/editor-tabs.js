import { LitElement, html } from "lit-element";

class EditorTabs extends LitElement {
  render() {
    return html`
      <div class="editor-tabs">
        <p>Tab 1</p>
        <p>Tab 2</p>
      </div>
    `;
  }
}

window.customElements.define("editor-tabs", EditorTabs);

export default EditorTabs;
