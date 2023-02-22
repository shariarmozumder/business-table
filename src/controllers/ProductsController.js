const ProductsModel = require("../models/ProductsModel");

exports.ProductList = async (req, res) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let searchValue = req.params.searchKeyword;
    let skipRow = (pageNo - 1) * perPage;
    let data;

    if (searchValue !== "0") {
      let SearchRgx = { $regex: searchValue, $options: "i" };
      let SearchQuery = {
        $or: [
          { title: SearchRgx },
          { category: SearchRgx },
          { subcategory: SearchRgx },
          { remark: SearchRgx },
          { brand: SearchRgx },
          { shop: SearchRgx },
        ],
      };
      data = await ProductsModel.aggregate([
        {
          $facet: {
            Total: [{ $match: SearchQuery }, { $count: "count" }],
            Rows: [
              { $match: SearchQuery },
              { $skip: skipRow },
              { $limit: perPage },
            ],
          },
        },
      ]);
    } else {
      data = await ProductsModel.aggregate([
        {
          $facet: {
            Total: [{ $count: "count" }],
            Rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    res.status(200).json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

exports.list = (req, res) => {
  res.send("Hello world");
};
