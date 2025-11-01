import express from 'express'
import {config} from '@repo/config'

const app = express();

app.listen(config.BACKEND_PORT, () => {
    console.log(`Backend started at Port ${config.BACKEND_PORT}`)
})