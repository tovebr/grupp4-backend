const title = document.getElementById('title');
const quantity = document.getElementById('quantity');
const price = document.getElementById('price');
const desc = document.getElementById('desc');
const addChair = document.getElementById('addChair');
const chairDisplay = document.querySelector('.chair-display');

const fetchChair = async () => {
  const response = await fetch('http://localhost:1337/api/chairs');
  const { data } = await response.json();
  printChairs(data);
};

const printChairs = (chairs) => {
  chairs.map((chair) => {
    const chairDiv = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const editButton = document.createElement('button');
    chairDiv.classList.add('chair');
    deleteBtn.innerHTML = 'delete';
    editButton.innerHTML = 'edit';
    deleteBtn.style = editButton.style =
      'border:none; padding:0.2rem 0.5rem; border-radius:3px; margin-right:0.5rem';
    chairDiv.innerHTML = `<div id=${chair.id} ><h3>${chair.attributes.title}</h3><p>Price: ${chair.attributes.price} SEK</p><p>${chair.attributes.description}</p></div>`;
    chairDisplay.appendChild(chairDiv);
    chairDisplay.appendChild(deleteBtn);
    chairDisplay.appendChild(editButton);
    deleteBtn.addEventListener('click', async () => {
      await fetch('http://localhost:1337/api/chairs/' + chair.id, {
        method: 'delete',
      });
      chairDisplay.innerHTML = '';
      fetchChair();
    });
    editButton.addEventListener('click', async () => {
      editButton.disabled = true;
      const updateChair = document.createElement('button');
      const newTitle = document.createElement('input');
      const newQty = document.createElement('input');
      const newPrice = document.createElement('input');
      const newDescription = document.createElement('textarea');
      newTitle.value = chair.attributes.title;
      newQty.setAttribute('type', 'number');
      newQty.value = chair.attributes.qty;
      newPrice.setAttribute('type', 'number');
      newPrice.value = chair.attributes.price;
      newDescription.value = chair.attributes.description;
      newDescription.setAttribute('rows', '4');
      updateChair.innerHTML = 'Update';
      chairDiv.appendChild(newTitle);
      chairDiv.appendChild(newPrice);
      chairDiv.appendChild(newQty);
      chairDiv.appendChild(newDescription);
      chairDiv.appendChild(updateChair);
      updateChair.addEventListener('click', async () => {
        console.log(newTitle.value);
        let obj = {
          data: {
            title: newTitle.value,
            price: newPrice.value,
            qty: newQty.value,
            description: newDescription.value,
          },
        };
        await fetch('http://localhost:1337/api/chairs/' + chair.id, {
          method: 'PUT',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });
        chairDisplay.innerHTML = '';
        fetchChair();
      });
    });
  });
};

fetchChair();

addChair.addEventListener('click', async (e) => {
  e.preventDefault();
  document.querySelector('.title-error').innerText = '';
  if (title.value && price.value && quantity.value && desc.value) {
    document.querySelector('.input-error').innerText = '';
    let obj = {
      data: {
        title: title.value,
        price: price.value,
        qty: quantity.value,
        description: desc.value,
      },
    };
    const response = await fetch('http://localhost:1337/api/chairs', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    const parsedResponse = await response.json();
    if (parsedResponse.error) {
      document.querySelector('.title-error').innerText =
        'Stolens titel måste vara unik, titeln du angav finns redan i databasen';
    } else {
      document.querySelector('.title-error').innerText = '';
      title.value = price.value = quantity.value = desc.value = '';
      chairDisplay.innerHTML = '';
      fetchChair();
    }
  } else {
    document.querySelector('.input-error').innerText =
      'Alla fält måste vara ifyllda';
  }
});
