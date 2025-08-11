import Section from '../components/Section.jsx';

export default function AboutPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">About T-Tots Mtumba Collection</h1>
          <p className="text-gray-600">Adorable, sustainable kids' mtumba fashion</p>
        </header>

        {/* Brand Story */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Our Story</h2>
          <p className="text-gray-700">We curate high-quality pre-loved children's clothing to make sustainability simple for parents. Each piece goes through a strict selection and hygiene process so your little ones enjoy comfort, style, and safety.</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><span className="font-medium">Sustainability:</span> We extend garment lifecycles and reduce waste.</li>
            <li><span className="font-medium">Grading Policy:</span> Grade A (like-new), Grade B (light wear). Only our best makes it online.</li>
            <li><span className="font-medium">Sourcing:</span> Trusted local partners and community donations.</li>
            <li><span className="font-medium">Hygiene:</span> Cleaned, steamed, and inspected before listing.</li>
          </ul>
        </div>

        {/* Team Block */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[{n:'Tina',r:'Founder'},{n:'Tom',r:'Curation Lead'}].map(m => (
              <div key={m.n} className="card p-5">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold mb-3">{m.n[0]}</div>
                <div className="font-semibold">{m.n}</div>
                <div className="text-gray-600 text-sm">{m.r}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>
          {[
            {q:'What is your return policy?', a:'Free returns within 7 days if items are unworn and tags intact.'},
            {q:'How do you grade items?', a:'Grade A: like-new; Grade B: minor wear. All items are clean and inspected.'},
            {q:'How should I wash items?', a:'Machine wash cold, gentle cycle. Air dry recommended to preserve fabrics.'},
          ].map((f, i) => (
            <details key={i} className="rounded-xl border border-gray-200 p-4">
              <summary className="cursor-pointer font-medium text-gray-900">{f.q}</summary>
              <p className="mt-2 text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {t:'Quality Assured', e:'✔️'},
            {t:'Hygiene First', e:'🧼'},
            {t:'Eco-Friendly', e:'🌱'},
          ].map((b) => (
            <div key={b.t} className="card p-5 text-center">
              <div className="text-2xl mb-2">{b.e}</div>
              <div className="font-semibold text-gray-900">{b.t}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
