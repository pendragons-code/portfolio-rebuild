module.exports = {
	apps: [{
		name: "portfolio",
		script: "./src/loaders/webserver.js",
		watch_delay: 10000,
		ignore_watch: ["node_modules"],
		max_memory_restart: "500M",
		out_file: "./logfile.txt",
		error_file: "./errorfile.txt"
	}]
}
