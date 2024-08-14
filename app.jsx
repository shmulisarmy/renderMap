








const usersData = new Map([
    [1, {
        name: "John",
        age: 32,
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St",
        website: "https://john.com",
        socialMedia: {
            github: "https://github.com/john",
            twitter: "https://twitter.com/john",
            instagram: "https://instagram.com/john",
            facebook: "https://facebook.com/john",
        },
    }],
    [2, {
        name: "Sarah",
        age: 27,
        email: "sarah@example.com",
        phone: "098-765-4321",
        address: "456 Oak St",
        website: "https://sarah.com",
        socialMedia: {
            github: "https://github.com/sarah",
            twitter: "https://twitter.com/sarah",
            instagram: "https://instagram.com/sarah",
            facebook: "https://facebook.com/sarah",
        },
    }],
    [3, {
        name: "Jane",
        age: 35,
        email: "jane@example.com",
        phone: "654-321-0987",
        address: "789 Elm St",
        website: "https://jane.com",
        socialMedia: {
            github: "https://github.com/jane",
            twitter: "https://twitter.com/jane",
            instagram: "https://instagram.com/jane",
            facebook: "https://facebook.com/jane",
        },
    }],
    [4, {
        name: "Mike",
        age: 42,
        email: "mike@example.com",
        phone: "321-098-7654",
        address: "101 Maple St",
        website: "https://mike.com",
        socialMedia: {
            github: "https://github.com/mike",
            twitter: "https://twitter.com/mike",
            instagram: "https://instagram.com/mike",
            facebook: "https://facebook.com/mike",
        },
    }],
    [5, {
        name: "Emily",
        age: 22,
        email: "emily@example.com",
        phone: "987-654-3210",
        address: "203 Pine St",
        website: "https://emily.com",
        socialMedia: {
            github: "https://github.com/emily",
            twitter: "https://twitter.com/emily",
            instagram: "https://instagram.com/emily",
            facebook: "https://facebook.com/emily",
        },
    }],
    [6, {
        name: "John",
        age: 50,
        email: "john@example.com",
        phone: "123-456-7890",
        address: "321 Oak St",
        website: "https://john.com",
        socialMedia: {
            github: "https://github.com/john",
            twitter: "https://twitter.com/john",
            instagram: "https://instagram.com/john",
            facebook: "https://facebook.com/john",
        },
    }],
    [7, {
        name: "Emma",
        age: 25,
        email: "emma@example.com",
        phone: "987-654-3210",
        address: "456 Pine St",
        website: "https://emma.com",
        socialMedia: {
            github: "https://github.com/emma",
            twitter: "https://twitter.com/emma",
            instagram: "https://instagram.com/emma",
            facebook: "https://facebook.com/emma",
        },
    }],
]);




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
            ${CreateRenderGroup("users", usersData, User)}
        </main>
    `
}





root.appendChild(App())
root.loadAllContainers()


