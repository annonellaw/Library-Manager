const Book = require('../models/book.model')

module.exports = {
  /**
   * Get all books
   */
  forumListed:async(_,res)=>{
    
      const books = await Book.find({})
      return res.render('forumList', {
        bookList: [...books].map((p) => ({
          ...p.toJSON()
        }))
      
      })
    
  },
  index: async (_, res) => {
    const books = await Book.find({})
    return res.render('viewBooks', {
      bookList: [...books].map((p) => ({
        ...p.toJSON()
      }))
    
    })
  },
  /**
   * Get a book by `id`
   */
   show: async ({ body }, res) => {
    const  id  = parseInt(body.id)
    const books = await Book.find({ id })
    return res.render('foundBook', {
      bookList: [...books].map((p) => ({
        ...p.toJSON()
      }))
    
    })
  },
  /**
   * Create a new Book
   */
  create: async ({ body }, res) => {
    try {
      const book = new Book({ ...body })
      await book.save()
      return res.render('feedback');

    } catch (e) {
      return res.status(400).send(e.errors ?? e.message)
    }
  },
  /**
   * Update an existing book by `id`
   */
  update: async ({ body }, res) => {
    const id1  = body.id;
    const book = await Book.updateOne({ id: id1 }, { ...body })
    return res.render('feedback');

  },
  /**
   * Delete a book by `id`
   */
  destroy: async ({ body }, res) => {
    const id1  = body.id;
    const book = await Book.deleteOne({ id : id1 })
    return res.render('feedback');

    
    
  }


}
  

