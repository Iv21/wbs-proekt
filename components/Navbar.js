import {
  ArrowCircleLeftIcon,
  ArrowLeftIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="sticky top-0 bg-gray-700 h-10 text-white z-50">
      <div className="container mx-auto flex max-w-7xl ">
        <ul className="inline-flex list-none">
          <li>
            <button
              onClick={() => {
                router.back();
              }}
            >
              <ArrowCircleLeftIcon className="h-10 w-10" />
            </button>
            <button
              onClick={() => {
                router.push("/");
              }}
            >
              <HomeIcon className="h-10 w-10" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
