const fs = require('fs');
const { createLogger, transports, format } = require('winston');

class Logger {
    constructor(filename, level = 'info') {
        this.logger = createLogger({
            level: level,
            format: format.combine(
                format.timestamp(),
                format.printf(info => {
                    return `${info.timestamp} - ${info.level}: ${info.message}`;
                })
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: filename })
            ]
        });
    }
}

if (require.main === module) {
    const log = new Logger('all.log', 'debug');
    log.logger.debug('debug');
    log.logger.info('info');
    log.logger.warn('warn');
    log.logger.error('error');
    log.logger.crit('fatal');

    const errorLog = new Logger('error.log', 'error');
    errorLog.logger.error('error');
}

module.exports = Logger;
