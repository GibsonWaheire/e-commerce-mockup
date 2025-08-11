export default function Testimonials() {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-balance">What Parents Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { i:'S', n:'Sarah M.', r:'Mom of 2', t:'Found the most adorable dresses for my daughter at half the price. The quality is amazing!' },
          { i:'M', n:'Mike K.', r:'Dad of 3', t:'Perfect for my growing boys. Affordable and stylish - exactly what we needed!' },
          { i:'L', n:'Lisa P.', r:'Mom of 1', t:'Love the sustainable aspect. My daughter looks adorable and we\'re helping the environment!' },
        ].map(x => (
          <div key={x.n} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {x.i}
              </div>
              <div className="ml-4 text-left">
                <h4 className="font-semibold text-gray-900">{x.n}</h4>
                <p className="text-sm text-gray-500">{x.r}</p>
              </div>
            </div>
            <p className="text-gray-600 italic">“{x.t}”</p>
            <div className="flex justify-center text-yellow-400 mt-4">★★★★★</div>
          </div>
        ))}
      </div>
    </div>
  );
}
