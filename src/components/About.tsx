export default function About() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Who We Are</h2>
          <p className="text-xl text-gray-300">
            A passionate team of developers, artists, and storytellers crafting
            the next generation of gaming experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-red-500/50 transition-colors">
              <h3 className="text-2xl font-semibold mb-4 text-red-400">
                Innovation
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Pushing boundaries in game development with cutting-edge
                technology and creative gameplay mechanics. We&apos;re not afraid to
                challenge conventions.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-red-500/50 transition-colors">
              <h3 className="text-2xl font-semibold mb-4 text-red-400">
                Quality
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Delivering polished, engaging experiences that meet the highest
                standards of gaming excellence. Every detail matters in our
                creative process.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-red-500/50 transition-colors">
              <h3 className="text-2xl font-semibold mb-4 text-red-400">
                Community
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Building strong relationships with our players and creating
                games that bring people together. Your feedback shapes our
                games.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
