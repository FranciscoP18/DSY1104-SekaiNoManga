export function cover(n = 1) {
const colors = ['#e2e8f0', '#e0e7ff', '#fee2e2', '#dcfce7', '#fde68a', '#fce7f3'];
const bg = colors[n % colors.length];
const svg = encodeURIComponent(
`<svg xmlns='http://www.w3.org/2000/svg' width='640' height='840'>
<defs>
<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
<stop offset='0%' stop-color='${bg}'/>
<stop offset='100%' stop-color='#ffffff'/>
</linearGradient>
</defs>
<rect width='100%' height='100%' fill='url(#g)'/>
<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#475569' font-size='24' font-family='Inter, Arial'>Manga ${n}</text>
</svg>`
);
return `data:image/svg+xml;charset=utf-8,${svg}`;
}


// util para cargar imágenes reales desde /src/assets/img sin rutas absolutas
export function img(path) {
try {
return new URL(`./assets/img/${path}`, import.meta.url).href;
} catch {
return cover();
}
}