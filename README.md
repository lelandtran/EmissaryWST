# WebstormTroopers
[ ![Codeship Status for thiefjack/WebStormTroopers](https://codeship.com/projects/e58e08b0-ce3e-0133-961f-32b8bfabf829/status?branch=master)](https://codeship.com/projects/140852) 

## 0. Currently deployed on: 
http://webstormtroopers.herokuapp.com
## 1. Getting Started
**Emissary is a visitor check-in SaaS application targetted for small businesses.**
- Sign up your company and your own personal account for your company. 
- Thereafter, add employees to your company through the "Employees" section of the application to provide them access to the application. 
- Create appointments through the "Appointments" page. Open up the Check-in mode by clicking on the gear in the upper right-hand corner.
- As visitors check-in, they will show up in the queue on the "Visitors" page. 
- If there is an appointment that matches their information, their appointment time will automatically be populated.
- Click on a visitor to check him/her out. If he/she had an appointment, their appointment will automatically be removed from the "Appointments" section.

  

### 1.1 List of Requirements
1. **Node.js** (http://nodejs.org/)
2. **MongoDB** (https://www.mongodb.org/)
3. **HandleBars** (http://handlebarsjs.com/)
4. **jQuery** (https://jquery.com/)

### 1.2 Instructions
**Step 1:** Do a `git clone` on our project on **Github** (https://github.com/thiefjack/WebStormTroopers/).

**Step 2:** Run `npm install` in the directory of the project to install the dependency for the backend.

**Step 3:** Run `gulp test:server` to test the backend API.

**Step 4:** Run `gulp test:client` to test the frontend dependecies.

**Step 5:** Run `npm start` to start the application.
