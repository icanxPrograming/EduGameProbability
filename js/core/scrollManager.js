export const mapThemes = {
  intro: {
    sky: "assets/images/intro/sky.png",
    clouds: "assets/images/intro/clouds.png",
    mountains: "assets/images/intro/mountains.png",
    ground: "assets/images/intro/ground.png",
    front: "assets/images/intro/front.png",
    imgW: 1920,
    imgH: 1080,
    groundLine: 0.1,
  },
  stage1: {
    // Sample Space
    sky: "assets/images/stage1/sky.png",
    clouds: "assets/images/stage1/clouds.png",
    mountains: null, // Tidak disebutkan di list kamu
    ground: "assets/images/stage1/ground.png",
    front: "assets/images/stage1/front.png",
    imgW: 1920,
    imgH: 1080,
    groundLine: 0.15,
  },
  stage2: {
    // Sample Point
    sky: "assets/images/stage2/sky.png",
    clouds: null,
    mountains: "assets/images/stage2/mountains.png",
    ground: "assets/images/stage2/ground.png",
    front: "assets/images/stage2/front.png",
    imgW: 1920,
    imgH: 1080,
    groundLine: 0.12,
  },
  stage3: {
    // Expected Freq
    sky: "assets/images/stage3/sky.png",
    clouds: "assets/images/stage3/clouds.png",
    mountains: null,
    ground: "assets/images/stage3/ground.png",
    front: null,
    imgW: 1920,
    imgH: 1080,
    groundLine: 0.15,
  },
  ending: {
    sky: "assets/images/ending/1.png",
    clouds: "assets/images/ending/2.png",
    mountains: "assets/images/ending/3.png",
    ground: "assets/images/ending/4.png",
    front: null,
    imgW: 1920,
    imgH: 1080,
    groundLine: 0.1,
  },
};

let activeTheme = "intro";

export function setMapTheme(themeName) {
  const theme = mapThemes[themeName];
  if (!theme) return;

  activeTheme = themeName;

  const layers = ["sky", "clouds", "mountains", "ground", "front"];

  layers.forEach((layer) => {
    const el = document.querySelector(`.${layer}`);
    if (el) {
      if (theme[layer]) {
        el.style.backgroundImage = `url('${theme[layer]}')`;
        el.style.display = "block"; // Tampilkan jika ada datanya
      } else {
        el.style.display = "none"; // Sembunyikan jika null
      }
    }
  });

  adjustPlayerPosition();
}

export function adjustPlayerPosition() {
  const theme = mapThemes[activeTheme];
  if (!theme) return;

  const windowWidth = window.innerWidth;
  const aspectRatio = theme.imgH / theme.imgW;
  const currentImageHeight = windowWidth * aspectRatio;
  const finalBottom = currentImageHeight * theme.groundLine;

  document.documentElement.style.setProperty(
    "--ground-height",
    `${finalBottom}px`,
  );
}
