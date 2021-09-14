const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')
let { notes } = require('../db/db.json')

router.get('/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, notes) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(notes))
  })
})

router.post('/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) { console.log(err) }
    let notes = JSON.parse(data)
    notes.push(req.body)
    
    fs.writeFile('db/db.json', JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      res.json(req.body)
    })
  })
})

router.delete('/notes/:id', (req, res) => {
  let id = req.params.id
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) { console.log(err) }
    let notes = JSON.parse(data)
    notes = notes.filter(note => note.id !== note)

    fs.writeFile('db/db.json', JSON.stringify(notes), err => {
      res.sendStatus(200)
    })
  })
})

// router.get('/notes', (req, res) => {
//   fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8'(err, notes) => {
//     if(err) { console.log(err) }
//     res.json(JSON.parse(notes))
//   })
// })

// router.post('/notes', (req, res) => {
//   fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
//     if (err) { console.log(err) }
//     let notes = JSON.parse(data)
//     notes.push(note)

//     fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
//       if (err) { console.log(err) }
//       res.json(note)
//     })
//   })
// })

// router.delete('/notes/:id', (req, res) => {
//   let id = req.params.id
//   fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
//     if (err) { console.log(err) }
//     let notes = JSON.parse(data)
//     notes = notes.filter(note => note.id !== id)
//     fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
//       if (err) { console.log(err) }
//       res.sendStatus(200)
//     })
//   })
// })

module.exports = router