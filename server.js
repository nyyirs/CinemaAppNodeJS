const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', (req, res) => {

    res.render('index.hbs');

});

app.get('/mcine', (req, res) => {
    let titles = [];
    let links = [];
    let imgs = [];
    var movies = [];
    let url = 'https://www.myt.mu/sinformer/cinema/les-salles/23/cinema-mcine';

    request(url, (error, response, body) => {

        var $ = cheerio.load(body);

        //Query Movie Titles
        $('.col-md-8').filter(function () {
            var data = $(this);
            title = data.children().first().text();
            titles.push(title);
        });

        //Query Movie Links
        $('.col-md-4').filter(function () {
            var data = $(this);
            link = data.children().attr('href');
            links.push(`https://www.myt.mu${link}`);
        });

        //Query Movie Links
        $('.col-md-4').filter(function () {
            var data = $('a', this);
            img = data.children().first().attr('src');
            imgs.push(img);

        });

        

        for (var i = 0; i < imgs.length; i++) {

            movies[i] = { 'image': imgs[i], 'link': links[i], 'title': titles[i]};

        };

        res.render('mcine.hbs', { movies });

    });

   
});

app.get('/bagatelle', (req, res) => {
    let titles = [];
    let links = [];
    let imgs = [];
    var movies = [];
    let url = 'https://www.myt.mu/sinformer/cinema/les-salles/19/cinema-star-bagatelle';

    request(url, (error, response, body) => {

        var $ = cheerio.load(body);

        //Query Movie Titles
        $('.col-md-8').filter(function () {
            var data = $(this);
            title = data.children().first().text();
            titles.push(title);
        });

        //Query Movie Links
        $('.col-md-4').filter(function () {
            var data = $(this);
            link = data.children().attr('href');
            links.push(`https://www.myt.mu${link}`);
        });

        //Query Movie Links
        $('.col-md-4').filter(function () {
            var data = $('a', this);
            img = data.children().first().attr('src');
            imgs.push(img);

        });

        

        for (var i = 0; i < imgs.length; i++) {

            movies[i] = { 'image': imgs[i], 'link': links[i], 'title': titles[i]};

        };

        res.render('bagatelle.hbs', { movies });

    });

   
});

//Run the Server
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});