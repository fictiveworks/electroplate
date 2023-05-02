// import iro from "@jaames/iro";

// const colors = {
//   dark: {
//     background: "#111",
//     surface: "#222"
//   },
//   light: {
//     background: "#efefef",
//     surface: "#efefef"
//   }
// }

// const colorPicker = iro.ColorPicker("#color-picker");

// colorPicker.on('color:change', function(color) {
//   console.log(color.hexString);
// });

function updateThemeToken(ev) {
  const mode = ev.target.dataset.tokenScheme;
  const tokenName = `--${ev.target.id}`;
  const scope = (mode == "light") ? document.documentElement : document.querySelector("[data-color-scheme=dark]");
  scope.style.setProperty(tokenName, ev.target.value);
  ev.target.style.backgroundColor = ev.target.value;
}

function getThemeToken(field) {
  const mode = field.dataset.tokenScheme;
  const name = `--${field.id}`;
  const scope = (mode == "light") ? document.documentElement : document.querySelector("[data-color-scheme=dark]");
  const value = getComputedStyle(scope).getPropertyValue(name);
  return { mode, name, value };
}

function initializeThemeToken(field) {
  const token = getThemeToken(field);
  field.value = token.value;
  field.style.backgroundColor = token.value;
}

const tokens = document.querySelectorAll("input[data-token-scheme]");
const exportButton = document.querySelector("#export");

for (const token of tokens) {
  initializeThemeToken(token);
  token.addEventListener("change", updateThemeToken);
}

exportButton.addEventListener("click", () => {
  const theme = {
    light: {},
    dark: {}
  }

  for (const token of tokens) {
    const property = getThemeToken(token);
    theme[property.mode][property.name] = property.value.trim();
  }

  console.log(theme);
});