import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Weather({ user }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_DESTINATIONS_API_URL}/weather`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(response => {
        setCities(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
        setError('Error al cargar los datos del clima');
        setLoading(false);
      });
  }, [user]);

  const handleCityClick = (city) => {
    navigate(`/weather/detail?lat=${city.lat}&lon=${city.long}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-xl shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Clima en Ciudades Populares</h2>
          <p className="text-blue-100">Selecciona una ciudad para ver el pronóstico detallado.</p>
        </div>

        <div className="bg-white p-6 rounded-b-xl shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              {error}
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                Intentar nuevamente
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cities.map(city => (
                <div
                  key={city.id}
                  className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02] group"
                  onClick={() => handleCityClick(city)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
                        {city.city_name}
                      </h3>
                      <p className="text-sm text-gray-500">{city.state}</p>
                    </div>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {city.weather?.weather[0].main}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-3xl font-bold text-gray-700">
                      {Math.round(city.weather.main.temp)}°C
                    </span>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Sensación: {Math.round(city.weather.main.feels_like)}°C
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {city.weather?.weather[0].description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-50 flex justify-between text-xs text-gray-500">
                    <span>Humedad: {city.weather.main.humidity}%</span>
                    <span>Viento: {city.weather.wind.speed} m/s</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-white hover:bg-gray-100 text-indigo-600 font-medium py-2 px-4 rounded-lg shadow transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default Weather;
