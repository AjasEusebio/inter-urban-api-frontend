import { Link } from 'react-router';
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Interurban Weather</h1>
          <p className="text-blue-100 text-lg">
            El clima de tus destinos favoritos, en un solo lugar.
          </p>
        </div>

        <div className="p-8">
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Planifica tu próximo viaje con datos climáticos precisos. Interurban te ofrece
            pronósticos en tiempo real, recomendaciones personalizadas y alertas
            meteorológicas para que viajes con confianza.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { icon: "⛅", title: "Tiempo Real", desc: "Datos actualizados cada hora" },
              { icon: "📱", title: "Multiplataforma", desc: "Accede desde cualquier dispositivo" },
            ].map((feature, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
                <span className="text-2xl block mb-2">{feature.icon}</span>
                <h3 className="font-semibold text-indigo-700">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          <Link
            to="/weather"
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-center"
          >
            Explorar Destinos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
