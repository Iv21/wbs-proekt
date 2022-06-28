import Image from "next/image";
import bookService from "../service/bookService";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

export default function Home({ authors }) {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-9xl py-10 px-3 lg:py-4 lg:px-2 lg:pt-12 ">
        <div className="grid grid-cols-4 gap-2 ">
          {authors.slice(100, 200).map((a, indx) => {
            return (
              <>
                <div
                  key={indx}
                  className="grid grid-rows border border-gray-700 rounded-md items-center justify-center "
                >
                  <div className={"relative h-36 w-60 lg:h-60"}>
                    <Image src={a.thumbnail.value} layout="fill" />
                  </div>
                  <div className="mt-auto  text-center">
                    <div className="h-16 text-sm font-semibold capitalize text-gray-800">
                      {a.author.value.split("/")[4]}
                    </div>
                  </div>
                  <button
                    className="bg-gray-700 text-white rounded-sm my-3 py-2 px-2"
                    onClick={() =>
                      router.push(`/${a.author.value.split("/")[4]}`)
                    }
                  >
                    Прикажи книги од авторот
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const authors = await bookService.getAuthors().then((res) => {
    return res.data.results.bindings;
  });

  return {
    props: {
      authors: authors,
    },
    revalidate: 30,
  };
}
