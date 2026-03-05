import { openDB } from 'idb'

// Fetch collections from IndexedDB
export async function getCollectionFromStore() {
  let collections = []
  const db = await openDB('leiSyDB', 1)
  const value = await db.getAll('collections')

  collections = value
  return collections
}
getCollectionFromStore()

// Fetch cards from IndexedDB and update the cards ref
export async function getCardsFromStore() {
  let cards = []
  const db = await openDB('leiSyDB', 1)
  const value = await db.getAll('cards')

  cards = value
  return cards
}
getCardsFromStore()
