const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.json())

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: 'serviciosEscolares'
})

app.post('/servicios_escolares/insertPeriod', (req, res) => {
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

app.post('/servicios_escolares/closePeriod', (req, res) => {
    const idPeriod = req.body.idPeriod
    console.log(req.body)
    connection.query('UPDATE periodos_inscripcion SET estatus = 0 WHERE id_periodo = ?', [idPeriod],
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
    const applicantPeriod = req.body.applicantPeriod


    const query = 'INSERT INTO aspirantes_registrados (nombre_aspirante, correo_aspirante, telefono_aspirante, usuario_aspirante, curp_aspirante, carrera_aspirante, id_periodo) VALUES (?, ?, ?, ?, ?, ?, ?)'

    connection.query(query, [applicantName, applicantEmail, applicantNumber, applicantUser, applicantCurp, applicantCareer, applicantPeriod],
        (err, result) => {
            if (err) throw err
            res.send(result)
        }
    )
})

app.get('/servicios_escolares/getApplicants', (req, res) => {
    connection.query('SELECT * FROM vista_aspirantes_periodos', (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.post('/servicios_escolares/updateApplicant', (req, res) => {
    const applicantId = req.body.applicantId
    const applicantStatus = req.body.applicantStatus

    connection.query('UPDATE aspirantes_registrados SET estatus_aspirante = ? WHERE id_aspirante = ?', [applicantStatus, applicantId],
        (err, response) => {
            if (err) throw err
            res.send(response)
        }
    )
})

app.get('servicios_escolares/getAcceptedApplicants', (req, res) => {
    connection.query('SELECT * FROM vista_aspirantes_periodos WHERE estatus_aspirante = ?', ['A'],
        (err, response) => {
            if (err) throw err
            res.send(response)
        }
    )
})

app.listen(3001, () => {
    console.log("El puerto se abrio en https://localhost:3001")
})