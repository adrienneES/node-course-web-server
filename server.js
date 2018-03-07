const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toLocaleString();
    log = `${now}: ${req.method}, ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=> {
        if (err) {
            console.log('unable to append to server.log', err);
        }
    }); 

    next();
});
// app.use((req, res, next)=> {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         maintenance_mesage : 'page is under maintenance'
//     });
// })

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear() + 1;
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'home page',
        welcome_mesage : 'welcome to page'
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about page'
    });
});
app.get('/bad', (req, res) =>{
    res.send({error: 'oh no'});
})

app.listen(port, ()=>{
    console.log(`server up on ${port}`);
});