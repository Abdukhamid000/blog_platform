import * as bcrypt from "bcrypt";

export function hashPw(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePw(plainPw: string, hashPw: string) {
  return bcrypt.compareSync(plainPw, hashPw);
}
