const countriesRow = document.querySelector("#countries-row .row__container");
const count = document.querySelector(".count span");
const pagination = document.querySelector(".pagination ul");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector(".filter select");

let search = "";
let activePage = 1;
let type = "all";

function getCountryCard({ flags, name, population, region, capital }) {
  return `
    <div class="card" onClick="getCountryDetail('${name.common}')">
      <div class="top">
        <img src="${flags.png}" alt="img" />
      </div>
      <div class="body">
        <div class="name">
          <h1>${name.common}</h1> 
        </div>
        <div class="content">
          <p>Population: <span>${population}</span></p>
          <p>Region: <span>${region}</span></p>
          <p>Capital: <span>${capital}</span></p>
        </div>
      </div>
    </div>
  `;
}

function getAllCountries() {
  async function getApi() {
    try {
      countriesRow.innerHTML = "...Loading";
      let countries = await getData(
        `https://ap-countries-api.vercel.app/all?page=${activePage}&limit=20`
      );

      countriesRow.innerHTML = "";
      let convertedArr = Object.entries(countries);
      let pages = Math.ceil(countries.total / 20);

      convertedArr[0][1].map((el) => {
        countriesRow.innerHTML += getCountryCard(el);
      });

      pagination.innerHTML = "";

      pagination.innerHTML += `<li><button ${
        activePage === 1 ? "disabled" : ""
      } onClick="getPage('-')" class="prev">Prev</button></li>`;
      for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `<li><button class="${
          activePage === i ? "active" : ""
        }" onClick="getPage(${i})">${i}</button></li>`;
      }
      pagination.innerHTML += `<li><button ${
        activePage === 25 ? "disabled" : ""
      } onClick="getPage('+')" class="next">Next</button></li>`;

      count.textContent = `Total countries: ${countries.total}`;
    } catch (err) {
      console.log(err);
    } finally {
      console.log("working");
    }
  }
  getApi();
}
getAllCountries();

function searchCountry() {
  async function getApi() {
    try {
      countriesRow.innerHTML = `...Loading`;
      let foundCountry = await getData(
        `https://ap-countries-api.vercel.app/name/${search}?page=${activePage}&limit=20`
      );
      const convertedArr = Object.entries(foundCountry);
      const pages = Math.ceil(foundCountry.total / 20) / 2;
      pagination.innerHTML = "";

      if (pages > 1) {
        pagination.innerHTML += `<li><button ${
          activePage === 1 ? "disabled" : ""
        } onClick="getSearchedPage('-')" class="prev">Prev</button></li>`;

        for (let i = 1; i <= pages; i++) {
          pagination.innerHTML += `<li><button onClick="getSearchedPage(${i})" class="${
            activePage === i ? "active" : ""
          }">${i}</button></li>`;
        }

        pagination.innerHTML += `<li><button ${
          pages === activePage ? "disabled" : ""
        } onClick="getSearchedPage('+')" class="next">Next</button></li>`;
      } else {
        pagination.innerHTML = "";
      }

      count.textContent = `Total found countries:  ${foundCountry.total}`;
      countriesRow.innerHTML = "";
      convertedArr[0][1].map((el) => {
        countriesRow.innerHTML += getCountryCard(el);
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log("working");
    }
  }
  getApi();
}

function filterRegion() {
  async function getApi() {
    try {
      countriesRow.innerHTML = "...Loading";
      let region = await getData(
        `https://ap-countries-api.vercel.app/region/${type}?page=${activePage}&limit=20`
      );
      const convertedArr = Object.entries(region);
      let pages = Math.ceil(region.total / 20);

      pagination.innerHTML = "";

      pagination.innerHTML += `<li><button ${
        activePage === 1 ? "disabled" : ""
      } onClick="getFilteredPage('-')" class="prev">Prev</button></li>`;
      for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `<li><button class="${
          activePage === i ? "active" : ""
        }" onClick="getFilteredPage(${i})">${i}</button></li>`;
      }
      pagination.innerHTML += `<li><button ${
        activePage === pages ? "disabled" : ""
      } onClick="getFilteredPage('+')" class="next">Next</button></li>`;

      countriesRow.innerHTML = "";
      count.textContent = `Total countries in ${type}: ${region.total}`;
      convertedArr[0][1].map((el) => {
        countriesRow.innerHTML += getCountryCard(el);
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log("working");
    }
  }
  getApi();
}

function getPage(i) {
  if (i === "+") {
    activePage++;
  } else if (i === "-") {
    activePage--;
  } else {
    activePage = i;
  }
  getAllCountries();
}

function getSearchedPage(i) {
  if (i === "+") {
    activePage++;
  } else if (i === "-") {
    activePage--;
  } else {
    activePage = i;
  }
  searchCountry();
}

function getFilteredPage(i) {
  if (i === "+") {
    activePage++;
  } else if (i === "-") {
    activePage--;
  } else {
    activePage = i;
  }
  filterRegion();
}

searchInput.addEventListener("keyup", function () {
  search = this.value;
  if (search == "") {
    getAllCountries();
  } else {
    // filterSelect.value = "all";
    searchCountry();
  }

  activePage = 1;
});

filterSelect.addEventListener("change", function () {
  type = this.value;
  activePage = 1;
  if (type == "all") {
    getAllCountries();
  } else {
    filterRegion();
  }
});

function getCountryDetail(name) {
  localStorage.setItem("name", name);
  window.location.href = "/country-detail.html";
}
