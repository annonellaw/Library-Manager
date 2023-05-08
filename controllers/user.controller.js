const User = require('../models/user.model')

module.exports = {
  /**
   * Get all users
   */
  index: async (_, res) => {
    const users = await User.find({})
    return res.render('viewUsers', {
      userList: [...users].map((p) => ({
        ...p.toJSON()
      }))
    
    })
  },
  /**
   * Get a user by 'id'
   */
  show: async ({ body }, res) => {
    const username  = body.user_name;
    const users = await User.find({ user_name: username })
    return res.render('foundUser', {
      userList: [...users].map((p) => ({
        ...p.toJSON()
      }))
    
    })
   
  },
  /**
   * Create a new user
   */
  create: async ({ body }, res) => {
    try {
      const username1 = body.username;
      const phone1 = body.phone;
      const user = new User({ user_name: username1, phone: phone1, borrowed: [], numBooks: 0 })
      await user.save()
      return res.render('feedback');
    } catch (e) {
      return res.status(400).send(e.errors ?? e.message)
    }
  },
  /**
   * Update an existing user by 'id'
   */
  update: async ({body }, res) => {
    const  username  = body.user_name
    const user = await User.updateOne({ user_name: username }, { ...body })
    return res.render('feedback');

  },
  /**
   * Delete a User by 'id'
   */
  destroy: async ({ body }, res) => {
    const username  = body.user_name;
    const user = await User.deleteOne({ user_name: username })
    return res.render('feedback');

  },
  showBorrowed: async ({ body }, res) => {
    const username  = body.user_name;
    const user = await User.findOne({ user_name: username })
    return res.render('foundBorrowed', { bookList: user.borrowed})
   
  }
  
}
