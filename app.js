const express = require("express")
const path = require('path')
const mysql = require("mysql")
const dotenv = require("dotenv")

dotenv.config({ path: './.env' })

const app = express()

//Datos para la conexión con la Base de datos en MySql
const db = mysql.createConnection({
    socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

// Parse URL-encoded bodies (as sent by HTNL forms)
app.use(express.urlencoded({ extended: false }))
//Parse JSON bodies (as sent by API clients)
app.use(express.json())

app.set('view engine', 'hbs')

//Verificacion de la conexion
db.connect( (error) => {
    if (error) {
        console.log('Uh! we have an error')
    } else {
        console.log("MYSQL Connected...")
    }
})

//Define Routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(5001, () => console.log("Server started on Port 5001"))