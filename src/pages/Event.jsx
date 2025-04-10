import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState(""); // State to store user role
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/api/getAll")
    .then((res) => res.json())
    .then((data) => setEvents(data))
    .catch((error) => console.error("Error fetching events:", error));
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored as an object
  if (user && user.role) {
    setUserRole(user.role.trim()); // Use correct role name
  }
  console.log("User Role from localStorage:", user?.role); // Debugging
}, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const res = await fetch(`http://localhost:3000/api/delete/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setEvents(events.filter((event) => event._id !== id));
          toast.success("Event deleted successfully!");
        } else {
          toast.error("Failed to delete event.");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("An error occurred while deleting the event.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 sm:text-5xl">
            Upcoming Events
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Discover experiences that inspire you
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-700"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-200 bg-purple-900 bg-opacity-60 rounded-full">
                    {event.category || "Event"}
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
                <p className="text-gray-300 mb-5 flex-grow line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-400">
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

                  <div className="flex items-center text-gray-400">
                    <svg
                      className="w-5 h-5 mr-2 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center mb-5">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-indigo-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        {event.organizer}
                      </p>
                      <p className="text-sm text-gray-400">{event.contact}</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    {event.registrationLink && (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      >
                        Register Now
                      </a>
                    )}

                    {/* Conditionally render Edit & Delete buttons */}
                    {userRole === "Event Poster" && (
                      <>
                        <button
                          onClick={() => navigate(`/update-event/${event._id}`)}
                          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
