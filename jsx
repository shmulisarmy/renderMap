




const users = new Map([
    ["1", {
        name: "John",
        age: 30,
        email: "j@j.com",
        phone: "555-555-5555",
        address: "123 Main St",
        website: "j.com"
    }],
    ["2", {
        name: "Jane",
        age: 25,
        email: "j@j.com",
        phone: "555-555-5555",
        address: "123 Main St",
        website: "j.com"
    }],
    ["3", {
        name: "Jim",
        age: 40,
        email: "j@j.com",
        phone: "555-555-5555",
        address: "123 Main St",
        website: "j.com"
    }]

])








function User(user){
    return html`
    <div class="user">
        <h2>${user.name}</h2>
        <p>Age: ${user.age}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Address: ${user.address}</p>
        <p>Website: ${user.website}</p>
        <button onclick="this.set('name', 'john')">change name</button>
        <button onclick="this.delete()">delete</button>
    </div>
    `
}


function App(){
    const h =  html`
        <main>
            /${CreateRenderGroup("user", users, User)}
        </main>
    `
    return h
}



root.morphe(App)