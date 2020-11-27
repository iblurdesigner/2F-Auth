const mysql = require("mysql")

const db = mysql.createConnection({
    socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(req.body)

    const { name, email, password, passwordConfirm } = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
        if(error) {
            console.log(error)
        }

        if(results.length > 0) {
            return res.render('register', {
                message: 'El e-mail ya está en uso'
            })
        } else if( password !== passwordConfirm ) {
            return res.render('register', {
                message: 'Las contraseñas no son iguales'
            })
        }
    })

    res.send("Registro exitoso")
}