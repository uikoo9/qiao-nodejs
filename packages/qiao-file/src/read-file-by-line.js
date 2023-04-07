// readline
import readline from 'readline';

// fs
import { createReadStream } from 'fs-extra';

/**
 * readFileLineByLine
 * @param {*} filePath
 * @param {*} onLine
 * @param {*} onClose
 */
export const readFileLineByLine = (filePath, onLine, onClose) => {
  // rl
  const rl = readline.createInterface({
    input: createReadStream(filePath, { encoding: 'utf8' }),
  });

  // on
  rl.on('line', function (line) {
    if (onLine) onLine(line);
  });
  rl.on('close', function () {
    if (onClose) onClose();
  });
};
