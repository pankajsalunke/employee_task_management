import React from "react";

const HeroSection = () => {
  return (
    <section className="text-center mt-16 px-6">
      <h2 className="text-4xl md:text-6xl font-bold">
        Find Your Focus, Fuel Your Progress
      </h2>
      <p className="mt-4 text-lg max-w-2xl mx-auto">
        Forge success through seamless collaboration. Our platform empowers
        teams to achieve collective brilliance effortlessly.
      </p>
      <div className="mt-6 space-x-4">
        <button className="bg-white hover:bg-gradient-to-r from-purple-200 to-pink-300 text-purple-600 hover:text-purple-800 px-6 py-3 rounded-full">
          Learn More
        </button>
        <button className="border px-6 py-3 rounded-full hover:bg-amber-50 hover:text-purple-800">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
