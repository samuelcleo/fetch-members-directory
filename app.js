const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;

// Recieves Fetched response and stores in variable: members.
// Populates display with HTML cards
let members = [];
function displayMembers(membersData) {
    members = membersData;
    console.log(members);
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
            location: { city, street, state, postcode }, 
            picture
        } = members[index]; // desctructures and declares properties of [ ...members ] as variables for all properties supplied at the object members[index]
    let date = new Date(dob.date);
    const modalHTML = `
    <div class="modal-content">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    </div>
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
    if (e.target.className === "card") {
        const index = e.target.getAttribute("data-index");
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