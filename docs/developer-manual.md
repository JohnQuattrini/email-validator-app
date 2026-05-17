# Developer Manual

---

## 1. Installation Instructions

### Requirements
- Node.js (v16+ recommended)
- npm
- Git

---

### Clone the Repository

```bash
git clone <your-repository-url>
cd email-validator-app
```
---

### Install Dependencies
```bash
npm install
```

#### This installs:

express
body-parser
axios
@supabase/supabase-js
nodemon

---

### 2. Environment Setup

Create a .env file in the root directory:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=3000
```
---

### 3. Running the Application
Start Development Server
```
npm run dev
```

Server runs at:
```
http://localhost:3000
```

---

### 4. API Endpoints
#### GET /users

Retrieves all users stored in the Supabase database.
---
#### POST /users

Creates a new user.

#### Request Body:
``` JSON
{
  "email": "user@example.com",
  "password": "password123"
}
```
---

#### GET /random-user

Fetches a random user from the external Random User API.

This endpoint is used for demonstration purposes only and does not store data.
---

### 5. Testing

No automated tests are included.

Manual testing:

Submit registration form
Verify Supabase database updates
Click "Load Users"
Check chart updates
Test Random User generator
---

### 6. Known Issues
Chart may require refresh or interaction to update
Random User API data is not stored in database
Passwords are stored in plain text (not secure, for demo purposes only)

--- 

### 7. Future Improvements
Add password hashing (bcrypt)
Add authentication (login system)
Expand user profiles (age, gender, location)
Use random user generator to populate forms and test 
--- 

### 8. Project Structure
```
email-validator-app/
│
├── public/
│ ├── index.html
│ ├── about.html
│ ├── register.html
│ ├── script.js
│ └── style.css
│
├── docs/
│ └── developer-manual.md
│
├── index.js
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```