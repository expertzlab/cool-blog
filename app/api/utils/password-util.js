import {hash, compare} from 'bcryptjs';

export async function hashpassword(plainpassword){
  return await hash(plainpassword, 12);
}
export async function comparePasswords(plainpassword, hashedpassword){
  return await compare(plainpassword, hashedpassword);
}
