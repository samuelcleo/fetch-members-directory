const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;

// Recieves Fetched response and stores in variable: members.
// Populates display with HTML cards
let members = [];
function displayMembers(membersData) {
    members = membersData;
    let memberHTML = "";
    members.forEach((member, index) => {
        const name = member.name;
        const email = member.email;
        const city = member.location.city;
        const picture = member.picture;
        memberHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>`
    })
    gridContainer.innerHTML = memberHTML;
}
// Requires variable: members to destructure and display modal with additional properties
function displayModal(index) {
    let { 
            name, 
            dob, 
            phone, 
            email, 
            location: { city, street: street, state, postcode }, 
            picture
        } = members[index]; // desctructures and declares properties of [ ...members ] as variables for all properties supplied at each given object members[index]
    
    let date = new Date(dob.date);
    function pad(number) {
        if (number < 10) {
          return "0" + number;
        } else {
          return number;
        }
    }

    const modalHTML = `
        <button id="btn-previous">&#8592</button>
        <img class="avatar" src="${picture.large}" />
        <div class="text-container" data-index="${index}">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.name}, ${state} ${postcode}</p>
            <p>Birthday: ${pad(date.getMonth()+1)}/${pad(date.getDate())}/${pad(date.getFullYear())}</p>
        </div>
        <button id="btn-next">&#8594</button>
    `;
    overlay.classList.remove("hidden");
    modalContent.innerHTML = modalHTML;
}

// Lower order operations
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal-content');

// supply the matching index in members array from the cards' data-index using the click event
// run displayModal() using the matched index
gridContainer.addEventListener('click', (e) => {
    if (e.target.className !== "grid-container") {
        const index = e.target.closest(".card").getAttribute("data-index");
        displayModal(index);
    }
})

const modalBtnClose = document.querySelector('.modal-close');
modalBtnClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
})

fetch(urlAPI)
    .then(response => response.json())
    .then(json => json.results)
    .then(displayMembers)

// Search function
const searchInput = document.getElementById('search');
searchInput.addEventListener('keyup', e => {
    let currentValue = e.target.value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const name = card.querySelector('.name');
        if (!name.textContent.toLowerCase().includes(currentValue)) {
            card.style.display = 'none';
        } else {
            card.style.display = 'flex';
        }
    })
});

overlay.addEventListener('click', (e) => {
    const index = modalContent.querySelector('.text-container').getAttribute('data-index')
    if (e.target.id === "btn-previous") {
        displayModal(parseInt(index) - 1);
    } else if (e.target.id === "btn-next") {
        displayModal(parseInt(index) + 1)
    }
})