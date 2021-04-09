const express = require('express')

const app = express()

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendick',
		number: '39-23-6423122',
	},
]

app.use(express.json())

app.get('/api/persons', (req, res) => {
	res.send(persons)
})

app.get('/info', (req, res) => {
	const currentTime = new Date()

	res.send(
		`
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${currentTime}</p>
        </div>
        `
	)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)

	const found = persons.find((person) => {
		return person.id === id
	})

	if (!found) {
		res.status(404)
		res.send('Not found')
	} else {
		res.status(200)
		res.send(found)
	}
})

app.post('/api/persons', (req, res) => {
	const { name, number } = req.body

	const id = Math.floor(Math.random() * 10000)

	const person = {
		id,
		name,
		number,
	}

	persons = [...persons, person]

	res.send(persons)
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)

	const filtered = persons.filter((person) => {
		return person.id !== id
	})

	res.send(filtered)
})

const PORT = 3001

app.listen(PORT)

console.log(`Server running on port ${PORT}`)
