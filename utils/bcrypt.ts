import bcrypt from "bcryptjs"

export const validPassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}

export const generateHash = (password: string): string => {
  const salt = bcrypt.genSaltSync(10)

  return bcrypt.hashSync(password, salt)
}
