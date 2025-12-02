const target = process.env.TEST_ENV || 'local';
require(`dotenv/config`)({ path: `.env${target !== 'local' ? `.${target}` : ''}` });