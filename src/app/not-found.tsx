import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen text-center">
      <div className="flex flex-col my-auto">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link className="underline" href="/">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
}
