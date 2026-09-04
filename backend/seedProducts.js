//Import Mongoose
const mongoose = require("mongoose");

//Import File System
const fs = require("fs");

//Import CSV PARSER
const csv = require("csv-parser");

//Load Enviorment Variables
require("dotenv").config();

//Import Product Model
require("./models/productModel");

//Get Product Model
const Product = mongoose.model("Product");

//=======READ CSV FILE=======
const readCSV = () => {
    return new Promise((resolve, reject) =>{
        const products = [];

        fs.createReadStream("./products.csv")
        .pipe(
            csv({
                mapHeaders: ({ header }) =>
                    header.replace(/^\uFEFF/, "").trim()
            })
        )
        .on("data",(row) => {
            products.push({
                name: row.name,
                description: row.description,
                price: Number(row.price || 0),
                category: row.category,
                color: row.color,
                material: row.material,
                style: row.style,
                bag_type: row.bag_type,
                closure: row.closure,
                handle: row.handle,
                strap: row.strap,
                occasion: row.occasion,
                gender: row.gender,
                pattern: row.pattern,
                hardware: row.hardware,
                surface_work: row.surface_work,
                shape: row.shape,
                brand: row.brand,
                image: row.image,
                discount: Number(row.discount || 0),
            });
        })
        .on("end", () => {
            resolve(products);
        })

        .on("error",(error) => {
            reject(error);
        });
    });
};

//=========INSER PRODUCTS=============
const seedProducts = async () => {
    try{
        //Connecting Mongoose
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MONGODB CONNECTED SUCCESSFULLY");

        //READ PRODUCT FROM CSV FILE
        const products = await readCSV();

        console.log(`${products.length} Products Found in the CSV`);

        //REMOVE EXISTING DUMMY PRODUCTS
        await Product.deleteMany({});

        console.log("OLD PRODUCTS REMOVED SUCCESSFULLY....");

        //INSERT CSV PRODUCTS
        await Product.insertMany(products);

        console.log(`${products.length} Products Inserted / Added Successfully....`);

        //Close Database Connection
        await mongoose.connection.close();

        console.log("MongoDB Connection Closed");

        process.exit(0);
    }
    catch(error){
        console.log("Error Adding Products....",error.message);

        process.exit(1);
    }
};

//Running Seed Product Function File in the Terminal 
seedProducts(); 