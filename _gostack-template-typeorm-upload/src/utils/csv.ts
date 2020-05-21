import csvParse from 'csv-parse';
import fs from 'fs';

import { ItransationDTO } from '../services/CreateTransactionService';

async function loadCSV(filePath: string): Promise<ItransationDTO[]> {
  const readCSVStream = fs.createReadStream(filePath);

  const parseStream = csvParse({
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);

  const lines: Array<ItransationDTO> = [];

  parseCSV.on('data', async line => {
    const [title, type, value, category] = line.map((cell: string) =>
      cell.trim(),
    );
    lines.push({ title, type, value, category });
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return lines;
}

export default loadCSV;
