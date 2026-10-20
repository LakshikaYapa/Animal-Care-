function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-teal-50 p-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-teal-700">
          Animal Care 🐾
        </h1>

        <p className="mt-4 text-gray-600">
          Caring for animals, together.
        </p>

        <button
          type="button"
          className="mt-6 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
        >
          Get Started
        </button>
      </section>
    </main>
  )
}

export default App