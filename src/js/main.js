import {
  getVacancies,
  saveItem,
  getWishList,
  getExcelFile,
} from "./parser-api";
import { vacanciesTemplate, vacancyTemplate } from "./render-functions";

const refs = {
  container: document.querySelector(".js-list"),
  wishlist: document.querySelector(".js-wish-list"),
  form: document.querySelector(".js-form"),
  excelForm: document.querySelector(".js-form-excel"),
};

let list = [];
let wishlist = [];
async function init() {
  const data = await getWishList();
  const markup = vacanciesTemplate(data);
  wishlist = data;
  refs.wishlist.innerHTML = markup;
}

init();

refs.form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { elements: elems } = e.target;
  const data = {
    category: elems.category.value || undefined,
    city: elems.city.value || undefined,
    experience: elems.experience.value || undefined,
    keywords: elems.keywords.value || undefined,
    status: elems.status.checked ? "1" : "0",
  };

  const arr = await getVacancies(data);
  const markup = vacanciesTemplate(arr);
  list = arr;
  refs.container.innerHTML = markup;
});

refs.container.addEventListener("click", (e) => {
  if (e.target.nodeName !== "BUTTON") return;
  const elem = e.target.closest("li");
  const id = elem.dataset.index;
  const item = list[id];
  saveItem(item);
  const markup = vacancyTemplate(item);
  refs.wishlist.insertAdjacentHTML("beforeend", markup);
});

refs.excelForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = await getExcelFile();
  const filename = "vacancy.xlsx";
  const url = window.URL.createObjectURL(file);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
});
