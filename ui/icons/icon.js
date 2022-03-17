const ICON_SHEET = "/node_modules/electroplate/ui/icons/sheet.svg";
let ICON_TEMPLATE = null;

const ElIconSvgPaths = {
  "alt-doc": `<path d="M6 22H18C19.1046 22 20 21.1046 20 20V9.82843C20 9.29799 19.7893 8.78929 19.4142 8.41421L13.5858 2.58579C13.2107 2.21071 12.702 2 12.1716 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22Z" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13 2.5V9H19" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 17H15" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 13H15" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 9H9" stroke-linecap="round" stroke-linejoin="round"></path>`,
  "warning-tri": `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>`,
  "archive": `<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>`,
  "cloud": `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>`,
  "directory": `<path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />`,
  "directory-open": `<path stroke-linecap="round" stroke-linejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />`,
  "folder": `<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>`,
  "folder-fill": `<path fill="currentColor" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>`,
  "folder-open": `<path d="M2 18H17.5119C18.3952 18 19.1738 17.4207 19.4276 16.5747L21.6138 9.28735C21.8063 8.64574 21.3258 8 20.656 8H20M2 18C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H7L9 3H18C18.5304 3 19.0391 3.21071 19.4142 3.58579C19.7893 3.96086 20 4.46957 20 5V8M2 18L4.7862 8.71265C4.9131 8.28967 5.30242 8 5.74403 8H20" transform="translate(1 3)" />`,
  "file": `<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>`,
  "file-text": `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>`,
  "book": `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>`,
  "book-open": `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>`,
  "-maetl-fill--folio-folder": `<path d="M18.1457915,11.1050576 L10.4202303,11.1050576 L8.3151727,9 L3.05252878,9 C2.46311266,9 2,9.46311266 2,10.0525288 L2,21.6303454 C2,22.2197615 2.46311266,22.6828742 3.05252878,22.6828742 L19.1983203,22.6828742 L19.1983203,12.1575863 C19.1983203,11.5681702 18.7141571,11.1050576 18.1457915,11.1050576 Z" fill="currentColor" fill-rule="nonzero"></path>
  <path d="M20.5876583,22.6828742 L3.05252878,22.6828742 C2.46311266,22.6828742 2,22.2197615 2,21.6303454 L2,10.0525288 C2,9.46311266 2.46311266,9 3.05252878,9 L7.72575658,9 C8.10466694,9 8.46252673,9.14735403 8.71513363,9.42101151 L9.99921875,10.6840461 C10.2728762,10.9577035 10.6096854,11.1050576 10.9885958,11.1050576 L18.124741,11.1050576 C18.7141571,11.1050576 19.1772697,11.5681702 19.1772697,12.1575863 L19.1772697,21.2724856 C19.1983203,22.0513569 19.8298376,22.6828742 20.5876583,22.6828742 C21.3665296,22.6828742 21.9980469,22.0513569 21.9980469,21.2724856 L21.9980469,11.1050576" id="Shape" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M21.9980469,11.4202303 L21.9980469,4.05252878 C21.9980469,3.46311266 21.5349342,3 20.9455181,3 L7.26264391,3 L3.05252878,3 C2.46311266,3 2,3.46311266 2,4.05252878 L2,5.10505757 L2,7.42062089" id="Shape" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>`,
  "-maetl-tri--folio-folder": `<path d="M18.1457915,11.1050576 L10.4202303,11.1050576 L8.3151727,9 L3.05252878,9 C2.46311266,9 2,9.46311266 2,10.0525288 L2,21.6303454 C2,22.2197615 2.46311266,22.6828742 3.05252878,22.6828742 L19.1983203,22.6828742 L19.1983203,12.1575863 C19.1983203,11.5681702 18.7141571,11.1050576 18.1457915,11.1050576 Z" id="Shape" fill="#ACFEFF" fill-rule="nonzero"></path>
  <path d="M6,22.0525288 C6,22.6419449 6.46311266,23.1050576 7.05252878,23.1050576 L18.9882052,23.1050576 L18.9882052,21 L7.05252878,21 C6.46311266,21 6,21.4631127 6,22.0525288 Z" id="Shape" fill="#7CCACB" fill-rule="nonzero"></path>
  <path d="M20.5876583,22.6828742 L3.05252878,22.6828742 C2.46311266,22.6828742 2,22.2197615 2,21.6303454 L2,10.0525288 C2,9.46311266 2.46311266,9 3.05252878,9 L7.72575658,9 C8.10466694,9 8.46252673,9.14735403 8.71513363,9.42101151 L9.99921875,10.6840461 C10.2728762,10.9577035 10.6096854,11.1050576 10.9885958,11.1050576 L18.124741,11.1050576 C18.7141571,11.1050576 19.1772697,11.5681702 19.1772697,12.1575863 L19.1772697,21.2724856 C19.1983203,22.0513569 19.8298376,22.6828742 20.5876583,22.6828742 C21.3665296,22.6828742 21.9980469,22.0513569 21.9980469,21.2724856 L21.9980469,11.1050576" id="Shape" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M21.9980469,11.4202303 L21.9980469,4.05252878 C21.9980469,3.46311266 21.5349342,3 20.9455181,3 L7.26264391,3 L3.05252878,3 C2.46311266,3 2,3.46311266 2,4.05252878 L2,5.10505757 L2,7.42062089" id="Shape" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>`
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
