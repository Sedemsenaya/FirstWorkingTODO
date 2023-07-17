const express = require('express')
const PORT = 5000 || process.env.PORT
const cors  = require('cors')
const mongoose = require('mongoose')
const {connect} = require("mongoose");
const app = express()

app.use(express.json())
app.use(cors())



mongoose.connect('mongodb+srv://sedemsenaya25:seditech@cluster0.sabihzv.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {console.log("mongoDB connected")})

const tSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    }
},
    {timestamps: true}
    )

const tModel = mongoose.model("textTODO", tSchema)

app.get('/', (req, res) => {
    res.send("Hello World ")
})

app.get('/n', async (req, res) => {
    try {
        const text = await tModel.find()
        res.status(200).json(text)
    }
    catch (e) {
        console.error(e)
    }
})

app.get('/n/:id', async (req, res) => {
    try {
        const {id} = req.params
        const text = await tModel.findById(id)
        res.status(200).json(text)
    }
    catch (e) {
        console.error(e)
    }
})

app.post('/n', async (req, res) => {
    try {
        const tes = req.body
        const text = await tModel.create(tes)
        res.status(200).json(text)
    }
    catch (e) {
        console.error(e)
    }
})

app.put('/n/:id', async (req, res) => {
    try {
        const {id} = req.params
        const text = await tModel.findByIdAndUpdate(id, req.body)
        const textUp = await tModel.findById(id)
        res.status(200).json(textUp)
    }
    catch (e) {
        console.error(e)
    }
})

app.delete('/n/:id', async (req, res) => {
    try {
        const {id} = req.params
        const text = await tModel.findByIdAndDelete(id)
        res.status(200).json(text)
    }
    catch (e) {
        console.error(e)
    }
})




app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})
