module.exports = {
    moduleNameMapper: {
      '^prisma/(.*)$': '<rootDir>/prisma/$1',
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    testEnvironment: 'node',
  };
  