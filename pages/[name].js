import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../components/Navbar";
import bookService from "../service/bookService";
import Image from "next/image";

export default function Books({ books }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-9xl py-10 px-3 lg:py-4 lg:px-2 lg:pt-12 ">
        <h1 className="text-center font-bold text-lg">
          Автор: {router.asPath.split("/")[1].replaceAll("_", " ")}
        </h1>

        <button
          className="bg-gray-700 text-white rounded-sm my-3 py-2 px-2"
          onClick={() => setOpen(!open)}
        >
          Прикажи опис на книгите
        </button>

        {books
          .filter(
            (v, i, a) =>
              a.findIndex((v2) => v.book.value === v2.book.value) === i
          )
          .map((b) => {
            return (
              <div className="border border-gray-700 p-10 ">
                <div className="h-36 w-36 relative">
                  <Image src={b.thumbnail.value} layout="fill" />
                </div>

                <h1 className="font-bold text-center">
                  {b.book.value.split("/")[4].replaceAll("_", " ")}
                </h1>
                {open ? (
                  <div className="text-justify">{b.abstract.value}</div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}

export function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export const getStaticProps = async ({ params }) => {
  const books = await bookService
    .getBooksByAuthorWithAbstract(params.name)
    .then((res) => {
      return res.data.results.bindings;
    });
  return {
    props: {
      books: books,
    },
    revalidate: 30,
  };
};
