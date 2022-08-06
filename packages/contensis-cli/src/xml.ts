import xml2js from 'xml2js';
import cleaner from 'deep-cleaner';
import { Entry } from 'contensis-management-api/lib/models';
import { Logger } from './logger';

export const entriesToXml = (entries: Entry[]) => {
  try {
    const cleanedEntries = cleaner(cleaner(entries, ['workflow']));

    const builder = new xml2js.Builder({
      cdata: true,
      rootName: 'Items',
    });
    const xml = builder.buildObject({ Entry: cleanedEntries });

    return xml;
  } catch (ex) {
    Logger.error(`Problem building XML from entries`, ex);
    return '';
  }
};
