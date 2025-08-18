import React from "react";

export default function About() {
  return (
    <div className="bg-[#0f172a] min-h-screen text-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          About Us
        </h1>
        <p className="mb-4 text-lg leading-relaxed">
          Welcome to <span className="text-blue-400 font-semibold">NewsExpress</span>, 
          your one-stop destination to stay updated with the latest happenings 
          around the world. Our platform brings you curated news in categories 
          like <span className="font-semibold">World, Business, Technology, Politics, and Health</span>.
        </p>

        <p className="mb-4 text-lg leading-relaxed">
          All the news articles are powered by the{" "}
          <a
            href="https://developer.nytimes.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            New York Times API
          </a>, ensuring trusted and up-to-date information from one of the most 
          respected news sources globally.
        </p>

        <p className="mb-4 text-lg leading-relaxed">
          This project was created as a learning initiative by{" "}
          <span className="font-semibold text-white">Rohan Sahani</span>, a 
          Computer Science & Engineering student passionate about 
          <span className="text-blue-400"> Web Development and the MERN stack</span>. 
          The goal is to explore how real-world APIs can be integrated to 
          build impactful applications.
        </p>

        <p className="mt-6 text-gray-400 text-sm">
          Disclaimer: This website is for educational purposes only and not 
          affiliated with The New York Times.
        </p>
      </div>
    </div>
  );
}
