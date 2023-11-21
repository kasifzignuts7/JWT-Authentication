# JWT-Authentication in Node JS with Express and MongoDB

Welcome to the JWT Authentication with Express and MongoDB project! This repository contains a Node.js application demonstrating how to implement JSON Web Token (JWT) authentication. Follow the steps below to set up and run the project.

## About this Project

This project presents a straightforward authentication system utilizing JSON Web Tokens (JWT) for user authentication. It provides insights into real-world authentication scenarios, illustrating the communication between clients and servers using JWT tokens. Additionally, the project demonstrates the process of token signing and verification on the server side.

### Screenshots

#### Description:

- This is a snapshot gives us broad picture of how authentication works in action.

![Local Image](<./screenshots/Authentication%20Cycle%20(2).png>)

#### Homepage:

![Local Image](./screenshots/Homepage.png)

#### Signup page:

![Local Image](<./screenshots/Signup Page.png>)

#### Login page:

![Local Image](<./screenshots/Login Page.png>)

## Technologies Used

This project leverages a variety of technologies to achieve its goals. Some of the key technologies include:

- **Node.js**
- **Express**
- **MongoDB**
- **JSON Web Tokens (JWT)**
- **EJS**

## Clone the Repository

Clone the Git repository to your local machine:

```bash
git clone https://github.com/kasifzignuts7/JWT-Authentication
```

## Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

This will generate a "node_modules" folder in your root directory.

## Project Structure

- The "public" and "views" folders contain static files, such as EJS templates and images.

- Open the `index.js` file to explore the project logic and make necessary configurations.

## Configuration

1. Replace the placeholder `MyStrongSecretKey` in the code with a strong, unique secret key for signing and verifying JWTs.

2. If using a remote MongoDB URL, replace `mongodb://127.0.0.1:27017/JWTAuth` with your connection URL.

## Running the Application

After configuring the application, run the following command:

```bash
npm start
```

Visit `http://localhost:3000` in your browser to interact with the JWT authentication demo. The application provides routes for signup, login, and a protected homepage.

## Usage and Testing

1. Click on the signup button to register.
2. Once registered, you will be redirected to the homepage.
3. Open the developer tools in your browser and navigate to Application -> Storage -> Cookies to view the JWT token.
4. Even after closing the tab or browser, you'll remain logged in, demonstrating the token's persistence.
5. To logout, click on the logout button. This will clear the JWT token from your cookie and redirect you to the homepage.

## Conclusion

Feel free to explore, modify, and enhance the code for your specific requirements. Happy coding!
