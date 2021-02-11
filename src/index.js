// // write your code here

// /////// QUERY SELECTOR ///////
let viewSpice = document.querySelector('#spice-blend-detail')
let spiceImage = document.querySelector('#spice-images')
let ingredientList = document.querySelector(".ingredients-list")
const ingredientForm = document.querySelector('#ingredient-form')
const updateForm = document.querySelector('#update-form')
let currentSpiceBlend = 1
// /////// EVENT LISTENER ///////

spiceImage.addEventListener("click", e => {
    if(e.target.matches('img'))
    {
        singleSpice(e.target.dataset.id)
    }
    })

    updateForm.addEventListener('submit', handleUpdateForm)

    ingredientForm.addEventListener('submit', handleNewIngredientForm)

// /////// FETCH ///////

function getAllSpices() {
fetch('http://localhost:3000/spiceblends')
.then(res => res.json())
.then(data => data.forEach(element => displaySpices(element)))
}


function singleSpice(currentSpiceBlend) {
    fetch(`http://localhost:3000/spiceblends/${currentSpiceBlend}`)
    .then(res => res.json())
    .then(data => showSpice(data))
}


// /////// FUNCTION ///////
function displaySpices(e) {
    let image = document.createElement('img')
    image.src = e.image
    image.alt = e.image
    image.dataset.id = e.id
    spiceImage.append(image)
}

function showSpice(e) {
    viewSpice.children[0].src = e.image
    viewSpice.children[0].alt = e.image
    viewSpice.children[1].innerText = e.title
    currentSpiceBlend = e.id
    ingredientList.innerText = ''
    e.ingredients.forEach(ingredient => { const li = document.createElement("li")
    li.textContent = ingredient.name
    ingredientList.append(li)
    })}

  
function handleUpdateForm(event) {
    event.preventDefault()
    const titleInput = document.querySelector('#spiceblend-title').value
    debugger
    event.target.reset()
    fetch(`http://localhost:3000/spiceblends/${currentSpiceBlend}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: titleInput })
    })
        .then(response => response.json())
        .then(updatedSpiceBlend => {
            const titleH2 = document.querySelector('h2.title')
            titleH2.textContent = updatedSpiceBlend.title
        })
}

function handleNewIngredientForm(event) {
    event.preventDefault()
    const nameInput = event.target.name.value
    const li = document.createElement('li')
    li.textContent = nameInput
    const ingredientUl = document.querySelector('.ingredients-list')
    ingredientUl.append(li)
    event.target.reset()
    fetch('http://localhost:3000/ingredients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nameInput, spiceblendId: parseInt(currentSpiceBlend) })
    })
        .then(response => response.json())
        .then(newIngredient => console.log(newIngredient))
}

getAllSpices()
singleSpice(1)
