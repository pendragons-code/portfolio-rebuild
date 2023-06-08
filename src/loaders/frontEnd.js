const { rateLimit } = require("express-rate-limit")
const { readdirSync } = require("fs")
const { frontEndRateLimit } = require("../../configuration/rateLimit.json")
const express = require("express")
const routeFrontEnd = express.Router()

const limiter = rateLimit({
	windowMs: frontEndRateLimit.windowMinutes * 60000,
	max: frontEndRateLimit.maxWindowRequest,
	standardHeaders: frontEndRateLimit.standardHeaders,
	legacyHeaders: frontEndRateLimit.legacyHeaders,
	message: frontEndRateLimit.message
})

routeFrontEnd.use(limiter)

const loaderFrontEndFolder = readdirSync("./src/frontEnd/pageLoader")
for(dirs of loaderFrontEndFolder) {
	let loaderFrontEndFile = readdirSync(`./src/frontEnd/pageLoader/${dirs}`).filter(files => files.endsWith(".js"))
	for(file of loaderFrontEndFile) {
		const { execute, name } = require(`../frontEnd/pageLoader/${dirs}/${file}`)
		routeFrontEnd.get(`/${name}`, async (req, res) => {
			execute(req, res)
		})
	}
}

module.exports = routeFrontEnd
