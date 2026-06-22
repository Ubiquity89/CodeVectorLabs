import "dotenv/config";

import mongoose from "mongoose";

import Product from "../models/Product.js";

const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Sports",
  "Home"
];

function randomDate() {
  return new Date(
    Date.now() -
      Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
  );
}
async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected");

  await Product.deleteMany({});

    const total = 200000;

  const batchSize = 5000;

  for (
    let i = 0;
    i < total;
    i += batchSize
  ) {
    const products = [];

    for (
      let j = 0;
      j < batchSize;
      j++
    ) {
      products.push({
        name: `Product ${i + j}`,

        category:
          categories[
            Math.floor(
              Math.random() *
                categories.length
            )
          ],

        price: Number(
          (
            Math.random() * 1000
          ).toFixed(2)
        ),

        createdAt: randomDate(),

        updatedAt: randomDate()
      });
    }

    await Product.insertMany(products);

    console.log(
      `${i + batchSize} inserted`
    );
  }

  process.exit();
}

seed();
