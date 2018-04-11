const express = require('express')
const sqlite3 = require('sqlite3')
const app = express()

const handlebars = require('express-handlebars').create({defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000)

const db = new sqlite3.Database('./Chinook_Sqlite_AutoIncrementPKs.sqlite')

app.get('/', (req,res) => {
    res.send('This is SQLite in Express hands-on')
})

app.get('/albums', (req, res) => {
    db.each(`SELECT Title as Album, Name as Artist FROM Album JOIN Artist USING (ArtistId)`, (err, row) => {
        if(err) throw err
        console.log(row)
    })
    db.close()
})

app.listen(app.get('port'), () => {
    console.log('Express hands on started on http://localhost:' + app.get('port') +'; press Ctrl-C to terminate')
})