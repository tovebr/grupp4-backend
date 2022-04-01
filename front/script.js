const title = document.getElementById("title");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const desc = document.getElementById("desc");
const addChair = document.getElementById("addChair");
const chairDisplay = document.querySelector(".chair-display");

const fetchChair = async () => {
  const response = await fetch("http://localhost:1337/api/chairs");
  const { data } = await response.json();
  printChairs(data);
};

const printChairs = (chairs) => {
  chairs.map((chair) => {
    const chairDiv = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const updateButton = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    updateButton.innerHTML = "update";
    chairDiv.innerHTML = `<div id=${chair.id} ><h3>${chair.attributes.title}</h3><p>${chair.attributes.description}</p></div>`;
    chairDisplay.appendChild(chairDiv);
    chairDisplay.appendChild(deleteBtn);
    chairDisplay.appendChild(updateButton);
    deleteBtn.addEventListener("click", async () => {
      await fetch("http://localhost:1337/api/chairs/" + chair.id, {
        method: "delete",
      });
      chairDisplay.innerHTML = "";
      fetchChair();
    });
  });
};

fetchChair();

addChair.addEventListener("click", async (e) => {
  await e.preventDefault();
  let obj = {
    data: {
      title: title.value,
      price: price.value,
      qty: quantity.value,
      description: desc.value,
    },
  };
  await fetch("http://localhost:1337/api/chairs", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  chairDisplay.innerHTML = "";
  fetchChair();
});
