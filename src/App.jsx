import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [userName, setUserName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notification, setNotification] = useState("");
  const [email, setEmail] = useState("");
  const [cancelledAppointments, setCancelledAppointments] = useState([]);
  const [appointmentTab, setAppointmentTab] = useState("upcoming");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [category, setCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedSpecialistForBooking, setSelectedSpecialistForBooking] =
    useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [users, setUsers] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const services = [
    {
      name: "Hair Cut",
      duration: "30 Minutes",
      price: "25€",
      icon: "✂️",
      category: "Hair",
    },
    {
      name: "Hair Coloring",
      duration: "1 Hour",
      price: "45€",
      icon: "🎨",
      category: "Hair",
    },
    {
      name: "Skin Care",
      duration: "45 Minutes",
      price: "35€",
      icon: "🧴",
      category: "Skin",
    },
    {
      name: "Makeup",
      duration: "50 Minutes",
      price: "40€",
      icon: "💄",
      category: "Beauty",
    },
    {
      name: "Nail Care",
      duration: "40 Minutes",
      price: "30€",
      icon: "💅",
      category: "Beauty",
    },
    {
      name: "Massage",
      duration: "1 Hour",
      price: "55€",
      icon: "💆‍♀️",
      category: "Relax",
    },
  ];

  const availableTimes = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
  ];

  const specialists = [
    {
      name: "Emma",
      role: "Hair Stylist",
      icon: "👩🏻",
      experience: "5 years experience",
      rating: "4.9",
      specialty: "Hair cuts, styling and hair coloring",
      availability: "Mon - Fri, 09:00 - 18:00",
      reviews: [
        "Amazing haircut experience!",
        "Very professional and friendly.",
        "I loved the final result.",
      ],
    },
    {
      name: "Daniel",
      role: "Skin Expert",
      icon: "👨🏽",
      experience: "4 years experience",
      rating: "4.8",
      specialty: "Professional skin care treatments",
      availability: "Mon - Sat, 10:00 - 19:00",
      reviews: [
        "My skin feels much better.",
        "Excellent consultation.",
        "Highly recommended specialist.",
      ],
    },
    {
      name: "Sophia",
      role: "Makeup Artist",
      icon: "👩🏼",
      experience: "6 years experience",
      rating: "5.0",
      specialty: "Bridal, event and professional makeup",
      availability: "Tue - Sun, 09:00 - 17:00",
      reviews: [
        "Perfect makeup for my event.",
        "Very talented artist.",
        "Absolutely stunning work.",
      ],
    },
    {
      name: "Lucas",
      role: "Masseur",
      icon: "💆‍♂️",
      experience: "3 years experience",
      rating: "4.7",
      specialty: "Relaxing and therapeutic massage sessions",
      availability: "Mon - Sun, 11:00 - 20:00",
      reviews: [
        "Very relaxing session.",
        "Helped reduce my back pain.",
        "Great atmosphere and service.",
      ],
    },
  ];

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const savedAllBookings =
      JSON.parse(localStorage.getItem("allBookings")) || [];

    setUsers(savedUsers);
    setAllBookings(savedAllBookings);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("allBookings", JSON.stringify(allBookings));
  }, [allBookings]);

  useEffect(() => {
    if (currentUserEmail) {
      localStorage.setItem(
        `appointments_${currentUserEmail}`,
        JSON.stringify(appointments)
      );
    }
  }, [appointments, currentUserEmail]);

  useEffect(() => {
    if (currentUserEmail) {
      localStorage.setItem(
        `cancelledAppointments_${currentUserEmail}`,
        JSON.stringify(cancelledAppointments)
      );
    }
  }, [cancelledAppointments, currentUserEmail]);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification("");
      }, 2500);
    }
  }, [notification]);

  const BottomNav = () => (
    <div className="bottom-nav">
      <button
        className={activeTab === "home" ? "active-nav" : ""}
        onClick={() => {
          setScreen("home");
          setSelectedService("");
          setSelectedAppointment(null);
          setSelectedSpecialist(null);
          setActiveTab("home");
        }}
      >
        Home
      </button>

      <button
        className={activeTab === "appointments" ? "active-nav" : ""}
        onClick={() => {
          setScreen("home");
          setSelectedService("myAppointments");
          setSelectedAppointment(null);
          setSelectedSpecialist(null);
          setActiveTab("appointments");
        }}
      >
        Appointments
      </button>

      <button
        className={activeTab === "profile" ? "active-nav" : ""}
        onClick={() => {
          setScreen("profile");
          setSelectedAppointment(null);
          setSelectedSpecialist(null);
          setActiveTab("profile");
        }}
      >
        Profile
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className={darkMode ? "container dark" : "container"}>
        <div className="phone">
          <div className="screen splash-screen">
            <h1 className="logo-text">BELLEZZA STUDIO</h1>
            <p className="slogan">Book your appointments easily...</p>
            <div className="loader"></div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "welcome") {
    return (
      <div className={darkMode ? "container dark" : "container"}>
        <div className="phone">
          <div className="screen welcome-screen">
            <h1 className="logo">Bellezza Studio</h1>
            <p className="subtitle">We love to spoil you...</p>
            <button onClick={() => setScreen("login")}>Get Started</button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "login") {
    return (
      <div className={darkMode ? "container dark" : "container"}>
        <div className="phone">
          <div className="screen auth-screen">
            <h1 className="title">Login</h1>

            <div className="auth-card">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="error-text">{error}</p>}

              <button
                onClick={() => {
                  if (email.trim() === "" || password.trim() === "") {
                    setError("Please fill all fields");
                    return;
                  }

                  const foundUser = users.find(
                    (user) => user.email === email && user.password === password
                  );

                  if (!foundUser) {
                    setError("Account not found or wrong password");
                    return;
                  }

                  const userAppointments =
                    JSON.parse(
                      localStorage.getItem(`appointments_${foundUser.email}`)
                    ) || [];

                  const userCancelledAppointments =
                    JSON.parse(
                      localStorage.getItem(
                        `cancelledAppointments_${foundUser.email}`
                      )
                    ) || [];
                  setCurrentUserEmail(foundUser.email);
                  setUserName(foundUser.name);
                  setAppointments(userAppointments);
                  setCancelledAppointments(userCancelledAppointments);
                  setError("");
                  setScreen("home");
                  setActiveTab("home");
                }}
              >
                Login
              </button>

              <p className="auth-link">
                Don&apos;t have an account?{" "}
                <span
                  onClick={() => {
                    setEmail("");
                    setPassword("");
                    setError("");
                    setScreen("register");
                  }}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "register") {
    return (
      <div className={darkMode ? "container dark" : "container"}>
        <div className="phone">
          <div className="screen auth-screen">
            <h1 className="title">Create Account</h1>

            <div className="auth-card">
              <input
                type="text"
                placeholder="Full Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="error-text">{error}</p>}

              <button
                onClick={() => {
                  if (
                    userName.trim() === "" ||
                    email.trim() === "" ||
                    password.trim() === ""
                  ) {
                    setError("Please fill all fields");
                    return;
                  }

                  const existingUser = users.find(
                    (user) => user.email === email
                  );

                  if (existingUser) {
                    setError("This email is already registered");
                    return;
                  }

                  setUsers([
                    ...users,
                    {
                      name: userName,
                      email,
                      password,
                    },
                  ]);
                  setCurrentUserEmail(email);
                  setAppointments([]);
                  setCancelledAppointments([]);
                  setError("");
                  setScreen("home");
                  setActiveTab("home");
                }}
              >
                Register
              </button>

              <p className="auth-link">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setEmail("");
                    setPassword("");
                    setError("");
                    setScreen("login");
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "profile") {
    return (
      <div className={darkMode ? "container dark" : "container"}>
        <div className="phone">
          <div className="screen">
            <h1 className="title">Profile</h1>

            <div className="profile-card">
              <div className="avatar">
                {(userName || "U").charAt(0).toUpperCase()}
              </div>

              <h2>{userName || "User"}</h2>
              <p>{email}</p>

              <button onClick={() => setShowLogoutModal(true)}>Logout</button>
            </div>
          </div>

          <BottomNav />

          {showLogoutModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Are you sure?</h2>

                <div className="modal-buttons">
                  <button onClick={() => setShowLogoutModal(false)}>
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      setCurrentUserEmail("");
                      setShowLogoutModal(false);
                      setEmail("");
                      setPassword("");
                      setUserName("");
                      setError("");
                      setAppointments([]);
                      setCancelledAppointments([]);
                      setSelectedService("");
                      setSelectedAppointment(null);
                      setActiveTab("home");
                      setScreen("welcome");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === "home") {
    if (selectedAppointment !== null) {
      const appointment = appointments[selectedAppointment];

      if (!appointment) {
        return (
          <div className={darkMode ? "container dark" : "container"}>
            <div className="phone">
              <div className="screen">
                <h1 className="title">Appointment not found</h1>
                <button
                  onClick={() => {
                    setSelectedAppointment(null);
                    setSelectedService("myAppointments");
                    setActiveTab("appointments");
                  }}
                >
                  Back
                </button>
              </div>
              <BottomNav />
            </div>
          </div>
        );
      }

      const updateDate = newDate || appointment.date;
      const updateTime = newTime || appointment.time;

      const updateConflict = allBookings.some(
        (booking) =>
          booking.date === updateDate &&
          booking.time === updateTime &&
          booking.specialist === appointment.specialist &&
          !(
            booking.date === appointment.date &&
            booking.time === appointment.time &&
            booking.specialist === appointment.specialist
          )
      );

      return (
        <div className={darkMode ? "container dark" : "container"}>
          <div className="phone">
            <div className="screen">
              {notification && (
                <div className="notification">{notification}</div>
              )}

              <button
                className="back-btn"
                onClick={() => {
                  setSelectedAppointment(null);
                  setSelectedService("myAppointments");
                  setActiveTab("appointments");
                }}
              >
                ← Back
              </button>

              <h1 className="title">Manage Appointment</h1>

              <div className="booking-card">
                <h2>
                  {appointment.icon} {appointment.service}
                </h2>

                <p>👤 {appointment.specialist}</p>
                <p>📅 {appointment.date}</p>
                <p>🕐 {appointment.time}</p>

                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />

                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                >
                  <option value="">Select new time</option>
                  {availableTimes.map((slot) => {
                    const isBooked = allBookings.some(
                      (booking) =>
                        booking.date === updateDate &&
                        booking.time === slot &&
                        booking.specialist === appointment.specialist &&
                        !(
                          booking.date === appointment.date &&
                          booking.time === appointment.time &&
                          booking.specialist === appointment.specialist
                        )
                    );

                    return (
                      <option key={slot} value={slot} disabled={isBooked}>
                        {isBooked ? `${slot} - Booked` : slot}
                      </option>
                    );
                  })}
                </select>

                {error && <p className="error-text">{error}</p>}

                <button
                  onClick={() => {
                    if (updateConflict) {
                      setError("This time slot is already booked");
                      return;
                    }

                    const updatedAppointment = {
                      ...appointment,
                      date: updateDate,
                      time: updateTime,
                    };

                    const updatedAppointments = appointments.map(
                      (item, index) =>
                        index === selectedAppointment
                          ? updatedAppointment
                          : item
                    );

                    const updatedAllBookings = allBookings.map((booking) => {
                      if (
                        booking.date === appointment.date &&
                        booking.time === appointment.time &&
                        booking.specialist === appointment.specialist
                      ) {
                        return {
                          date: updateDate,
                          time: updateTime,
                          specialist: appointment.specialist,
                        };
                      }

                      return booking;
                    });

                    setAppointments(updatedAppointments);
                    setAllBookings(updatedAllBookings);
                    setNotification("Appointment Updated");
                    setError("");
                    setNewDate("");
                    setNewTime("");
                    setSelectedAppointment(null);
                    setSelectedService("myAppointments");
                    setActiveTab("appointments");
                  }}
                >
                  Save Changes
                </button>

                <button
                  onClick={() => {
                    const updatedAppointments = appointments.filter(
                      (_, i) => i !== selectedAppointment
                    );

                    const updatedAllBookings = allBookings.filter(
                      (booking) =>
                        !(
                          booking.date === appointment.date &&
                          booking.time === appointment.time &&
                          booking.specialist === appointment.specialist
                        )
                    );

                    setAppointments(updatedAppointments);
                    setAllBookings(updatedAllBookings);
                    setCancelledAppointments([
                      ...cancelledAppointments,
                      {
                        ...appointment,
                        status: "Cancelled",
                      },
                    ]);

                    setNotification("Appointment Cancelled");
                    setSelectedAppointment(null);
                    setSelectedService("myAppointments");
                    setActiveTab("appointments");
                  }}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>

            <BottomNav />
          </div>
        </div>
      );
    }

    if (selectedService === "myAppointments") {
      return (
        <div className={darkMode ? "container dark" : "container"}>
          <div className="phone">
            <div className="screen appointments-screen">
              {notification && (
                <div className="notification">{notification}</div>
              )}

              <h1 className="title">My Appointments</h1>

              <div className="tabs">
                <button
                  className={appointmentTab === "upcoming" ? "active-tab" : ""}
                  onClick={() => setAppointmentTab("upcoming")}
                >
                  Upcoming
                </button>

                <button
                  className={appointmentTab === "cancelled" ? "active-tab" : ""}
                  onClick={() => setAppointmentTab("cancelled")}
                >
                  Cancelled
                </button>
              </div>

              <div className="appointments-list">
                {appointmentTab === "upcoming" &&
                  appointments.map((item, index) => (
                    <div
                      className="service-card appointment-card"
                      key={index}
                      onClick={() => setSelectedAppointment(index)}
                    >
                      <h2>
                        {item.icon} {item.service}
                      </h2>

                      <p>📅 {item.date || "No date selected"}</p>
                      <p>🕒 {item.time || "No time selected"}</p>
                      <p>👤 {item.specialist || "No specialist selected"}</p>
                      <p>💰 {item.price || ""}</p>

                      <span className="status confirmed">{item.status}</span>
                    </div>
                  ))}

                {appointmentTab === "upcoming" && appointments.length === 0 && (
                  <p className="empty-text">No upcoming appointments.</p>
                )}

                {appointmentTab === "cancelled" &&
                  cancelledAppointments.map((item, index) => (
                    <div className="service-card appointment-card" key={index}>
                      <h2>
                        {item.icon} {item.service}
                      </h2>

                      <p>📅 {item.date || "No date selected"}</p>
                      <p>🕒 {item.time || "No time selected"}</p>
                      <p>👤 {item.specialist || "No specialist selected"}</p>
                      <p>💰 {item.price || ""}</p>

                      <span className="status cancelled">{item.status}</span>
                    </div>
                  ))}

                {appointmentTab === "cancelled" &&
                  cancelledAppointments.length === 0 && (
                    <p className="empty-text">No cancelled appointments.</p>
                  )}
              </div>
            </div>

            <BottomNav />
          </div>
        </div>
      );
    }

    if (selectedService !== "") {
      const selectedServiceInfo = services.find(
        (service) => service.name === selectedService
      );

      const bookedTimes = allBookings
        .filter(
          (item) =>
            item.date === date &&
            item.specialist === selectedSpecialistForBooking
        )
        .map((item) => item.time);

      if (confirmed) {
        return (
          <div className={darkMode ? "container dark" : "container"}>
            <div className="phone">
              <div className="screen">
                <div className="success-card">
                  <h1>Appointment Confirmed</h1>

                  <p>Your appointment for {selectedService} has been booked.</p>
                  <p className="email-confirmation">📧 {emailConfirmation}</p>

                  <button
                    onClick={() => {
                      setConfirmed(false);
                      setSelectedService("");
                      setSelectedSpecialistForBooking("");
                      setDate("");
                      setTime("");
                      setActiveTab("home");
                    }}
                  >
                    Back Home
                  </button>

                  <button
                    onClick={() => {
                      setConfirmed(false);
                      setSelectedService("myAppointments");
                      setActiveTab("appointments");
                    }}
                  >
                    My Appointments
                  </button>

                  <button
                    onClick={() => {
                      setConfirmed(false);
                      setScreen("profile");
                      setActiveTab("profile");
                    }}
                  >
                    Profile
                  </button>
                </div>
              </div>

              <BottomNav />
            </div>
          </div>
        );
      }

      return (
        <div className={darkMode ? "container dark" : "container"}>
          <div className="phone">
            <div className="screen appointments-screen">
              <button
                className="back-btn"
                onClick={() => {
                  setSelectedService("");
                  setError("");
                  setDate("");
                  setTime("");
                  setActiveTab("home");
                }}
              >
                ← Back
              </button>

              <h1 className="title">Book Appointment</h1>

              <div className="booking-card booking-details-card">
                <div className="booking-service-header">
                  <div className="booking-big-icon">
                    {selectedServiceInfo?.icon}
                  </div>

                  <div>
                    <h2>{selectedService}</h2>
                    <p>{selectedServiceInfo?.duration}</p>
                    <span>{selectedServiceInfo?.price}</span>
                  </div>
                </div>

                <div className="booking-divider"></div>

                <label className="booking-label">Specialist</label>

                <select
                  value={selectedSpecialistForBooking}
                  onChange={(e) =>
                    setSelectedSpecialistForBooking(e.target.value)
                  }
                >
                  <option value="">Choose Specialist</option>

                  {specialists.map((person, index) => (
                    <option key={index} value={person.name}>
                      {person.name} - {person.role}
                    </option>
                  ))}
                </select>

                <label className="booking-label">Date</label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setTime("");
                  }}
                />

                <label className="booking-label">Time</label>

                <select value={time} onChange={(e) => setTime(e.target.value)}>
                  <option value="">Select time</option>

                  {availableTimes.map((slot) => (
                    <option
                      key={slot}
                      value={slot}
                      disabled={bookedTimes.includes(slot)}
                    >
                      {bookedTimes.includes(slot) ? `${slot} - Booked` : slot}
                    </option>
                  ))}
                </select>

                {error && <p className="error-text">{error}</p>}

                <button
                  onClick={() => {
                    if (!selectedSpecialistForBooking || !date || !time) {
                      setError("Please select specialist, date and time");
                      return;
                    }

                    if (bookedTimes.includes(time)) {
                      setError("This time slot is already booked");
                      return;
                    }

                    const newAppointment = {
                      service: selectedService,
                      date,
                      time,
                      specialist: selectedSpecialistForBooking,
                      duration: selectedServiceInfo?.duration,
                      price: selectedServiceInfo?.price,
                      icon: selectedServiceInfo?.icon,
                      status: "Confirmed",
                    };

                    const newGlobalBooking = {
                      date,
                      time,
                      specialist: selectedSpecialistForBooking,
                    };

                    setAppointments([...appointments, newAppointment]);
                    setAllBookings([...allBookings, newGlobalBooking]);

                    setEmailConfirmation(
                      `Confirmation email sent to ${
                        email || "your email address"
                      }`
                    );

                    setError("");
                    setConfirmed(true);
                  }}
                >
                  Confirm Appointment
                </button>
              </div>
            </div>

            <BottomNav />
          </div>
        </div>
      );
    }

    if (selectedSpecialist !== null) {
      return (
        <div className={darkMode ? "container dark" : "container"}>
          <div className="phone">
            <div className="screen">
              <button
                className="back-btn"
                onClick={() => setSelectedSpecialist(null)}
              >
                ← Back
              </button>

              <div className="specialist-profile">
                <div className="big-specialist-avatar">
                  {selectedSpecialist.icon}
                </div>

                <h1>{selectedSpecialist.name}</h1>
                <p>{selectedSpecialist.role}</p>

                <div className="profile-stats">
                  <div>
                    <h3>⭐ {selectedSpecialist.rating}</h3>
                    <p>Rating</p>
                  </div>

                  <div>
                    <h3>{selectedSpecialist.experience}</h3>
                    <p>Experience</p>
                  </div>
                </div>

                <div className="about-card">
                  <h3>About</h3>
                  <p>{selectedSpecialist.specialty}</p>
                </div>

                <div className="about-card">
                  <h3>Availability</h3>
                  <p>📅 {selectedSpecialist.availability}</p>
                </div>

                <div className="about-card">
                  <h3>Reviews</h3>

                  {selectedSpecialist.reviews.map((review, index) => (
                    <p key={index}>⭐ {review}</p>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedSpecialistForBooking(selectedSpecialist.name);
                    setSelectedSpecialist(null);
                    setSelectedService("");
                    setCategory("All");
                    setActiveTab("home");
                  }}
                >
                  Book with {selectedSpecialist.name}
                </button>
              </div>
            </div>

            <BottomNav />
          </div>
        </div>
      );
    }

    return (
      <div className={darkMode ? "container dark" : "container"}>
        <div className="phone">
          <div className="screen">
            <div className="header">
              <h2>Hello, {userName || "User"} !</h2>
              <p>Find your service</p>

              <button
                className="theme-btn"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? " Light" : " Dark"}
              </button>

              <input
                className="search-input"
                type="text"
                placeholder="Search service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="categories">
                {["All", "Hair", "Beauty", "Skin", "Relax"].map((cat) => (
                  <button
                    key={cat}
                    className={category === cat ? "active-category" : ""}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="stats-row">
              <div className="stat-card">
                <h3>{services.length}</h3>
                <p>Services</p>
              </div>

              <div className="stat-card">
                <h3>{specialists.length}</h3>
                <p>Experts</p>
              </div>

              <div className="stat-card">
                <h3>{appointments.length}</h3>
                <p>Bookings</p>
              </div>
            </div>

            <div className="specialists">
              {specialists.map((person, index) => (
                <div
                  className="specialist-card"
                  key={index}
                  onClick={() => setSelectedSpecialist(person)}
                >
                  <div className="specialist-avatar">{person.icon}</div>
                  <h4>{person.name}</h4>
                  <p>{person.role}</p>
                </div>
              ))}
            </div>

            <div className="section-header">
              <h3>
                {category === "All"
                  ? "Popular Services"
                  : `${category} Services`}
              </h3>
            </div>

            <div className="services-list">
              {services
                .filter((service) => {
                  const matchesCategory =
                    category === "All" || service.category === category;

                  const matchesSearch = service.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

                  return matchesCategory && matchesSearch;
                })
                .map((service, index) => (
                  <div className="service-card" key={index}>
                    <div className="service-top">
                      <div className="service-icon">{service.icon}</div>

                      <div>
                        <h2>{service.name}</h2>
                        <p>{service.duration}</p>
                      </div>
                    </div>

                    <div className="service-bottom">
                      <span>{service.price}</span>

                      <button
                        onClick={() => {
                          setSelectedService(service.name);
                          setConfirmed(false);
                          setDate("");
                          setTime("");
                          setError("");
                        }}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <BottomNav />
        </div>
      </div>
    );
  }
}

export default App;
