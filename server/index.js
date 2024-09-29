const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: 'serviciosEscolares'
})

app.post('/insertPeriod', (req, res) => {
    const periodName = req.body.data.periodName
    const periodDesc = req.body.data.periodDesc
    const periodStatus = req.body.data.periodStatus

    console.log(req.body)

    connection.query('INSERT INTO periodos_inscripcion (nombre_periodo, descripcion, estatus) values (?, ?, ?)',
        [periodName, periodDesc, periodStatus],
        (err, result) => {
            if (err) throw err
            res.send(result)
        }
    )
})

app.get('/servicios_escolares/listPeriods', (req, res) => {
    connection.query('SELECT * FROM periodos_inscripcion',
        (err, result) => {
            if (err) throw err
            res.send(result)
        }
    )
})

app.post('/servicios_escolares/saveApplicant', (req, res) => {
    const applicantName = req.body.applicantName
    const applicantEmail = req.body.applicantEmail
    const applicantNumber = req.body.applicantNumber
    const applicantUser = req.body.applicantUser
    const applicantCurp = req.body.applicantCurp
    const applicantCareer = req.body.applicantCareer


    const query = 'INSERT INTO aspirantes_registrados (nombre_aspirante, correo_aspirante, telefono_aspirante, usuario_aspirante, curp_aspirante, carrera_aspirante) VALUES (?, ?, ?, ?, ?, ?)'

    connection.query(query, [applicantName, applicantEmail, applicantNumber, applicantUser, applicantCurp, applicantCareer],
        (err, result) => {
            if (err) throw err
            res.send(result)
        }
    )
})

app.listen(3001, () => {
    console.log("El puerto se abrio en http://localhost:3001")
})