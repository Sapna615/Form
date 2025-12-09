import React, { useState } from 'react';

function Navbar({ onLogout }) {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <span className="font-bold text-xl">My Dashboard</span>
      <button onClick={onLogout} className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-blue-100">Logout</button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-200 text-center py-3 mt-8 text-gray-600">
      &copy; {new Date().getFullYear()} My React App. All rights reserved.
    </footer>
  );
}

function Dashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLogout={onLogout} />
      <main className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
        <p className="mb-2">Email: <span className="font-mono">{user.email}</span></p>
        <div className="bg-white shadow rounded p-6 mt-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Dashboard Content</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Access your profile and settings</li>
            <li>View notifications and updates</li>
            <li>Explore more features coming soon!</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function RegisterForm({ onSwitch }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      alert('User already exists with this email!');
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered successfully! You can now login.');
    onSwitch();
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-sm text-blue-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2"
        >
          Register
        </button>
        <button
          type="button"
          className="w-full text-blue-500 hover:underline text-sm"
          onClick={onSwitch}
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}

function ForgotPassword({ onSwitch }) {
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    if (user) {
      alert(`Password reset link sent to: ${email}\n(For demo, password is: ${user.password})`);
    } else {
      alert('No user found with this email!');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2"
        >
          Send Reset Link
        </button>
        <button
          type="button"
          className="w-full text-blue-500 hover:underline text-sm"
          onClick={onSwitch}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [page, setPage] = useState('login');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check credentials
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setLoggedInUser(user);
    } else {
      alert('Invalid email or password!');
    }
  };
  const handleLogout = () => {
    setLoggedInUser(null);
    setEmail('');
    setPassword('');
    setPage('login');
  };
  if (loggedInUser) return <Dashboard user={loggedInUser} onLogout={handleLogout} />;
  if (page === 'register') return <RegisterForm onSwitch={() => setPage('login')} />;
  if (page === 'forgot') return <ForgotPassword onSwitch={() => setPage('login')} />;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-sm text-blue-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2"
        >
          Login
        </button>
        <div className="flex flex-col gap-2 mt-2">
          <button
            type="button"
            className="text-blue-500 hover:underline text-sm"
            onClick={() => setPage('register')}
          >
            New user? Register
          </button>
          <button
            type="button"
            className="text-blue-500 hover:underline text-sm"
            onClick={() => setPage('forgot')}
          >
            Forgot password?
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;