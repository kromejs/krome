import { toPromise } from '../utils';
import { getAllEntries } from './getAllEntries';

export async function watchChanges(): Promise<number> {
  const dir = await toPromise(chrome.runtime.getPackageDirectoryEntry)<
    DirectoryEntry
  >();
  const entries = await getAllEntries(dir);

  const modificationTimeMap: { [fullPath: string]: Date } = {};
  await Promise.all(
    entries.map(entry =>
      toPromise(entry.getMetadata.bind(entry))<Metadata>().then(
        ({ modificationTime }) => {
          modificationTimeMap[entry.fullPath] = modificationTime;
        },
      ),
    ),
  );

  return window.setInterval(() => {
    entries.forEach(async entry => {
      const metadata = await toPromise(entry.getMetadata.bind(entry))<
        Metadata
      >();

      if (
        modificationTimeMap[entry.fullPath].getTime() !==
        metadata.modificationTime.getTime()
      ) {
        chrome.runtime.reload();
      }
    });
  }, 1000);
}
