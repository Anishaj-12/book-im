const  Book = require('../models/Book')



// image Upload
const multer = require('multer')
const path = require('path')
// add book in database 
const addBook = async (req,res) => {
    let info = {
        image: req.file.path,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
    }

 /*   const book = await Book.create(info)
    res.status(200).send(book)
    console.log(product) */

    try {
       
    const book = await Book.create(info)
        res.status(200);
        res.json(book);
      } catch (error) {
        res.status(500);
        throw new Error(error);
      }

}




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


















  // find all book from  database 
const getAllBooks = async (req, res) => {

    let books = await Book.findAll({})
    res.status(200).send(books)

}
const deleteBook = async (req, res) => {

   /* let id = req.params.id
    
    await Book.destroy({ where: { id: id }} )

    res.status(200).send('Product is deleted !') */


    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        res.status(200)
        res.send(book)
    } catch (error) {
        res.json(error)
    }

}


module.exports = {
    addBook,
    getAllBooks,
   // getOneProduct,
  //  updateProduct,
  deleteBook,
  //  getPublishedProduct,
  //   getProductReviews,
    upload
    
}