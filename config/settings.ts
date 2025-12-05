import 'dotenv/config';   // loads .env into process.env

interface Env {
    baseUrl: string;
    loginUrl: string;
    kibanaUrl?: string;
    grafanaUrl?: string;
    username: string;
    password: string;
}

const env: Env = {
    baseUrl: process.env.TEST_BASE_URL || 'https://www.saucedemo.com',
    loginUrl: process.env.TEST_LOGIN_URL || '',
    kibanaUrl: process.env.TEST_KIBANA_URL,
    grafanaUrl: process.env.TEST_GRAFANA_URL,
    username: process.env.TEST_USERNAME || 'standard_user',
    password: process.env.TEST_PASSWORD || 'secret_sauce',
};

export default env;