var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/@sveltejs/adapter-node/files/shims.js
import { createRequire } from "module";

// node_modules/@sveltejs/kit/dist/install-fetch.js
import http from "http";
import https from "https";
import zlib from "zlib";
import Stream, { PassThrough, pipeline } from "stream";
import { types } from "util";
import { randomBytes } from "crypto";
import { format } from "url";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var dataUriToBuffer$1 = src;
var ponyfill_es2018 = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
    function noop3() {
      return void 0;
    }
    function getGlobals() {
      if (typeof self !== "undefined") {
        return self;
      } else if (typeof window !== "undefined") {
        return window;
      } else if (typeof commonjsGlobal !== "undefined") {
        return commonjsGlobal;
      }
      return void 0;
    }
    const globals = getGlobals();
    function typeIsObject(x) {
      return typeof x === "object" && x !== null || typeof x === "function";
    }
    const rethrowAssertionErrorRejection = noop3;
    const originalPromise = Promise;
    const originalPromiseThen = Promise.prototype.then;
    const originalPromiseResolve = Promise.resolve.bind(originalPromise);
    const originalPromiseReject = Promise.reject.bind(originalPromise);
    function newPromise(executor) {
      return new originalPromise(executor);
    }
    function promiseResolvedWith(value) {
      return originalPromiseResolve(value);
    }
    function promiseRejectedWith(reason) {
      return originalPromiseReject(reason);
    }
    function PerformPromiseThen(promise, onFulfilled, onRejected) {
      return originalPromiseThen.call(promise, onFulfilled, onRejected);
    }
    function uponPromise(promise, onFulfilled, onRejected) {
      PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
    }
    function uponFulfillment(promise, onFulfilled) {
      uponPromise(promise, onFulfilled);
    }
    function uponRejection(promise, onRejected) {
      uponPromise(promise, void 0, onRejected);
    }
    function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
      return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
    }
    function setPromiseIsHandledToTrue(promise) {
      PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
    }
    const queueMicrotask = (() => {
      const globalQueueMicrotask = globals && globals.queueMicrotask;
      if (typeof globalQueueMicrotask === "function") {
        return globalQueueMicrotask;
      }
      const resolvedPromise = promiseResolvedWith(void 0);
      return (fn) => PerformPromiseThen(resolvedPromise, fn);
    })();
    function reflectCall(F, V, args) {
      if (typeof F !== "function") {
        throw new TypeError("Argument is not a function");
      }
      return Function.prototype.apply.call(F, V, args);
    }
    function promiseCall(F, V, args) {
      try {
        return promiseResolvedWith(reflectCall(F, V, args));
      } catch (value) {
        return promiseRejectedWith(value);
      }
    }
    const QUEUE_MAX_ARRAY_SIZE = 16384;
    class SimpleQueue {
      constructor() {
        this._cursor = 0;
        this._size = 0;
        this._front = {
          _elements: [],
          _next: void 0
        };
        this._back = this._front;
        this._cursor = 0;
        this._size = 0;
      }
      get length() {
        return this._size;
      }
      push(element) {
        const oldBack = this._back;
        let newBack = oldBack;
        if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
          newBack = {
            _elements: [],
            _next: void 0
          };
        }
        oldBack._elements.push(element);
        if (newBack !== oldBack) {
          this._back = newBack;
          oldBack._next = newBack;
        }
        ++this._size;
      }
      shift() {
        const oldFront = this._front;
        let newFront = oldFront;
        const oldCursor = this._cursor;
        let newCursor = oldCursor + 1;
        const elements = oldFront._elements;
        const element = elements[oldCursor];
        if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
          newFront = oldFront._next;
          newCursor = 0;
        }
        --this._size;
        this._cursor = newCursor;
        if (oldFront !== newFront) {
          this._front = newFront;
        }
        elements[oldCursor] = void 0;
        return element;
      }
      forEach(callback) {
        let i = this._cursor;
        let node = this._front;
        let elements = node._elements;
        while (i !== elements.length || node._next !== void 0) {
          if (i === elements.length) {
            node = node._next;
            elements = node._elements;
            i = 0;
            if (elements.length === 0) {
              break;
            }
          }
          callback(elements[i]);
          ++i;
        }
      }
      peek() {
        const front = this._front;
        const cursor = this._cursor;
        return front._elements[cursor];
      }
    }
    function ReadableStreamReaderGenericInitialize(reader, stream) {
      reader._ownerReadableStream = stream;
      stream._reader = reader;
      if (stream._state === "readable") {
        defaultReaderClosedPromiseInitialize(reader);
      } else if (stream._state === "closed") {
        defaultReaderClosedPromiseInitializeAsResolved(reader);
      } else {
        defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
      }
    }
    function ReadableStreamReaderGenericCancel(reader, reason) {
      const stream = reader._ownerReadableStream;
      return ReadableStreamCancel(stream, reason);
    }
    function ReadableStreamReaderGenericRelease(reader) {
      if (reader._ownerReadableStream._state === "readable") {
        defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      } else {
        defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      }
      reader._ownerReadableStream._reader = void 0;
      reader._ownerReadableStream = void 0;
    }
    function readerLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released reader");
    }
    function defaultReaderClosedPromiseInitialize(reader) {
      reader._closedPromise = newPromise((resolve3, reject) => {
        reader._closedPromise_resolve = resolve3;
        reader._closedPromise_reject = reject;
      });
    }
    function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseReject(reader, reason);
    }
    function defaultReaderClosedPromiseInitializeAsResolved(reader) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseResolve(reader);
    }
    function defaultReaderClosedPromiseReject(reader, reason) {
      if (reader._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(reader._closedPromise);
      reader._closedPromise_reject(reason);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    function defaultReaderClosedPromiseResetToRejected(reader, reason) {
      defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
    }
    function defaultReaderClosedPromiseResolve(reader) {
      if (reader._closedPromise_resolve === void 0) {
        return;
      }
      reader._closedPromise_resolve(void 0);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
    const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
    const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
    const PullSteps = SymbolPolyfill("[[PullSteps]]");
    const NumberIsFinite = Number.isFinite || function(x) {
      return typeof x === "number" && isFinite(x);
    };
    const MathTrunc = Math.trunc || function(v) {
      return v < 0 ? Math.ceil(v) : Math.floor(v);
    };
    function isDictionary(x) {
      return typeof x === "object" || typeof x === "function";
    }
    function assertDictionary(obj, context) {
      if (obj !== void 0 && !isDictionary(obj)) {
        throw new TypeError(`${context} is not an object.`);
      }
    }
    function assertFunction(x, context) {
      if (typeof x !== "function") {
        throw new TypeError(`${context} is not a function.`);
      }
    }
    function isObject2(x) {
      return typeof x === "object" && x !== null || typeof x === "function";
    }
    function assertObject(x, context) {
      if (!isObject2(x)) {
        throw new TypeError(`${context} is not an object.`);
      }
    }
    function assertRequiredArgument(x, position, context) {
      if (x === void 0) {
        throw new TypeError(`Parameter ${position} is required in '${context}'.`);
      }
    }
    function assertRequiredField(x, field, context) {
      if (x === void 0) {
        throw new TypeError(`${field} is required in '${context}'.`);
      }
    }
    function convertUnrestrictedDouble(value) {
      return Number(value);
    }
    function censorNegativeZero(x) {
      return x === 0 ? 0 : x;
    }
    function integerPart(x) {
      return censorNegativeZero(MathTrunc(x));
    }
    function convertUnsignedLongLongWithEnforceRange(value, context) {
      const lowerBound = 0;
      const upperBound = Number.MAX_SAFE_INTEGER;
      let x = Number(value);
      x = censorNegativeZero(x);
      if (!NumberIsFinite(x)) {
        throw new TypeError(`${context} is not a finite number`);
      }
      x = integerPart(x);
      if (x < lowerBound || x > upperBound) {
        throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
      }
      if (!NumberIsFinite(x) || x === 0) {
        return 0;
      }
      return x;
    }
    function assertReadableStream(x, context) {
      if (!IsReadableStream(x)) {
        throw new TypeError(`${context} is not a ReadableStream.`);
      }
    }
    function AcquireReadableStreamDefaultReader(stream) {
      return new ReadableStreamDefaultReader(stream);
    }
    function ReadableStreamAddReadRequest(stream, readRequest) {
      stream._reader._readRequests.push(readRequest);
    }
    function ReadableStreamFulfillReadRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readRequest = reader._readRequests.shift();
      if (done) {
        readRequest._closeSteps();
      } else {
        readRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadRequests(stream) {
      return stream._reader._readRequests.length;
    }
    function ReadableStreamHasDefaultReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamDefaultReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamDefaultReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("read"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve3, reject) => {
          resolvePromise = resolve3;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: () => resolvePromise({ value: void 0, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamDefaultReaderRead(this, readRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamDefaultReader(this)) {
          throw defaultReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamDefaultReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultReader",
        configurable: true
      });
    }
    function IsReadableStreamDefaultReader(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readRequests")) {
        return false;
      }
      return x instanceof ReadableStreamDefaultReader;
    }
    function ReadableStreamDefaultReaderRead(reader, readRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "closed") {
        readRequest._closeSteps();
      } else if (stream._state === "errored") {
        readRequest._errorSteps(stream._storedError);
      } else {
        stream._readableStreamController[PullSteps](readRequest);
      }
    }
    function defaultReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
    }
    const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
    }).prototype);
    class ReadableStreamAsyncIteratorImpl {
      constructor(reader, preventCancel) {
        this._ongoingPromise = void 0;
        this._isFinished = false;
        this._reader = reader;
        this._preventCancel = preventCancel;
      }
      next() {
        const nextSteps = () => this._nextSteps();
        this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
        return this._ongoingPromise;
      }
      return(value) {
        const returnSteps = () => this._returnSteps(value);
        return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
      }
      _nextSteps() {
        if (this._isFinished) {
          return Promise.resolve({ value: void 0, done: true });
        }
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("iterate"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve3, reject) => {
          resolvePromise = resolve3;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => {
            this._ongoingPromise = void 0;
            queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
          },
          _closeSteps: () => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            resolvePromise({ value: void 0, done: true });
          },
          _errorSteps: (reason) => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            rejectPromise(reason);
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promise;
      }
      _returnSteps(value) {
        if (this._isFinished) {
          return Promise.resolve({ value, done: true });
        }
        this._isFinished = true;
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("finish iterating"));
        }
        if (!this._preventCancel) {
          const result = ReadableStreamReaderGenericCancel(reader, value);
          ReadableStreamReaderGenericRelease(reader);
          return transformPromiseWith(result, () => ({ value, done: true }));
        }
        ReadableStreamReaderGenericRelease(reader);
        return promiseResolvedWith({ value, done: true });
      }
    }
    const ReadableStreamAsyncIteratorPrototype = {
      next() {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
        }
        return this._asyncIteratorImpl.next();
      },
      return(value) {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
        }
        return this._asyncIteratorImpl.return(value);
      }
    };
    if (AsyncIteratorPrototype !== void 0) {
      Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
    }
    function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
      const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
      iterator._asyncIteratorImpl = impl;
      return iterator;
    }
    function IsReadableStreamAsyncIterator(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_asyncIteratorImpl")) {
        return false;
      }
      try {
        return x._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
      } catch (_a2) {
        return false;
      }
    }
    function streamAsyncIteratorBrandCheckException(name) {
      return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
    }
    const NumberIsNaN = Number.isNaN || function(x) {
      return x !== x;
    };
    function CreateArrayFromList(elements) {
      return elements.slice();
    }
    function CopyDataBlockBytes(dest, destOffset, src2, srcOffset, n) {
      new Uint8Array(dest).set(new Uint8Array(src2, srcOffset, n), destOffset);
    }
    function TransferArrayBuffer(O) {
      return O;
    }
    function IsDetachedBuffer(O) {
      return false;
    }
    function ArrayBufferSlice(buffer, begin, end) {
      if (buffer.slice) {
        return buffer.slice(begin, end);
      }
      const length = end - begin;
      const slice = new ArrayBuffer(length);
      CopyDataBlockBytes(slice, 0, buffer, begin, length);
      return slice;
    }
    function IsNonNegativeNumber(v) {
      if (typeof v !== "number") {
        return false;
      }
      if (NumberIsNaN(v)) {
        return false;
      }
      if (v < 0) {
        return false;
      }
      return true;
    }
    function CloneAsUint8Array(O) {
      const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
      return new Uint8Array(buffer);
    }
    function DequeueValue(container) {
      const pair = container._queue.shift();
      container._queueTotalSize -= pair.size;
      if (container._queueTotalSize < 0) {
        container._queueTotalSize = 0;
      }
      return pair.value;
    }
    function EnqueueValueWithSize(container, value, size) {
      if (!IsNonNegativeNumber(size) || size === Infinity) {
        throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
      }
      container._queue.push({ value, size });
      container._queueTotalSize += size;
    }
    function PeekQueueValue(container) {
      const pair = container._queue.peek();
      return pair.value;
    }
    function ResetQueue(container) {
      container._queue = new SimpleQueue();
      container._queueTotalSize = 0;
    }
    class ReadableStreamBYOBRequest {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get view() {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("view");
        }
        return this._view;
      }
      respond(bytesWritten) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respond");
        }
        assertRequiredArgument(bytesWritten, 1, "respond");
        bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(this._view.buffer))
          ;
        ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
      }
      respondWithNewView(view) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respondWithNewView");
        }
        assertRequiredArgument(view, 1, "respondWithNewView");
        if (!ArrayBuffer.isView(view)) {
          throw new TypeError("You can only respond with array buffer views");
        }
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
      }
    }
    Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
      respond: { enumerable: true },
      respondWithNewView: { enumerable: true },
      view: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBRequest",
        configurable: true
      });
    }
    class ReadableByteStreamController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get byobRequest() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("byobRequest");
        }
        return ReadableByteStreamControllerGetBYOBRequest(this);
      }
      get desiredSize() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("desiredSize");
        }
        return ReadableByteStreamControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("close");
        }
        if (this._closeRequested) {
          throw new TypeError("The stream has already been closed; do not close it again!");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
        }
        ReadableByteStreamControllerClose(this);
      }
      enqueue(chunk) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("enqueue");
        }
        assertRequiredArgument(chunk, 1, "enqueue");
        if (!ArrayBuffer.isView(chunk)) {
          throw new TypeError("chunk must be an array buffer view");
        }
        if (chunk.byteLength === 0) {
          throw new TypeError("chunk must have non-zero byteLength");
        }
        if (chunk.buffer.byteLength === 0) {
          throw new TypeError(`chunk's buffer must have non-zero byteLength`);
        }
        if (this._closeRequested) {
          throw new TypeError("stream is closed or draining");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
        }
        ReadableByteStreamControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("error");
        }
        ReadableByteStreamControllerError(this, e);
      }
      [CancelSteps](reason) {
        ReadableByteStreamControllerClearPendingPullIntos(this);
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableByteStreamControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableByteStream;
        if (this._queueTotalSize > 0) {
          const entry = this._queue.shift();
          this._queueTotalSize -= entry.byteLength;
          ReadableByteStreamControllerHandleQueueDrain(this);
          const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
          readRequest._chunkSteps(view);
          return;
        }
        const autoAllocateChunkSize = this._autoAllocateChunkSize;
        if (autoAllocateChunkSize !== void 0) {
          let buffer;
          try {
            buffer = new ArrayBuffer(autoAllocateChunkSize);
          } catch (bufferE) {
            readRequest._errorSteps(bufferE);
            return;
          }
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: autoAllocateChunkSize,
            byteOffset: 0,
            byteLength: autoAllocateChunkSize,
            bytesFilled: 0,
            elementSize: 1,
            viewConstructor: Uint8Array,
            readerType: "default"
          };
          this._pendingPullIntos.push(pullIntoDescriptor);
        }
        ReadableStreamAddReadRequest(stream, readRequest);
        ReadableByteStreamControllerCallPullIfNeeded(this);
      }
    }
    Object.defineProperties(ReadableByteStreamController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      byobRequest: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableByteStreamController",
        configurable: true
      });
    }
    function IsReadableByteStreamController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledReadableByteStream")) {
        return false;
      }
      return x instanceof ReadableByteStreamController;
    }
    function IsReadableStreamBYOBRequest(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_associatedReadableByteStreamController")) {
        return false;
      }
      return x instanceof ReadableStreamBYOBRequest;
    }
    function ReadableByteStreamControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableByteStreamControllerError(controller, e);
      });
    }
    function ReadableByteStreamControllerClearPendingPullIntos(controller) {
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      controller._pendingPullIntos = new SimpleQueue();
    }
    function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
      let done = false;
      if (stream._state === "closed") {
        done = true;
      }
      const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
      if (pullIntoDescriptor.readerType === "default") {
        ReadableStreamFulfillReadRequest(stream, filledView, done);
      } else {
        ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
      }
    }
    function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
      const bytesFilled = pullIntoDescriptor.bytesFilled;
      const elementSize = pullIntoDescriptor.elementSize;
      return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
    }
    function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
      controller._queue.push({ buffer, byteOffset, byteLength });
      controller._queueTotalSize += byteLength;
    }
    function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
      const elementSize = pullIntoDescriptor.elementSize;
      const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
      const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
      const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
      const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
      let totalBytesToCopyRemaining = maxBytesToCopy;
      let ready = false;
      if (maxAlignedBytes > currentAlignedBytes) {
        totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
        ready = true;
      }
      const queue = controller._queue;
      while (totalBytesToCopyRemaining > 0) {
        const headOfQueue = queue.peek();
        const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
        const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
        if (headOfQueue.byteLength === bytesToCopy) {
          queue.shift();
        } else {
          headOfQueue.byteOffset += bytesToCopy;
          headOfQueue.byteLength -= bytesToCopy;
        }
        controller._queueTotalSize -= bytesToCopy;
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
        totalBytesToCopyRemaining -= bytesToCopy;
      }
      return ready;
    }
    function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
      pullIntoDescriptor.bytesFilled += size;
    }
    function ReadableByteStreamControllerHandleQueueDrain(controller) {
      if (controller._queueTotalSize === 0 && controller._closeRequested) {
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(controller._controlledReadableByteStream);
      } else {
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
    }
    function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
      if (controller._byobRequest === null) {
        return;
      }
      controller._byobRequest._associatedReadableByteStreamController = void 0;
      controller._byobRequest._view = null;
      controller._byobRequest = null;
    }
    function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
      while (controller._pendingPullIntos.length > 0) {
        if (controller._queueTotalSize === 0) {
          return;
        }
        const pullIntoDescriptor = controller._pendingPullIntos.peek();
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
      const stream = controller._controlledReadableByteStream;
      let elementSize = 1;
      if (view.constructor !== DataView) {
        elementSize = view.constructor.BYTES_PER_ELEMENT;
      }
      const ctor = view.constructor;
      const buffer = TransferArrayBuffer(view.buffer);
      const pullIntoDescriptor = {
        buffer,
        bufferByteLength: buffer.byteLength,
        byteOffset: view.byteOffset,
        byteLength: view.byteLength,
        bytesFilled: 0,
        elementSize,
        viewConstructor: ctor,
        readerType: "byob"
      };
      if (controller._pendingPullIntos.length > 0) {
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        return;
      }
      if (stream._state === "closed") {
        const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
        readIntoRequest._closeSteps(emptyView);
        return;
      }
      if (controller._queueTotalSize > 0) {
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          ReadableByteStreamControllerHandleQueueDrain(controller);
          readIntoRequest._chunkSteps(filledView);
          return;
        }
        if (controller._closeRequested) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          readIntoRequest._errorSteps(e);
          return;
        }
      }
      controller._pendingPullIntos.push(pullIntoDescriptor);
      ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
      const stream = controller._controlledReadableByteStream;
      if (ReadableStreamHasBYOBReader(stream)) {
        while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
      ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
      if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
        return;
      }
      ReadableByteStreamControllerShiftPendingPullInto(controller);
      const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
      if (remainderSize > 0) {
        const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
      }
      pullIntoDescriptor.bytesFilled -= remainderSize;
      ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
      ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
    }
    function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        ReadableByteStreamControllerRespondInClosedState(controller);
      } else {
        ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerShiftPendingPullInto(controller) {
      const descriptor = controller._pendingPullIntos.shift();
      return descriptor;
    }
    function ReadableByteStreamControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return false;
      }
      if (controller._closeRequested) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableByteStreamControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
    }
    function ReadableByteStreamControllerClose(controller) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      if (controller._queueTotalSize > 0) {
        controller._closeRequested = true;
        return;
      }
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (firstPendingPullInto.bytesFilled > 0) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          throw e;
        }
      }
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamClose(stream);
    }
    function ReadableByteStreamControllerEnqueue(controller, chunk) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      const buffer = chunk.buffer;
      const byteOffset = chunk.byteOffset;
      const byteLength = chunk.byteLength;
      const transferredBuffer = TransferArrayBuffer(buffer);
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (IsDetachedBuffer(firstPendingPullInto.buffer))
          ;
        firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
      }
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      if (ReadableStreamHasDefaultReader(stream)) {
        if (ReadableStreamGetNumReadRequests(stream) === 0) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        } else {
          const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
          ReadableStreamFulfillReadRequest(stream, transferredView, false);
        }
      } else if (ReadableStreamHasBYOBReader(stream)) {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      } else {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerError(controller, e) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return;
      }
      ReadableByteStreamControllerClearPendingPullIntos(controller);
      ResetQueue(controller);
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableByteStreamControllerGetBYOBRequest(controller) {
      if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
        const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
        SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
        controller._byobRequest = byobRequest;
      }
      return controller._byobRequest;
    }
    function ReadableByteStreamControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableByteStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableByteStreamControllerRespond(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (bytesWritten !== 0) {
          throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
        }
      } else {
        if (bytesWritten === 0) {
          throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
        }
        if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
          throw new RangeError("bytesWritten out of range");
        }
      }
      firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
      ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
    }
    function ReadableByteStreamControllerRespondWithNewView(controller, view) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (view.byteLength !== 0) {
          throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
        }
      } else {
        if (view.byteLength === 0) {
          throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
        }
      }
      if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
        throw new RangeError("The region specified by view does not match byobRequest");
      }
      if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
        throw new RangeError("The buffer of view has different capacity than byobRequest");
      }
      if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
        throw new RangeError("The region specified by view is larger than byobRequest");
      }
      firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
      ReadableByteStreamControllerRespondInternal(controller, view.byteLength);
    }
    function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
      controller._controlledReadableByteStream = stream;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._byobRequest = null;
      controller._queue = controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._closeRequested = false;
      controller._started = false;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      controller._autoAllocateChunkSize = autoAllocateChunkSize;
      controller._pendingPullIntos = new SimpleQueue();
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }, (r) => {
        ReadableByteStreamControllerError(controller, r);
      });
    }
    function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
      const controller = Object.create(ReadableByteStreamController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingByteSource.start !== void 0) {
        startAlgorithm = () => underlyingByteSource.start(controller);
      }
      if (underlyingByteSource.pull !== void 0) {
        pullAlgorithm = () => underlyingByteSource.pull(controller);
      }
      if (underlyingByteSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
      }
      const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
      if (autoAllocateChunkSize === 0) {
        throw new TypeError("autoAllocateChunkSize must be greater than 0");
      }
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
    }
    function SetUpReadableStreamBYOBRequest(request, controller, view) {
      request._associatedReadableByteStreamController = controller;
      request._view = view;
    }
    function byobRequestBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
    }
    function byteStreamControllerBrandCheckException(name) {
      return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
    }
    function AcquireReadableStreamBYOBReader(stream) {
      return new ReadableStreamBYOBReader(stream);
    }
    function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
      stream._reader._readIntoRequests.push(readIntoRequest);
    }
    function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readIntoRequest = reader._readIntoRequests.shift();
      if (done) {
        readIntoRequest._closeSteps(chunk);
      } else {
        readIntoRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadIntoRequests(stream) {
      return stream._reader._readIntoRequests.length;
    }
    function ReadableStreamHasBYOBReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamBYOBReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamBYOBReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        if (!IsReadableByteStreamController(stream._readableStreamController)) {
          throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readIntoRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read(view) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("read"));
        }
        if (!ArrayBuffer.isView(view)) {
          return promiseRejectedWith(new TypeError("view must be an array buffer view"));
        }
        if (view.byteLength === 0) {
          return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
        }
        if (view.buffer.byteLength === 0) {
          return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve3, reject) => {
          resolvePromise = resolve3;
          rejectPromise = reject;
        });
        const readIntoRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamBYOBReader(this)) {
          throw byobReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readIntoRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamBYOBReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBReader",
        configurable: true
      });
    }
    function IsReadableStreamBYOBReader(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readIntoRequests")) {
        return false;
      }
      return x instanceof ReadableStreamBYOBReader;
    }
    function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "errored") {
        readIntoRequest._errorSteps(stream._storedError);
      } else {
        ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
      }
    }
    function byobReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
    }
    function ExtractHighWaterMark(strategy, defaultHWM) {
      const { highWaterMark } = strategy;
      if (highWaterMark === void 0) {
        return defaultHWM;
      }
      if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
        throw new RangeError("Invalid highWaterMark");
      }
      return highWaterMark;
    }
    function ExtractSizeAlgorithm(strategy) {
      const { size } = strategy;
      if (!size) {
        return () => 1;
      }
      return size;
    }
    function convertQueuingStrategy(init2, context) {
      assertDictionary(init2, context);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
      return {
        highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
        size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
      };
    }
    function convertQueuingStrategySize(fn, context) {
      assertFunction(fn, context);
      return (chunk) => convertUnrestrictedDouble(fn(chunk));
    }
    function convertUnderlyingSink(original, context) {
      assertDictionary(original, context);
      const abort = original === null || original === void 0 ? void 0 : original.abort;
      const close = original === null || original === void 0 ? void 0 : original.close;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      const write = original === null || original === void 0 ? void 0 : original.write;
      return {
        abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
        close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
        write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
        type
      };
    }
    function convertUnderlyingSinkAbortCallback(fn, original, context) {
      assertFunction(fn, context);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSinkCloseCallback(fn, original, context) {
      assertFunction(fn, context);
      return () => promiseCall(fn, original, []);
    }
    function convertUnderlyingSinkStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertUnderlyingSinkWriteCallback(fn, original, context) {
      assertFunction(fn, context);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    function assertWritableStream(x, context) {
      if (!IsWritableStream(x)) {
        throw new TypeError(`${context} is not a WritableStream.`);
      }
    }
    function isAbortSignal2(value) {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      try {
        return typeof value.aborted === "boolean";
      } catch (_a2) {
        return false;
      }
    }
    const supportsAbortController = typeof AbortController === "function";
    function createAbortController() {
      if (supportsAbortController) {
        return new AbortController();
      }
      return void 0;
    }
    class WritableStream {
      constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
        if (rawUnderlyingSink === void 0) {
          rawUnderlyingSink = null;
        } else {
          assertObject(rawUnderlyingSink, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
        InitializeWritableStream(this);
        const type = underlyingSink.type;
        if (type !== void 0) {
          throw new RangeError("Invalid type is specified");
        }
        const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
        const highWaterMark = ExtractHighWaterMark(strategy, 1);
        SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
      }
      get locked() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("locked");
        }
        return IsWritableStreamLocked(this);
      }
      abort(reason = void 0) {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("abort"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
        }
        return WritableStreamAbort(this, reason);
      }
      close() {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("close"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
        }
        if (WritableStreamCloseQueuedOrInFlight(this)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamClose(this);
      }
      getWriter() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("getWriter");
        }
        return AcquireWritableStreamDefaultWriter(this);
      }
    }
    Object.defineProperties(WritableStream.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      getWriter: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStream",
        configurable: true
      });
    }
    function AcquireWritableStreamDefaultWriter(stream) {
      return new WritableStreamDefaultWriter(stream);
    }
    function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(WritableStream.prototype);
      InitializeWritableStream(stream);
      const controller = Object.create(WritableStreamDefaultController.prototype);
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function InitializeWritableStream(stream) {
      stream._state = "writable";
      stream._storedError = void 0;
      stream._writer = void 0;
      stream._writableStreamController = void 0;
      stream._writeRequests = new SimpleQueue();
      stream._inFlightWriteRequest = void 0;
      stream._closeRequest = void 0;
      stream._inFlightCloseRequest = void 0;
      stream._pendingAbortRequest = void 0;
      stream._backpressure = false;
    }
    function IsWritableStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_writableStreamController")) {
        return false;
      }
      return x instanceof WritableStream;
    }
    function IsWritableStreamLocked(stream) {
      if (stream._writer === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamAbort(stream, reason) {
      var _a2;
      if (stream._state === "closed" || stream._state === "errored") {
        return promiseResolvedWith(void 0);
      }
      stream._writableStreamController._abortReason = reason;
      (_a2 = stream._writableStreamController._abortController) === null || _a2 === void 0 ? void 0 : _a2.abort();
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseResolvedWith(void 0);
      }
      if (stream._pendingAbortRequest !== void 0) {
        return stream._pendingAbortRequest._promise;
      }
      let wasAlreadyErroring = false;
      if (state === "erroring") {
        wasAlreadyErroring = true;
        reason = void 0;
      }
      const promise = newPromise((resolve3, reject) => {
        stream._pendingAbortRequest = {
          _promise: void 0,
          _resolve: resolve3,
          _reject: reject,
          _reason: reason,
          _wasAlreadyErroring: wasAlreadyErroring
        };
      });
      stream._pendingAbortRequest._promise = promise;
      if (!wasAlreadyErroring) {
        WritableStreamStartErroring(stream, reason);
      }
      return promise;
    }
    function WritableStreamClose(stream) {
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
      }
      const promise = newPromise((resolve3, reject) => {
        const closeRequest = {
          _resolve: resolve3,
          _reject: reject
        };
        stream._closeRequest = closeRequest;
      });
      const writer = stream._writer;
      if (writer !== void 0 && stream._backpressure && state === "writable") {
        defaultWriterReadyPromiseResolve(writer);
      }
      WritableStreamDefaultControllerClose(stream._writableStreamController);
      return promise;
    }
    function WritableStreamAddWriteRequest(stream) {
      const promise = newPromise((resolve3, reject) => {
        const writeRequest = {
          _resolve: resolve3,
          _reject: reject
        };
        stream._writeRequests.push(writeRequest);
      });
      return promise;
    }
    function WritableStreamDealWithRejection(stream, error2) {
      const state = stream._state;
      if (state === "writable") {
        WritableStreamStartErroring(stream, error2);
        return;
      }
      WritableStreamFinishErroring(stream);
    }
    function WritableStreamStartErroring(stream, reason) {
      const controller = stream._writableStreamController;
      stream._state = "erroring";
      stream._storedError = reason;
      const writer = stream._writer;
      if (writer !== void 0) {
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
      }
      if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
        WritableStreamFinishErroring(stream);
      }
    }
    function WritableStreamFinishErroring(stream) {
      stream._state = "errored";
      stream._writableStreamController[ErrorSteps]();
      const storedError = stream._storedError;
      stream._writeRequests.forEach((writeRequest) => {
        writeRequest._reject(storedError);
      });
      stream._writeRequests = new SimpleQueue();
      if (stream._pendingAbortRequest === void 0) {
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const abortRequest = stream._pendingAbortRequest;
      stream._pendingAbortRequest = void 0;
      if (abortRequest._wasAlreadyErroring) {
        abortRequest._reject(storedError);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
      uponPromise(promise, () => {
        abortRequest._resolve();
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      }, (reason) => {
        abortRequest._reject(reason);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      });
    }
    function WritableStreamFinishInFlightWrite(stream) {
      stream._inFlightWriteRequest._resolve(void 0);
      stream._inFlightWriteRequest = void 0;
    }
    function WritableStreamFinishInFlightWriteWithError(stream, error2) {
      stream._inFlightWriteRequest._reject(error2);
      stream._inFlightWriteRequest = void 0;
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamFinishInFlightClose(stream) {
      stream._inFlightCloseRequest._resolve(void 0);
      stream._inFlightCloseRequest = void 0;
      const state = stream._state;
      if (state === "erroring") {
        stream._storedError = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._resolve();
          stream._pendingAbortRequest = void 0;
        }
      }
      stream._state = "closed";
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseResolve(writer);
      }
    }
    function WritableStreamFinishInFlightCloseWithError(stream, error2) {
      stream._inFlightCloseRequest._reject(error2);
      stream._inFlightCloseRequest = void 0;
      if (stream._pendingAbortRequest !== void 0) {
        stream._pendingAbortRequest._reject(error2);
        stream._pendingAbortRequest = void 0;
      }
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamCloseQueuedOrInFlight(stream) {
      if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamHasOperationMarkedInFlight(stream) {
      if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamMarkCloseRequestInFlight(stream) {
      stream._inFlightCloseRequest = stream._closeRequest;
      stream._closeRequest = void 0;
    }
    function WritableStreamMarkFirstWriteRequestInFlight(stream) {
      stream._inFlightWriteRequest = stream._writeRequests.shift();
    }
    function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
      if (stream._closeRequest !== void 0) {
        stream._closeRequest._reject(stream._storedError);
        stream._closeRequest = void 0;
      }
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseReject(writer, stream._storedError);
      }
    }
    function WritableStreamUpdateBackpressure(stream, backpressure) {
      const writer = stream._writer;
      if (writer !== void 0 && backpressure !== stream._backpressure) {
        if (backpressure) {
          defaultWriterReadyPromiseReset(writer);
        } else {
          defaultWriterReadyPromiseResolve(writer);
        }
      }
      stream._backpressure = backpressure;
    }
    class WritableStreamDefaultWriter {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
        assertWritableStream(stream, "First parameter");
        if (IsWritableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive writing by another writer");
        }
        this._ownerWritableStream = stream;
        stream._writer = this;
        const state = stream._state;
        if (state === "writable") {
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
            defaultWriterReadyPromiseInitialize(this);
          } else {
            defaultWriterReadyPromiseInitializeAsResolved(this);
          }
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "erroring") {
          defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "closed") {
          defaultWriterReadyPromiseInitializeAsResolved(this);
          defaultWriterClosedPromiseInitializeAsResolved(this);
        } else {
          const storedError = stream._storedError;
          defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
          defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
        }
      }
      get closed() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      get desiredSize() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("desiredSize");
        }
        if (this._ownerWritableStream === void 0) {
          throw defaultWriterLockException("desiredSize");
        }
        return WritableStreamDefaultWriterGetDesiredSize(this);
      }
      get ready() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
        }
        return this._readyPromise;
      }
      abort(reason = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("abort"));
        }
        return WritableStreamDefaultWriterAbort(this, reason);
      }
      close() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("close"));
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("close"));
        }
        if (WritableStreamCloseQueuedOrInFlight(stream)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamDefaultWriterClose(this);
      }
      releaseLock() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("releaseLock");
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return;
        }
        WritableStreamDefaultWriterRelease(this);
      }
      write(chunk = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("write"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        return WritableStreamDefaultWriterWrite(this, chunk);
      }
    }
    Object.defineProperties(WritableStreamDefaultWriter.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      releaseLock: { enumerable: true },
      write: { enumerable: true },
      closed: { enumerable: true },
      desiredSize: { enumerable: true },
      ready: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultWriter",
        configurable: true
      });
    }
    function IsWritableStreamDefaultWriter(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_ownerWritableStream")) {
        return false;
      }
      return x instanceof WritableStreamDefaultWriter;
    }
    function WritableStreamDefaultWriterAbort(writer, reason) {
      const stream = writer._ownerWritableStream;
      return WritableStreamAbort(stream, reason);
    }
    function WritableStreamDefaultWriterClose(writer) {
      const stream = writer._ownerWritableStream;
      return WritableStreamClose(stream);
    }
    function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      return WritableStreamDefaultWriterClose(writer);
    }
    function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
      if (writer._closedPromiseState === "pending") {
        defaultWriterClosedPromiseReject(writer, error2);
      } else {
        defaultWriterClosedPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
      if (writer._readyPromiseState === "pending") {
        defaultWriterReadyPromiseReject(writer, error2);
      } else {
        defaultWriterReadyPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterGetDesiredSize(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (state === "errored" || state === "erroring") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
    }
    function WritableStreamDefaultWriterRelease(writer) {
      const stream = writer._ownerWritableStream;
      const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
      WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
      WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
      stream._writer = void 0;
      writer._ownerWritableStream = void 0;
    }
    function WritableStreamDefaultWriterWrite(writer, chunk) {
      const stream = writer._ownerWritableStream;
      const controller = stream._writableStreamController;
      const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
      if (stream !== writer._ownerWritableStream) {
        return promiseRejectedWith(defaultWriterLockException("write to"));
      }
      const state = stream._state;
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
      }
      if (state === "erroring") {
        return promiseRejectedWith(stream._storedError);
      }
      const promise = WritableStreamAddWriteRequest(stream);
      WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
      return promise;
    }
    const closeSentinel = {};
    class WritableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get abortReason() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("abortReason");
        }
        return this._abortReason;
      }
      get signal() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("signal");
        }
        if (this._abortController === void 0) {
          throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
        }
        return this._abortController.signal;
      }
      error(e = void 0) {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("error");
        }
        const state = this._controlledWritableStream._state;
        if (state !== "writable") {
          return;
        }
        WritableStreamDefaultControllerError(this, e);
      }
      [AbortSteps](reason) {
        const result = this._abortAlgorithm(reason);
        WritableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [ErrorSteps]() {
        ResetQueue(this);
      }
    }
    Object.defineProperties(WritableStreamDefaultController.prototype, {
      error: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultController",
        configurable: true
      });
    }
    function IsWritableStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledWritableStream")) {
        return false;
      }
      return x instanceof WritableStreamDefaultController;
    }
    function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledWritableStream = stream;
      stream._writableStreamController = controller;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._abortReason = void 0;
      controller._abortController = createAbortController();
      controller._started = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._writeAlgorithm = writeAlgorithm;
      controller._closeAlgorithm = closeAlgorithm;
      controller._abortAlgorithm = abortAlgorithm;
      const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
      WritableStreamUpdateBackpressure(stream, backpressure);
      const startResult = startAlgorithm();
      const startPromise = promiseResolvedWith(startResult);
      uponPromise(startPromise, () => {
        controller._started = true;
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (r) => {
        controller._started = true;
        WritableStreamDealWithRejection(stream, r);
      });
    }
    function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(WritableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let writeAlgorithm = () => promiseResolvedWith(void 0);
      let closeAlgorithm = () => promiseResolvedWith(void 0);
      let abortAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSink.start !== void 0) {
        startAlgorithm = () => underlyingSink.start(controller);
      }
      if (underlyingSink.write !== void 0) {
        writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
      }
      if (underlyingSink.close !== void 0) {
        closeAlgorithm = () => underlyingSink.close();
      }
      if (underlyingSink.abort !== void 0) {
        abortAlgorithm = (reason) => underlyingSink.abort(reason);
      }
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function WritableStreamDefaultControllerClearAlgorithms(controller) {
      controller._writeAlgorithm = void 0;
      controller._closeAlgorithm = void 0;
      controller._abortAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function WritableStreamDefaultControllerClose(controller) {
      EnqueueValueWithSize(controller, closeSentinel, 0);
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
      try {
        return controller._strategySizeAlgorithm(chunk);
      } catch (chunkSizeE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
        return 1;
      }
    }
    function WritableStreamDefaultControllerGetDesiredSize(controller) {
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
      try {
        EnqueueValueWithSize(controller, chunk, chunkSize);
      } catch (enqueueE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
        return;
      }
      const stream = controller._controlledWritableStream;
      if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
      }
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
      const stream = controller._controlledWritableStream;
      if (!controller._started) {
        return;
      }
      if (stream._inFlightWriteRequest !== void 0) {
        return;
      }
      const state = stream._state;
      if (state === "erroring") {
        WritableStreamFinishErroring(stream);
        return;
      }
      if (controller._queue.length === 0) {
        return;
      }
      const value = PeekQueueValue(controller);
      if (value === closeSentinel) {
        WritableStreamDefaultControllerProcessClose(controller);
      } else {
        WritableStreamDefaultControllerProcessWrite(controller, value);
      }
    }
    function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
      if (controller._controlledWritableStream._state === "writable") {
        WritableStreamDefaultControllerError(controller, error2);
      }
    }
    function WritableStreamDefaultControllerProcessClose(controller) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkCloseRequestInFlight(stream);
      DequeueValue(controller);
      const sinkClosePromise = controller._closeAlgorithm();
      WritableStreamDefaultControllerClearAlgorithms(controller);
      uponPromise(sinkClosePromise, () => {
        WritableStreamFinishInFlightClose(stream);
      }, (reason) => {
        WritableStreamFinishInFlightCloseWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkFirstWriteRequestInFlight(stream);
      const sinkWritePromise = controller._writeAlgorithm(chunk);
      uponPromise(sinkWritePromise, () => {
        WritableStreamFinishInFlightWrite(stream);
        const state = stream._state;
        DequeueValue(controller);
        if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (reason) => {
        if (stream._state === "writable") {
          WritableStreamDefaultControllerClearAlgorithms(controller);
        }
        WritableStreamFinishInFlightWriteWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerGetBackpressure(controller) {
      const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
      return desiredSize <= 0;
    }
    function WritableStreamDefaultControllerError(controller, error2) {
      const stream = controller._controlledWritableStream;
      WritableStreamDefaultControllerClearAlgorithms(controller);
      WritableStreamStartErroring(stream, error2);
    }
    function streamBrandCheckException$2(name) {
      return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
    }
    function defaultControllerBrandCheckException$2(name) {
      return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
    }
    function defaultWriterBrandCheckException(name) {
      return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
    }
    function defaultWriterLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released writer");
    }
    function defaultWriterClosedPromiseInitialize(writer) {
      writer._closedPromise = newPromise((resolve3, reject) => {
        writer._closedPromise_resolve = resolve3;
        writer._closedPromise_reject = reject;
        writer._closedPromiseState = "pending";
      });
    }
    function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseReject(writer, reason);
    }
    function defaultWriterClosedPromiseInitializeAsResolved(writer) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseResolve(writer);
    }
    function defaultWriterClosedPromiseReject(writer, reason) {
      if (writer._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._closedPromise);
      writer._closedPromise_reject(reason);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "rejected";
    }
    function defaultWriterClosedPromiseResetToRejected(writer, reason) {
      defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterClosedPromiseResolve(writer) {
      if (writer._closedPromise_resolve === void 0) {
        return;
      }
      writer._closedPromise_resolve(void 0);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "resolved";
    }
    function defaultWriterReadyPromiseInitialize(writer) {
      writer._readyPromise = newPromise((resolve3, reject) => {
        writer._readyPromise_resolve = resolve3;
        writer._readyPromise_reject = reject;
      });
      writer._readyPromiseState = "pending";
    }
    function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseReject(writer, reason);
    }
    function defaultWriterReadyPromiseInitializeAsResolved(writer) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseResolve(writer);
    }
    function defaultWriterReadyPromiseReject(writer, reason) {
      if (writer._readyPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._readyPromise);
      writer._readyPromise_reject(reason);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "rejected";
    }
    function defaultWriterReadyPromiseReset(writer) {
      defaultWriterReadyPromiseInitialize(writer);
    }
    function defaultWriterReadyPromiseResetToRejected(writer, reason) {
      defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterReadyPromiseResolve(writer) {
      if (writer._readyPromise_resolve === void 0) {
        return;
      }
      writer._readyPromise_resolve(void 0);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "fulfilled";
    }
    const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
    function isDOMExceptionConstructor(ctor) {
      if (!(typeof ctor === "function" || typeof ctor === "object")) {
        return false;
      }
      try {
        new ctor();
        return true;
      } catch (_a2) {
        return false;
      }
    }
    function createDOMExceptionPolyfill() {
      const ctor = function DOMException2(message, name) {
        this.message = message || "";
        this.name = name || "Error";
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      };
      ctor.prototype = Object.create(Error.prototype);
      Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
      return ctor;
    }
    const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
    function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
      const reader = AcquireReadableStreamDefaultReader(source);
      const writer = AcquireWritableStreamDefaultWriter(dest);
      source._disturbed = true;
      let shuttingDown = false;
      let currentWrite = promiseResolvedWith(void 0);
      return newPromise((resolve3, reject) => {
        let abortAlgorithm;
        if (signal !== void 0) {
          abortAlgorithm = () => {
            const error2 = new DOMException$1("Aborted", "AbortError");
            const actions = [];
            if (!preventAbort) {
              actions.push(() => {
                if (dest._state === "writable") {
                  return WritableStreamAbort(dest, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            if (!preventCancel) {
              actions.push(() => {
                if (source._state === "readable") {
                  return ReadableStreamCancel(source, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
          };
          if (signal.aborted) {
            abortAlgorithm();
            return;
          }
          signal.addEventListener("abort", abortAlgorithm);
        }
        function pipeLoop() {
          return newPromise((resolveLoop, rejectLoop) => {
            function next2(done) {
              if (done) {
                resolveLoop();
              } else {
                PerformPromiseThen(pipeStep(), next2, rejectLoop);
              }
            }
            next2(false);
          });
        }
        function pipeStep() {
          if (shuttingDown) {
            return promiseResolvedWith(true);
          }
          return PerformPromiseThen(writer._readyPromise, () => {
            return newPromise((resolveRead, rejectRead) => {
              ReadableStreamDefaultReaderRead(reader, {
                _chunkSteps: (chunk) => {
                  currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop3);
                  resolveRead(false);
                },
                _closeSteps: () => resolveRead(true),
                _errorSteps: rejectRead
              });
            });
          });
        }
        isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
          if (!preventAbort) {
            shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesClosed(source, reader._closedPromise, () => {
          if (!preventClose) {
            shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
          } else {
            shutdown();
          }
        });
        if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
          const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
          } else {
            shutdown(true, destClosed);
          }
        }
        setPromiseIsHandledToTrue(pipeLoop());
        function waitForWritesToFinish() {
          const oldCurrentWrite = currentWrite;
          return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
        }
        function isOrBecomesErrored(stream, promise, action) {
          if (stream._state === "errored") {
            action(stream._storedError);
          } else {
            uponRejection(promise, action);
          }
        }
        function isOrBecomesClosed(stream, promise, action) {
          if (stream._state === "closed") {
            action();
          } else {
            uponFulfillment(promise, action);
          }
        }
        function shutdownWithAction(action, originalIsError, originalError) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), doTheRest);
          } else {
            doTheRest();
          }
          function doTheRest() {
            uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
          }
        }
        function shutdown(isError, error2) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
          } else {
            finalize(isError, error2);
          }
        }
        function finalize(isError, error2) {
          WritableStreamDefaultWriterRelease(writer);
          ReadableStreamReaderGenericRelease(reader);
          if (signal !== void 0) {
            signal.removeEventListener("abort", abortAlgorithm);
          }
          if (isError) {
            reject(error2);
          } else {
            resolve3(void 0);
          }
        }
      });
    }
    class ReadableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("desiredSize");
        }
        return ReadableStreamDefaultControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("close");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits close");
        }
        ReadableStreamDefaultControllerClose(this);
      }
      enqueue(chunk = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("enqueue");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits enqueue");
        }
        return ReadableStreamDefaultControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("error");
        }
        ReadableStreamDefaultControllerError(this, e);
      }
      [CancelSteps](reason) {
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableStream;
        if (this._queue.length > 0) {
          const chunk = DequeueValue(this);
          if (this._closeRequested && this._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(this);
            ReadableStreamClose(stream);
          } else {
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
          readRequest._chunkSteps(chunk);
        } else {
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableStreamDefaultControllerCallPullIfNeeded(this);
        }
      }
    }
    Object.defineProperties(ReadableStreamDefaultController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultController",
        configurable: true
      });
    }
    function IsReadableStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledReadableStream")) {
        return false;
      }
      return x instanceof ReadableStreamDefaultController;
    }
    function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableStreamDefaultControllerError(controller, e);
      });
    }
    function ReadableStreamDefaultControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableStream;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableStreamDefaultControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function ReadableStreamDefaultControllerClose(controller) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      controller._closeRequested = true;
      if (controller._queue.length === 0) {
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
    }
    function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        ReadableStreamFulfillReadRequest(stream, chunk, false);
      } else {
        let chunkSize;
        try {
          chunkSize = controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          ReadableStreamDefaultControllerError(controller, chunkSizeE);
          throw chunkSizeE;
        }
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          ReadableStreamDefaultControllerError(controller, enqueueE);
          throw enqueueE;
        }
      }
      ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
    function ReadableStreamDefaultControllerError(controller, e) {
      const stream = controller._controlledReadableStream;
      if (stream._state !== "readable") {
        return;
      }
      ResetQueue(controller);
      ReadableStreamDefaultControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableStreamDefaultControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableStreamDefaultControllerHasBackpressure(controller) {
      if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
        return false;
      }
      return true;
    }
    function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
      const state = controller._controlledReadableStream._state;
      if (!controller._closeRequested && state === "readable") {
        return true;
      }
      return false;
    }
    function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledReadableStream = stream;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._started = false;
      controller._closeRequested = false;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }, (r) => {
        ReadableStreamDefaultControllerError(controller, r);
      });
    }
    function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSource.start !== void 0) {
        startAlgorithm = () => underlyingSource.start(controller);
      }
      if (underlyingSource.pull !== void 0) {
        pullAlgorithm = () => underlyingSource.pull(controller);
      }
      if (underlyingSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
      }
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function defaultControllerBrandCheckException$1(name) {
      return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
    }
    function ReadableStreamTee(stream, cloneForBranch2) {
      if (IsReadableByteStreamController(stream._readableStreamController)) {
        return ReadableByteStreamTee(stream);
      }
      return ReadableStreamDefaultTee(stream);
    }
    function ReadableStreamDefaultTee(stream, cloneForBranch2) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve3) => {
        resolveCancelPromise = resolve3;
      });
      function pullAlgorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              const chunk2 = chunk;
              if (!canceled1) {
                ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableStreamDefaultControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableStreamDefaultControllerClose(branch2._readableStreamController);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
      }
      branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
      branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
      uponRejection(reader._closedPromise, (r) => {
        ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
        ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
        if (!canceled1 || !canceled2) {
          resolveCancelPromise(void 0);
        }
      });
      return [branch1, branch2];
    }
    function ReadableByteStreamTee(stream) {
      let reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve3) => {
        resolveCancelPromise = resolve3;
      });
      function forwardReaderError(thisReader) {
        uponRejection(thisReader._closedPromise, (r) => {
          if (thisReader !== reader) {
            return;
          }
          ReadableByteStreamControllerError(branch1._readableStreamController, r);
          ReadableByteStreamControllerError(branch2._readableStreamController, r);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
      }
      function pullWithDefaultReader() {
        if (IsReadableStreamBYOBReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamDefaultReader(stream);
          forwardReaderError(reader);
        }
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              let chunk2 = chunk;
              if (!canceled1 && !canceled2) {
                try {
                  chunk2 = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
              }
              if (!canceled1) {
                ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableByteStreamControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableByteStreamControllerClose(branch2._readableStreamController);
            }
            if (branch1._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
            }
            if (branch2._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
      }
      function pullWithBYOBReader(view, forBranch2) {
        if (IsReadableStreamDefaultReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamBYOBReader(stream);
          forwardReaderError(reader);
        }
        const byobBranch = forBranch2 ? branch2 : branch1;
        const otherBranch = forBranch2 ? branch1 : branch2;
        const readIntoRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!otherCanceled) {
                let clonedChunk;
                try {
                  clonedChunk = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
              } else if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
            });
          },
          _closeSteps: (chunk) => {
            reading = false;
            const byobCanceled = forBranch2 ? canceled2 : canceled1;
            const otherCanceled = forBranch2 ? canceled1 : canceled2;
            if (!byobCanceled) {
              ReadableByteStreamControllerClose(byobBranch._readableStreamController);
            }
            if (!otherCanceled) {
              ReadableByteStreamControllerClose(otherBranch._readableStreamController);
            }
            if (chunk !== void 0) {
              if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
              if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
              }
            }
            if (!byobCanceled || !otherCanceled) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
      }
      function pull1Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, false);
        }
        return promiseResolvedWith(void 0);
      }
      function pull2Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, true);
        }
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
        return;
      }
      branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
      branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
      forwardReaderError(reader);
      return [branch1, branch2];
    }
    function convertUnderlyingDefaultOrByteSource(source, context) {
      assertDictionary(source, context);
      const original = source;
      const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
      const cancel = original === null || original === void 0 ? void 0 : original.cancel;
      const pull = original === null || original === void 0 ? void 0 : original.pull;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      return {
        autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
        cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
        pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
        type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
      };
    }
    function convertUnderlyingSourceCancelCallback(fn, original, context) {
      assertFunction(fn, context);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSourcePullCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertUnderlyingSourceStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertReadableStreamType(type, context) {
      type = `${type}`;
      if (type !== "bytes") {
        throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
      }
      return type;
    }
    function convertReaderOptions(options2, context) {
      assertDictionary(options2, context);
      const mode = options2 === null || options2 === void 0 ? void 0 : options2.mode;
      return {
        mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
      };
    }
    function convertReadableStreamReaderMode(mode, context) {
      mode = `${mode}`;
      if (mode !== "byob") {
        throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
      }
      return mode;
    }
    function convertIteratorOptions(options2, context) {
      assertDictionary(options2, context);
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      return { preventCancel: Boolean(preventCancel) };
    }
    function convertPipeOptions(options2, context) {
      assertDictionary(options2, context);
      const preventAbort = options2 === null || options2 === void 0 ? void 0 : options2.preventAbort;
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      const preventClose = options2 === null || options2 === void 0 ? void 0 : options2.preventClose;
      const signal = options2 === null || options2 === void 0 ? void 0 : options2.signal;
      if (signal !== void 0) {
        assertAbortSignal(signal, `${context} has member 'signal' that`);
      }
      return {
        preventAbort: Boolean(preventAbort),
        preventCancel: Boolean(preventCancel),
        preventClose: Boolean(preventClose),
        signal
      };
    }
    function assertAbortSignal(signal, context) {
      if (!isAbortSignal2(signal)) {
        throw new TypeError(`${context} is not an AbortSignal.`);
      }
    }
    function convertReadableWritablePair(pair, context) {
      assertDictionary(pair, context);
      const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
      assertRequiredField(readable, "readable", "ReadableWritablePair");
      assertReadableStream(readable, `${context} has member 'readable' that`);
      const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
      assertRequiredField(writable2, "writable", "ReadableWritablePair");
      assertWritableStream(writable2, `${context} has member 'writable' that`);
      return { readable, writable: writable2 };
    }
    class ReadableStream2 {
      constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
        if (rawUnderlyingSource === void 0) {
          rawUnderlyingSource = null;
        } else {
          assertObject(rawUnderlyingSource, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
        InitializeReadableStream(this);
        if (underlyingSource.type === "bytes") {
          if (strategy.size !== void 0) {
            throw new RangeError("The strategy for a byte stream cannot have a size function");
          }
          const highWaterMark = ExtractHighWaterMark(strategy, 0);
          SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
        } else {
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
        }
      }
      get locked() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("locked");
        }
        return IsReadableStreamLocked(this);
      }
      cancel(reason = void 0) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("cancel"));
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
        }
        return ReadableStreamCancel(this, reason);
      }
      getReader(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("getReader");
        }
        const options2 = convertReaderOptions(rawOptions, "First parameter");
        if (options2.mode === void 0) {
          return AcquireReadableStreamDefaultReader(this);
        }
        return AcquireReadableStreamBYOBReader(this);
      }
      pipeThrough(rawTransform, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("pipeThrough");
        }
        assertRequiredArgument(rawTransform, 1, "pipeThrough");
        const transform2 = convertReadableWritablePair(rawTransform, "First parameter");
        const options2 = convertPipeOptions(rawOptions, "Second parameter");
        if (IsReadableStreamLocked(this)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
        }
        if (IsWritableStreamLocked(transform2.writable)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
        }
        const promise = ReadableStreamPipeTo(this, transform2.writable, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
        setPromiseIsHandledToTrue(promise);
        return transform2.readable;
      }
      pipeTo(destination, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
        }
        if (destination === void 0) {
          return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
        }
        if (!IsWritableStream(destination)) {
          return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
        }
        let options2;
        try {
          options2 = convertPipeOptions(rawOptions, "Second parameter");
        } catch (e) {
          return promiseRejectedWith(e);
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
        }
        if (IsWritableStreamLocked(destination)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
        }
        return ReadableStreamPipeTo(this, destination, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
      }
      tee() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("tee");
        }
        const branches = ReadableStreamTee(this);
        return CreateArrayFromList(branches);
      }
      values(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("values");
        }
        const options2 = convertIteratorOptions(rawOptions, "First parameter");
        return AcquireReadableStreamAsyncIterator(this, options2.preventCancel);
      }
    }
    Object.defineProperties(ReadableStream2.prototype, {
      cancel: { enumerable: true },
      getReader: { enumerable: true },
      pipeThrough: { enumerable: true },
      pipeTo: { enumerable: true },
      tee: { enumerable: true },
      values: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStream",
        configurable: true
      });
    }
    if (typeof SymbolPolyfill.asyncIterator === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
        value: ReadableStream2.prototype.values,
        writable: true,
        configurable: true
      });
    }
    function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableByteStreamController.prototype);
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
      return stream;
    }
    function InitializeReadableStream(stream) {
      stream._state = "readable";
      stream._reader = void 0;
      stream._storedError = void 0;
      stream._disturbed = false;
    }
    function IsReadableStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readableStreamController")) {
        return false;
      }
      return x instanceof ReadableStream2;
    }
    function IsReadableStreamLocked(stream) {
      if (stream._reader === void 0) {
        return false;
      }
      return true;
    }
    function ReadableStreamCancel(stream, reason) {
      stream._disturbed = true;
      if (stream._state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (stream._state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      ReadableStreamClose(stream);
      const reader = stream._reader;
      if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._closeSteps(void 0);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
      const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
      return transformPromiseWith(sourceCancelPromise, noop3);
    }
    function ReadableStreamClose(stream) {
      stream._state = "closed";
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseResolve(reader);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._closeSteps();
        });
        reader._readRequests = new SimpleQueue();
      }
    }
    function ReadableStreamError(stream, e) {
      stream._state = "errored";
      stream._storedError = e;
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseReject(reader, e);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._errorSteps(e);
        });
        reader._readRequests = new SimpleQueue();
      } else {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._errorSteps(e);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
    }
    function streamBrandCheckException$1(name) {
      return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
    }
    function convertQueuingStrategyInit(init2, context) {
      assertDictionary(init2, context);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
      return {
        highWaterMark: convertUnrestrictedDouble(highWaterMark)
      };
    }
    const byteLengthSizeFunction = (chunk) => {
      return chunk.byteLength;
    };
    Object.defineProperty(byteLengthSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class ByteLengthQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "ByteLengthQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._byteLengthQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("highWaterMark");
        }
        return this._byteLengthQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("size");
        }
        return byteLengthSizeFunction;
      }
    }
    Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "ByteLengthQueuingStrategy",
        configurable: true
      });
    }
    function byteLengthBrandCheckException(name) {
      return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
    }
    function IsByteLengthQueuingStrategy(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_byteLengthQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x instanceof ByteLengthQueuingStrategy;
    }
    const countSizeFunction = () => {
      return 1;
    };
    Object.defineProperty(countSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class CountQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "CountQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._countQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("highWaterMark");
        }
        return this._countQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("size");
        }
        return countSizeFunction;
      }
    }
    Object.defineProperties(CountQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "CountQueuingStrategy",
        configurable: true
      });
    }
    function countBrandCheckException(name) {
      return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
    }
    function IsCountQueuingStrategy(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_countQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x instanceof CountQueuingStrategy;
    }
    function convertTransformer(original, context) {
      assertDictionary(original, context);
      const flush2 = original === null || original === void 0 ? void 0 : original.flush;
      const readableType = original === null || original === void 0 ? void 0 : original.readableType;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const transform2 = original === null || original === void 0 ? void 0 : original.transform;
      const writableType = original === null || original === void 0 ? void 0 : original.writableType;
      return {
        flush: flush2 === void 0 ? void 0 : convertTransformerFlushCallback(flush2, original, `${context} has member 'flush' that`),
        readableType,
        start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
        transform: transform2 === void 0 ? void 0 : convertTransformerTransformCallback(transform2, original, `${context} has member 'transform' that`),
        writableType
      };
    }
    function convertTransformerFlushCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertTransformerStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertTransformerTransformCallback(fn, original, context) {
      assertFunction(fn, context);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    class TransformStream {
      constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
        if (rawTransformer === void 0) {
          rawTransformer = null;
        }
        const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
        const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
        const transformer = convertTransformer(rawTransformer, "First parameter");
        if (transformer.readableType !== void 0) {
          throw new RangeError("Invalid readableType specified");
        }
        if (transformer.writableType !== void 0) {
          throw new RangeError("Invalid writableType specified");
        }
        const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
        const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
        const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
        const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
        let startPromise_resolve;
        const startPromise = newPromise((resolve3) => {
          startPromise_resolve = resolve3;
        });
        InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
        if (transformer.start !== void 0) {
          startPromise_resolve(transformer.start(this._transformStreamController));
        } else {
          startPromise_resolve(void 0);
        }
      }
      get readable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("readable");
        }
        return this._readable;
      }
      get writable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("writable");
        }
        return this._writable;
      }
    }
    Object.defineProperties(TransformStream.prototype, {
      readable: { enumerable: true },
      writable: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStream",
        configurable: true
      });
    }
    function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
      function startAlgorithm() {
        return startPromise;
      }
      function writeAlgorithm(chunk) {
        return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
      }
      function abortAlgorithm(reason) {
        return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
      }
      function closeAlgorithm() {
        return TransformStreamDefaultSinkCloseAlgorithm(stream);
      }
      stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
      function pullAlgorithm() {
        return TransformStreamDefaultSourcePullAlgorithm(stream);
      }
      function cancelAlgorithm(reason) {
        TransformStreamErrorWritableAndUnblockWrite(stream, reason);
        return promiseResolvedWith(void 0);
      }
      stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
      stream._backpressure = void 0;
      stream._backpressureChangePromise = void 0;
      stream._backpressureChangePromise_resolve = void 0;
      TransformStreamSetBackpressure(stream, true);
      stream._transformStreamController = void 0;
    }
    function IsTransformStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_transformStreamController")) {
        return false;
      }
      return x instanceof TransformStream;
    }
    function TransformStreamError(stream, e) {
      ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
      TransformStreamErrorWritableAndUnblockWrite(stream, e);
    }
    function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
      TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
      WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
      if (stream._backpressure) {
        TransformStreamSetBackpressure(stream, false);
      }
    }
    function TransformStreamSetBackpressure(stream, backpressure) {
      if (stream._backpressureChangePromise !== void 0) {
        stream._backpressureChangePromise_resolve();
      }
      stream._backpressureChangePromise = newPromise((resolve3) => {
        stream._backpressureChangePromise_resolve = resolve3;
      });
      stream._backpressure = backpressure;
    }
    class TransformStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("desiredSize");
        }
        const readableController = this._controlledTransformStream._readable._readableStreamController;
        return ReadableStreamDefaultControllerGetDesiredSize(readableController);
      }
      enqueue(chunk = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("enqueue");
        }
        TransformStreamDefaultControllerEnqueue(this, chunk);
      }
      error(reason = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("error");
        }
        TransformStreamDefaultControllerError(this, reason);
      }
      terminate() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("terminate");
        }
        TransformStreamDefaultControllerTerminate(this);
      }
    }
    Object.defineProperties(TransformStreamDefaultController.prototype, {
      enqueue: { enumerable: true },
      error: { enumerable: true },
      terminate: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStreamDefaultController",
        configurable: true
      });
    }
    function IsTransformStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledTransformStream")) {
        return false;
      }
      return x instanceof TransformStreamDefaultController;
    }
    function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
      controller._controlledTransformStream = stream;
      stream._transformStreamController = controller;
      controller._transformAlgorithm = transformAlgorithm;
      controller._flushAlgorithm = flushAlgorithm;
    }
    function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
      const controller = Object.create(TransformStreamDefaultController.prototype);
      let transformAlgorithm = (chunk) => {
        try {
          TransformStreamDefaultControllerEnqueue(controller, chunk);
          return promiseResolvedWith(void 0);
        } catch (transformResultE) {
          return promiseRejectedWith(transformResultE);
        }
      };
      let flushAlgorithm = () => promiseResolvedWith(void 0);
      if (transformer.transform !== void 0) {
        transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
      }
      if (transformer.flush !== void 0) {
        flushAlgorithm = () => transformer.flush(controller);
      }
      SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
    }
    function TransformStreamDefaultControllerClearAlgorithms(controller) {
      controller._transformAlgorithm = void 0;
      controller._flushAlgorithm = void 0;
    }
    function TransformStreamDefaultControllerEnqueue(controller, chunk) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
        throw new TypeError("Readable side is not in a state that permits enqueue");
      }
      try {
        ReadableStreamDefaultControllerEnqueue(readableController, chunk);
      } catch (e) {
        TransformStreamErrorWritableAndUnblockWrite(stream, e);
        throw stream._readable._storedError;
      }
      const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
      if (backpressure !== stream._backpressure) {
        TransformStreamSetBackpressure(stream, true);
      }
    }
    function TransformStreamDefaultControllerError(controller, e) {
      TransformStreamError(controller._controlledTransformStream, e);
    }
    function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
      const transformPromise = controller._transformAlgorithm(chunk);
      return transformPromiseWith(transformPromise, void 0, (r) => {
        TransformStreamError(controller._controlledTransformStream, r);
        throw r;
      });
    }
    function TransformStreamDefaultControllerTerminate(controller) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      ReadableStreamDefaultControllerClose(readableController);
      const error2 = new TypeError("TransformStream terminated");
      TransformStreamErrorWritableAndUnblockWrite(stream, error2);
    }
    function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
      const controller = stream._transformStreamController;
      if (stream._backpressure) {
        const backpressureChangePromise = stream._backpressureChangePromise;
        return transformPromiseWith(backpressureChangePromise, () => {
          const writable2 = stream._writable;
          const state = writable2._state;
          if (state === "erroring") {
            throw writable2._storedError;
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        });
      }
      return TransformStreamDefaultControllerPerformTransform(controller, chunk);
    }
    function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
      TransformStreamError(stream, reason);
      return promiseResolvedWith(void 0);
    }
    function TransformStreamDefaultSinkCloseAlgorithm(stream) {
      const readable = stream._readable;
      const controller = stream._transformStreamController;
      const flushPromise = controller._flushAlgorithm();
      TransformStreamDefaultControllerClearAlgorithms(controller);
      return transformPromiseWith(flushPromise, () => {
        if (readable._state === "errored") {
          throw readable._storedError;
        }
        ReadableStreamDefaultControllerClose(readable._readableStreamController);
      }, (r) => {
        TransformStreamError(stream, r);
        throw readable._storedError;
      });
    }
    function TransformStreamDefaultSourcePullAlgorithm(stream) {
      TransformStreamSetBackpressure(stream, false);
      return stream._backpressureChangePromise;
    }
    function defaultControllerBrandCheckException(name) {
      return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
    }
    function streamBrandCheckException(name) {
      return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
    }
    exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
    exports2.CountQueuingStrategy = CountQueuingStrategy;
    exports2.ReadableByteStreamController = ReadableByteStreamController;
    exports2.ReadableStream = ReadableStream2;
    exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
    exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
    exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
    exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
    exports2.TransformStream = TransformStream;
    exports2.TransformStreamDefaultController = TransformStreamDefaultController;
    exports2.WritableStream = WritableStream;
    exports2.WritableStreamDefaultController = WritableStreamDefaultController;
    exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
})(ponyfill_es2018, ponyfill_es2018.exports);
var POOL_SIZE$1 = 65536;
if (!globalThis.ReadableStream) {
  try {
    Object.assign(globalThis, __require("stream/web"));
  } catch (error2) {
    Object.assign(globalThis, ponyfill_es2018.exports);
  }
}
try {
  const { Blob: Blob2 } = __require("buffer");
  if (Blob2 && !Blob2.prototype.stream) {
    Blob2.prototype.stream = function name(params) {
      let position = 0;
      const blob = this;
      return new ReadableStream({
        type: "bytes",
        async pull(ctrl) {
          const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
          const buffer = await chunk.arrayBuffer();
          position += buffer.byteLength;
          ctrl.enqueue(new Uint8Array(buffer));
          if (position === blob.size) {
            ctrl.close();
          }
        }
      });
    };
  }
} catch (error2) {
}
var POOL_SIZE = 65536;
async function* toIterator(parts, clone2 = true) {
  for (let part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        let end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var _parts, _type, _size, _a;
var _Blob = (_a = class {
  constructor(blobParts = [], options2 = {}) {
    __privateAdd(this, _parts, []);
    __privateAdd(this, _type, "");
    __privateAdd(this, _size, 0);
    let size = 0;
    const parts = blobParts.map((element) => {
      let part;
      if (ArrayBuffer.isView(element)) {
        part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
      } else if (element instanceof ArrayBuffer) {
        part = new Uint8Array(element.slice(0));
      } else if (element instanceof _a) {
        part = element;
      } else {
        part = new TextEncoder().encode(element);
      }
      size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
      return part;
    });
    const type = options2.type === void 0 ? "" : String(options2.type);
    __privateSet(this, _type, /[^\u0020-\u007E]/.test(type) ? "" : type);
    __privateSet(this, _size, size);
    __privateSet(this, _parts, parts);
  }
  get size() {
    return __privateGet(this, _size);
  }
  get type() {
    return __privateGet(this, _type);
  }
  async text() {
    const decoder = new TextDecoder();
    let str = "";
    for await (let part of toIterator(__privateGet(this, _parts), false)) {
      str += decoder.decode(part, { stream: true });
    }
    str += decoder.decode();
    return str;
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset2 = 0;
    for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
      data.set(chunk, offset2);
      offset2 += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    const it = toIterator(__privateGet(this, _parts), true);
    return new ReadableStream({
      type: "bytes",
      async pull(ctrl) {
        const chunk = await it.next();
        chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
      }
    });
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = __privateGet(this, _parts);
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      if (added >= span) {
        break;
      }
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        let chunk;
        if (ArrayBuffer.isView(part)) {
          chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.byteLength;
        } else {
          chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.size;
        }
        blobParts.push(chunk);
        relativeStart = 0;
      }
    }
    const blob = new _a([], { type: String(type).toLowerCase() });
    __privateSet(blob, _size, span);
    __privateSet(blob, _parts, blobParts);
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
}, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _a);
Object.defineProperties(_Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var Blob = _Blob;
var Blob$1 = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => randomBytes(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    length += isBlob(value) ? value.size : Buffer.byteLength(String(value));
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = Stream.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof Stream) {
      body.on("error", (error_) => {
        const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = Stream.Readable.from(body.stream());
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof Stream)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof Stream && typeof body.getBoundary !== "function") {
    p1 = new PassThrough({ highWaterMark });
    p2 = new PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof Stream) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    Stream.Readable.from(body.stream()).pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error2;
  }
};
var validateHeaderValue = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
    throw error2;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status != null ? options2.status : 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      type: "default",
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS$1].type;
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response(null, { status: 0, statusText: "" });
    response[INTERNALS$1].type = "error";
    return response;
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return format(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve3, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = dataUriToBuffer$1(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve3(response2);
      return;
    }
    const send2 = (options2.protocol === "https:" ? https : http).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof Stream.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send2(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve3(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = pipeline(response_, new PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve3(response);
        return;
      }
      const zlibOptions = {
        flush: zlib.Z_SYNC_FLUSH,
        finishFlush: zlib.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pipeline(body, zlib.createGunzip(zlibOptions), reject);
        response = new Response(body, responseOptions);
        resolve3(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pipeline(response_, new PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? pipeline(body, zlib.createInflate(), reject) : pipeline(body, zlib.createInflateRaw(), reject);
          response = new Response(body, responseOptions);
          resolve3(response);
        });
        return;
      }
      if (codings === "br") {
        body = pipeline(body, zlib.createBrotliDecompress(), reject);
        response = new Response(body, responseOptions);
        resolve3(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve3(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}

// node_modules/@sveltejs/adapter-node/files/shims.js
Object.defineProperty(globalThis, "require", {
  enumerable: true,
  value: createRequire(import.meta.url)
});

// .svelte-kit/output/server/app.js
import cookie from "cookie";
import { v4 } from "@lukeed/uuid";
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error$1(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  const params = route.params(match);
  const response = await handler(__spreadProps(__spreadValues({}, request), { params }));
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error$1(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = __spreadProps(__spreadValues({}, headers), { "content-type": "application/json; charset=utf-8" });
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a2) {
            var k = _a2[0], v = _a2[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next2 = str.charCodeAt(i + 1);
      if (code <= 56319 && (next2 >= 56320 && next2 <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape$1(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape$1(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape$1(str, dict, unicode_encoder) {
  let result = "";
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next2 = str.charCodeAt(i + 1);
      if (code <= 56319 && next2 >= 56320 && next2 <= 57343) {
        result += char + str[++i];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles2 = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles2.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles2.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles2).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page && page.path)},
						query: new URLSearchParams(${page ? s$1(page.query.toString()) : ""}),
						params: ${page && s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles2.size && !options2.amp ? `<style data-svelte>${Array.from(styles2).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url)}`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = __spreadValues({}, opts.headers);
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = __spreadProps(__spreadValues({}, opts.headers), {
                cookie: request.headers.cookie
              });
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, _receiver) {
              async function text2() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text2;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text2());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: __spreadValues({}, stuff)
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      stuff: loaded ? loaded.stuff : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            }));
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  }));
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
        }
      }
    }
  try {
    return with_cookies(await render_response(__spreadProps(__spreadValues({}, opts), {
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error(__spreadProps(__spreadValues({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd2(this, _map, void 0);
    __privateSet2(this, _map, map);
  }
  get(key) {
    const value = __privateGet2(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet2(this, _map).get(key);
  }
  has(key) {
    return __privateGet2(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet2(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet2(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet2(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet2(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text2 = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text2();
    case "application/json":
      return JSON.parse(text2());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text2());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text2(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text2) {
  const { data, append: append2 } = read_only_form_data();
  text2.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append2(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text2, boundary) {
  const parts = text2.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append: append2 } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append2(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = __spreadProps(__spreadValues({}, incoming), {
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  });
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event2 = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event2);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var flushing = false;
var seen_callbacks = new Set();
function flush() {
  if (flushing)
    return;
  flushing = true;
  do {
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update$1(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}
function update$1($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, classes_to_add) {
  const attributes = Object.assign({}, ...args);
  if (classes_to_add) {
    if (attributes.class == null) {
      attributes.class = classes_to_add;
    } else {
      attributes.class += " " + classes_to_add;
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
var escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html2) {
  return String(html2).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }
  return result;
}
function each$1(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html2 = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html2;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html2 = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html: html2,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var css$9 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$9);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
var base = "";
var assets = "";
function set_paths(paths2) {
  base = paths2.base;
  assets = paths2.assets || base;
}
function set_prerendering(value) {
}
var handle = async ({ request, resolve: resolve22 }) => {
  const cookies = cookie.parse(request.headers.cookie || "");
  request.locals.userid = cookies.userid || v4();
  if (request.query.has("_method")) {
    request.method = request.query.get("_method").toUpperCase();
  }
  const response = await resolve22(request);
  if (!cookies.userid) {
    response.headers["set-cookie"] = cookie.serialize("userid", request.locals.userid, {
      path: "/",
      httpOnly: true
    });
  }
  return response;
};
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  handle
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="/favicon.svg" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    ' + head + '\n  </head>\n  <body>\n    <div id="svelte">' + body + "</div>\n  </body>\n</html>\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-c7182663.js",
      css: [assets + "/_app/assets/start-61d1577b.css"],
      js: [assets + "/_app/start-c7182663.js", assets + "/_app/chunks/vendor-336043de.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{ "file": "favicon.svg", "size": 2489, "type": "image/svg+xml" }, { "file": "img/1.jpg", "size": 73445, "type": "image/jpeg" }, { "file": "img/2.jpg", "size": 90526, "type": "image/jpeg" }, { "file": "img/3.jpg", "size": 92454, "type": "image/jpeg" }, { "file": "img/krzysztof-13 - Copy.jpg", "size": 4175631, "type": "image/jpeg" }, { "file": "img/Liberte juices.svg", "size": 16694, "type": "image/svg+xml" }, { "file": "img/logos/absa.png", "size": 14358, "type": "image/png" }, { "file": "img/logos/amsco.png", "size": 21859, "type": "image/png" }, { "file": "img/logos/anchor.jpg", "size": 29460, "type": "image/jpeg" }, { "file": "img/logos/anchor.png", "size": 15083, "type": "image/png" }, { "file": "img/logos/EA law.jpg", "size": 19581, "type": "image/jpeg" }, { "file": "img/logos/EA law.png", "size": 6439, "type": "image/png" }, { "file": "img/logos/eaglehr.jpg", "size": 15864, "type": "image/jpeg" }, { "file": "img/logos/eaglehr.png", "size": 20874, "type": "image/png" }, { "file": "img/logos/EALaw.svg", "size": 7397, "type": "image/svg+xml" }, { "file": "img/logos/farmhouse.png", "size": 18187, "type": "image/png" }, { "file": "img/logos/imex.jpg", "size": 33450, "type": "image/jpeg" }, { "file": "img/logos/imex.png", "size": 10315, "type": "image/png" }, { "file": "img/logos/keynessian.jpg", "size": 35434, "type": "image/jpeg" }, { "file": "img/logos/keynessian.png", "size": 31736, "type": "image/png" }, { "file": "img/logos/Liberte.jpg", "size": 20405, "type": "image/jpeg" }, { "file": "img/logos/Liberte.png", "size": 15520, "type": "image/png" }, { "file": "img/logos/maxed.jpg", "size": 17989, "type": "image/jpeg" }, { "file": "img/logos/maxed.png", "size": 11693, "type": "image/png" }, { "file": "img/logos/strathmore.png", "size": 64625, "type": "image/png" }, { "file": "img/recent/1.jpg", "size": 122952, "type": "image/jpeg" }, { "file": "img/recent/2.jpg", "size": 51702, "type": "image/jpeg" }, { "file": "img/recent/3.jpg", "size": 285918, "type": "image/jpeg" }, { "file": "img/recent/4.jpg", "size": 26439, "type": "image/jpeg" }, { "file": "img/recent/5.jpg", "size": 21e3, "type": "image/jpeg" }, { "file": "img/recent/6.jpg", "size": 45873, "type": "image/jpeg" }, { "file": "img/recent/7.jpg", "size": 42114, "type": "image/jpeg" }, { "file": "img/recent/8.jpg", "size": 87353, "type": "image/jpeg" }, { "file": "img/recent/9.jpg", "size": 51720, "type": "image/jpeg" }, { "file": "img/recent/anchor 1.jpg", "size": 58739, "type": "image/jpeg" }, { "file": "img/recent/anchor 2.jpg", "size": 57693, "type": "image/jpeg" }, { "file": "img/recent/anchor 3.jpg", "size": 55053, "type": "image/jpeg" }, { "file": "img/recent/anchor hero.png", "size": 20394, "type": "image/png" }, { "file": "img/recent/branded.jpg", "size": 111541, "type": "image/jpeg" }, { "file": "img/recent/branded.png", "size": 254485, "type": "image/png" }, { "file": "img/recent/brochure.jpg", "size": 120185, "type": "image/jpeg" }, { "file": "img/recent/calendar.jpg", "size": 78286, "type": "image/jpeg" }, { "file": "img/recent/calendar2.jpg", "size": 122816, "type": "image/jpeg" }, { "file": "img/recent/cards.jpg", "size": 32990, "type": "image/jpeg" }, { "file": "img/recent/carrier bags.jpg", "size": 86224, "type": "image/jpeg" }, { "file": "img/recent/liberte.jpg", "size": 98601, "type": "image/jpeg" }, { "file": "img/recent/mask.jpg", "size": 69932, "type": "image/jpeg" }, { "file": "img/recent/poloshirts.jpg", "size": 99363, "type": "image/jpeg" }, { "file": "img/social/behance.png", "size": 8712, "type": "image/png" }, { "file": "img/social/instagram.png", "size": 10743, "type": "image/png" }, { "file": "img/social/linkedin.png", "size": 6742, "type": "image/png" }, { "file": "img/social/twitter.png", "size": 8726, "type": "image/png" }, { "file": "img/visign-logo.svg", "size": 2657, "type": "image/svg+xml" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/about\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/about.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/menu\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/menu.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/work\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/work.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve22 }) => resolve22(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/about.svelte": () => Promise.resolve().then(function() {
    return about;
  }),
  "src/routes/menu.svelte": () => Promise.resolve().then(function() {
    return menu;
  }),
  "src/routes/work.svelte": () => Promise.resolve().then(function() {
    return work;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-9be074c9.js", "css": ["assets/pages/__layout.svelte-5c0cc040.css"], "js": ["pages/__layout.svelte-9be074c9.js", "chunks/vendor-336043de.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-086a6be9.js", "css": [], "js": ["error.svelte-086a6be9.js", "chunks/vendor-336043de.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-06131484.js", "css": ["assets/pages/index.svelte-c3abe778.css", "assets/pagination.min-4d3a60e0.css"], "js": ["pages/index.svelte-06131484.js", "chunks/vendor-336043de.js"], "styles": [] }, "src/routes/about.svelte": { "entry": "pages/about.svelte-542f1110.js", "css": ["assets/pages/about.svelte-e6bbc2b1.css", "assets/pagination.min-4d3a60e0.css"], "js": ["pages/about.svelte-542f1110.js", "chunks/vendor-336043de.js"], "styles": [] }, "src/routes/menu.svelte": { "entry": "pages/menu.svelte-9774df1f.js", "css": [], "js": ["pages/menu.svelte-9774df1f.js", "chunks/vendor-336043de.js"], "styles": [] }, "src/routes/work.svelte": { "entry": "pages/work.svelte-3c781599.js", "css": ["assets/pages/work.svelte-76d95d68.css"], "js": ["pages/work.svelte-3c781599.js", "chunks/vendor-336043de.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles: styles2 } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles: styles2
  };
}
function render(request, {
  prerender: prerender2
} = {}) {
  const host = request.headers["host"];
  return respond(__spreadProps(__spreadValues({}, request), { host }), options, { prerender: prerender2 });
}
var css$8 = {
  code: ".menu.svelte-16wmh91.svelte-16wmh91{width:90%;margin:0 auto;display:flex;align-items:center;justify-content:space-between;margin-top:1.2rem}.menu.svelte-16wmh91 img.svelte-16wmh91{display:block;height:36px}.container.svelte-16wmh91.svelte-16wmh91{cursor:pointer}.bar1.svelte-16wmh91.svelte-16wmh91,.bar2.svelte-16wmh91.svelte-16wmh91,.bar3.svelte-16wmh91.svelte-16wmh91{width:32px;height:3px;background-color:var(--text-color);margin:8px 0;transition:0.4s}.change.svelte-16wmh91 .bar1.svelte-16wmh91{-webkit-transform:rotate(-45deg) translate(-9px, 6px);transform:rotate(-45deg) translate(-9px, 6px)}.change.svelte-16wmh91 .bar2.svelte-16wmh91{opacity:0}.change.svelte-16wmh91 .bar3.svelte-16wmh91{-webkit-transform:rotate(45deg) translate(-8px, -8px);transform:rotate(45deg) translate(-8px, -8px)}.sidenav.svelte-16wmh91.svelte-16wmh91{height:100%;width:0;position:fixed;z-index:9;top:0;left:0;background-color:var(--primary-color);opacity:0.98999;overflow-x:hidden;padding-top:60px;transition:0.5s}.sidenav.svelte-16wmh91 a.svelte-16wmh91{padding:28px 8px 28px 32px;text-decoration:none;font-size:20px;color:var(--text-color);display:block;transition:0.3s;border-bottom:1px solid var(--secondary-color)}.sidenav.svelte-16wmh91 a.svelte-16wmh91:first-child{padding-top:19px}.sidenav.svelte-16wmh91 a.svelte-16wmh91:first-child,.sidenav.svelte-16wmh91 a.svelte-16wmh91:last-child{border-bottom:none}.sidenav.svelte-16wmh91 a.svelte-16wmh91:hover{color:#f1f1f1;color:var(--accent-color)}.sidenav.svelte-16wmh91 .closebtn.svelte-16wmh91{position:absolute;top:0;right:25px;font-size:36px;margin-left:50px}.open.svelte-16wmh91.svelte-16wmh91{width:60%}@media(min-width: 768px){.container.svelte-16wmh91.svelte-16wmh91{display:none}.navigation.svelte-16wmh91.svelte-16wmh91{width:90%;max-width:1600px;margin:auto;display:flex;justify-content:space-between;align-items:center;position:relative;height:fit-content;margin-top:0.75rem}.menu.svelte-16wmh91.svelte-16wmh91{margin:0}.sidenav.svelte-16wmh91.svelte-16wmh91{display:flex;height:100%;width:100%;position:static;background-color:transparent;overflow-x:hidden;padding-top:0;transition:0s;justify-content:flex-end}.sidenav.svelte-16wmh91 a.svelte-16wmh91{font-size:18px}.sidenav.svelte-16wmh91 a.svelte-16wmh91:first-child{display:none}.sidenav.svelte-16wmh91 a.svelte-16wmh91{margin:0;padding:0;padding-left:2.4rem}.sidenav.svelte-16wmh91 .closebtn.svelte-16wmh91{position:static;top:0;right:0;font-size:36px;margin-left:0}}",
  map: `{"version":3,"file":"Canvas.svelte","sources":["Canvas.svelte"],"sourcesContent":["<script>\\n  let navOpen = false\\n\\n  function handleNav() {\\n    navOpen = !navOpen\\n  }\\n\\n  function handleNavWithKey(e) {\\n    console.log(e.code)\\n    if (e.code === 'F1') {\\n      navOpen = !navOpen\\n    }\\n  }\\n<\/script>\\n\\n<div class=\\"navigation\\">\\n  <div class=\\"menu\\">\\n    <div class=\\"logo\\">\\n      <a href=\\"/\\"><img src=\\"img/visign-logo.svg\\" alt=\\"visign kenya logo\\" /></a>\\n    </div>\\n    <div class=\\"container\\" class:change={navOpen} on:click={handleNav}>\\n      <div class=\\"bar1\\" />\\n      <div class=\\"bar2\\" />\\n      <div class=\\"bar3\\" />\\n    </div>\\n  </div>\\n\\n  <div id=\\"mySidenav\\" class=\\"sidenav\\" class:open={navOpen}>\\n    <a href=\\"#a\\" class=\\"closebtn\\" on:click={handleNav}>&times;</a>\\n    <a href=\\"/\\">Home</a>\\n    <a href=\\"/about\\">About</a>\\n    <a href=\\"/work\\">Work</a>\\n    <!-- <a href=\\"/blog\\">Blog</a> -->\\n    <!-- <a href=\\"/contact\\">Contact</a> -->\\n  </div>\\n</div>\\n\\n<style>\\n  .menu {\\n    width: 90%;\\n    margin: 0 auto;\\n    display: flex;\\n    align-items: center;\\n    justify-content: space-between;\\n    margin-top: 1.2rem;\\n  }\\n\\n  .menu img {\\n    display: block;\\n    height: 36px;\\n  }\\n\\n  /* Hamburger Menu icon */\\n  .container {\\n    cursor: pointer;\\n  }\\n\\n  .bar1,\\n  .bar2,\\n  .bar3 {\\n    width: 32px;\\n    height: 3px;\\n    background-color: var(--text-color);\\n    margin: 8px 0;\\n    transition: 0.4s;\\n  }\\n\\n  .change .bar1 {\\n    -webkit-transform: rotate(-45deg) translate(-9px, 6px);\\n    transform: rotate(-45deg) translate(-9px, 6px);\\n  }\\n\\n  .change .bar2 {\\n    opacity: 0;\\n  }\\n\\n  .change .bar3 {\\n    -webkit-transform: rotate(45deg) translate(-8px, -8px);\\n    transform: rotate(45deg) translate(-8px, -8px);\\n  }\\n\\n  /* The side navigation menu */\\n  .sidenav {\\n    height: 100%;\\n    width: 0; /* 0 width - change this with JavaScript */\\n    position: fixed;\\n    z-index: 9;\\n    top: 0;\\n    left: 0;\\n    background-color: var(--primary-color);\\n    opacity: 0.98999;\\n    overflow-x: hidden; /* Disable horizontal scroll */\\n    padding-top: 60px;\\n    transition: 0.5s;\\n  }\\n\\n  /* The navigation menu links */\\n  .sidenav a {\\n    padding: 28px 8px 28px 32px;\\n    text-decoration: none;\\n    font-size: 20px;\\n    color: var(--text-color);\\n    display: block;\\n    transition: 0.3s;\\n    border-bottom: 1px solid var(--secondary-color);\\n  }\\n\\n  .sidenav a:first-child {\\n    padding-top: 19px;\\n  }\\n\\n  .sidenav a:first-child,\\n  .sidenav a:last-child {\\n    border-bottom: none;\\n  }\\n\\n  /* When you mouse over the navigation links, change their color */\\n  .sidenav a:hover {\\n    color: #f1f1f1;\\n    color: var(--accent-color);\\n  }\\n\\n  /* Position and style the close button (top right corner) */\\n  .sidenav .closebtn {\\n    position: absolute;\\n    top: 0;\\n    right: 25px;\\n    font-size: 36px;\\n    margin-left: 50px;\\n  }\\n\\n  .open {\\n    width: 60%;\\n  }\\n\\n  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */\\n  @media (min-width: 768px) {\\n    .container {\\n      display: none;\\n    }\\n\\n    .navigation {\\n      width: 90%;\\n      max-width: 1600px;\\n      margin: auto;\\n      display: flex;\\n      justify-content: space-between;\\n      align-items: center;\\n      position: relative;\\n      height: fit-content;\\n      /* border: 1px solid rgb(41, 41, 41); */\\n      margin-top: 0.75rem;\\n    }\\n\\n    .menu {\\n      margin: 0;\\n    }\\n\\n    .sidenav {\\n      display: flex;\\n      height: 100%;\\n      width: 100%; /* 0 width - change this with JavaScript */\\n      position: static;\\n      background-color: transparent;\\n      overflow-x: hidden; /* Disable horizontal scroll */\\n      padding-top: 0;\\n      transition: 0s;\\n      justify-content: flex-end;\\n    }\\n\\n    .sidenav a {\\n      font-size: 18px;\\n    }\\n\\n    .sidenav a:first-child {\\n      display: none;\\n    }\\n\\n    .sidenav a {\\n      margin: 0;\\n      padding: 0;\\n      padding-left: 2.4rem;\\n    }\\n\\n    .sidenav .closebtn {\\n      position: static;\\n      top: 0;\\n      right: 0;\\n      font-size: 36px;\\n      margin-left: 0;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAsCE,KAAK,8BAAC,CAAC,AACL,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,oBAAK,CAAC,GAAG,eAAC,CAAC,AACT,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,AACd,CAAC,AAGD,UAAU,8BAAC,CAAC,AACV,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,mCAAK,CACL,mCAAK,CACL,KAAK,8BAAC,CAAC,AACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,gBAAgB,CAAE,IAAI,YAAY,CAAC,CACnC,MAAM,CAAE,GAAG,CAAC,CAAC,CACb,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,sBAAO,CAAC,KAAK,eAAC,CAAC,AACb,iBAAiB,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CAAC,CAAC,GAAG,CAAC,CACtD,SAAS,CAAE,OAAO,MAAM,CAAC,CAAC,UAAU,IAAI,CAAC,CAAC,GAAG,CAAC,AAChD,CAAC,AAED,sBAAO,CAAC,KAAK,eAAC,CAAC,AACb,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,sBAAO,CAAC,KAAK,eAAC,CAAC,AACb,iBAAiB,CAAE,OAAO,KAAK,CAAC,CAAC,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CACtD,SAAS,CAAE,OAAO,KAAK,CAAC,CAAC,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,AAChD,CAAC,AAGD,QAAQ,8BAAC,CAAC,AACR,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,CAAC,CACR,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,CAAC,CACV,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,gBAAgB,CAAE,IAAI,eAAe,CAAC,CACtC,OAAO,CAAE,OAAO,CAChB,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,IAAI,AAClB,CAAC,AAGD,uBAAQ,CAAC,CAAC,eAAC,CAAC,AACV,OAAO,CAAE,IAAI,CAAC,GAAG,CAAC,IAAI,CAAC,IAAI,CAC3B,eAAe,CAAE,IAAI,CACrB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,iBAAiB,CAAC,AACjD,CAAC,AAED,uBAAQ,CAAC,gBAAC,YAAY,AAAC,CAAC,AACtB,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,uBAAQ,CAAC,gBAAC,YAAY,CACtB,uBAAQ,CAAC,gBAAC,WAAW,AAAC,CAAC,AACrB,aAAa,CAAE,IAAI,AACrB,CAAC,AAGD,uBAAQ,CAAC,gBAAC,MAAM,AAAC,CAAC,AAChB,KAAK,CAAE,OAAO,CACd,KAAK,CAAE,IAAI,cAAc,CAAC,AAC5B,CAAC,AAGD,uBAAQ,CAAC,SAAS,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,KAAK,8BAAC,CAAC,AACL,KAAK,CAAE,GAAG,AACZ,CAAC,AAGD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,UAAU,8BAAC,CAAC,AACV,OAAO,CAAE,IAAI,AACf,CAAC,AAED,WAAW,8BAAC,CAAC,AACX,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,WAAW,CAEnB,UAAU,CAAE,OAAO,AACrB,CAAC,AAED,KAAK,8BAAC,CAAC,AACL,MAAM,CAAE,CAAC,AACX,CAAC,AAED,QAAQ,8BAAC,CAAC,AACR,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,MAAM,CAChB,gBAAgB,CAAE,WAAW,CAC7B,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,CAAC,CACd,UAAU,CAAE,EAAE,CACd,eAAe,CAAE,QAAQ,AAC3B,CAAC,AAED,uBAAQ,CAAC,CAAC,eAAC,CAAC,AACV,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,uBAAQ,CAAC,gBAAC,YAAY,AAAC,CAAC,AACtB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,uBAAQ,CAAC,CAAC,eAAC,CAAC,AACV,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,YAAY,CAAE,MAAM,AACtB,CAAC,AAED,uBAAQ,CAAC,SAAS,eAAC,CAAC,AAClB,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,CAAC,CACR,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,CAAC,AAChB,CAAC,AACH,CAAC"}`
};
var Canvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$8);
  return `<div class="${"navigation svelte-16wmh91"}"><div class="${"menu svelte-16wmh91"}"><div class="${"logo"}"><a href="${"/"}"><img src="${"img/visign-logo.svg"}" alt="${"visign kenya logo"}" class="${"svelte-16wmh91"}"></a></div>
    <div class="${["container svelte-16wmh91", ""].join(" ").trim()}"><div class="${"bar1 svelte-16wmh91"}"></div>
      <div class="${"bar2 svelte-16wmh91"}"></div>
      <div class="${"bar3 svelte-16wmh91"}"></div></div></div>

  <div id="${"mySidenav"}" class="${["sidenav svelte-16wmh91", ""].join(" ").trim()}"><a href="${"#a"}" class="${"closebtn svelte-16wmh91"}">\xD7</a>
    <a href="${"/"}" class="${"svelte-16wmh91"}">Home</a>
    <a href="${"/about"}" class="${"svelte-16wmh91"}">About</a>
    <a href="${"/work"}" class="${"svelte-16wmh91"}">Work</a>
    
    </div>
</div>`;
});
var css$7 = {
  code: "main.svelte-b6nfq0.svelte-b6nfq0{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;margin:0 auto;box-sizing:border-box}footer.svelte-b6nfq0.svelte-b6nfq0{display:flex;flex-direction:column;justify-content:center;align-items:center;padding-top:40px}footer.svelte-b6nfq0 a.svelte-b6nfq0{font-weight:bold;text-decoration:none}footer.svelte-b6nfq0 p.svelte-b6nfq0{width:90%;max-width:1024px;margin:0 auto}.social-icons.svelte-b6nfq0.svelte-b6nfq0{display:flex;margin:2rem 0;gap:1rem}.social-icons.svelte-b6nfq0 img.svelte-b6nfq0{display:block;width:100%;max-width:28px}@media(min-width: 480px){}",
  map: `{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script>\\n  import Canvas from '$lib/header/Canvas.svelte'\\n  import '../app.css'\\n<\/script>\\n\\n<Canvas />\\n\\n<main>\\n  <slot />\\n</main>\\n\\n<footer>\\n  <p>\\n    Thank you for visiting. <a href=\\"mailto:dkibui@visign.co.ke\\"\\n      >Send us an email</a\\n    > to see how we can help.\\n  </p>\\n  <div class=\\"social-icons\\">\\n    <a href=\\"https://www.behance.net\\"\\n      ><img src=\\"img/social/behance.png\\" alt=\\"behance logo\\" /></a\\n    >\\n    <a href=\\"https://www.instagram.com\\"\\n      ><img src=\\"img/social/instagram.png\\" alt=\\"instagram logo\\" /></a\\n    >\\n    <a href=\\"https://www.twitter.com\\"\\n      ><img src=\\"img/social/twitter.png\\" alt=\\"twitter logo\\" /></a\\n    >\\n  </div>\\n</footer>\\n\\n<style>\\n  main {\\n    flex: 1;\\n    display: flex;\\n    flex-direction: column;\\n    padding: 1rem;\\n    width: 100%;\\n    /* max-width: 1024px; */\\n    margin: 0 auto;\\n    box-sizing: border-box;\\n  }\\n\\n  footer {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center;\\n    align-items: center;\\n    padding-top: 40px;\\n  }\\n\\n  footer a {\\n    font-weight: bold;\\n    text-decoration: none;\\n  }\\n\\n  footer p {\\n    width: 90%;\\n    max-width: 1024px;\\n    margin: 0 auto;\\n  }\\n\\n  .social-icons {\\n    display: flex;\\n    margin: 2rem 0;\\n    gap: 1rem;\\n  }\\n\\n  .social-icons img {\\n    display: block;\\n    width: 100%;\\n    max-width: 28px;\\n  }\\n\\n  @media (min-width: 480px) {\\n    /* footer {\\n      padding: 40px 0;\\n    } */\\n  }\\n</style>\\n"],"names":[],"mappings":"AA+BE,IAAI,4BAAC,CAAC,AACJ,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CAEX,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UAAU,AACxB,CAAC,AAED,MAAM,4BAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,oBAAM,CAAC,CAAC,cAAC,CAAC,AACR,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,IAAI,AACvB,CAAC,AAED,oBAAM,CAAC,CAAC,cAAC,CAAC,AACR,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,AAChB,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CAAC,CAAC,CACd,GAAG,CAAE,IAAI,AACX,CAAC,AAED,2BAAa,CAAC,GAAG,cAAC,CAAC,AACjB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAI3B,CAAC"}`
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$7);
  return `${validate_component(Canvas, "Canvas").$$render($$result, {}, {}, {})}

<main class="${"svelte-b6nfq0"}">${slots.default ? slots.default({}) : ``}</main>

<footer class="${"svelte-b6nfq0"}"><p class="${"svelte-b6nfq0"}">Thank you for visiting. <a href="${"mailto:dkibui@visign.co.ke"}" class="${"svelte-b6nfq0"}">Send us an email</a> to see how we can help.
  </p>
  <div class="${"social-icons svelte-b6nfq0"}"><a href="${"https://www.behance.net"}" class="${"svelte-b6nfq0"}"><img src="${"img/social/behance.png"}" alt="${"behance logo"}" class="${"svelte-b6nfq0"}"></a>
    <a href="${"https://www.instagram.com"}" class="${"svelte-b6nfq0"}"><img src="${"img/social/instagram.png"}" alt="${"instagram logo"}" class="${"svelte-b6nfq0"}"></a>
    <a href="${"https://www.twitter.com"}" class="${"svelte-b6nfq0"}"><img src="${"img/social/twitter.png"}" alt="${"twitter logo"}" class="${"svelte-b6nfq0"}"></a></div>
</footer>`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
var css$6 = {
  code: "p.svelte-1iuidu8.svelte-1iuidu8{font-size:0.97rem;margin-left:1.2rem;margin-right:0.75rem;color:var(--text-color);text-align:left;line-height:1.6}button.svelte-1iuidu8.svelte-1iuidu8{border:1px solid rgba(130, 153, 130, 0.336);border:none;border-radius:5px;background:var(--darker);display:block;width:100%;color:var(--text-color);font-size:17px;cursor:pointer;margin:0.25rem 0;padding-bottom:0.5em;padding-top:0.5em;padding-left:0.5em;text-align:left}svg.svelte-1iuidu8.svelte-1iuidu8{transition:transform 0.2s ease-in}[aria-expanded='true'].svelte-1iuidu8 svg.svelte-1iuidu8{transform:rotate(0.25turn)}",
  map: `{"version":3,"file":"Accordion.svelte","sources":["Accordion.svelte"],"sourcesContent":["<script>\\r\\n  import { slide } from 'svelte/transition'\\r\\n  export let entry\\r\\n  let isOpen = false\\r\\n  const toggle = () => (isOpen = !isOpen)\\r\\n<\/script>\\r\\n\\r\\n<button on:click={toggle} aria-expanded={isOpen}\\r\\n  ><svg\\r\\n    style=\\"tran\\"\\r\\n    width=\\"20\\"\\r\\n    height=\\"20\\"\\r\\n    fill=\\"none\\"\\r\\n    stroke-linecap=\\"round\\"\\r\\n    stroke-linejoin=\\"round\\"\\r\\n    stroke-width=\\"2\\"\\r\\n    viewBox=\\"0 0 24 24\\"\\r\\n    stroke=\\"currentColor\\"><path d=\\"M9 5l7 7-7 7\\" /></svg\\r\\n  >\\r\\n  {entry[0]}\\r\\n</button>\\r\\n\\r\\n{#if isOpen}\\r\\n  <div transition:slide={{ duration: 300 }}>\\r\\n    {#each entry[1] as item}\\r\\n      <p>{item}</p>\\r\\n    {/each}\\r\\n  </div>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n  p {\\r\\n    font-size: 0.97rem;\\r\\n    margin-left: 1.2rem;\\r\\n    margin-right: 0.75rem;\\r\\n    color: var(--text-color);\\r\\n    text-align: left;\\r\\n    line-height: 1.6;\\r\\n  }\\r\\n\\r\\n  button {\\r\\n    border: 1px solid rgba(130, 153, 130, 0.336);\\r\\n    border: none;\\r\\n    border-radius: 5px;\\r\\n    background: var(--darker);\\r\\n    display: block;\\r\\n    width: 100%;\\r\\n    color: var(--text-color);\\r\\n    font-size: 17px;\\r\\n    cursor: pointer;\\r\\n    margin: 0.25rem 0;\\r\\n    padding-bottom: 0.5em;\\r\\n    padding-top: 0.5em;\\r\\n    padding-left: 0.5em;\\r\\n    text-align: left;\\r\\n  }\\r\\n\\r\\n  svg {\\r\\n    transition: transform 0.2s ease-in;\\r\\n  }\\r\\n\\r\\n  [aria-expanded='true'] svg {\\r\\n    transform: rotate(0.25turn);\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA+BE,CAAC,8BAAC,CAAC,AACD,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,MAAM,CACnB,YAAY,CAAE,OAAO,CACrB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,MAAM,8BAAC,CAAC,AACN,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,KAAK,CAAC,CAC5C,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,QAAQ,CAAC,CACzB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,OAAO,CAAC,CAAC,CACjB,cAAc,CAAE,KAAK,CACrB,WAAW,CAAE,KAAK,CAClB,YAAY,CAAE,KAAK,CACnB,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,GAAG,8BAAC,CAAC,AACH,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,OAAO,AACpC,CAAC,AAED,CAAC,aAAa,CAAC,MAAM,gBAAC,CAAC,GAAG,eAAC,CAAC,AAC1B,SAAS,CAAE,OAAO,QAAQ,CAAC,AAC7B,CAAC"}`
};
var Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { entry } = $$props;
  let isOpen = false;
  if ($$props.entry === void 0 && $$bindings.entry && entry !== void 0)
    $$bindings.entry(entry);
  $$result.css.add(css$6);
  return `<button${add_attribute("aria-expanded", isOpen, 0)} class="${"svelte-1iuidu8"}"><svg style="${"tran"}" width="${"20"}" height="${"20"}" fill="${"none"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}" class="${"svelte-1iuidu8"}"><path d="${"M9 5l7 7-7 7"}"></path></svg>
  ${escape(entry[0])}</button>

${``}`;
});
function isObject$2(obj) {
  return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
}
function extend$2(target = {}, src2 = {}) {
  Object.keys(src2).forEach((key) => {
    if (typeof target[key] === "undefined")
      target[key] = src2[key];
    else if (isObject$2(src2[key]) && isObject$2(target[key]) && Object.keys(src2[key]).length > 0) {
      extend$2(target[key], src2[key]);
    }
  });
}
var ssrDocument = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function getDocument() {
  const doc = typeof document !== "undefined" ? document : {};
  extend$2(doc, ssrDocument);
  return doc;
}
var ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(callback) {
    if (typeof setTimeout === "undefined") {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(id) {
    if (typeof setTimeout === "undefined") {
      return;
    }
    clearTimeout(id);
  }
};
function getWindow() {
  const win = typeof window !== "undefined" ? window : {};
  extend$2(win, ssrWindow);
  return win;
}
function makeReactive(obj) {
  const proto = obj.__proto__;
  Object.defineProperty(obj, "__proto__", {
    get() {
      return proto;
    },
    set(value) {
      proto.__proto__ = value;
    }
  });
}
var Dom7 = class extends Array {
  constructor(items) {
    super(...items || []);
    makeReactive(this);
  }
};
function arrayFlat(arr = []) {
  const res = [];
  arr.forEach((el) => {
    if (Array.isArray(el)) {
      res.push(...arrayFlat(el));
    } else {
      res.push(el);
    }
  });
  return res;
}
function arrayFilter(arr, callback) {
  return Array.prototype.filter.call(arr, callback);
}
function arrayUnique(arr) {
  const uniqueArray = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1)
      uniqueArray.push(arr[i]);
  }
  return uniqueArray;
}
function qsa(selector, context) {
  if (typeof selector !== "string") {
    return [selector];
  }
  const a = [];
  const res = context.querySelectorAll(selector);
  for (let i = 0; i < res.length; i += 1) {
    a.push(res[i]);
  }
  return a;
}
function $(selector, context) {
  const window2 = getWindow();
  const document2 = getDocument();
  let arr = [];
  if (!context && selector instanceof Dom7) {
    return selector;
  }
  if (!selector) {
    return new Dom7(arr);
  }
  if (typeof selector === "string") {
    const html2 = selector.trim();
    if (html2.indexOf("<") >= 0 && html2.indexOf(">") >= 0) {
      let toCreate = "div";
      if (html2.indexOf("<li") === 0)
        toCreate = "ul";
      if (html2.indexOf("<tr") === 0)
        toCreate = "tbody";
      if (html2.indexOf("<td") === 0 || html2.indexOf("<th") === 0)
        toCreate = "tr";
      if (html2.indexOf("<tbody") === 0)
        toCreate = "table";
      if (html2.indexOf("<option") === 0)
        toCreate = "select";
      const tempParent = document2.createElement(toCreate);
      tempParent.innerHTML = html2;
      for (let i = 0; i < tempParent.childNodes.length; i += 1) {
        arr.push(tempParent.childNodes[i]);
      }
    } else {
      arr = qsa(selector.trim(), context || document2);
    }
  } else if (selector.nodeType || selector === window2 || selector === document2) {
    arr.push(selector);
  } else if (Array.isArray(selector)) {
    if (selector instanceof Dom7)
      return selector;
    arr = selector;
  }
  return new Dom7(arrayUnique(arr));
}
$.fn = Dom7.prototype;
function addClass(...classes2) {
  const classNames = arrayFlat(classes2.map((c) => c.split(" ")));
  this.forEach((el) => {
    el.classList.add(...classNames);
  });
  return this;
}
function removeClass(...classes2) {
  const classNames = arrayFlat(classes2.map((c) => c.split(" ")));
  this.forEach((el) => {
    el.classList.remove(...classNames);
  });
  return this;
}
function toggleClass(...classes2) {
  const classNames = arrayFlat(classes2.map((c) => c.split(" ")));
  this.forEach((el) => {
    classNames.forEach((className) => {
      el.classList.toggle(className);
    });
  });
}
function hasClass(...classes2) {
  const classNames = arrayFlat(classes2.map((c) => c.split(" ")));
  return arrayFilter(this, (el) => {
    return classNames.filter((className) => el.classList.contains(className)).length > 0;
  }).length > 0;
}
function attr(attrs, value) {
  if (arguments.length === 1 && typeof attrs === "string") {
    if (this[0])
      return this[0].getAttribute(attrs);
    return void 0;
  }
  for (let i = 0; i < this.length; i += 1) {
    if (arguments.length === 2) {
      this[i].setAttribute(attrs, value);
    } else {
      for (const attrName in attrs) {
        this[i][attrName] = attrs[attrName];
        this[i].setAttribute(attrName, attrs[attrName]);
      }
    }
  }
  return this;
}
function removeAttr(attr2) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].removeAttribute(attr2);
  }
  return this;
}
function transform(transform2) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].style.transform = transform2;
  }
  return this;
}
function transition$1(duration) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].style.transitionDuration = typeof duration !== "string" ? `${duration}ms` : duration;
  }
  return this;
}
function on(...args) {
  let [eventType, targetSelector, listener, capture] = args;
  if (typeof args[1] === "function") {
    [eventType, listener, capture] = args;
    targetSelector = void 0;
  }
  if (!capture)
    capture = false;
  function handleLiveEvent(e) {
    const target = e.target;
    if (!target)
      return;
    const eventData = e.target.dom7EventData || [];
    if (eventData.indexOf(e) < 0) {
      eventData.unshift(e);
    }
    if ($(target).is(targetSelector))
      listener.apply(target, eventData);
    else {
      const parents2 = $(target).parents();
      for (let k = 0; k < parents2.length; k += 1) {
        if ($(parents2[k]).is(targetSelector))
          listener.apply(parents2[k], eventData);
      }
    }
  }
  function handleEvent(e) {
    const eventData = e && e.target ? e.target.dom7EventData || [] : [];
    if (eventData.indexOf(e) < 0) {
      eventData.unshift(e);
    }
    listener.apply(this, eventData);
  }
  const events2 = eventType.split(" ");
  let j;
  for (let i = 0; i < this.length; i += 1) {
    const el = this[i];
    if (!targetSelector) {
      for (j = 0; j < events2.length; j += 1) {
        const event2 = events2[j];
        if (!el.dom7Listeners)
          el.dom7Listeners = {};
        if (!el.dom7Listeners[event2])
          el.dom7Listeners[event2] = [];
        el.dom7Listeners[event2].push({
          listener,
          proxyListener: handleEvent
        });
        el.addEventListener(event2, handleEvent, capture);
      }
    } else {
      for (j = 0; j < events2.length; j += 1) {
        const event2 = events2[j];
        if (!el.dom7LiveListeners)
          el.dom7LiveListeners = {};
        if (!el.dom7LiveListeners[event2])
          el.dom7LiveListeners[event2] = [];
        el.dom7LiveListeners[event2].push({
          listener,
          proxyListener: handleLiveEvent
        });
        el.addEventListener(event2, handleLiveEvent, capture);
      }
    }
  }
  return this;
}
function off(...args) {
  let [eventType, targetSelector, listener, capture] = args;
  if (typeof args[1] === "function") {
    [eventType, listener, capture] = args;
    targetSelector = void 0;
  }
  if (!capture)
    capture = false;
  const events2 = eventType.split(" ");
  for (let i = 0; i < events2.length; i += 1) {
    const event2 = events2[i];
    for (let j = 0; j < this.length; j += 1) {
      const el = this[j];
      let handlers;
      if (!targetSelector && el.dom7Listeners) {
        handlers = el.dom7Listeners[event2];
      } else if (targetSelector && el.dom7LiveListeners) {
        handlers = el.dom7LiveListeners[event2];
      }
      if (handlers && handlers.length) {
        for (let k = handlers.length - 1; k >= 0; k -= 1) {
          const handler = handlers[k];
          if (listener && handler.listener === listener) {
            el.removeEventListener(event2, handler.proxyListener, capture);
            handlers.splice(k, 1);
          } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
            el.removeEventListener(event2, handler.proxyListener, capture);
            handlers.splice(k, 1);
          } else if (!listener) {
            el.removeEventListener(event2, handler.proxyListener, capture);
            handlers.splice(k, 1);
          }
        }
      }
    }
  }
  return this;
}
function trigger(...args) {
  const window2 = getWindow();
  const events2 = args[0].split(" ");
  const eventData = args[1];
  for (let i = 0; i < events2.length; i += 1) {
    const event2 = events2[i];
    for (let j = 0; j < this.length; j += 1) {
      const el = this[j];
      if (window2.CustomEvent) {
        const evt = new window2.CustomEvent(event2, {
          detail: eventData,
          bubbles: true,
          cancelable: true
        });
        el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
  }
  return this;
}
function transitionEnd$1(callback) {
  const dom = this;
  function fireCallBack(e) {
    if (e.target !== this)
      return;
    callback.call(this, e);
    dom.off("transitionend", fireCallBack);
  }
  if (callback) {
    dom.on("transitionend", fireCallBack);
  }
  return this;
}
function outerWidth(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      const styles2 = this.styles();
      return this[0].offsetWidth + parseFloat(styles2.getPropertyValue("margin-right")) + parseFloat(styles2.getPropertyValue("margin-left"));
    }
    return this[0].offsetWidth;
  }
  return null;
}
function outerHeight(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      const styles2 = this.styles();
      return this[0].offsetHeight + parseFloat(styles2.getPropertyValue("margin-top")) + parseFloat(styles2.getPropertyValue("margin-bottom"));
    }
    return this[0].offsetHeight;
  }
  return null;
}
function offset() {
  if (this.length > 0) {
    const window2 = getWindow();
    const document2 = getDocument();
    const el = this[0];
    const box = el.getBoundingClientRect();
    const body = document2.body;
    const clientTop = el.clientTop || body.clientTop || 0;
    const clientLeft = el.clientLeft || body.clientLeft || 0;
    const scrollTop = el === window2 ? window2.scrollY : el.scrollTop;
    const scrollLeft = el === window2 ? window2.scrollX : el.scrollLeft;
    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  }
  return null;
}
function styles() {
  const window2 = getWindow();
  if (this[0])
    return window2.getComputedStyle(this[0], null);
  return {};
}
function css$5(props, value) {
  const window2 = getWindow();
  let i;
  if (arguments.length === 1) {
    if (typeof props === "string") {
      if (this[0])
        return window2.getComputedStyle(this[0], null).getPropertyValue(props);
    } else {
      for (i = 0; i < this.length; i += 1) {
        for (const prop in props) {
          this[i].style[prop] = props[prop];
        }
      }
      return this;
    }
  }
  if (arguments.length === 2 && typeof props === "string") {
    for (i = 0; i < this.length; i += 1) {
      this[i].style[props] = value;
    }
    return this;
  }
  return this;
}
function each(callback) {
  if (!callback)
    return this;
  this.forEach((el, index2) => {
    callback.apply(el, [el, index2]);
  });
  return this;
}
function filter(callback) {
  const result = arrayFilter(this, callback);
  return $(result);
}
function html(html2) {
  if (typeof html2 === "undefined") {
    return this[0] ? this[0].innerHTML : null;
  }
  for (let i = 0; i < this.length; i += 1) {
    this[i].innerHTML = html2;
  }
  return this;
}
function text(text2) {
  if (typeof text2 === "undefined") {
    return this[0] ? this[0].textContent.trim() : null;
  }
  for (let i = 0; i < this.length; i += 1) {
    this[i].textContent = text2;
  }
  return this;
}
function is(selector) {
  const window2 = getWindow();
  const document2 = getDocument();
  const el = this[0];
  let compareWith;
  let i;
  if (!el || typeof selector === "undefined")
    return false;
  if (typeof selector === "string") {
    if (el.matches)
      return el.matches(selector);
    if (el.webkitMatchesSelector)
      return el.webkitMatchesSelector(selector);
    if (el.msMatchesSelector)
      return el.msMatchesSelector(selector);
    compareWith = $(selector);
    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el)
        return true;
    }
    return false;
  }
  if (selector === document2) {
    return el === document2;
  }
  if (selector === window2) {
    return el === window2;
  }
  if (selector.nodeType || selector instanceof Dom7) {
    compareWith = selector.nodeType ? [selector] : selector;
    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el)
        return true;
    }
    return false;
  }
  return false;
}
function index$1() {
  let child = this[0];
  let i;
  if (child) {
    i = 0;
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1)
        i += 1;
    }
    return i;
  }
  return void 0;
}
function eq(index2) {
  if (typeof index2 === "undefined")
    return this;
  const length = this.length;
  if (index2 > length - 1) {
    return $([]);
  }
  if (index2 < 0) {
    const returnIndex = length + index2;
    if (returnIndex < 0)
      return $([]);
    return $([this[returnIndex]]);
  }
  return $([this[index2]]);
}
function append(...els) {
  let newChild;
  const document2 = getDocument();
  for (let k = 0; k < els.length; k += 1) {
    newChild = els[k];
    for (let i = 0; i < this.length; i += 1) {
      if (typeof newChild === "string") {
        const tempDiv = document2.createElement("div");
        tempDiv.innerHTML = newChild;
        while (tempDiv.firstChild) {
          this[i].appendChild(tempDiv.firstChild);
        }
      } else if (newChild instanceof Dom7) {
        for (let j = 0; j < newChild.length; j += 1) {
          this[i].appendChild(newChild[j]);
        }
      } else {
        this[i].appendChild(newChild);
      }
    }
  }
  return this;
}
function prepend(newChild) {
  const document2 = getDocument();
  let i;
  let j;
  for (i = 0; i < this.length; i += 1) {
    if (typeof newChild === "string") {
      const tempDiv = document2.createElement("div");
      tempDiv.innerHTML = newChild;
      for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
        this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
      }
    } else if (newChild instanceof Dom7) {
      for (j = 0; j < newChild.length; j += 1) {
        this[i].insertBefore(newChild[j], this[i].childNodes[0]);
      }
    } else {
      this[i].insertBefore(newChild, this[i].childNodes[0]);
    }
  }
  return this;
}
function next(selector) {
  if (this.length > 0) {
    if (selector) {
      if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
        return $([this[0].nextElementSibling]);
      }
      return $([]);
    }
    if (this[0].nextElementSibling)
      return $([this[0].nextElementSibling]);
    return $([]);
  }
  return $([]);
}
function nextAll(selector) {
  const nextEls = [];
  let el = this[0];
  if (!el)
    return $([]);
  while (el.nextElementSibling) {
    const next2 = el.nextElementSibling;
    if (selector) {
      if ($(next2).is(selector))
        nextEls.push(next2);
    } else
      nextEls.push(next2);
    el = next2;
  }
  return $(nextEls);
}
function prev(selector) {
  if (this.length > 0) {
    const el = this[0];
    if (selector) {
      if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
        return $([el.previousElementSibling]);
      }
      return $([]);
    }
    if (el.previousElementSibling)
      return $([el.previousElementSibling]);
    return $([]);
  }
  return $([]);
}
function prevAll(selector) {
  const prevEls = [];
  let el = this[0];
  if (!el)
    return $([]);
  while (el.previousElementSibling) {
    const prev2 = el.previousElementSibling;
    if (selector) {
      if ($(prev2).is(selector))
        prevEls.push(prev2);
    } else
      prevEls.push(prev2);
    el = prev2;
  }
  return $(prevEls);
}
function parent(selector) {
  const parents2 = [];
  for (let i = 0; i < this.length; i += 1) {
    if (this[i].parentNode !== null) {
      if (selector) {
        if ($(this[i].parentNode).is(selector))
          parents2.push(this[i].parentNode);
      } else {
        parents2.push(this[i].parentNode);
      }
    }
  }
  return $(parents2);
}
function parents(selector) {
  const parents2 = [];
  for (let i = 0; i < this.length; i += 1) {
    let parent2 = this[i].parentNode;
    while (parent2) {
      if (selector) {
        if ($(parent2).is(selector))
          parents2.push(parent2);
      } else {
        parents2.push(parent2);
      }
      parent2 = parent2.parentNode;
    }
  }
  return $(parents2);
}
function closest(selector) {
  let closest2 = this;
  if (typeof selector === "undefined") {
    return $([]);
  }
  if (!closest2.is(selector)) {
    closest2 = closest2.parents(selector).eq(0);
  }
  return closest2;
}
function find(selector) {
  const foundElements = [];
  for (let i = 0; i < this.length; i += 1) {
    const found = this[i].querySelectorAll(selector);
    for (let j = 0; j < found.length; j += 1) {
      foundElements.push(found[j]);
    }
  }
  return $(foundElements);
}
function children(selector) {
  const children2 = [];
  for (let i = 0; i < this.length; i += 1) {
    const childNodes = this[i].children;
    for (let j = 0; j < childNodes.length; j += 1) {
      if (!selector || $(childNodes[j]).is(selector)) {
        children2.push(childNodes[j]);
      }
    }
  }
  return $(children2);
}
function remove() {
  for (let i = 0; i < this.length; i += 1) {
    if (this[i].parentNode)
      this[i].parentNode.removeChild(this[i]);
  }
  return this;
}
var Methods = {
  addClass,
  removeClass,
  hasClass,
  toggleClass,
  attr,
  removeAttr,
  transform,
  transition: transition$1,
  on,
  off,
  trigger,
  transitionEnd: transitionEnd$1,
  outerWidth,
  outerHeight,
  styles,
  offset,
  css: css$5,
  each,
  html,
  text,
  is,
  index: index$1,
  eq,
  append,
  prepend,
  next,
  nextAll,
  prev,
  prevAll,
  parent,
  parents,
  closest,
  find,
  children,
  filter,
  remove
};
Object.keys(Methods).forEach((methodName) => {
  Object.defineProperty($.fn, methodName, {
    value: Methods[methodName],
    writable: true
  });
});
function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e) {
    }
    try {
      delete object[key];
    } catch (e) {
    }
  });
}
function nextTick(callback, delay = 0) {
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle$1(el) {
  const window2 = getWindow();
  let style;
  if (window2.getComputedStyle) {
    style = window2.getComputedStyle(el, null);
  }
  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }
  if (!style) {
    style = el.style;
  }
  return style;
}
function getTranslate(el, axis = "x") {
  const window2 = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle$1(el);
  if (window2.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(",").length > 6) {
      curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
    }
    transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
    matrix = transformMatrix.toString().split(",");
  }
  if (axis === "x") {
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m41;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[12]);
    else
      curTransform = parseFloat(matrix[4]);
  }
  if (axis === "y") {
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m42;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[13]);
    else
      curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject$1(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function isNode(node) {
  if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend$1(...args) {
  const to = Object(args[0]);
  const noExtend = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < args.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          if (isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend$1(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend$1(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll({
  swiper,
  targetPosition,
  side
}) {
  const window2 = getWindow();
  const startPosition = -swiper.translate;
  let startTime = null;
  let time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = "none";
  window2.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? "next" : "prev";
  const isOutOfBound = (current, target) => {
    return dir === "next" && current >= target || dir === "prev" && current <= target;
  };
  const animate = () => {
    time = new Date().getTime();
    if (startTime === null) {
      startTime = time;
    }
    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    });
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = "hidden";
      swiper.wrapperEl.style.scrollSnapType = "";
      setTimeout(() => {
        swiper.wrapperEl.style.overflow = "";
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window2.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
  };
  animate();
}
var support;
function calcSupport() {
  const window2 = getWindow();
  const document2 = getDocument();
  return {
    smoothScroll: document2.documentElement && "scrollBehavior" in document2.documentElement.style,
    touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch),
    passiveListener: function checkPassiveListener() {
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, "passive", {
          get() {
            supportsPassive = true;
          }
        });
        window2.addEventListener("testPassiveListener", null, opts);
      } catch (e) {
      }
      return supportsPassive;
    }(),
    gestures: function checkGestures() {
      return "ongesturestart" in window2;
    }()
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}
var deviceCached;
function calcDevice({
  userAgent
} = {}) {
  const support2 = getSupport();
  const window2 = getWindow();
  const platform = window2.navigator.platform;
  const ua = userAgent || window2.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window2.screen.width;
  const screenHeight = window2.screen.height;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === "Win32";
  let macos = platform === "MacIntel";
  const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad)
      ipad = [0, 1, "13_0_0"];
    macos = false;
  }
  if (android && !windows) {
    device.os = "android";
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = "ios";
    device.ios = true;
  }
  return device;
}
function getDevice(overrides = {}) {
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}
var browser$1;
function calcBrowser() {
  const window2 = getWindow();
  function isSafari() {
    const ua = window2.navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
  }
  return {
    isSafari: isSafari(),
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent)
  };
}
function getBrowser() {
  if (!browser$1) {
    browser$1 = calcBrowser();
  }
  return browser$1;
}
function Resize({
  swiper,
  on: on2,
  emit
}) {
  const window2 = getWindow();
  let observer = null;
  const resizeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    emit("beforeResize");
    emit("resize");
  };
  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    observer = new ResizeObserver((entries) => {
      const {
        width,
        height
      } = swiper;
      let newWidth = width;
      let newHeight = height;
      entries.forEach(({
        contentBoxSize,
        contentRect,
        target
      }) => {
        if (target && target !== swiper.el)
          return;
        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
      });
      if (newWidth !== width || newHeight !== height) {
        resizeHandler();
      }
    });
    observer.observe(swiper.el);
  };
  const removeObserver = () => {
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  const orientationChangeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    emit("orientationchange");
  };
  on2("init", () => {
    if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler);
    window2.addEventListener("orientationchange", orientationChangeHandler);
  });
  on2("destroy", () => {
    removeObserver();
    window2.removeEventListener("resize", resizeHandler);
    window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}
function Observer({
  swiper,
  extendParams,
  on: on2,
  emit
}) {
  const observers = [];
  const window2 = getWindow();
  const attach = (target, options2 = {}) => {
    const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
    const observer = new ObserverFunc((mutations) => {
      if (mutations.length === 1) {
        emit("observerUpdate", mutations[0]);
        return;
      }
      const observerUpdate = function observerUpdate2() {
        emit("observerUpdate", mutations[0]);
      };
      if (window2.requestAnimationFrame) {
        window2.requestAnimationFrame(observerUpdate);
      } else {
        window2.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options2.attributes === "undefined" ? true : options2.attributes,
      childList: typeof options2.childList === "undefined" ? true : options2.childList,
      characterData: typeof options2.characterData === "undefined" ? true : options2.characterData
    });
    observers.push(observer);
  };
  const init2 = () => {
    if (!swiper.params.observer)
      return;
    if (swiper.params.observeParents) {
      const containerParents = swiper.$el.parents();
      for (let i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    }
    attach(swiper.$el[0], {
      childList: swiper.params.observeSlideChildren
    });
    attach(swiper.$wrapperEl[0], {
      attributes: false
    });
  };
  const destroy = () => {
    observers.forEach((observer) => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on2("init", init2);
  on2("destroy", destroy);
}
var eventsEmitter = {
  on(events2, handler, priority) {
    const self2 = this;
    if (typeof handler !== "function")
      return self2;
    const method = priority ? "unshift" : "push";
    events2.split(" ").forEach((event2) => {
      if (!self2.eventsListeners[event2])
        self2.eventsListeners[event2] = [];
      self2.eventsListeners[event2][method](handler);
    });
    return self2;
  },
  once(events2, handler, priority) {
    const self2 = this;
    if (typeof handler !== "function")
      return self2;
    function onceHandler(...args) {
      self2.off(events2, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      handler.apply(self2, args);
    }
    onceHandler.__emitterProxy = handler;
    return self2.on(events2, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self2 = this;
    if (typeof handler !== "function")
      return self2;
    const method = priority ? "unshift" : "push";
    if (self2.eventsAnyListeners.indexOf(handler) < 0) {
      self2.eventsAnyListeners[method](handler);
    }
    return self2;
  },
  offAny(handler) {
    const self2 = this;
    if (!self2.eventsAnyListeners)
      return self2;
    const index2 = self2.eventsAnyListeners.indexOf(handler);
    if (index2 >= 0) {
      self2.eventsAnyListeners.splice(index2, 1);
    }
    return self2;
  },
  off(events2, handler) {
    const self2 = this;
    if (!self2.eventsListeners)
      return self2;
    events2.split(" ").forEach((event2) => {
      if (typeof handler === "undefined") {
        self2.eventsListeners[event2] = [];
      } else if (self2.eventsListeners[event2]) {
        self2.eventsListeners[event2].forEach((eventHandler, index2) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self2.eventsListeners[event2].splice(index2, 1);
          }
        });
      }
    });
    return self2;
  },
  emit(...args) {
    const self2 = this;
    if (!self2.eventsListeners)
      return self2;
    let events2;
    let data;
    let context;
    if (typeof args[0] === "string" || Array.isArray(args[0])) {
      events2 = args[0];
      data = args.slice(1, args.length);
      context = self2;
    } else {
      events2 = args[0].events;
      data = args[0].data;
      context = args[0].context || self2;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
    eventsArray.forEach((event2) => {
      if (self2.eventsAnyListeners && self2.eventsAnyListeners.length) {
        self2.eventsAnyListeners.forEach((eventHandler) => {
          eventHandler.apply(context, [event2, ...data]);
        });
      }
      if (self2.eventsListeners && self2.eventsListeners[event2]) {
        self2.eventsListeners[event2].forEach((eventHandler) => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self2;
  }
};
function updateSize() {
  const swiper = this;
  let width;
  let height;
  const $el = swiper.$el;
  if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = $el[0].clientWidth;
  }
  if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = $el[0].clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }
  width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
  height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
  if (Number.isNaN(width))
    width = 0;
  if (Number.isNaN(height))
    height = 0;
  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  });
}
function updateSlides() {
  const swiper = this;
  function getDirectionLabel(property) {
    if (swiper.isHorizontal()) {
      return property;
    }
    return {
      "width": "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      "marginRight": "marginBottom"
    }[property];
  }
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
  }
  const params = swiper.params;
  const {
    $wrapperEl,
    size: swiperSize,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === "function") {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === "function") {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index2 = 0;
  if (typeof swiperSize === "undefined") {
    return;
  }
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
  }
  swiper.virtualSize = -spaceBetween;
  if (rtl)
    slides.css({
      marginLeft: "",
      marginBottom: "",
      marginTop: ""
    });
  else
    slides.css({
      marginRight: "",
      marginBottom: "",
      marginTop: ""
    });
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
    setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
  }
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slidesLength);
  }
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
    return typeof params.breakpoints[key].slidesPerView !== "undefined";
  }).length > 0;
  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    const slide2 = slides.eq(i);
    if (gridEnabled) {
      swiper.grid.updateSlide(i, slide2, slidesLength, getDirectionLabel);
    }
    if (slide2.css("display") === "none")
      continue;
    if (params.slidesPerView === "auto") {
      if (shouldResetSlideSize) {
        slides[i].style[getDirectionLabel("width")] = ``;
      }
      const slideStyles = getComputedStyle(slide2[0]);
      const currentTransform = slide2[0].style.transform;
      const currentWebKitTransform = slide2[0].style.webkitTransform;
      if (currentTransform) {
        slide2[0].style.transform = "none";
      }
      if (currentWebKitTransform) {
        slide2[0].style.webkitTransform = "none";
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? slide2.outerWidth(true) : slide2.outerHeight(true);
      } else {
        const width = getDirectionPropertyValue(slideStyles, "width");
        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
        const boxSizing = slideStyles.getPropertyValue("box-sizing");
        if (boxSizing && boxSizing === "border-box") {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide2[0];
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide2[0].style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide2[0].style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
      if (slides[i]) {
        slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1e3)
        slidePosition = 0;
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if (index2 % params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if ((index2 - Math.min(swiper.params.slidesPerGroupSkip, index2)) % swiper.params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index2 += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
    $wrapperEl.css({
      width: `${swiper.virtualSize + params.spaceBetween}px`
    });
  }
  if (params.setWrapperSize) {
    $wrapperEl.css({
      [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
    });
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  }
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths)
        slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (snapGrid.length === 0)
    snapGrid = [0];
  if (params.spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
    slides.filter((_, slideIndex) => {
      if (!params.cssMode)
        return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).css({
      [key]: `${spaceBetween}px`
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    const maxSnap = allSlidesSize - swiperSize;
    snapGrid = snapGrid.map((snap) => {
      if (snap < 0)
        return -offsetBefore;
      if (snap > maxSnap)
        return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    if (allSlidesSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
    setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0];
    const addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit("slidesLengthChange");
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow)
      swiper.checkOverflow();
    swiper.emit("snapGridLengthChange");
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit("slidesGridLengthChange");
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
}
function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i;
  if (typeof speed === "number") {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  const getSlideByIndex = (index2) => {
    if (isVirtual) {
      return swiper.slides.filter((el) => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index2)[0];
    }
    return swiper.slides.eq(index2)[0];
  };
  if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      swiper.visibleSlides.each((slide2) => {
        activeSlides.push(slide2);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        const index2 = swiper.activeIndex + i;
        if (index2 > swiper.slides.length && !isVirtual)
          break;
        activeSlides.push(getSlideByIndex(index2));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== "undefined") {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }
  if (newHeight)
    swiper.$wrapperEl.css("height", `${newHeight}px`);
}
function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
  }
}
function updateSlidesProgress(translate2 = this && this.translate || 0) {
  const swiper = this;
  const params = swiper.params;
  const {
    slides,
    rtlTranslate: rtl
  } = swiper;
  if (slides.length === 0)
    return;
  if (typeof slides[0].swiperSlideOffset === "undefined")
    swiper.updateSlidesOffset();
  let offsetCenter = -translate2;
  if (rtl)
    offsetCenter = translate2;
  slides.removeClass(params.slideVisibleClass);
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  for (let i = 0; i < slides.length; i += 1) {
    const slide2 = slides[i];
    let slideOffset = slide2.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + params.spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide2);
      swiper.visibleSlidesIndexes.push(i);
      slides.eq(i).addClass(params.slideVisibleClass);
    }
    slide2.progress = rtl ? -slideProgress : slideProgress;
  }
  swiper.visibleSlides = $(swiper.visibleSlides);
}
function updateProgress(translate2) {
  const swiper = this;
  if (typeof translate2 === "undefined") {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  const params = swiper.params;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd
  } = swiper;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate2 - swiper.minTranslate()) / translatesDiff;
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }
  Object.assign(swiper, {
    progress,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
    swiper.updateSlidesProgress(translate2);
  if (isBeginning && !wasBeginning) {
    swiper.emit("reachBeginning toEdge");
  }
  if (isEnd && !wasEnd) {
    swiper.emit("reachEnd toEdge");
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit("fromEdge");
  }
  swiper.emit("progress", progress);
}
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    $wrapperEl,
    activeIndex,
    realIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
  let activeSlide;
  if (isVirtual) {
    activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
  } else {
    activeSlide = slides.eq(activeIndex);
  }
  activeSlide.addClass(params.slideActiveClass);
  if (params.loop) {
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
    } else {
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
    }
  }
  let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
  if (params.loop && nextSlide.length === 0) {
    nextSlide = slides.eq(0);
    nextSlide.addClass(params.slideNextClass);
  }
  let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
  if (params.loop && prevSlide.length === 0) {
    prevSlide = slides.eq(-1);
    prevSlide.addClass(params.slidePrevClass);
  }
  if (params.loop) {
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
    } else {
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
    } else {
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
    }
  }
  swiper.emitSlidesClasses();
}
function updateActiveIndex(newActiveIndex) {
  const swiper = this;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    slidesGrid,
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex;
  if (typeof activeIndex === "undefined") {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate2 >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === "undefined")
        activeIndex = 0;
    }
  }
  if (snapGrid.indexOf(translate2) >= 0) {
    snapIndex = snapGrid.indexOf(translate2);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit("snapIndexChange");
    }
    return;
  }
  const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
  Object.assign(swiper, {
    snapIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  swiper.emit("activeIndexChange");
  swiper.emit("snapIndexChange");
  if (previousRealIndex !== realIndex) {
    swiper.emit("realIndexChange");
  }
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    swiper.emit("slideChange");
  }
}
function updateClickedSlide(e) {
  const swiper = this;
  const params = swiper.params;
  const slide2 = $(e.target).closest(`.${params.slideClass}`)[0];
  let slideFound = false;
  let slideIndex;
  if (slide2) {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide2) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide2 && slideFound) {
    swiper.clickedSlide = slide2;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt($(slide2).attr("data-swiper-slide-index"), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = void 0;
    swiper.clickedIndex = void 0;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}
var update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};
function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate: translate2,
    $wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl ? -translate2 : translate2;
  }
  if (params.cssMode) {
    return translate2;
  }
  let currentTranslate = getTranslate($wrapperEl[0], axis);
  if (rtl)
    currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}
function setTranslate(translate2, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl,
    params,
    $wrapperEl,
    wrapperEl,
    progress
  } = swiper;
  let x = 0;
  let y = 0;
  const z = 0;
  if (swiper.isHorizontal()) {
    x = rtl ? -translate2 : translate2;
  } else {
    y = translate2;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y;
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate2);
  }
  swiper.emit("setTranslate", swiper.translate, byController);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(translate2 = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
  const swiper = this;
  const {
    params,
    wrapperEl
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  const minTranslate2 = swiper.minTranslate();
  const maxTranslate2 = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate2 > minTranslate2)
    newTranslate = minTranslate2;
  else if (translateBounds && translate2 < maxTranslate2)
    newTranslate = maxTranslate2;
  else
    newTranslate = translate2;
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: -newTranslate,
        behavior: "smooth"
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionEnd");
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionStart");
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper || swiper.destroyed)
            return;
          if (e.target !== this)
            return;
          swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
          swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          if (runCallbacks) {
            swiper.emit("transitionEnd");
          }
        };
      }
      swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
      swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}
var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};
function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.params.cssMode) {
    swiper.$wrapperEl.transition(duration);
  }
  swiper.emit("setTransition", duration, byController);
}
function transitionEmit({
  swiper,
  runCallbacks,
  direction,
  step
}) {
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex)
      dir = "next";
    else if (activeIndex < previousIndex)
      dir = "prev";
    else
      dir = "reset";
  }
  swiper.emit(`transition${step}`);
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === "reset") {
      swiper.emit(`slideResetTransition${step}`);
      return;
    }
    swiper.emit(`slideChangeTransition${step}`);
    if (dir === "next") {
      swiper.emit(`slideNextTransition${step}`);
    } else {
      swiper.emit(`slidePrevTransition${step}`);
    }
  }
}
function transitionStart(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode)
    return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "Start"
  });
}
function transitionEnd(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode)
    return;
  swiper.setTransition(0);
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "End"
  });
}
var transition = {
  setTransition,
  transitionStart,
  transitionEnd
};
function slideTo(index2 = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
  if (typeof index2 !== "number" && typeof index2 !== "string") {
    throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index2}] given.`);
  }
  if (typeof index2 === "string") {
    const indexAsNumber = parseInt(index2, 10);
    const isValidNumber = isFinite(indexAsNumber);
    if (!isValidNumber) {
      throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index2}] given.`);
    }
    index2 = indexAsNumber;
  }
  const swiper = this;
  let slideIndex = index2;
  if (slideIndex < 0)
    slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
    return false;
  }
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
  if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
    swiper.emit("beforeSlideChangeStart");
  }
  const translate2 = -snapGrid[snapIndex];
  swiper.updateProgress(translate2);
  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate2 * 100);
      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && translate2 < swiper.translate && translate2 < swiper.minTranslate()) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex)
        return false;
    }
  }
  let direction;
  if (slideIndex > activeIndex)
    direction = "next";
  else if (slideIndex < activeIndex)
    direction = "prev";
  else
    direction = "reset";
  if (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate) {
    swiper.updateActiveIndex(slideIndex);
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== "slide") {
      swiper.setTranslate(translate2);
    }
    if (direction !== "reset") {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t = rtl ? translate2 : -translate2;
    if (speed === 0) {
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = "none";
        swiper._immediateVirtual = true;
      }
      wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = "";
          swiper._swiperImmediateVirtual = false;
        });
      }
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: t,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: t,
        behavior: "smooth"
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(translate2);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit("beforeTransitionStart", speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    swiper.transitionEnd(runCallbacks, direction);
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(translate2);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit("beforeTransitionStart", speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onSlideToWrapperTransitionEnd) {
        swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper || swiper.destroyed)
            return;
          if (e.target !== this)
            return;
          swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
          swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
          swiper.onSlideToWrapperTransitionEnd = null;
          delete swiper.onSlideToWrapperTransitionEnd;
          swiper.transitionEnd(runCallbacks, direction);
        };
      }
      swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
      swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
    }
  }
  return true;
}
function slideToLoop(index2 = 0, speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  let newIndex = index2;
  if (swiper.params.loop) {
    newIndex += swiper.loopedSlides;
  }
  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}
function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    animating,
    enabled,
    params
  } = swiper;
  if (!enabled)
    return swiper;
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
  }
  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  if (params.loop) {
    if (animating && params.loopPreventsSlide)
      return false;
    swiper.loopFix();
    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}
function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    params,
    animating,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled)
    return swiper;
  if (params.loop) {
    if (animating && params.loopPreventsSlide)
      return false;
    swiper.loopFix();
    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
  }
  const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize22(val) {
    if (val < 0)
      return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize22(translate2);
  const normalizedSnapGrid = snapGrid.map((val) => normalize22(val));
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === "undefined" && params.cssMode) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== "undefined") {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== "undefined") {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0)
      prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}
function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {
  const swiper = this;
  let index2 = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index2);
  const snapIndex = skip + Math.floor((index2 - skip) / swiper.params.slidesPerGroup);
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate2 >= swiper.snapGrid[snapIndex]) {
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
      index2 += swiper.params.slidesPerGroup;
    }
  } else {
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];
    if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index2 -= swiper.params.slidesPerGroup;
    }
  }
  index2 = Math.max(index2, 0);
  index2 = Math.min(index2, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index2, speed, runCallbacks, internal);
}
function slideToClickedSlide() {
  const swiper = this;
  const {
    params,
    $wrapperEl
  } = swiper;
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.clickedIndex;
  let realIndex;
  if (params.loop) {
    if (swiper.animating)
      return;
    realIndex = parseInt($(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
      nextTick(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}
var slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};
function loopCreate() {
  const swiper = this;
  const document2 = getDocument();
  const {
    params,
    $wrapperEl
  } = swiper;
  $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
  let slides = $wrapperEl.children(`.${params.slideClass}`);
  if (params.loopFillGroupWithBlank) {
    const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
    if (blankSlidesNum !== params.slidesPerGroup) {
      for (let i = 0; i < blankSlidesNum; i += 1) {
        const blankNode = $(document2.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
        $wrapperEl.append(blankNode);
      }
      slides = $wrapperEl.children(`.${params.slideClass}`);
    }
  }
  if (params.slidesPerView === "auto" && !params.loopedSlides)
    params.loopedSlides = slides.length;
  swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
  swiper.loopedSlides += params.loopAdditionalSlides;
  if (swiper.loopedSlides > slides.length) {
    swiper.loopedSlides = slides.length;
  }
  const prependSlides = [];
  const appendSlides = [];
  slides.each((el, index2) => {
    const slide2 = $(el);
    if (index2 < swiper.loopedSlides) {
      appendSlides.push(el);
    }
    if (index2 < slides.length && index2 >= slides.length - swiper.loopedSlides) {
      prependSlides.push(el);
    }
    slide2.attr("data-swiper-slide-index", index2);
  });
  for (let i = 0; i < appendSlides.length; i += 1) {
    $wrapperEl.append($(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
  for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
    $wrapperEl.prepend($(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
}
function loopFix() {
  const swiper = this;
  swiper.emit("beforeLoopFix");
  const {
    activeIndex,
    slides,
    loopedSlides,
    allowSlidePrev,
    allowSlideNext,
    snapGrid,
    rtlTranslate: rtl
  } = swiper;
  let newIndex;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  const snapTranslate = -snapGrid[activeIndex];
  const diff = snapTranslate - swiper.getTranslate();
  if (activeIndex < loopedSlides) {
    newIndex = slides.length - loopedSlides * 3 + activeIndex;
    newIndex += loopedSlides;
    const slideChanged = swiper.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  } else if (activeIndex >= slides.length - loopedSlides) {
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    const slideChanged = swiper.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  swiper.emit("loopFix");
}
function loopDestroy() {
  const swiper = this;
  const {
    $wrapperEl,
    params,
    slides
  } = swiper;
  $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
  slides.removeAttr("data-swiper-slide-index");
}
var loop = {
  loopCreate,
  loopFix,
  loopDestroy
};
function setGrabCursor(moving) {
  const swiper = this;
  if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
    return;
  const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
  el.style.cursor = "move";
  el.style.cursor = moving ? "-webkit-grabbing" : "-webkit-grab";
  el.style.cursor = moving ? "-moz-grabbin" : "-moz-grab";
  el.style.cursor = moving ? "grabbing" : "grab";
}
function unsetGrabCursor() {
  const swiper = this;
  if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
}
var grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};
function closestElement(selector, base2 = this) {
  function __closestFrom(el) {
    if (!el || el === getDocument() || el === getWindow())
      return null;
    if (el.assignedSlot)
      el = el.assignedSlot;
    const found = el.closest(selector);
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base2);
}
function onTouchStart(event2) {
  const swiper = this;
  const document2 = getDocument();
  const window2 = getWindow();
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let e = event2;
  if (e.originalEvent)
    e = e.originalEvent;
  let $targetEl = $(e.target);
  if (params.touchEventsTarget === "wrapper") {
    if (!$targetEl.closest(swiper.wrapperEl).length)
      return;
  }
  data.isTouchEvent = e.type === "touchstart";
  if (!data.isTouchEvent && "which" in e && e.which === 3)
    return;
  if (!data.isTouchEvent && "button" in e && e.button > 0)
    return;
  if (data.isTouched && data.isMoved)
    return;
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
  if (swipingClassHasValue && e.target && e.target.shadowRoot && event2.path && event2.path[0]) {
    $targetEl = $(event2.path[0]);
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && e.target.shadowRoot);
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, e.target) : $targetEl.closest(noSwipingSelector)[0])) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!$targetEl.closest(params.swipeHandler)[0])
      return;
  }
  touches.currentX = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;
  const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === "prevent") {
      event2.preventDefault();
    } else {
      return;
    }
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: void 0,
    startMoving: void 0
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = void 0;
  if (params.threshold > 0)
    data.allowThresholdMove = false;
  if (e.type !== "touchstart") {
    let preventDefault = true;
    if ($targetEl.is(data.focusableElements))
      preventDefault = false;
    if (document2.activeElement && $(document2.activeElement).is(data.focusableElements) && document2.activeElement !== $targetEl[0]) {
      document2.activeElement.blur();
    }
    const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
      e.preventDefault();
    }
  }
  swiper.emit("touchStart", e);
}
function onTouchMove(event2) {
  const document2 = getDocument();
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper;
  if (!enabled)
    return;
  let e = event2;
  if (e.originalEvent)
    e = e.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit("touchMoveOpposite", e);
    }
    return;
  }
  if (data.isTouchEvent && e.type !== "touchmove")
    return;
  const targetTouch = e.type === "touchmove" && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
  const pageX = e.type === "touchmove" ? targetTouch.pageX : e.pageX;
  const pageY = e.type === "touchmove" ? targetTouch.pageY : e.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    swiper.allowClick = false;
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = now();
    }
    return;
  }
  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }
  if (data.isTouchEvent && document2.activeElement) {
    if (e.target === document2.activeElement && $(e.target).is(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit("touchMove", e);
  }
  if (e.targetTouches && e.targetTouches.length > 1)
    return;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
    return;
  if (typeof data.isScrolling === "undefined") {
    let touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit("touchMoveOpposite", e);
  }
  if (typeof data.startMoving === "undefined") {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  if (!data.isMoved) {
    if (params.loop && !params.cssMode) {
      swiper.loopFix();
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
    }
    data.allowMomentumBounce = false;
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit("sliderFirstMove", e);
  }
  swiper.emit("sliderMove", e);
  data.isMoved = true;
  let diff = swiper.isHorizontal() ? diffX : diffY;
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl)
    diff = -diff;
  swiper.swipeDirection = diff > 0 ? "prev" : "next";
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
    disableParentSwiper = false;
    if (params.resistance)
      data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
  } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
    disableParentSwiper = false;
    if (params.resistance)
      data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }
  if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode)
    return;
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  swiper.updateProgress(data.currentTranslate);
  swiper.setTranslate(data.currentTranslate);
}
function onTouchEnd(event2) {
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled)
    return;
  let e = event2;
  if (e.originalEvent)
    e = e.originalEvent;
  if (data.allowTouchCallbacks) {
    swiper.emit("touchEnd", e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }
  const touchEndTime = now();
  const timeDiff = touchEndTime - data.touchStartTime;
  if (swiper.allowClick) {
    swiper.updateClickedSlide(e);
    swiper.emit("tap click", e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit("doubleTap doubleClick", e);
    }
  }
  data.lastClickTime = now();
  nextTick(() => {
    if (!swiper.destroyed)
      swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (swiper.params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + increment2] !== "undefined") {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
        stopIndex = i;
        groupSize = slidesGrid[i + increment2] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === "next") {
      if (ratio >= params.longSwipesRatio)
        swiper.slideTo(stopIndex + increment);
      else
        swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === "prev") {
      if (ratio > 1 - params.longSwipesRatio)
        swiper.slideTo(stopIndex + increment);
      else
        swiper.slideTo(stopIndex);
    }
  } else {
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === "next") {
        swiper.slideTo(stopIndex + increment);
      }
      if (swiper.swipeDirection === "prev") {
        swiper.slideTo(stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}
function onResize() {
  const swiper = this;
  const {
    params,
    el
  } = swiper;
  if (el && el.offsetWidth === 0)
    return;
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper;
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    swiper.slideTo(swiper.activeIndex, 0, false, true);
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    swiper.autoplay.run();
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}
function onClick(e) {
  const swiper = this;
  if (!swiper.enabled)
    return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks)
      e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}
function onScroll() {
  const swiper = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled)
    return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  if (swiper.translate === -0)
    swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit("setTranslate", swiper.translate, false);
}
var dummyEventAttached = false;
function dummyEventListener() {
}
var events = (swiper, method) => {
  const document2 = getDocument();
  const {
    params,
    touchEvents,
    el,
    wrapperEl,
    device,
    support: support2
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
  const swiperMethod = method;
  if (!support2.touch) {
    el[domMethod](touchEvents.start, swiper.onTouchStart, false);
    document2[domMethod](touchEvents.move, swiper.onTouchMove, capture);
    document2[domMethod](touchEvents.end, swiper.onTouchEnd, false);
  } else {
    const passiveListener = touchEvents.start === "touchstart" && support2.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
    el[domMethod](touchEvents.move, swiper.onTouchMove, support2.passiveListener ? {
      passive: false,
      capture
    } : capture);
    el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
    if (touchEvents.cancel) {
      el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
    }
  }
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]("click", swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]("scroll", swiper.onScroll);
  }
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
  } else {
    swiper[swiperMethod]("observerUpdate", onResize, true);
  }
};
function attachEvents() {
  const swiper = this;
  const document2 = getDocument();
  const {
    params,
    support: support2
  } = swiper;
  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }
  swiper.onClick = onClick.bind(swiper);
  if (support2.touch && !dummyEventAttached) {
    document2.addEventListener("touchstart", dummyEventListener);
    dummyEventAttached = true;
  }
  events(swiper, "on");
}
function detachEvents() {
  const swiper = this;
  events(swiper, "off");
}
var events$1 = {
  attachEvents,
  detachEvents
};
var isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper = this;
  const {
    activeIndex,
    initialized,
    loopedSlides = 0,
    params,
    $el
  } = swiper;
  const breakpoints2 = params.breakpoints;
  if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
    return;
  const breakpoint = swiper.getBreakpoint(breakpoints2, swiper.params.breakpointsBase, swiper.el);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint)
    return;
  const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    $el.addClass(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
      $el.addClass(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  extend$1(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit("_beforeBreakpoint", breakpointParams);
  if (needsReLoop && initialized) {
    swiper.loopDestroy();
    swiper.loopCreate();
    swiper.updateSlides();
    swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
  }
  swiper.emit("breakpoint", breakpointParams);
}
function getBreakpoint(breakpoints2, base2 = "window", containerEl) {
  if (!breakpoints2 || base2 === "container" && !containerEl)
    return void 0;
  let breakpoint = false;
  const window2 = getWindow();
  const currentHeight = base2 === "window" ? window2.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints2).map((point) => {
    if (typeof point === "string" && point.indexOf("@") === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  for (let i = 0; i < points.length; i += 1) {
    const {
      point,
      value
    } = points[i];
    if (base2 === "window") {
      if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || "max";
}
var breakpoints = {
  setBreakpoint,
  getBreakpoint
};
function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach((item) => {
    if (typeof item === "object") {
      Object.keys(item).forEach((classNames) => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === "string") {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  const swiper = this;
  const {
    classNames,
    params,
    rtl,
    $el,
    device,
    support: support2
  } = swiper;
  const suffixes = prepareClasses(["initialized", params.direction, {
    "pointer-events": !support2.touch
  }, {
    "free-mode": swiper.params.freeMode && params.freeMode.enabled
  }, {
    "autoheight": params.autoHeight
  }, {
    "rtl": rtl
  }, {
    "grid": params.grid && params.grid.rows > 1
  }, {
    "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
  }, {
    "android": device.android
  }, {
    "ios": device.ios
  }, {
    "css-mode": params.cssMode
  }, {
    "centered": params.cssMode && params.centeredSlides
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  $el.addClass([...classNames].join(" "));
  swiper.emitContainerClasses();
}
function removeClasses() {
  const swiper = this;
  const {
    $el,
    classNames
  } = swiper;
  $el.removeClass(classNames.join(" "));
  swiper.emitContainerClasses();
}
var classes = {
  addClasses,
  removeClasses
};
function loadImage(imageEl, src2, srcset, sizes, checkForComplete, callback) {
  const window2 = getWindow();
  let image;
  function onReady() {
    if (callback)
      callback();
  }
  const isPicture = $(imageEl).parent("picture")[0];
  if (!isPicture && (!imageEl.complete || !checkForComplete)) {
    if (src2) {
      image = new window2.Image();
      image.onload = onReady;
      image.onerror = onReady;
      if (sizes) {
        image.sizes = sizes;
      }
      if (srcset) {
        image.srcset = srcset;
      }
      if (src2) {
        image.src = src2;
      }
    } else {
      onReady();
    }
  } else {
    onReady();
  }
}
function preloadImages() {
  const swiper = this;
  swiper.imagesToLoad = swiper.$el.find("img");
  function onReady() {
    if (typeof swiper === "undefined" || swiper === null || !swiper || swiper.destroyed)
      return;
    if (swiper.imagesLoaded !== void 0)
      swiper.imagesLoaded += 1;
    if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
      if (swiper.params.updateOnImagesReady)
        swiper.update();
      swiper.emit("imagesReady");
    }
  }
  for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
    const imageEl = swiper.imagesToLoad[i];
    swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
  }
}
var images = {
  loadImage,
  preloadImages
};
function checkOverflow() {
  const swiper = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper;
  const {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? "lock" : "unlock");
  }
}
var checkOverflow$1 = {
  checkOverflow
};
var defaults = {
  init: true,
  direction: "horizontal",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  enabled: true,
  focusableElements: "input, select, option, textarea, button, video, label",
  width: null,
  height: null,
  preventInteractionOnTransition: false,
  userAgent: null,
  url: null,
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  autoHeight: false,
  setWrapperSize: false,
  virtualTranslate: false,
  effect: "slide",
  breakpoints: void 0,
  breakpointsBase: "window",
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  watchOverflow: true,
  roundLengths: false,
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 0,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  uniqueNavElements: true,
  resistance: true,
  resistanceRatio: 0.85,
  watchSlidesProgress: false,
  grabCursor: false,
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  preloadImages: true,
  updateOnImagesReady: true,
  loop: false,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopFillGroupWithBlank: false,
  loopPreventsSlide: true,
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  noSwiping: true,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  passiveListeners: true,
  containerModifierClass: "swiper-",
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-invisible-blank",
  slideActiveClass: "swiper-slide-active",
  slideDuplicateActiveClass: "swiper-slide-duplicate-active",
  slideVisibleClass: "swiper-slide-visible",
  slideDuplicateClass: "swiper-slide-duplicate",
  slideNextClass: "swiper-slide-next",
  slideDuplicateNextClass: "swiper-slide-duplicate-next",
  slidePrevClass: "swiper-slide-prev",
  slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
  wrapperClass: "swiper-wrapper",
  runCallbacksOnInit: true,
  _emitClasses: false
};
function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj = {}) {
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];
    if (typeof moduleParams !== "object" || moduleParams === null) {
      extend$1(allModulesParams, obj);
      return;
    }
    if (["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
      params[moduleParamName] = {
        auto: true
      };
    }
    if (!(moduleParamName in params && "enabled" in moduleParams)) {
      extend$1(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName])
      params[moduleParamName] = {
        enabled: false
      };
    extend$1(allModulesParams, obj);
  };
}
var prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes,
  images
};
var extendedDefaults = {};
var Swiper$1 = class {
  constructor(...args) {
    let el;
    let params;
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params)
      params = {};
    params = extend$1({}, params);
    if (el && !params.el)
      params.el = el;
    if (params.el && $(params.el).length > 1) {
      const swipers = [];
      $(params.el).each((containerEl) => {
        const newParams = extend$1({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper$1(newParams));
      });
      return swipers;
    }
    const swiper = this;
    swiper.__swiper__ = true;
    swiper.support = getSupport();
    swiper.device = getDevice({
      userAgent: params.userAgent
    });
    swiper.browser = getBrowser();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...swiper.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      swiper.modules.push(...params.modules);
    }
    const allModulesParams = {};
    swiper.modules.forEach((mod) => {
      mod({
        swiper,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });
    const swiperParams = extend$1({}, defaults, allModulesParams);
    swiper.params = extend$1({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = extend$1({}, swiper.params);
    swiper.passedParams = extend$1({}, params);
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach((eventName) => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }
    swiper.$ = $;
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el,
      classNames: [],
      slides: $(),
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      isHorizontal() {
        return swiper.params.direction === "horizontal";
      },
      isVertical() {
        return swiper.params.direction === "vertical";
      },
      activeIndex: 0,
      realIndex: 0,
      isBeginning: true,
      isEnd: false,
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      touchEvents: function touchEvents() {
        const touch = ["touchstart", "touchmove", "touchend", "touchcancel"];
        const desktop = ["pointerdown", "pointermove", "pointerup"];
        swiper.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2],
          cancel: touch[3]
        };
        swiper.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2]
        };
        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
      }(),
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        focusableElements: swiper.params.focusableElements,
        lastClickTime: now(),
        clickTimeout: void 0,
        velocities: [],
        allowMomentumBounce: void 0,
        isTouchEvent: void 0,
        startMoving: void 0
      },
      allowClick: true,
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit("_swiper");
    if (swiper.params.init) {
      swiper.init();
    }
    return swiper;
  }
  enable() {
    const swiper = this;
    if (swiper.enabled)
      return;
    swiper.enabled = true;
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }
    swiper.emit("enable");
  }
  disable() {
    const swiper = this;
    if (!swiper.enabled)
      return;
    swiper.enabled = false;
    if (swiper.params.grabCursor) {
      swiper.unsetGrabCursor();
    }
    swiper.emit("disable");
  }
  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = swiper.minTranslate();
    const max = swiper.maxTranslate();
    const current = (max - min) * progress + min;
    swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el)
      return;
    const cls = swiper.el.className.split(" ").filter((className) => {
      return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit("_containerClasses", cls.join(" "));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    return slideEl.className.split(" ").filter((className) => {
      return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(" ");
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el)
      return;
    const updates = [];
    swiper.slides.each((slideEl) => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper.emit("_slideClass", slideEl, classNames);
    });
    swiper.emit("_slideClasses", updates);
  }
  slidesPerViewDynamic(view = "current", exact = false) {
    const swiper = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex].swiperSlideSize;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
    } else {
      if (view === "current") {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }
  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed)
      return;
    const {
      snapGrid,
      params
    } = swiper;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    function setTranslate2() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    let translated;
    if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
      setTranslate2();
      if (swiper.params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((swiper.params.slidesPerView === "auto" || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate2();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit("update");
  }
  changeDirection(newDirection, needUpdate = true) {
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
    }
    if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
      return swiper;
    }
    swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();
    swiper.params.direction = newDirection;
    swiper.slides.each((slideEl) => {
      if (newDirection === "vertical") {
        slideEl.style.width = "";
      } else {
        slideEl.style.height = "";
      }
    });
    swiper.emit("changeDirection");
    if (needUpdate)
      swiper.update();
    return swiper;
  }
  mount(el) {
    const swiper = this;
    if (swiper.mounted)
      return true;
    const $el = $(el || swiper.params.el);
    el = $el[0];
    if (!el) {
      return false;
    }
    el.swiper = swiper;
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
    };
    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = $(el.shadowRoot.querySelector(getWrapperSelector()));
        res.children = (options2) => $el.children(options2);
        return res;
      }
      return $el.children(getWrapperSelector());
    };
    let $wrapperEl = getWrapper();
    if ($wrapperEl.length === 0 && swiper.params.createElements) {
      const document2 = getDocument();
      const wrapper = document2.createElement("div");
      $wrapperEl = $(wrapper);
      wrapper.className = swiper.params.wrapperClass;
      $el.append(wrapper);
      $el.children(`.${swiper.params.slideClass}`).each((slideEl) => {
        $wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      $el,
      el,
      $wrapperEl,
      wrapperEl: $wrapperEl[0],
      mounted: true,
      rtl: el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl",
      rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl"),
      wrongRTL: $wrapperEl.css("display") === "-webkit-box"
    });
    return true;
  }
  init(el) {
    const swiper = this;
    if (swiper.initialized)
      return swiper;
    const mounted = swiper.mount(el);
    if (mounted === false)
      return swiper;
    swiper.emit("beforeInit");
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }
    swiper.addClasses();
    if (swiper.params.loop) {
      swiper.loopCreate();
    }
    swiper.updateSize();
    swiper.updateSlides();
    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }
    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }
    if (swiper.params.preloadImages) {
      swiper.preloadImages();
    }
    if (swiper.params.loop) {
      swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    }
    swiper.attachEvents();
    swiper.initialized = true;
    swiper.emit("init");
    swiper.emit("afterInit");
    return swiper;
  }
  destroy(deleteInstance = true, cleanStyles = true) {
    const swiper = this;
    const {
      params,
      $el,
      $wrapperEl,
      slides
    } = swiper;
    if (typeof swiper.params === "undefined" || swiper.destroyed) {
      return null;
    }
    swiper.emit("beforeDestroy");
    swiper.initialized = false;
    swiper.detachEvents();
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (cleanStyles) {
      swiper.removeClasses();
      $el.removeAttr("style");
      $wrapperEl.removeAttr("style");
      if (slides && slides.length) {
        slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
      }
    }
    swiper.emit("destroy");
    Object.keys(swiper.eventsListeners).forEach((eventName) => {
      swiper.off(eventName);
    });
    if (deleteInstance !== false) {
      swiper.$el[0].swiper = null;
      deleteProps(swiper);
    }
    swiper.destroyed = true;
    return null;
  }
  static extendDefaults(newDefaults) {
    extend$1(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    if (!Swiper$1.prototype.__modules__)
      Swiper$1.prototype.__modules__ = [];
    const modules = Swiper$1.prototype.__modules__;
    if (typeof mod === "function" && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach((m) => Swiper$1.installModule(m));
      return Swiper$1;
    }
    Swiper$1.installModule(module);
    return Swiper$1;
  }
};
Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    Swiper$1.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper$1.use([Resize, Observer]);
function Mousewheel({
  swiper,
  extendParams,
  on: on2,
  emit
}) {
  const window2 = getWindow();
  extendParams({
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarget: "container",
      thresholdDelta: null,
      thresholdTime: null
    }
  });
  swiper.mousewheel = {
    enabled: false
  };
  let timeout;
  let lastScrollTime = now();
  let lastEventBeforeSnap;
  const recentWheelEvents = [];
  function normalize22(e) {
    const PIXEL_STEP = 10;
    const LINE_HEIGHT = 40;
    const PAGE_HEIGHT = 800;
    let sX = 0;
    let sY = 0;
    let pX = 0;
    let pY = 0;
    if ("detail" in e) {
      sY = e.detail;
    }
    if ("wheelDelta" in e) {
      sY = -e.wheelDelta / 120;
    }
    if ("wheelDeltaY" in e) {
      sY = -e.wheelDeltaY / 120;
    }
    if ("wheelDeltaX" in e) {
      sX = -e.wheelDeltaX / 120;
    }
    if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ("deltaY" in e) {
      pY = e.deltaY;
    }
    if ("deltaX" in e) {
      pX = e.deltaX;
    }
    if (e.shiftKey && !pX) {
      pX = pY;
      pY = 0;
    }
    if ((pX || pY) && e.deltaMode) {
      if (e.deltaMode === 1) {
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }
    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
    };
  }
  function handleMouseEnter() {
    if (!swiper.enabled)
      return;
    swiper.mouseEntered = true;
  }
  function handleMouseLeave() {
    if (!swiper.enabled)
      return;
    swiper.mouseEntered = false;
  }
  function animateSlider(newEvent) {
    if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
      return false;
    }
    if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
      return false;
    }
    if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
      return true;
    }
    if (newEvent.direction < 0) {
      if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
        swiper.slideNext();
        emit("scroll", newEvent.raw);
      }
    } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
      swiper.slidePrev();
      emit("scroll", newEvent.raw);
    }
    lastScrollTime = new window2.Date().getTime();
    return false;
  }
  function releaseScroll(newEvent) {
    const params = swiper.params.mousewheel;
    if (newEvent.direction < 0) {
      if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
        return true;
      }
    } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
      return true;
    }
    return false;
  }
  function handle2(event2) {
    let e = event2;
    let disableParentSwiper = true;
    if (!swiper.enabled)
      return;
    const params = swiper.params.mousewheel;
    if (swiper.params.cssMode) {
      e.preventDefault();
    }
    let target = swiper.$el;
    if (swiper.params.mousewheel.eventsTarget !== "container") {
      target = $(swiper.params.mousewheel.eventsTarget);
    }
    if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges)
      return true;
    if (e.originalEvent)
      e = e.originalEvent;
    let delta = 0;
    const rtlFactor = swiper.rtlTranslate ? -1 : 1;
    const data = normalize22(e);
    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY))
          delta = -data.pixelX * rtlFactor;
        else
          return true;
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX))
        delta = -data.pixelY;
      else
        return true;
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }
    if (delta === 0)
      return true;
    if (params.invert)
      delta = -delta;
    let positions = swiper.getTranslate() + delta * params.sensitivity;
    if (positions >= swiper.minTranslate())
      positions = swiper.minTranslate();
    if (positions <= swiper.maxTranslate())
      positions = swiper.maxTranslate();
    disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
    if (disableParentSwiper && swiper.params.nested)
      e.stopPropagation();
    if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
      const newEvent = {
        time: now(),
        delta: Math.abs(delta),
        direction: Math.sign(delta),
        raw: event2
      };
      if (recentWheelEvents.length >= 2) {
        recentWheelEvents.shift();
      }
      const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
      recentWheelEvents.push(newEvent);
      if (prevEvent) {
        if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
          animateSlider(newEvent);
        }
      } else {
        animateSlider(newEvent);
      }
      if (releaseScroll(newEvent)) {
        return true;
      }
    } else {
      const newEvent = {
        time: now(),
        delta: Math.abs(delta),
        direction: Math.sign(delta)
      };
      const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
      if (!ignoreWheelEvents) {
        lastEventBeforeSnap = void 0;
        if (swiper.params.loop) {
          swiper.loopFix();
        }
        let position = swiper.getTranslate() + delta * params.sensitivity;
        const wasBeginning = swiper.isBeginning;
        const wasEnd = swiper.isEnd;
        if (position >= swiper.minTranslate())
          position = swiper.minTranslate();
        if (position <= swiper.maxTranslate())
          position = swiper.maxTranslate();
        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
          swiper.updateSlidesClasses();
        }
        if (swiper.params.freeMode.sticky) {
          clearTimeout(timeout);
          timeout = void 0;
          if (recentWheelEvents.length >= 15) {
            recentWheelEvents.shift();
          }
          const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
          const firstEvent = recentWheelEvents[0];
          recentWheelEvents.push(newEvent);
          if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
            recentWheelEvents.splice(0);
          } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
            const snapToThreshold = delta > 0 ? 0.8 : 0.2;
            lastEventBeforeSnap = newEvent;
            recentWheelEvents.splice(0);
            timeout = nextTick(() => {
              swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
            }, 0);
          }
          if (!timeout) {
            timeout = nextTick(() => {
              const snapToThreshold = 0.5;
              lastEventBeforeSnap = newEvent;
              recentWheelEvents.splice(0);
              swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
            }, 500);
          }
        }
        if (!ignoreWheelEvents)
          emit("scroll", e);
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction)
          swiper.autoplay.stop();
        if (position === swiper.minTranslate() || position === swiper.maxTranslate())
          return true;
      }
    }
    if (e.preventDefault)
      e.preventDefault();
    else
      e.returnValue = false;
    return false;
  }
  function events2(method) {
    let target = swiper.$el;
    if (swiper.params.mousewheel.eventsTarget !== "container") {
      target = $(swiper.params.mousewheel.eventsTarget);
    }
    target[method]("mouseenter", handleMouseEnter);
    target[method]("mouseleave", handleMouseLeave);
    target[method]("wheel", handle2);
  }
  function enable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.removeEventListener("wheel", handle2);
      return true;
    }
    if (swiper.mousewheel.enabled)
      return false;
    events2("on");
    swiper.mousewheel.enabled = true;
    return true;
  }
  function disable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.addEventListener(event, handle2);
      return true;
    }
    if (!swiper.mousewheel.enabled)
      return false;
    events2("off");
    swiper.mousewheel.enabled = false;
    return true;
  }
  on2("init", () => {
    if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
      disable();
    }
    if (swiper.params.mousewheel.enabled)
      enable();
  });
  on2("destroy", () => {
    if (swiper.params.cssMode) {
      enable();
    }
    if (swiper.mousewheel.enabled)
      disable();
  });
  Object.assign(swiper.mousewheel, {
    enable,
    disable
  });
}
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  const document2 = getDocument();
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        let element = swiper.$el.children(`.${checkProps[key]}`)[0];
        if (!element) {
          element = document2.createElement("div");
          element.className = checkProps[key];
          swiper.$el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}
function Navigation({
  swiper,
  extendParams,
  on: on2,
  emit
}) {
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock"
    }
  });
  swiper.navigation = {
    nextEl: null,
    $nextEl: null,
    prevEl: null,
    $prevEl: null
  };
  function getEl(el) {
    let $el;
    if (el) {
      $el = $(el);
      if (swiper.params.uniqueNavElements && typeof el === "string" && $el.length > 1 && swiper.$el.find(el).length === 1) {
        $el = swiper.$el.find(el);
      }
    }
    return $el;
  }
  function toggleEl($el, disabled) {
    const params = swiper.params.navigation;
    if ($el && $el.length > 0) {
      $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
      if ($el[0] && $el[0].tagName === "BUTTON")
        $el[0].disabled = disabled;
      if (swiper.params.watchOverflow && swiper.enabled) {
        $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
      }
    }
  }
  function update2() {
    if (swiper.params.loop)
      return;
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;
    toggleEl($prevEl, swiper.isBeginning);
    toggleEl($nextEl, swiper.isEnd);
  }
  function onPrevClick(e) {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop)
      return;
    swiper.slidePrev();
  }
  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop)
      return;
    swiper.slideNext();
  }
  function init2() {
    const params = swiper.params.navigation;
    swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    });
    if (!(params.nextEl || params.prevEl))
      return;
    const $nextEl = getEl(params.nextEl);
    const $prevEl = getEl(params.prevEl);
    if ($nextEl && $nextEl.length > 0) {
      $nextEl.on("click", onNextClick);
    }
    if ($prevEl && $prevEl.length > 0) {
      $prevEl.on("click", onPrevClick);
    }
    Object.assign(swiper.navigation, {
      $nextEl,
      nextEl: $nextEl && $nextEl[0],
      $prevEl,
      prevEl: $prevEl && $prevEl[0]
    });
    if (!swiper.enabled) {
      if ($nextEl)
        $nextEl.addClass(params.lockClass);
      if ($prevEl)
        $prevEl.addClass(params.lockClass);
    }
  }
  function destroy() {
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;
    if ($nextEl && $nextEl.length) {
      $nextEl.off("click", onNextClick);
      $nextEl.removeClass(swiper.params.navigation.disabledClass);
    }
    if ($prevEl && $prevEl.length) {
      $prevEl.off("click", onPrevClick);
      $prevEl.removeClass(swiper.params.navigation.disabledClass);
    }
  }
  on2("init", () => {
    init2();
    update2();
  });
  on2("toEdge fromEdge lock unlock", () => {
    update2();
  });
  on2("destroy", () => {
    destroy();
  });
  on2("enable disable", () => {
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;
    if ($nextEl) {
      $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
    }
    if ($prevEl) {
      $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
    }
  });
  on2("click", (_s, e) => {
    const {
      $nextEl,
      $prevEl
    } = swiper.navigation;
    const targetEl = e.target;
    if (swiper.params.navigation.hideOnClick && !$(targetEl).is($prevEl) && !$(targetEl).is($nextEl)) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl)))
        return;
      let isHidden;
      if ($nextEl) {
        isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
      } else if ($prevEl) {
        isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit("navigationShow");
      } else {
        emit("navigationHide");
      }
      if ($nextEl) {
        $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
      }
      if ($prevEl) {
        $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
      }
    }
  });
  Object.assign(swiper.navigation, {
    update: update2,
    init: init2,
    destroy
  });
}
function Autoplay({
  swiper,
  extendParams,
  on: on2,
  emit
}) {
  let timeout;
  swiper.autoplay = {
    running: false,
    paused: false
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3e3,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  function run2() {
    const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
    let delay = swiper.params.autoplay.delay;
    if ($activeSlideEl.attr("data-swiper-autoplay")) {
      delay = $activeSlideEl.attr("data-swiper-autoplay") || swiper.params.autoplay.delay;
    }
    clearTimeout(timeout);
    timeout = nextTick(() => {
      let autoplayResult;
      if (swiper.params.autoplay.reverseDirection) {
        if (swiper.params.loop) {
          swiper.loopFix();
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit("autoplay");
        } else if (!swiper.isBeginning) {
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
          emit("autoplay");
        } else {
          stop();
        }
      } else if (swiper.params.loop) {
        swiper.loopFix();
        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        emit("autoplay");
      } else if (!swiper.isEnd) {
        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        emit("autoplay");
      } else if (!swiper.params.autoplay.stopOnLastSlide) {
        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
        emit("autoplay");
      } else {
        stop();
      }
      if (swiper.params.cssMode && swiper.autoplay.running)
        run2();
      else if (autoplayResult === false) {
        run2();
      }
    }, delay);
  }
  function start() {
    if (typeof timeout !== "undefined")
      return false;
    if (swiper.autoplay.running)
      return false;
    swiper.autoplay.running = true;
    emit("autoplayStart");
    run2();
    return true;
  }
  function stop() {
    if (!swiper.autoplay.running)
      return false;
    if (typeof timeout === "undefined")
      return false;
    if (timeout) {
      clearTimeout(timeout);
      timeout = void 0;
    }
    swiper.autoplay.running = false;
    emit("autoplayStop");
    return true;
  }
  function pause(speed) {
    if (!swiper.autoplay.running)
      return;
    if (swiper.autoplay.paused)
      return;
    if (timeout)
      clearTimeout(timeout);
    swiper.autoplay.paused = true;
    if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
      swiper.autoplay.paused = false;
      run2();
    } else {
      ["transitionend", "webkitTransitionEnd"].forEach((event2) => {
        swiper.$wrapperEl[0].addEventListener(event2, onTransitionEnd);
      });
    }
  }
  function onVisibilityChange() {
    const document2 = getDocument();
    if (document2.visibilityState === "hidden" && swiper.autoplay.running) {
      pause();
    }
    if (document2.visibilityState === "visible" && swiper.autoplay.paused) {
      run2();
      swiper.autoplay.paused = false;
    }
  }
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.$wrapperEl)
      return;
    if (e.target !== swiper.$wrapperEl[0])
      return;
    ["transitionend", "webkitTransitionEnd"].forEach((event2) => {
      swiper.$wrapperEl[0].removeEventListener(event2, onTransitionEnd);
    });
    swiper.autoplay.paused = false;
    if (!swiper.autoplay.running) {
      stop();
    } else {
      run2();
    }
  }
  function onMouseEnter() {
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
    } else {
      pause();
    }
    ["transitionend", "webkitTransitionEnd"].forEach((event2) => {
      swiper.$wrapperEl[0].removeEventListener(event2, onTransitionEnd);
    });
  }
  function onMouseLeave() {
    if (swiper.params.autoplay.disableOnInteraction) {
      return;
    }
    swiper.autoplay.paused = false;
    run2();
  }
  function attachMouseEvents() {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.$el.on("mouseenter", onMouseEnter);
      swiper.$el.on("mouseleave", onMouseLeave);
    }
  }
  function detachMouseEvents() {
    swiper.$el.off("mouseenter", onMouseEnter);
    swiper.$el.off("mouseleave", onMouseLeave);
  }
  on2("init", () => {
    if (swiper.params.autoplay.enabled) {
      start();
      const document2 = getDocument();
      document2.addEventListener("visibilitychange", onVisibilityChange);
      attachMouseEvents();
    }
  });
  on2("beforeTransitionStart", (_s, speed, internal) => {
    if (swiper.autoplay.running) {
      if (internal || !swiper.params.autoplay.disableOnInteraction) {
        swiper.autoplay.pause(speed);
      } else {
        stop();
      }
    }
  });
  on2("sliderFirstMove", () => {
    if (swiper.autoplay.running) {
      if (swiper.params.autoplay.disableOnInteraction) {
        stop();
      } else {
        pause();
      }
    }
  });
  on2("touchEnd", () => {
    if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
      run2();
    }
  });
  on2("destroy", () => {
    detachMouseEvents();
    if (swiper.autoplay.running) {
      stop();
    }
    const document2 = getDocument();
    document2.removeEventListener("visibilitychange", onVisibilityChange);
  });
  Object.assign(swiper.autoplay, {
    pause,
    run: run2,
    start,
    stop
  });
}
function isObject(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function extend(target, src2) {
  const noExtend = ["__proto__", "constructor", "prototype"];
  Object.keys(src2).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
    if (typeof target[key] === "undefined")
      target[key] = src2[key];
    else if (isObject(src2[key]) && isObject(target[key]) && Object.keys(src2[key]).length > 0) {
      if (src2[key].__swiper__)
        target[key] = src2[key];
      else
        extend(target[key], src2[key]);
    } else {
      target[key] = src2[key];
    }
  });
}
function needsNavigation(params = {}) {
  return params.navigation && typeof params.navigation.nextEl === "undefined" && typeof params.navigation.prevEl === "undefined";
}
function needsPagination(params = {}) {
  return params.pagination && typeof params.pagination.el === "undefined";
}
function needsScrollbar(params = {}) {
  return params.scrollbar && typeof params.scrollbar.el === "undefined";
}
function uniqueClasses(classNames = "") {
  const classes2 = classNames.split(" ").map((c) => c.trim()).filter((c) => !!c);
  const unique = [];
  classes2.forEach((c) => {
    if (unique.indexOf(c) < 0)
      unique.push(c);
  });
  return unique.join(" ");
}
var paramsList = [
  "modules",
  "init",
  "_direction",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "_spaceBetween",
  "_slidesPerView",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_preloadImages",
  "updateOnImagesReady",
  "_loop",
  "_loopAdditionalSlides",
  "_loopedSlides",
  "_loopFillGroupWithBlank",
  "loopPreventsSlide",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideBlankClass",
  "slideActiveClass",
  "slideDuplicateActiveClass",
  "slideVisibleClass",
  "slideDuplicateClass",
  "slideNextClass",
  "slideDuplicateNextClass",
  "slidePrevClass",
  "slideDuplicatePrevClass",
  "wrapperClass",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  "a11y",
  "autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "lazy",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "_virtual",
  "zoom"
];
function getParams(obj = {}) {
  const params = {
    on: {}
  };
  const passedParams = {};
  extend(params, Swiper$1.defaults);
  extend(params, Swiper$1.extendedDefaults);
  params._emitClasses = true;
  params.init = false;
  const rest = {};
  const allowedParams = paramsList.map((key) => key.replace(/_/, ""));
  Object.keys(obj).forEach((key) => {
    if (allowedParams.indexOf(key) >= 0) {
      if (isObject(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        extend(params[key], obj[key]);
        extend(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === "function") {
      params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  });
  ["navigation", "pagination", "scrollbar"].forEach((key) => {
    if (params[key] === true)
      params[key] = {};
    if (params[key] === false)
      delete params[key];
  });
  return {
    params,
    passedParams,
    rest
  };
}
function initSwiper(swiperParams) {
  return new Swiper$1(swiperParams);
}
var Swiper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "swiper"]);
  const dispatch = createEventDispatcher();
  let { class: className = void 0 } = $$props;
  let containerClasses = "swiper";
  let swiperInstance = null;
  let paramsData;
  let swiperParams;
  let restProps;
  let swiperEl = null;
  let prevEl = null;
  let nextEl = null;
  let scrollbarEl = null;
  let paginationEl = null;
  let virtualData = { slides: [] };
  function swiper() {
    return swiperInstance;
  }
  const setVirtualData = (data) => {
    virtualData = data;
    tick().then(() => {
      swiperInstance.$wrapperEl.children(".swiper-slide").each((el) => {
        if (el.onSwiper)
          el.onSwiper(swiperInstance);
      });
      swiperInstance.updateSlides();
      swiperInstance.updateProgress();
      swiperInstance.updateSlidesClasses();
      if (swiperInstance.lazy && swiperInstance.params.lazy.enabled) {
        swiperInstance.lazy.load();
      }
    });
  };
  const calcParams = () => {
    paramsData = getParams($$restProps);
    swiperParams = paramsData.params;
    restProps = paramsData.rest;
  };
  calcParams();
  const onBeforeBreakpoint = () => {
  };
  swiperParams.onAny = (event2, ...args) => {
    dispatch(event2, [args]);
  };
  Object.assign(swiperParams.on, {
    _beforeBreakpoint: onBeforeBreakpoint,
    _containerClasses(_swiper, classes2) {
      containerClasses = classes2;
    }
  });
  swiperInstance = initSwiper(swiperParams);
  if (swiperInstance.virtual && swiperInstance.params.virtual.enabled) {
    const extendWith = {
      cache: false,
      renderExternal: (data) => {
        setVirtualData(data);
        if (swiperParams.virtual && swiperParams.virtual.renderExternal) {
          swiperParams.virtual.renderExternal(data);
        }
      },
      renderExternalUpdate: false
    };
    extend(swiperInstance.params.virtual, extendWith);
    extend(swiperInstance.originalParams.virtual, extendWith);
  }
  onDestroy(() => {
    if (typeof window !== "undefined" && swiperInstance && !swiperInstance.destroyed) {
      swiperInstance.destroy(true, false);
    }
  });
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.swiper === void 0 && $$bindings.swiper && swiper !== void 0)
    $$bindings.swiper(swiper);
  return `<div${spread([
    {
      class: escape_attribute_value(uniqueClasses(`${containerClasses}${className ? ` ${className}` : ""}`))
    },
    escape_object(restProps)
  ])}${add_attribute("this", swiperEl, 0)}>${slots["container-start"] ? slots["container-start"]({ virtualData }) : ``}
  ${needsNavigation(swiperParams) ? `<div class="${"swiper-button-prev"}"${add_attribute("this", prevEl, 0)}></div>
    <div class="${"swiper-button-next"}"${add_attribute("this", nextEl, 0)}></div>` : ``}
  ${needsScrollbar(swiperParams) ? `<div class="${"swiper-scrollbar"}"${add_attribute("this", scrollbarEl, 0)}></div>` : ``}
  ${needsPagination(swiperParams) ? `<div class="${"swiper-pagination"}"${add_attribute("this", paginationEl, 0)}></div>` : ``}
  <div class="${"swiper-wrapper"}">${slots["wrapper-start"] ? slots["wrapper-start"]({ virtualData }) : ``}
    ${slots.default ? slots.default({ virtualData }) : ``}
    ${slots["wrapper-end"] ? slots["wrapper-end"]({ virtualData }) : ``}</div>
  ${slots["container-end"] ? slots["container-end"]({ virtualData }) : ``}</div>`;
});
var Swiper_slide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slideData;
  let $$restProps = compute_rest_props($$props, ["zoom", "virtualIndex", "class"]);
  let { zoom = void 0 } = $$props;
  let { virtualIndex = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  let slideEl = null;
  let slideClasses = "swiper-slide";
  onDestroy(() => {
    return;
  });
  if ($$props.zoom === void 0 && $$bindings.zoom && zoom !== void 0)
    $$bindings.zoom(zoom);
  if ($$props.virtualIndex === void 0 && $$bindings.virtualIndex && virtualIndex !== void 0)
    $$bindings.virtualIndex(virtualIndex);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  slideData = {
    isActive: slideClasses.indexOf("swiper-slide-active") >= 0 || slideClasses.indexOf("swiper-slide-duplicate-active") >= 0,
    isVisible: slideClasses.indexOf("swiper-slide-visible") >= 0,
    isDuplicate: slideClasses.indexOf("swiper-slide-duplicate") >= 0,
    isPrev: slideClasses.indexOf("swiper-slide-prev") >= 0 || slideClasses.indexOf("swiper-slide-duplicate-prev") >= 0,
    isNext: slideClasses.indexOf("swiper-slide-next") >= 0 || slideClasses.indexOf("swiper-slide-duplicate-next") >= 0
  };
  return `<div${spread([
    {
      class: escape_attribute_value(uniqueClasses(`${slideClasses}${className ? ` ${className}` : ""}`))
    },
    {
      "data-swiper-slide-index": escape_attribute_value(virtualIndex)
    },
    escape_object($$restProps)
  ])}${add_attribute("this", slideEl, 0)}>${zoom ? `<div class="${"swiper-zoom-container"}"${add_attribute("data-swiper-zoom", typeof zoom === "number" ? zoom : void 0, 0)}>${slots.default ? slots.default({ data: slideData }) : ``}</div>` : `${slots.default ? slots.default({ data: slideData }) : ``}`}</div>`;
});
var css$4 = {
  code: "h1.svelte-19oh9wx.svelte-19oh9wx{font-size:2.4rem}h2.svelte-19oh9wx.svelte-19oh9wx{font-size:1.2rem;margin-top:3rem;margin-bottom:0;font-weight:500}.content-500.svelte-19oh9wx.svelte-19oh9wx{width:100%;max-width:var(--column-width);max-width:530px;margin:var(--column-margin-top) auto 0 auto;margin:2rem auto 0 auto;text-align:center}.content.svelte-19oh9wx.svelte-19oh9wx{width:100%;max-width:1400px;margin:0.75rem auto 0 auto}.logos.svelte-19oh9wx.svelte-19oh9wx{width:100%;max-width:720px;margin:auto;margin-top:1.5rem;border-top:1px solid var(--secondary-color);padding-top:1rem}.content.svelte-19oh9wx img.svelte-19oh9wx{display:block;width:100%;height:auto}.logos.svelte-19oh9wx img.svelte-19oh9wx{display:block;max-width:100%}.accordion.svelte-19oh9wx.svelte-19oh9wx{width:100%;max-width:720px;margin:auto;margin-top:1rem}@media only screen and (min-width: 568px){h1.svelte-19oh9wx.svelte-19oh9wx{font-size:2.5em;line-height:1.3}}@media(min-width: 768px){h2.svelte-19oh9wx.svelte-19oh9wx{font-size:1.6rem;margin-top:5rem}.content-500.svelte-19oh9wx.svelte-19oh9wx{margin:var(--column-margin-top) auto 0 auto}.content.svelte-19oh9wx.svelte-19oh9wx{margin:var(--column-margin-top) auto 0 auto}.accordion.svelte-19oh9wx.svelte-19oh9wx{margin-top:2.2rem}.logos.svelte-19oh9wx.svelte-19oh9wx{max-width:720px;margin-top:2.2rem;padding-top:1.5rem;padding-bottom:1.2rem}}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n  import Accordion from '$lib/Accordion.svelte'\\n  import FourWayGrid from '$lib/FourWayGrid.svelte'\\n  const data = {\\n    'Brand development': [\\n      \\"We perform an exhaustive fact finding mission to understand your business and it's goals. We then audit, research and analyse collected data to draw consumer insight.\\",\\n      'The creative process begins with logo design. We take time to create beautifully simple and memorable logo marks. We carefully select typefaces and colour palette that perfectly and uniquely represent your brand.',\\n      'In the final stage we create branding and identity guides. We deliver creative results in relevant format. This stage marks the initial steps towards your future business success.',\\n    ],\\n    'Graphic design': [\\n      'We create visual content to communicate your marketing messages.',\\n      'Visual identity system e.g. logo, typography, colour, brand elements like patterns, templates and mock-ups.',\\n      'Brand attributes and voice definition aka visual identity.',\\n      'Brand promotional material like Business cards, Letterheads, Posters, Fliers, Banners, Accounting Stationery and social media posts.',\\n    ],\\n    'Web development': [\\n      'Prevalence of the internet has changed the way consumers engage with businesses. Basically, you gotta be online.',\\n      'We specialize in modern web technologies. We make use of modern UI/UX.',\\n      'We create Single Page Apps, (SPAs) for websites that act and feel like smartphone apps.',\\n      'Basically, we start every project from the ground up. That means we can customize the website to look and feel exactly as we want.',\\n    ],\\n    'Branding services': [\\n      'This involves printing, engraving, cutting or pasting any of your brand identity onto promotional items like biro pens, T-shirts, carrier bags and many more.',\\n    ],\\n    Printing: [\\n      'We do paper printing like business cards, fliers, posters, brochures, booklets, magazines among others.',\\n      'We do print banners like Pull up banners, hanging banners, tear drop banners, backdrop/media banners and others.',\\n      'We also do branding for gift items like carrier bags, biro pens, mags among others.',\\n    ],\\n  }\\n\\n  import { Swiper, SwiperSlide } from 'swiper/svelte'\\n  import 'swiper/css'\\n  import 'swiper/css/pagination'\\n\\n  import SwiperCore, { Mousewheel, Autoplay } from 'swiper'\\n  SwiperCore.use([Mousewheel, Autoplay])\\n<\/script>\\n\\n<svelte:head>\\n  <title>\\n    Affordable high quality graphic design and web development services in\\n    Kenya.\\n  </title>\\n  <!-- <description>\\n    All the graphic design and web development services to take your business to\\n    the next level.\\n  </description> -->\\n</svelte:head>\\n\\n<div class=\\"content-500\\">\\n  <h1>Our business is making yours look good.</h1>\\n  <p>\\n    We provide brand centred graphic design and web development services to SMEs\\n    and corporates in Nairobi.\\n  </p>\\n</div>\\n\\n<div class=\\"content\\">\\n  <Swiper\\n    slidesPerView={3}\\n    spaceBetween={10}\\n    slidesPerGroup={1}\\n    mousewheel={false}\\n    loop={true}\\n    loopFillGroupWithBlank={true}\\n    autoplay={{\\n      delay: 3000,\\n      disableOnInteraction: false,\\n    }}\\n    breakpoints={{\\n      '@0.00': {\\n        slidesPerView: 2,\\n        spaceBetween: 9,\\n      },\\n      768: {\\n        slidesPerView: 3,\\n      },\\n      1100: {\\n        slidesPerView: 5,\\n      },\\n    }}\\n    class=\\"mySwiper\\"\\n  >\\n    <SwiperSlide>\\n      <img src=\\"img/recent/8.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/recent/2.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/recent/1.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/recent/9.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/recent/5.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/recent/6.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/recent/liberte.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n  </Swiper>\\n</div>\\n\\n<h2>Our services</h2>\\n\\n<div class=\\"accordion\\">\\n  {#each Object.entries(data) as entry}\\n    <Accordion {entry} />\\n  {/each}\\n</div>\\n\\n<!-- <h2>Recent projects</h2>\\n\\n<div class=\\"recent\\">\\n  <p class=\\"recent__text\\">\\n    We handle many full brand development projects. Below we showcase the ones\\n    we completed recently\\n  </p>\\n</div>\\n\\n<div class=\\"four-way-grid\\">\\n  <FourWayGrid>\\n    <img slot=\\"one\\" src=\\"img/recent/carrier bags.jpg\\" alt=\\"anchor one\\" />\\n    <img slot=\\"two\\" src=\\"img/recent/brochure.jpg\\" alt=\\"anchor one\\" />\\n    <img slot=\\"three\\" src=\\"img/recent/calendar.jpg\\" alt=\\"anchor one\\" />\\n    <img slot=\\"four\\" src=\\"img/recent/cards.jpg\\" alt=\\"anchor one\\" />\\n  </FourWayGrid>\\n</div> -->\\n\\n<h2>Our clients</h2>\\n\\n<div class=\\"logos\\">\\n  <Swiper\\n    slidesPerView={3}\\n    spaceBetween={20}\\n    slidesPerGroup={1}\\n    mousewheel={false}\\n    loop={true}\\n    loopFillGroupWithBlank={true}\\n    autoplay={{\\n      delay: 1800,\\n      disableOnInteraction: false,\\n    }}\\n    breakpoints={{\\n      '@0.00': {\\n        slidesPerView: 4,\\n        spaceBetween: 60,\\n      },\\n      768: {\\n        slidesPerView: 4,\\n        spaceBetween: 155,\\n      },\\n    }}\\n    class=\\"mySwiper\\"\\n  >\\n    <SwiperSlide>\\n      <img src=\\"img/logos/amsco.png\\" alt=\\"amsco logo\\" />\\n    </SwiperSlide>\\n    <!--  -->\\n    <SwiperSlide>\\n      <img src=\\"img/logos/anchor.png\\" alt=\\"Anchor builders logo\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/logos/strathmore.png\\" alt=\\"Strathmore University logo\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/logos/eaglehr.png\\" alt=\\"Eaglehr kenya logo\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/logos/absa.png\\" alt=\\"absa bank logo\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/logos/farmhouse.png\\" alt=\\"farmhouse sacco logo\\" />\\n    </SwiperSlide>\\n  </Swiper>\\n</div>\\n\\n<style>\\n  h1 {\\n    font-size: 2.4rem;\\n  }\\n\\n  h2 {\\n    font-size: 1.2rem;\\n    margin-top: 3rem;\\n    margin-bottom: 0;\\n    font-weight: 500;\\n  }\\n\\n  .content-500 {\\n    width: 100%;\\n    max-width: var(--column-width);\\n    max-width: 530px;\\n    margin: var(--column-margin-top) auto 0 auto;\\n    margin: 2rem auto 0 auto;\\n    text-align: center;\\n  }\\n\\n  .content {\\n    width: 100%;\\n    max-width: 1400px;\\n    margin: 0.75rem auto 0 auto;\\n  }\\n\\n  .four-way-grid img {\\n    display: block;\\n    width: 100%;\\n  }\\n\\n  .logos {\\n    width: 100%;\\n    max-width: 720px;\\n    margin: auto;\\n    margin-top: 1.5rem;\\n    border-top: 1px solid var(--secondary-color);\\n    padding-top: 1rem;\\n  }\\n\\n  .recent {\\n    width: 100%;\\n    margin: auto;\\n    margin-top: 1.5rem;\\n    border-top: 1px solid var(--secondary-color);\\n    padding-top: 1rem;\\n  }\\n\\n  .content img {\\n    display: block;\\n    width: 100%;\\n    height: auto;\\n  }\\n\\n  .logos img {\\n    display: block;\\n    max-width: 100%;\\n  }\\n\\n  .accordion {\\n    width: 100%;\\n    max-width: 720px;\\n    margin: auto;\\n    margin-top: 1rem;\\n  }\\n\\n  @media only screen and (min-width: 568px) {\\n    h1 {\\n      font-size: 2.5em;\\n      line-height: 1.3;\\n    }\\n  }\\n\\n  @media (min-width: 768px) {\\n    h2 {\\n      font-size: 1.6rem;\\n      margin-top: 5rem;\\n    }\\n\\n    .content-500 {\\n      margin: var(--column-margin-top) auto 0 auto;\\n    }\\n\\n    .content {\\n      margin: var(--column-margin-top) auto 0 auto;\\n    }\\n\\n    .accordion {\\n      margin-top: 2.2rem;\\n    }\\n\\n    .logos {\\n      max-width: 720px;\\n      margin-top: 2.2rem;\\n      padding-top: 1.5rem;\\n      /* border-bottom: 1px solid var(--secondary-color);*/\\n      padding-bottom: 1.2rem;\\n    }\\n\\n    .recent {\\n      max-width: 1440px;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAuLE,EAAE,8BAAC,CAAC,AACF,SAAS,CAAE,MAAM,AACnB,CAAC,AAED,EAAE,8BAAC,CAAC,AACF,SAAS,CAAE,MAAM,CACjB,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,CAAC,CAChB,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,YAAY,8BAAC,CAAC,AACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAC5C,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CACxB,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,QAAQ,8BAAC,CAAC,AACR,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,OAAO,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,AAC7B,CAAC,AAOD,MAAM,8BAAC,CAAC,AACN,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,iBAAiB,CAAC,CAC5C,WAAW,CAAE,IAAI,AACnB,CAAC,AAUD,uBAAQ,CAAC,GAAG,eAAC,CAAC,AACZ,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AAED,qBAAM,CAAC,GAAG,eAAC,CAAC,AACV,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,UAAU,8BAAC,CAAC,AACV,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,EAAE,8BAAC,CAAC,AACF,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AAClB,CAAC,AACH,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,EAAE,8BAAC,CAAC,AACF,SAAS,CAAE,MAAM,CACjB,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,YAAY,8BAAC,CAAC,AACZ,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,AAC9C,CAAC,AAED,QAAQ,8BAAC,CAAC,AACR,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,AAC9C,CAAC,AAED,UAAU,8BAAC,CAAC,AACV,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,MAAM,8BAAC,CAAC,AACN,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,MAAM,CAEnB,cAAc,CAAE,MAAM,AACxB,CAAC,AAKH,CAAC"}`
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const data = {
    "Brand development": [
      "We perform an exhaustive fact finding mission to understand your business and it's goals. We then audit, research and analyse collected data to draw consumer insight.",
      "The creative process begins with logo design. We take time to create beautifully simple and memorable logo marks. We carefully select typefaces and colour palette that perfectly and uniquely represent your brand.",
      "In the final stage we create branding and identity guides. We deliver creative results in relevant format. This stage marks the initial steps towards your future business success."
    ],
    "Graphic design": [
      "We create visual content to communicate your marketing messages.",
      "Visual identity system e.g. logo, typography, colour, brand elements like patterns, templates and mock-ups.",
      "Brand attributes and voice definition aka visual identity.",
      "Brand promotional material like Business cards, Letterheads, Posters, Fliers, Banners, Accounting Stationery and social media posts."
    ],
    "Web development": [
      "Prevalence of the internet has changed the way consumers engage with businesses. Basically, you gotta be online.",
      "We specialize in modern web technologies. We make use of modern UI/UX.",
      "We create Single Page Apps, (SPAs) for websites that act and feel like smartphone apps.",
      "Basically, we start every project from the ground up. That means we can customize the website to look and feel exactly as we want."
    ],
    "Branding services": [
      "This involves printing, engraving, cutting or pasting any of your brand identity onto promotional items like biro pens, T-shirts, carrier bags and many more."
    ],
    Printing: [
      "We do paper printing like business cards, fliers, posters, brochures, booklets, magazines among others.",
      "We do print banners like Pull up banners, hanging banners, tear drop banners, backdrop/media banners and others.",
      "We also do branding for gift items like carrier bags, biro pens, mags among others."
    ]
  };
  Swiper$1.use([Mousewheel, Autoplay]);
  $$result.css.add(css$4);
  return `${$$result.head += `${$$result.title = `<title>
    Affordable high quality graphic design and web development services in
    Kenya.
  </title>`, ""}`, ""}

<div class="${"content-500 svelte-19oh9wx"}"><h1 class="${"svelte-19oh9wx"}">Our business is making yours look good.</h1>
  <p>We provide brand centred graphic design and web development services to SMEs
    and corporates in Nairobi.
  </p></div>

<div class="${"content svelte-19oh9wx"}">${validate_component(Swiper, "Swiper").$$render($$result, {
    slidesPerView: 3,
    spaceBetween: 10,
    slidesPerGroup: 1,
    mousewheel: false,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: { delay: 3e3, disableOnInteraction: false },
    breakpoints: {
      "@0.00": { slidesPerView: 2, spaceBetween: 9 },
      768: { slidesPerView: 3 },
      1100: { slidesPerView: 5 }
    },
    class: "mySwiper"
  }, {}, {
    default: () => `${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/8.jpg"}" alt="${""}" class="${"svelte-19oh9wx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/2.jpg"}" alt="${""}" class="${"svelte-19oh9wx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/1.jpg"}" alt="${""}" class="${"svelte-19oh9wx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/9.jpg"}" alt="${""}" class="${"svelte-19oh9wx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/5.jpg"}" alt="${""}" class="${"svelte-19oh9wx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/6.jpg"}" alt="${""}" class="${"svelte-19oh9wx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/liberte.jpg"}" alt="${""}" class="${"svelte-19oh9wx"}">`
    })}`
  })}</div>

<h2 class="${"svelte-19oh9wx"}">Our services</h2>

<div class="${"accordion svelte-19oh9wx"}">${each$1(Object.entries(data), (entry) => `${validate_component(Accordion, "Accordion").$$render($$result, { entry }, {}, {})}`)}</div>



<h2 class="${"svelte-19oh9wx"}">Our clients</h2>

<div class="${"logos svelte-19oh9wx"}">${validate_component(Swiper, "Swiper").$$render($$result, {
    slidesPerView: 3,
    spaceBetween: 20,
    slidesPerGroup: 1,
    mousewheel: false,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: { delay: 1800, disableOnInteraction: false },
    breakpoints: {
      "@0.00": { slidesPerView: 4, spaceBetween: 60 },
      768: { slidesPerView: 4, spaceBetween: 155 }
    },
    class: "mySwiper"
  }, {}, {
    default: () => `${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/logos/amsco.png"}" alt="${"amsco logo"}" class="${"svelte-19oh9wx"}">`
    })}
    
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/logos/anchor.png"}" alt="${"Anchor builders logo"}" class="${"svelte-19oh9wx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/logos/strathmore.png"}" alt="${"Strathmore University logo"}" class="${"svelte-19oh9wx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/logos/eaglehr.png"}" alt="${"Eaglehr kenya logo"}" class="${"svelte-19oh9wx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/logos/absa.png"}" alt="${"absa bank logo"}" class="${"svelte-19oh9wx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/logos/farmhouse.png"}" alt="${"farmhouse sacco logo"}" class="${"svelte-19oh9wx"}">`
    })}`
  })}
</div>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var browser = false;
var dev = false;
var css$3 = {
  code: "h2.svelte-16pl8vx.svelte-16pl8vx{font-size:1.2rem;margin-top:3rem;font-weight:500}.content-500.svelte-16pl8vx.svelte-16pl8vx{width:100%;max-width:var(--column-width);max-width:530px;margin:var(--column-margin-top) auto 0 auto;margin:2rem auto 0 auto;text-align:center}.content.svelte-16pl8vx.svelte-16pl8vx{width:100%;max-width:var(--column-width);max-width:1400px;margin:0.75rem auto 0 auto}.content.svelte-16pl8vx img.svelte-16pl8vx{display:block;width:100%;height:auto}@media(min-width: 768px){.content-500.svelte-16pl8vx.svelte-16pl8vx{margin:var(--column-margin-top) auto 0 auto}}",
  map: `{"version":3,"file":"about.svelte","sources":["about.svelte"],"sourcesContent":["<script context=\\"module\\">\\n  import { browser, dev } from '$app/env'\\n  // we don't need any JS on this page, though we'll load\\n  // it in dev so that we get hot module replacement...\\n  export const hydrate = dev\\n  // ...but if the client-side router is already loaded\\n  // (i.e. we came here from elsewhere in the app), use it\\n  export const router = browser\\n  // since there's no dynamic data here, we can prerender\\n  // it so that it gets served as a static asset in prod\\n  export const prerender = true\\n<\/script>\\n\\n<script>\\n  import { Swiper, SwiperSlide } from 'swiper/svelte'\\n  import 'swiper/css'\\n  import 'swiper/css/pagination'\\n\\n  // import Swiper core and required modules\\n  import SwiperCore, { Autoplay, Navigation } from 'swiper'\\n\\n  // install Swiper modules\\n  SwiperCore.use([Autoplay, Navigation])\\n<\/script>\\n\\n<svelte:head>\\n  <title\\n    >We have 7 years of providing affordable high quality branding services to\\n    small and SMEs in Kenya.\\n  </title>\\n  <!-- <description\\n    >All graphic design and web development services to take your business to\\n    the next level\\n  </description> -->\\n</svelte:head>\\n\\n<div class=\\"content-500\\">\\n  <h1>About Us</h1>\\n  <p>\\n    When we started in 2014, we set out to provide high quality graphic design\\n    and printing services to SMEs in Kenya.\\n  </p>\\n  <p>\\n    As we have grown so has our service offering. Now we also offer brand\\n    development, website development and branding of marketing supplies.\\n  </p>\\n</div>\\n\\n<h2>Sample recent work...</h2>\\n\\n<div class=\\"content\\">\\n  <Swiper\\n    slidesPerView={3}\\n    spaceBetween={10}\\n    slidesPerGroup={1}\\n    loop={true}\\n    loopFillGroupWithBlank={true}\\n    autoplay={{\\n      delay: 3000,\\n      disableOnInteraction: false,\\n    }}\\n    pagination={{\\n      clickable: true,\\n    }}\\n    breakpoints={{\\n      '@0.00': {\\n        slidesPerView: 2,\\n        spaceBetween: 9,\\n      },\\n      768: {\\n        slidesPerView: 3,\\n      },\\n      1100: {\\n        slidesPerView: 4,\\n      },\\n    }}\\n    class=\\"mySwiper\\"\\n  >\\n    <SwiperSlide>\\n      <img src=\\"img/recent/1.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/recent/2.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/recent/3.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/recent/4.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/recent/5.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n    <SwiperSlide>\\n      <img src=\\"img/recent/6.jpg\\" alt=\\"\\" />\\n    </SwiperSlide>\\n  </Swiper>\\n</div>\\n\\n<style>\\n  h2 {\\n    font-size: 1.2rem;\\n    margin-top: 3rem;\\n    font-weight: 500;\\n  }\\n\\n  .content-500 {\\n    width: 100%;\\n    max-width: var(--column-width);\\n    max-width: 530px;\\n    margin: var(--column-margin-top) auto 0 auto;\\n    margin: 2rem auto 0 auto;\\n    text-align: center;\\n  }\\n\\n  .content {\\n    width: 100%;\\n    max-width: var(--column-width);\\n    max-width: 1400px;\\n    margin: 0.75rem auto 0 auto;\\n  }\\n\\n  .content img {\\n    display: block;\\n    width: 100%;\\n    height: auto;\\n  }\\n\\n  @media (min-width: 768px) {\\n    .content-500 {\\n      margin: var(--column-margin-top) auto 0 auto;\\n    }\\n\\n    /* .content {\\n      margin: var(--column-margin-top) auto 0 auto;\\n    } */\\n  }\\n</style>\\n"],"names":[],"mappings":"AAoGE,EAAE,8BAAC,CAAC,AACF,SAAS,CAAE,MAAM,CACjB,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,YAAY,8BAAC,CAAC,AACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAC5C,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CACxB,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,QAAQ,8BAAC,CAAC,AACR,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,OAAO,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,AAC7B,CAAC,AAED,uBAAQ,CAAC,GAAG,eAAC,CAAC,AACZ,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,YAAY,8BAAC,CAAC,AACZ,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,AAC9C,CAAC,AAKH,CAAC"}`
};
var hydrate = dev;
var router = browser;
var prerender = true;
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  Swiper$1.use([Autoplay, Navigation]);
  $$result.css.add(css$3);
  return `${$$result.head += `${$$result.title = `<title>We have 7 years of providing affordable high quality branding services to
    small and SMEs in Kenya.
  </title>`, ""}`, ""}

<div class="${"content-500 svelte-16pl8vx"}"><h1>About Us</h1>
  <p>When we started in 2014, we set out to provide high quality graphic design
    and printing services to SMEs in Kenya.
  </p>
  <p>As we have grown so has our service offering. Now we also offer brand
    development, website development and branding of marketing supplies.
  </p></div>

<h2 class="${"svelte-16pl8vx"}">Sample recent work...</h2>

<div class="${"content svelte-16pl8vx"}">${validate_component(Swiper, "Swiper").$$render($$result, {
    slidesPerView: 3,
    spaceBetween: 10,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: { delay: 3e3, disableOnInteraction: false },
    pagination: { clickable: true },
    breakpoints: {
      "@0.00": { slidesPerView: 2, spaceBetween: 9 },
      768: { slidesPerView: 3 },
      1100: { slidesPerView: 4 }
    },
    class: "mySwiper"
  }, {}, {
    default: () => `${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/1.jpg"}" alt="${""}" class="${"svelte-16pl8vx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/2.jpg"}" alt="${""}" class="${"svelte-16pl8vx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/3.jpg"}" alt="${""}" class="${"svelte-16pl8vx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/4.jpg"}" alt="${""}" class="${"svelte-16pl8vx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/5.jpg"}" alt="${""}" class="${"svelte-16pl8vx"}">`
    })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
      default: () => `<img src="${"img/recent/6.jpg"}" alt="${""}" class="${"svelte-16pl8vx"}">`
    })}`
  })}
</div>`;
});
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": About,
  hydrate,
  router,
  prerender
});
var Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"menu"}"><h1>Hello canvas</h1></div>`;
});
var menu = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Menu
});
var css$2 = {
  code: "section.svelte-18pb843{max-width:1400px;margin:auto}section.svelte-18pb843{display:grid;grid-template-columns:1fr;gap:0.75rem}@media(min-width: 768px){section.svelte-18pb843{grid-template-columns:repeat(3, 1fr)}}",
  map: '{"version":3,"file":"ThreeWayGrid.svelte","sources":["ThreeWayGrid.svelte"],"sourcesContent":["<section>\\r\\n  <div>\\r\\n    <slot name=\\"left\\" />\\r\\n  </div>\\r\\n  <div>\\r\\n    <slot name=\\"center\\" />\\r\\n  </div>\\r\\n  <div>\\r\\n    <slot name=\\"right\\" />\\r\\n  </div>\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n  section {\\r\\n    max-width: 1400px;\\r\\n    margin: auto;\\r\\n  }\\r\\n\\r\\n  section {\\r\\n    display: grid;\\r\\n    grid-template-columns: 1fr;\\r\\n    gap: 0.75rem;\\r\\n  }\\r\\n\\r\\n  @media (min-width: 768px) {\\r\\n    section {\\r\\n      grid-template-columns: repeat(3, 1fr);\\r\\n    }\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAaE,OAAO,eAAC,CAAC,AACP,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,AACd,CAAC,AAED,OAAO,eAAC,CAAC,AACP,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,OAAO,AACd,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,OAAO,eAAC,CAAC,AACP,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,AACvC,CAAC,AACH,CAAC"}'
};
var ThreeWayGrid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<section class="${"svelte-18pb843"}"><div>${slots.left ? slots.left({}) : ``}</div>
  <div>${slots.center ? slots.center({}) : ``}</div>
  <div>${slots.right ? slots.right({}) : ``}</div>
</section>`;
});
var css$1 = {
  code: "section.svelte-1jirjo{max-width:1400px;margin:auto}section.svelte-1jirjo{display:grid;grid-template-columns:1fr;gap:0.75rem}@media(min-width: 768px){section.svelte-1jirjo{grid-template-columns:repeat(2, 1fr)}}",
  map: '{"version":3,"file":"TwoWayGrid.svelte","sources":["TwoWayGrid.svelte"],"sourcesContent":["<section>\\r\\n  <div>\\r\\n    <slot name=\\"left\\" />\\r\\n  </div>\\r\\n  <div>\\r\\n    <slot name=\\"right\\" />\\r\\n  </div>\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n  section {\\r\\n    max-width: 1400px;\\r\\n    margin: auto;\\r\\n  }\\r\\n\\r\\n  section {\\r\\n    display: grid;\\r\\n    grid-template-columns: 1fr;\\r\\n    gap: 0.75rem;\\r\\n  }\\r\\n\\r\\n  @media (min-width: 768px) {\\r\\n    section {\\r\\n      grid-template-columns: repeat(2, 1fr);\\r\\n    }\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAUE,OAAO,cAAC,CAAC,AACP,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,AACd,CAAC,AAED,OAAO,cAAC,CAAC,AACP,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,OAAO,AACd,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,OAAO,cAAC,CAAC,AACP,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,AACvC,CAAC,AACH,CAAC"}'
};
var TwoWayGrid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<section class="${"svelte-1jirjo"}"><div>${slots.left ? slots.left({}) : ``}</div>
  <div>${slots.right ? slots.right({}) : ``}</div>
</section>`;
});
var css = {
  code: ".width.svelte-7o8txp.svelte-7o8txp{width:100%;max-width:1000px;margin:auto;margin-top:0.75rem}.bg-color.svelte-7o8txp.svelte-7o8txp{background-color:var(--secondary-color);background-color:#180040;background-color:#fff;padding:2.5rem 0;margin:2rem auto 0 auto}.bg-white.svelte-7o8txp.svelte-7o8txp{background-color:var(--pure-white)}.bg-white.svelte-7o8txp img.svelte-7o8txp{display:block;max-width:100%;margin-left:0}.img-wrapper.svelte-7o8txp img.svelte-7o8txp{display:block;width:100%}.bg-color.svelte-7o8txp div.svelte-7o8txp{display:block;width:90%;margin:auto}.img-width.svelte-7o8txp img.svelte-7o8txp{display:block;max-width:100%;margin:auto}.content-500.svelte-7o8txp.svelte-7o8txp{width:100%;max-width:var(--column-width);max-width:720px;margin:var(--column-margin-top) auto 0 auto;margin:2rem auto 0 auto;text-align:center}@media(min-width: 768px){.content-500.svelte-7o8txp.svelte-7o8txp{margin:var(--column-margin-top) auto 0 auto}.bg-color.svelte-7o8txp.svelte-7o8txp{margin:var(--column-margin-top) auto 0 auto}}",
  map: `{"version":3,"file":"work.svelte","sources":["work.svelte"],"sourcesContent":["<script>\\r\\n  let work = undefined\\r\\n  import ThreeWayGrid from '$lib/ThreeWayGrid.svelte'\\r\\n  import TwoWayGrid from '$lib/TwoWayGrid.svelte'\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n  <title>\\r\\n    Here we showcase our approach to the brand development project for Anchor\\r\\n    homes project.\\r\\n  </title>\\r\\n</svelte:head>\\r\\n\\r\\n<div class=\\"content-500\\">\\r\\n  <h1>Anchor homes branding project.</h1>\\r\\n  <p>\\r\\n    Anchor approached us to imagine their branding. The main objective was to\\r\\n    establish a sense of trust and closeness with potential home owners through\\r\\n    simple and down to earth communication.\\r\\n  </p>\\r\\n  <p>\\r\\n    We have implemented this based on the principle of simplicity and\\r\\n    recognition.\\r\\n  </p>\\r\\n</div>\\r\\n\\r\\n<article class=\\"width bg-color img-width\\">\\r\\n  <div>\\r\\n    <img src=\\"img/recent/anchor hero.png\\" alt=\\"anchor\\" />\\r\\n  </div>\\r\\n</article>\\r\\n\\r\\n<div class=\\"width work-wrapper\\">\\r\\n  <div class=\\"recent-work\\">\\r\\n    <section class=\\"two-way-grid\\">\\r\\n      <TwoWayGrid>\\r\\n        <div slot=\\"left\\" class=\\"img-wrapper\\">\\r\\n          <img src=\\"img/recent/2.jpg\\" alt=\\"eaglehr\\" />\\r\\n        </div>\\r\\n        <div slot=\\"right\\" class=\\"img-wrapper\\">\\r\\n          <img src=\\"img/recent/1.jpg\\" alt=\\"eaglehr\\" />\\r\\n        </div>\\r\\n      </TwoWayGrid>\\r\\n    </section>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<div class=\\"bg-white width\\">\\r\\n  <img src=\\"img/recent/branded.png\\" alt=\\"anchor one\\" />\\r\\n</div>\\r\\n\\r\\n<div class=\\"width img-width three-way-grid\\">\\r\\n  <ThreeWayGrid>\\r\\n    <img slot=\\"left\\" src=\\"img/recent/carrier bags.jpg\\" alt=\\"anchor one\\" />\\r\\n    <img slot=\\"center\\" src=\\"img/recent/brochure.jpg\\" alt=\\"anchor one\\" />\\r\\n    <img slot=\\"right\\" src=\\"img/recent/7.jpg\\" alt=\\"anchor tshirt branding\\" />\\r\\n  </ThreeWayGrid>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .width {\\r\\n    width: 100%;\\r\\n    max-width: 1000px;\\r\\n    margin: auto;\\r\\n    margin-top: 0.75rem;\\r\\n  }\\r\\n\\r\\n  .bg-color {\\r\\n    background-color: var(--secondary-color);\\r\\n    background-color: #180040;\\r\\n    background-color: #fff;\\r\\n    padding: 2.5rem 0;\\r\\n    margin: 2rem auto 0 auto;\\r\\n  }\\r\\n\\r\\n  .bg-white {\\r\\n    background-color: var(--pure-white);\\r\\n  }\\r\\n\\r\\n  .bg-white img {\\r\\n    display: block;\\r\\n    max-width: 100%;\\r\\n    margin-left: 0;\\r\\n  }\\r\\n\\r\\n  .img-wrapper img {\\r\\n    display: block;\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .bg-color div {\\r\\n    display: block;\\r\\n    width: 90%;\\r\\n    margin: auto;\\r\\n  }\\r\\n\\r\\n  .img-width img {\\r\\n    display: block;\\r\\n    max-width: 100%;\\r\\n    margin: auto;\\r\\n  }\\r\\n\\r\\n  /* .two-way-grid {\\r\\n    margin-top: 0.75rem;\\r\\n  } */\\r\\n\\r\\n  /* h2 {\\r\\n    font-size: 1.2rem;\\r\\n    margin-top: 3rem;\\r\\n    font-weight: 500;\\r\\n  } */\\r\\n\\r\\n  .content-500 {\\r\\n    width: 100%;\\r\\n    max-width: var(--column-width);\\r\\n    max-width: 720px;\\r\\n    margin: var(--column-margin-top) auto 0 auto;\\r\\n    margin: 2rem auto 0 auto;\\r\\n    text-align: center;\\r\\n  }\\r\\n\\r\\n  @media (min-width: 768px) {\\r\\n    .content-500 {\\r\\n      margin: var(--column-margin-top) auto 0 auto;\\r\\n    }\\r\\n\\r\\n    .bg-color {\\r\\n      margin: var(--column-margin-top) auto 0 auto;\\r\\n    }\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA4DE,MAAM,4BAAC,CAAC,AACN,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,AACrB,CAAC,AAED,SAAS,4BAAC,CAAC,AACT,gBAAgB,CAAE,IAAI,iBAAiB,CAAC,CACxC,gBAAgB,CAAE,OAAO,CACzB,gBAAgB,CAAE,IAAI,CACtB,OAAO,CAAE,MAAM,CAAC,CAAC,CACjB,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,AAC1B,CAAC,AAED,SAAS,4BAAC,CAAC,AACT,gBAAgB,CAAE,IAAI,YAAY,CAAC,AACrC,CAAC,AAED,uBAAS,CAAC,GAAG,cAAC,CAAC,AACb,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,CAAC,AAChB,CAAC,AAED,0BAAY,CAAC,GAAG,cAAC,CAAC,AAChB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,AACb,CAAC,AAED,uBAAS,CAAC,GAAG,cAAC,CAAC,AACb,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IAAI,AACd,CAAC,AAED,wBAAU,CAAC,GAAG,cAAC,CAAC,AACd,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,AACd,CAAC,AAYD,YAAY,4BAAC,CAAC,AACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAC5C,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CACxB,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,YAAY,4BAAC,CAAC,AACZ,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,AAC9C,CAAC,AAED,SAAS,4BAAC,CAAC,AACT,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,AAC9C,CAAC,AACH,CAAC"}`
};
var Work = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>
    Here we showcase our approach to the brand development project for Anchor
    homes project.
  </title>`, ""}`, ""}

<div class="${"content-500 svelte-7o8txp"}"><h1>Anchor homes branding project.</h1>
  <p>Anchor approached us to imagine their branding. The main objective was to
    establish a sense of trust and closeness with potential home owners through
    simple and down to earth communication.
  </p>
  <p>We have implemented this based on the principle of simplicity and
    recognition.
  </p></div>

<article class="${"width bg-color img-width svelte-7o8txp"}"><div class="${"svelte-7o8txp"}"><img src="${"img/recent/anchor hero.png"}" alt="${"anchor"}" class="${"svelte-7o8txp"}"></div></article>

<div class="${"width work-wrapper svelte-7o8txp"}"><div class="${"recent-work"}"><section class="${"two-way-grid"}">${validate_component(TwoWayGrid, "TwoWayGrid").$$render($$result, {}, {}, {
    right: () => `<div slot="${"right"}" class="${"img-wrapper svelte-7o8txp"}"><img src="${"img/recent/1.jpg"}" alt="${"eaglehr"}" class="${"svelte-7o8txp"}"></div>`,
    left: () => `<div slot="${"left"}" class="${"img-wrapper svelte-7o8txp"}"><img src="${"img/recent/2.jpg"}" alt="${"eaglehr"}" class="${"svelte-7o8txp"}"></div>`
  })}</section></div></div>

<div class="${"bg-white width svelte-7o8txp"}"><img src="${"img/recent/branded.png"}" alt="${"anchor one"}" class="${"svelte-7o8txp"}"></div>

<div class="${"width img-width three-way-grid svelte-7o8txp"}">${validate_component(ThreeWayGrid, "ThreeWayGrid").$$render($$result, {}, {}, {
    right: () => `<img slot="${"right"}" src="${"img/recent/7.jpg"}" alt="${"anchor tshirt branding"}" class="${"svelte-7o8txp"}">`,
    center: () => `<img slot="${"center"}" src="${"img/recent/brochure.jpg"}" alt="${"anchor one"}" class="${"svelte-7o8txp"}">`,
    left: () => `<img slot="${"left"}" src="${"img/recent/carrier bags.jpg"}" alt="${"anchor one"}" class="${"svelte-7o8txp"}">`
  })}
</div>`;
});
var work = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Work
});

// .svelte-kit/node/middlewares.js
import {
  createReadStream,
  existsSync,
  statSync
} from "fs";
import fs__default, { readdirSync, statSync as statSync2 } from "fs";
import { resolve as resolve2, join, normalize as normalize2, dirname } from "path";
import {
  parse
} from "querystring";
import { fileURLToPath } from "url";
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    if (isNaN(length) && h["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset2 = 0;
      req.on("data", (chunk) => {
        const new_len = offset2 + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset2);
        offset2 = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}
function create_kit_middleware({ render: render2 }) {
  return async (req, res) => {
    let parsed;
    try {
      parsed = new URL(req.url || "", "http://localhost");
    } catch (e) {
      res.statusCode = 400;
      return res.end("Invalid URL");
    }
    let body;
    try {
      body = await getRawBody(req);
    } catch (err) {
      res.statusCode = err.status || 400;
      return res.end(err.reason || "Invalid request body");
    }
    const rendered = await render2({
      method: req.method,
      headers: req.headers,
      path: parsed.pathname,
      query: parsed.searchParams,
      rawBody: body
    });
    if (rendered) {
      res.writeHead(rendered.status, rendered.headers);
      if (rendered.body) {
        res.write(rendered.body);
      }
      res.end();
    } else {
      res.statusCode = 404;
      res.end("Not found");
    }
  };
}
function parse2(req) {
  let raw = req.url;
  if (raw == null)
    return;
  let prev2 = req._parsedUrl;
  if (prev2 && prev2.raw === raw)
    return prev2;
  let pathname = raw, search = "", query;
  if (raw.length > 1) {
    let idx = raw.indexOf("?", 1);
    if (idx !== -1) {
      search = raw.substring(idx);
      pathname = raw.substring(0, idx);
      if (search.length > 1) {
        query = parse(search.substring(1));
      }
    }
  }
  return req._parsedUrl = { pathname, search, query, raw };
}
function list(dir, callback, pre = "") {
  dir = resolve2(".", dir);
  let arr = readdirSync(dir);
  let i = 0, abs, stats;
  for (; i < arr.length; i++) {
    abs = join(dir, arr[i]);
    stats = statSync2(abs);
    stats.isDirectory() ? list(abs, callback, join(pre, arr[i])) : callback(join(pre, arr[i]), abs, stats);
  }
}
function Mime$1() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);
  for (let i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }
  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}
Mime$1.prototype.define = function(typeMap, force) {
  for (let type in typeMap) {
    let extensions = typeMap[type].map(function(t) {
      return t.toLowerCase();
    });
    type = type.toLowerCase();
    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i];
      if (ext[0] === "*") {
        continue;
      }
      if (!force && ext in this._types) {
        throw new Error('Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".');
      }
      this._types[ext] = type;
    }
    if (force || !this._extensions[type]) {
      const ext = extensions[0];
      this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
    }
  }
};
Mime$1.prototype.getType = function(path) {
  path = String(path);
  let last = path.replace(/^.*[/\\]/, "").toLowerCase();
  let ext = last.replace(/^.*\./, "").toLowerCase();
  let hasPath = last.length < path.length;
  let hasDot = ext.length < last.length - 1;
  return (hasDot || !hasPath) && this._types[ext] || null;
};
Mime$1.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};
var Mime_1 = Mime$1;
var standard = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["ecma", "es"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/mrb-consumer+xml": ["*xdf"], "application/mrb-publish+xml": ["*xdf"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["*xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-error+xml": ["xer"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
var Mime = Mime_1;
var lite = new Mime(standard);
var noop2 = () => {
};
function isMatch(uri, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].test(uri))
      return true;
  }
}
function toAssume(uri, extns) {
  let i = 0, x, len = uri.length - 1;
  if (uri.charCodeAt(len) === 47) {
    uri = uri.substring(0, len);
  }
  let arr = [], tmp = `${uri}/index`;
  for (; i < extns.length; i++) {
    x = extns[i] ? `.${extns[i]}` : "";
    if (uri)
      arr.push(uri + x);
    arr.push(tmp + x);
  }
  return arr;
}
function viaCache(cache, uri, extns) {
  let i = 0, data, arr = toAssume(uri, extns);
  for (; i < arr.length; i++) {
    if (data = cache[arr[i]])
      return data;
  }
}
function viaLocal(dir, isEtag, uri, extns) {
  let i = 0, arr = toAssume(uri, extns);
  let abs, stats, name, headers;
  for (; i < arr.length; i++) {
    abs = normalize2(join(dir, name = arr[i]));
    if (abs.startsWith(dir) && existsSync(abs)) {
      stats = statSync(abs);
      if (stats.isDirectory())
        continue;
      headers = toHeaders(name, stats, isEtag);
      headers["Cache-Control"] = isEtag ? "no-cache" : "no-store";
      return { abs, stats, headers };
    }
  }
}
function is404(req, res) {
  return res.statusCode = 404, res.end();
}
function send(req, res, file, stats, headers) {
  let code = 200, tmp, opts = {};
  headers = __spreadValues({}, headers);
  for (let key in headers) {
    tmp = res.getHeader(key);
    if (tmp)
      headers[key] = tmp;
  }
  if (tmp = res.getHeader("content-type")) {
    headers["Content-Type"] = tmp;
  }
  if (req.headers.range) {
    code = 206;
    let [x, y] = req.headers.range.replace("bytes=", "").split("-");
    let end = opts.end = parseInt(y, 10) || stats.size - 1;
    let start = opts.start = parseInt(x, 10) || 0;
    if (start >= stats.size || end >= stats.size) {
      res.setHeader("Content-Range", `bytes */${stats.size}`);
      res.statusCode = 416;
      return res.end();
    }
    headers["Content-Range"] = `bytes ${start}-${end}/${stats.size}`;
    headers["Content-Length"] = end - start + 1;
    headers["Accept-Ranges"] = "bytes";
  }
  res.writeHead(code, headers);
  createReadStream(file, opts).pipe(res);
}
function isEncoding(name, type, headers) {
  headers["Content-Encoding"] = type;
  headers["Content-Type"] = lite.getType(name.replace(/\.([^.]*)$/, "")) || "";
}
function toHeaders(name, stats, isEtag) {
  let headers = {
    "Content-Length": stats.size,
    "Content-Type": lite.getType(name) || "",
    "Last-Modified": stats.mtime.toUTCString()
  };
  if (isEtag)
    headers["ETag"] = `W/"${stats.size}-${stats.mtime.getTime()}"`;
  if (/\.br$/.test(name))
    isEncoding(name, "br", headers);
  if (/\.gz$/.test(name))
    isEncoding(name, "gzip", headers);
  return headers;
}
function sirv(dir, opts = {}) {
  dir = resolve2(dir || ".");
  let isNotFound = opts.onNoMatch || is404;
  let setHeaders = opts.setHeaders || noop2;
  let extensions = opts.extensions || ["html", "htm"];
  let gzips = opts.gzip && extensions.map((x) => `${x}.gz`).concat("gz");
  let brots = opts.brotli && extensions.map((x) => `${x}.br`).concat("br");
  const FILES = {};
  let fallback = "/";
  let isEtag = !!opts.etag;
  let isSPA = !!opts.single;
  if (typeof opts.single === "string") {
    let idx = opts.single.lastIndexOf(".");
    fallback += !!~idx ? opts.single.substring(0, idx) : opts.single;
  }
  let ignores = [];
  if (opts.ignores !== false) {
    ignores.push(/[/]([A-Za-z\s\d~$._-]+\.\w+){1,}$/);
    if (opts.dotfiles)
      ignores.push(/\/\.\w/);
    else
      ignores.push(/\/\.well-known/);
    [].concat(opts.ignores || []).forEach((x) => {
      ignores.push(new RegExp(x, "i"));
    });
  }
  let cc = opts.maxAge != null && `public,max-age=${opts.maxAge}`;
  if (cc && opts.immutable)
    cc += ",immutable";
  else if (cc && opts.maxAge === 0)
    cc += ",must-revalidate";
  if (!opts.dev) {
    list(dir, (name, abs, stats) => {
      if (/\.well-known[\\+\/]/.test(name))
        ;
      else if (!opts.dotfiles && /(^\.|[\\+|\/+]\.)/.test(name))
        return;
      let headers = toHeaders(name, stats, isEtag);
      if (cc)
        headers["Cache-Control"] = cc;
      FILES["/" + name.normalize().replace(/\\+/g, "/")] = { abs, stats, headers };
    });
  }
  let lookup = opts.dev ? viaLocal.bind(0, dir, isEtag) : viaCache.bind(0, FILES);
  return function(req, res, next2) {
    let extns = [""];
    let pathname = parse2(req).pathname;
    let val = req.headers["accept-encoding"] || "";
    if (gzips && val.includes("gzip"))
      extns.unshift(...gzips);
    if (brots && /(br|brotli)/i.test(val))
      extns.unshift(...brots);
    extns.push(...extensions);
    if (pathname.indexOf("%") !== -1) {
      try {
        pathname = decodeURIComponent(pathname);
      } catch (err) {
      }
    }
    let data = lookup(pathname, extns) || isSPA && !isMatch(pathname, ignores) && lookup(fallback, extns);
    if (!data)
      return next2 ? next2() : isNotFound(req, res);
    if (isEtag && req.headers["if-none-match"] === data.headers["ETag"]) {
      res.writeHead(304);
      return res.end();
    }
    if (gzips || brots) {
      res.setHeader("Vary", "Accept-Encoding");
    }
    setHeaders(res, pathname, data.stats);
    send(req, res, data.abs, data.stats, data.headers);
  };
}
var __dirname = dirname(fileURLToPath(import.meta.url));
var noop_handler = (_req, _res, next2) => next2();
var paths = {
  assets: join(__dirname, "/assets"),
  prerendered: join(__dirname, "/prerendered")
};
var prerenderedMiddleware = fs__default.existsSync(paths.prerendered) ? sirv(paths.prerendered, {
  etag: true,
  maxAge: 0,
  gzip: true,
  brotli: true
}) : noop_handler;
var assetsMiddleware = fs__default.existsSync(paths.assets) ? sirv(paths.assets, {
  setHeaders: (res, pathname) => {
    if (pathname.startsWith("/_app/")) {
      res.setHeader("cache-control", "public, max-age=31536000, immutable");
    }
  },
  gzip: true,
  brotli: true
}) : noop_handler;
var kitMiddleware = function() {
  init();
  return create_kit_middleware({ render });
}();
export {
  assetsMiddleware,
  kitMiddleware,
  prerenderedMiddleware
};
