// const http = require('http')
const express = require('express')


let notes = [
    {
        "id": 1, 
        "content": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "date": "2019-05-30T17:30:31.098Z",
        "important": true
    },
    {
        "id": 2, 
        "content": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "date": "2019-05-30T18:39:34.091Z",
        "important": false
    },
    {
        "id": 3, 
        "content": "eum et est occaecati",
        "date": "2019-05-30T19:20:14.298Z",
        "important": true
    }
]



// const app = http.createServer( (request, response) => {
//     response.writeHead(200, {'Content-type': 'application/json'})
//     // response.end("Hola blurdevs!")
//     response.end(JSON.stringify(notes))
// } )

const app = express()

// usaremos un body parse para que soporte request para post
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hola mundo!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find( note => note.id === id)

    if(note){
        response.json(note) 
    }else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter( note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if(!note || !note.content){
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map( note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString( )
    }

    notes = [...notes, newNote]

    response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
