import { toPromise } from '../utils';
import { getAllEntries } from './getAllEntries';

export async function watchChanges() {
  const dir = await toPromise<DirectoryEntry>(
    chrome.runtime.getPackageDirectoryEntry,
  )();
  const entries = await getAllEntries(dir);

  const modificationTimeMap: { [fullPath: string]: Date } = {};
  await Promise.all(
    entries.map(entry =>
      toPromise<Metadata>(entry.getMetadata.bind(entry))().then(
        ({ modificationTime }) => {
          modificationTimeMap[entry.fullPath] = modificationTime;
        },
      ),
    ),
  );

  window.setInterval(() => {
    entries.forEach(async entry => {
      const metadata = await toPromise<Metadata>(
        entry.getMetadata.bind(entry),
      )();

      if (
        modificationTimeMap[entry.fullPath].getTime() !==
        metadata.modificationTime.getTime()
      ) {
        chrome.runtime.reload();
      }
    });
  }, 1000);
}
