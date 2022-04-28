const DataLoader = require('dataloader')
const userLoader = new DataLoader(keys => myBatchGetUsers(keys))

const users = [
  { id: 1, invitedByID: 3 },
  { id: 2, invitedByID: 4 },
  { id: 3, invitedByID: 4 },
  { id: 4, invitedByID: 0 },
]

async function myBatchGetUsers(keys) {
  console.log('batch fn')
  return keys.map(id => users.find(u => u.id == id))
}

async function fn1() {
  const user1 = await userLoader.load(1)
  const user2 = await userLoader.load(2)

  console.log(`User 1 is ${JSON.stringify(user1)}`)
  console.log(`User 2 is ${JSON.stringify(user2)}`)
}

async function fn2() {
  const u1 = userLoader.load(1)
  const u2 = userLoader.load(2)

  const [user1, user2] = await Promise.all([u1, u2])

  console.log(`User 1 is ${JSON.stringify(user1)}`)
  console.log(`User 2 is ${JSON.stringify(user2)}`)
}

async function start() {
  // await fn1()
  await fn2()
}

start()
