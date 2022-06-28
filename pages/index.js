import Navbar from "../components/Navbar";
import { BookOpenIcon, UsersIcon } from "@heroicons/react/outline";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-9xl py-10 px-3 lg:py-4 lg:px-2 lg:pt-12 ">
        <div className="grid grid-cols-2 gap-6">
          <button
            className="bg-gray-700 text-white h-80 font-bold uppercase"
            type="submit"
            onClick={() => router.push("/books")}
          >
            <BookOpenIcon className="h-20 w-20 text-center mx-auto" />
            View books
          </button>
          <button
            className="bg-gray-700 text-white font-bold uppercase"
            type="submit"
            onClick={() => router.push("/authors")}
          >
            <UsersIcon className="h-20 w-20 mx-auto" />
            View authors
          </button>
        </div>
      </div>
    </>
  );
}
