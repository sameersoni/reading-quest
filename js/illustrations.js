/* ============================================================
   illustrations.js
   A small hand-built SVG "sprite kit" (sun, hills, trees, animals,
   water, stars, buildings...) that story scenes are composed from.
   Everything renders inline as SVG so the app works fully offline
   as a PWA — no network image requests, ever.

   Each scene function returns a full <svg> markup string sized on
   a 400x300 canvas. Keep shapes simple + chunky (flat, friendly,
   readable at small sizes for a 7-year-old).
   ============================================================ */

const VB = '0 0 400 300';

function svgWrap(inner, bg) {
  return `<svg viewBox="${VB}" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
    <rect width="400" height="300" fill="${bg}"/>
    ${inner}
  </svg>`;
}

function sun(cx, cy, r, color) {
  let rays = '';
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * (r + 6);
    const y1 = cy + Math.sin(a) * (r + 6);
    const x2 = cx + Math.cos(a) * (r + 20);
    const y2 = cy + Math.sin(a) * (r + 20);
    rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`;
  }
  return `<g>${rays}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/></g>`;
}

function cloud(cx, cy, scale, color, opacity = 1) {
  return `<g transform="translate(${cx} ${cy}) scale(${scale})" opacity="${opacity}">
    <ellipse cx="0" cy="0" rx="30" ry="16" fill="${color}"/>
    <ellipse cx="-20" cy="6" rx="18" ry="12" fill="${color}"/>
    <ellipse cx="20" cy="6" rx="20" ry="13" fill="${color}"/>
  </g>`;
}

function hill(cy, height, color) {
  return `<path d="M0 ${cy} Q200 ${cy - height} 400 ${cy} L400 300 L0 300 Z" fill="${color}"/>`;
}

function tree(cx, cy, scale, trunk, leaf) {
  return `<g transform="translate(${cx} ${cy}) scale(${scale})">
    <rect x="-6" y="0" width="12" height="34" rx="4" fill="${trunk}"/>
    <circle cx="0" cy="-18" r="26" fill="${leaf}"/>
    <circle cx="-18" cy="-4" r="18" fill="${leaf}"/>
    <circle cx="18" cy="-4" r="18" fill="${leaf}"/>
  </g>`;
}

function pineTree(cx, cy, scale, trunk, leaf) {
  return `<g transform="translate(${cx} ${cy}) scale(${scale})">
    <rect x="-5" y="0" width="10" height="20" fill="${trunk}"/>
    <polygon points="0,-70 -30,-10 30,-10" fill="${leaf}"/>
    <polygon points="0,-50 -24,0 24,0" fill="${leaf}"/>
  </g>`;
}

function star(cx, cy, r, color, opacity = 1) {
  let pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * (Math.PI / 5);
    const rad = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${color}" opacity="${opacity}"/>`;
}

function bird(cx, cy, scale, color) {
  return `<path transform="translate(${cx} ${cy}) scale(${scale})" d="M-10 0 Q-4 -8 0 0 Q4 -8 10 0" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
}

function simpleAnimal(kind, cx, cy, scale, palette) {
  const g = (body) => `<g transform="translate(${cx} ${cy}) scale(${scale})">${body}</g>`;
  switch (kind) {
    case 'rabbit':
      return g(`
        <ellipse cx="0" cy="14" rx="20" ry="16" fill="${palette.body}"/>
        <circle cx="0" cy="-8" r="14" fill="${palette.body}"/>
        <ellipse cx="-6" cy="-26" rx="4" ry="14" fill="${palette.body}"/>
        <ellipse cx="6" cy="-26" rx="4" ry="14" fill="${palette.body}"/>
        <ellipse cx="-6" cy="-26" rx="2" ry="9" fill="${palette.accent}"/>
        <ellipse cx="6" cy="-26" rx="2" ry="9" fill="${palette.accent}"/>
        <circle cx="-5" cy="-9" r="2" fill="#3B2A3A"/>
        <circle cx="5" cy="-9" r="2" fill="#3B2A3A"/>
        <ellipse cx="0" cy="-2" rx="3" ry="2" fill="${palette.accent}"/>
        <circle cx="14" cy="20" r="6" fill="#fff"/>
      `);
    case 'fox':
      return g(`
        <ellipse cx="0" cy="12" rx="22" ry="15" fill="${palette.body}"/>
        <circle cx="0" cy="-10" r="15" fill="${palette.body}"/>
        <polygon points="-14,-20 -22,-38 -6,-24" fill="${palette.body}"/>
        <polygon points="14,-20 22,-38 6,-24" fill="${palette.body}"/>
        <polygon points="20,10 40,16 22,22" fill="${palette.body}"/>
        <circle cx="-5" cy="-10" r="2" fill="#3B2A3A"/>
        <circle cx="5" cy="-10" r="2" fill="#3B2A3A"/>
        <ellipse cx="0" cy="-2" rx="3" ry="2" fill="#3B2A3A"/>
        <ellipse cx="0" cy="-6" rx="9" ry="6" fill="#fff"/>
      `);
    case 'owl':
      return g(`
        <ellipse cx="0" cy="4" rx="20" ry="24" fill="${palette.body}"/>
        <circle cx="-8" cy="-10" r="9" fill="#fff"/>
        <circle cx="8" cy="-10" r="9" fill="#fff"/>
        <circle cx="-8" cy="-10" r="4" fill="#3B2A3A"/>
        <circle cx="8" cy="-10" r="4" fill="#3B2A3A"/>
        <polygon points="0,-4 -4,4 4,4" fill="${palette.accent}"/>
        <polygon points="-10,-22 -4,-14 -16,-16" fill="${palette.body}"/>
        <polygon points="10,-22 4,-14 16,-16" fill="${palette.body}"/>
      `);
    case 'elephant':
      return g(`
        <ellipse cx="0" cy="10" rx="30" ry="20" fill="${palette.body}"/>
        <circle cx="-22" cy="-8" r="16" fill="${palette.body}"/>
        <path d="M-30 0 Q-38 20 -28 30" stroke="${palette.body}" stroke-width="9" fill="none" stroke-linecap="round"/>
        <ellipse cx="-30" cy="-14" rx="12" ry="16" fill="${palette.accent}"/>
        <circle cx="-26" cy="-10" r="2" fill="#3B2A3A"/>
      `);
    case 'monkey':
      return g(`
        <ellipse cx="0" cy="16" rx="18" ry="14" fill="${palette.body}"/>
        <circle cx="0" cy="-8" r="16" fill="${palette.body}"/>
        <circle cx="0" cy="-6" r="10" fill="${palette.accent}"/>
        <circle cx="-14" cy="-14" r="7" fill="${palette.body}"/>
        <circle cx="14" cy="-14" r="7" fill="${palette.body}"/>
        <circle cx="-5" cy="-8" r="2" fill="#3B2A3A"/>
        <circle cx="5" cy="-8" r="2" fill="#3B2A3A"/>
        <path d="M20 18 Q40 10 34 -6" stroke="${palette.body}" stroke-width="7" fill="none" stroke-linecap="round"/>
      `);
    case 'duck':
      return g(`
        <ellipse cx="0" cy="14" rx="20" ry="14" fill="${palette.body}"/>
        <circle cx="10" cy="-8" r="12" fill="${palette.body}"/>
        <ellipse cx="20" cy="-6" rx="8" ry="4" fill="${palette.accent}"/>
        <circle cx="12" cy="-10" r="2" fill="#3B2A3A"/>
      `);
    case 'cat':
      return g(`
        <ellipse cx="0" cy="14" rx="18" ry="14" fill="${palette.body}"/>
        <circle cx="0" cy="-8" r="14" fill="${palette.body}"/>
        <polygon points="-12,-18 -18,-32 -4,-22" fill="${palette.body}"/>
        <polygon points="12,-18 18,-32 4,-22" fill="${palette.body}"/>
        <circle cx="-5" cy="-8" r="2" fill="#3B2A3A"/>
        <circle cx="5" cy="-8" r="2" fill="#3B2A3A"/>
        <path d="M20 16 Q36 12 32 -4" stroke="${palette.body}" stroke-width="6" fill="none" stroke-linecap="round"/>
      `);
    case 'squirrel':
      return g(`
        <ellipse cx="0" cy="14" rx="14" ry="12" fill="${palette.body}"/>
        <circle cx="0" cy="-6" r="12" fill="${palette.body}"/>
        <path d="M14 18 Q40 18 30 -16 Q22 -30 10 -18" fill="${palette.body}"/>
        <circle cx="-3" cy="-7" r="2" fill="#3B2A3A"/>
        <circle cx="4" cy="-7" r="2" fill="#3B2A3A"/>
      `);
    case 'dog':
      return g(`
        <ellipse cx="0" cy="14" rx="20" ry="15" fill="${palette.body}"/>
        <circle cx="0" cy="-8" r="15" fill="${palette.body}"/>
        <ellipse cx="-14" cy="-6" rx="6" ry="14" fill="${palette.accent}"/>
        <ellipse cx="14" cy="-6" rx="6" ry="14" fill="${palette.accent}"/>
        <circle cx="-5" cy="-8" r="2" fill="#3B2A3A"/>
        <circle cx="5" cy="-8" r="2" fill="#3B2A3A"/>
        <ellipse cx="0" cy="-1" rx="3" ry="2" fill="#3B2A3A"/>
      `);
    case 'goat':
      return g(`
        <ellipse cx="0" cy="14" rx="20" ry="15" fill="${palette.body}"/>
        <circle cx="0" cy="-8" r="13" fill="${palette.body}"/>
        <path d="M-8 -20 Q-14 -32 -4 -30" stroke="${palette.accent}" stroke-width="5" fill="none"/>
        <path d="M8 -20 Q14 -32 4 -30" stroke="${palette.accent}" stroke-width="5" fill="none"/>
        <circle cx="-5" cy="-8" r="2" fill="#3B2A3A"/>
        <circle cx="5" cy="-8" r="2" fill="#3B2A3A"/>
      `);
    case 'hen':
      return g(`
        <ellipse cx="0" cy="12" rx="18" ry="16" fill="${palette.body}"/>
        <circle cx="0" cy="-12" r="11" fill="${palette.body}"/>
        <polygon points="0,-26 -6,-34 6,-34" fill="${palette.accent}"/>
        <polygon points="14,-10 24,-6 14,-2" fill="${palette.accent}"/>
        <circle cx="3" cy="-13" r="2" fill="#3B2A3A"/>
      `);
    case 'fish':
      return g(`
        <ellipse cx="0" cy="0" rx="22" ry="13" fill="${palette.body}"/>
        <polygon points="20,0 36,-12 36,12" fill="${palette.accent}"/>
        <circle cx="-10" cy="-2" r="2" fill="#3B2A3A"/>
      `);
    case 'turtle':
      return g(`
        <ellipse cx="0" cy="6" rx="22" ry="16" fill="${palette.accent}"/>
        <circle cx="20" cy="4" r="9" fill="${palette.body}"/>
        <ellipse cx="-14" cy="16" rx="6" ry="4" fill="${palette.body}"/>
        <ellipse cx="14" cy="18" rx="6" ry="4" fill="${palette.body}"/>
        <circle cx="23" cy="2" r="1.6" fill="#3B2A3A"/>
      `);
    default:
      return g('');
  }
}

function houseRow(colors) {
  let out = '';
  const w = 400 / colors.length;
  colors.forEach((c, i) => {
    const x = i * w + w / 2;
    out += `<g transform="translate(${x} 210)">
      <rect x="-32" y="0" width="64" height="52" fill="${c.wall}"/>
      <polygon points="-38,0 0,-32 38,0" fill="${c.roof}"/>
      <rect x="-10" y="18" width="20" height="34" fill="${c.door}"/>
      <rect x="-24" y="10" width="12" height="12" fill="#FFF9EC"/>
      <rect x="12" y="10" width="12" height="12" fill="#FFF9EC"/>
    </g>`;
  });
  return out;
}

function waterBand(cy, color) {
  return `<path d="M0 ${cy} Q50 ${cy - 10} 100 ${cy} T200 ${cy} T300 ${cy} T400 ${cy} V300 H0 Z" fill="${color}"/>`;
}

function rocket(cx, cy, scale) {
  return `<g transform="translate(${cx} ${cy}) scale(${scale})">
    <rect x="-14" y="-40" width="28" height="60" rx="14" fill="#F2795B"/>
    <polygon points="0,-58 -14,-40 14,-40" fill="#6FB7DE"/>
    <circle cx="0" cy="-20" r="8" fill="#FBF3E7"/>
    <polygon points="-14,10 -26,30 -14,26" fill="#F4B740"/>
    <polygon points="14,10 26,30 14,26" fill="#F4B740"/>
    <polygon points="-6,20 0,40 6,20" fill="#F4B740"/>
  </g>`;
}

function planet(cx, cy, r, color, ring) {
  let g = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`;
  if (ring) g += `<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.7}" ry="${r * 0.45}" fill="none" stroke="${ring}" stroke-width="4"/>`;
  return g;
}

/* ---- scene builders, keyed by story ---- */
const scenes = {
  // Level 1
  rani_rabbit_garden: () => svgWrap(`
    ${sun(340, 46, 26, '#F4B740')}
    ${hill(180, 60, '#DCEEE1')}
    ${hill(210, 40, '#BFE0CC')}
    ${tree(60, 210, 1.1, '#8B5E3C', '#4F9A6B')}
    ${tree(350, 200, 0.9, '#8B5E3C', '#5CAE7B')}
    ${simpleAnimal('rabbit', 190, 220, 1.3, { body: '#FFFFFF', accent: '#F2AFA0' })}
    ${star(100, 60, 8, '#F4B740', 0.8)}
    ${star(140, 40, 5, '#F4B740', 0.6)}
  `, '#E3F2FA'),

  milo_kitten_box: () => svgWrap(`
    ${cloud(70, 44, 1, '#FFFFFF')}
    ${cloud(300, 60, 1.3, '#FFFFFF')}
    <rect x="130" y="160" width="150" height="90" rx="6" fill="#C88F1F"/>
    <rect x="130" y="160" width="150" height="16" fill="#E3A94A"/>
    ${simpleAnimal('cat', 205, 180, 1.4, { body: '#F2795B' })}
    ${hill(260, 30, '#DCEEE1')}
  `, '#FBF3E7'),

  duck_pond_race: () => svgWrap(`
    ${sun(60, 50, 24, '#F4B740')}
    ${waterBand(190, '#6FB7DE')}
    ${waterBand(210, '#5AA6CC')}
    ${simpleAnimal('duck', 130, 190, 1.2, { body: '#F4B740', accent: '#D45E42' })}
    ${simpleAnimal('duck', 220, 205, 1, { body: '#FFFFFF', accent: '#F4B740' })}
    ${simpleAnimal('duck', 300, 190, 1.1, { body: '#F2795B', accent: '#C88F1F' })}
    ${cloud(320, 50, 0.8, '#FFFFFF')}
  `, '#E3F2FA'),

  goat_hill_song: () => svgWrap(`
    ${sun(330, 50, 24, '#F4B740')}
    ${hill(150, 80, '#BFE0CC')}
    ${hill(200, 60, '#DCEEE1')}
    ${simpleAnimal('goat', 200, 220, 1.3, { body: '#FFFFFF', accent: '#3B2A3A' })}
    ${pineTree(70, 220, 0.9, '#8B5E3C', '#386E4C')}
    ${pineTree(330, 230, 0.7, '#8B5E3C', '#4F9A6B')}
  `, '#E3F2FA'),

  hen_lost_egg: () => svgWrap(`
    ${sun(340, 44, 22, '#F4B740')}
    ${hill(200, 50, '#DCEEE1')}
    <rect x="40" y="190" width="90" height="60" rx="8" fill="#F4B740"/>
    <polygon points="30,190 85,150 140,190" fill="#D45E42"/>
    ${simpleAnimal('hen', 230, 220, 1.2, { body: '#FBF3E7', accent: '#F2795B' })}
    <ellipse cx="290" cy="245" rx="14" ry="18" fill="#FFF9EC" stroke="#E7D9C4" stroke-width="2"/>
  `, '#FBF3E7'),

  // Level 2
  ravi_market_day: () => svgWrap(`
    ${sun(40, 44, 20, '#F4B740')}
    ${houseRow([
      { wall: '#F2795B', roof: '#C4573D', door: '#3B2A3A' },
      { wall: '#6FB7DE', roof: '#4A8BAE', door: '#3B2A3A' },
      { wall: '#F4B740', roof: '#C88F1F', door: '#3B2A3A' },
    ])}
    <rect x="150" y="230" width="100" height="10" fill="#E7D9C4"/>
    <rect x="170" y="200" width="60" height="30" fill="#4F9A6B"/>
    <circle cx="185" cy="200" r="8" fill="#F2795B"/>
    <circle cx="200" cy="200" r="8" fill="#F4B740"/>
    <circle cx="215" cy="200" r="8" fill="#D45E42"/>
  `, '#FBF3E7'),

  squirrel_winter_store: () => svgWrap(`
    ${cloud(80, 44, 1, '#E3F2FA')}
    ${cloud(320, 60, 1.2, '#FFFFFF')}
    ${tree(200, 220, 1.6, '#8B5E3C', '#5CAE7B')}
    ${simpleAnimal('squirrel', 130, 200, 1.2, { body: '#C88F1F' })}
    <ellipse cx="260" cy="240" rx="10" ry="8" fill="#8B5E3C"/>
    <ellipse cx="280" cy="245" rx="10" ry="8" fill="#8B5E3C"/>
  `, '#DCEEE1'),

  monkey_mango_share: () => svgWrap(`
    ${sun(350, 40, 22, '#F4B740')}
    ${tree(120, 220, 1.5, '#8B5E3C', '#4F9A6B')}
    ${tree(300, 230, 1.1, '#8B5E3C', '#5CAE7B')}
    ${simpleAnimal('monkey', 180, 190, 1.2, { body: '#C88F1F', accent: '#FBF3E7' })}
    <circle cx="230" cy="210" r="12" fill="#F4B740"/>
    <circle cx="250" cy="225" r="12" fill="#D45E42"/>
  `, '#FBF3E7'),

  fox_clever_plan: () => svgWrap(`
    ${sun(340, 50, 22, '#F4B740')}
    ${hill(190, 50, '#DCEEE1')}
    ${pineTree(60, 220, 1, '#8B5E3C', '#386E4C')}
    ${pineTree(340, 220, 0.8, '#8B5E3C', '#4F9A6B')}
    ${simpleAnimal('fox', 200, 210, 1.3, { body: '#F2795B' })}
  `, '#E3F2FA'),

  turtle_race_lesson: () => svgWrap(`
    ${sun(50, 46, 22, '#F4B740')}
    ${hill(220, 40, '#DCEEE1')}
    ${simpleAnimal('turtle', 150, 230, 1.2, { body: '#4F9A6B', accent: '#5CAE7B' })}
    ${simpleAnimal('rabbit', 280, 220, 1.1, { body: '#FFFFFF', accent: '#F2AFA0' })}
    <rect x="360" y="150" width="6" height="100" fill="#8B5E3C"/>
    <polygon points="366,150 400,160 366,170" fill="#F2795B"/>
  `, '#E3F2FA'),

  // Level 3
  starlit_camping: () => svgWrap(`
    <rect width="400" height="300" fill="#2E2545"/>
    ${star(40, 40, 4, '#FFF9EC')}${star(90, 70, 3, '#FFF9EC')}${star(150, 30, 5, '#F4B740')}
    ${star(220, 60, 3, '#FFF9EC')}${star(280, 34, 4, '#FFF9EC')}${star(340, 70, 5, '#F4B740')}
    ${star(370, 120, 3, '#FFF9EC')}${star(20, 110, 3, '#FFF9EC')}
    <circle cx="330" cy="50" r="26" fill="#FBF3E7"/>
    ${hill(220, 40, '#1F1A36')}
    <polygon points="150,240 200,160 250,240" fill="#F2795B"/>
    <polygon points="180,240 200,190 220,240" fill="#D45E42"/>
    <circle cx="90" cy="220" r="18" fill="#F4B740" opacity="0.85"/>
  `, '#2E2545'),

  space_explorers: () => svgWrap(`
    <rect width="400" height="300" fill="#1B1533"/>
    ${star(30, 30, 3, '#FFF9EC')}${star(80, 90, 2.5, '#FFF9EC')}${star(360, 40, 3, '#FFF9EC')}
    ${star(320, 110, 2, '#FFF9EC')}${star(200, 20, 3, '#F4B740')}${star(60, 200, 2.5, '#FFF9EC')}
    ${planet(320, 220, 34, '#F2795B', '#F4B740')}
    ${planet(70, 90, 16, '#6FB7DE', null)}
    ${rocket(180, 190, 1.1)}
  `, '#1B1533'),

  garden_of_kindness: () => svgWrap(`
    ${sun(340, 44, 24, '#F4B740')}
    ${hill(190, 55, '#DCEEE1')}
    ${tree(70, 210, 1, '#8B5E3C', '#4F9A6B')}
    ${tree(330, 220, 0.85, '#8B5E3C', '#5CAE7B')}
    <circle cx="150" cy="230" r="14" fill="#F2795B"/>
    <circle cx="180" cy="238" r="10" fill="#F4B740"/>
    <circle cx="210" cy="228" r="12" fill="#6FB7DE"/>
    <circle cx="240" cy="240" r="9" fill="#D45E42"/>
  `, '#E3F2FA'),

  elephant_river_help: () => svgWrap(`
    ${sun(350, 40, 22, '#F4B740')}
    ${waterBand(200, '#6FB7DE')}
    ${waterBand(220, '#4A8BAE')}
    ${simpleAnimal('elephant', 170, 190, 1.4, { body: '#9BA9B5', accent: '#E9CBB0' })}
    ${simpleAnimal('fish', 280, 230, 1, { body: '#F4B740', accent: '#D45E42' })}
    ${simpleAnimal('fish', 310, 250, 0.8, { body: '#6FB7DE', accent: '#4A8BAE' })}
  `, '#E3F2FA'),

  owl_night_school: () => svgWrap(`
    <rect width="400" height="300" fill="#231C3C"/>
    ${star(50, 40, 3, '#FFF9EC')}${star(320, 30, 4, '#F4B740')}${star(360, 90, 2.5, '#FFF9EC')}
    <circle cx="80" cy="60" r="24" fill="#FBF3E7"/>
    ${pineTree(300, 240, 1.2, '#3B2A3A', '#1F3A2A')}
    ${pineTree(340, 250, 0.9, '#3B2A3A', '#264A34')}
    ${simpleAnimal('owl', 170, 200, 1.5, { body: '#C88F1F', accent: '#F4B740' })}
  `, '#231C3C'),

  dog_new_friend: () => svgWrap(`
    ${sun(40, 44, 22, '#F4B740')}
    ${hill(200, 46, '#DCEEE1')}
    ${simpleAnimal('dog', 150, 220, 1.3, { body: '#C88F1F', accent: '#8B5E3C' })}
    ${simpleAnimal('cat', 260, 225, 1.1, { body: '#3B2A3A' })}
    ${cloud(300, 50, 1, '#FFFFFF')}
  `, '#E3F2FA'),
};

function getStoryArt(key) {
  return scenes[key] ? scenes[key]() : svgWrap(`${sun(200,150,40,'#F4B740')}`, '#E3F2FA');
}

/* small inline icon set used across the UI (stars, badges, nav) */
const Icon = {
  star: (filled = true, color = '#F4B740') => `<svg viewBox="0 0 24 24" fill="${filled ? color : 'none'}" stroke="${color}" stroke-width="1.6"><path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.8 1.5 6.9L12 17.9l-6.1 3.4 1.5-6.9-5.2-4.8 6.9-.7L12 2.5z" stroke-linejoin="round"/></svg>`,
  book: (color = '#4F9A6B') => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5c-.8 0-1.5-.7-1.5-1.5v-13z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5v-13z"/></svg>`,
  home: (color = '#3B2A3A') => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9"/></svg>`,
  map: (color = '#3B2A3A') => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3L3 5v16l6-2 6 2 6-2V3l-6 2-6-2z"/><path d="M9 3v16M15 5v16"/></svg>`,
  medal: (color = '#3B2A3A') => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="7"/><path d="M9 8L7 2M15 8l2-6M9 14l2 2 4-4"/></svg>`,
  arrowLeft: (color = '#3B2A3A') => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>`,
  arrowRight: (color = '#fff') => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  lock: (color = '#6E5C6C') => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>`,
  sparkle: (color = '#F4B740') => `<svg viewBox="0 0 24 24" fill="${color}"><path d="M12 2l1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2z"/><path d="M19 15l.8 2.4L22 18l-2.2.6L19 21l-.8-2.4L16 18l2.2-.6z"/></svg>`,
  check: (color = '#4F9A6B') => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  x: (color = '#F2795B') => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
  parent: (color = '#6E5C6C') => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>`,
  shuffle: (color = '#fff') => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h3.5c2 0 3 1 4.5 3M4 19h3.5c2 0 3-1 4.5-3M16 5h4v4M20 5l-6.5 6.5M16 19h4v-4M20 19l-6.5-6.5"/></svg>`,
  flame: (color = '#F2795B') => `<svg viewBox="0 0 24 24" fill="${color}"><path d="M12 2c1 3-1 4-1 6 0 1.5 1 2 1 2s2-.8 2-3c2 2 3 4 3 7a6 6 0 11-12 0c0-4 2-7 5-9 .5-1 1.5-2 2-3z"/></svg>`,
};

window.ReadingQuestArt = { getStoryArt, Icon };
