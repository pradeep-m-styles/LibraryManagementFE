import { useState } from "react";

export default function Reviews() {

  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");

  const addReview = () => {

    if (!text) return;

    setReviews([...reviews, text]);

    setText("");

  };

  return (

    <div className="min-h-screen p-6 bg-gradient-to-r from-pink-50 to-purple-100">

      <h1 className="text-4xl font-bold text-purple-700 mb-8">
        ⭐ Reviews
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-xl">

        <textarea
          placeholder="Write your review..."
          className="w-full border p-4 rounded-xl"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={addReview}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
        >
          Add Review
        </button>

      </div>

      <div className="mt-8 space-y-4">

        {reviews.map((review, index) => (

          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-lg"
          >
            {review}
          </div>

        ))}

      </div>

    </div>
  );
}