import { toPromise } from '../utils';

/**
 * Recursively get all FileEntry and DirectoryEntry.
 */
export async function getAllEntries(dir: DirectoryEntry) {
  const reader = dir.createReader();
  const entries = await toPromise(reader.readEntries.bind(reader))<Entry[]>();
  const result = [];
  while (entries[0]) {
    const entry = entries.shift();
    if (entry.isFile) {
      result.push(entry);
    } else {
      const subEntries = await getAllEntries(entry as DirectoryEntry);
      subEntries.forEach(e => result.push(e));
    }
  }
  return result;
}
