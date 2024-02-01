import winston from "winston"

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "combined.log",
            maxsize: 1048576,
            maxFiles: 5
        })

    ]
})
export default logger