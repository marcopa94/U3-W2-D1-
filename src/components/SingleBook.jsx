import React from "react";

const SingleBook = ({ book, updateCurrentBook }) => {
  const handleClick = () => {
    updateCurrentBook(book);
  };

  return (
    <div style={{ cursor: "pointer" }} onClick={handleClick}>
      <img src={book.img} alt={book.title} style={{ width: "17rem" }} />
      <h5>{book.title}</h5>
      <p>{book.author}</p>
      <hr />
    </div>
  );
};

export default SingleBook;
