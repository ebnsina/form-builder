import Link from "next/link";

function Header() {
  return (
    <header className="sticky left-0 top-0 z-50 w-full bg-white p-3">
      <div className="flex items-center justify-between px-4">
        <Link
          className="font-heading block text-2xl font-medium text-slate-800"
          href="/"
        >
          deviser.
        </Link>

        <nav>
          <ul className="flex items-center text-slate-700">
            <li>
              <Link
                className="inline-block rounded-2xl px-4 py-3 transition hover:bg-slate-200"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="inline-block rounded-2xl px-4 py-3 transition hover:bg-slate-200"
                href="/forms"
              >
                Forms
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
