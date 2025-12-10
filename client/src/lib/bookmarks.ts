/**
 * Bookmarks and Notes Management
 * Handles saving, retrieving, and managing verse bookmarks and personal notes
 */

export interface VerseBookmark {
  surahNumber: number;
  verseNumber: number;
  surahName: string;
  verseText: string;
  translation: string;
  note?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkCollection {
  id: string;
  name: string;
  description: string;
  bookmarks: string[]; // Array of bookmark IDs (surahNumber:verseNumber)
  createdAt: string;
  updatedAt: string;
}

const BOOKMARKS_KEY = 'quran_bookmarks';
const COLLECTIONS_KEY = 'quran_collections';

/**
 * Get all bookmarks
 */
export function getAllBookmarks(): Record<string, VerseBookmark> {
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    return {};
  }
}

/**
 * Get a specific bookmark
 */
export function getBookmark(surahNumber: number, verseNumber: number): VerseBookmark | null {
  const bookmarks = getAllBookmarks();
  const key = `${surahNumber}:${verseNumber}`;
  return bookmarks[key] || null;
}

/**
 * Check if a verse is bookmarked
 */
export function isBookmarked(surahNumber: number, verseNumber: number): boolean {
  const bookmarks = getAllBookmarks();
  const key = `${surahNumber}:${verseNumber}`;
  return key in bookmarks;
}

/**
 * Add or update a bookmark
 */
export function saveBookmark(bookmark: Omit<VerseBookmark, 'createdAt' | 'updatedAt'>): void {
  try {
    const bookmarks = getAllBookmarks();
    const key = `${bookmark.surahNumber}:${bookmark.verseNumber}`;
    const existing = bookmarks[key];
    
    bookmarks[key] = {
      ...bookmark,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error saving bookmark:', error);
  }
}

/**
 * Remove a bookmark
 */
export function removeBookmark(surahNumber: number, verseNumber: number): void {
  try {
    const bookmarks = getAllBookmarks();
    const key = `${surahNumber}:${verseNumber}`;
    delete bookmarks[key];
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    
    // Also remove from all collections
    const collections = getAllCollections();
    Object.values(collections).forEach(collection => {
      collection.bookmarks = collection.bookmarks.filter(id => id !== key);
    });
    saveAllCollections(collections);
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
}

/**
 * Toggle bookmark status
 */
export function toggleBookmark(
  surahNumber: number,
  verseNumber: number,
  surahName: string,
  verseText: string,
  translation: string
): boolean {
  if (isBookmarked(surahNumber, verseNumber)) {
    removeBookmark(surahNumber, verseNumber);
    return false;
  } else {
    saveBookmark({
      surahNumber,
      verseNumber,
      surahName,
      verseText,
      translation,
      tags: [],
    });
    return true;
  }
}

/**
 * Update note for a bookmark
 */
export function updateBookmarkNote(surahNumber: number, verseNumber: number, note: string): void {
  const bookmark = getBookmark(surahNumber, verseNumber);
  if (bookmark) {
    saveBookmark({
      ...bookmark,
      note: note.trim() || undefined,
    });
  }
}

/**
 * Update tags for a bookmark
 */
export function updateBookmarkTags(surahNumber: number, verseNumber: number, tags: string[]): void {
  const bookmark = getBookmark(surahNumber, verseNumber);
  if (bookmark) {
    saveBookmark({
      ...bookmark,
      tags,
    });
  }
}

/**
 * Get all collections
 */
export function getAllCollections(): Record<string, BookmarkCollection> {
  try {
    const stored = localStorage.getItem(COLLECTIONS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading collections:', error);
    return {};
  }
}

/**
 * Save all collections
 */
function saveAllCollections(collections: Record<string, BookmarkCollection>): void {
  try {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
  } catch (error) {
    console.error('Error saving collections:', error);
  }
}

/**
 * Create a new collection
 */
export function createCollection(name: string, description: string = ''): string {
  const collections = getAllCollections();
  const id = `collection_${Date.now()}`;
  
  collections[id] = {
    id,
    name,
    description,
    bookmarks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  saveAllCollections(collections);
  return id;
}

/**
 * Update a collection
 */
export function updateCollection(id: string, updates: Partial<Pick<BookmarkCollection, 'name' | 'description'>>): void {
  const collections = getAllCollections();
  if (collections[id]) {
    collections[id] = {
      ...collections[id],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveAllCollections(collections);
  }
}

/**
 * Delete a collection
 */
export function deleteCollection(id: string): void {
  const collections = getAllCollections();
  delete collections[id];
  saveAllCollections(collections);
}

/**
 * Add bookmark to collection
 */
export function addBookmarkToCollection(collectionId: string, surahNumber: number, verseNumber: number): void {
  const collections = getAllCollections();
  const collection = collections[collectionId];
  
  if (collection) {
    const bookmarkId = `${surahNumber}:${verseNumber}`;
    if (!collection.bookmarks.includes(bookmarkId)) {
      collection.bookmarks.push(bookmarkId);
      collection.updatedAt = new Date().toISOString();
      saveAllCollections(collections);
    }
  }
}

/**
 * Remove bookmark from collection
 */
export function removeBookmarkFromCollection(collectionId: string, surahNumber: number, verseNumber: number): void {
  const collections = getAllCollections();
  const collection = collections[collectionId];
  
  if (collection) {
    const bookmarkId = `${surahNumber}:${verseNumber}`;
    collection.bookmarks = collection.bookmarks.filter(id => id !== bookmarkId);
    collection.updatedAt = new Date().toISOString();
    saveAllCollections(collections);
  }
}

/**
 * Get bookmarks in a collection
 */
export function getCollectionBookmarks(collectionId: string): VerseBookmark[] {
  const collections = getAllCollections();
  const collection = collections[collectionId];
  
  if (!collection) return [];
  
  const allBookmarks = getAllBookmarks();
  return collection.bookmarks
    .map(id => allBookmarks[id])
    .filter(Boolean);
}

/**
 * Search bookmarks by text or tags
 */
export function searchBookmarks(query: string): VerseBookmark[] {
  const bookmarks = getAllBookmarks();
  const lowerQuery = query.toLowerCase();
  
  return Object.values(bookmarks).filter(bookmark => 
    bookmark.verseText.toLowerCase().includes(lowerQuery) ||
    bookmark.translation.toLowerCase().includes(lowerQuery) ||
    bookmark.note?.toLowerCase().includes(lowerQuery) ||
    bookmark.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    bookmark.surahName.toLowerCase().includes(lowerQuery)
  );
}
