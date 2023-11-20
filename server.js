const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const app = express(); // done

const PORT = process.env.PORT || 3001;

// middle ware 
// routes 

// 11 -14 middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public')); 



app.get('/api/notes', (req, res) => {
  //console.log("helloo");
  //res.json({
  //   ok: true
  // })
  fs.readFile(path.join(__dirname, 'db/db.json'), (err,data) => {
    if(err){
      console.log('error', err)
    }
    // console.log(data)
    res.send(data);
  }) 
    
});


app.post('/api/notes', (req, res) => {
    const startNotes = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4()
    }
    
    fs.readFile(path.join(__dirname, 'db/db.json'), (err,data) => {
      if(err){
        console.log('error', err)
      }
      const oldNotes = JSON.parse(data)
      console.log(oldNotes)
      oldNotes.push(startNotes)
      console.log(oldNotes);
      fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify (oldNotes), (err) => {
        if(err){
          console.log('error', err)
        }
        res.json(oldNotes)
      })
    }) 
})


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
