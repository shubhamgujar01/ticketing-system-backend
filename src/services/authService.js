// authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

class AuthService {
  async comparePasswords(inputPassword, hashedPassword) {
    debugger
    console.log(inputPassword, hashedPassword);
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  async createUser(username, password, role = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    return await user.save();
  }

  async findUser(username) {
    return await User.findOne({ username });
  }

 

  generateToken(user) {
    const payload = { id: user._id, username: user.username, role: user.role };
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
  }
}


module.exports = AuthService;
