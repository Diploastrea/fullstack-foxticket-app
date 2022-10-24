export function verifyAdmin(req, res, next) {
  try {
    const { isAdmin } = req.headers.user;
    if (isAdmin === false) throw Error('You are not authorized to visit this page.');
    return next();
  } catch (err) {
    return res.status(401).json(err.message);
  }
}
