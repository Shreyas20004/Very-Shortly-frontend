
import { useState } from 'react';
import { FaLink } from 'react-icons/fa';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');
    try {
      const response = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) throw new Error('Failed to shorten URL');
      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (e) {
      setError('Could not shorten the URL. Please try again.', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-950/80 shadow-lg">
        <div className="flex items-center gap-3">
          <FaLink className="text-2xl text-teal-400" />
          <span className="text-2xl font-bold tracking-tight text-teal-300">Very-shortly</span>
        </div>
        <div className="hidden md:flex gap-6 text-gray-400">
          <a href="#features" className="hover:text-teal-300 transition">Features</a>
          <a href="#how" className="hover:text-teal-300 transition">How it works</a>
          <a href="#contact" className="hover:text-teal-300 transition">Contact</a>
        </div>
      </nav>

      {/* Intro Section */}
      <header className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-teal-300 drop-shadow-lg">Shorten your URLs instantly</h1>
        <p className="max-w-xl text-lg md:text-xl text-gray-400 mb-8">Welcome to <span className="text-teal-400 font-semibold">Very-shortly</span> — the simplest, fastest, and most reliable way to make your links short and shareable. Paste your long URL below and get a tiny link in seconds!</p>

        {/* URL Shortener Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col md:flex-row gap-3 md:gap-0 bg-gray-800/80 rounded-lg shadow-lg p-4 md:p-2">
          <input
            type="url"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1 px-4 py-2 rounded-l-lg md:rounded-l-lg md:rounded-r-none bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-r-lg md:rounded-r-lg md:rounded-l-none bg-teal-500 hover:bg-teal-400 text-gray-900 font-bold transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-400 font-semibold">{error}</div>
        )}

        {/* Shortened URL Result */}
        {shortUrl && (
          <div className="mt-8 bg-gray-900/80 rounded-lg p-4 shadow flex flex-col items-center">
            <span className="text-teal-400 font-semibold mb-2">Your shortened URL:</span>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-mono text-teal-300 underline break-all hover:text-teal-200 transition"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </header>

      {/* Features Section */}
      <section id="features" className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-teal-300 mb-4">Why use Very-shortly?</h2>
        <ul className="grid md:grid-cols-3 gap-6 text-left">
          <li className="bg-gray-800/80 rounded-lg p-4 shadow border-l-4 border-teal-400">
            <span className="font-bold text-teal-300">Fast & Simple</span>
            <p className="text-gray-400 mt-2">No sign-up, no hassle. Just paste and shorten instantly.</p>
          </li>
          <li className="bg-gray-800/80 rounded-lg p-4 shadow border-l-4 border-teal-400">
            <span className="font-bold text-teal-300">Secure</span>
            <p className="text-gray-400 mt-2">Your links are private and never shared with third parties.</p>
          </li>
          <li className="bg-gray-800/80 rounded-lg p-4 shadow border-l-4 border-teal-400">
            <span className="font-bold text-teal-300">Free Forever</span>
            <p className="text-gray-400 mt-2">Enjoy unlimited URL shortening at no cost.</p>
          </li>
        </ul>
      </section>

      {/* How it works Section */}
      <section id="how" className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-teal-300 mb-4">How it works</h2>
        <ol className="list-decimal list-inside text-gray-300 space-y-2">
          <li>Paste your long URL in the box above.</li>
          <li>Click <span className="text-teal-400 font-semibold">Shorten</span>.</li>
          <li>Copy your new, short link and share it anywhere!</li>
        </ol>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-auto bg-gray-950/90 py-6 px-4 text-center text-gray-500 text-sm border-t border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <span>&copy; {new Date().getFullYear()} Very-shortly. All rights reserved.</span>
          <span className="hidden md:inline">|</span>
          <span>
            Made with <span className="text-teal-400">&#10084;</span> by <a href="https://github.com/" className="underline hover:text-teal-300">YourName</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
