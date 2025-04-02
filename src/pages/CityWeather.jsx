import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import axios from 'axios';

function CityWeather({ user }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_DESTINATIONS_API_URL}/weather/detail?lat=${lat}&lon=${lon}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(response => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        setError('Error al cargar el pronóstico');
        setLoading(false);
      });
  }, [user, lat, lon]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-700">Cargando pronóstico...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
        <p className="text-red-500 text-lg font-medium mb-4">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  );

  if (!weather) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
        <p className="text-gray-700 text-lg">No se encontraron datos del clima</p>
      </div>
    </div>
  );

  const groupedByDay = {};
  weather.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!groupedByDay[date]) {
      groupedByDay[date] = [];
    }
    groupedByDay[date].push(item);
  });

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-gray-100 text-indigo-600 font-medium py-2 px-4 rounded-lg shadow transition flex items-center mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Regresar
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Pronóstico para {weather.city.name}
          </h1>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Condiciones actuales</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <p className="text-5xl font-bold mr-4">{Math.round(weather.list[0].main.temp)}°C</p>
                <div>
                  <p className="text-xl capitalize">{weather.list[0].weather[0].description}</p>
                  <p className="text-blue-100">Sensación: {Math.round(weather.list[0].main.feels_like)}°C</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-200">Humedad</p>
                  <p>{weather.list[0].main.humidity}%</p>
                </div>
                <div>
                  <p className="text-blue-200">Viento</p>
                  <p>{weather.list[0].wind.speed} m/s</p>
                </div>
                <div>
                  <p className="text-blue-200">Presión</p>
                  <p>{weather.list[0].main.pressure} hPa</p>
                </div>
                <div>
                  <p className="text-blue-200">Visibilidad</p>
                  <p>{(weather.list[0].visibility / 1000).toFixed(1)} km</p>
                </div>
              </div>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@4x.png`}
              alt={weather.list[0].weather[0].description}
              className="w-40 h-40"
            />
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedByDay).map(([date, forecasts]) => (
            <div key={date} className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">{formatDate(date)}</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {forecasts.map((forecast, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-3 text-center hover:shadow-md transition">
                    <p className="font-medium text-gray-700">{formatTime(forecast.dt_txt)}</p>
                    <div className="flex flex-col items-center mt-2">
                      <img
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                        alt={forecast.weather[0].description}
                        className="w-12 h-12 mx-auto"
                      />
                      <span className="text-xl font-bold text-gray-800 mt-1">{Math.round(forecast.main.temp)}°C</span>
                      <p className="text-sm capitalize text-gray-600 mt-1">{forecast.weather[0].description}</p>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Mín: {forecast.main.temp_min}°C</p>
                      <p>Máx: {forecast.main.temp_max}°C</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CityWeather;
