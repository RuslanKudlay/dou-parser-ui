import axios from "axios";

export async function getVacancies(params) {
  const url = `http://localhost:8081/vacancies`;
  const res = await axios.get(url, { params });
  return res.data;
}

export async function saveItem(item) {
  const url = `http://localhost:8081/vacancies`;
  const res = await axios.post(url, item);
  return res.data;
}

export async function getWishList() {
  const url = `http://localhost:8081/vacancies/my-list`;
  const res = await axios.get(url);
  return res.data;
}

export async function getExcelFile() {
  const url = `http://localhost:8081/vacancies/save`;
  const res = await axios.get(url, {
    responseType: "blob",
  });

  const blob = new Blob([res.data]);
  return blob;
}
