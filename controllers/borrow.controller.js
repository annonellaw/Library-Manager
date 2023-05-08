const User = require('../models/user.model')
const Book = require('../models/book.model')
module.exports = {



    borrow:  async ({body}, res)=>{
     
          
        const userchosen = body.user_name;
        const bookid = parseInt(body.id);
        const user =  await User.findOne({ user_name: userchosen, numBooks: { $lt: 3 } })
        const book =  await Book.findOne({ id: bookid, inventory_count: { $gt: 0 } })
        await User.updateOne(
                { user_name: userchosen },
                {
                    $push: { borrowed: book },
                    $inc: { numBooks: 1 }

                }
            )
            await  Book.updateOne(
                { id: bookid },
                {

                    $inc: { inventory_count: -1 }

                }
            )

            return res.render('feedback');

        }


,


returnBook: async ({ body }, res) => {
        const userchosen = body.user_name;
        const bookid = parseInt(body.id);
        const user = await User.findOne({ user_name: userchosen });
        const book = await Book.findOne({ id: bookid });
        const result3 = await User.updateOne({ user_name: userchosen }, { $pull: { borrowed: { id: bookid } } });
        const result4 = await User.updateOne({ user_name: userchosen }, { $inc: { numBooks: -1 } });
        const result5 = await Book.updateOne({ id: bookid }, { $inc: { inventory_count: 1 } });
        return res.render('feedback');

    }

}
      




        

