const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const e = require("express")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpustakaan"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

//--------------------------------- Data Siswa ------------------------------------------

app.get("/datasiswa", (req, res) => {
    let sql = "select * from datasiswa"

    db.query(sql, (error, result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                datasiswa: result
            }
        }
        res.json(response)
    })
})

app.get("/datasiswa/:id", (req, res) => {
    let data = {
        id_siswa: req.params.id
    }
    let sql = "select * from datasiswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                datasiswa: result
            }
        }
        res.json(response)
    })
})

app.post("/datasiswa", (req, res) => {
    let data = {
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        noabsen: req.body.noabsen
    }
    let sql = "insert into datasiswa set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/datasiswa", (req, res) => {
    let data = [
        {
            nama_siswa: req.body.nama_siswa,
            kelas: req.body.kelas,
            noabsen: req.body.noabsen
        },

        {
            id_siswa: req.body.id_siswa
        }
    ]

    let sql = "update datasiswa set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/datasiswa/:id", (req, res) => {
    let data = {
        id_siswa: req.params.id
    }

    let sql = "delete from datasiswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

//--------------------------------- Data Buku ------------------------------------------

app.get("/databuku", (req, res) => {
    let sql = "select * from databuku"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                databuku: result
            }
        }
        res.json(response)
    })
})

app.get("/databuku/:id", (req, res) => {
    let data = {
        id_buku: req.params.id
    }
    let sql = "select * from databuku where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                databuku: result
            }
        }
        res.json(response)
    })
})

app.post("/databuku", (req, res) => {
    let data = {
        judul_buku: req.body.judul_buku,
        jumlah_halaman_buku: req.body.jumlah_halaman_buku,
        keterangan_kondisi_buku: req.body.keterangan_kondisi_buku
    }

    let sql = "insert into databuku set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/databuku", (req, res) => {
    let data = [
        {
            judul_buku: req.body.judul_buku,
            jumlah_halaman_buku: req.body.jumlah_halaman_buku,
            keterangan_kondisi_buku: req.body.keterangan_kondisi_buku
        },

        {
            id_buku: req.body.id_buku
        }
    ]

    let sql = "update databuku set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/databuku/:id", (req, res) => {
    let data = {
        id_buku: req.params.id
    }

    let sql = "delete from databuku where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.listen(8000, () => {
    console.log("Alhamdulillah Berhasil")
})