const url = 'https://randomuser.me/api';
const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMillionairesBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateWealthBtn = document.querySelector('#calculate-wealth');

let data = [];

// fetch random user and add money

getRandomUser();

async function getRandomUser() {
  const res = await fetch(url);
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Double money for all users with map();

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// sort by richest with sort()
function sortByRichest() {
  data.sort((a, b) => b.money - a.money); //a.money and b.money because we sort by object value
  updateDOM();
}

//show only millionaires

function showMillionaires() {
  data = data.filter((item) => {
    return item.money >= 1000000;
  });
  updateDOM();
}

// Calculate total wealth

function CalcTotalWealth() {
  total = data.reduce((acc, num) => (acc += num.money), 0);
  console.log(formatMoney(total));
  const wealth = document.createElement('div');
  wealth.innerHTML = `<h3> Total wealth is: <strong>${formatMoney(
    total
  )}</strong> </h3>`;
  main.appendChild(wealth);
}

//Add new object to data arr

function addData(object) {
  data.push(object);
  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong>  ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
}

//Event listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', CalcTotalWealth);
