const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv");

const ticketRoutes = require("./src/routes/ticketRoutes");
const authRoutes = require("./src/routes/authRoutes");
const User = require("./src/models/userModel");
const AuthService = require("./src/services/authService"); // Import the authService

dotenv.config();
const app = express();

// MongoDB Connection
mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(cors());

const mongoURI = process.env.DB_STRING;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const authService = new AuthService();

// Passport Configuration
passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      debugger;
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: "Incorrect username." });
        const isValidPassword = await authService.comparePasswords(
          password,
          user.password
        );
        if (!isValidPassword)
          return done(null, false, { message: "Incorrect password." });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

app.use(passport.initialize());

// Routes
app.use("/api", passport.authenticate("jwt", { session: false }), ticketRoutes);
app.use("/auth", authRoutes);

// ... (other route configurations)

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
