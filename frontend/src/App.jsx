import { useEffect, useState } from "react";
import { api } from "./api";
import ProductCard from "./ProductCard";

function App() {
  const [products, setProducts] =
    useState([]);

  const [category, setCategory] =
    useState("");

  const [snapshotTime, setSnapshotTime] =
    useState(null);

  const [cursor, setCursor] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const fetchProducts = async (
    reset = false
  ) => {
    try {
      setLoading(true);

      const params = {
        limit: 20,
      };

      if (category) {
        params.category = category;
      }

      if (!reset && cursor) {
        params.cursorUpdatedAt =
          cursor.updatedAt;

        params.cursorId = cursor.id;

        params.snapshotTime =
          snapshotTime;
      }

      const res = await api.get(
        "/products",
        { params }
      );

      if (reset) {
        setProducts(res.data.products);

        setSnapshotTime(
          res.data.snapshotTime
        );
      } else {
        setProducts((prev) => [
          ...prev,
          ...res.data.products,
        ]);
      }

      setCursor(res.data.nextCursor);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, []);

  const handleFilter = () => {
    setCursor(null);
    fetchProducts(true);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>
        Product Browser
      </h1>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          <option value="">
            All Categories
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Books">
            Books
          </option>

          <option value="Fashion">
            Fashion
          </option>

          <option value="Sports">
            Sports
          </option>

          <option value="Home">
            Home
          </option>
        </select>

        <button
          onClick={handleFilter}
          style={{
            marginLeft: "10px",
          }}
        >
          Apply
        </button>
      </div>

      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

      <button
        onClick={() =>
          fetchProducts(false)
        }
        disabled={
          !cursor || loading
        }
        style={{
          marginTop: "20px",
        }}
      >
        {loading
          ? "Loading..."
          : "Load More"}
      </button>
    </div>
  );
}

export default App;