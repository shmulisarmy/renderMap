




let users;







function User(user){
    console.log('rendering', user)
    return html`
    <div class="user">
        <h2>${user.name}</h2>
        <p>Age: ${user.age}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Address: ${user.address}</p>
        <p>Website: ${user.website}</p>
        <button onclick="this.set('name', 'john')">change name</button>
        <button onclick="this.parentContainer().innerHTML = ''">experiment</button>
        <button onclick="this.delete()">delete</button>
    </div>
    `
}


function App(){
    return html`
        <main>
            ${CreateRenderGroup("user", users, User)}
        </main>
    `
}


fetch('/users')
    .then(response => response.json())
    .then(data => {
        users = new Map(Object.entries(data))
        root.appendChild(App())
        root.loadAllContainers()
    })
    .catch(error => {
        console.error('Error:', error);
    });
    





