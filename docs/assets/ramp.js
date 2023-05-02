import chroma from "chroma-js";

const neutralRamp = document.querySelectorAll(".neutral-ramp");

let colors = ["#111111", "#333333", "#555555", "#777777", "#999999", "#bbbbbb", "#dddddd", "#ffffff"]

function drawSwatchPreview() {
  let root = document.documentElement;
  let index = 1;
  for (const colorValue of colors) {
    root.style.setProperty(`--swatch-neutral-${index}`, colorValue);
    index++;
  }
}

function distributeRamp(stop, value) {
  // for index in locked
  let scale = [];

  if (stop == 1) {
    scale.push(value);
  } else {
    scale.push(colors[0]);
    scale.push(value);
  }

  if (stop != 8) {
    scale.push(colors[7]);
  }

  colors = chroma.bezier(scale).scale().colors(8);

  for (const neutralStop of neutralRamp) {
    const stop = neutralStop.dataset.rampStop;
    neutralStop.value = colors[stop - 1];
  }

  drawSwatchPreview();
}

for (const neutralStop of neutralRamp) {
  const stop = neutralStop.dataset.rampStop;
  neutralStop.value = colors[stop - 1];

  neutralStop.addEventListener("change", ev => {
    distributeRamp(stop, ev.target.value);
  });
}

drawSwatchPreview();

