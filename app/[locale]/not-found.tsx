export default function LocaleNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">404</p>
      <h1 className="mt-3 text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-4 text-gray-600">
        This page is unavailable in the selected language.
      </p>
    </main>
  );
}
