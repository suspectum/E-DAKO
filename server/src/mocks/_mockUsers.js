// third party
import faker from 'faker';
import bcrypt from 'bcryptjs';

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

export const MOCK_USERS = [],
  ROLES = ['Admin', 'User'];

for (let i = 0; i < 499; i++) {
  MOCK_USERS[i] = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    passwordHash: hash('123456'),
    role: ROLES[Math.floor(Math.random() * ROLES.length)],
    created: faker.date.past().toLocaleDateString('en-US'),
    verified: faker.date.past().toLocaleDateString('en-US'),
  };
}
