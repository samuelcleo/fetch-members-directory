const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
let members = [];

const gridContainer = document.querySelector('.grid-container');

const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal-content');
const modalBtnClose = document.querySelector('.modal-close');

function displayModal(index) {
    let { 
        name, dob, phone, email, 
        location: { city, street, state, postcode }, 
        picture 
    } = members[index];
    let date = new Date(dob.date);
    const modalHTML = `
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
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}
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

fetch(urlAPI)
    .then(response => response.json())
    .then(json => json.results)
    .then(displayMembers)