const express = require('express');
const app = express();
const conn = require('./config/db');

app.use(express.json());

app.get('/get-mahasiswa', function (req,res){
    const querStr = "SELECT id,name,jurusan FROM mahasiswa WHERE deleted_at IS NULL"
    conn.query(querStr, (err, results) => {
        if (err) {
            console.log(err);
            res.error(err.sqlMessage, res);
        }else{
            res.status(200).json({
                "success" : true,
                "message" : "sukses menampilkan data",
                "data" : results
            });
        }
    });
})

app.post('/store-mahasiswa', function (req,res){
    console.log(req.body)
    const param = req.body;
    const name = param.name;
    const jurusan = param.jurusan;
    const now = new Date();

    const querStr = "INSERT INTO mahasiswa (name, jurusan, created_at) VALUES (?,?,?)";
    const values = [name,jurusan, now]

    conn.query(querStr, values, (err,results) =>{
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })
        }else {
            res.status(200).json({
                "success" : true,
                "message" : "Sukses meyimpan data",
                "data" : results
            })
        }
    })
})

app.get('/get-mahasiswa-by-id', function (req,res){
    const param = req.query;
    const id = param.id
    const querStr = "SELECT * FROM mahasiswa WHERE deleted_at IS NULL AND id = ?";
    const values = [id];

    conn.query(querStr, values, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })
        }else{
            res.status(200).json({
                "success" : true,
                "message" : "sukses menampilkan data",
                "data" : results
            });
        }
    });
})

app.post('/update-mahasiswa', function (req,res){
    const param = req.body;
    const id = param.id;
    const name = param.name;
    const jurusan = param.jurusan;

    const querStr = "UPDATE mahasiswa SET name = ?, jurusan = ? WHERE deleted_at IS NULL AND id = ?";
    const values = [name, jurusan, id];

    conn.query(querStr, values, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })
        }else{
            res.status(200).json({
                "success" : true,
                "message" : "sukses menampilkan data",
                "data" : results
            });
        }
    });
})

app.post('/delete-mahasiswa', function (req,res){
    const param = req.body;
    const id = param.id
    const now = new Date();
    const querStr = "UPDATE mahasiswa SET deleted_at = ? WHERE id = ?";
    const values = [now, id];

    conn.query(querStr, values, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })
        }else{
            res.status(200).json({
                "success" : true,
                "message" : "sukses menampilkan data",
                "data" : results
            });
        }
    });
})


app.listen(3000);