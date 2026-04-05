import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="card">
      <h2 className="font-bold">{book.title}</h2>
      <p>{book.author}</p>

      <Link to={`/book/${book._id}`} className="btn btn-primary mt-2">
        View
      </Link>
    </div>
  );
}