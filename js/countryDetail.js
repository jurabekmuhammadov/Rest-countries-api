const countryContainer = document.querySelector(".country-details");
let countryDetails = localStorage.getItem("name");
const languagesHtml = document.querySelector(".languages span");
const bordersHtml = document.querySelector(".borders ul");

function getCountryDetails({
  flags,
  name,
  population,
  region,
  subregion,
  capital,
  borders,
  tld,
  currencies,
}) {
  let currency = Object.entries(currencies);
  return `
      <div class="flag">
          <img src="${flags.png}" alt="" />
      </div>
      <div class="about">
        <h2 class="name">${name.common}</h2>
        <ul class="info">
          <li>
            <p>Official name: <span>${name.official}</span></p>
          </li>
          <li>
            <p>Population: <span>${population}</span></p>
          </li>
          <li>
            <p>Region: <span>${region}</span></p>
          </li>
          <li>
            <p>Sub Region: <span>${subregion}</span></p>
          </li>
          <li>
            <p>Capital: <span>${capital}</span></p>
          </li>
          <li>
            <p>Top Level Domain: <span>${tld}</span></p>
          </li>
          <li>
            <p>Currencies: <span>${currency[0][1].name}</span></p>
          </li>
          <li>
            <p class="languages">Languages: <span>English, Russian</span></p>
          </li>
        </ul>
        <div class="borders">
          <p>Border Countries:</p>
          <ul>
            <li><button>France</button></li>
            <li><button>Germany</button></li>
            <li><button>Russia</button></li>
          </ul>
        </div>
      </div>
  `;
}

async function getCountry() {
  try {
    let country = await getData(
      `https://ap-countries-api.vercel.app/name/${countryDetails}`
    );
    const convertedArr = Object.entries(country);

    convertedArr[0][1].map((el) => {
      countryContainer.innerHTML = getCountryDetails(el);
    });
  } catch (err) {
    console.log(err);
  } finally {
    console.log("working");
  }
}

getCountry();
