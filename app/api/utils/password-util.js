import {hash, compare} from 'bcryptjs';

export async function hashPassword(plainpassword){
  return await hash(plainpassword, 12);
}
export async function comparePasswords(plainpassword, hashedpassword){
  return await compare(plainpassword, hashedpassword);
}
