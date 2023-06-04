Technologies Used
mern

Prerequisites
Node.js and npm (Node Package Manager) should be installed on your machine.
MongoDB should be installed and running.

Getting Started

Clone the repository:

git clone https://github.com/amaann2/mern-auth.git
Install the dependencies for both the server and the client:

cd server
npm install

cd client
npm install

Configure the environment variables:
        Create a .env file in the server directory of the project.
        Provide the necessary environment variables such as the MongoDB connection URI and JWT secret key. You can refer to the .env.example            file for the required variables

enter all the detail in .env file:
        PORT , DATABASE_LOCAL , JWT_SECRET_KEY ,JWT_EXPIRES_IN , JWT_COOKIES_EXPIRES_IN , EMAIL_USERNAME ,EMAIL_HOST,EMAIL_PASSWORD

Start the server and the client concurrently:

cd server
npm run start

cd client
npm start

Access the application by visiting http://localhost:3000 in your web browser.


Contributing
Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.


Contact
If you have any questions or inquiries, please contact ansari028amaan@gmail.com.

Enjoy building with the MERN stack!
