/**
 * Audio Cache Utility for TTS
 * Stores generated audio in localStorage to reduce API costs
 */

const CACHE_PREFIX = 'tts_audio_';
const MAX_CACHE_SIZE_MB = 8; // 8 MB limit
const MAX_CACHE_SIZE_BYTES = MAX_CACHE_SIZE_MB * 1024 * 1024;

interface CacheEntry {
  audio: string; // Base64 encoded audio
  timestamp: number;
  size: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  totalSize: number;
  entryCount: number;
}

/**
 * Generate cache key from text content
 */
function generateCacheKey(text: string): string {
  // Simple hash function for cache key
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `${CACHE_PREFIX}${Math.abs(hash)}`;
}

/**
 * Get total cache size in bytes
 */
function getCacheSize(): number {
  let totalSize = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(CACHE_PREFIX)) {
      const value = localStorage.getItem(key);
      if (value) {
        totalSize += value.length;
      }
    }
  }
  return totalSize;
}

/**
 * Get all cache entries sorted by timestamp (oldest first)
 */
function getAllCacheEntries(): Array<{ key: string; entry: CacheEntry }> {
  const entries: Array<{ key: string; entry: CacheEntry }> = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(CACHE_PREFIX)) {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          const entry: CacheEntry = JSON.parse(value);
          entries.push({ key, entry });
        } catch (e) {
          // Invalid entry, remove it
          localStorage.removeItem(key);
        }
      }
    }
  }
  
  return entries.sort((a, b) => a.entry.timestamp - b.entry.timestamp);
}

/**
 * Evict oldest entries until cache size is under limit
 */
function evictOldEntries(requiredSpace: number): void {
  const currentSize = getCacheSize();
  const targetSize = MAX_CACHE_SIZE_BYTES - requiredSpace;
  
  if (currentSize <= targetSize) {
    return; // No eviction needed
  }
  
  const entries = getAllCacheEntries();
  let freedSpace = 0;
  
  for (const { key, entry } of entries) {
    localStorage.removeItem(key);
    freedSpace += entry.size;
    
    if (currentSize - freedSpace <= targetSize) {
      break;
    }
  }
}

/**
 * Store audio in cache
 */
export function cacheAudio(text: string, audioBase64: string): void {
  try {
    const key = generateCacheKey(text);
    const entry: CacheEntry = {
      audio: audioBase64,
      timestamp: Date.now(),
      size: audioBase64.length,
    };
    
    const entryString = JSON.stringify(entry);
    
    // Check if we need to evict old entries
    if (getCacheSize() + entryString.length > MAX_CACHE_SIZE_BYTES) {
      evictOldEntries(entryString.length);
    }
    
    localStorage.setItem(key, entryString);
  } catch (error) {
    console.error('[AudioCache] Failed to cache audio:', error);
    // If localStorage is full, try clearing old entries
    try {
      evictOldEntries(0);
      const key = generateCacheKey(text);
      const entry: CacheEntry = {
        audio: audioBase64,
        timestamp: Date.now(),
        size: audioBase64.length,
      };
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (e) {
      console.error('[AudioCache] Failed to cache audio after eviction:', e);
    }
  }
}

/**
 * Retrieve audio from cache
 */
export function getCachedAudio(text: string): string | null {
  try {
    const key = generateCacheKey(text);
    const value = localStorage.getItem(key);
    
    if (!value) {
      return null;
    }
    
    const entry: CacheEntry = JSON.parse(value);
    
    // Update timestamp (LRU)
    entry.timestamp = Date.now();
    localStorage.setItem(key, JSON.stringify(entry));
    
    return entry.audio;
  } catch (error) {
    console.error('[AudioCache] Failed to retrieve cached audio:', error);
    return null;
  }
}

/**
 * Clear all cached audio
 */
export function clearAudioCache(): void {
  const keys: string[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(CACHE_PREFIX)) {
      keys.push(key);
    }
  }
  
  keys.forEach(key => localStorage.removeItem(key));
}

/**
 * Get cache statistics
 */
export function getCacheStats(): CacheStats {
  const entries = getAllCacheEntries();
  const totalSize = getCacheSize();
  
  // Get hit/miss stats from localStorage
  const statsKey = 'tts_cache_stats';
  let hits = 0;
  let misses = 0;
  
  try {
    const stats = localStorage.getItem(statsKey);
    if (stats) {
      const parsed = JSON.parse(stats);
      hits = parsed.hits || 0;
      misses = parsed.misses || 0;
    }
  } catch (e) {
    // Ignore
  }
  
  return {
    hits,
    misses,
    totalSize,
    entryCount: entries.length,
  };
}

/**
 * Record cache hit
 */
export function recordCacheHit(): void {
  try {
    const statsKey = 'tts_cache_stats';
    const stats = getCacheStats();
    stats.hits++;
    localStorage.setItem(statsKey, JSON.stringify({ hits: stats.hits, misses: stats.misses }));
  } catch (e) {
    // Ignore
  }
}

/**
 * Record cache miss
 */
export function recordCacheMiss(): void {
  try {
    const statsKey = 'tts_cache_stats';
    const stats = getCacheStats();
    stats.misses++;
    localStorage.setItem(statsKey, JSON.stringify({ hits: stats.hits, misses: stats.misses }));
  } catch (e) {
    // Ignore
  }
}
