const { default: axios } = require("axios");

const bookService = {
  async getAuthors() {
    return await axios.get(
      "https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=select+%3Fauthor+%3Flabel+%3Foccupation+%3Fthumbnail+%28count%28%3Fwork%29+as+%3Fnw%29+where+%7B%0D%0A++++++++++++++++++++++++%3Fwork+dbo%3Aauthor+%3Fauthor.%0D%0A++++++++++++++++++++++++%3Fauthor+rdfs%3Alabel+%3Flabel.%0D%0A++++++++++++++++++++++++%3Fauthor+dbo%3Athumbnail+%3Fthumbnail%0D%0A++++++++++++++++++++++++OPTIONAL+%7B+%3Fauthor+dbp%3Aoccupation+%3Foccupation%7D%0D%0A++++++++++++++++++++++++FILTER+%28lang%28%3Flabel%29+%3D+%22en%22%29.%0D%0A++++++++++++++++++++++++%7D%0D%0A++++++++++++++++++++++++group+by+%3Fauthor+%3Flabel+%3Foccupation+%3Fthumbnail&format=application%2Fsparql-results%2Bjson&timeout=30000&signal_void=on&signal_unconnected=on"
    );
  },
  /**query:
     * select ?author ?label ?occupation (count(?work) as ?nw) where {
                        ?work dbo:author ?author.
                        ?author rdfs:label ?label.
                        OPTIONAL { ?author dbp:occupation ?occupation}
                        FILTER (lang(?label) = "en").
                        }
                        group by ?author ?label ?occupation
     */

  async getBooksByAuthorWithAbstract(name) {
    const sqName = name.replaceAll(" ", "_");
    return await axios.get(
      "https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=select+%3Fbook+%3Flabel+%3Fabstract+%3Fthumbnail++where+%7B%0D%0A++++++++++++++++++++++++%3Fbook+dbo%3Aauthor+%3Fauthor.%0D%0A++++++++++++++++++++++++%3Fauthor+rdfs%3Alabel+%3Flabel.%0D%0A++++++++++++++++++++++++%3Fbook+dbo%3Aauthor+dbr%3A" +
        sqName +
        ".%0D%0A+++++++++++++++++++++++++%3Fbook+dbo%3Aabstract+%3Fabstract.+++++++%0D%0A+++++++++++++++++++++++++%3Fbook+dbo%3Athumbnail+%3Fthumbnail.+++++++++++++++++++++++++++++++++++++%0D%0A++++++++++++++++++++++++OPTIONAL+%7B+%3Fauthor+dbp%3Aoccupation+%3Foccupation%7D%0D%0A++++++++++++++++++++++++FILTER+%28lang%28%3Flabel%29+%3D+%22en%22%29.%0D%0A++++++++++++++++++++++++FILTER%28lang%28%3Fabstract%29+%3D%22en%22%29%0D%0A++++++++++++++++++++++++%7D%0D%0A++++++++++++++++++++++++group+by+%3Fauthor+%3Flabel+%3Foccupation&format=application%2Fsparql-results%2Bjson&timeout=30000&signal_void=on&signal_unconnected=on"
    );
  },
  /**query:
     * select ?book ?label ?abstract ?thumbnail  where {
                        ?book dbo:author ?author.
                        ?author rdfs:label ?label.
                        ?book dbo:author dbr:A._A._Attanasio.
                         ?book dbo:abstract ?abstract.       
                         ?book dbo:thumbnail ?thumbnail.                                  
                        OPTIONAL { ?author dbp:occupation ?occupation}
                        FILTER (lang(?label) = "en").
                        FILTER(lang(?abstract) ="en")
                        }
     */

  async getBooks() {
    return await axios.get(
      "https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=SELECT+%3Fbook+%28group_concat%28DISTINCT+%3Fauthor%3B+separator+%3D+%22%2C+%22%29+as+%3Fauthors%29+%28group_concat%28DISTINCT+%3Fpublisher%3B+separator+%3D+%22%2C+%22%29+as+%3Fpublishers%29+%28sample%28%3Fpages%29+as+%3FnumPages%29+%28sample%28%3Fisbn_tmp%29+as+%3Fisbn%29++WHERE+%7B%0D%0A%3Fbook+a+dbo%3ABook+.%0D%0A%3Fbook+dbo%3Aauthor+%3Fauthor+.+%0D%0AOPTIONAL+%7B+%3Fbook+dbo%3AnumberOfPages+%3Fpages+%7D%0D%0AOPTIONAL+%7B+%3Fbook+dbo%3Aisbn+%3Fisbn_tmp+%7D%0D%0AOPTIONAL+%7B+%3Fbook+dbo%3Apublisher+%3Fpublisher+%7D%0D%0A%0D%0A%3Fbook+rdfs%3Alabel+%3Fname.%0D%0AFILTER%28LANGMATCHES%28LANG%28%3Fname%29%2C+%27en%27%29%29%0D%0A%0D%0A%3Fbook+rdfs%3Acomment+%3Ftext+.%0D%0AFILTER%28LANGMATCHES%28LANG%28%3Ftext%29%2C+%27en%27%29%29%0D%0A%0D%0A%7D%0D%0AGROUP+BY+%3Fbook%0D%0ALIMIT+100&format=application%2Fsparql-results%2Bjson&timeout=30000&signal_void=on&signal_unconnected=on"
    );
  },
  /**query:
     * SELECT ?book (group_concat(DISTINCT ?author; separator = ", ") as ?authors) (group_concat(DISTINCT ?publisher; separator = ", ") as ?publishers) (sample(?pages) as ?numPages) (sample(?isbn_tmp) as ?isbn)  WHERE {
?book a dbo:Book .
?book dbo:author ?author . 
OPTIONAL { ?book dbo:numberOfPages ?pages }
OPTIONAL { ?book dbo:isbn ?isbn_tmp }
OPTIONAL { ?book dbo:publisher ?publisher }

?book rdfs:label ?name.
FILTER(LANGMATCHES(LANG(?name), 'en'))

?book rdfs:comment ?text .
FILTER(LANGMATCHES(LANG(?text), 'en'))

}
GROUP BY ?book
LIMIT 100
     */
};

export default bookService;
