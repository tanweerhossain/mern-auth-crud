# Tech Versions 
    node v14.0.0
    npm v6.14.4
    mongo v4.2.6
# Install Client Packages
    cd ./client
    npm i
# Start Client Server
    npm start
# Install MongoDb Packages
# Run Mongo Server Locally with 27017 port
# Install Server Packages
    cd ./server
    npm i
# Start Server Server
    npm start
# Login Page for normal user
    http://localhost:3000
# Login Page for admin user
<pre>
Link: <a href="http://localhost:3000/admin/login">http://localhost:3000/admin/login</a>
user: admin@domain.in  
pass: 987654321@qQ
</pre>
# For Postman API Documentation
    1. Install Postman Rest Client
    2. Open Postman > Import the following document
        server\Calorie-Tracker.postman_collection.json
# Folder Structure

<pre>
.
├── client
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   └── src
│       ├── actions
│       │   ├── admin.js
│       │   ├── auth.js
│       │   ├── meal.js
│       │   └── profile.js
│       ├── components
│       │   ├── DateRanger.js
│       │   ├── Footer.js
│       │   ├── Header.js
│       │   ├── toaster.js
│       │   └── UnAuthHeader.js
│       ├── conf
│       │   ├── dev.js
│       │   ├── index.js
│       │   └── prod.js
│       ├── constants
│       │   ├── meal.js
│       │   └── profile.js
│       ├── containers
│       │   ├── adminHome.js
│       │   ├── adminLogin.js
│       │   ├── home.js
│       │   ├── index.js
│       │   ├── login.js
│       │   ├── resetpassword.js
│       │   ├── setting.js
│       │   └── signup.js
│       ├── index.css
│       ├── index.js
│       ├── middlewares
│       │   ├── CacheSession.js
│       │   ├── rest.js
│       │   ├── SessionzedContainer.js
│       │   └── UnSessionizedContainer.js
│       ├── reducers
│       │   ├── index.js
│       │   ├── meal.js
│       │   └── profile.js
│       ├── services
│       │   ├── adminServices.js
│       │   ├── authServices.js
│       │   ├── index.js
│       │   ├── mealsServices.js
│       │   └── profileServices.js
│       └── serviceWorker.js
├── README.md
└── server
    ├── app.js
    ├── bin
    │   └── www
    ├── Calorie-Tracker.postman_collection.json
    ├── package.json
    ├── package-lock.json
    ├── src
    │   ├── conf
    │   │   ├── dev.json
    │   │   ├── index.js
    │   │   └── prod.json
    │   ├── controllers
    │   │   ├── admin.js
    │   │   ├── index.js
    │   │   ├── meal.js
    │   │   ├── session.js
    │   │   └── user.js
    │   ├── middlewares
    │   │   ├── authFilters.js
    │   │   └── cachingModule.js
    │   ├── models
    │   │   ├── meal.model.js
    │   │   └── user.model.js
    │   ├── transactions
    │   │   ├── admin.transactions.js
    │   │   ├── meal.transactions.js
    │   │   └── user.transactions.js
    │   └── validations
    │       ├── admin.js
    │       ├── meal.js
    │       └── user.js
    ├── test
    │   ├── conf
    │   │   └── index.test.js
    │   ├── config.json
    │   ├── controllers
    │   │   ├── admin.test.js
    │   │   ├── meal.test.js
    │   │   ├── session.test.js
    │   │   └── user.test.js
    │   ├── index.test.js
    │   ├── transactions
    │   │   ├── admin.test.js
    │   │   ├── meal.test.js
    │   │   └── user.test.js
    │   ├── utils
    │   │   └── CreateSession.js
    │   └── validations
    │       ├── admin.test.js
    │       ├── meal.test.js
    │       └── user.test.js
    └── utils
        ├── constants.js
        ├── db-setup.js
        └── logging.js

27 directories, 87 files
</pre>
# How to run test cases and their sample output
* **Server Test cases :** npm test ___(for linux/unix)___, npm run test:windows ___(for windows)___
    <pre>
    <h2>Output:</h2>
    <span style="color:yellow">[ TEST  ]</span> NodeJs connecting to mongodb://localhost:27017/calorie-tracker-test...
    <span style="color:yellow">[ TEST  ]</span> NodeJs connected to mongodb://localhost:27017/calorie-tracker-test
    <span style="color:yellow">[ TEST  ]</span> Creating Users...
    <span style="color:yellow">[ TEST  ]</span> Created Users Successfully

    CONF: get(key)
    &nbsp;&nbsp;<span style="color:green">✔</span> should return values from dev.json in non-prod mode
    &nbsp;&nbsp;<span style="color:green">✔</span> should return values from prod.json in prod mode

    API: GET /ajax/admin/fetch/users [ fetchAllUsers ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while missing sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while incorrect sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response on correct sessionid

    API: POST /ajax/admin/login [ fetchAdminSession ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while body is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while email is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while password is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while email is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while password is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while credentials are invalid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response on correct credentials

    API: PUT /ajax/admin/toggle/user/active [ toggleUserActive ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while missing sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while incorrect sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while passing no body and proper sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while passing incorrect user id and proper sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while passing incorrect active status and proper sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response on correct sessionid and data

    API: POST /ajax/admin/user/login [ createUserSession ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while missing sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while incorrect sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while passing no body and proper sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while passing incorrect user id and proper sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response on correct sessionid and data

    API: GET /ajax/admin/logout [ adminLogout ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while missing sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while incorrect sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response on correct sessionid

    API: POST /ajax/meal/save [ addMeal ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while body is missing with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealName is missing with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealName is incorrect with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealDate is missing with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealDate is invalid with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealCalories is missing with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealCalories is incorrect with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response while corrent body and sessionid

    API: PUT /ajax/meal/update [ updateMeal ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while body is missing with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealName is missing with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealName is incorrect with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealDate is missing with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealDate is invalid with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealCalories is missing with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while mealCalories is incorrect with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while meal id is missing with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while meal id is incorrect with correct sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while meal data is correct with different sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response while meal data is correct with correct sessionid

    API: DELETE /ajax/meal/remove/:mealId [ deleteMeal ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with correct sessionid and wrong meal id
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with correct sessionid and different meal id
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response with correct sessionid and proper meal id

    API: GET /ajax/meal/fetch [ fetchMeal ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while sessionid is correct and missing query param
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while sessionid is correct and improper query param
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response while sessionid is correct and proper query param

    API: GET /ajax/verify/session [ verifySession ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is incorrent
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response while passing corrent admin sessionid
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response while passing corrent user sessionid

    API: POST /ajax/user/login [ fetchUserSession ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while body is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while password is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while password is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while email is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while email is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response while credentials are incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response while corrent credentials

    API: GET /ajax/user/profile/fetch [ fetchUserProfile ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with correct sessionid and inactive user account
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response with corrent sessionid and the user account is activated

    API: PUT /ajax/user/profile/update [ updateUserProfile ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with correct sessionid and incorrect name
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with correct sessionid and incorrect email
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with correct sessionid and incorrect password
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with correct sessionid and incorrect expectedPerDayIntakeCalorie
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response with correct sessionid and missing body
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response with correct sessionid and correct data

    API: POST /ajax/user/profile/signup [ saveUserProfile ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response without body
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with incorrect body
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with missing email
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with missing name
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with missing password
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 400 response with duplicate email entry
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response with correct body

    API: GET /ajax/user/logout [ userLogout ]
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 401 response while sessionid is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 200 response with correct sessionid

    Transaction: fetchAdminSessionTransaction(data: object): string | null
    &nbsp;&nbsp;<span style="color:green">✔</span> should throw error if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should throw error if data is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is primitive
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is blank object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if email is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if email is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if password is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if password is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return sessionid if data is correct

    Transaction: saveMealTransaction(data: object, userId: string): Promise<any>
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data & userId is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data & userId is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is primitive
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if meal calories is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return saved meal if data is correct
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if userId is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if userId is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if data is blank-object|primitives
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if meal name is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if meal name is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if meal calories is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if meal date is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if meal date is incorrect

    Transaction: updateMealTransaction(data: object, userId: string): Promise<any>
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data & userId is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data & userId is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is blank-object|primitives
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is primitive
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if meal calories is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if mealId is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if mealId is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return saved meal if data is correct
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if meal name is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if meal name is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if meal calories is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if meal date is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if meal date is incorrect

    Transaction: deleteMealTransaction(data: string, userId: string): Promise<any>
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data & userId is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data & userId is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is blank-object|primitives
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is primitive
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 1 if data and userId is correct

    Transaction: fetchMealTransaction(data: object, userId: string): Promise<any>
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data & userId is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data & userId is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return blank array if data is blank-object|primitives
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is primitive
    &nbsp;&nbsp;<span style="color:green">✔</span> should return blank array if userId is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if userId is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return blank array if userId is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return list of meals if data and userId is correct

    Transaction: fetchAllUsersTransaction(data: object): Promise<any>
    &nbsp;&nbsp;<span style="color:green">✔</span> should return data if called, with or without parameter

    Transaction: fetchUserSessionTransaction(data: object): Promise<any>
    &nbsp;&nbsp;<span style="color:green">✔</span> should throw error if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should throw error if data is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is blank-object|primitives
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if email is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if email is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if password is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if password is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if credentials are incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return sessionid if credentials are correct

    Transaction: fetchUserProfileTransaction(user: string): Promise<any>
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if user id is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if user id is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if user id is blank-object|primitives
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if user id are incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return user details if user id are correct

    Transaction: updateUserProfileTransaction(userData: string): Promise<any>
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is blank-object|primitives
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data are incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return old user details if only user id is present
    &nbsp;&nbsp;<span style="color:green">✔</span> should return updated user details if email is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return updated user details if email is improper string value
    &nbsp;&nbsp;<span style="color:green">✔</span> should return updated user details if email is improper non-string value
    &nbsp;&nbsp;<span style="color:green">✔</span> should return updated user details if user name is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if user name is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return updated user details if password is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return updated user details if password is improper string value
    &nbsp;&nbsp;<span style="color:green">✔</span> should return updated user details if password is improper non-string value
    &nbsp;&nbsp;<span style="color:green">✔</span> should return updated user details if expectedPerDayIntakeCalorie is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if expectedPerDayIntakeCalorie is improper value
    &nbsp;&nbsp;<span style="color:green">✔</span> should return user details if data are correct

    Transaction: saveUserProfileTransaction(userData: object): Promise<any>
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if data is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if data is blank-object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is primitives
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong data if email is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return saved user data if email is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return wrong user data if user name is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return saved user data if user name is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return saved user data if user password is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return saved user data if user password is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return saved user data if isActive is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if isActive is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return saved user data if expectedPerDayIntakeCalorie is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if expectedPerDayIntakeCalorie is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return saved user data if data is correct

    Transaction: toggleUserActiveTransaction(userData: object): Promise<any>
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 1 if data is blank-object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 1 if data is primitives
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 1 if isActive is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if isActive is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 1 if user id is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if user id is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return 1 if data is correct

    Transaction: createUserSessionTransaction(userId: string): Promise<string | null>
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is null
    &nbsp;&nbsp;<span style="color:green">✔</span> should throw error if data is improper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return null if data is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should throw error if data is blank-object|primitives
    &nbsp;&nbsp;<span style="color:green">✔</span> should return sessionid if data is incorrect

    VALIDATION: validateFetchAdminSession(data: object): object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is not proper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is blank object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if email is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if email is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if password is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if password is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if data is correct

    VALIDATION: validateToggleUserActive(data: object): object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is not proper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is blank object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if _id is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if _id is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if isActive is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if isActive is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if data is correct

    VALIDATION: validateCreateUserSession(data: string): object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is not proper
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if data is correct

    VALIDATION: validateAddMeal(data: object): object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is not proper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is blank object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal name is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal name is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal calories is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal calories is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal date is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal date is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if data is correct

    VALIDATION: validateUpdateMeal(data: object): object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is not proper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is blank object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if _id is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if _id is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal name is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal name is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal calories is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal calories is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal date is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal date is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if data is correct

    VALIDATION: validateDeleteMeal(data: string): object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if data is correct

    VALIDATION: validateFetchMeal(data: object): object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if minimum range is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if minimum range is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if maximum range is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if maximum range is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if meal date range is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if data is correct

    VALIDATION: validateFetchUserSession(data: object): object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is not proper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is blank object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if email is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if email is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if password is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if password is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if data is correct

    VALIDATION: validateUpdateUserProfile(data: object): object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is not proper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is blank object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if _id is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if _id is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if email is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if email is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if password is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if password is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if userName is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if userName is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if expectedPerDayIntakeCalorie is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if expectedPerDayIntakeCalorie is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if data is correct

    VALIDATION: validateSaveUserProfile(data: object): object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is not proper
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if data is blank object
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if email is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if email is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if password is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if password is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if userName is missing
    &nbsp;&nbsp;<span style="color:green">✔</span> should return errorMessage if userName is incorrect
    &nbsp;&nbsp;<span style="color:green">✔</span> should not return errorMessage if data is correct

    <span style="color:yellow">[ TEST  ]</span> Users Removed Successfully
    <span style="color:yellow">[ TEST  ]</span> Meals Removed Successfully

    <span style="color:green">300 passing</span> (1s)
    </pre>