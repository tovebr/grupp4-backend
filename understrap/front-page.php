<?php
/**
 * Template Name: Front Page Template
 *
 * Description: A page template that provides a key component of WordPress as a CMS
 * by meeting the need for a carefully crafted introductory page. The front page template
 * in Twenty Twelve consists of a page content area for adding text, images, video --
 * anything you'd like -- followed by front-page-only widgets in one or two columns.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
get_header(); ?>
  <form id="form" style="width: 30em; margin: auto;">
  <h3> Add Chair </h3>
  <div class="form-group">
      <input class="form-control form-control-lg" type="text" id="title" placeholder="Title" /><br />
      <input class="form-control form-control-lg" type="number" id="price" placeholder="Price" /><br />
      <input
      class="form-control form-control-lg"
        type="number"
        id="quantity"
        placeholder="Quantity in stock"
      /><br />
      <textarea
      class="form-control form-control-lg"
        id="desc"
        placeholder="Write a description here..."
        rows="5"
        cols="30"
      ></textarea
      ><br />
      <button class="btn btn-primary" id="addChair" type="submit" form="form" value="Submit">
      Submit Data
    </button>
</div>
    </form>
    <div class="chair-display" style="width: 30em; margin: auto;"></div>

 </div>
<script>
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
    const editButton = document.createElement("button");
    chairDiv.classList.add("chair", "card", "card-body");
    deleteBtn.classList.add("btn", "text-muted")
    editButton.classList.add("btn")
    deleteBtn.innerHTML = "delete";
    editButton.innerHTML = "edit";
    chairDiv.innerHTML = `<div id=${chair.id} ><h3 class="card-title">${chair.attributes.title}</h3><p class="card-text">Price: ${chair.attributes.price} SEK</p><p>${chair.attributes.description}</p></div>`;
    chairDisplay.appendChild(chairDiv);
    chairDisplay.appendChild(deleteBtn);
    chairDisplay.appendChild(editButton);
    deleteBtn.addEventListener("click", async () => {
      await fetch("http://localhost:1337/api/chairs/" + chair.id, {
        method: "delete",
      });
      chairDisplay.innerHTML = "";
      fetchChair();
    });
    editButton.addEventListener("click", async () => {
      editButton.disabled = true;
      const updateChair = document.createElement("button");
      const newTitle = document.createElement("input");
      const newQty = document.createElement("input");
      const newPrice = document.createElement("input");
      const newDescription = document.createElement("textarea");
      newTitle.value = chair.attributes.title;
      newQty.setAttribute("type", "number");
      newQty.value = chair.attributes.qty;
      newPrice.setAttribute("type", "number");
      newPrice.value = chair.attributes.price;
      newDescription.value = chair.attributes.description;
      newDescription.setAttribute("rows", "4");
      updateChair.innerHTML = "Update";
      chairDiv.appendChild(newTitle);
      chairDiv.appendChild(newPrice);
      chairDiv.appendChild(newQty);
      chairDiv.appendChild(newDescription);
      chairDiv.appendChild(updateChair);
      updateChair.addEventListener("click", async () => {
        console.log(newTitle.value);
        let obj = {
          data: {
            title: newTitle.value,
            price: newPrice.value,
            qty: newQty.value,
            description: newDescription.value,
          },
        };
        await fetch("http://localhost:1337/api/chairs/" + chair.id, {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        chairDisplay.innerHTML = "";
        fetchChair();
      });
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
</script>