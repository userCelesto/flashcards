const cards = document.querySelectorAll(".card_inner");
const pens = document.querySelectorAll(".fa-pen");
const saves = document.querySelectorAll(".fa-floppy-disk");
const infos = document.querySelectorAll(".text-info");
const titles = document.querySelectorAll(".h2");
const arrowBtns = document.querySelectorAll(".arrow-btn");
const carousel = document.querySelector(".carousel");
const cardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildren = [...carousel.children];
const lastCard = carouselChildren.slice(-1)[0];
const firstCard = carouselChildren.slice(0, 1)[0];

let isDragging = false,
  startX,
  startScrollLeft;

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (carousel.scrollLeft <= 30) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft =
      carousel.scrollWidth - 2 * (carousel.offsetWidth - 30);
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) >=
    carousel.scrollWidth - carousel.offsetWidth - 30
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth - 30;
    carousel.classList.remove("no-transition");
  }
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

cards.forEach((card, cardIndex) => {
  card.addEventListener("click", () => {
    if (!infos[cardIndex].classList.contains("edit-on")) {
      card.classList.toggle("is-flipped");
    }
  });
});

pens.forEach((pen, penIndex) => {
  pen.addEventListener("click", () => {
    titles[penIndex].removeAttribute("readonly");
    infos[penIndex].removeAttribute("readonly");
    titles[penIndex].select();
    infos[penIndex].classList.add("edit-on");
    pen.style.display = "none";
    saves[penIndex].style.display = "block";
  });
});

saves.forEach((save, saveIndex) => {
  save.addEventListener("click", () => {
    infos[saveIndex].setAttribute("readonly", "true");
    titles[saveIndex].setAttribute("readonly", "true");
    pens[saveIndex].style.display = "block";
    save.style.display = "none";
    infos[saveIndex].classList.remove("edit-on");
    cards[saveIndex].classList.remove("is-flipped");
    infos[saveIndex].setSelectionRange(0, 0);
    infos[saveIndex].focus();
  });
});

carousel.insertAdjacentHTML("afterbegin", lastCard.outerHTML);
carousel.insertAdjacentHTML("beforeend", firstCard.outerHTML);

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -cardWidth : cardWidth;
    infos.forEach((info, infoIndex) => {
      info.classList.remove("edit-on");
      info.setAttribute("readonly", "true");
      titles[infoIndex].setAttribute("readonly", "true");
    });
    cards.forEach((card) => {
      card.classList.remove("is-flipped");
    });
    pens.forEach((pen) => {
      pen.style.display = "block";
    });
    saves.forEach((save) => {
      save.style.display = "none";
    });
  });
});

const dropdown = document.querySelector(".dropdown");
const select = document.querySelector(".select");
const caret = document.querySelector(".caret");
const menu = document.querySelector(".menu");
const options = document.querySelectorAll(".menu li");
const selected = document.querySelector(".selected");
const root = document.querySelector(":root");

select.addEventListener("click", () => {
  select.classList.toggle("select-clicked");
  caret.classList.toggle("caret-rotate");
  menu.classList.toggle("menu-open");
});

options.forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerHTML = option.innerHTML;
    select.classList.remove("select-clicked");
    caret.classList.remove("caret-rotate");
    menu.classList.remove("menu-open");
    options.forEach((option) => {
      option.classList.remove("active");
    });
    option.classList.add("active");

    color = option.innerText.split("-");
    root.style.setProperty("--primary", color[0]);
    root.style.setProperty("--secondary", color[1]);
  });
});
