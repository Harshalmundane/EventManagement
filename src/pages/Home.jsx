import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    // Fetch featured events (you can modify this to fetch actual featured events from your API)
    fetch("http://localhost:3000/api/getAll?limit=3")
      .then((res) => res.json())
      .then((data) => setFeaturedEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Event Horizon
              </span>
              <span className="block text-2xl md:text-3xl font-medium text-gray-300 mt-4">
                Where experiences come to life
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
              Discover, create, and manage unforgettable events with our powerful
              platform designed for event organizers and attendees alike.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/events"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg md:py-4 md:text-lg md:px-10 transition-all duration-200"
              >
                Browse Events
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-100 bg-gray-800 hover:bg-gray-700 border-gray-700 shadow-lg md:py-4 md:text-lg md:px-10 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Featured Events
            </span>
          </h2>
          
          {featuredEvents.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-200 bg-purple-900 bg-opacity-60 rounded-full">
                        Featured
                      </span>
                      <span className="text-sm text-gray-400">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 mb-5 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center text-gray-400 mb-4">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{event.location}</span>
                      </div>

                      <Link
                        // to={`/events/${event._id}`}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No featured events available</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/events"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
            >
              View All Events
              <svg
                className="ml-3 -mr-1 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Why Choose Us
            </span>
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                ),
                title: "Easy Event Creation",
                description:
                  "Create and manage your events in minutes with our intuitive interface.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Powerful Tools",
                description:
                  "Access to advanced event management tools and analytics.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                ),
                title: "Cloud Powered",
                description:
                  "Your events are always available, accessible from anywhere.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to create your next event?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of organizers who trust our platform to make their
            events unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg md:text-lg transition-all duration-200"
            >
              Get Started for Free
            </Link>
            <Link
              to="/events"
              className="px-8 py-4 border border-gray-300 text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-800 md:text-lg transition-colors duration-200"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;