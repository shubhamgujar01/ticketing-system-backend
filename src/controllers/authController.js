// authController.js
const passport = require('passport');
const AuthService = require('../services/authService');

const authService = new AuthService();

class AuthController {
  async registerUser(req, res) {
    try {
      console.log(req); 
      const { username, password, role } = req.body;
      const user = await authService.createUser(username, password, role);
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async loginUser(req, res) {
    try {
      passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(req.body);
  
        if (err) {
          return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
  
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed', error: info.message });
        }
  
        const token = authService.generateToken(user);
        return res.json({ token });
      })(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
  
}

module.exports = AuthController;
