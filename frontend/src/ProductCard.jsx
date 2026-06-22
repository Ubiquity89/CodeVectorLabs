export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <h3>{product.name}</h3>

      <p>
        Category: {product.category}
      </p>

      <p>
        Price: ₹{product.price}
      </p>

      <small>
        Updated:
        {" "}
        {new Date(
          product.updatedAt
        ).toLocaleString()}
      </small>
    </div>
  );
}