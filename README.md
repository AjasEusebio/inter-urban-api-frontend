# Travel Destinations Weather App

A React frontend application built with Vite that displays travel destinations and their weather using data from a backend API and OpenWeatherMap.

## Features

- View popular travel destinations
- See current weather for each destination
- Responsive design

## Prerequisites

- Node.js (v22.12.0)
- npm

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/AjasEusebio/inter-urban-api-frontend
  ```
2. Navigate to the project directory
  ```bash
  cd inter-urban-api-frontend
  ```
3. Install dependencies: 
```bash
npm install dev
```
## Environment Variables Setup

1. Create a  .env.local or update file in the root directory.
2. Add the following variables:
```bash
  VITE_DESTINATIONS_API_URL=http://localhost:3001 #Backend API url
  VITE_OPEN_WEATHER_API=https://api.openweathermap.org
```
## Running the application
### Development
```
npm run dev
```

#
# Cómo aproveché la inteligencia artificial (IA) para optimizar mi flujo de trabajo

**Herramientas usadas**
- Copilot
- DeepSeek
- ChatGPT

## Solución rápido de problemas técnicos

**Debugging asistido**: cuando enfrenté el problema de parámetros undefined al pasar lat/lon entre componentes, la IA me ayudó a:  
- Identificar rápidamente que necesitaba usar `useSearchParams` en lugar de `useParams` para query strings.

## Generación de Código

**Componentes de React listos para usar**: Obtuve implementaciones completas de componentes como:  
- WeatherCard para mostrar datos climáticos  
- Routing con React Router  
- Manejo de estados con `useEffect` y `useState`  

## Recomendaciones de Flujo de Trabajo

### Estructura de proyecto
- Organización modular de componentes  
- Manejo de props entre componentes padres/hijos  

### Mejores Prácticas Implementadas
La IA me ayudó a incorporar:  
- Manejo de errores y loading states  
- Estilización consistente con Tailwind CSS  
- Componentes reutilizables y desacoplados  

## Aceleración en Integración de APIs
- Transformación de datos del backend  
- Manejo de tokens de autenticación  
- Carga de datos  

## Aprendizaje Acelerado
La IA funcionó como un tutor en tiempo real para:  
- Explicar conceptos de React Hooks  
- Clarificar el ciclo de vida de componentes  

## Resultados Obtenidos
- Reducción de tiempo de desarrollo: Soluciones en minutos en lugar de horas  
- Documentación implícita: Explicaciones claras integradas en cada solución  
#
### Demo
![App](./src/assets/InterurbanWeather.gif)
