const passport = require('passport');
const passportJWT = require('passport-jwt');

const Users = require('../../models/users-schema');

passport.use(
  'user',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      const user = await Users.findOne({ email: payload.email });

      // user not found
      if (!user) {
        return done(null, false);
      }

      // user found
      return done(null, user);
    }
  )
);

module.exports = passport.authenticate('user', { session: false });
