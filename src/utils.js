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

//Update card review date and success in a row count
export async function updateCardReview(card, nextReviewData) {
  const db = await openDB('leiSyDB', 1)

  // Create a transaction on the 'cards' store in read/write mode:
  const tx = db.transaction('cards', 'readwrite')

  // Add items to the store in a single transaction:
  await tx.store.put({
    ...card,
    nextReview: nextReviewData.nextReview,
    successInARow: nextReviewData.successInARow,
  })
  tx.done
}

// True if earlier or equal to today, false otherwise
export function isEarlierOrEqual(dateToCompare) {
  const today = new Date()

  today.setHours(0, 0, 0, 0)

  const comparedDate = new Date(dateToCompare)
  comparedDate.setHours(0, 0, 0, 0)

  return comparedDate.getTime() <= today.getTime()
}
