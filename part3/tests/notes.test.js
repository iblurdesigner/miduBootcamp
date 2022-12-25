const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const Note = require('../models/Note')

const api = supertest(app)

const initialNotes = [
  {
    content: 'Aprendiendo Full Stack con midu',
    important: true,
    date: new Date()
  },
  {
    content: 'Sigueme en @blurdev',
    important: true,
    date: new Date()
  }
]

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  await note1.save()

  const note2 = new Note(initialNotes[1])
  await note2.save()
})

test('notes are returned as JSON', async () => {
  await api.get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about midudev', async () => {
  const response = await api.get('/api/notes')
  expect(response.body[0].content).toBe('Aprendiendo Full Stack con midu')
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
