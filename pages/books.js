import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import bookService from "../service/bookService";

export default function Books({ books }) {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-9xl py-10 px-3 lg:py-4 lg:px-2 lg:pt-12 ">
        <div className="grid grid-cols-2 gap-2">
          {books.map((b) => {
            return (
              <Link href={`/${b.authors.value.split("/")[4]}`}>
                <div className="border-2 border-gray-700 bg-white rounded-md text-center">
                  <p className="font-bold">Име на книгата:</p>
                  <h1> {b.book.value.split("/")[4].replaceAll("_", " ")}</h1>
                  <p className="font-bold">Автор:</p>
                  <h3> {b.authors.value.split("/")[4].replaceAll("_", " ")}</h3>
                  {b.publishers.value ? (
                    <>
                      <p className="font-bold">Издавач:</p>
                      <h4>{b.publishers.value.split("/")[4]}</h4>
                    </>
                  ) : (
                    <p className="font-bold">Издавач: /</p>
                  )}
                  <button
                    className="bg-gray-700 text-white rounded-sm my-3 py-2 px-2"
                    onClick={() =>
                      router.push(`/${b.authors.value.split("/")[4]}`)
                    }
                  >
                    Види повеќе книги
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const books = await bookService.getBooks().then((res) => {
    return res.data.results.bindings;
  });

  return {
    props: {
      books: books,
    },
    revalidate: 30,
  };
}
