// import { openDB } from 'idb'

// // Fetch collections from IndexedDB
// export async function getCollectionFromStore() {
//   let collections = []
//   const db = await openDB('leiSyDB', 1)
//   const value = await db.getAll('collections')

//   collections = value
//   return collections
// }
// getCollectionFromStore()

// // Fetch cards from IndexedDB and update the cards ref
// export async function getCardsFromStore() {
//   let cards = []
//   const db = await openDB('leiSyDB', 1)
//   const value = await db.getAll('cards')

//   cards = value
//   return cards
// }
// getCardsFromStore()
import { openDB } from 'idb'

// Fetch collections from IndexedDB
export async function getCollectionFromStore() {
  let collections = []
  const db = await openDB('leiSyDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('collections')) {
        db.createObjectStore('collections', { keyPath: 'id', autoIncrement: true })
      }
      if (!db.objectStoreNames.contains('cards')) {
        db.createObjectStore('cards', { keyPath: 'id', autoIncrement: true })
      }
    },
  })
  const value = await db.getAll('collections')
  collections = value
  return collections
}

// Fetch cards from IndexedDB
export async function getCardsFromStore() {
  let cards = []
  const db = await openDB('leiSyDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('collections')) {
        db.createObjectStore('collections', { keyPath: 'id', autoIncrement: true })
      }
      if (!db.objectStoreNames.contains('cards')) {
        db.createObjectStore('cards', { keyPath: 'id', autoIncrement: true })
      }
    },
  })
  const value = await db.getAll('cards')
  cards = value
  return cards
}
