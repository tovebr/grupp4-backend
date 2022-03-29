const title = document.getElementById("title");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const desc = document.getElementById("desc");

const chairDisplay = document.querySelector(".chair-display");

const fetchChair = async () => {
  const response = await fetch("http://localhost:1337/api/chairs");
  const { data } = await response.json();
  printChairs(data);
};

const printChairs = (chairs) => {
  chairs.map((chair) => {
    const chairDiv = document.createElement("div");
    chairDiv.innerHTML = `<div id=${chair.id} ><h3>${chair.attributes.title}</h3><p>${chair.attributes.description}</p></div>`;
    chairDisplay.appendChild(chairDiv);
  });
};

fetchChair();
