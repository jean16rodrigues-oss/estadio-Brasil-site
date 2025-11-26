// conteúdo estável: imagens do Wikimedia (menos chance de quebra)
const stadiums = [
  {
    name: "Maracanã",
    city: "Rio de Janeiro",
    capacity: "78.000 pessoas",
    image: "image/Maracana.jpg"
  },
  {
    name: "Allianz Parque",
    city: "São Paulo",
    capacity: "43.000 pessoas",
    image: "image/allianz.jpg"
  },
  {
    name: "Mineirão",
    city: "Belo Horizonte",
    capacity: "62.000 pessoas",
    image: "image/mineirao.jpg"
  },
  {
    name: "Arena da Baixada",
    city: "Curitiba",
    capacity: "43.000 pessoas",
    image: "image/arena.jpg"
  },
  {
    name: "Castelão",
    city: "Fortaleza",
    capacity: "63.000 pessoas",
    image: "image/castelao.jpg"
  },
  {
    name: "Couto Pereira",
    city: "Curitiba",
    capacity: "40.502 pessoas",
    image: "image/Couto.jpg"
  },
  {
    name: "Vila Belmiro",
    city: "Santos",
    capacity: "16.068 pessoas",
    image: "image/Vila.jpg"
  },
  {
    name: "Beira Rio",
    city: "Porto Alegre",
    capacity: "50.128 pessoas",
    image: "image/beirario.jpg"
  }
];

// fallback SVG embutido (data URI) caso a imagem externa falhe
const PLACEHOLDER_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
     <rect width="100%" height="100%" fill="#e9e9e9"/>
     <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#777">Imagem indisponível</text>
   </svg>`
)}`;

function createCard(stadium){
  const card = document.createElement('article');
  card.className = 'stadium-card';

  const imgContainer = document.createElement('div');
  imgContainer.className = 'stadium-image-container';
  const img = document.createElement('img');
  img.className = 'stadium-image';
  img.alt = stadium.name;
  img.src = stadium.image;

  // fallback quando der erro (por rede/CORS/unsplash etc)
  img.addEventListener('error', () => {
    img.src = PLACEHOLDER_SVG;
  }, { once: true });

  // clique na imagem: abre modal com a imagem grande e legenda
  imgContainer.addEventListener('click', () => openModal(stadium, img.src));

  imgContainer.appendChild(img);
  card.appendChild(imgContainer);

  const h2 = document.createElement('h2');
  h2.textContent = stadium.name;
  card.appendChild(h2);

  const pCity = document.createElement('p');
  pCity.innerHTML = `<strong>Cidade:</strong> ${stadium.city}`;
  card.appendChild(pCity);

  const pCap = document.createElement('p');
  pCap.innerHTML = `<strong>Capacidade:</strong> ${stadium.capacity}`;
  card.appendChild(pCap);

  return card;
}

// render
const stadiumList = document.getElementById('stadium-list');
stadiums.forEach(s => stadiumList.appendChild(createCard(s)));

/* ----- modal simples ----- */
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');

function openModal(stadium, imgSrc){
  modalImg.src = imgSrc || PLACEHOLDER_SVG;
  modalImg.alt = stadium.name;
  modalCaption.textContent = `${stadium.name} — ${stadium.city} • ${stadium.capacity}`;
  modal.setAttribute('aria-hidden','false');
  // lock keyboard focus not implemented (simplicidade)
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modalImg.src = '';
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (ev) => {
  if(ev.key === 'Escape') closeModal();
});
