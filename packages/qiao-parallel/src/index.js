// parallel
import parallel from './parallel.js';

/**
 * parallel by IIFE
 * @param {*} func
 * @param {*} values
 * @param {*} callback
 * @param {*} complete
 * @returns
 */
export const parallelByIIFE = async function (func, values, callback, complete) {
  parallel(values, callback, complete, { type: 'parallel', item: func });
};

/**
 * parallel by fork
 * @param {*} jsPath
 * @param {*} values
 * @param {*} callback
 * @param {*} complete
 */
export const parallelByFork = async function (jsPath, values, callback, complete) {
  parallel(values, callback, complete, { type: 'fork', item: jsPath });
};

/**
 * parallel by worker
 * @param {*} jsPath
 * @param {*} values
 * @param {*} callback
 * @param {*} complete
 */
export const parallelByWorker = async function (jsPath, values, callback, complete) {
  parallel(values, callback, complete, { type: 'worker', item: jsPath });
};
