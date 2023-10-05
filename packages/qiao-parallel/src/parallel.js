// worker
import { Worker } from 'worker_threads';

// q
import q from 'qiao-process';

// count
let count = 0;

/**
 * parallel
 * @param {*} values
 * @param {*} callback
 * @param {*} complete
 * @param {*} options
 * @returns
 */
export default async function (values, callback, complete, options) {
  // time
  console.time('qiao-parallel');

  // check values
  if (!values || !values.length || !options) {
    if (complete) complete(0);
    console.timeEnd('qiao-parallel');

    return;
  }

  // run
  const valuesLength = values.length;
  for (let i = 0; i < valuesLength; i++) {
    (async (index, value, valuesLength, options) => {
      if (options.type === 'parallel') handlerByIIFE(index, options.item, value, valuesLength, callback, complete);
      if (options.type === 'fork') handlerByFork(index, options.item, value, valuesLength, callback, complete);
      if (options.type === 'worker') handlerByWorker(index, options.item, value, valuesLength, callback, complete);
    })(i, values[i], valuesLength, options);
  }
}

// handler by IIFE
async function handlerByIIFE(index, func, value, valuesLength, callback, complete) {
  const res = await func(value);
  onCallback(callback, index, res);
  onComplete(complete, valuesLength);
}

// handler by fork
function handlerByFork(index, jsPath, value, valuesLength, callback, complete) {
  q.fork(
    jsPath,
    [value],
    function (res) {
      onCallback(callback, index, res);
    },
    function () {
      onComplete(complete, valuesLength);
    },
  );
}

function handlerByWorker(index, jsPath, value, valuesLength, callback, complete) {
  const worker = new Worker(jsPath, {
    workerData: value,
  });
  worker.on('message', function (res) {
    onCallback(callback, index, res);
  });
  worker.on('error', function (error) {
    console.log(error);
  });
  worker.on('exit', function () {
    onComplete(complete, valuesLength);
  });
}

// on callback
function onCallback(callback, index, res) {
  if (callback) callback(index, res);
}

// on complete
function onComplete(complete, valuesLength) {
  count++;
  if (count == valuesLength) {
    if (complete) complete(valuesLength);
    console.timeEnd('qiao-parallel');
  }
}
