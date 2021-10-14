const container = document.querySelector('.container');

let currentPage = 1;


let more = true;

// DISPLAY USERS
function displayResults(users) {
  users.forEach(u => {
    const html = `<div class="user">
                    <h3>${u.name}</h3>
                    <ul>
                      <li>Id: ${u.id}</li>
                      <li>Email: ${u.email}</li>
                      <li>Address: ${u.address}</li>
                      <li>Country: ${u.country}</li>
                      <li>Company: ${u.company}</li>
                    </ul>
                  </div>`;

    container.insertAdjacentHTML('beforeend', html);
  });
};

// GET USERS
async function getUsers(url) {
  try {
    const response = await fetch(url);
    const {hasMore, results} = await response.json();

    more = hasMore;
    displayResults(results);
  } catch (error) {
    console.log(error);
  }
};

getUsers(`http://localhost:3001/api/users?page=${currentPage}&limit=20`);

window.document.addEventListener('scroll', function() {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight) {
    currentPage++;
    getUsers(`http://localhost:3001/api/users?page=${currentPage}&limit=20`);
  }
})