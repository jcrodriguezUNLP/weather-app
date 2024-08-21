import { ReactNode } from "react";

// Tipo para el parámetro error
export type ErrorWithMessage = {
  message: string;
};

// Tipo para el parámetro request en las funciones de API
export type RequestWithURL = {
  url: string;
};

// Tipo para coordenadas geográficas
export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type City = {
  id?: number;
  coordinates: Coordinates;
};

export type Cities = City[];

export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type RootLayoutProps = {
  children: ReactNode;
};

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

export type Users = User[];
