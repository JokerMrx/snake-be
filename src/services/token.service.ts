import jwt from "jsonwebtoken";

export default new (class TokenService {
  generateToken(payload: object | string | Buffer, term = 30) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY ?? "", {
      expiresIn: `${term}d`
    });
    return token;
  }

  decodeToken(token: string) {
    const payload = jwt.decode(token);

    return payload;
  }

  validateToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY ?? "");
  }
})();
