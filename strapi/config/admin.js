module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8f779f58f623e663ee953d02dbd6dd95'),
  },
});
