const a="http://localhost:3000/cards/truoc.png";
const b="http://localhost:3000/cards/sau.png";
const c="http://localhost:3000/cards/truoc_1.png";
const d="http://localhost:3000/cards/sau_1.png";
const e="http://localhost:3000/cards/truoc_2.png";
const f="http://localhost:3000/cards/sau_2.png";
const g="http://localhost:3000/cards/truoc_3.png";
const h="http://localhost:3000/cards/sau_3.png";
let image=`[{image:${a},imageSau:${b}},{image:${c},imageSau:${d}},{image:${e},imageSau:${f}},{image:${g},imageSau:${h}}]`;

console.log(JSON.parse(image));