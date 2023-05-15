import { ProjectSecrets } from './interfaces/secrets.interace';

export const getProjectSecrets = (): ProjectSecrets => {
  const secrets: ProjectSecrets = {
    DB_HOST: 'containers-us-west-29.railway.app',
    DB_USER: 'postgres',
    DB_PASSWORD: '2KmhshCPVC3xHIg3Nkgo',
    DB_SCHEMA: 'postgres',
    DB_PORT: 6862,
  };
  return secrets;
};

/**
 * Returns the database configuration object for Knex.
 * @returns {Promise<Object>} A promise that resolves to a configuration object for Knex.
 */
export const getDBConfiguration = () => {
  // Obtains project secrets from Google Cloud Secret Manager
  const projectSecrets: ProjectSecrets = getProjectSecrets();

  // Build configuration object for Knex
  const conf = {
    config: {
      client: 'pg',
      connection: {
        host: projectSecrets?.DB_HOST || '',
        port: projectSecrets?.DB_PORT,
        user: projectSecrets?.DB_USER || '',
        password: projectSecrets?.DB_PASSWORD || '',
      },
    },
  };

  return conf;
};
