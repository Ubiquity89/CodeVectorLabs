import Product from "../models/Product.js";

export const getProducts = async (
  req,
  res
) => {
      const limit =
    Number(req.query.limit) || 20;

  const category =
    req.query.category;

  const snapshotTime =
    req.query.snapshotTime ||
    new Date().toISOString();

  const cursorUpdatedAt =
    req.query.cursorUpdatedAt;

  const cursorId =
    req.query.cursorId;

      const filter = {
    updatedAt: {
      $lte: new Date(snapshotTime)
    }
  };

    if (category) {
    filter.category = category;
  }
    if (
    cursorUpdatedAt &&
    cursorId
  ) {
    filter.$or = [
      {
        updatedAt: {
          $lt: new Date(
            cursorUpdatedAt
          )
        }
      },
      {
        updatedAt: new Date(
          cursorUpdatedAt
        ),
        _id: {
          $lt: cursorId
        }
      }
    ];
  }
    const products =
    await Product.find(filter)
      .sort({
        updatedAt: -1,
        _id: -1
      })
      .limit(limit);
        let nextCursor = null;

  if (products.length) {
    const last =
      products[
        products.length - 1
      ];

    nextCursor = {
      updatedAt:
        last.updatedAt,
      id: last._id
    };
  }
    res.json({
    snapshotTime,
    nextCursor,
    products
  });
};