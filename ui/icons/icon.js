const ICON_SHEET = "/node_modules/electroplate/ui/icons/sheet.svg";
let ICON_TEMPLATE = null;

const ElIconSvgPaths = {
  "cloud": `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>`,
  "folder": `<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>`,
  "folder-fill": `<path fill="currentColor" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>`,
  "folder-open": `<path d="M2 18H17.5119C18.3952 18 19.1738 17.4207 19.4276 16.5747L21.6138 9.28735C21.8063 8.64574 21.3258 8 20.656 8H20M2 18C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H7L9 3H18C18.5304 3 19.0391 3.21071 19.4142 3.58579C19.7893 3.96086 20 4.46957 20 5V8M2 18L4.7862 8.71265C4.9131 8.28967 5.30242 8 5.74403 8H20" transform="translate(1 3)" />`,
  "file": `<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>`,
  "file-text": `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>`,
  "book": `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>`,
  "book-open": `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>`
}

class ElIcon extends HTMLElement {
  static get observedAttributes() {
    return ["name", "stroke-width"];
  }

  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    if (!ICON_TEMPLATE) {
      ICON_TEMPLATE = createIconTemplate();
    }

    const clone = ICON_TEMPLATE.content.cloneNode(true);


    this.shadowRoot.appendChild(clone);

    //this.useEl = this.shadowRoot.getElementById('use');
    this.svgImage = this.shadowRoot.querySelector("svg");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    //this.useEl.setAttribute('xlink:href', `${ICON_SHEET}#${newValue}`);
    if (name == "name") {
      this.svgImage.innerHTML = ElIconSvgPaths[newValue];
    } else if (name == "stroke-width") {
      this.svgImage.setAttribute("stroke-width", newValue);
    }
  }
}

function createIconTemplate() {
  const iconTemplate = document.createElement("template");
  const iconEmbed = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const iconUseRef = document.createElement("use");
  const iconStyle = document.createElement("style");

  iconTemplate.setAttribute("id", "icon-template");
  //iconEmbed.setAttribute("viewBox", "0 0 48 48");
  iconEmbed.setAttribute("viewBox", "0 0 24 24");
  iconEmbed.setAttribute("stroke", "currentColor");
  iconEmbed.setAttribute("stroke-width", "1");
  iconEmbed.setAttribute("stroke-linecap", "round");
  iconEmbed.setAttribute("stroke-linejoin", "round");
  //iconUseRef.setAttribute("id", "use");
  //iconUseRef.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", "");
  iconStyle.innerHTML = `:host { display: inline; }
    svg { display: inline-block; width: 1em; height: 1em; fill: transparent; }
    `;
  iconEmbed.appendChild(iconUseRef);
  iconTemplate.content.append(iconStyle);
  iconTemplate.content.append(iconEmbed);
  return iconTemplate;
}

// Finally lets define this custom element
customElements.define('el-icon', ElIcon);
