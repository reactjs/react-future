

// This feature does NOT propose the addition of special templating tags.  It only introduces the ability for tags to bind
// variables, thereby allowing custom components that can be composed in a way that is more readable and feels more declarative.
// We assume implementations of "push", "if" and "foreach" tags.  The actual implementation is quite trivial, and
// implementable by the end user.


// Currently, to render a bookstore, you would need the following code...
var booksData = [{title: "Harry Potter", authors: ["JK Rowling"], ...}, ...];
return <div>{booksData.map(function(bookData){
  var authorElements = [];
  bookData.authors.foreach(function(authorData, idx){
    authorElements.push(<a href={"http://www.authors.com?id="+author.id} style={{color: 'blue', textDecoration: 'none'}}>{author.name}</a>);
    if(idx !== bookData.authors.length) authorElements.push(", ");
  });
  return <div>
    <h1>{bookData.title}</h1>
    By: 
    { bookData.authors.length === 0 ? <span style={{color: 'gray'}}>Unknown author</span> :  {authorElements}}
  </div>;
})}</div>;


// The problem is that the code above is complex and hard to follow.  it feels a lot like back in the days when
// user interfaces were built using an imperative API (like IOS, Swing, etc).
// In order to generate the comma-separated list of authors for each book, we had to create a new array, iterate over
// the data, and push elements into the new array, and subsequently put the array of elements into the markup.
// This was a simple example, but you can imagine this widget becoming much more complicated, and it becoming hard
// to track what's happening in the user interface

// Now let's try something new.

// Ideally, you could do the same thing in a less imperative way by evaluating variables lazily...
<push name="books" value={[{title: "Harry Potter", authors: ["JK Rowling"], ...}, ...]}>
  <div>
    <foreach element="book" collection={books}>
      <div>
        <h1>{title}</h1>
        By:
        <iff test={book.authors.length === 0}>
          <span style={{color: 'gray'}}>Unknown author</span>
        </iff>
        <iff test={book.authors.length > 0}>
          <foreach element="author" index="authorIndex" collection={book.authors} />
            <a
              href={"http://www.authors.com?id="+author.id}
              style={{color: 'blue', textDecoration: 'none'}}>{author.name}
            </a>
            <iff test={authorIndex < book.authors.length}>, </iff>
          </foreach>
        </iff>
      </div>
    </foreach>
  </div>
</push>


// The declarative example is much more readable.  And the readability benefits grow super-linearly with component complexity.



// Now suppose we get a request from our designers to insert a <hr> element between each of our book div tags.
// With the declarative model, it's really easy.
<push name="books" value={[{title: "Harry Potter", authors: ["JK Rowling"], ...}, ...]}>
  <div>
    <foreach element="book" index="bookIndex" collection={books}>
      <div>
        <h1>{title}</h1>
        By:
        <iff test={book.authors.length === 0}>
          <span style={{color: 'gray'}}>Unknown author</span>
        </iff>
        <iff test={book.authors.length > 0}>
          <foreach element="author" index="authorIndex" collection={book.authors} />
            <a
              href={"http://www.authors.com?id="+author.id}
              style={{color: 'blue', textDecoration: 'none'}}>{author.name}
            </a>
            <iff test={authorIndex < book.authors.length}>, </iff>
          </foreach>
        </iff>
      </div>
      <iff test={bookIndex < books.length}>
        <hr />
      </iff>
    </foreach>
  </div>
</push>


// I'll leave it as an exercise for the reader to figure out how to do this with the current imperative-ish code
// It is an informative exercise, because you realize how tricky it really is once you attempt to modify the code.

