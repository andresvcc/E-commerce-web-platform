//  Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
const microServices =  [
    'bff-users',
    'health-checker',
    'ms-users',
	'ms-organisations'
]

module.exports = {
	apps: microServices.map((microService, index)=>({
		name: microService,
		script: `cd ${microService} && npm run start:dev`,
		instances: 1,
		exec_mode: 'fork_mode',
		watch: false,
		autorestart: true,
		max_memory_restart: '1G',
		error_file: 'errors.txt',
		out_file: 'logs.txt',
		cron_restart: '0 */4 * * *',
		env: {
		  PORT: (3000 + index),
		  NODE_ENV: 'local',
		  AUTH_SALT: 'secret',
		  BUS_TYPE: 'nats',
		}
	}))
};
