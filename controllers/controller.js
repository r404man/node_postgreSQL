const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

// PostgreSQL data base connection;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodeproject',
    password: 'root',
    port: 5432,
});

// @route GET /
// @desc Show main page with cats cards
const getAllData = (req, res) => {
    let sqlQuery = `select c.id, c.name, c.date_birth, c.price, p.adress, p.name as petshop_name, ct.url as cats_tumb from cats c 
    left outer join petshop p on c.id = p.cats_id 
    left join cats_tumb ct on c.id = ct.cats_id;`;
    pool.query(sqlQuery, (err, data) => {
        let cats = data.rows;
        if (err) {
            console.error(err);
            res.status(404).render('errors/404', { title: 'error' });
        }
        else {
            res.render('index', { title: 'main', cats });
        }
    });
}

// @route GET /cats/:name
// @desc Render detail page
const getDetailPage = (req, res) => {
    catId = req.params.id;
    sql = `select c.name, c.price, c.description, c.gender, c.date_birth, p.name as petshop_name, cp.url, p.adress, p.phone from cats c 
    left join petshop p on c.id = p.cats_id 
    left join cats_photo cp on c.id = cp.cats_id where c.id = ${catId};`
    pool.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            res.status(404).render('errors/404', { title: 'error' });
        }
        else {
            // Cats detail data
            catsInfo = data.rows[0];
            let infoArr = [];

            // Url of cats_photo data
            let galleryUrlArr = [];
            let catsGalleryUrl = {};
            catsData = data.rows;
            catsData.forEach(el => {
                for (url in el) {
                    if (url == 'url') {
                        catsGalleryUrl = { url: el[url] };

                        // Array with url objects
                        galleryUrlArr.push(catsGalleryUrl);
                    }
                }
            });

            // Array with cat detail info object
            infoArr.push(catsInfo);

            res.render('detail', { title: 'detail', catsInfo: infoArr, catsGalleryUrl: galleryUrlArr });
        }
    });
}


// @route GET /cat/create
// @desk Render create page
const createPage = (req, res) => {
    res.render('create', { title: 'create' });
}

// @route POST /cat/create
// @desk Insert cat into database
const insertCat = (req, res) => {
    let { name, date_birth, gender, petshop_name, adress, phone,
        price, description, url } = req.body;

    // Insert cat data
    pool.query(`insert into cats (name, gender, price, description, date_birth)
    values ('${name}', '${gender}', '${price}', '${description}', '${date_birth}');`, (err, data) => {
        if (err) console.error(err);

    });

    // Select cat which just adding
    pool.query(`select id from cats where name = '${name}' and gender = '${gender}' 
    and price = '${price}';`, (err, data) => {
        if (err) console.error(err);

        catId = data.rows[0].id;
        console.log(catId);

        // Insert petshop data;
        pool.query(`insert into petshop (name, adress, cats_id, phone)
        values ('${petshop_name}', '${adress}', '${catId}', '${phone}');`, (err, data) => {
            if (err) console.error(err);
        });

        // Insert tumb for main page
        pool.query(`insert into cats_tumb (url, cats_id) 
        values ('${url}','${catId}');`, (err, data) => {
            if (err) console.error(err);
        });
    });

    res.redirect('/');
}


module.exports = {
    getAllData,
    getDetailPage,
    createPage,
    insertCat
}