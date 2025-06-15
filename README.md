# 📊 Financial Control API

API and database for a financial control system. This backend serves data for a front-end client.

## 🚀 Getting Started

These instructions will help you set up a local development environment.

### 🧰 Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Prisma](https://www.prisma.io/)
- [JWT](https://jwt.io/) (used in the app for authentication)
- [Bcrypt](https://www.npmjs.com/package/bcrypt) (for password hashing)
- [Nodemon](https://www.npmjs.com/package/nodemon) (for development with live reload)

### 🔧 Installation

1. **Clone the repository:**

   git clone https://github.com/2813-mat/financial-control-api.git
   cd financial-control-api

2. **Install Node.js dependencies:**

    npm install

3. **Start PostgreSQL database using Docker Compose:**    

    docker-compose up -d

4. **Verify that the container is running:**  

    docker ps

5. **Create the .env file:**

6. **Apply database migrations:**   

    npx prisma migrate dev --name init

7. **Generante Prisma client**

    npx prisma generate

8. **Start the development server with Nodemon**

    npm run start-dev

---

## ✅ To-Do

- [✅] Add unit tests
- [✅] Add Swagger documentation
- [ ] Implement user roles
- [ ] Add transaction categories

---

## 🧑‍💻 Author

- [Mateus Ubirajara Bispo](https://github.com/2813-mat)
- [LinkedIn](https://www.linkedin.com/in/mateus-ubirajara-bispo-050b081ba/)