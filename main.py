from fastapi import FastAPI, HTTPException, Request
from typing import Optional
from fastapi.templating import Jinja2Templates

from fastapi.responses import HTMLResponse

from fastapi.staticfiles import StaticFiles
templates = Jinja2Templates(directory="templates")

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

users_data = {
    "1": {
        "name": "John",
        "age": 32,
        "email": "john@example.com",
        "phone": "123-456-7890",
        "address": "123 Main St",
        "website": "https://john.com",
        "socialMedia": {
            "github": "https://github.com/john",
            "twitter": "https://twitter.com/john",
            "instagram": "https://instagram.com/john",
            "facebook": "https://facebook.com/john",
        },
    },
    "2": {
        "name": "Sarah",
        "age": 27,
        "email": "sarah@example.com",
        "phone": "098-765-4321",
        "address": "456 Oak St",
        "website": "https://sarah.com",
        "socialMedia": {
            "github": "https://github.com/sarah",
            "twitter": "https://twitter.com/sarah",
            "instagram": "https://instagram.com/sarah",
            "facebook": "https://facebook.com/sarah",
        },
    },
    "3": {
        "name": "Jane",
        "age": 35,
        "email": "jane@example.com",
        "phone": "654-321-0987",
        "address": "789 Elm St",
        "website": "https://jane.com",
        "socialMedia": {
            "github": "https://github.com/jane",
            "twitter": "https://twitter.com/jane",
            "instagram": "https://instagram.com/jane",
            "facebook": "https://facebook.com/jane",
        },
    },
    "4": {
        "name": "Bob",
        "age": 42,
        "email": "bob@example.com",
        "phone": "789-123-4560",
        "address": "321 Pine St",
        "website": "https://bob.com",
        "socialMedia": {
            "github": "https://github.com/bob",
            "twitter": "https://twitter.com/bob",
            "instagram": "https://instagram.com/bob",
            "facebook": "https://facebook.com/bob",
        },
    },
    "5": {
        "name": "Alice",
        "age": 28,
        "email": "alice@example.com",
        "phone": "123-456-7890",
        "address": "123 Main St",
        "website": "https://alice.com",
        "socialMedia": {
            "github": "https://github.com/alice",
            "twitter": "https://twitter.com/alice",
            "instagram": "https://instagram.com/alice",
            "facebook": "https://facebook.com/alice",
        },
    },
}

@app.get("/", response_class=HTMLResponse)
def home( request: Request):
    return templates.TemplateResponse("main.html", {"request": request, })

@app.get("/users")
def get_users():
    return users_data

@app.get("/user/{id}")
def get_user(id: str):
    if id not in users_data:
        raise HTTPException(status_code=404, detail="User not found")
    return users_data[id]

@app.post("/user")
def create_user(user: dict):
    id = str(len(users_data) + 1)
    users_data[id] = user
    return {"id": id}

@app.put("/user/{id}")
def update_user(id: str, user: dict):
    if id not in users_data:
        raise HTTPException(status_code=404, detail="User not found")
    users_data[id] = user
    return {"id": id}

@app.delete("/user/{id}")
def delete_user(id: str):
    if id not in users_data:
        raise HTTPException(status_code=404, detail="User not found")
    del users_data[id]
    return {"message": "User deleted"}

