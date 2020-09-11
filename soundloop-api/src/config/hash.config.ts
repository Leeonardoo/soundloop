import { argon2id } from 'argon2'

export const options = {
  type: argon2id,
  timeCost: 40,
  memoryCost: 2 ** 17,
  parallelism: 12,
  hashLength: 48,
}
