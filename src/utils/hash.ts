import bcrypt from 'bcrypt'

/**
* @description Hashes a password
* @param passwordToHash the password to hash
* @returns the hashed password
*/
export function hashPassword (passwordToHash: string): string {
  return bcrypt.hashSync(passwordToHash, 10)
}

/**
* @description Compares a password to a hash
* @param passwordToCompare the password to compare
* @param hashPassword the hash to compare to
* @returns true if the password matches the hash, false otherwise
*/
export function comparePassword (
  passwordToCompare: string,
  hashPassword: string
): boolean {
  return bcrypt.compareSync(passwordToCompare, hashPassword)
}
