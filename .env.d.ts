declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    OPENWEATHER_API_KEY: string;
    GEOCAGE_API_KEY: string;
    COUNTRYSTATECITY_API_KEY: string;
  }
}
