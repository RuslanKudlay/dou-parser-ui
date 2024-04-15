export function vacancyTemplate(vacancy, id) {
  const { title, company, description, salary, city, url } = vacancy;
  return `
    <li class="vacancy" data-index=${id}>
        <a class="vacancy-title" href="${url}">${title}</a>
        <p class="vacancy-desc">${description}</p>
        <div class="vacancy-body">
          <p class="vacancy-company"><span>Company: </span>${company}</p>
          <p class="vacancy-salary"><span>Salary: </span>${salary}</p>
          <p class="vacancy-city"><span>City: </span>${city}</p>
          <button class="button">Save</button>
        </div>
      </li>
    `;
}

export function vacanciesTemplate(arr) {
  return arr.map(vacancyTemplate).join("");
}
