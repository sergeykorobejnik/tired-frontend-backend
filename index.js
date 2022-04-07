import express from 'express'
import path from "path"
import cors from "cors"
import {parser} from "./utils/parser.js";
import {settings} from "./utils/settings.js";

const __dirname = path.resolve()


const PORT = process.env.PORT ?? 8000
const app = express()


app.use(cors())
app.use(express.json())

let filterState = {}

app.post('/filter-state', async (req, res) => {
    filterState = req.body
    console.log(req.body)
    res.sendStatus(200)

})


app.get('/parsed-data', async (req, res) => {
    const result = await parser(filterState, settings)
    console.log(result)
    res.send(result)
})


app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT}`)
})

