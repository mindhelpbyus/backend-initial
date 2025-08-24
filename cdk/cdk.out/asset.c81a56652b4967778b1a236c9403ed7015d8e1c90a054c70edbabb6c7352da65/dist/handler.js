/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 153:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Range = __webpack_require__(5006)
const intersects = (r1, r2, options) => {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2, options)
}
module.exports = intersects


/***/ }),

/***/ 156:
/***/ ((module) => {

/**
 * Obliterator ForEach Function
 * =============================
 *
 * Helper function used to easily iterate over mixed values.
 */

/**
 * Constants.
 */
var ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer !== 'undefined',
    SYMBOL_SUPPORT = typeof Symbol !== 'undefined';

/**
 * Function able to iterate over almost any iterable JS value.
 *
 * @param  {any}      iterable - Iterable value.
 * @param  {function} callback - Callback function.
 */
function forEach(iterable, callback) {
  var iterator, k, i, l, s;

  if (!iterable)
    throw new Error('obliterator/forEach: invalid iterable.');

  if (typeof callback !== 'function')
    throw new Error('obliterator/forEach: expecting a callback.');

  // The target is an array or a string or function arguments
  if (
    Array.isArray(iterable) ||
    (ARRAY_BUFFER_SUPPORT && ArrayBuffer.isView(iterable)) ||
    typeof iterable === 'string' ||
    iterable.toString() === '[object Arguments]'
  ) {
    for (i = 0, l = iterable.length; i < l; i++)
      callback(iterable[i], i);
    return;
  }

  // The target has a #.forEach method
  if (typeof iterable.forEach === 'function') {
    iterable.forEach(callback);
    return;
  }

  // The target is iterable
  if (
    SYMBOL_SUPPORT &&
    Symbol.iterator in iterable &&
    typeof iterable.next !== 'function'
  ) {
    iterable = iterable[Symbol.iterator]();
  }

  // The target is an iterator
  if (typeof iterable.next === 'function') {
    iterator = iterable;
    i = 0;

    while ((s = iterator.next(), s.done !== true)) {
      callback(s.value, i);
      i++;
    }

    return;
  }

  // The target is a plain object
  for (k in iterable) {
    if (iterable.hasOwnProperty(k)) {
      callback(iterable[k], k);
    }
  }

  return;
}

/**
 * Same function as the above `forEach` but will yield `null` when the target
 * does not have keys.
 *
 * @param  {any}      iterable - Iterable value.
 * @param  {function} callback - Callback function.
 */
forEach.forEachWithNullKeys = function(iterable, callback) {
  var iterator, k, i, l, s;

  if (!iterable)
    throw new Error('obliterator/forEachWithNullKeys: invalid iterable.');

  if (typeof callback !== 'function')
    throw new Error('obliterator/forEachWithNullKeys: expecting a callback.');

  // The target is an array or a string or function arguments
  if (
    Array.isArray(iterable) ||
    (ARRAY_BUFFER_SUPPORT && ArrayBuffer.isView(iterable)) ||
    typeof iterable === 'string' ||
    iterable.toString() === '[object Arguments]'
  ) {
    for (i = 0, l = iterable.length; i < l; i++)
      callback(iterable[i], null);
    return;
  }

  // The target is a Set
  if (iterable instanceof Set) {
    iterable.forEach(function(value) {
      callback(value, null);
    });
    return;
  }

  // The target has a #.forEach method
  if (typeof iterable.forEach === 'function') {
    iterable.forEach(callback);
    return;
  }

  // The target is iterable
  if (
    SYMBOL_SUPPORT &&
    Symbol.iterator in iterable &&
    typeof iterable.next !== 'function'
  ) {
    iterable = iterable[Symbol.iterator]();
  }

  // The target is an iterator
  if (typeof iterable.next === 'function') {
    iterator = iterable;
    i = 0;

    while ((s = iterator.next(), s.done !== true)) {
      callback(s.value, null);
      i++;
    }

    return;
  }

  // The target is a plain object
  for (k in iterable) {
    if (iterable.hasOwnProperty(k)) {
      callback(iterable[k], k);
    }
  }

  return;
};

/**
 * Exporting.
 */
module.exports = forEach;


/***/ }),

/***/ 180:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)
const patch = (a, loose) => new SemVer(a, loose).patch
module.exports = patch


/***/ }),

/***/ 181:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 244:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ setCredentialFeature)
/* harmony export */ });
function setCredentialFeature(credentials, feature, value) {
    if (!credentials.$source) {
        credentials.$source = {};
    }
    credentials.$source[feature] = value;
    return credentials;
}


/***/ }),

/***/ 612:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ DefaultIdentityProviderConfig)
/* harmony export */ });
class DefaultIdentityProviderConfig {
    constructor(config) {
        this.authSchemes = new Map();
        for (const [key, value] of Object.entries(config)) {
            if (value !== undefined) {
                this.authSchemes.set(key, value);
            }
        }
    }
    getIdentityProvider(schemeId) {
        return this.authSchemes.get(schemeId);
    }
}


/***/ }),

/***/ 630:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const eq = __webpack_require__(4506)
const neq = __webpack_require__(4654)
const gt = __webpack_require__(9671)
const gte = __webpack_require__(9540)
const lt = __webpack_require__(6912)
const lte = __webpack_require__(8445)

const cmp = (a, op, b, loose) => {
  switch (op) {
    case '===':
      if (typeof a === 'object') {
        a = a.version
      }
      if (typeof b === 'object') {
        b = b.version
      }
      return a === b

    case '!==':
      if (typeof a === 'object') {
        a = a.version
      }
      if (typeof b === 'object') {
        b = b.version
      }
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError(`Invalid operator: ${op}`)
  }
}
module.exports = cmp


/***/ }),

/***/ 643:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  UF: () => (/* reexport */ awsEndpointFunctions),
  vL: () => (/* reexport */ getUserAgentPrefix)
});

// UNUSED EXPORTS: EndpointError, isIpAddress, partition, resolveDefaultAwsRegionalEndpointsConfig, resolveEndpoint, setPartitionInfo, toEndpointV1, useDefaultPartitionInfo

// EXTERNAL MODULE: ./node_modules/@smithy/util-endpoints/dist-es/index.js + 35 modules
var dist_es = __webpack_require__(8545);
;// ./node_modules/@aws-sdk/util-endpoints/dist-es/lib/isIpAddress.js


;// ./node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/isVirtualHostableS3Bucket.js


const isVirtualHostableS3Bucket = (value, allowSubDomains = false) => {
    if (allowSubDomains) {
        for (const label of value.split(".")) {
            if (!isVirtualHostableS3Bucket(label)) {
                return false;
            }
        }
        return true;
    }
    if (!(0,dist_es/* isValidHostLabel */.X8)(value)) {
        return false;
    }
    if (value.length < 3 || value.length > 63) {
        return false;
    }
    if (value !== value.toLowerCase()) {
        return false;
    }
    if ((0,dist_es/* isIpAddress */.oX)(value)) {
        return false;
    }
    return true;
};

;// ./node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/parseArn.js
const ARN_DELIMITER = ":";
const RESOURCE_DELIMITER = "/";
const parseArn = (value) => {
    const segments = value.split(ARN_DELIMITER);
    if (segments.length < 6)
        return null;
    const [arn, partition, service, region, accountId, ...resourcePath] = segments;
    if (arn !== "arn" || partition === "" || service === "" || resourcePath.join(ARN_DELIMITER) === "")
        return null;
    const resourceId = resourcePath.map((resource) => resource.split(RESOURCE_DELIMITER)).flat();
    return {
        partition,
        service,
        region,
        accountId,
        resourceId,
    };
};

;// ./node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partitions.json
const partitions_namespaceObject = /*#__PURE__*/JSON.parse('{"partitions":[{"id":"aws","outputs":{"dnsSuffix":"amazonaws.com","dualStackDnsSuffix":"api.aws","implicitGlobalRegion":"us-east-1","name":"aws","supportsDualStack":true,"supportsFIPS":true},"regionRegex":"^(us|eu|ap|sa|ca|me|af|il|mx)\\\\-\\\\w+\\\\-\\\\d+$","regions":{"af-south-1":{"description":"Africa (Cape Town)"},"ap-east-1":{"description":"Asia Pacific (Hong Kong)"},"ap-east-2":{"description":"Asia Pacific (Taipei)"},"ap-northeast-1":{"description":"Asia Pacific (Tokyo)"},"ap-northeast-2":{"description":"Asia Pacific (Seoul)"},"ap-northeast-3":{"description":"Asia Pacific (Osaka)"},"ap-south-1":{"description":"Asia Pacific (Mumbai)"},"ap-south-2":{"description":"Asia Pacific (Hyderabad)"},"ap-southeast-1":{"description":"Asia Pacific (Singapore)"},"ap-southeast-2":{"description":"Asia Pacific (Sydney)"},"ap-southeast-3":{"description":"Asia Pacific (Jakarta)"},"ap-southeast-4":{"description":"Asia Pacific (Melbourne)"},"ap-southeast-5":{"description":"Asia Pacific (Malaysia)"},"ap-southeast-7":{"description":"Asia Pacific (Thailand)"},"aws-global":{"description":"AWS Standard global region"},"ca-central-1":{"description":"Canada (Central)"},"ca-west-1":{"description":"Canada West (Calgary)"},"eu-central-1":{"description":"Europe (Frankfurt)"},"eu-central-2":{"description":"Europe (Zurich)"},"eu-north-1":{"description":"Europe (Stockholm)"},"eu-south-1":{"description":"Europe (Milan)"},"eu-south-2":{"description":"Europe (Spain)"},"eu-west-1":{"description":"Europe (Ireland)"},"eu-west-2":{"description":"Europe (London)"},"eu-west-3":{"description":"Europe (Paris)"},"il-central-1":{"description":"Israel (Tel Aviv)"},"me-central-1":{"description":"Middle East (UAE)"},"me-south-1":{"description":"Middle East (Bahrain)"},"mx-central-1":{"description":"Mexico (Central)"},"sa-east-1":{"description":"South America (Sao Paulo)"},"us-east-1":{"description":"US East (N. Virginia)"},"us-east-2":{"description":"US East (Ohio)"},"us-west-1":{"description":"US West (N. California)"},"us-west-2":{"description":"US West (Oregon)"}}},{"id":"aws-cn","outputs":{"dnsSuffix":"amazonaws.com.cn","dualStackDnsSuffix":"api.amazonwebservices.com.cn","implicitGlobalRegion":"cn-northwest-1","name":"aws-cn","supportsDualStack":true,"supportsFIPS":true},"regionRegex":"^cn\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-cn-global":{"description":"AWS China global region"},"cn-north-1":{"description":"China (Beijing)"},"cn-northwest-1":{"description":"China (Ningxia)"}}},{"id":"aws-us-gov","outputs":{"dnsSuffix":"amazonaws.com","dualStackDnsSuffix":"api.aws","implicitGlobalRegion":"us-gov-west-1","name":"aws-us-gov","supportsDualStack":true,"supportsFIPS":true},"regionRegex":"^us\\\\-gov\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-us-gov-global":{"description":"AWS GovCloud (US) global region"},"us-gov-east-1":{"description":"AWS GovCloud (US-East)"},"us-gov-west-1":{"description":"AWS GovCloud (US-West)"}}},{"id":"aws-iso","outputs":{"dnsSuffix":"c2s.ic.gov","dualStackDnsSuffix":"c2s.ic.gov","implicitGlobalRegion":"us-iso-east-1","name":"aws-iso","supportsDualStack":false,"supportsFIPS":true},"regionRegex":"^us\\\\-iso\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-iso-global":{"description":"AWS ISO (US) global region"},"us-iso-east-1":{"description":"US ISO East"},"us-iso-west-1":{"description":"US ISO WEST"}}},{"id":"aws-iso-b","outputs":{"dnsSuffix":"sc2s.sgov.gov","dualStackDnsSuffix":"sc2s.sgov.gov","implicitGlobalRegion":"us-isob-east-1","name":"aws-iso-b","supportsDualStack":false,"supportsFIPS":true},"regionRegex":"^us\\\\-isob\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-iso-b-global":{"description":"AWS ISOB (US) global region"},"us-isob-east-1":{"description":"US ISOB East (Ohio)"}}},{"id":"aws-iso-e","outputs":{"dnsSuffix":"cloud.adc-e.uk","dualStackDnsSuffix":"cloud.adc-e.uk","implicitGlobalRegion":"eu-isoe-west-1","name":"aws-iso-e","supportsDualStack":false,"supportsFIPS":true},"regionRegex":"^eu\\\\-isoe\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-iso-e-global":{"description":"AWS ISOE (Europe) global region"},"eu-isoe-west-1":{"description":"EU ISOE West"}}},{"id":"aws-iso-f","outputs":{"dnsSuffix":"csp.hci.ic.gov","dualStackDnsSuffix":"csp.hci.ic.gov","implicitGlobalRegion":"us-isof-south-1","name":"aws-iso-f","supportsDualStack":false,"supportsFIPS":true},"regionRegex":"^us\\\\-isof\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-iso-f-global":{"description":"AWS ISOF global region"},"us-isof-east-1":{"description":"US ISOF EAST"},"us-isof-south-1":{"description":"US ISOF SOUTH"}}},{"id":"aws-eusc","outputs":{"dnsSuffix":"amazonaws.eu","dualStackDnsSuffix":"amazonaws.eu","implicitGlobalRegion":"eusc-de-east-1","name":"aws-eusc","supportsDualStack":false,"supportsFIPS":true},"regionRegex":"^eusc\\\\-(de)\\\\-\\\\w+\\\\-\\\\d+$","regions":{"eusc-de-east-1":{"description":"EU (Germany)"}}}],"version":"1.1"}');
;// ./node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js

let selectedPartitionsInfo = partitions_namespaceObject;
let selectedUserAgentPrefix = "";
const partition = (value) => {
    const { partitions } = selectedPartitionsInfo;
    for (const partition of partitions) {
        const { regions, outputs } = partition;
        for (const [region, regionData] of Object.entries(regions)) {
            if (region === value) {
                return {
                    ...outputs,
                    ...regionData,
                };
            }
        }
    }
    for (const partition of partitions) {
        const { regionRegex, outputs } = partition;
        if (new RegExp(regionRegex).test(value)) {
            return {
                ...outputs,
            };
        }
    }
    const DEFAULT_PARTITION = partitions.find((partition) => partition.id === "aws");
    if (!DEFAULT_PARTITION) {
        throw new Error("Provided region was not found in the partition array or regex," +
            " and default partition with id 'aws' doesn't exist.");
    }
    return {
        ...DEFAULT_PARTITION.outputs,
    };
};
const setPartitionInfo = (partitionsInfo, userAgentPrefix = "") => {
    selectedPartitionsInfo = partitionsInfo;
    selectedUserAgentPrefix = userAgentPrefix;
};
const useDefaultPartitionInfo = () => {
    setPartitionInfo(partitionsInfo, "");
};
const getUserAgentPrefix = () => selectedUserAgentPrefix;

;// ./node_modules/@aws-sdk/util-endpoints/dist-es/aws.js




const awsEndpointFunctions = {
    isVirtualHostableS3Bucket: isVirtualHostableS3Bucket,
    parseArn: parseArn,
    partition: partition,
};
dist_es/* customEndpointFunctions */.mw.aws = awsEndpointFunctions;

;// ./node_modules/@aws-sdk/util-endpoints/dist-es/resolveDefaultAwsRegionalEndpointsConfig.js

const resolveDefaultAwsRegionalEndpointsConfig = (input) => {
    if (typeof input.endpointProvider !== "function") {
        throw new Error("@aws-sdk/util-endpoint - endpointProvider and endpoint missing in config for this client.");
    }
    const { endpoint } = input;
    if (endpoint === undefined) {
        input.endpoint = async () => {
            return toEndpointV1(input.endpointProvider({
                Region: typeof input.region === "function" ? await input.region() : input.region,
                UseDualStack: typeof input.useDualstackEndpoint === "function"
                    ? await input.useDualstackEndpoint()
                    : input.useDualstackEndpoint,
                UseFIPS: typeof input.useFipsEndpoint === "function" ? await input.useFipsEndpoint() : input.useFipsEndpoint,
                Endpoint: undefined,
            }, { logger: input.logger }));
        };
    }
    return input;
};
const toEndpointV1 = (endpoint) => parseUrl(endpoint.url);

;// ./node_modules/@aws-sdk/util-endpoints/dist-es/resolveEndpoint.js


;// ./node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointError.js


;// ./node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointRuleObject.js


;// ./node_modules/@aws-sdk/util-endpoints/dist-es/types/ErrorRuleObject.js


;// ./node_modules/@aws-sdk/util-endpoints/dist-es/types/RuleSetObject.js


;// ./node_modules/@aws-sdk/util-endpoints/dist-es/types/TreeRuleObject.js


;// ./node_modules/@aws-sdk/util-endpoints/dist-es/types/shared.js


;// ./node_modules/@aws-sdk/util-endpoints/dist-es/types/index.js







;// ./node_modules/@aws-sdk/util-endpoints/dist-es/index.js








/***/ }),

/***/ 649:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   vK: () => (/* binding */ getContentLengthPlugin)
/* harmony export */ });
/* unused harmony exports contentLengthMiddleware, contentLengthMiddlewareOptions */
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5479);

const CONTENT_LENGTH_HEADER = "content-length";
function contentLengthMiddleware(bodyLengthChecker) {
    return (next) => async (args) => {
        const request = args.request;
        if (_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__/* .HttpRequest */ .Kd.isInstance(request)) {
            const { body, headers } = request;
            if (body &&
                Object.keys(headers)
                    .map((str) => str.toLowerCase())
                    .indexOf(CONTENT_LENGTH_HEADER) === -1) {
                try {
                    const length = bodyLengthChecker(body);
                    request.headers = {
                        ...request.headers,
                        [CONTENT_LENGTH_HEADER]: String(length),
                    };
                }
                catch (error) {
                }
            }
        }
        return next({
            ...args,
            request,
        });
    };
}
const contentLengthMiddlewareOptions = {
    step: "build",
    tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
    name: "contentLengthMiddleware",
    override: true,
};
const getContentLengthPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
    },
});


/***/ }),

/***/ 695:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ rng)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6982);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto__WEBPACK_IMPORTED_MODULE_0___default().randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),

/***/ 818:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const parse = __webpack_require__(7153)
const prerelease = (version, options) => {
  const parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}
module.exports = prerelease


/***/ }),

/***/ 855:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ms = __webpack_require__(6585);

module.exports = function (time, iat) {
  var timestamp = iat || Math.floor(Date.now() / 1000);

  if (typeof time === 'string') {
    var milliseconds = ms(time);
    if (typeof milliseconds === 'undefined') {
      return;
    }
    return Math.floor(timestamp + milliseconds / 1000);
  } else if (typeof time === 'number') {
    return timestamp + time;
  } else {
    return;
  }

};

/***/ }),

/***/ 857:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 871:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const parse = __webpack_require__(7153)
const clean = (version, options) => {
  const s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}
module.exports = clean


/***/ }),

/***/ 881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  NIL: () => (/* reexport */ nil),
  parse: () => (/* reexport */ esm_node_parse),
  stringify: () => (/* reexport */ stringify/* default */.A),
  v1: () => (/* reexport */ esm_node_v1),
  v3: () => (/* reexport */ esm_node_v3),
  v4: () => (/* reexport */ v4/* default */.A),
  v5: () => (/* reexport */ esm_node_v5),
  validate: () => (/* reexport */ validate/* default */.A),
  version: () => (/* reexport */ esm_node_version)
});

// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-node/rng.js
var rng = __webpack_require__(695);
// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-node/stringify.js
var stringify = __webpack_require__(7647);
;// ./node_modules/uuid/dist/esm-node/v1.js

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng/* default */.A)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0,stringify/* unsafeStringify */.k)(b);
}

/* harmony default export */ const esm_node_v1 = (v1);
// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-node/validate.js + 1 modules
var validate = __webpack_require__(8619);
;// ./node_modules/uuid/dist/esm-node/parse.js


function parse(uuid) {
  if (!(0,validate/* default */.A)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

/* harmony default export */ const esm_node_parse = (parse);
;// ./node_modules/uuid/dist/esm-node/v35.js



function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;

    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = esm_node_parse(namespace);
    }

    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0,stringify/* unsafeStringify */.k)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6982);
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_);
;// ./node_modules/uuid/dist/esm-node/md5.js


function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return external_crypto_default().createHash('md5').update(bytes).digest();
}

/* harmony default export */ const esm_node_md5 = (md5);
;// ./node_modules/uuid/dist/esm-node/v3.js


const v3 = v35('v3', 0x30, esm_node_md5);
/* harmony default export */ const esm_node_v3 = (v3);
// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-node/v4.js + 1 modules
var v4 = __webpack_require__(5461);
;// ./node_modules/uuid/dist/esm-node/sha1.js


function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return external_crypto_default().createHash('sha1').update(bytes).digest();
}

/* harmony default export */ const esm_node_sha1 = (sha1);
;// ./node_modules/uuid/dist/esm-node/v5.js


const v5 = v35('v5', 0x50, esm_node_sha1);
/* harmony default export */ const esm_node_v5 = (v5);
;// ./node_modules/uuid/dist/esm-node/nil.js
/* harmony default export */ const nil = ('00000000-0000-0000-0000-000000000000');
;// ./node_modules/uuid/dist/esm-node/version.js


function version(uuid) {
  if (!(0,validate/* default */.A)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

/* harmony default export */ const esm_node_version = (version);
;// ./node_modules/uuid/dist/esm-node/index.js










/***/ }),

/***/ 904:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  yG: () => (/* reexport */ ENV_KEY),
  pi: () => (/* reexport */ ENV_SECRET),
  fromEnv: () => (/* reexport */ fromEnv)
});

// UNUSED EXPORTS: ENV_ACCOUNT_ID, ENV_CREDENTIAL_SCOPE, ENV_EXPIRATION, ENV_SESSION

// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js
var setCredentialFeature = __webpack_require__(244);
// EXTERNAL MODULE: ./node_modules/@smithy/property-provider/dist-es/index.js + 6 modules
var dist_es = __webpack_require__(8112);
;// ./node_modules/@aws-sdk/credential-provider-env/dist-es/fromEnv.js


const ENV_KEY = "AWS_ACCESS_KEY_ID";
const ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
const ENV_SESSION = "AWS_SESSION_TOKEN";
const ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
const ENV_CREDENTIAL_SCOPE = "AWS_CREDENTIAL_SCOPE";
const ENV_ACCOUNT_ID = "AWS_ACCOUNT_ID";
const fromEnv = (init) => async () => {
    init?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");
    const accessKeyId = process.env[ENV_KEY];
    const secretAccessKey = process.env[ENV_SECRET];
    const sessionToken = process.env[ENV_SESSION];
    const expiry = process.env[ENV_EXPIRATION];
    const credentialScope = process.env[ENV_CREDENTIAL_SCOPE];
    const accountId = process.env[ENV_ACCOUNT_ID];
    if (accessKeyId && secretAccessKey) {
        const credentials = {
            accessKeyId,
            secretAccessKey,
            ...(sessionToken && { sessionToken }),
            ...(expiry && { expiration: new Date(expiry) }),
            ...(credentialScope && { credentialScope }),
            ...(accountId && { accountId }),
        };
        (0,setCredentialFeature/* setCredentialFeature */.g)(credentials, "CREDENTIALS_ENV_VARS", "g");
        return credentials;
    }
    throw new dist_es/* CredentialsProviderError */.C1("Unable to find environment variable credentials.", { logger: init?.logger });
};

;// ./node_modules/@aws-sdk/credential-provider-env/dist-es/index.js



/***/ }),

/***/ 931:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ GetItemCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class GetItemCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "GetItem", {})
    .n("DynamoDBClient", "GetItemCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_GetItemCommand */ .iZ)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_GetItemCommand */ .tT)
    .build() {
}


/***/ }),

/***/ 1017:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)
const Range = __webpack_require__(5006)

const maxSatisfying = (versions, range, options) => {
  let max = null
  let maxSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}
module.exports = maxSatisfying


/***/ }),

/***/ 1045:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*jshint node:true */

var Buffer = (__webpack_require__(181).Buffer); // browserify
var SlowBuffer = (__webpack_require__(181).SlowBuffer);

module.exports = bufferEq;

function bufferEq(a, b) {

  // shortcutting on type is necessary for correctness
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    return false;
  }

  // buffer sizes should be well-known information, so despite this
  // shortcutting, it doesn't leak any information about the *contents* of the
  // buffers.
  if (a.length !== b.length) {
    return false;
  }

  var c = 0;
  for (var i = 0; i < a.length; i++) {
    /*jshint bitwise:false */
    c |= a[i] ^ b[i]; // XOR
  }
  return c === 0;
}

bufferEq.install = function() {
  Buffer.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
    return bufferEq(this, that);
  };
};

var origBufEqual = Buffer.prototype.equal;
var origSlowBufEqual = SlowBuffer.prototype.equal;
bufferEq.restore = function() {
  Buffer.prototype.equal = origBufEqual;
  SlowBuffer.prototype.equal = origSlowBufEqual;
};


/***/ }),

/***/ 1095:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OV: () => (/* binding */ resolveHostHeaderConfig),
/* harmony export */   TC: () => (/* binding */ getHostHeaderPlugin)
/* harmony export */ });
/* unused harmony exports hostHeaderMiddleware, hostHeaderMiddlewareOptions */
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5479);

function resolveHostHeaderConfig(input) {
    return input;
}
const hostHeaderMiddleware = (options) => (next) => async (args) => {
    if (!_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__/* .HttpRequest */ .Kd.isInstance(args.request))
        return next(args);
    const { request } = args;
    const { handlerProtocol = "" } = options.requestHandler.metadata || {};
    if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
        delete request.headers["host"];
        request.headers[":authority"] = request.hostname + (request.port ? ":" + request.port : "");
    }
    else if (!request.headers["host"]) {
        let host = request.hostname;
        if (request.port != null)
            host += `:${request.port}`;
        request.headers["host"] = host;
    }
    return next(args);
};
const hostHeaderMiddlewareOptions = {
    name: "hostHeaderMiddleware",
    step: "build",
    priority: "low",
    tags: ["HOST"],
    override: true,
};
const getHostHeaderPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
    },
});


/***/ }),

/***/ 1208:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  TM: () => (/* reexport */ getSerdePlugin),
  Ou: () => (/* reexport */ serializerMiddlewareOption)
});

// UNUSED EXPORTS: deserializerMiddleware, deserializerMiddlewareOption, serializerMiddleware

// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var dist_es = __webpack_require__(5479);
;// ./node_modules/@smithy/middleware-serde/dist-es/deserializerMiddleware.js

const deserializerMiddleware = (options, deserializer) => (next, context) => async (args) => {
    const { response } = await next(args);
    try {
        const parsed = await deserializer(response, options);
        return {
            response,
            output: parsed,
        };
    }
    catch (error) {
        Object.defineProperty(error, "$response", {
            value: response,
        });
        if (!("$metadata" in error)) {
            const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
            try {
                error.message += "\n  " + hint;
            }
            catch (e) {
                if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") {
                    console.warn(hint);
                }
                else {
                    context.logger?.warn?.(hint);
                }
            }
            if (typeof error.$responseBodyText !== "undefined") {
                if (error.$response) {
                    error.$response.body = error.$responseBodyText;
                }
            }
            try {
                if (dist_es/* HttpResponse */.cS.isInstance(response)) {
                    const { headers = {} } = response;
                    const headerEntries = Object.entries(headers);
                    error.$metadata = {
                        httpStatusCode: response.statusCode,
                        requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
                        extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
                        cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries),
                    };
                }
            }
            catch (e) {
            }
        }
        throw error;
    }
};
const findHeader = (pattern, headers) => {
    return (headers.find(([k]) => {
        return k.match(pattern);
    }) || [void 0, void 1])[1];
};

;// ./node_modules/@smithy/middleware-serde/dist-es/serializerMiddleware.js
const serializerMiddleware = (options, serializer) => (next, context) => async (args) => {
    const endpointConfig = options;
    const endpoint = context.endpointV2?.url && endpointConfig.urlParser
        ? async () => endpointConfig.urlParser(context.endpointV2.url)
        : endpointConfig.endpoint;
    if (!endpoint) {
        throw new Error("No valid endpoint provider available.");
    }
    const request = await serializer(args.input, { ...options, endpoint });
    return next({
        ...args,
        request,
    });
};

;// ./node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js


const deserializerMiddlewareOption = {
    name: "deserializerMiddleware",
    step: "deserialize",
    tags: ["DESERIALIZER"],
    override: true,
};
const serializerMiddlewareOption = {
    name: "serializerMiddleware",
    step: "serialize",
    tags: ["SERIALIZER"],
    override: true,
};
function getSerdePlugin(config, serializer, deserializer) {
    return {
        applyToStack: (commandStack) => {
            commandStack.add(deserializerMiddleware(config, deserializer), deserializerMiddlewareOption);
            commandStack.add(serializerMiddleware(config, serializer), serializerMiddlewareOption);
        },
    };
}

;// ./node_modules/@smithy/middleware-serde/dist-es/index.js





/***/ }),

/***/ 1429:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Mnemonist LRUCache
 * ===================
 *
 * JavaScript implementation of the LRU Cache data structure. To save up
 * memory and allocations this implementation represents its underlying
 * doubly-linked list as static arrays and pointers. Thus, memory is allocated
 * only once at instantiation and JS objects are never created to serve as
 * pointers. This also means this implementation does not trigger too many
 * garbage collections.
 *
 * Note that to save up memory, a LRU Cache can be implemented using a singly
 * linked list by storing predecessors' pointers as hashmap values.
 * However, this means more hashmap lookups and would probably slow the whole
 * thing down. What's more, pointers are not the things taking most space in
 * memory.
 */
var Iterator = __webpack_require__(2766),
    forEach = __webpack_require__(156),
    typed = __webpack_require__(5384),
    iterables = __webpack_require__(9938);

/**
 * LRUCache.
 *
 * @constructor
 * @param {function} Keys     - Array class for storing keys.
 * @param {function} Values   - Array class for storing values.
 * @param {number}   capacity - Desired capacity.
 */
function LRUCache(Keys, Values, capacity) {
  if (arguments.length < 2) {
    capacity = Keys;
    Keys = null;
    Values = null;
  }

  this.capacity = capacity;

  if (typeof this.capacity !== 'number' || this.capacity <= 0)
    throw new Error('mnemonist/lru-cache: capacity should be positive number.');

  var PointerArray = typed.getPointerArray(capacity);

  this.forward = new PointerArray(capacity);
  this.backward = new PointerArray(capacity);
  this.K = typeof Keys === 'function' ? new Keys(capacity) : new Array(capacity);
  this.V = typeof Values === 'function' ? new Values(capacity) : new Array(capacity);

  // Properties
  this.size = 0;
  this.head = 0;
  this.tail = 0;
  this.items = {};
}

/**
 * Method used to clear the structure.
 *
 * @return {undefined}
 */
LRUCache.prototype.clear = function() {
  this.size = 0;
  this.head = 0;
  this.tail = 0;
  this.items = {};
};

/**
 * Method used to splay a value on top.
 *
 * @param  {number}   pointer - Pointer of the value to splay on top.
 * @return {LRUCache}
 */
LRUCache.prototype.splayOnTop = function(pointer) {
  var oldHead = this.head;

  if (this.head === pointer)
    return this;

  var previous = this.backward[pointer],
      next = this.forward[pointer];

  if (this.tail === pointer) {
    this.tail = previous;
  }
  else {
    this.backward[next] = previous;
  }

  this.forward[previous] = next;

  this.backward[oldHead] = pointer;
  this.head = pointer;
  this.forward[pointer] = oldHead;

  return this;
};

/**
 * Method used to set the value for the given key in the cache.
 *
 * @param  {any} key   - Key.
 * @param  {any} value - Value.
 * @return {undefined}
 */
LRUCache.prototype.set = function(key, value) {

  // The key already exists, we just need to update the value and splay on top
  var pointer = this.items[key];

  if (typeof pointer !== 'undefined') {
    this.splayOnTop(pointer);
    this.V[pointer] = value;

    return;
  }

  // The cache is not yet full
  if (this.size < this.capacity) {
    pointer = this.size++;
  }

  // Cache is full, we need to drop the last value
  else {
    pointer = this.tail;
    this.tail = this.backward[pointer];
    delete this.items[this.K[pointer]];
  }

  // Storing key & value
  this.items[key] = pointer;
  this.K[pointer] = key;
  this.V[pointer] = value;

  // Moving the item at the front of the list
  this.forward[pointer] = this.head;
  this.backward[this.head] = pointer;
  this.head = pointer;
};

/**
 * Method used to set the value for the given key in the cache
 *
 * @param  {any} key   - Key.
 * @param  {any} value - Value.
 * @return {{evicted: boolean, key: any, value: any}} An object containing the
 * key and value of an item that was overwritten or evicted in the set
 * operation, as well as a boolean indicating whether it was evicted due to
 * limited capacity. Return value is null if nothing was evicted or overwritten
 * during the set operation.
 */
LRUCache.prototype.setpop = function(key, value) {
  var oldValue = null;
  var oldKey = null;
  // The key already exists, we just need to update the value and splay on top
  var pointer = this.items[key];

  if (typeof pointer !== 'undefined') {
    this.splayOnTop(pointer);
    oldValue = this.V[pointer];
    this.V[pointer] = value;
    return {evicted: false, key: key, value: oldValue};
  }

  // The cache is not yet full
  if (this.size < this.capacity) {
    pointer = this.size++;
  }

  // Cache is full, we need to drop the last value
  else {
    pointer = this.tail;
    this.tail = this.backward[pointer];
    oldValue = this.V[pointer];
    oldKey = this.K[pointer];
    delete this.items[this.K[pointer]];
  }

  // Storing key & value
  this.items[key] = pointer;
  this.K[pointer] = key;
  this.V[pointer] = value;

  // Moving the item at the front of the list
  this.forward[pointer] = this.head;
  this.backward[this.head] = pointer;
  this.head = pointer;

  // Return object if eviction took place, otherwise return null
  if (oldKey) {
    return {evicted: true, key: oldKey, value: oldValue};
  }
  else {
    return null;
  }
};

/**
 * Method used to check whether the key exists in the cache.
 *
 * @param  {any} key   - Key.
 * @return {boolean}
 */
LRUCache.prototype.has = function(key) {
  return key in this.items;
};

/**
 * Method used to get the value attached to the given key. Will move the
 * related key to the front of the underlying linked list.
 *
 * @param  {any} key   - Key.
 * @return {any}
 */
LRUCache.prototype.get = function(key) {
  var pointer = this.items[key];

  if (typeof pointer === 'undefined')
    return;

  this.splayOnTop(pointer);

  return this.V[pointer];
};

/**
 * Method used to get the value attached to the given key. Does not modify
 * the ordering of the underlying linked list.
 *
 * @param  {any} key   - Key.
 * @return {any}
 */
LRUCache.prototype.peek = function(key) {
    var pointer = this.items[key];

    if (typeof pointer === 'undefined')
        return;

    return this.V[pointer];
};

/**
 * Method used to iterate over the cache's entries using a callback.
 *
 * @param  {function}  callback - Function to call for each item.
 * @param  {object}    scope    - Optional scope.
 * @return {undefined}
 */
LRUCache.prototype.forEach = function(callback, scope) {
  scope = arguments.length > 1 ? scope : this;

  var i = 0,
      l = this.size;

  var pointer = this.head,
      keys = this.K,
      values = this.V,
      forward = this.forward;

  while (i < l) {

    callback.call(scope, values[pointer], keys[pointer], this);
    pointer = forward[pointer];

    i++;
  }
};

/**
 * Method used to create an iterator over the cache's keys from most
 * recently used to least recently used.
 *
 * @return {Iterator}
 */
LRUCache.prototype.keys = function() {
  var i = 0,
      l = this.size;

  var pointer = this.head,
      keys = this.K,
      forward = this.forward;

  return new Iterator(function() {
    if (i >= l)
      return {done: true};

    var key = keys[pointer];

    i++;

    if (i < l)
      pointer = forward[pointer];

    return {
      done: false,
      value: key
    };
  });
};

/**
 * Method used to create an iterator over the cache's values from most
 * recently used to least recently used.
 *
 * @return {Iterator}
 */
LRUCache.prototype.values = function() {
  var i = 0,
      l = this.size;

  var pointer = this.head,
      values = this.V,
      forward = this.forward;

  return new Iterator(function() {
    if (i >= l)
      return {done: true};

    var value = values[pointer];

    i++;

    if (i < l)
      pointer = forward[pointer];

    return {
      done: false,
      value: value
    };
  });
};

/**
 * Method used to create an iterator over the cache's entries from most
 * recently used to least recently used.
 *
 * @return {Iterator}
 */
LRUCache.prototype.entries = function() {
  var i = 0,
      l = this.size;

  var pointer = this.head,
      keys = this.K,
      values = this.V,
      forward = this.forward;

  return new Iterator(function() {
    if (i >= l)
      return {done: true};

    var key = keys[pointer],
        value = values[pointer];

    i++;

    if (i < l)
      pointer = forward[pointer];

    return {
      done: false,
      value: [key, value]
    };
  });
};

/**
 * Attaching the #.entries method to Symbol.iterator if possible.
 */
if (typeof Symbol !== 'undefined')
  LRUCache.prototype[Symbol.iterator] = LRUCache.prototype.entries;

/**
 * Convenience known methods.
 */
LRUCache.prototype.inspect = function() {
  var proxy = new Map();

  var iterator = this.entries(),
      step;

  while ((step = iterator.next(), !step.done))
    proxy.set(step.value[0], step.value[1]);

  // Trick so that node displays the name of the constructor
  Object.defineProperty(proxy, 'constructor', {
    value: LRUCache,
    enumerable: false
  });

  return proxy;
};

if (typeof Symbol !== 'undefined')
  LRUCache.prototype[Symbol.for('nodejs.util.inspect.custom')] = LRUCache.prototype.inspect;

/**
 * Static @.from function taking an arbitrary iterable & converting it into
 * a structure.
 *
 * @param  {Iterable} iterable - Target iterable.
 * @param  {function} Keys     - Array class for storing keys.
 * @param  {function} Values   - Array class for storing values.
 * @param  {number}   capacity - Cache's capacity.
 * @return {LRUCache}
 */
LRUCache.from = function(iterable, Keys, Values, capacity) {
  if (arguments.length < 2) {
    capacity = iterables.guessLength(iterable);

    if (typeof capacity !== 'number')
      throw new Error('mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.');
  }
  else if (arguments.length === 2) {
    capacity = Keys;
    Keys = null;
    Values = null;
  }

  var cache = new LRUCache(Keys, Values, capacity);

  forEach(iterable, function(value, key) {
    cache.set(key, value);
  });

  return cache;
};

/**
 * Exporting.
 */
module.exports = LRUCache;


/***/ }),

/***/ 1487:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  zH: () => (/* reexport */ NODE_REGION_CONFIG_FILE_OPTIONS),
  GG: () => (/* reexport */ NODE_REGION_CONFIG_OPTIONS),
  e$: () => (/* reexport */ NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS),
  Ko: () => (/* reexport */ NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS),
  TD: () => (/* reexport */ resolveRegionConfig)
});

// UNUSED EXPORTS: CONFIG_USE_DUALSTACK_ENDPOINT, CONFIG_USE_FIPS_ENDPOINT, DEFAULT_USE_DUALSTACK_ENDPOINT, DEFAULT_USE_FIPS_ENDPOINT, ENV_USE_DUALSTACK_ENDPOINT, ENV_USE_FIPS_ENDPOINT, REGION_ENV_NAME, REGION_INI_NAME, getRegionInfo, resolveCustomEndpointsConfig, resolveEndpointsConfig

;// ./node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js
const booleanSelector = (obj, key, type) => {
    if (!(key in obj))
        return undefined;
    if (obj[key] === "true")
        return true;
    if (obj[key] === "false")
        return false;
    throw new Error(`Cannot load ${type} "${key}". Expected "true" or "false", got ${obj[key]}.`);
};

;// ./node_modules/@smithy/util-config-provider/dist-es/types.js
var SelectorType;
(function (SelectorType) {
    SelectorType["ENV"] = "env";
    SelectorType["CONFIG"] = "shared config entry";
})(SelectorType || (SelectorType = {}));

;// ./node_modules/@smithy/util-config-provider/dist-es/index.js




;// ./node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js

const ENV_USE_DUALSTACK_ENDPOINT = "AWS_USE_DUALSTACK_ENDPOINT";
const CONFIG_USE_DUALSTACK_ENDPOINT = "use_dualstack_endpoint";
const DEFAULT_USE_DUALSTACK_ENDPOINT = false;
const NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => booleanSelector(env, ENV_USE_DUALSTACK_ENDPOINT, SelectorType.ENV),
    configFileSelector: (profile) => booleanSelector(profile, CONFIG_USE_DUALSTACK_ENDPOINT, SelectorType.CONFIG),
    default: false,
};

;// ./node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js

const ENV_USE_FIPS_ENDPOINT = "AWS_USE_FIPS_ENDPOINT";
const CONFIG_USE_FIPS_ENDPOINT = "use_fips_endpoint";
const DEFAULT_USE_FIPS_ENDPOINT = false;
const NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => booleanSelector(env, ENV_USE_FIPS_ENDPOINT, SelectorType.ENV),
    configFileSelector: (profile) => booleanSelector(profile, CONFIG_USE_FIPS_ENDPOINT, SelectorType.CONFIG),
    default: false,
};

// EXTERNAL MODULE: ./node_modules/@smithy/util-middleware/dist-es/index.js + 2 modules
var dist_es = __webpack_require__(7135);
;// ./node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveCustomEndpointsConfig.js

const resolveCustomEndpointsConfig = (input) => {
    const { tls, endpoint, urlParser, useDualstackEndpoint } = input;
    return Object.assign(input, {
        tls: tls ?? true,
        endpoint: normalizeProvider(typeof endpoint === "string" ? urlParser(endpoint) : endpoint),
        isCustomEndpoint: true,
        useDualstackEndpoint: normalizeProvider(useDualstackEndpoint ?? false),
    });
};

;// ./node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveEndpointsConfig.js


const resolveEndpointsConfig = (input) => {
    const useDualstackEndpoint = normalizeProvider(input.useDualstackEndpoint ?? false);
    const { endpoint, useFipsEndpoint, urlParser, tls } = input;
    return Object.assign(input, {
        tls: tls ?? true,
        endpoint: endpoint
            ? normalizeProvider(typeof endpoint === "string" ? urlParser(endpoint) : endpoint)
            : () => getEndpointFromRegion({ ...input, useDualstackEndpoint, useFipsEndpoint }),
        isCustomEndpoint: !!endpoint,
        useDualstackEndpoint,
    });
};

;// ./node_modules/@smithy/config-resolver/dist-es/endpointsConfig/index.js





;// ./node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js
const REGION_ENV_NAME = "AWS_REGION";
const REGION_INI_NAME = "region";
const NODE_REGION_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[REGION_ENV_NAME],
    configFileSelector: (profile) => profile[REGION_INI_NAME],
    default: () => {
        throw new Error("Region is missing");
    },
};
const NODE_REGION_CONFIG_FILE_OPTIONS = {
    preferredFile: "credentials",
};

;// ./node_modules/@smithy/config-resolver/dist-es/regionConfig/isFipsRegion.js
const isFipsRegion = (region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));

;// ./node_modules/@smithy/config-resolver/dist-es/regionConfig/getRealRegion.js

const getRealRegion = (region) => isFipsRegion(region)
    ? ["fips-aws-global", "aws-fips"].includes(region)
        ? "us-east-1"
        : region.replace(/fips-(dkr-|prod-)?|-fips/, "")
    : region;

;// ./node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js


const resolveRegionConfig = (input) => {
    const { region, useFipsEndpoint } = input;
    if (!region) {
        throw new Error("Region is missing");
    }
    return Object.assign(input, {
        region: async () => {
            if (typeof region === "string") {
                return getRealRegion(region);
            }
            const providedRegion = await region();
            return getRealRegion(providedRegion);
        },
        useFipsEndpoint: async () => {
            const providedRegion = typeof region === "string" ? region : await region();
            if (isFipsRegion(providedRegion)) {
                return true;
            }
            return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
        },
    });
};

;// ./node_modules/@smithy/config-resolver/dist-es/regionConfig/index.js



;// ./node_modules/@smithy/config-resolver/dist-es/index.js





/***/ }),

/***/ 1570:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ QueryCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class QueryCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "Query", {})
    .n("DynamoDBClient", "QueryCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_QueryCommand */ .xZ)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_QueryCommand */ .qT)
    .build() {
}


/***/ }),

/***/ 1691:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ TransactWriteItemsCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class TransactWriteItemsCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S,
    ResourceArnList: {
        type: "operationContextParams",
        get: (input) => input?.TransactItems?.map((obj) => [obj?.ConditionCheck?.TableName, obj?.Put?.TableName, obj?.Delete?.TableName, obj?.Update?.TableName].filter((i) => i)).flat(),
    },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "TransactWriteItems", {})
    .n("DynamoDBClient", "TransactWriteItemsCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_TransactWriteItemsCommand */ .K3)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_TransactWriteItemsCommand */ .nF)
    .build() {
}


/***/ }),

/***/ 1701:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ Hash)
/* harmony export */ });
/* harmony import */ var _smithy_util_buffer_from__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9290);
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3197);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(181);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6982);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_3__);




class Hash {
    constructor(algorithmIdentifier, secret) {
        this.algorithmIdentifier = algorithmIdentifier;
        this.secret = secret;
        this.reset();
    }
    update(toHash, encoding) {
        this.hash.update((0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_1__/* .toUint8Array */ .Fo)(castSourceData(toHash, encoding)));
    }
    digest() {
        return Promise.resolve(this.hash.digest());
    }
    reset() {
        this.hash = this.secret
            ? (0,crypto__WEBPACK_IMPORTED_MODULE_3__.createHmac)(this.algorithmIdentifier, castSourceData(this.secret))
            : (0,crypto__WEBPACK_IMPORTED_MODULE_3__.createHash)(this.algorithmIdentifier);
    }
}
function castSourceData(toCast, encoding) {
    if (buffer__WEBPACK_IMPORTED_MODULE_2__.Buffer.isBuffer(toCast)) {
        return toCast;
    }
    if (typeof toCast === "string") {
        return (0,_smithy_util_buffer_from__WEBPACK_IMPORTED_MODULE_0__/* .fromString */ .s)(toCast, encoding);
    }
    if (ArrayBuffer.isView(toCast)) {
        return (0,_smithy_util_buffer_from__WEBPACK_IMPORTED_MODULE_0__/* .fromArrayBuffer */ .Q)(toCast.buffer, toCast.byteOffset, toCast.byteLength);
    }
    return (0,_smithy_util_buffer_from__WEBPACK_IMPORTED_MODULE_0__/* .fromArrayBuffer */ .Q)(toCast);
}


/***/ }),

/***/ 1741:
/***/ ((module) => {

var JsonWebTokenError = function (message, error) {
  Error.call(this, message);
  if(Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }
  this.name = 'JsonWebTokenError';
  this.message = message;
  if (error) this.inner = error;
};

JsonWebTokenError.prototype = Object.create(Error.prototype);
JsonWebTokenError.prototype.constructor = JsonWebTokenError;

module.exports = JsonWebTokenError;


/***/ }),

/***/ 1908:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ PutItemCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class PutItemCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "PutItem", {})
    .n("DynamoDBClient", "PutItemCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_PutItemCommand */ .P5)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_PutItemCommand */ .Gy)
    .build() {
}


/***/ }),

/***/ 1919:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CG: () => (/* binding */ parseJsonErrorBody),
/* harmony export */   Y2: () => (/* binding */ parseJsonBody),
/* harmony export */   cJ: () => (/* binding */ loadRestJsonErrorCode)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8218);

const parseJsonBody = (streamBody, context) => (0,_common__WEBPACK_IMPORTED_MODULE_0__/* .collectBodyString */ .w)(streamBody, context).then((encoded) => {
    if (encoded.length) {
        try {
            return JSON.parse(encoded);
        }
        catch (e) {
            if (e?.name === "SyntaxError") {
                Object.defineProperty(e, "$responseBodyText", {
                    value: encoded,
                });
            }
            throw e;
        }
    }
    return {};
});
const parseJsonErrorBody = async (errorBody, context) => {
    const value = await parseJsonBody(errorBody, context);
    value.message = value.message ?? value.Message;
    return value;
};
const loadRestJsonErrorCode = (output, data) => {
    const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
    const sanitizeErrorCode = (rawValue) => {
        let cleanValue = rawValue;
        if (typeof cleanValue === "number") {
            cleanValue = cleanValue.toString();
        }
        if (cleanValue.indexOf(",") >= 0) {
            cleanValue = cleanValue.split(",")[0];
        }
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    const headerKey = findKey(output.headers, "x-amzn-errortype");
    if (headerKey !== undefined) {
        return sanitizeErrorCode(output.headers[headerKey]);
    }
    if (data && typeof data === "object") {
        const codeKey = findKey(data, "code");
        if (codeKey && data[codeKey] !== undefined) {
            return sanitizeErrorCode(data[codeKey]);
        }
        if (data["__type"] !== undefined) {
            return sanitizeErrorCode(data["__type"]);
        }
    }
};


/***/ }),

/***/ 1943:
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ 1977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const semver = __webpack_require__(5864);

module.exports = semver.satisfies(process.version, '>=15.7.0');


/***/ }),

/***/ 1995:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Range = __webpack_require__(5006)
const satisfies = (version, range, options) => {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}
module.exports = satisfies


/***/ }),

/***/ 2010:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Buffer = (__webpack_require__(2861).Buffer);

var getParamBytesForAlg = __webpack_require__(3527);

var MAX_OCTET = 0x80,
	CLASS_UNIVERSAL = 0,
	PRIMITIVE_BIT = 0x20,
	TAG_SEQ = 0x10,
	TAG_INT = 0x02,
	ENCODED_TAG_SEQ = (TAG_SEQ | PRIMITIVE_BIT) | (CLASS_UNIVERSAL << 6),
	ENCODED_TAG_INT = TAG_INT | (CLASS_UNIVERSAL << 6);

function base64Url(base64) {
	return base64
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
}

function signatureAsBuffer(signature) {
	if (Buffer.isBuffer(signature)) {
		return signature;
	} else if ('string' === typeof signature) {
		return Buffer.from(signature, 'base64');
	}

	throw new TypeError('ECDSA signature must be a Base64 string or a Buffer');
}

function derToJose(signature, alg) {
	signature = signatureAsBuffer(signature);
	var paramBytes = getParamBytesForAlg(alg);

	// the DER encoded param should at most be the param size, plus a padding
	// zero, since due to being a signed integer
	var maxEncodedParamLength = paramBytes + 1;

	var inputLength = signature.length;

	var offset = 0;
	if (signature[offset++] !== ENCODED_TAG_SEQ) {
		throw new Error('Could not find expected "seq"');
	}

	var seqLength = signature[offset++];
	if (seqLength === (MAX_OCTET | 1)) {
		seqLength = signature[offset++];
	}

	if (inputLength - offset < seqLength) {
		throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
	}

	if (signature[offset++] !== ENCODED_TAG_INT) {
		throw new Error('Could not find expected "int" for "r"');
	}

	var rLength = signature[offset++];

	if (inputLength - offset - 2 < rLength) {
		throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
	}

	if (maxEncodedParamLength < rLength) {
		throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
	}

	var rOffset = offset;
	offset += rLength;

	if (signature[offset++] !== ENCODED_TAG_INT) {
		throw new Error('Could not find expected "int" for "s"');
	}

	var sLength = signature[offset++];

	if (inputLength - offset !== sLength) {
		throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
	}

	if (maxEncodedParamLength < sLength) {
		throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
	}

	var sOffset = offset;
	offset += sLength;

	if (offset !== inputLength) {
		throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
	}

	var rPadding = paramBytes - rLength,
		sPadding = paramBytes - sLength;

	var dst = Buffer.allocUnsafe(rPadding + rLength + sPadding + sLength);

	for (offset = 0; offset < rPadding; ++offset) {
		dst[offset] = 0;
	}
	signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);

	offset = paramBytes;

	for (var o = offset; offset < o + sPadding; ++offset) {
		dst[offset] = 0;
	}
	signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);

	dst = dst.toString('base64');
	dst = base64Url(dst);

	return dst;
}

function countPadding(buf, start, stop) {
	var padding = 0;
	while (start + padding < stop && buf[start + padding] === 0) {
		++padding;
	}

	var needsSign = buf[start + padding] >= MAX_OCTET;
	if (needsSign) {
		--padding;
	}

	return padding;
}

function joseToDer(signature, alg) {
	signature = signatureAsBuffer(signature);
	var paramBytes = getParamBytesForAlg(alg);

	var signatureBytes = signature.length;
	if (signatureBytes !== paramBytes * 2) {
		throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
	}

	var rPadding = countPadding(signature, 0, paramBytes);
	var sPadding = countPadding(signature, paramBytes, signature.length);
	var rLength = paramBytes - rPadding;
	var sLength = paramBytes - sPadding;

	var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;

	var shortLength = rsBytes < MAX_OCTET;

	var dst = Buffer.allocUnsafe((shortLength ? 2 : 3) + rsBytes);

	var offset = 0;
	dst[offset++] = ENCODED_TAG_SEQ;
	if (shortLength) {
		// Bit 8 has value "0"
		// bits 7-1 give the length.
		dst[offset++] = rsBytes;
	} else {
		// Bit 8 of first octet has value "1"
		// bits 7-1 give the number of additional length octets.
		dst[offset++] = MAX_OCTET	| 1;
		// length, base 256
		dst[offset++] = rsBytes & 0xff;
	}
	dst[offset++] = ENCODED_TAG_INT;
	dst[offset++] = rLength;
	if (rPadding < 0) {
		dst[offset++] = 0;
		offset += signature.copy(dst, offset, 0, paramBytes);
	} else {
		offset += signature.copy(dst, offset, rPadding, paramBytes);
	}
	dst[offset++] = ENCODED_TAG_INT;
	dst[offset++] = sLength;
	if (sPadding < 0) {
		dst[offset++] = 0;
		signature.copy(dst, offset, paramBytes);
	} else {
		signature.copy(dst, offset, paramBytes + sPadding);
	}

	return dst;
}

module.exports = {
	derToJose: derToJose,
	joseToDer: joseToDer
};


/***/ }),

/***/ 2203:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 2351:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


const {
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_LENGTH,
} = __webpack_require__(5501)
const debug = __webpack_require__(6839)
exports = module.exports = {}

// The actual regexps go on exports.re
const re = exports.re = []
const safeRe = exports.safeRe = []
const src = exports.src = []
const safeSrc = exports.safeSrc = []
const t = exports.t = {}
let R = 0

const LETTERDASHNUMBER = '[a-zA-Z0-9-]'

// Replace some greedy regex tokens to prevent regex dos issues. These regex are
// used internally via the safeRe object since all inputs in this library get
// normalized first to trim and collapse all extra whitespace. The original
// regexes are exported for userland consumption and lower level usage. A
// future breaking change could export the safer regex only with a note that
// all input should have extra whitespace removed.
const safeRegexReplacements = [
  ['\\s', 1],
  ['\\d', MAX_LENGTH],
  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
]

const makeSafeRegex = (value) => {
  for (const [token, max] of safeRegexReplacements) {
    value = value
      .split(`${token}*`).join(`${token}{0,${max}}`)
      .split(`${token}+`).join(`${token}{1,${max}}`)
  }
  return value
}

const createToken = (name, value, isGlobal) => {
  const safe = makeSafeRegex(value)
  const index = R++
  debug(name, index, value)
  t[name] = index
  src[index] = value
  safeSrc[index] = safe
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined)
  safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined)
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*')
createToken('NUMERICIDENTIFIERLOOSE', '\\d+')

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`)

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`)

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`)

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.
// Non-numberic identifiers include numberic identifiers but can be longer.
// Therefore non-numberic identifiers must go first.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NONNUMERICIDENTIFIER]
}|${src[t.NUMERICIDENTIFIER]})`)

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NONNUMERICIDENTIFIER]
}|${src[t.NUMERICIDENTIFIERLOOSE]})`)

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`)

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`)

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`)

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`)

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`)

createToken('FULL', `^${src[t.FULLPLAIN]}$`)

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`)

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`)

createToken('GTLT', '((?:<|>)?=?)')

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`)
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`)

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`)

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`)

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`)
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`)

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCEPLAIN', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`)
createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`)
createToken('COERCEFULL', src[t.COERCEPLAIN] +
              `(?:${src[t.PRERELEASE]})?` +
              `(?:${src[t.BUILD]})?` +
              `(?:$|[^\\d])`)
createToken('COERCERTL', src[t.COERCE], true)
createToken('COERCERTLFULL', src[t.COERCEFULL], true)

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)')

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true)
exports.tildeTrimReplace = '$1~'

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`)
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`)

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)')

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true)
exports.caretTrimReplace = '$1^'

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`)
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`)

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`)
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`)

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true)
exports.comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`)

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`)

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*')
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$')
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$')


/***/ }),

/***/ 2393:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)
const parse = __webpack_require__(7153)
const { safeRe: re, t } = __webpack_require__(2351)

const coerce = (version, options) => {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  let match = null
  if (!options.rtl) {
    match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    // With includePrerelease option set, '1.2.3.4-rc' wants to coerce '2.3.4-rc', not '2.3.4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL]
    let next
    while ((next = coerceRtlRegex.exec(version)) &&
        (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
            next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    coerceRtlRegex.lastIndex = -1
  }

  if (match === null) {
    return null
  }

  const major = match[2]
  const minor = match[3] || '0'
  const patch = match[4] || '0'
  const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : ''
  const build = options.includePrerelease && match[6] ? `+${match[6]}` : ''

  return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options)
}
module.exports = coerce


/***/ }),

/***/ 2404:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  w: () => (/* binding */ getHttpAuthSchemeEndpointRuleSetPlugin)
});

// UNUSED EXPORTS: httpAuthSchemeEndpointRuleSetMiddlewareOptions

// EXTERNAL MODULE: ./node_modules/@smithy/types/dist-es/index.js + 11 modules
var dist_es = __webpack_require__(7523);
// EXTERNAL MODULE: ./node_modules/@smithy/util-middleware/dist-es/index.js + 2 modules
var util_middleware_dist_es = __webpack_require__(7135);
;// ./node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/resolveAuthOptions.js
const resolveAuthOptions = (candidateAuthOptions, authSchemePreference) => {
    if (!authSchemePreference || authSchemePreference.length === 0) {
        return candidateAuthOptions;
    }
    const preferredAuthOptions = [];
    for (const preferredSchemeName of authSchemePreference) {
        for (const candidateAuthOption of candidateAuthOptions) {
            const candidateAuthSchemeName = candidateAuthOption.schemeId.split("#")[1];
            if (candidateAuthSchemeName === preferredSchemeName) {
                preferredAuthOptions.push(candidateAuthOption);
            }
        }
    }
    for (const candidateAuthOption of candidateAuthOptions) {
        if (!preferredAuthOptions.find(({ schemeId }) => schemeId === candidateAuthOption.schemeId)) {
            preferredAuthOptions.push(candidateAuthOption);
        }
    }
    return preferredAuthOptions;
};

;// ./node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/httpAuthSchemeMiddleware.js



function convertHttpAuthSchemesToMap(httpAuthSchemes) {
    const map = new Map();
    for (const scheme of httpAuthSchemes) {
        map.set(scheme.schemeId, scheme);
    }
    return map;
}
const httpAuthSchemeMiddleware = (config, mwOptions) => (next, context) => async (args) => {
    const options = config.httpAuthSchemeProvider(await mwOptions.httpAuthSchemeParametersProvider(config, context, args.input));
    const authSchemePreference = config.authSchemePreference ? await config.authSchemePreference() : [];
    const resolvedOptions = resolveAuthOptions(options, authSchemePreference);
    const authSchemes = convertHttpAuthSchemesToMap(config.httpAuthSchemes);
    const smithyContext = (0,util_middleware_dist_es/* getSmithyContext */.u)(context);
    const failureReasons = [];
    for (const option of resolvedOptions) {
        const scheme = authSchemes.get(option.schemeId);
        if (!scheme) {
            failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` was not enabled for this service.`);
            continue;
        }
        const identityProvider = scheme.identityProvider(await mwOptions.identityProviderConfigProvider(config));
        if (!identityProvider) {
            failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` did not have an IdentityProvider configured.`);
            continue;
        }
        const { identityProperties = {}, signingProperties = {} } = option.propertiesExtractor?.(config, context) || {};
        option.identityProperties = Object.assign(option.identityProperties || {}, identityProperties);
        option.signingProperties = Object.assign(option.signingProperties || {}, signingProperties);
        smithyContext.selectedHttpAuthScheme = {
            httpAuthOption: option,
            identity: await identityProvider(option.identityProperties),
            signer: scheme.signer,
        };
        break;
    }
    if (!smithyContext.selectedHttpAuthScheme) {
        throw new Error(failureReasons.join("\n"));
    }
    return next(args);
};

;// ./node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js

const httpAuthSchemeEndpointRuleSetMiddlewareOptions = {
    step: "serialize",
    tags: ["HTTP_AUTH_SCHEME"],
    name: "httpAuthSchemeMiddleware",
    override: true,
    relation: "before",
    toMiddleware: "endpointV2Middleware",
};
const getHttpAuthSchemeEndpointRuleSetPlugin = (config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider, }) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(httpAuthSchemeMiddleware(config, {
            httpAuthSchemeParametersProvider,
            identityProviderConfigProvider,
        }), httpAuthSchemeEndpointRuleSetMiddlewareOptions);
    },
});


/***/ }),

/***/ 2531:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ escapeUri)
/* harmony export */ });
const escapeUri = (uri) => encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
const hexEncode = (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`;


/***/ }),

/***/ 2556:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.withLogging = exports.PerformanceMonitor = exports.createLogger = exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    constructor(service, environment = "production" || 0) {
        this.service = service;
        this.environment = environment;
        this.logLevel = this.getLogLevel();
    }
    getLogLevel() {
        const level = process.env.LOG_LEVEL?.toUpperCase() || 'INFO';
        switch (level) {
            case 'DEBUG': return LogLevel.DEBUG;
            case 'INFO': return LogLevel.INFO;
            case 'WARN': return LogLevel.WARN;
            case 'ERROR': return LogLevel.ERROR;
            default: return LogLevel.INFO;
        }
    }
    shouldLog(level) {
        return level >= this.logLevel;
    }
    createLogEntry(level, message, context, error) {
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            service: this.service,
            environment: this.environment
        };
        if (context) {
            entry.context = context;
        }
        if (error) {
            entry.error = {
                name: error.name,
                message: error.message,
                stack: error.stack
            };
        }
        return entry;
    }
    log(level, levelName, message, context, error) {
        if (!this.shouldLog(level))
            return;
        const entry = this.createLogEntry(levelName, message, context, error);
        // In production, use structured JSON logging
        if (this.environment === 'production') {
            console.log(JSON.stringify(entry));
        }
        else {
            // In development, use more readable format
            const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
            const errorStr = error ? ` | Error: ${error.message}` : '';
            console.log(`[${entry.timestamp}] ${levelName}: ${message}${contextStr}${errorStr}`);
        }
    }
    debug(message, context) {
        this.log(LogLevel.DEBUG, 'DEBUG', message, context);
    }
    info(message, context) {
        this.log(LogLevel.INFO, 'INFO', message, context);
    }
    warn(message, context, error) {
        this.log(LogLevel.WARN, 'WARN', message, context, error);
    }
    error(message, context, error) {
        this.log(LogLevel.ERROR, 'ERROR', message, context, error);
    }
    // Convenience methods for common operations
    logRequest(method, path, context) {
        this.info(`Incoming ${method} request`, {
            ...context,
            method,
            path,
            operation: 'request_start'
        });
    }
    logResponse(method, path, statusCode, duration, context) {
        const message = `${method} ${path} - ${statusCode}`;
        const logContext = {
            ...context,
            method,
            path,
            statusCode,
            duration,
            operation: 'request_complete'
        };
        if (statusCode >= 400) {
            this.error(message, logContext);
        }
        else if (statusCode >= 300) {
            this.warn(message, logContext);
        }
        else {
            this.info(message, logContext);
        }
    }
    logDatabaseOperation(operation, table, success, duration, context) {
        const message = `Database ${operation} on ${table} - ${success ? 'SUCCESS' : 'FAILED'}`;
        const logContext = {
            ...context,
            operation: `db_${operation}`,
            table,
            duration,
            success
        };
        if (success) {
            this.info(message, logContext);
        }
        else {
            this.error(message, logContext);
        }
    }
    logAuthentication(success, userId, reason, context) {
        const message = success ? 'Authentication successful' : `Authentication failed: ${reason}`;
        const logContext = {
            ...context,
            userId,
            operation: 'authentication',
            success,
            reason
        };
        if (success) {
            this.info(message, logContext);
        }
        else {
            this.warn(message, logContext);
        }
    }
    logValidationError(errors, context) {
        this.warn('Validation failed', {
            ...context,
            operation: 'validation',
            errors
        });
    }
    logBusinessLogic(operation, success, details, context) {
        const message = `Business operation: ${operation} - ${success ? 'SUCCESS' : 'FAILED'}`;
        const logContext = {
            ...context,
            operation: `business_${operation}`,
            success,
            details
        };
        if (success) {
            this.info(message, logContext);
        }
        else {
            this.error(message, logContext);
        }
    }
}
exports.Logger = Logger;
// Create service-specific loggers
const createLogger = (service) => {
    return new Logger(service);
};
exports.createLogger = createLogger;
// Performance monitoring utility
class PerformanceMonitor {
    constructor(logger, operation, context = {}) {
        this.logger = logger;
        this.operation = operation;
        this.context = context;
        this.startTime = Date.now();
        this.logger.debug(`Starting operation: ${operation}`, {
            ...context,
            operation: `${operation}_start`
        });
    }
    end(success = true, additionalContext) {
        const duration = Date.now() - this.startTime;
        const message = `Operation ${this.operation} completed in ${duration}ms - ${success ? 'SUCCESS' : 'FAILED'}`;
        const logContext = {
            ...this.context,
            ...additionalContext,
            operation: `${this.operation}_complete`,
            duration,
            success
        };
        if (success) {
            this.logger.info(message, logContext);
        }
        else {
            this.logger.error(message, logContext);
        }
        return duration;
    }
    endWithError(error, additionalContext) {
        const duration = Date.now() - this.startTime;
        this.logger.error(`Operation ${this.operation} failed after ${duration}ms`, {
            ...this.context,
            ...additionalContext,
            operation: `${this.operation}_error`,
            duration
        }, error);
        return duration;
    }
}
exports.PerformanceMonitor = PerformanceMonitor;
// Middleware for Lambda request/response logging
const withLogging = (handler, logger) => {
    return async (event, context) => {
        const requestId = context.awsRequestId;
        const startTime = Date.now();
        // Extract request information
        const method = event.requestContext?.http?.method || 'UNKNOWN';
        const path = event.rawPath || event.requestContext?.http?.path || 'UNKNOWN';
        const userAgent = event.headers?.['user-agent'] || 'UNKNOWN';
        const ip = event.requestContext?.http?.sourceIp || 'UNKNOWN';
        const logContext = {
            requestId,
            method,
            path,
            userAgent,
            ip
        };
        logger.logRequest(method, path, logContext);
        try {
            const result = await handler(event, context);
            const duration = Date.now() - startTime;
            logger.logResponse(method, path, result.statusCode || 200, duration, {
                ...logContext,
                responseSize: result.body ? result.body.length : 0
            });
            return result;
        }
        catch (error) {
            const duration = Date.now() - startTime;
            logger.error('Unhandled error in Lambda handler', {
                ...logContext,
                duration
            }, error);
            // Re-throw the error to maintain original behavior
            throw error;
        }
    };
};
exports.withLogging = withLogging;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQVksUUFLWDtBQUxELFdBQVksUUFBUTtJQUNsQix5Q0FBUyxDQUFBO0lBQ1QsdUNBQVEsQ0FBQTtJQUNSLHVDQUFRLENBQUE7SUFDUix5Q0FBUyxDQUFBO0FBQ1gsQ0FBQyxFQUxXLFFBQVEsd0JBQVIsUUFBUSxRQUtuQjtBQWdDRCxNQUFhLE1BQU07SUFLakIsWUFBWSxPQUFlLEVBQUUsY0FBc0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYTtRQUN0RixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU8sV0FBVztRQUNqQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxNQUFNLENBQUM7UUFDN0QsUUFBUSxLQUFLLEVBQUUsQ0FBQztZQUNkLEtBQUssT0FBTyxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3BDLEtBQUssTUFBTSxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2xDLEtBQUssTUFBTSxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2xDLEtBQUssT0FBTyxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQztJQUVPLFNBQVMsQ0FBQyxLQUFlO1FBQy9CLE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDaEMsQ0FBQztJQUVPLGNBQWMsQ0FBQyxLQUFhLEVBQUUsT0FBZSxFQUFFLE9BQW9CLEVBQUUsS0FBYTtRQUN4RixNQUFNLEtBQUssR0FBYTtZQUN0QixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7WUFDbkMsS0FBSztZQUNMLE9BQU87WUFDUCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzlCLENBQUM7UUFFRixJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1osS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDMUIsQ0FBQztRQUVELElBQUksS0FBSyxFQUFFLENBQUM7WUFDVixLQUFLLENBQUMsS0FBSyxHQUFHO2dCQUNaLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtnQkFDaEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7YUFDbkIsQ0FBQztRQUNKLENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTyxHQUFHLENBQUMsS0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBZSxFQUFFLE9BQW9CLEVBQUUsS0FBYTtRQUNsRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPO1FBRW5DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFdEUsNkNBQTZDO1FBQzdDLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxZQUFZLEVBQUUsQ0FBQztZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDO2FBQU0sQ0FBQztZQUNOLDJDQUEyQztZQUMzQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDM0UsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLFNBQVMsS0FBSyxPQUFPLEdBQUcsVUFBVSxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdkYsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsT0FBZSxFQUFFLE9BQW9CO1FBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxJQUFJLENBQUMsT0FBZSxFQUFFLE9BQW9CO1FBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUFJLENBQUMsT0FBZSxFQUFFLE9BQW9CLEVBQUUsS0FBYTtRQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFlLEVBQUUsT0FBb0IsRUFBRSxLQUFhO1FBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsNENBQTRDO0lBQzVDLFVBQVUsQ0FBQyxNQUFjLEVBQUUsSUFBWSxFQUFFLE9BQW9CO1FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxNQUFNLFVBQVUsRUFBRTtZQUN0QyxHQUFHLE9BQU87WUFDVixNQUFNO1lBQ04sSUFBSTtZQUNKLFNBQVMsRUFBRSxlQUFlO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBYyxFQUFFLElBQVksRUFBRSxVQUFrQixFQUFFLFFBQWdCLEVBQUUsT0FBb0I7UUFDbEcsTUFBTSxPQUFPLEdBQUcsR0FBRyxNQUFNLElBQUksSUFBSSxNQUFNLFVBQVUsRUFBRSxDQUFDO1FBQ3BELE1BQU0sVUFBVSxHQUFHO1lBQ2pCLEdBQUcsT0FBTztZQUNWLE1BQU07WUFDTixJQUFJO1lBQ0osVUFBVTtZQUNWLFFBQVE7WUFDUixTQUFTLEVBQUUsa0JBQWtCO1NBQzlCLENBQUM7UUFFRixJQUFJLFVBQVUsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsQyxDQUFDO2FBQU0sSUFBSSxVQUFVLElBQUksR0FBRyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakMsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqQyxDQUFDO0lBQ0gsQ0FBQztJQUVELG9CQUFvQixDQUFDLFNBQWlCLEVBQUUsS0FBYSxFQUFFLE9BQWdCLEVBQUUsUUFBZ0IsRUFBRSxPQUFvQjtRQUM3RyxNQUFNLE9BQU8sR0FBRyxZQUFZLFNBQVMsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hGLE1BQU0sVUFBVSxHQUFHO1lBQ2pCLEdBQUcsT0FBTztZQUNWLFNBQVMsRUFBRSxNQUFNLFNBQVMsRUFBRTtZQUM1QixLQUFLO1lBQ0wsUUFBUTtZQUNSLE9BQU87U0FDUixDQUFDO1FBRUYsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbEMsQ0FBQztJQUNILENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxPQUFnQixFQUFFLE1BQWUsRUFBRSxNQUFlLEVBQUUsT0FBb0I7UUFDeEYsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsMEJBQTBCLE1BQU0sRUFBRSxDQUFDO1FBQzNGLE1BQU0sVUFBVSxHQUFHO1lBQ2pCLEdBQUcsT0FBTztZQUNWLE1BQU07WUFDTixTQUFTLEVBQUUsZ0JBQWdCO1lBQzNCLE9BQU87WUFDUCxNQUFNO1NBQ1AsQ0FBQztRQUVGLElBQUksT0FBTyxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqQyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsTUFBZ0IsRUFBRSxPQUFvQjtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzdCLEdBQUcsT0FBTztZQUNWLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLE1BQU07U0FDUCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsU0FBaUIsRUFBRSxPQUFnQixFQUFFLE9BQWEsRUFBRSxPQUFvQjtRQUN2RixNQUFNLE9BQU8sR0FBRyx1QkFBdUIsU0FBUyxNQUFNLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2RixNQUFNLFVBQVUsR0FBRztZQUNqQixHQUFHLE9BQU87WUFDVixTQUFTLEVBQUUsWUFBWSxTQUFTLEVBQUU7WUFDbEMsT0FBTztZQUNQLE9BQU87U0FDUixDQUFDO1FBRUYsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbEMsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXpLRCx3QkF5S0M7QUFFRCxrQ0FBa0M7QUFDM0IsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFlLEVBQVUsRUFBRTtJQUN0RCxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQztBQUZXLFFBQUEsWUFBWSxnQkFFdkI7QUFFRixpQ0FBaUM7QUFDakMsTUFBYSxrQkFBa0I7SUFNN0IsWUFBWSxNQUFjLEVBQUUsU0FBaUIsRUFBRSxVQUFzQixFQUFFO1FBQ3JFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixTQUFTLEVBQUUsRUFBRTtZQUNwRCxHQUFHLE9BQU87WUFDVixTQUFTLEVBQUUsR0FBRyxTQUFTLFFBQVE7U0FDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEdBQUcsQ0FBQyxVQUFtQixJQUFJLEVBQUUsaUJBQThCO1FBQ3pELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzdDLE1BQU0sT0FBTyxHQUFHLGFBQWEsSUFBSSxDQUFDLFNBQVMsaUJBQWlCLFFBQVEsUUFBUSxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0csTUFBTSxVQUFVLEdBQUc7WUFDakIsR0FBRyxJQUFJLENBQUMsT0FBTztZQUNmLEdBQUcsaUJBQWlCO1lBQ3BCLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLFdBQVc7WUFDdkMsUUFBUTtZQUNSLE9BQU87U0FDUixDQUFDO1FBRUYsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4QyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFZLEVBQUUsaUJBQThCO1FBQ3ZELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxDQUFDLFNBQVMsaUJBQWlCLFFBQVEsSUFBSSxFQUFFO1lBQzFFLEdBQUcsSUFBSSxDQUFDLE9BQU87WUFDZixHQUFHLGlCQUFpQjtZQUNwQixTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxRQUFRO1lBQ3BDLFFBQVE7U0FDVCxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRVYsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBakRELGdEQWlEQztBQUVELGlEQUFpRDtBQUMxQyxNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQWlCLEVBQUUsTUFBYyxFQUFFLEVBQUU7SUFDL0QsT0FBTyxLQUFLLEVBQUUsS0FBVSxFQUFFLE9BQVksRUFBRSxFQUFFO1FBQ3hDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDdkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTdCLDhCQUE4QjtRQUM5QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDO1FBQy9ELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFJLFNBQVMsQ0FBQztRQUM1RSxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksU0FBUyxDQUFDO1FBQzdELE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLFFBQVEsSUFBSSxTQUFTLENBQUM7UUFFN0QsTUFBTSxVQUFVLEdBQWU7WUFDN0IsU0FBUztZQUNULE1BQU07WUFDTixJQUFJO1lBQ0osU0FBUztZQUNULEVBQUU7U0FDSCxDQUFDO1FBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQztZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1lBRXhDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRSxRQUFRLEVBQUU7Z0JBQ25FLEdBQUcsVUFBVTtnQkFDYixZQUFZLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkQsQ0FBQyxDQUFDO1lBRUgsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUU7Z0JBQ2hELEdBQUcsVUFBVTtnQkFDYixRQUFRO2FBQ1QsRUFBRSxLQUFjLENBQUMsQ0FBQztZQUVuQixtREFBbUQ7WUFDbkQsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBMUNXLFFBQUEsV0FBVyxlQTBDdEIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBMb2dMZXZlbCB7XG4gIERFQlVHID0gMCxcbiAgSU5GTyA9IDEsXG4gIFdBUk4gPSAyLFxuICBFUlJPUiA9IDNcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2dDb250ZXh0IHtcbiAgcmVxdWVzdElkPzogc3RyaW5nO1xuICB1c2VySWQ/OiBzdHJpbmc7XG4gIHBhdGllbnRJZD86IHN0cmluZztcbiAgZG9jdG9ySWQ/OiBzdHJpbmc7XG4gIGFwcG9pbnRtZW50SWQ/OiBzdHJpbmc7XG4gIG9wZXJhdGlvbj86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgbWV0aG9kPzogc3RyaW5nO1xuICB1c2VyQWdlbnQ/OiBzdHJpbmc7XG4gIGlwPzogc3RyaW5nO1xuICBkdXJhdGlvbj86IG51bWJlcjtcbiAgc3RhdHVzQ29kZT86IG51bWJlcjtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvZ0VudHJ5IHtcbiAgdGltZXN0YW1wOiBzdHJpbmc7XG4gIGxldmVsOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgY29udGV4dD86IExvZ0NvbnRleHQ7XG4gIGVycm9yPzoge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgc3RhY2s/OiBzdHJpbmc7XG4gIH07XG4gIHNlcnZpY2U6IHN0cmluZztcbiAgZW52aXJvbm1lbnQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIExvZ2dlciB7XG4gIHByaXZhdGUgc2VydmljZTogc3RyaW5nO1xuICBwcml2YXRlIGVudmlyb25tZW50OiBzdHJpbmc7XG4gIHByaXZhdGUgbG9nTGV2ZWw6IExvZ0xldmVsO1xuXG4gIGNvbnN0cnVjdG9yKHNlcnZpY2U6IHN0cmluZywgZW52aXJvbm1lbnQ6IHN0cmluZyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCcpIHtcbiAgICB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlO1xuICAgIHRoaXMuZW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudDtcbiAgICB0aGlzLmxvZ0xldmVsID0gdGhpcy5nZXRMb2dMZXZlbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRMb2dMZXZlbCgpOiBMb2dMZXZlbCB7XG4gICAgY29uc3QgbGV2ZWwgPSBwcm9jZXNzLmVudi5MT0dfTEVWRUw/LnRvVXBwZXJDYXNlKCkgfHwgJ0lORk8nO1xuICAgIHN3aXRjaCAobGV2ZWwpIHtcbiAgICAgIGNhc2UgJ0RFQlVHJzogcmV0dXJuIExvZ0xldmVsLkRFQlVHO1xuICAgICAgY2FzZSAnSU5GTyc6IHJldHVybiBMb2dMZXZlbC5JTkZPO1xuICAgICAgY2FzZSAnV0FSTic6IHJldHVybiBMb2dMZXZlbC5XQVJOO1xuICAgICAgY2FzZSAnRVJST1InOiByZXR1cm4gTG9nTGV2ZWwuRVJST1I7XG4gICAgICBkZWZhdWx0OiByZXR1cm4gTG9nTGV2ZWwuSU5GTztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNob3VsZExvZyhsZXZlbDogTG9nTGV2ZWwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbGV2ZWwgPj0gdGhpcy5sb2dMZXZlbDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTG9nRW50cnkobGV2ZWw6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb250ZXh0PzogTG9nQ29udGV4dCwgZXJyb3I/OiBFcnJvcik6IExvZ0VudHJ5IHtcbiAgICBjb25zdCBlbnRyeTogTG9nRW50cnkgPSB7XG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIGxldmVsLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHNlcnZpY2U6IHRoaXMuc2VydmljZSxcbiAgICAgIGVudmlyb25tZW50OiB0aGlzLmVudmlyb25tZW50XG4gICAgfTtcblxuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICBlbnRyeS5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGVudHJ5LmVycm9yID0ge1xuICAgICAgICBuYW1lOiBlcnJvci5uYW1lLFxuICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICBzdGFjazogZXJyb3Iuc3RhY2tcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBsb2cobGV2ZWw6IExvZ0xldmVsLCBsZXZlbE5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb250ZXh0PzogTG9nQ29udGV4dCwgZXJyb3I/OiBFcnJvcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5zaG91bGRMb2cobGV2ZWwpKSByZXR1cm47XG5cbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuY3JlYXRlTG9nRW50cnkobGV2ZWxOYW1lLCBtZXNzYWdlLCBjb250ZXh0LCBlcnJvcik7XG4gICAgXG4gICAgLy8gSW4gcHJvZHVjdGlvbiwgdXNlIHN0cnVjdHVyZWQgSlNPTiBsb2dnaW5nXG4gICAgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZW50cnkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSW4gZGV2ZWxvcG1lbnQsIHVzZSBtb3JlIHJlYWRhYmxlIGZvcm1hdFxuICAgICAgY29uc3QgY29udGV4dFN0ciA9IGNvbnRleHQgPyBgIHwgQ29udGV4dDogJHtKU09OLnN0cmluZ2lmeShjb250ZXh0KX1gIDogJyc7XG4gICAgICBjb25zdCBlcnJvclN0ciA9IGVycm9yID8gYCB8IEVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCA6ICcnO1xuICAgICAgY29uc29sZS5sb2coYFske2VudHJ5LnRpbWVzdGFtcH1dICR7bGV2ZWxOYW1lfTogJHttZXNzYWdlfSR7Y29udGV4dFN0cn0ke2Vycm9yU3RyfWApO1xuICAgIH1cbiAgfVxuXG4gIGRlYnVnKG1lc3NhZ2U6IHN0cmluZywgY29udGV4dD86IExvZ0NvbnRleHQpOiB2b2lkIHtcbiAgICB0aGlzLmxvZyhMb2dMZXZlbC5ERUJVRywgJ0RFQlVHJywgbWVzc2FnZSwgY29udGV4dCk7XG4gIH1cblxuICBpbmZvKG1lc3NhZ2U6IHN0cmluZywgY29udGV4dD86IExvZ0NvbnRleHQpOiB2b2lkIHtcbiAgICB0aGlzLmxvZyhMb2dMZXZlbC5JTkZPLCAnSU5GTycsIG1lc3NhZ2UsIGNvbnRleHQpO1xuICB9XG5cbiAgd2FybihtZXNzYWdlOiBzdHJpbmcsIGNvbnRleHQ/OiBMb2dDb250ZXh0LCBlcnJvcj86IEVycm9yKTogdm9pZCB7XG4gICAgdGhpcy5sb2coTG9nTGV2ZWwuV0FSTiwgJ1dBUk4nLCBtZXNzYWdlLCBjb250ZXh0LCBlcnJvcik7XG4gIH1cblxuICBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIGNvbnRleHQ/OiBMb2dDb250ZXh0LCBlcnJvcj86IEVycm9yKTogdm9pZCB7XG4gICAgdGhpcy5sb2coTG9nTGV2ZWwuRVJST1IsICdFUlJPUicsIG1lc3NhZ2UsIGNvbnRleHQsIGVycm9yKTtcbiAgfVxuXG4gIC8vIENvbnZlbmllbmNlIG1ldGhvZHMgZm9yIGNvbW1vbiBvcGVyYXRpb25zXG4gIGxvZ1JlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgY29udGV4dD86IExvZ0NvbnRleHQpOiB2b2lkIHtcbiAgICB0aGlzLmluZm8oYEluY29taW5nICR7bWV0aG9kfSByZXF1ZXN0YCwge1xuICAgICAgLi4uY29udGV4dCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIHBhdGgsXG4gICAgICBvcGVyYXRpb246ICdyZXF1ZXN0X3N0YXJ0J1xuICAgIH0pO1xuICB9XG5cbiAgbG9nUmVzcG9uc2UobWV0aG9kOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgc3RhdHVzQ29kZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyLCBjb250ZXh0PzogTG9nQ29udGV4dCk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHttZXRob2R9ICR7cGF0aH0gLSAke3N0YXR1c0NvZGV9YDtcbiAgICBjb25zdCBsb2dDb250ZXh0ID0ge1xuICAgICAgLi4uY29udGV4dCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIHBhdGgsXG4gICAgICBzdGF0dXNDb2RlLFxuICAgICAgZHVyYXRpb24sXG4gICAgICBvcGVyYXRpb246ICdyZXF1ZXN0X2NvbXBsZXRlJ1xuICAgIH07XG5cbiAgICBpZiAoc3RhdHVzQ29kZSA+PSA0MDApIHtcbiAgICAgIHRoaXMuZXJyb3IobWVzc2FnZSwgbG9nQ29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChzdGF0dXNDb2RlID49IDMwMCkge1xuICAgICAgdGhpcy53YXJuKG1lc3NhZ2UsIGxvZ0NvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluZm8obWVzc2FnZSwgbG9nQ29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgbG9nRGF0YWJhc2VPcGVyYXRpb24ob3BlcmF0aW9uOiBzdHJpbmcsIHRhYmxlOiBzdHJpbmcsIHN1Y2Nlc3M6IGJvb2xlYW4sIGR1cmF0aW9uOiBudW1iZXIsIGNvbnRleHQ/OiBMb2dDb250ZXh0KTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBEYXRhYmFzZSAke29wZXJhdGlvbn0gb24gJHt0YWJsZX0gLSAke3N1Y2Nlc3MgPyAnU1VDQ0VTUycgOiAnRkFJTEVEJ31gO1xuICAgIGNvbnN0IGxvZ0NvbnRleHQgPSB7XG4gICAgICAuLi5jb250ZXh0LFxuICAgICAgb3BlcmF0aW9uOiBgZGJfJHtvcGVyYXRpb259YCxcbiAgICAgIHRhYmxlLFxuICAgICAgZHVyYXRpb24sXG4gICAgICBzdWNjZXNzXG4gICAgfTtcbiAgICBcbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgdGhpcy5pbmZvKG1lc3NhZ2UsIGxvZ0NvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVycm9yKG1lc3NhZ2UsIGxvZ0NvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ0F1dGhlbnRpY2F0aW9uKHN1Y2Nlc3M6IGJvb2xlYW4sIHVzZXJJZD86IHN0cmluZywgcmVhc29uPzogc3RyaW5nLCBjb250ZXh0PzogTG9nQ29udGV4dCk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBzdWNjZXNzID8gJ0F1dGhlbnRpY2F0aW9uIHN1Y2Nlc3NmdWwnIDogYEF1dGhlbnRpY2F0aW9uIGZhaWxlZDogJHtyZWFzb259YDtcbiAgICBjb25zdCBsb2dDb250ZXh0ID0ge1xuICAgICAgLi4uY29udGV4dCxcbiAgICAgIHVzZXJJZCxcbiAgICAgIG9wZXJhdGlvbjogJ2F1dGhlbnRpY2F0aW9uJyxcbiAgICAgIHN1Y2Nlc3MsXG4gICAgICByZWFzb25cbiAgICB9O1xuICAgIFxuICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICB0aGlzLmluZm8obWVzc2FnZSwgbG9nQ29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud2FybihtZXNzYWdlLCBsb2dDb250ZXh0KTtcbiAgICB9XG4gIH1cblxuICBsb2dWYWxpZGF0aW9uRXJyb3IoZXJyb3JzOiBzdHJpbmdbXSwgY29udGV4dD86IExvZ0NvbnRleHQpOiB2b2lkIHtcbiAgICB0aGlzLndhcm4oJ1ZhbGlkYXRpb24gZmFpbGVkJywge1xuICAgICAgLi4uY29udGV4dCxcbiAgICAgIG9wZXJhdGlvbjogJ3ZhbGlkYXRpb24nLFxuICAgICAgZXJyb3JzXG4gICAgfSk7XG4gIH1cblxuICBsb2dCdXNpbmVzc0xvZ2ljKG9wZXJhdGlvbjogc3RyaW5nLCBzdWNjZXNzOiBib29sZWFuLCBkZXRhaWxzPzogYW55LCBjb250ZXh0PzogTG9nQ29udGV4dCk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgQnVzaW5lc3Mgb3BlcmF0aW9uOiAke29wZXJhdGlvbn0gLSAke3N1Y2Nlc3MgPyAnU1VDQ0VTUycgOiAnRkFJTEVEJ31gO1xuICAgIGNvbnN0IGxvZ0NvbnRleHQgPSB7XG4gICAgICAuLi5jb250ZXh0LFxuICAgICAgb3BlcmF0aW9uOiBgYnVzaW5lc3NfJHtvcGVyYXRpb259YCxcbiAgICAgIHN1Y2Nlc3MsXG4gICAgICBkZXRhaWxzXG4gICAgfTtcbiAgICBcbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgdGhpcy5pbmZvKG1lc3NhZ2UsIGxvZ0NvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVycm9yKG1lc3NhZ2UsIGxvZ0NvbnRleHQpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBDcmVhdGUgc2VydmljZS1zcGVjaWZpYyBsb2dnZXJzXG5leHBvcnQgY29uc3QgY3JlYXRlTG9nZ2VyID0gKHNlcnZpY2U6IHN0cmluZyk6IExvZ2dlciA9PiB7XG4gIHJldHVybiBuZXcgTG9nZ2VyKHNlcnZpY2UpO1xufTtcblxuLy8gUGVyZm9ybWFuY2UgbW9uaXRvcmluZyB1dGlsaXR5XG5leHBvcnQgY2xhc3MgUGVyZm9ybWFuY2VNb25pdG9yIHtcbiAgcHJpdmF0ZSBzdGFydFRpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlcjtcbiAgcHJpdmF0ZSBvcGVyYXRpb246IHN0cmluZztcbiAgcHJpdmF0ZSBjb250ZXh0OiBMb2dDb250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKGxvZ2dlcjogTG9nZ2VyLCBvcGVyYXRpb246IHN0cmluZywgY29udGV4dDogTG9nQ29udGV4dCA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgdGhpcy5vcGVyYXRpb24gPSBvcGVyYXRpb247XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgXG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFN0YXJ0aW5nIG9wZXJhdGlvbjogJHtvcGVyYXRpb259YCwge1xuICAgICAgLi4uY29udGV4dCxcbiAgICAgIG9wZXJhdGlvbjogYCR7b3BlcmF0aW9ufV9zdGFydGBcbiAgICB9KTtcbiAgfVxuXG4gIGVuZChzdWNjZXNzOiBib29sZWFuID0gdHJ1ZSwgYWRkaXRpb25hbENvbnRleHQ/OiBMb2dDb250ZXh0KTogbnVtYmVyIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZTtcbiAgICBjb25zdCBtZXNzYWdlID0gYE9wZXJhdGlvbiAke3RoaXMub3BlcmF0aW9ufSBjb21wbGV0ZWQgaW4gJHtkdXJhdGlvbn1tcyAtICR7c3VjY2VzcyA/ICdTVUNDRVNTJyA6ICdGQUlMRUQnfWA7XG4gICAgY29uc3QgbG9nQ29udGV4dCA9IHtcbiAgICAgIC4uLnRoaXMuY29udGV4dCxcbiAgICAgIC4uLmFkZGl0aW9uYWxDb250ZXh0LFxuICAgICAgb3BlcmF0aW9uOiBgJHt0aGlzLm9wZXJhdGlvbn1fY29tcGxldGVgLFxuICAgICAgZHVyYXRpb24sXG4gICAgICBzdWNjZXNzXG4gICAgfTtcbiAgICBcbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhtZXNzYWdlLCBsb2dDb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IobWVzc2FnZSwgbG9nQ29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGR1cmF0aW9uO1xuICB9XG5cbiAgZW5kV2l0aEVycm9yKGVycm9yOiBFcnJvciwgYWRkaXRpb25hbENvbnRleHQ/OiBMb2dDb250ZXh0KTogbnVtYmVyIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZTtcbiAgICB0aGlzLmxvZ2dlci5lcnJvcihgT3BlcmF0aW9uICR7dGhpcy5vcGVyYXRpb259IGZhaWxlZCBhZnRlciAke2R1cmF0aW9ufW1zYCwge1xuICAgICAgLi4udGhpcy5jb250ZXh0LFxuICAgICAgLi4uYWRkaXRpb25hbENvbnRleHQsXG4gICAgICBvcGVyYXRpb246IGAke3RoaXMub3BlcmF0aW9ufV9lcnJvcmAsXG4gICAgICBkdXJhdGlvblxuICAgIH0sIGVycm9yKTtcblxuICAgIHJldHVybiBkdXJhdGlvbjtcbiAgfVxufVxuXG4vLyBNaWRkbGV3YXJlIGZvciBMYW1iZGEgcmVxdWVzdC9yZXNwb25zZSBsb2dnaW5nXG5leHBvcnQgY29uc3Qgd2l0aExvZ2dpbmcgPSAoaGFuZGxlcjogRnVuY3Rpb24sIGxvZ2dlcjogTG9nZ2VyKSA9PiB7XG4gIHJldHVybiBhc3luYyAoZXZlbnQ6IGFueSwgY29udGV4dDogYW55KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdElkID0gY29udGV4dC5hd3NSZXF1ZXN0SWQ7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBcbiAgICAvLyBFeHRyYWN0IHJlcXVlc3QgaW5mb3JtYXRpb25cbiAgICBjb25zdCBtZXRob2QgPSBldmVudC5yZXF1ZXN0Q29udGV4dD8uaHR0cD8ubWV0aG9kIHx8ICdVTktOT1dOJztcbiAgICBjb25zdCBwYXRoID0gZXZlbnQucmF3UGF0aCB8fCBldmVudC5yZXF1ZXN0Q29udGV4dD8uaHR0cD8ucGF0aCB8fCAnVU5LTk9XTic7XG4gICAgY29uc3QgdXNlckFnZW50ID0gZXZlbnQuaGVhZGVycz8uWyd1c2VyLWFnZW50J10gfHwgJ1VOS05PV04nO1xuICAgIGNvbnN0IGlwID0gZXZlbnQucmVxdWVzdENvbnRleHQ/Lmh0dHA/LnNvdXJjZUlwIHx8ICdVTktOT1dOJztcblxuICAgIGNvbnN0IGxvZ0NvbnRleHQ6IExvZ0NvbnRleHQgPSB7XG4gICAgICByZXF1ZXN0SWQsXG4gICAgICBtZXRob2QsXG4gICAgICBwYXRoLFxuICAgICAgdXNlckFnZW50LFxuICAgICAgaXBcbiAgICB9O1xuXG4gICAgbG9nZ2VyLmxvZ1JlcXVlc3QobWV0aG9kLCBwYXRoLCBsb2dDb250ZXh0KTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBoYW5kbGVyKGV2ZW50LCBjb250ZXh0KTtcbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAgIFxuICAgICAgbG9nZ2VyLmxvZ1Jlc3BvbnNlKG1ldGhvZCwgcGF0aCwgcmVzdWx0LnN0YXR1c0NvZGUgfHwgMjAwLCBkdXJhdGlvbiwge1xuICAgICAgICAuLi5sb2dDb250ZXh0LFxuICAgICAgICByZXNwb25zZVNpemU6IHJlc3VsdC5ib2R5ID8gcmVzdWx0LmJvZHkubGVuZ3RoIDogMFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAgIGxvZ2dlci5lcnJvcignVW5oYW5kbGVkIGVycm9yIGluIExhbWJkYSBoYW5kbGVyJywge1xuICAgICAgICAuLi5sb2dDb250ZXh0LFxuICAgICAgICBkdXJhdGlvblxuICAgICAgfSwgZXJyb3IgYXMgRXJyb3IpO1xuXG4gICAgICAvLyBSZS10aHJvdyB0aGUgZXJyb3IgdG8gbWFpbnRhaW4gb3JpZ2luYWwgYmVoYXZpb3JcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcbn07XG4iXX0=

/***/ }),

/***/ 2641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  D: () => (/* binding */ parseUrl)
});

;// ./node_modules/@smithy/querystring-parser/dist-es/index.js
function parseQueryString(querystring) {
    const query = {};
    querystring = querystring.replace(/^\?/, "");
    if (querystring) {
        for (const pair of querystring.split("&")) {
            let [key, value = null] = pair.split("=");
            key = decodeURIComponent(key);
            if (value) {
                value = decodeURIComponent(value);
            }
            if (!(key in query)) {
                query[key] = value;
            }
            else if (Array.isArray(query[key])) {
                query[key].push(value);
            }
            else {
                query[key] = [query[key], value];
            }
        }
    }
    return query;
}

;// ./node_modules/@smithy/url-parser/dist-es/index.js

const parseUrl = (url) => {
    if (typeof url === "string") {
        return parseUrl(new URL(url));
    }
    const { hostname, pathname, port, protocol, search } = url;
    let query;
    if (search) {
        query = parseQueryString(search);
    }
    return {
        hostname,
        port: port ? parseInt(port) : undefined,
        protocol,
        path: pathname,
        query,
    };
};


/***/ }),

/***/ 2659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const ANY = Symbol('SemVer ANY')
// hoisted class for cyclic dependency
class Comparator {
  static get ANY () {
    return ANY
  }

  constructor (comp, options) {
    options = parseOptions(options)

    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp
      } else {
        comp = comp.value
      }
    }

    comp = comp.trim().split(/\s+/).join(' ')
    debug('comparator', comp, options)
    this.options = options
    this.loose = !!options.loose
    this.parse(comp)

    if (this.semver === ANY) {
      this.value = ''
    } else {
      this.value = this.operator + this.semver.version
    }

    debug('comp', this)
  }

  parse (comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
    const m = comp.match(r)

    if (!m) {
      throw new TypeError(`Invalid comparator: ${comp}`)
    }

    this.operator = m[1] !== undefined ? m[1] : ''
    if (this.operator === '=') {
      this.operator = ''
    }

    // if it literally is just '>' or '' then allow anything.
    if (!m[2]) {
      this.semver = ANY
    } else {
      this.semver = new SemVer(m[2], this.options.loose)
    }
  }

  toString () {
    return this.value
  }

  test (version) {
    debug('Comparator.test', version, this.options.loose)

    if (this.semver === ANY || version === ANY) {
      return true
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    return cmp(version, this.operator, this.semver, this.options)
  }

  intersects (comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError('a Comparator is required')
    }

    if (this.operator === '') {
      if (this.value === '') {
        return true
      }
      return new Range(comp.value, options).test(this.value)
    } else if (comp.operator === '') {
      if (comp.value === '') {
        return true
      }
      return new Range(this.value, options).test(comp.semver)
    }

    options = parseOptions(options)

    // Special cases where nothing can possibly be lower
    if (options.includePrerelease &&
      (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
      return false
    }
    if (!options.includePrerelease &&
      (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
      return false
    }

    // Same direction increasing (> or >=)
    if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
      return true
    }
    // Same direction decreasing (< or <=)
    if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
      return true
    }
    // same SemVer and both sides are inclusive (<= or >=)
    if (
      (this.semver.version === comp.semver.version) &&
      this.operator.includes('=') && comp.operator.includes('=')) {
      return true
    }
    // opposite directions less than
    if (cmp(this.semver, '<', comp.semver, options) &&
      this.operator.startsWith('>') && comp.operator.startsWith('<')) {
      return true
    }
    // opposite directions greater than
    if (cmp(this.semver, '>', comp.semver, options) &&
      this.operator.startsWith('<') && comp.operator.startsWith('>')) {
      return true
    }
    return false
  }
}

module.exports = Comparator

const parseOptions = __webpack_require__(9284)
const { safeRe: re, t } = __webpack_require__(2351)
const cmp = __webpack_require__(630)
const debug = __webpack_require__(6839)
const SemVer = __webpack_require__(6315)
const Range = __webpack_require__(5006)


/***/ }),

/***/ 2692:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ UpdateItemCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class UpdateItemCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "UpdateItem", {})
    .n("DynamoDBClient", "UpdateItemCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_UpdateItemCommand */ .XN)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_UpdateItemCommand */ .o8)
    .build() {
}


/***/ }),

/***/ 2766:
/***/ ((module) => {

/**
 * Obliterator Iterator Class
 * ===========================
 *
 * Simple class representing the library's iterators.
 */

/**
 * Iterator class.
 *
 * @constructor
 * @param {function} next - Next function.
 */
function Iterator(next) {

  // Hiding the given function
  Object.defineProperty(this, '_next', {
    writable: false,
    enumerable: false,
    value: next
  });

  // Is the iterator complete?
  this.done = false;
}

/**
 * Next function.
 *
 * @return {object}
 */
// NOTE: maybe this should dropped for performance?
Iterator.prototype.next = function() {
  if (this.done)
    return {done: true};

  var step = this._next();

  if (step.done)
    this.done = true;

  return step;
};

/**
 * If symbols are supported, we add `next` to `Symbol.iterator`.
 */
if (typeof Symbol !== 'undefined')
  Iterator.prototype[Symbol.iterator] = function() {
    return this;
  };

/**
 * Returning an iterator of the given values.
 *
 * @param  {any...} values - Values.
 * @return {Iterator}
 */
Iterator.of = function() {
  var args = arguments,
      l = args.length,
      i = 0;

  return new Iterator(function() {
    if (i >= l)
      return {done: true};

    return {done: false, value: args[i++]};
  });
};

/**
 * Returning an empty iterator.
 *
 * @return {Iterator}
 */
Iterator.empty = function() {
  var iterator = new Iterator(null);
  iterator.done = true;

  return iterator;
};

/**
 * Returning whether the given value is an iterator.
 *
 * @param  {any} value - Value.
 * @return {boolean}
 */
Iterator.is = function(value) {
  if (value instanceof Iterator)
    return true;

  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.next === 'function'
  );
};

/**
 * Exporting.
 */
module.exports = Iterator;


/***/ }),

/***/ 2792:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  QD: () => (/* reexport */ CONFIG_PREFIX_SEPARATOR),
  Ch: () => (/* reexport */ ENV_PROFILE),
  Bz: () => (/* reexport */ getProfileName),
  C9: () => (/* reexport */ getSSOTokenFilepath),
  vf: () => (/* reexport */ getSSOTokenFromFile),
  p6: () => (/* reexport */ loadSharedConfigFiles),
  qw: () => (/* reexport */ loadSsoSessionData),
  YU: () => (/* reexport */ parseKnownFiles)
});

// UNUSED EXPORTS: DEFAULT_PROFILE, getHomeDir

// EXTERNAL MODULE: external "os"
var external_os_ = __webpack_require__(857);
;// external "path"
const external_path_namespaceObject = require("path");
;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/getHomeDir.js


const homeDirCache = {};
const getHomeDirCacheKey = () => {
    if (process && process.geteuid) {
        return `${process.geteuid()}`;
    }
    return "DEFAULT";
};
const getHomeDir = () => {
    const { HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${external_path_namespaceObject.sep}` } = process.env;
    if (HOME)
        return HOME;
    if (USERPROFILE)
        return USERPROFILE;
    if (HOMEPATH)
        return `${HOMEDRIVE}${HOMEPATH}`;
    const homeDirCacheKey = getHomeDirCacheKey();
    if (!homeDirCache[homeDirCacheKey])
        homeDirCache[homeDirCacheKey] = (0,external_os_.homedir)();
    return homeDirCache[homeDirCacheKey];
};

;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/getProfileName.js
const ENV_PROFILE = "AWS_PROFILE";
const DEFAULT_PROFILE = "default";
const getProfileName = (init) => init.profile || process.env[ENV_PROFILE] || DEFAULT_PROFILE;

// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6982);
;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/getSSOTokenFilepath.js



const getSSOTokenFilepath = (id) => {
    const hasher = (0,external_crypto_.createHash)("sha1");
    const cacheName = hasher.update(id).digest("hex");
    return (0,external_path_namespaceObject.join)(getHomeDir(), ".aws", "sso", "cache", `${cacheName}.json`);
};

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(9896);
;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/getSSOTokenFromFile.js


const { readFile } = external_fs_.promises;
const getSSOTokenFromFile = async (id) => {
    const ssoTokenFilepath = getSSOTokenFilepath(id);
    const ssoTokenText = await readFile(ssoTokenFilepath, "utf8");
    return JSON.parse(ssoTokenText);
};

// EXTERNAL MODULE: ./node_modules/@smithy/types/dist-es/index.js + 11 modules
var dist_es = __webpack_require__(7523);
;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/getConfigData.js


const getConfigData = (data) => Object.entries(data)
    .filter(([key]) => {
    const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
    if (indexOfSeparator === -1) {
        return false;
    }
    return Object.values(dist_es/* IniSectionType */.Ip).includes(key.substring(0, indexOfSeparator));
})
    .reduce((acc, [key, value]) => {
    const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
    const updatedKey = key.substring(0, indexOfSeparator) === dist_es/* IniSectionType */.Ip.PROFILE ? key.substring(indexOfSeparator + 1) : key;
    acc[updatedKey] = value;
    return acc;
}, {
    ...(data.default && { default: data.default }),
});

;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/getConfigFilepath.js


const ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
const getConfigFilepath = () => process.env[ENV_CONFIG_PATH] || (0,external_path_namespaceObject.join)(getHomeDir(), ".aws", "config");

;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/getCredentialsFilepath.js


const ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
const getCredentialsFilepath = () => process.env[ENV_CREDENTIALS_PATH] || (0,external_path_namespaceObject.join)(getHomeDir(), ".aws", "credentials");

;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/parseIni.js


const prefixKeyRegex = /^([\w-]+)\s(["'])?([\w-@\+\.%:/]+)\2$/;
const profileNameBlockList = ["__proto__", "profile __proto__"];
const parseIni = (iniData) => {
    const map = {};
    let currentSection;
    let currentSubSection;
    for (const iniLine of iniData.split(/\r?\n/)) {
        const trimmedLine = iniLine.split(/(^|\s)[;#]/)[0].trim();
        const isSection = trimmedLine[0] === "[" && trimmedLine[trimmedLine.length - 1] === "]";
        if (isSection) {
            currentSection = undefined;
            currentSubSection = undefined;
            const sectionName = trimmedLine.substring(1, trimmedLine.length - 1);
            const matches = prefixKeyRegex.exec(sectionName);
            if (matches) {
                const [, prefix, , name] = matches;
                if (Object.values(dist_es/* IniSectionType */.Ip).includes(prefix)) {
                    currentSection = [prefix, name].join(CONFIG_PREFIX_SEPARATOR);
                }
            }
            else {
                currentSection = sectionName;
            }
            if (profileNameBlockList.includes(sectionName)) {
                throw new Error(`Found invalid profile name "${sectionName}"`);
            }
        }
        else if (currentSection) {
            const indexOfEqualsSign = trimmedLine.indexOf("=");
            if (![0, -1].includes(indexOfEqualsSign)) {
                const [name, value] = [
                    trimmedLine.substring(0, indexOfEqualsSign).trim(),
                    trimmedLine.substring(indexOfEqualsSign + 1).trim(),
                ];
                if (value === "") {
                    currentSubSection = name;
                }
                else {
                    if (currentSubSection && iniLine.trimStart() === iniLine) {
                        currentSubSection = undefined;
                    }
                    map[currentSection] = map[currentSection] || {};
                    const key = currentSubSection ? [currentSubSection, name].join(CONFIG_PREFIX_SEPARATOR) : name;
                    map[currentSection][key] = value;
                }
            }
        }
    }
    return map;
};

;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/slurpFile.js

const { readFile: slurpFile_readFile } = external_fs_.promises;
const filePromisesHash = {};
const slurpFile = (path, options) => {
    if (!filePromisesHash[path] || options?.ignoreCache) {
        filePromisesHash[path] = slurpFile_readFile(path, "utf8");
    }
    return filePromisesHash[path];
};

;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/loadSharedConfigFiles.js







const swallowError = () => ({});
const CONFIG_PREFIX_SEPARATOR = ".";
const loadSharedConfigFiles = async (init = {}) => {
    const { filepath = getCredentialsFilepath(), configFilepath = getConfigFilepath() } = init;
    const homeDir = getHomeDir();
    const relativeHomeDirPrefix = "~/";
    let resolvedFilepath = filepath;
    if (filepath.startsWith(relativeHomeDirPrefix)) {
        resolvedFilepath = (0,external_path_namespaceObject.join)(homeDir, filepath.slice(2));
    }
    let resolvedConfigFilepath = configFilepath;
    if (configFilepath.startsWith(relativeHomeDirPrefix)) {
        resolvedConfigFilepath = (0,external_path_namespaceObject.join)(homeDir, configFilepath.slice(2));
    }
    const parsedFiles = await Promise.all([
        slurpFile(resolvedConfigFilepath, {
            ignoreCache: init.ignoreCache,
        })
            .then(parseIni)
            .then(getConfigData)
            .catch(swallowError),
        slurpFile(resolvedFilepath, {
            ignoreCache: init.ignoreCache,
        })
            .then(parseIni)
            .catch(swallowError),
    ]);
    return {
        configFile: parsedFiles[0],
        credentialsFile: parsedFiles[1],
    };
};

;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/getSsoSessionData.js


const getSsoSessionData = (data) => Object.entries(data)
    .filter(([key]) => key.startsWith(dist_es/* IniSectionType */.Ip.SSO_SESSION + CONFIG_PREFIX_SEPARATOR))
    .reduce((acc, [key, value]) => ({ ...acc, [key.substring(key.indexOf(CONFIG_PREFIX_SEPARATOR) + 1)]: value }), {});

;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/loadSsoSessionData.js




const loadSsoSessionData_swallowError = () => ({});
const loadSsoSessionData = async (init = {}) => slurpFile(init.configFilepath ?? getConfigFilepath())
    .then(parseIni)
    .then(getSsoSessionData)
    .catch(loadSsoSessionData_swallowError);

;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/mergeConfigFiles.js
const mergeConfigFiles = (...files) => {
    const merged = {};
    for (const file of files) {
        for (const [key, values] of Object.entries(file)) {
            if (merged[key] !== undefined) {
                Object.assign(merged[key], values);
            }
            else {
                merged[key] = values;
            }
        }
    }
    return merged;
};

;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/parseKnownFiles.js


const parseKnownFiles = async (init) => {
    const parsedFiles = await loadSharedConfigFiles(init);
    return mergeConfigFiles(parsedFiles.configFile, parsedFiles.credentialsFile);
};

;// ./node_modules/@smithy/shared-ini-file-loader/dist-es/index.js










/***/ }),

/***/ 2809:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ createPaginator)
/* harmony export */ });
const makePagedClientRequest = async (CommandCtor, client, input, withCommand = (_) => _, ...args) => {
    let command = new CommandCtor(input);
    command = withCommand(command) ?? command;
    return await client.send(command, ...args);
};
function createPaginator(ClientCtor, CommandCtor, inputTokenName, outputTokenName, pageSizeTokenName) {
    return async function* paginateOperation(config, input, ...additionalArguments) {
        const _input = input;
        let token = config.startingToken ?? _input[inputTokenName];
        let hasNext = true;
        let page;
        while (hasNext) {
            _input[inputTokenName] = token;
            if (pageSizeTokenName) {
                _input[pageSizeTokenName] = _input[pageSizeTokenName] ?? config.pageSize;
            }
            if (config.client instanceof ClientCtor) {
                page = await makePagedClientRequest(CommandCtor, config.client, input, config.withCommand, ...additionalArguments);
            }
            else {
                throw new Error(`Invalid client, expected instance of ${ClientCtor.name}`);
            }
            yield page;
            const prevToken = token;
            token = get(page, outputTokenName);
            hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
        }
        return undefined;
    };
}
const get = (fromObject, path) => {
    let cursor = fromObject;
    const pathComponents = path.split(".");
    for (const step of pathComponents) {
        if (!cursor || typeof cursor !== "object") {
            return undefined;
        }
        cursor = cursor[step];
    }
    return cursor;
};


/***/ }),

/***/ 2851:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global module*/
var Buffer = (__webpack_require__(181).Buffer);

module.exports = function toString(obj) {
  if (typeof obj === 'string')
    return obj;
  if (typeof obj === 'number' || Buffer.isBuffer(obj))
    return obj.toString();
  return JSON.stringify(obj);
};


/***/ }),

/***/ 2861:
/***/ ((module, exports, __webpack_require__) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(181)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ 3197:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ar: () => (/* reexport */ fromUtf8),
  Fo: () => (/* reexport */ toUint8Array),
  Pq: () => (/* reexport */ toUtf8)
});

// EXTERNAL MODULE: ./node_modules/@smithy/util-buffer-from/dist-es/index.js
var dist_es = __webpack_require__(9290);
;// ./node_modules/@smithy/util-utf8/dist-es/fromUtf8.js

const fromUtf8 = (input) => {
    const buf = (0,dist_es/* fromString */.s)(input, "utf8");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
};

;// ./node_modules/@smithy/util-utf8/dist-es/toUint8Array.js

const toUint8Array = (data) => {
    if (typeof data === "string") {
        return fromUtf8(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
};

;// ./node_modules/@smithy/util-utf8/dist-es/toUtf8.js

const toUtf8 = (input) => {
    if (typeof input === "string") {
        return input;
    }
    if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
    }
    return (0,dist_es/* fromArrayBuffer */.Q)(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
};

;// ./node_modules/@smithy/util-utf8/dist-es/index.js





/***/ }),

/***/ 3323:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Y: () => (/* reexport */ AdaptiveRetryStrategy),
  Gz: () => (/* reexport */ DEFAULT_MAX_ATTEMPTS),
  bp: () => (/* reexport */ DEFAULT_RETRY_DELAY_BASE),
  L0: () => (/* reexport */ DEFAULT_RETRY_MODE),
  QJ: () => (/* reexport */ DefaultRateLimiter),
  Df: () => (/* reexport */ INITIAL_RETRY_TOKENS),
  l5: () => (/* reexport */ INVOCATION_ID_HEADER),
  G8: () => (/* reexport */ MAXIMUM_RETRY_DELAY),
  XP: () => (/* reexport */ NO_RETRY_INCREMENT),
  ok: () => (/* reexport */ REQUEST_HEADER),
  XS: () => (/* reexport */ RETRY_COST),
  cm: () => (/* reexport */ RETRY_MODES),
  ru: () => (/* reexport */ StandardRetryStrategy),
  jh: () => (/* reexport */ THROTTLING_RETRY_DELAY_BASE),
  Rn: () => (/* reexport */ TIMEOUT_RETRY_COST)
});

// UNUSED EXPORTS: ConfiguredRetryStrategy

;// ./node_modules/@smithy/util-retry/dist-es/config.js
var RETRY_MODES;
(function (RETRY_MODES) {
    RETRY_MODES["STANDARD"] = "standard";
    RETRY_MODES["ADAPTIVE"] = "adaptive";
})(RETRY_MODES || (RETRY_MODES = {}));
const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;

// EXTERNAL MODULE: ./node_modules/@smithy/service-error-classification/dist-es/index.js + 1 modules
var dist_es = __webpack_require__(4542);
;// ./node_modules/@smithy/util-retry/dist-es/DefaultRateLimiter.js

class DefaultRateLimiter {
    constructor(options) {
        this.currentCapacity = 0;
        this.enabled = false;
        this.lastMaxRate = 0;
        this.measuredTxRate = 0;
        this.requestCount = 0;
        this.lastTimestamp = 0;
        this.timeWindow = 0;
        this.beta = options?.beta ?? 0.7;
        this.minCapacity = options?.minCapacity ?? 1;
        this.minFillRate = options?.minFillRate ?? 0.5;
        this.scaleConstant = options?.scaleConstant ?? 0.4;
        this.smooth = options?.smooth ?? 0.8;
        const currentTimeInSeconds = this.getCurrentTimeInSeconds();
        this.lastThrottleTime = currentTimeInSeconds;
        this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
        this.fillRate = this.minFillRate;
        this.maxCapacity = this.minCapacity;
    }
    getCurrentTimeInSeconds() {
        return Date.now() / 1000;
    }
    async getSendToken() {
        return this.acquireTokenBucket(1);
    }
    async acquireTokenBucket(amount) {
        if (!this.enabled) {
            return;
        }
        this.refillTokenBucket();
        if (amount > this.currentCapacity) {
            const delay = ((amount - this.currentCapacity) / this.fillRate) * 1000;
            await new Promise((resolve) => DefaultRateLimiter.setTimeoutFn(resolve, delay));
        }
        this.currentCapacity = this.currentCapacity - amount;
    }
    refillTokenBucket() {
        const timestamp = this.getCurrentTimeInSeconds();
        if (!this.lastTimestamp) {
            this.lastTimestamp = timestamp;
            return;
        }
        const fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
        this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + fillAmount);
        this.lastTimestamp = timestamp;
    }
    updateClientSendingRate(response) {
        let calculatedRate;
        this.updateMeasuredRate();
        if ((0,dist_es/* isThrottlingError */.Qb)(response)) {
            const rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
            this.lastMaxRate = rateToUse;
            this.calculateTimeWindow();
            this.lastThrottleTime = this.getCurrentTimeInSeconds();
            calculatedRate = this.cubicThrottle(rateToUse);
            this.enableTokenBucket();
        }
        else {
            this.calculateTimeWindow();
            calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
        }
        const newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
        this.updateTokenBucketRate(newRate);
    }
    calculateTimeWindow() {
        this.timeWindow = this.getPrecise(Math.pow((this.lastMaxRate * (1 - this.beta)) / this.scaleConstant, 1 / 3));
    }
    cubicThrottle(rateToUse) {
        return this.getPrecise(rateToUse * this.beta);
    }
    cubicSuccess(timestamp) {
        return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
    }
    enableTokenBucket() {
        this.enabled = true;
    }
    updateTokenBucketRate(newRate) {
        this.refillTokenBucket();
        this.fillRate = Math.max(newRate, this.minFillRate);
        this.maxCapacity = Math.max(newRate, this.minCapacity);
        this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
    }
    updateMeasuredRate() {
        const t = this.getCurrentTimeInSeconds();
        const timeBucket = Math.floor(t * 2) / 2;
        this.requestCount++;
        if (timeBucket > this.lastTxRateBucket) {
            const currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
            this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
            this.requestCount = 0;
            this.lastTxRateBucket = timeBucket;
        }
    }
    getPrecise(num) {
        return parseFloat(num.toFixed(8));
    }
}
DefaultRateLimiter.setTimeoutFn = setTimeout;

;// ./node_modules/@smithy/util-retry/dist-es/constants.js
const DEFAULT_RETRY_DELAY_BASE = 100;
const MAXIMUM_RETRY_DELAY = 20 * 1000;
const THROTTLING_RETRY_DELAY_BASE = 500;
const INITIAL_RETRY_TOKENS = 500;
const RETRY_COST = 5;
const TIMEOUT_RETRY_COST = 10;
const NO_RETRY_INCREMENT = 1;
const INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
const REQUEST_HEADER = "amz-sdk-request";

;// ./node_modules/@smithy/util-retry/dist-es/defaultRetryBackoffStrategy.js

const getDefaultRetryBackoffStrategy = () => {
    let delayBase = DEFAULT_RETRY_DELAY_BASE;
    const computeNextBackoffDelay = (attempts) => {
        return Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
    };
    const setDelayBase = (delay) => {
        delayBase = delay;
    };
    return {
        computeNextBackoffDelay,
        setDelayBase,
    };
};

;// ./node_modules/@smithy/util-retry/dist-es/defaultRetryToken.js

const createDefaultRetryToken = ({ retryDelay, retryCount, retryCost, }) => {
    const getRetryCount = () => retryCount;
    const getRetryDelay = () => Math.min(MAXIMUM_RETRY_DELAY, retryDelay);
    const getRetryCost = () => retryCost;
    return {
        getRetryCount,
        getRetryDelay,
        getRetryCost,
    };
};

;// ./node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js




class StandardRetryStrategy {
    constructor(maxAttempts) {
        this.maxAttempts = maxAttempts;
        this.mode = RETRY_MODES.STANDARD;
        this.capacity = INITIAL_RETRY_TOKENS;
        this.retryBackoffStrategy = getDefaultRetryBackoffStrategy();
        this.maxAttemptsProvider = typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts;
    }
    async acquireInitialRetryToken(retryTokenScope) {
        return createDefaultRetryToken({
            retryDelay: DEFAULT_RETRY_DELAY_BASE,
            retryCount: 0,
        });
    }
    async refreshRetryTokenForRetry(token, errorInfo) {
        const maxAttempts = await this.getMaxAttempts();
        if (this.shouldRetry(token, errorInfo, maxAttempts)) {
            const errorType = errorInfo.errorType;
            this.retryBackoffStrategy.setDelayBase(errorType === "THROTTLING" ? THROTTLING_RETRY_DELAY_BASE : DEFAULT_RETRY_DELAY_BASE);
            const delayFromErrorType = this.retryBackoffStrategy.computeNextBackoffDelay(token.getRetryCount());
            const retryDelay = errorInfo.retryAfterHint
                ? Math.max(errorInfo.retryAfterHint.getTime() - Date.now() || 0, delayFromErrorType)
                : delayFromErrorType;
            const capacityCost = this.getCapacityCost(errorType);
            this.capacity -= capacityCost;
            return createDefaultRetryToken({
                retryDelay,
                retryCount: token.getRetryCount() + 1,
                retryCost: capacityCost,
            });
        }
        throw new Error("No retry token available");
    }
    recordSuccess(token) {
        this.capacity = Math.max(INITIAL_RETRY_TOKENS, this.capacity + (token.getRetryCost() ?? NO_RETRY_INCREMENT));
    }
    getCapacity() {
        return this.capacity;
    }
    async getMaxAttempts() {
        try {
            return await this.maxAttemptsProvider();
        }
        catch (error) {
            console.warn(`Max attempts provider could not resolve. Using default of ${DEFAULT_MAX_ATTEMPTS}`);
            return DEFAULT_MAX_ATTEMPTS;
        }
    }
    shouldRetry(tokenToRenew, errorInfo, maxAttempts) {
        const attempts = tokenToRenew.getRetryCount() + 1;
        return (attempts < maxAttempts &&
            this.capacity >= this.getCapacityCost(errorInfo.errorType) &&
            this.isRetryableError(errorInfo.errorType));
    }
    getCapacityCost(errorType) {
        return errorType === "TRANSIENT" ? TIMEOUT_RETRY_COST : RETRY_COST;
    }
    isRetryableError(errorType) {
        return errorType === "THROTTLING" || errorType === "TRANSIENT";
    }
}

;// ./node_modules/@smithy/util-retry/dist-es/AdaptiveRetryStrategy.js



class AdaptiveRetryStrategy {
    constructor(maxAttemptsProvider, options) {
        this.maxAttemptsProvider = maxAttemptsProvider;
        this.mode = RETRY_MODES.ADAPTIVE;
        const { rateLimiter } = options ?? {};
        this.rateLimiter = rateLimiter ?? new DefaultRateLimiter();
        this.standardRetryStrategy = new StandardRetryStrategy(maxAttemptsProvider);
    }
    async acquireInitialRetryToken(retryTokenScope) {
        await this.rateLimiter.getSendToken();
        return this.standardRetryStrategy.acquireInitialRetryToken(retryTokenScope);
    }
    async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
        this.rateLimiter.updateClientSendingRate(errorInfo);
        return this.standardRetryStrategy.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
    }
    recordSuccess(token) {
        this.rateLimiter.updateClientSendingRate({});
        this.standardRetryStrategy.recordSuccess(token);
    }
}

;// ./node_modules/@smithy/util-retry/dist-es/ConfiguredRetryStrategy.js


class ConfiguredRetryStrategy extends StandardRetryStrategy {
    constructor(maxAttempts, computeNextBackoffDelay = DEFAULT_RETRY_DELAY_BASE) {
        super(typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts);
        if (typeof computeNextBackoffDelay === "number") {
            this.computeNextBackoffDelay = () => computeNextBackoffDelay;
        }
        else {
            this.computeNextBackoffDelay = computeNextBackoffDelay;
        }
    }
    async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
        const token = await super.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
        token.getRetryDelay = () => this.computeNextBackoffDelay(token.getRetryCount());
        return token;
    }
}

;// ./node_modules/@smithy/util-retry/dist-es/index.js









/***/ }),

/***/ 3325:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ ExecuteTransactionCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class ExecuteTransactionCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep(_endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S)
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "ExecuteTransaction", {})
    .n("DynamoDBClient", "ExecuteTransactionCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_ExecuteTransactionCommand */ .OG)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_ExecuteTransactionCommand */ .Fb)
    .build() {
}


/***/ }),

/***/ 3387:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global module*/
var Buffer = (__webpack_require__(2861).Buffer);
var DataStream = __webpack_require__(8948);
var jwa = __webpack_require__(8789);
var Stream = __webpack_require__(2203);
var toString = __webpack_require__(2851);
var util = __webpack_require__(9023);

function base64url(string, encoding) {
  return Buffer
    .from(string, encoding)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function jwsSecuredInput(header, payload, encoding) {
  encoding = encoding || 'utf8';
  var encodedHeader = base64url(toString(header), 'binary');
  var encodedPayload = base64url(toString(payload), encoding);
  return util.format('%s.%s', encodedHeader, encodedPayload);
}

function jwsSign(opts) {
  var header = opts.header;
  var payload = opts.payload;
  var secretOrKey = opts.secret || opts.privateKey;
  var encoding = opts.encoding;
  var algo = jwa(header.alg);
  var securedInput = jwsSecuredInput(header, payload, encoding);
  var signature = algo.sign(securedInput, secretOrKey);
  return util.format('%s.%s', securedInput, signature);
}

function SignStream(opts) {
  var secret = opts.secret||opts.privateKey||opts.key;
  var secretStream = new DataStream(secret);
  this.readable = true;
  this.header = opts.header;
  this.encoding = opts.encoding;
  this.secret = this.privateKey = this.key = secretStream;
  this.payload = new DataStream(opts.payload);
  this.secret.once('close', function () {
    if (!this.payload.writable && this.readable)
      this.sign();
  }.bind(this));

  this.payload.once('close', function () {
    if (!this.secret.writable && this.readable)
      this.sign();
  }.bind(this));
}
util.inherits(SignStream, Stream);

SignStream.prototype.sign = function sign() {
  try {
    var signature = jwsSign({
      header: this.header,
      payload: this.payload.buffer,
      secret: this.secret.buffer,
      encoding: this.encoding
    });
    this.emit('done', signature);
    this.emit('data', signature);
    this.emit('end');
    this.readable = false;
    return signature;
  } catch (e) {
    this.readable = false;
    this.emit('error', e);
    this.emit('close');
  }
};

SignStream.sign = jwsSign;

module.exports = SignStream;


/***/ }),

/***/ 3410:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  hV: () => (/* reexport */ NODE_APP_ID_CONFIG_OPTIONS),
  pf: () => (/* reexport */ createDefaultUserAgentProvider)
});

// UNUSED EXPORTS: UA_APP_ID_ENV_NAME, UA_APP_ID_INI_NAME, crtAvailability, defaultUserAgent

// EXTERNAL MODULE: external "os"
var external_os_ = __webpack_require__(857);
;// external "process"
const external_process_namespaceObject = require("process");
;// ./node_modules/@aws-sdk/util-user-agent-node/dist-es/crt-availability.js
const crtAvailability = {
    isCrtAvailable: false,
};

;// ./node_modules/@aws-sdk/util-user-agent-node/dist-es/is-crt-available.js

const isCrtAvailable = () => {
    if (crtAvailability.isCrtAvailable) {
        return ["md/crt-avail"];
    }
    return null;
};

;// ./node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js




const createDefaultUserAgentProvider = ({ serviceId, clientVersion }) => {
    return async (config) => {
        const sections = [
            ["aws-sdk-js", clientVersion],
            ["ua", "2.1"],
            [`os/${(0,external_os_.platform)()}`, (0,external_os_.release)()],
            ["lang/js"],
            ["md/nodejs", `${external_process_namespaceObject.versions.node}`],
        ];
        const crtAvailable = isCrtAvailable();
        if (crtAvailable) {
            sections.push(crtAvailable);
        }
        if (serviceId) {
            sections.push([`api/${serviceId}`, clientVersion]);
        }
        if (external_process_namespaceObject.env.AWS_EXECUTION_ENV) {
            sections.push([`exec-env/${external_process_namespaceObject.env.AWS_EXECUTION_ENV}`]);
        }
        const appId = await config?.userAgentAppId?.();
        const resolvedUserAgent = appId ? [...sections, [`app/${appId}`]] : [...sections];
        return resolvedUserAgent;
    };
};
const defaultUserAgent = (/* unused pure expression or super */ null && (createDefaultUserAgentProvider));

// EXTERNAL MODULE: ./node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js + 5 modules
var dist_es = __webpack_require__(6827);
;// ./node_modules/@aws-sdk/util-user-agent-node/dist-es/nodeAppIdConfigOptions.js

const UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
const UA_APP_ID_INI_NAME = "sdk_ua_app_id";
const UA_APP_ID_INI_NAME_DEPRECATED = "sdk-ua-app-id";
const NODE_APP_ID_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[UA_APP_ID_ENV_NAME],
    configFileSelector: (profile) => profile[UA_APP_ID_INI_NAME] ?? profile[UA_APP_ID_INI_NAME_DEPRECATED],
    default: dist_es/* DEFAULT_UA_APP_ID */.bM,
};

;// ./node_modules/@aws-sdk/util-user-agent-node/dist-es/index.js




/***/ }),

/***/ 3415:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ setFeature)
/* harmony export */ });
function setFeature(context, feature, value) {
    if (!context.__aws_sdk_context) {
        context.__aws_sdk_context = {
            features: {},
        };
    }
    else if (!context.__aws_sdk_context.features) {
        context.__aws_sdk_context.features = {};
    }
    context.__aws_sdk_context.features[feature] = value;
}


/***/ }),

/***/ 3514:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)
const Range = __webpack_require__(5006)
const gt = __webpack_require__(9671)

const minVersion = (range, loose) => {
  range = new Range(range, loose)

  let minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let setMin = null
    comparators.forEach((comparator) => {
      // Clone to avoid manipulating the comparator's semver object.
      const compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!setMin || gt(compver, setMin)) {
            setMin = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error(`Unexpected operation: ${comparator.operator}`)
      }
    })
    if (setMin && (!minver || gt(minver, setMin))) {
      minver = setMin
    }
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}
module.exports = minVersion


/***/ }),

/***/ 3527:
/***/ ((module) => {

"use strict";


function getParamSize(keySize) {
	var result = ((keySize / 8) | 0) + (keySize % 8 === 0 ? 0 : 1);
	return result;
}

var paramBytesForAlg = {
	ES256: getParamSize(256),
	ES384: getParamSize(384),
	ES512: getParamSize(521)
};

function getParamBytesForAlg(alg) {
	var paramBytes = paramBytesForAlg[alg];
	if (paramBytes) {
		return paramBytes;
	}

	throw new Error('Unknown algorithm "' + alg + '"');
}

module.exports = getParamBytesForAlg;


/***/ }),

/***/ 3594:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  qs: () => (/* reexport */ NODE_MAX_ATTEMPT_CONFIG_OPTIONS),
  kN: () => (/* reexport */ NODE_RETRY_MODE_CONFIG_OPTIONS),
  ey: () => (/* reexport */ getRetryPlugin),
  $z: () => (/* reexport */ resolveRetryConfig)
});

// UNUSED EXPORTS: AdaptiveRetryStrategy, CONFIG_MAX_ATTEMPTS, CONFIG_RETRY_MODE, ENV_MAX_ATTEMPTS, ENV_RETRY_MODE, StandardRetryStrategy, defaultDelayDecider, defaultRetryDecider, getOmitRetryHeadersPlugin, getRetryAfterHint, omitRetryHeadersMiddleware, omitRetryHeadersMiddlewareOptions, retryMiddleware, retryMiddlewareOptions

// EXTERNAL MODULE: ./node_modules/@smithy/util-retry/dist-es/index.js + 8 modules
var dist_es = __webpack_require__(3323);
// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var protocol_http_dist_es = __webpack_require__(5479);
// EXTERNAL MODULE: ./node_modules/@smithy/service-error-classification/dist-es/index.js + 1 modules
var service_error_classification_dist_es = __webpack_require__(4542);
// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-node/v4.js + 1 modules
var v4 = __webpack_require__(5461);
;// ./node_modules/@smithy/middleware-retry/dist-es/defaultRetryQuota.js

const getDefaultRetryQuota = (initialRetryTokens, options) => {
    const MAX_CAPACITY = initialRetryTokens;
    const noRetryIncrement = options?.noRetryIncrement ?? dist_es/* NO_RETRY_INCREMENT */.XP;
    const retryCost = options?.retryCost ?? dist_es/* RETRY_COST */.XS;
    const timeoutRetryCost = options?.timeoutRetryCost ?? dist_es/* TIMEOUT_RETRY_COST */.Rn;
    let availableCapacity = initialRetryTokens;
    const getCapacityAmount = (error) => (error.name === "TimeoutError" ? timeoutRetryCost : retryCost);
    const hasRetryTokens = (error) => getCapacityAmount(error) <= availableCapacity;
    const retrieveRetryTokens = (error) => {
        if (!hasRetryTokens(error)) {
            throw new Error("No retry token available");
        }
        const capacityAmount = getCapacityAmount(error);
        availableCapacity -= capacityAmount;
        return capacityAmount;
    };
    const releaseRetryTokens = (capacityReleaseAmount) => {
        availableCapacity += capacityReleaseAmount ?? noRetryIncrement;
        availableCapacity = Math.min(availableCapacity, MAX_CAPACITY);
    };
    return Object.freeze({
        hasRetryTokens,
        retrieveRetryTokens,
        releaseRetryTokens,
    });
};

;// ./node_modules/@smithy/middleware-retry/dist-es/delayDecider.js

const defaultDelayDecider = (delayBase, attempts) => Math.floor(Math.min(dist_es/* MAXIMUM_RETRY_DELAY */.G8, Math.random() * 2 ** attempts * delayBase));

;// ./node_modules/@smithy/middleware-retry/dist-es/retryDecider.js

const defaultRetryDecider = (error) => {
    if (!error) {
        return false;
    }
    return (0,service_error_classification_dist_es/* isRetryableByTrait */.S0)(error) || (0,service_error_classification_dist_es/* isClockSkewError */.h5)(error) || (0,service_error_classification_dist_es/* isThrottlingError */.Qb)(error) || (0,service_error_classification_dist_es/* isTransientError */.bV)(error);
};

;// ./node_modules/@smithy/middleware-retry/dist-es/util.js
const asSdkError = (error) => {
    if (error instanceof Error)
        return error;
    if (error instanceof Object)
        return Object.assign(new Error(), error);
    if (typeof error === "string")
        return new Error(error);
    return new Error(`AWS SDK error wrapper for ${error}`);
};

;// ./node_modules/@smithy/middleware-retry/dist-es/StandardRetryStrategy.js








class StandardRetryStrategy {
    constructor(maxAttemptsProvider, options) {
        this.maxAttemptsProvider = maxAttemptsProvider;
        this.mode = dist_es/* RETRY_MODES */.cm.STANDARD;
        this.retryDecider = options?.retryDecider ?? defaultRetryDecider;
        this.delayDecider = options?.delayDecider ?? defaultDelayDecider;
        this.retryQuota = options?.retryQuota ?? getDefaultRetryQuota(dist_es/* INITIAL_RETRY_TOKENS */.Df);
    }
    shouldRetry(error, attempts, maxAttempts) {
        return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
    }
    async getMaxAttempts() {
        let maxAttempts;
        try {
            maxAttempts = await this.maxAttemptsProvider();
        }
        catch (error) {
            maxAttempts = dist_es/* DEFAULT_MAX_ATTEMPTS */.Gz;
        }
        return maxAttempts;
    }
    async retry(next, args, options) {
        let retryTokenAmount;
        let attempts = 0;
        let totalDelay = 0;
        const maxAttempts = await this.getMaxAttempts();
        const { request } = args;
        if (protocol_http_dist_es/* HttpRequest */.Kd.isInstance(request)) {
            request.headers[dist_es/* INVOCATION_ID_HEADER */.l5] = (0,v4/* default */.A)();
        }
        while (true) {
            try {
                if (protocol_http_dist_es/* HttpRequest */.Kd.isInstance(request)) {
                    request.headers[dist_es/* REQUEST_HEADER */.ok] = `attempt=${attempts + 1}; max=${maxAttempts}`;
                }
                if (options?.beforeRequest) {
                    await options.beforeRequest();
                }
                const { response, output } = await next(args);
                if (options?.afterRequest) {
                    options.afterRequest(response);
                }
                this.retryQuota.releaseRetryTokens(retryTokenAmount);
                output.$metadata.attempts = attempts + 1;
                output.$metadata.totalRetryDelay = totalDelay;
                return { response, output };
            }
            catch (e) {
                const err = asSdkError(e);
                attempts++;
                if (this.shouldRetry(err, attempts, maxAttempts)) {
                    retryTokenAmount = this.retryQuota.retrieveRetryTokens(err);
                    const delayFromDecider = this.delayDecider((0,service_error_classification_dist_es/* isThrottlingError */.Qb)(err) ? dist_es/* THROTTLING_RETRY_DELAY_BASE */.jh : dist_es/* DEFAULT_RETRY_DELAY_BASE */.bp, attempts);
                    const delayFromResponse = getDelayFromRetryAfterHeader(err.$response);
                    const delay = Math.max(delayFromResponse || 0, delayFromDecider);
                    totalDelay += delay;
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    continue;
                }
                if (!err.$metadata) {
                    err.$metadata = {};
                }
                err.$metadata.attempts = attempts;
                err.$metadata.totalRetryDelay = totalDelay;
                throw err;
            }
        }
    }
}
const getDelayFromRetryAfterHeader = (response) => {
    if (!protocol_http_dist_es/* HttpResponse */.cS.isInstance(response))
        return;
    const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
    if (!retryAfterHeaderName)
        return;
    const retryAfter = response.headers[retryAfterHeaderName];
    const retryAfterSeconds = Number(retryAfter);
    if (!Number.isNaN(retryAfterSeconds))
        return retryAfterSeconds * 1000;
    const retryAfterDate = new Date(retryAfter);
    return retryAfterDate.getTime() - Date.now();
};

;// ./node_modules/@smithy/middleware-retry/dist-es/AdaptiveRetryStrategy.js


class AdaptiveRetryStrategy extends StandardRetryStrategy {
    constructor(maxAttemptsProvider, options) {
        const { rateLimiter, ...superOptions } = options ?? {};
        super(maxAttemptsProvider, superOptions);
        this.rateLimiter = rateLimiter ?? new dist_es/* DefaultRateLimiter */.QJ();
        this.mode = dist_es/* RETRY_MODES */.cm.ADAPTIVE;
    }
    async retry(next, args) {
        return super.retry(next, args, {
            beforeRequest: async () => {
                return this.rateLimiter.getSendToken();
            },
            afterRequest: (response) => {
                this.rateLimiter.updateClientSendingRate(response);
            },
        });
    }
}

// EXTERNAL MODULE: ./node_modules/@smithy/util-middleware/dist-es/index.js + 2 modules
var util_middleware_dist_es = __webpack_require__(7135);
;// ./node_modules/@smithy/middleware-retry/dist-es/configurations.js


const ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
const CONFIG_MAX_ATTEMPTS = "max_attempts";
const NODE_MAX_ATTEMPT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => {
        const value = env[ENV_MAX_ATTEMPTS];
        if (!value)
            return undefined;
        const maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
            throw new Error(`Environment variable ${ENV_MAX_ATTEMPTS} mast be a number, got "${value}"`);
        }
        return maxAttempt;
    },
    configFileSelector: (profile) => {
        const value = profile[CONFIG_MAX_ATTEMPTS];
        if (!value)
            return undefined;
        const maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
            throw new Error(`Shared config file entry ${CONFIG_MAX_ATTEMPTS} mast be a number, got "${value}"`);
        }
        return maxAttempt;
    },
    default: dist_es/* DEFAULT_MAX_ATTEMPTS */.Gz,
};
const resolveRetryConfig = (input) => {
    const { retryStrategy, retryMode: _retryMode, maxAttempts: _maxAttempts } = input;
    const maxAttempts = (0,util_middleware_dist_es/* normalizeProvider */.t)(_maxAttempts ?? dist_es/* DEFAULT_MAX_ATTEMPTS */.Gz);
    return Object.assign(input, {
        maxAttempts,
        retryStrategy: async () => {
            if (retryStrategy) {
                return retryStrategy;
            }
            const retryMode = await (0,util_middleware_dist_es/* normalizeProvider */.t)(_retryMode)();
            if (retryMode === dist_es/* RETRY_MODES */.cm.ADAPTIVE) {
                return new dist_es/* AdaptiveRetryStrategy */.Y(maxAttempts);
            }
            return new dist_es/* StandardRetryStrategy */.ru(maxAttempts);
        },
    });
};
const ENV_RETRY_MODE = "AWS_RETRY_MODE";
const CONFIG_RETRY_MODE = "retry_mode";
const NODE_RETRY_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[ENV_RETRY_MODE],
    configFileSelector: (profile) => profile[CONFIG_RETRY_MODE],
    default: dist_es/* DEFAULT_RETRY_MODE */.L0,
};

;// ./node_modules/@smithy/middleware-retry/dist-es/omitRetryHeadersMiddleware.js


const omitRetryHeadersMiddleware = () => (next) => async (args) => {
    const { request } = args;
    if (HttpRequest.isInstance(request)) {
        delete request.headers[INVOCATION_ID_HEADER];
        delete request.headers[REQUEST_HEADER];
    }
    return next(args);
};
const omitRetryHeadersMiddlewareOptions = {
    name: "omitRetryHeadersMiddleware",
    tags: ["RETRY", "HEADERS", "OMIT_RETRY_HEADERS"],
    relation: "before",
    toMiddleware: "awsAuthMiddleware",
    override: true,
};
const getOmitRetryHeadersPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(omitRetryHeadersMiddleware(), omitRetryHeadersMiddlewareOptions);
    },
});

// EXTERNAL MODULE: ./node_modules/@smithy/smithy-client/dist-es/index.js + 26 modules
var smithy_client_dist_es = __webpack_require__(4820);
// EXTERNAL MODULE: external "stream"
var external_stream_ = __webpack_require__(2203);
;// ./node_modules/@smithy/middleware-retry/dist-es/isStreamingPayload/isStreamingPayload.js

const isStreamingPayload = (request) => request?.body instanceof external_stream_.Readable ||
    (typeof ReadableStream !== "undefined" && request?.body instanceof ReadableStream);

;// ./node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js







const retryMiddleware = (options) => (next, context) => async (args) => {
    let retryStrategy = await options.retryStrategy();
    const maxAttempts = await options.maxAttempts();
    if (isRetryStrategyV2(retryStrategy)) {
        retryStrategy = retryStrategy;
        let retryToken = await retryStrategy.acquireInitialRetryToken(context["partition_id"]);
        let lastError = new Error();
        let attempts = 0;
        let totalRetryDelay = 0;
        const { request } = args;
        const isRequest = protocol_http_dist_es/* HttpRequest */.Kd.isInstance(request);
        if (isRequest) {
            request.headers[dist_es/* INVOCATION_ID_HEADER */.l5] = (0,v4/* default */.A)();
        }
        while (true) {
            try {
                if (isRequest) {
                    request.headers[dist_es/* REQUEST_HEADER */.ok] = `attempt=${attempts + 1}; max=${maxAttempts}`;
                }
                const { response, output } = await next(args);
                retryStrategy.recordSuccess(retryToken);
                output.$metadata.attempts = attempts + 1;
                output.$metadata.totalRetryDelay = totalRetryDelay;
                return { response, output };
            }
            catch (e) {
                const retryErrorInfo = getRetryErrorInfo(e);
                lastError = asSdkError(e);
                if (isRequest && isStreamingPayload(request)) {
                    (context.logger instanceof smithy_client_dist_es/* NoOpLogger */.N4 ? console : context.logger)?.warn("An error was encountered in a non-retryable streaming request.");
                    throw lastError;
                }
                try {
                    retryToken = await retryStrategy.refreshRetryTokenForRetry(retryToken, retryErrorInfo);
                }
                catch (refreshError) {
                    if (!lastError.$metadata) {
                        lastError.$metadata = {};
                    }
                    lastError.$metadata.attempts = attempts + 1;
                    lastError.$metadata.totalRetryDelay = totalRetryDelay;
                    throw lastError;
                }
                attempts = retryToken.getRetryCount();
                const delay = retryToken.getRetryDelay();
                totalRetryDelay += delay;
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }
    else {
        retryStrategy = retryStrategy;
        if (retryStrategy?.mode)
            context.userAgent = [...(context.userAgent || []), ["cfg/retry-mode", retryStrategy.mode]];
        return retryStrategy.retry(next, args);
    }
};
const isRetryStrategyV2 = (retryStrategy) => typeof retryStrategy.acquireInitialRetryToken !== "undefined" &&
    typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" &&
    typeof retryStrategy.recordSuccess !== "undefined";
const getRetryErrorInfo = (error) => {
    const errorInfo = {
        error,
        errorType: getRetryErrorType(error),
    };
    const retryAfterHint = getRetryAfterHint(error.$response);
    if (retryAfterHint) {
        errorInfo.retryAfterHint = retryAfterHint;
    }
    return errorInfo;
};
const getRetryErrorType = (error) => {
    if ((0,service_error_classification_dist_es/* isThrottlingError */.Qb)(error))
        return "THROTTLING";
    if ((0,service_error_classification_dist_es/* isTransientError */.bV)(error))
        return "TRANSIENT";
    if ((0,service_error_classification_dist_es/* isServerError */.GQ)(error))
        return "SERVER_ERROR";
    return "CLIENT_ERROR";
};
const retryMiddlewareOptions = {
    name: "retryMiddleware",
    tags: ["RETRY"],
    step: "finalizeRequest",
    priority: "high",
    override: true,
};
const getRetryPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
    },
});
const getRetryAfterHint = (response) => {
    if (!protocol_http_dist_es/* HttpResponse */.cS.isInstance(response))
        return;
    const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
    if (!retryAfterHeaderName)
        return;
    const retryAfter = response.headers[retryAfterHeaderName];
    const retryAfterSeconds = Number(retryAfter);
    if (!Number.isNaN(retryAfterSeconds))
        return new Date(retryAfterSeconds * 1000);
    const retryAfterDate = new Date(retryAfter);
    return retryAfterDate;
};

;// ./node_modules/@smithy/middleware-retry/dist-es/index.js









/***/ }),

/***/ 3621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $c: () => (/* reexport */ NodeHttpHandler),
  kv: () => (/* reexport */ streamCollector)
});

// UNUSED EXPORTS: DEFAULT_REQUEST_TIMEOUT, NodeHttp2Handler

// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var dist_es = __webpack_require__(5479);
// EXTERNAL MODULE: ./node_modules/@smithy/util-uri-escape/dist-es/escape-uri.js
var escape_uri = __webpack_require__(2531);
;// ./node_modules/@smithy/querystring-builder/dist-es/index.js

function dist_es_buildQueryString(query) {
    const parts = [];
    for (let key of Object.keys(query).sort()) {
        const value = query[key];
        key = (0,escape_uri/* escapeUri */.o)(key);
        if (Array.isArray(value)) {
            for (let i = 0, iLen = value.length; i < iLen; i++) {
                parts.push(`${key}=${(0,escape_uri/* escapeUri */.o)(value[i])}`);
            }
        }
        else {
            let qsEntry = key;
            if (value || typeof value === "string") {
                qsEntry += `=${(0,escape_uri/* escapeUri */.o)(value)}`;
            }
            parts.push(qsEntry);
        }
    }
    return parts.join("&");
}

// EXTERNAL MODULE: external "http"
var external_http_ = __webpack_require__(8611);
;// external "https"
const external_https_namespaceObject = require("https");
;// ./node_modules/@smithy/node-http-handler/dist-es/constants.js
const NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "EPIPE", "ETIMEDOUT"];

;// ./node_modules/@smithy/node-http-handler/dist-es/get-transformed-headers.js
const get_transformed_headers_getTransformedHeaders = (headers) => {
    const transformedHeaders = {};
    for (const name of Object.keys(headers)) {
        const headerValues = headers[name];
        transformedHeaders[name] = Array.isArray(headerValues) ? headerValues.join(",") : headerValues;
    }
    return transformedHeaders;
};


;// ./node_modules/@smithy/node-http-handler/dist-es/timing.js
const timing = {
    setTimeout: (cb, ms) => setTimeout(cb, ms),
    clearTimeout: (timeoutId) => clearTimeout(timeoutId),
};

;// ./node_modules/@smithy/node-http-handler/dist-es/set-connection-timeout.js

const DEFER_EVENT_LISTENER_TIME = 1000;
const setConnectionTimeout = (request, reject, timeoutInMs = 0) => {
    if (!timeoutInMs) {
        return -1;
    }
    const registerTimeout = (offset) => {
        const timeoutId = timing.setTimeout(() => {
            request.destroy();
            reject(Object.assign(new Error(`Socket timed out without establishing a connection within ${timeoutInMs} ms`), {
                name: "TimeoutError",
            }));
        }, timeoutInMs - offset);
        const doWithSocket = (socket) => {
            if (socket?.connecting) {
                socket.on("connect", () => {
                    timing.clearTimeout(timeoutId);
                });
            }
            else {
                timing.clearTimeout(timeoutId);
            }
        };
        if (request.socket) {
            doWithSocket(request.socket);
        }
        else {
            request.on("socket", doWithSocket);
        }
    };
    if (timeoutInMs < 2000) {
        registerTimeout(0);
        return 0;
    }
    return timing.setTimeout(registerTimeout.bind(null, DEFER_EVENT_LISTENER_TIME), DEFER_EVENT_LISTENER_TIME);
};

;// ./node_modules/@smithy/node-http-handler/dist-es/set-socket-keep-alive.js

const set_socket_keep_alive_DEFER_EVENT_LISTENER_TIME = 3000;
const setSocketKeepAlive = (request, { keepAlive, keepAliveMsecs }, deferTimeMs = set_socket_keep_alive_DEFER_EVENT_LISTENER_TIME) => {
    if (keepAlive !== true) {
        return -1;
    }
    const registerListener = () => {
        if (request.socket) {
            request.socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
        }
        else {
            request.on("socket", (socket) => {
                socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
            });
        }
    };
    if (deferTimeMs === 0) {
        registerListener();
        return 0;
    }
    return timing.setTimeout(registerListener, deferTimeMs);
};

;// ./node_modules/@smithy/node-http-handler/dist-es/set-socket-timeout.js


const set_socket_timeout_DEFER_EVENT_LISTENER_TIME = 3000;
const setSocketTimeout = (request, reject, timeoutInMs = DEFAULT_REQUEST_TIMEOUT) => {
    const registerTimeout = (offset) => {
        const timeout = timeoutInMs - offset;
        const onTimeout = () => {
            request.destroy();
            reject(Object.assign(new Error(`Connection timed out after ${timeoutInMs} ms`), { name: "TimeoutError" }));
        };
        if (request.socket) {
            request.socket.setTimeout(timeout, onTimeout);
            request.on("close", () => request.socket?.removeListener("timeout", onTimeout));
        }
        else {
            request.setTimeout(timeout, onTimeout);
        }
    };
    if (0 < timeoutInMs && timeoutInMs < 6000) {
        registerTimeout(0);
        return 0;
    }
    return timing.setTimeout(registerTimeout.bind(null, timeoutInMs === 0 ? 0 : set_socket_timeout_DEFER_EVENT_LISTENER_TIME), set_socket_timeout_DEFER_EVENT_LISTENER_TIME);
};

// EXTERNAL MODULE: external "stream"
var external_stream_ = __webpack_require__(2203);
;// ./node_modules/@smithy/node-http-handler/dist-es/write-request-body.js


const MIN_WAIT_TIME = 6000;
async function write_request_body_writeRequestBody(httpRequest, request, maxContinueTimeoutMs = MIN_WAIT_TIME) {
    const headers = request.headers ?? {};
    const expect = headers["Expect"] || headers["expect"];
    let timeoutId = -1;
    let sendBody = true;
    if (expect === "100-continue") {
        sendBody = await Promise.race([
            new Promise((resolve) => {
                timeoutId = Number(timing.setTimeout(() => resolve(true), Math.max(MIN_WAIT_TIME, maxContinueTimeoutMs)));
            }),
            new Promise((resolve) => {
                httpRequest.on("continue", () => {
                    timing.clearTimeout(timeoutId);
                    resolve(true);
                });
                httpRequest.on("response", () => {
                    timing.clearTimeout(timeoutId);
                    resolve(false);
                });
                httpRequest.on("error", () => {
                    timing.clearTimeout(timeoutId);
                    resolve(false);
                });
            }),
        ]);
    }
    if (sendBody) {
        writeBody(httpRequest, request.body);
    }
}
function writeBody(httpRequest, body) {
    if (body instanceof external_stream_.Readable) {
        body.pipe(httpRequest);
        return;
    }
    if (body) {
        if (Buffer.isBuffer(body) || typeof body === "string") {
            httpRequest.end(body);
            return;
        }
        const uint8 = body;
        if (typeof uint8 === "object" &&
            uint8.buffer &&
            typeof uint8.byteOffset === "number" &&
            typeof uint8.byteLength === "number") {
            httpRequest.end(Buffer.from(uint8.buffer, uint8.byteOffset, uint8.byteLength));
            return;
        }
        httpRequest.end(Buffer.from(body));
        return;
    }
    httpRequest.end();
}

;// ./node_modules/@smithy/node-http-handler/dist-es/node-http-handler.js











const DEFAULT_REQUEST_TIMEOUT = 0;
class NodeHttpHandler {
    static create(instanceOrOptions) {
        if (typeof instanceOrOptions?.handle === "function") {
            return instanceOrOptions;
        }
        return new NodeHttpHandler(instanceOrOptions);
    }
    static checkSocketUsage(agent, socketWarningTimestamp, logger = console) {
        const { sockets, requests, maxSockets } = agent;
        if (typeof maxSockets !== "number" || maxSockets === Infinity) {
            return socketWarningTimestamp;
        }
        const interval = 15000;
        if (Date.now() - interval < socketWarningTimestamp) {
            return socketWarningTimestamp;
        }
        if (sockets && requests) {
            for (const origin in sockets) {
                const socketsInUse = sockets[origin]?.length ?? 0;
                const requestsEnqueued = requests[origin]?.length ?? 0;
                if (socketsInUse >= maxSockets && requestsEnqueued >= 2 * maxSockets) {
                    logger?.warn?.(`@smithy/node-http-handler:WARN - socket usage at capacity=${socketsInUse} and ${requestsEnqueued} additional requests are enqueued.
See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html
or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config.`);
                    return Date.now();
                }
            }
        }
        return socketWarningTimestamp;
    }
    constructor(options) {
        this.socketWarningTimestamp = 0;
        this.metadata = { handlerProtocol: "http/1.1" };
        this.configProvider = new Promise((resolve, reject) => {
            if (typeof options === "function") {
                options()
                    .then((_options) => {
                    resolve(this.resolveDefaultConfig(_options));
                })
                    .catch(reject);
            }
            else {
                resolve(this.resolveDefaultConfig(options));
            }
        });
    }
    resolveDefaultConfig(options) {
        const { requestTimeout, connectionTimeout, socketTimeout, socketAcquisitionWarningTimeout, httpAgent, httpsAgent } = options || {};
        const keepAlive = true;
        const maxSockets = 50;
        return {
            connectionTimeout,
            requestTimeout: requestTimeout ?? socketTimeout,
            socketAcquisitionWarningTimeout,
            httpAgent: (() => {
                if (httpAgent instanceof external_http_.Agent || typeof httpAgent?.destroy === "function") {
                    return httpAgent;
                }
                return new external_http_.Agent({ keepAlive, maxSockets, ...httpAgent });
            })(),
            httpsAgent: (() => {
                if (httpsAgent instanceof external_https_namespaceObject.Agent || typeof httpsAgent?.destroy === "function") {
                    return httpsAgent;
                }
                return new external_https_namespaceObject.Agent({ keepAlive, maxSockets, ...httpsAgent });
            })(),
            logger: console,
        };
    }
    destroy() {
        this.config?.httpAgent?.destroy();
        this.config?.httpsAgent?.destroy();
    }
    async handle(request, { abortSignal, requestTimeout } = {}) {
        if (!this.config) {
            this.config = await this.configProvider;
        }
        return new Promise((_resolve, _reject) => {
            let writeRequestBodyPromise = undefined;
            const timeouts = [];
            const resolve = async (arg) => {
                await writeRequestBodyPromise;
                timeouts.forEach(timing.clearTimeout);
                _resolve(arg);
            };
            const reject = async (arg) => {
                await writeRequestBodyPromise;
                timeouts.forEach(timing.clearTimeout);
                _reject(arg);
            };
            if (!this.config) {
                throw new Error("Node HTTP request handler config is not resolved");
            }
            if (abortSignal?.aborted) {
                const abortError = new Error("Request aborted");
                abortError.name = "AbortError";
                reject(abortError);
                return;
            }
            const isSSL = request.protocol === "https:";
            const agent = isSSL ? this.config.httpsAgent : this.config.httpAgent;
            timeouts.push(timing.setTimeout(() => {
                this.socketWarningTimestamp = NodeHttpHandler.checkSocketUsage(agent, this.socketWarningTimestamp, this.config.logger);
            }, this.config.socketAcquisitionWarningTimeout ??
                (this.config.requestTimeout ?? 2000) + (this.config.connectionTimeout ?? 1000)));
            const queryString = dist_es_buildQueryString(request.query || {});
            let auth = undefined;
            if (request.username != null || request.password != null) {
                const username = request.username ?? "";
                const password = request.password ?? "";
                auth = `${username}:${password}`;
            }
            let path = request.path;
            if (queryString) {
                path += `?${queryString}`;
            }
            if (request.fragment) {
                path += `#${request.fragment}`;
            }
            let hostname = request.hostname ?? "";
            if (hostname[0] === "[" && hostname.endsWith("]")) {
                hostname = request.hostname.slice(1, -1);
            }
            else {
                hostname = request.hostname;
            }
            const nodeHttpsOptions = {
                headers: request.headers,
                host: hostname,
                method: request.method,
                path,
                port: request.port,
                agent,
                auth,
            };
            const requestFunc = isSSL ? external_https_namespaceObject.request : external_http_.request;
            const req = requestFunc(nodeHttpsOptions, (res) => {
                const httpResponse = new dist_es/* HttpResponse */.cS({
                    statusCode: res.statusCode || -1,
                    reason: res.statusMessage,
                    headers: get_transformed_headers_getTransformedHeaders(res.headers),
                    body: res,
                });
                resolve({ response: httpResponse });
            });
            req.on("error", (err) => {
                if (NODEJS_TIMEOUT_ERROR_CODES.includes(err.code)) {
                    reject(Object.assign(err, { name: "TimeoutError" }));
                }
                else {
                    reject(err);
                }
            });
            if (abortSignal) {
                const onAbort = () => {
                    req.destroy();
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
                if (typeof abortSignal.addEventListener === "function") {
                    const signal = abortSignal;
                    signal.addEventListener("abort", onAbort, { once: true });
                    req.once("close", () => signal.removeEventListener("abort", onAbort));
                }
                else {
                    abortSignal.onabort = onAbort;
                }
            }
            const effectiveRequestTimeout = requestTimeout ?? this.config.requestTimeout;
            timeouts.push(setConnectionTimeout(req, reject, this.config.connectionTimeout));
            timeouts.push(setSocketTimeout(req, reject, effectiveRequestTimeout));
            const httpAgent = nodeHttpsOptions.agent;
            if (typeof httpAgent === "object" && "keepAlive" in httpAgent) {
                timeouts.push(setSocketKeepAlive(req, {
                    keepAlive: httpAgent.keepAlive,
                    keepAliveMsecs: httpAgent.keepAliveMsecs,
                }));
            }
            writeRequestBodyPromise = write_request_body_writeRequestBody(req, request, effectiveRequestTimeout).catch((e) => {
                timeouts.forEach(timing.clearTimeout);
                return _reject(e);
            });
        });
    }
    updateHttpClientConfig(key, value) {
        this.config = undefined;
        this.configProvider = this.configProvider.then((config) => {
            return {
                ...config,
                [key]: value,
            };
        });
    }
    httpHandlerConfigs() {
        return this.config ?? {};
    }
}

;// external "http2"
const external_http2_namespaceObject = require("http2");
;// ./node_modules/@smithy/node-http-handler/dist-es/node-http2-connection-pool.js
class node_http2_connection_pool_NodeHttp2ConnectionPool {
    constructor(sessions) {
        this.sessions = [];
        this.sessions = sessions ?? [];
    }
    poll() {
        if (this.sessions.length > 0) {
            return this.sessions.shift();
        }
    }
    offerLast(session) {
        this.sessions.push(session);
    }
    contains(session) {
        return this.sessions.includes(session);
    }
    remove(session) {
        this.sessions = this.sessions.filter((s) => s !== session);
    }
    [Symbol.iterator]() {
        return this.sessions[Symbol.iterator]();
    }
    destroy(connection) {
        for (const session of this.sessions) {
            if (session === connection) {
                if (!session.destroyed) {
                    session.destroy();
                }
            }
        }
    }
}

;// ./node_modules/@smithy/node-http-handler/dist-es/node-http2-connection-manager.js


class node_http2_connection_manager_NodeHttp2ConnectionManager {
    constructor(config) {
        this.sessionCache = new Map();
        this.config = config;
        if (this.config.maxConcurrency && this.config.maxConcurrency <= 0) {
            throw new RangeError("maxConcurrency must be greater than zero.");
        }
    }
    lease(requestContext, connectionConfiguration) {
        const url = this.getUrlString(requestContext);
        const existingPool = this.sessionCache.get(url);
        if (existingPool) {
            const existingSession = existingPool.poll();
            if (existingSession && !this.config.disableConcurrency) {
                return existingSession;
            }
        }
        const session = http2.connect(url);
        if (this.config.maxConcurrency) {
            session.settings({ maxConcurrentStreams: this.config.maxConcurrency }, (err) => {
                if (err) {
                    throw new Error("Fail to set maxConcurrentStreams to " +
                        this.config.maxConcurrency +
                        "when creating new session for " +
                        requestContext.destination.toString());
                }
            });
        }
        session.unref();
        const destroySessionCb = () => {
            session.destroy();
            this.deleteSession(url, session);
        };
        session.on("goaway", destroySessionCb);
        session.on("error", destroySessionCb);
        session.on("frameError", destroySessionCb);
        session.on("close", () => this.deleteSession(url, session));
        if (connectionConfiguration.requestTimeout) {
            session.setTimeout(connectionConfiguration.requestTimeout, destroySessionCb);
        }
        const connectionPool = this.sessionCache.get(url) || new NodeHttp2ConnectionPool();
        connectionPool.offerLast(session);
        this.sessionCache.set(url, connectionPool);
        return session;
    }
    deleteSession(authority, session) {
        const existingConnectionPool = this.sessionCache.get(authority);
        if (!existingConnectionPool) {
            return;
        }
        if (!existingConnectionPool.contains(session)) {
            return;
        }
        existingConnectionPool.remove(session);
        this.sessionCache.set(authority, existingConnectionPool);
    }
    release(requestContext, session) {
        const cacheKey = this.getUrlString(requestContext);
        this.sessionCache.get(cacheKey)?.offerLast(session);
    }
    destroy() {
        for (const [key, connectionPool] of this.sessionCache) {
            for (const session of connectionPool) {
                if (!session.destroyed) {
                    session.destroy();
                }
                connectionPool.remove(session);
            }
            this.sessionCache.delete(key);
        }
    }
    setMaxConcurrentStreams(maxConcurrentStreams) {
        if (maxConcurrentStreams && maxConcurrentStreams <= 0) {
            throw new RangeError("maxConcurrentStreams must be greater than zero.");
        }
        this.config.maxConcurrency = maxConcurrentStreams;
    }
    setDisableConcurrentStreams(disableConcurrentStreams) {
        this.config.disableConcurrency = disableConcurrentStreams;
    }
    getUrlString(request) {
        return request.destination.toString();
    }
}

;// ./node_modules/@smithy/node-http-handler/dist-es/node-http2-handler.js






class NodeHttp2Handler {
    static create(instanceOrOptions) {
        if (typeof instanceOrOptions?.handle === "function") {
            return instanceOrOptions;
        }
        return new NodeHttp2Handler(instanceOrOptions);
    }
    constructor(options) {
        this.metadata = { handlerProtocol: "h2" };
        this.connectionManager = new NodeHttp2ConnectionManager({});
        this.configProvider = new Promise((resolve, reject) => {
            if (typeof options === "function") {
                options()
                    .then((opts) => {
                    resolve(opts || {});
                })
                    .catch(reject);
            }
            else {
                resolve(options || {});
            }
        });
    }
    destroy() {
        this.connectionManager.destroy();
    }
    async handle(request, { abortSignal, requestTimeout } = {}) {
        if (!this.config) {
            this.config = await this.configProvider;
            this.connectionManager.setDisableConcurrentStreams(this.config.disableConcurrentStreams || false);
            if (this.config.maxConcurrentStreams) {
                this.connectionManager.setMaxConcurrentStreams(this.config.maxConcurrentStreams);
            }
        }
        const { requestTimeout: configRequestTimeout, disableConcurrentStreams } = this.config;
        const effectiveRequestTimeout = requestTimeout ?? configRequestTimeout;
        return new Promise((_resolve, _reject) => {
            let fulfilled = false;
            let writeRequestBodyPromise = undefined;
            const resolve = async (arg) => {
                await writeRequestBodyPromise;
                _resolve(arg);
            };
            const reject = async (arg) => {
                await writeRequestBodyPromise;
                _reject(arg);
            };
            if (abortSignal?.aborted) {
                fulfilled = true;
                const abortError = new Error("Request aborted");
                abortError.name = "AbortError";
                reject(abortError);
                return;
            }
            const { hostname, method, port, protocol, query } = request;
            let auth = "";
            if (request.username != null || request.password != null) {
                const username = request.username ?? "";
                const password = request.password ?? "";
                auth = `${username}:${password}@`;
            }
            const authority = `${protocol}//${auth}${hostname}${port ? `:${port}` : ""}`;
            const requestContext = { destination: new URL(authority) };
            const session = this.connectionManager.lease(requestContext, {
                requestTimeout: this.config?.sessionTimeout,
                disableConcurrentStreams: disableConcurrentStreams || false,
            });
            const rejectWithDestroy = (err) => {
                if (disableConcurrentStreams) {
                    this.destroySession(session);
                }
                fulfilled = true;
                reject(err);
            };
            const queryString = buildQueryString(query || {});
            let path = request.path;
            if (queryString) {
                path += `?${queryString}`;
            }
            if (request.fragment) {
                path += `#${request.fragment}`;
            }
            const req = session.request({
                ...request.headers,
                [constants.HTTP2_HEADER_PATH]: path,
                [constants.HTTP2_HEADER_METHOD]: method,
            });
            session.ref();
            req.on("response", (headers) => {
                const httpResponse = new HttpResponse({
                    statusCode: headers[":status"] || -1,
                    headers: getTransformedHeaders(headers),
                    body: req,
                });
                fulfilled = true;
                resolve({ response: httpResponse });
                if (disableConcurrentStreams) {
                    session.close();
                    this.connectionManager.deleteSession(authority, session);
                }
            });
            if (effectiveRequestTimeout) {
                req.setTimeout(effectiveRequestTimeout, () => {
                    req.close();
                    const timeoutError = new Error(`Stream timed out because of no activity for ${effectiveRequestTimeout} ms`);
                    timeoutError.name = "TimeoutError";
                    rejectWithDestroy(timeoutError);
                });
            }
            if (abortSignal) {
                const onAbort = () => {
                    req.close();
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    rejectWithDestroy(abortError);
                };
                if (typeof abortSignal.addEventListener === "function") {
                    const signal = abortSignal;
                    signal.addEventListener("abort", onAbort, { once: true });
                    req.once("close", () => signal.removeEventListener("abort", onAbort));
                }
                else {
                    abortSignal.onabort = onAbort;
                }
            }
            req.on("frameError", (type, code, id) => {
                rejectWithDestroy(new Error(`Frame type id ${type} in stream id ${id} has failed with code ${code}.`));
            });
            req.on("error", rejectWithDestroy);
            req.on("aborted", () => {
                rejectWithDestroy(new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${req.rstCode}.`));
            });
            req.on("close", () => {
                session.unref();
                if (disableConcurrentStreams) {
                    session.destroy();
                }
                if (!fulfilled) {
                    rejectWithDestroy(new Error("Unexpected error: http2 request did not get a response"));
                }
            });
            writeRequestBodyPromise = writeRequestBody(req, request, effectiveRequestTimeout);
        });
    }
    updateHttpClientConfig(key, value) {
        this.config = undefined;
        this.configProvider = this.configProvider.then((config) => {
            return {
                ...config,
                [key]: value,
            };
        });
    }
    httpHandlerConfigs() {
        return this.config ?? {};
    }
    destroySession(session) {
        if (!session.destroyed) {
            session.destroy();
        }
    }
}

;// ./node_modules/@smithy/node-http-handler/dist-es/stream-collector/collector.js

class Collector extends external_stream_.Writable {
    constructor() {
        super(...arguments);
        this.bufferedBytes = [];
    }
    _write(chunk, encoding, callback) {
        this.bufferedBytes.push(chunk);
        callback();
    }
}

;// ./node_modules/@smithy/node-http-handler/dist-es/stream-collector/index.js

const streamCollector = (stream) => {
    if (isReadableStreamInstance(stream)) {
        return collectReadableStream(stream);
    }
    return new Promise((resolve, reject) => {
        const collector = new Collector();
        stream.pipe(collector);
        stream.on("error", (err) => {
            collector.end();
            reject(err);
        });
        collector.on("error", reject);
        collector.on("finish", function () {
            const bytes = new Uint8Array(Buffer.concat(this.bufferedBytes));
            resolve(bytes);
        });
    });
};
const isReadableStreamInstance = (stream) => typeof ReadableStream === "function" && stream instanceof ReadableStream;
async function collectReadableStream(stream) {
    const chunks = [];
    const reader = stream.getReader();
    let isDone = false;
    let length = 0;
    while (!isDone) {
        const { done, value } = await reader.read();
        if (value) {
            chunks.push(value);
            length += value.length;
        }
        isDone = done;
    }
    const collected = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
        collected.set(chunk, offset);
        offset += chunk.length;
    }
    return collected;
}

;// ./node_modules/@smithy/node-http-handler/dist-es/index.js





/***/ }),

/***/ 3639:
/***/ ((module) => {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && objectToString.call(value) == numberTag);
}

module.exports = isNumber;


/***/ }),

/***/ 3695:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ isArrayBuffer)
/* harmony export */ });
const isArrayBuffer = (arg) => (typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer) ||
    Object.prototype.toString.call(arg) === "[object ArrayBuffer]";


/***/ }),

/***/ 3701:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)
const compare = (a, b, loose) =>
  new SemVer(a, loose).compare(new SemVer(b, loose))

module.exports = compare


/***/ }),

/***/ 3719:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const parse = __webpack_require__(7153)

const diff = (version1, version2) => {
  const v1 = parse(version1, null, true)
  const v2 = parse(version2, null, true)
  const comparison = v1.compare(v2)

  if (comparison === 0) {
    return null
  }

  const v1Higher = comparison > 0
  const highVersion = v1Higher ? v1 : v2
  const lowVersion = v1Higher ? v2 : v1
  const highHasPre = !!highVersion.prerelease.length
  const lowHasPre = !!lowVersion.prerelease.length

  if (lowHasPre && !highHasPre) {
    // Going from prerelease -> no prerelease requires some special casing

    // If the low version has only a major, then it will always be a major
    // Some examples:
    // 1.0.0-1 -> 1.0.0
    // 1.0.0-1 -> 1.1.1
    // 1.0.0-1 -> 2.0.0
    if (!lowVersion.patch && !lowVersion.minor) {
      return 'major'
    }

    // If the main part has no difference
    if (lowVersion.compareMain(highVersion) === 0) {
      if (lowVersion.minor && !lowVersion.patch) {
        return 'minor'
      }
      return 'patch'
    }
  }

  // add the `pre` prefix if we are going to a prerelease version
  const prefix = highHasPre ? 'pre' : ''

  if (v1.major !== v2.major) {
    return prefix + 'major'
  }

  if (v1.minor !== v2.minor) {
    return prefix + 'minor'
  }

  if (v1.patch !== v2.patch) {
    return prefix + 'patch'
  }

  // high and low are preleases
  return 'prerelease'
}

module.exports = diff


/***/ }),

/***/ 3726:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JsonWebTokenError = __webpack_require__(1741);

var NotBeforeError = function (message, date) {
  JsonWebTokenError.call(this, message);
  this.name = 'NotBeforeError';
  this.date = date;
};

NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);

NotBeforeError.prototype.constructor = NotBeforeError;

module.exports = NotBeforeError;

/***/ }),

/***/ 3811:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)
const Range = __webpack_require__(5006)
const minSatisfying = (versions, range, options) => {
  let min = null
  let minSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}
module.exports = minSatisfying


/***/ }),

/***/ 3832:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $Command: () => (/* reexport */ dist_es/* Command */.uB),
  BatchExecuteStatementCommand: () => (/* reexport */ BatchExecuteStatementCommand),
  BatchGetCommand: () => (/* reexport */ BatchGetCommand),
  BatchWriteCommand: () => (/* reexport */ BatchWriteCommand),
  DeleteCommand: () => (/* reexport */ DeleteCommand),
  DynamoDBDocument: () => (/* reexport */ DynamoDBDocument),
  DynamoDBDocumentClient: () => (/* reexport */ DynamoDBDocumentClient),
  DynamoDBDocumentClientCommand: () => (/* reexport */ DynamoDBDocumentClientCommand),
  ExecuteStatementCommand: () => (/* reexport */ ExecuteStatementCommand),
  ExecuteTransactionCommand: () => (/* reexport */ ExecuteTransactionCommand),
  GetCommand: () => (/* reexport */ GetCommand),
  NumberValue: () => (/* reexport */ NumberValue),
  PutCommand: () => (/* reexport */ PutCommand),
  QueryCommand: () => (/* reexport */ QueryCommand),
  ScanCommand: () => (/* reexport */ ScanCommand),
  TransactGetCommand: () => (/* reexport */ TransactGetCommand),
  TransactWriteCommand: () => (/* reexport */ TransactWriteCommand),
  UpdateCommand: () => (/* reexport */ UpdateCommand),
  __Client: () => (/* reexport */ dist_es/* Client */.Kj),
  paginateQuery: () => (/* reexport */ paginateQuery),
  paginateScan: () => (/* reexport */ paginateScan)
});

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/BatchExecuteStatementCommand.js
var commands_BatchExecuteStatementCommand = __webpack_require__(7210);
// EXTERNAL MODULE: ./node_modules/@smithy/smithy-client/dist-es/index.js + 26 modules
var dist_es = __webpack_require__(4820);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/client/setFeature.js
var setFeature = __webpack_require__(3415);
;// ./node_modules/@aws-sdk/util-dynamodb/dist-es/NumberValue.js
class NumberValue {
    value;
    constructor(value) {
        if (typeof value === "object" && "N" in value) {
            this.value = String(value.N);
        }
        else {
            this.value = String(value);
        }
        const valueOf = typeof value.valueOf() === "number" ? value.valueOf() : 0;
        const imprecise = valueOf > Number.MAX_SAFE_INTEGER ||
            valueOf < Number.MIN_SAFE_INTEGER ||
            Math.abs(valueOf) === Infinity ||
            Number.isNaN(valueOf);
        if (imprecise) {
            throw new Error(`NumberValue should not be initialized with an imprecise number=${valueOf}. Use a string instead.`);
        }
    }
    static from(value) {
        return new NumberValue(value);
    }
    toAttributeValue() {
        return {
            N: this.toString(),
        };
    }
    toBigInt() {
        const stringValue = this.toString();
        return BigInt(stringValue);
    }
    toString() {
        return String(this.value);
    }
    valueOf() {
        return this.toString();
    }
}

;// ./node_modules/@aws-sdk/util-dynamodb/dist-es/convertToAttr.js

const convertToAttr = (data, options) => {
    if (data === undefined) {
        throw new Error(`Pass options.removeUndefinedValues=true to remove undefined values from map/array/set.`);
    }
    else if (data === null && typeof data === "object") {
        return convertToNullAttr();
    }
    else if (Array.isArray(data)) {
        return convertToListAttr(data, options);
    }
    else if (data?.constructor?.name === "Set") {
        return convertToSetAttr(data, options);
    }
    else if (data?.constructor?.name === "Map") {
        return convertToMapAttrFromIterable(data, options);
    }
    else if (data?.constructor?.name === "Object" ||
        (!data.constructor && typeof data === "object")) {
        return convertToMapAttrFromEnumerableProps(data, options);
    }
    else if (isBinary(data)) {
        if (data.length === 0 && options?.convertEmptyValues) {
            return convertToNullAttr();
        }
        return convertToBinaryAttr(data);
    }
    else if (typeof data === "boolean" || data?.constructor?.name === "Boolean") {
        return { BOOL: data.valueOf() };
    }
    else if (typeof data === "number" || data?.constructor?.name === "Number") {
        return convertToNumberAttr(data, options);
    }
    else if (data instanceof NumberValue) {
        return data.toAttributeValue();
    }
    else if (typeof data === "bigint") {
        return convertToBigIntAttr(data);
    }
    else if (typeof data === "string" || data?.constructor?.name === "String") {
        if (data.length === 0 && options?.convertEmptyValues) {
            return convertToNullAttr();
        }
        return convertToStringAttr(data);
    }
    else if (options?.convertClassInstanceToMap && typeof data === "object") {
        return convertToMapAttrFromEnumerableProps(data, options);
    }
    throw new Error(`Unsupported type passed: ${data}. Pass options.convertClassInstanceToMap=true to marshall typeof object as map attribute.`);
};
const convertToListAttr = (data, options) => ({
    L: data
        .filter((item) => typeof item !== "function" &&
        (!options?.removeUndefinedValues || (options?.removeUndefinedValues && item !== undefined)))
        .map((item) => convertToAttr(item, options)),
});
const convertToSetAttr = (set, options) => {
    const setToOperate = options?.removeUndefinedValues ? new Set([...set].filter((value) => value !== undefined)) : set;
    if (!options?.removeUndefinedValues && setToOperate.has(undefined)) {
        throw new Error(`Pass options.removeUndefinedValues=true to remove undefined values from map/array/set.`);
    }
    if (setToOperate.size === 0) {
        if (options?.convertEmptyValues) {
            return convertToNullAttr();
        }
        throw new Error(`Pass a non-empty set, or options.convertEmptyValues=true.`);
    }
    const item = setToOperate.values().next().value;
    if (item instanceof NumberValue) {
        return {
            NS: Array.from(setToOperate).map((_) => _.toString()),
        };
    }
    else if (typeof item === "number") {
        return {
            NS: Array.from(setToOperate)
                .map((num) => convertToNumberAttr(num, options))
                .map((item) => item.N),
        };
    }
    else if (typeof item === "bigint") {
        return {
            NS: Array.from(setToOperate)
                .map(convertToBigIntAttr)
                .map((item) => item.N),
        };
    }
    else if (typeof item === "string") {
        return {
            SS: Array.from(setToOperate)
                .map(convertToStringAttr)
                .map((item) => item.S),
        };
    }
    else if (isBinary(item)) {
        return {
            BS: Array.from(setToOperate)
                .map(convertToBinaryAttr)
                .map((item) => item.B),
        };
    }
    else {
        throw new Error(`Only Number Set (NS), Binary Set (BS) or String Set (SS) are allowed.`);
    }
};
const convertToMapAttrFromIterable = (data, options) => ({
    M: ((data) => {
        const map = {};
        for (const [key, value] of data) {
            if (typeof value !== "function" && (value !== undefined || !options?.removeUndefinedValues)) {
                map[key] = convertToAttr(value, options);
            }
        }
        return map;
    })(data),
});
const convertToMapAttrFromEnumerableProps = (data, options) => ({
    M: ((data) => {
        const map = {};
        for (const key in data) {
            const value = data[key];
            if (typeof value !== "function" && (value !== undefined || !options?.removeUndefinedValues)) {
                map[key] = convertToAttr(value, options);
            }
        }
        return map;
    })(data),
});
const convertToNullAttr = () => ({ NULL: true });
const convertToBinaryAttr = (data) => ({ B: data });
const convertToStringAttr = (data) => ({ S: data.toString() });
const convertToBigIntAttr = (data) => ({ N: data.toString() });
const validateBigIntAndThrow = (errorPrefix) => {
    throw new Error(`${errorPrefix} Use NumberValue from @aws-sdk/lib-dynamodb.`);
};
const convertToNumberAttr = (num, options) => {
    if ([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
        .map((val) => val.toString())
        .includes(num.toString())) {
        throw new Error(`Special numeric value ${num.toString()} is not allowed`);
    }
    else if (!options?.allowImpreciseNumbers) {
        if (Number(num) > Number.MAX_SAFE_INTEGER) {
            validateBigIntAndThrow(`Number ${num.toString()} is greater than Number.MAX_SAFE_INTEGER.`);
        }
        else if (Number(num) < Number.MIN_SAFE_INTEGER) {
            validateBigIntAndThrow(`Number ${num.toString()} is lesser than Number.MIN_SAFE_INTEGER.`);
        }
    }
    return { N: num.toString() };
};
const isBinary = (data) => {
    const binaryTypes = [
        "ArrayBuffer",
        "Blob",
        "Buffer",
        "DataView",
        "File",
        "Int8Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "Int16Array",
        "Uint16Array",
        "Int32Array",
        "Uint32Array",
        "Float32Array",
        "Float64Array",
        "BigInt64Array",
        "BigUint64Array",
    ];
    if (data?.constructor) {
        return binaryTypes.includes(data.constructor.name);
    }
    return false;
};

;// ./node_modules/@aws-sdk/util-dynamodb/dist-es/marshall.js

function marshall(data, options) {
    const attributeValue = convertToAttr(data, options);
    const [key, value] = Object.entries(attributeValue)[0];
    switch (key) {
        case "M":
        case "L":
            return options?.convertTopLevelContainer ? attributeValue : value;
        case "SS":
        case "NS":
        case "BS":
        case "S":
        case "N":
        case "B":
        case "NULL":
        case "BOOL":
        case "$unknown":
        default:
            return attributeValue;
    }
}

;// ./node_modules/@aws-sdk/util-dynamodb/dist-es/convertToNative.js

const convertToNative = (data, options) => {
    for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
            switch (key) {
                case "NULL":
                    return null;
                case "BOOL":
                    return Boolean(value);
                case "N":
                    return convertNumber(value, options);
                case "B":
                    return convertBinary(value);
                case "S":
                    return convertString(value);
                case "L":
                    return convertList(value, options);
                case "M":
                    return convertMap(value, options);
                case "NS":
                    return new Set(value.map((item) => convertNumber(item, options)));
                case "BS":
                    return new Set(value.map(convertBinary));
                case "SS":
                    return new Set(value.map(convertString));
                default:
                    throw new Error(`Unsupported type passed: ${key}`);
            }
        }
    }
    throw new Error(`No value defined: ${JSON.stringify(data)}`);
};
const convertNumber = (numString, options) => {
    if (typeof options?.wrapNumbers === "function") {
        return options?.wrapNumbers(numString);
    }
    if (options?.wrapNumbers) {
        return NumberValue.from(numString);
    }
    const num = Number(numString);
    const infinityValues = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
    const isLargeFiniteNumber = (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) && !infinityValues.includes(num);
    if (isLargeFiniteNumber) {
        if (typeof BigInt === "function") {
            try {
                return BigInt(numString);
            }
            catch (error) {
                throw new Error(`${numString} can't be converted to BigInt. Set options.wrapNumbers to get string value.`);
            }
        }
        else {
            throw new Error(`${numString} is outside SAFE_INTEGER bounds. Set options.wrapNumbers to get string value.`);
        }
    }
    return num;
};
const convertString = (stringValue) => stringValue;
const convertBinary = (binaryValue) => binaryValue;
const convertList = (list, options) => list.map((item) => convertToNative(item, options));
const convertMap = (map, options) => Object.entries(map).reduce((acc, [key, value]) => ((acc[key] = convertToNative(value, options)), acc), {});

;// ./node_modules/@aws-sdk/util-dynamodb/dist-es/unmarshall.js

const unmarshall = (data, options) => {
    if (options?.convertWithoutMapWrapper) {
        return convertToNative(data, options);
    }
    return convertToNative({ M: data }, options);
};

;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/utils.js

const SELF = null;
const ALL_VALUES = {};
const ALL_MEMBERS = [];
const NEXT_LEVEL = "*";
const processObj = (obj, processFunc, keyNodes) => {
    if (obj !== undefined) {
        if (keyNodes == null) {
            return processFunc(obj);
        }
        else {
            const keys = Object.keys(keyNodes);
            const goToNextLevel = keys.length === 1 && keys[0] === NEXT_LEVEL;
            const someChildren = keys.length >= 1 && !goToNextLevel;
            const allChildren = keys.length === 0;
            if (someChildren) {
                return processKeysInObj(obj, processFunc, keyNodes);
            }
            else if (allChildren) {
                return processAllKeysInObj(obj, processFunc, SELF);
            }
            else if (goToNextLevel) {
                return Object.entries(obj ?? {}).reduce((acc, [k, v]) => {
                    if (typeof v !== "function") {
                        acc[k] = processObj(v, processFunc, keyNodes[NEXT_LEVEL]);
                    }
                    return acc;
                }, (Array.isArray(obj) ? [] : {}));
            }
        }
    }
    return undefined;
};
const processKeysInObj = (obj, processFunc, keyNodes) => {
    let accumulator;
    if (Array.isArray(obj)) {
        accumulator = obj.filter((item) => typeof item !== "function");
    }
    else {
        accumulator = {};
        for (const [k, v] of Object.entries(obj)) {
            if (typeof v !== "function") {
                accumulator[k] = v;
            }
        }
    }
    for (const [nodeKey, nodes] of Object.entries(keyNodes)) {
        if (typeof obj[nodeKey] === "function") {
            continue;
        }
        const processedValue = processObj(obj[nodeKey], processFunc, nodes);
        if (processedValue !== undefined && typeof processedValue !== "function") {
            accumulator[nodeKey] = processedValue;
        }
    }
    return accumulator;
};
const processAllKeysInObj = (obj, processFunc, keyNodes) => {
    if (Array.isArray(obj)) {
        return obj.filter((item) => typeof item !== "function").map((item) => processObj(item, processFunc, keyNodes));
    }
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (typeof value === "function") {
            return acc;
        }
        const processedValue = processObj(value, processFunc, keyNodes);
        if (processedValue !== undefined && typeof processedValue !== "function") {
            acc[key] = processedValue;
        }
        return acc;
    }, {});
};
const marshallInput = (obj, keyNodes, options) => {
    const marshallFunc = (toMarshall) => marshall(toMarshall, options);
    return processKeysInObj(obj, marshallFunc, keyNodes);
};
const unmarshallOutput = (obj, keyNodes, options) => {
    const unmarshallFunc = (toMarshall) => unmarshall(toMarshall, options);
    return processKeysInObj(obj, unmarshallFunc, keyNodes);
};

;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/baseCommand/DynamoDBDocumentClientCommand.js



class DynamoDBDocumentClientCommand extends dist_es/* Command */.uB {
    addMarshallingMiddleware(configuration) {
        const { marshallOptions = {}, unmarshallOptions = {} } = configuration.translateConfig || {};
        marshallOptions.convertTopLevelContainer = marshallOptions.convertTopLevelContainer ?? true;
        unmarshallOptions.convertWithoutMapWrapper = unmarshallOptions.convertWithoutMapWrapper ?? true;
        this.clientCommand.middlewareStack.addRelativeTo((next, context) => async (args) => {
            (0,setFeature/* setFeature */.J)(context, "DDB_MAPPER", "d");
            return next({
                ...args,
                input: marshallInput(args.input, this.inputKeyNodes, marshallOptions),
            });
        }, {
            name: "DocumentMarshall",
            relation: "before",
            toMiddleware: "serializerMiddleware",
            override: true,
        });
        this.clientCommand.middlewareStack.addRelativeTo((next, context) => async (args) => {
            const deserialized = await next(args);
            deserialized.output = unmarshallOutput(deserialized.output, this.outputKeyNodes, unmarshallOptions);
            return deserialized;
        }, {
            name: "DocumentUnmarshall",
            relation: "before",
            toMiddleware: "deserializerMiddleware",
            override: true,
        });
    }
}

;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/BatchExecuteStatementCommand.js





class BatchExecuteStatementCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        Statements: {
            "*": {
                Parameters: ALL_MEMBERS,
            },
        },
    };
    outputKeyNodes = {
        Responses: {
            "*": {
                Error: {
                    Item: ALL_VALUES,
                },
                Item: ALL_VALUES,
            },
        },
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new commands_BatchExecuteStatementCommand/* BatchExecuteStatementCommand */.e(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/BatchGetItemCommand.js
var BatchGetItemCommand = __webpack_require__(9051);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/BatchGetCommand.js





class BatchGetCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        RequestItems: {
            "*": {
                Keys: {
                    "*": ALL_VALUES,
                },
            },
        },
    };
    outputKeyNodes = {
        Responses: {
            "*": {
                "*": ALL_VALUES,
            },
        },
        UnprocessedKeys: {
            "*": {
                Keys: {
                    "*": ALL_VALUES,
                },
            },
        },
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new BatchGetItemCommand/* BatchGetItemCommand */.X(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/BatchWriteItemCommand.js
var BatchWriteItemCommand = __webpack_require__(8822);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/BatchWriteCommand.js





class BatchWriteCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        RequestItems: {
            "*": {
                "*": {
                    PutRequest: {
                        Item: ALL_VALUES,
                    },
                    DeleteRequest: {
                        Key: ALL_VALUES,
                    },
                },
            },
        },
    };
    outputKeyNodes = {
        UnprocessedItems: {
            "*": {
                "*": {
                    PutRequest: {
                        Item: ALL_VALUES,
                    },
                    DeleteRequest: {
                        Key: ALL_VALUES,
                    },
                },
            },
        },
        ItemCollectionMetrics: {
            "*": {
                "*": {
                    ItemCollectionKey: ALL_VALUES,
                },
            },
        },
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new BatchWriteItemCommand/* BatchWriteItemCommand */.S(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DeleteItemCommand.js
var DeleteItemCommand = __webpack_require__(7610);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/DeleteCommand.js





class DeleteCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        Key: ALL_VALUES,
        Expected: {
            "*": {
                Value: SELF,
                AttributeValueList: ALL_MEMBERS,
            },
        },
        ExpressionAttributeValues: ALL_VALUES,
    };
    outputKeyNodes = {
        Attributes: ALL_VALUES,
        ItemCollectionMetrics: {
            ItemCollectionKey: ALL_VALUES,
        },
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new DeleteItemCommand/* DeleteItemCommand */.P(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ExecuteStatementCommand.js
var commands_ExecuteStatementCommand = __webpack_require__(7042);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/ExecuteStatementCommand.js





class ExecuteStatementCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        Parameters: ALL_MEMBERS,
    };
    outputKeyNodes = {
        Items: {
            "*": ALL_VALUES,
        },
        LastEvaluatedKey: ALL_VALUES,
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new commands_ExecuteStatementCommand/* ExecuteStatementCommand */.c(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ExecuteTransactionCommand.js
var commands_ExecuteTransactionCommand = __webpack_require__(3325);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/ExecuteTransactionCommand.js





class ExecuteTransactionCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        TransactStatements: {
            "*": {
                Parameters: ALL_MEMBERS,
            },
        },
    };
    outputKeyNodes = {
        Responses: {
            "*": {
                Item: ALL_VALUES,
            },
        },
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new commands_ExecuteTransactionCommand/* ExecuteTransactionCommand */.P(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/GetItemCommand.js
var GetItemCommand = __webpack_require__(931);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/GetCommand.js





class GetCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        Key: ALL_VALUES,
    };
    outputKeyNodes = {
        Item: ALL_VALUES,
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new GetItemCommand/* GetItemCommand */.Z(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/PutItemCommand.js
var PutItemCommand = __webpack_require__(1908);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/PutCommand.js





class PutCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        Item: ALL_VALUES,
        Expected: {
            "*": {
                Value: SELF,
                AttributeValueList: ALL_MEMBERS,
            },
        },
        ExpressionAttributeValues: ALL_VALUES,
    };
    outputKeyNodes = {
        Attributes: ALL_VALUES,
        ItemCollectionMetrics: {
            ItemCollectionKey: ALL_VALUES,
        },
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new PutItemCommand/* PutItemCommand */.q(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/QueryCommand.js
var commands_QueryCommand = __webpack_require__(1570);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/QueryCommand.js





class QueryCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        KeyConditions: {
            "*": {
                AttributeValueList: ALL_MEMBERS,
            },
        },
        QueryFilter: {
            "*": {
                AttributeValueList: ALL_MEMBERS,
            },
        },
        ExclusiveStartKey: ALL_VALUES,
        ExpressionAttributeValues: ALL_VALUES,
    };
    outputKeyNodes = {
        Items: {
            "*": ALL_VALUES,
        },
        LastEvaluatedKey: ALL_VALUES,
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new commands_QueryCommand/* QueryCommand */.s(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ScanCommand.js
var commands_ScanCommand = __webpack_require__(4517);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/ScanCommand.js





class ScanCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        ScanFilter: {
            "*": {
                AttributeValueList: ALL_MEMBERS,
            },
        },
        ExclusiveStartKey: ALL_VALUES,
        ExpressionAttributeValues: ALL_VALUES,
    };
    outputKeyNodes = {
        Items: {
            "*": ALL_VALUES,
        },
        LastEvaluatedKey: ALL_VALUES,
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new commands_ScanCommand/* ScanCommand */.Z(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/TransactGetItemsCommand.js
var TransactGetItemsCommand = __webpack_require__(7648);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/TransactGetCommand.js





class TransactGetCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        TransactItems: {
            "*": {
                Get: {
                    Key: ALL_VALUES,
                },
            },
        },
    };
    outputKeyNodes = {
        Responses: {
            "*": {
                Item: ALL_VALUES,
            },
        },
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new TransactGetItemsCommand/* TransactGetItemsCommand */.S(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/TransactWriteItemsCommand.js
var TransactWriteItemsCommand = __webpack_require__(1691);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/TransactWriteCommand.js





class TransactWriteCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        TransactItems: {
            "*": {
                ConditionCheck: {
                    Key: ALL_VALUES,
                    ExpressionAttributeValues: ALL_VALUES,
                },
                Put: {
                    Item: ALL_VALUES,
                    ExpressionAttributeValues: ALL_VALUES,
                },
                Delete: {
                    Key: ALL_VALUES,
                    ExpressionAttributeValues: ALL_VALUES,
                },
                Update: {
                    Key: ALL_VALUES,
                    ExpressionAttributeValues: ALL_VALUES,
                },
            },
        },
    };
    outputKeyNodes = {
        ItemCollectionMetrics: {
            "*": {
                "*": {
                    ItemCollectionKey: ALL_VALUES,
                },
            },
        },
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new TransactWriteItemsCommand/* TransactWriteItemsCommand */.D(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/UpdateItemCommand.js
var UpdateItemCommand = __webpack_require__(2692);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/UpdateCommand.js





class UpdateCommand extends DynamoDBDocumentClientCommand {
    input;
    inputKeyNodes = {
        Key: ALL_VALUES,
        AttributeUpdates: {
            "*": {
                Value: SELF,
            },
        },
        Expected: {
            "*": {
                Value: SELF,
                AttributeValueList: ALL_MEMBERS,
            },
        },
        ExpressionAttributeValues: ALL_VALUES,
    };
    outputKeyNodes = {
        Attributes: ALL_VALUES,
        ItemCollectionMetrics: {
            ItemCollectionKey: ALL_VALUES,
        },
    };
    clientCommand;
    middlewareStack;
    constructor(input) {
        super();
        this.input = input;
        this.clientCommand = new UpdateItemCommand/* UpdateItemCommand */.C(this.input);
        this.middlewareStack = this.clientCommand.middlewareStack;
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.addMarshallingMiddleware(configuration);
        const stack = clientStack.concat(this.middlewareStack);
        const handler = this.clientCommand.resolveMiddleware(stack, configuration, options);
        return async () => handler(this.clientCommand);
    }
}

;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/DynamoDBDocumentClient.js


class DynamoDBDocumentClient extends dist_es/* Client */.Kj {
    config;
    constructor(client, translateConfig) {
        super(client.config);
        this.config = client.config;
        this.config.translateConfig = translateConfig;
        this.middlewareStack = client.middlewareStack;
        if (this.config?.cacheMiddleware) {
            throw new Error("@aws-sdk/lib-dynamodb - cacheMiddleware=true is not compatible with the" +
                " DynamoDBDocumentClient. This option must be set to false.");
        }
    }
    static from(client, translateConfig) {
        return new DynamoDBDocumentClient(client, translateConfig);
    }
    destroy() {
    }
}

;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/DynamoDBDocument.js














class DynamoDBDocument extends DynamoDBDocumentClient {
    static from(client, translateConfig) {
        return new DynamoDBDocument(client, translateConfig);
    }
    batchExecuteStatement(args, optionsOrCb, cb) {
        const command = new BatchExecuteStatementCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    batchGet(args, optionsOrCb, cb) {
        const command = new BatchGetCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    batchWrite(args, optionsOrCb, cb) {
        const command = new BatchWriteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    delete(args, optionsOrCb, cb) {
        const command = new DeleteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    executeStatement(args, optionsOrCb, cb) {
        const command = new ExecuteStatementCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    executeTransaction(args, optionsOrCb, cb) {
        const command = new ExecuteTransactionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    get(args, optionsOrCb, cb) {
        const command = new GetCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    put(args, optionsOrCb, cb) {
        const command = new PutCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    query(args, optionsOrCb, cb) {
        const command = new QueryCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    scan(args, optionsOrCb, cb) {
        const command = new ScanCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    transactGet(args, optionsOrCb, cb) {
        const command = new TransactGetCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    transactWrite(args, optionsOrCb, cb) {
        const command = new TransactWriteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    update(args, optionsOrCb, cb) {
        const command = new UpdateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object") {
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            }
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}

;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/commands/index.js














// EXTERNAL MODULE: ./node_modules/@smithy/core/dist-es/pagination/createPaginator.js
var createPaginator = __webpack_require__(2809);
;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/pagination/QueryPaginator.js



const paginateQuery = (0,createPaginator/* createPaginator */.K)(DynamoDBDocumentClient, QueryCommand, "ExclusiveStartKey", "LastEvaluatedKey", "Limit");

;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/pagination/ScanPaginator.js



const paginateScan = (0,createPaginator/* createPaginator */.K)(DynamoDBDocumentClient, ScanCommand, "ExclusiveStartKey", "LastEvaluatedKey", "Limit");

;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/pagination/index.js




;// ./node_modules/@aws-sdk/lib-dynamodb/dist-es/index.js







/***/ }),

/***/ 3920:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handler = void 0;
const lib_dynamodb_1 = __webpack_require__(3832);
const config_1 = __webpack_require__(7028);
const jwt = __importStar(__webpack_require__(4040));
const uuid_1 = __webpack_require__(881);
const logger_1 = __webpack_require__(2556);
const TABLE = process.env.APPOINTMENTS_TABLE || "AppointmentsTable";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const doc = (0, config_1.getDynamoDBClient)();
const logger = (0, logger_1.createLogger)(process.env.SERVICE_NAME || 'appointments');
// Ensure DynamoDB is using local endpoint in test environment
if (process.env.DYNAMODB_ENDPOINT) {
    logger.info("Using local DynamoDB endpoint", { endpoint: process.env.DYNAMODB_ENDPOINT });
}
function jsonResponse(statusCode, body) {
    return {
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    };
}
function verifyAuth(event) {
    const auth = event.headers?.authorization || event.headers?.Authorization;
    if (!auth)
        return null;
    const match = auth.match(/^Bearer\s+(.+)$/i);
    if (!match)
        return null;
    try {
        return jwt.verify(match[1], JWT_SECRET);
    }
    catch (e) {
        return null;
    }
}
function validateAppointmentData(data) {
    const errors = [];
    if (!data.patientId || data.patientId.trim().length === 0) {
        errors.push("Patient ID is required");
    }
    if (!data.doctorId || data.doctorId.trim().length === 0) {
        errors.push("Doctor ID is required");
    }
    if (!data.scheduleDate) {
        errors.push("Schedule date is required");
    }
    else {
        const scheduleDate = new Date(data.scheduleDate);
        if (isNaN(scheduleDate.getTime())) {
            errors.push("Invalid schedule date format");
        }
        else if (scheduleDate < new Date()) {
            errors.push("Schedule date cannot be in the past");
        }
    }
    if (data.duration !== undefined && (data.duration < 15 || data.duration > 180)) {
        errors.push("Duration must be between 15 and 180 minutes");
    }
    if (data.paymentAmount !== undefined && data.paymentAmount < 0) {
        errors.push("Payment amount cannot be negative");
    }
    return errors;
}
function parseFilters(queryParams) {
    const filters = {};
    if (!queryParams)
        return filters;
    if (queryParams.status) {
        const statuses = queryParams.status.split(',');
        filters.status = statuses.length === 1 ? statuses[0] : statuses;
    }
    if (queryParams.fromDate) {
        filters.fromDate = queryParams.fromDate;
    }
    if (queryParams.toDate) {
        filters.toDate = queryParams.toDate;
    }
    if (queryParams.patientId) {
        filters.patientId = queryParams.patientId;
    }
    if (queryParams.doctorId) {
        filters.doctorId = queryParams.doctorId;
    }
    return filters;
}
async function getFilteredAppointments(filters) {
    let appointments = [];
    if (filters.patientId) {
        // Query by patient index
        const result = await doc.send(new lib_dynamodb_1.QueryCommand({
            TableName: TABLE,
            IndexName: "patient-index",
            KeyConditionExpression: "patientId = :patientId",
            ExpressionAttributeValues: { ":patientId": filters.patientId }
        }));
        appointments = result.Items || [];
    }
    else if (filters.doctorId) {
        // Query by doctor index
        const result = await doc.send(new lib_dynamodb_1.QueryCommand({
            TableName: TABLE,
            IndexName: "doctor-index",
            KeyConditionExpression: "doctorId = :doctorId",
            ExpressionAttributeValues: { ":doctorId": filters.doctorId }
        }));
        appointments = result.Items || [];
    }
    else {
        // Scan all appointments
        const result = await doc.send(new lib_dynamodb_1.ScanCommand({ TableName: TABLE }));
        appointments = result.Items || [];
    }
    // Apply additional filters
    return appointments.filter(appointment => {
        // Status filter
        if (filters.status) {
            const statusArray = Array.isArray(filters.status) ? filters.status : [filters.status];
            if (!statusArray.includes(appointment.appointmentStatus)) {
                return false;
            }
        }
        // Date range filter
        if (filters.fromDate && appointment.scheduleDate < filters.fromDate) {
            return false;
        }
        if (filters.toDate && appointment.scheduleDate > filters.toDate) {
            return false;
        }
        return true;
    });
}
const handlerImpl = async (event) => {
    const path = event.rawPath || event.requestContext.http?.path || "/";
    const method = event.requestContext.http?.method || event.requestContext?.http?.method;
    const requestId = event.requestContext.requestId;
    const logContext = {
        requestId,
        path,
        method,
        userAgent: event.headers?.['user-agent'],
        ip: event.requestContext?.http?.sourceIp
    };
    try {
        // Create a new appointment
        if (path === "/appointments" && method === "POST") {
            const monitor = new logger_1.PerformanceMonitor(logger, 'create_appointment', logContext);
            const body = event.body ? JSON.parse(event.body) : {};
            const validationErrors = validateAppointmentData(body);
            if (validationErrors.length > 0) {
                logger.logValidationError(validationErrors, logContext);
                monitor.end(false);
                return jsonResponse(400, { message: "Validation failed", errors: validationErrors });
            }
            const appointmentId = (0, uuid_1.v4)();
            const now = new Date().toISOString();
            const appointmentContext = { ...logContext, appointmentId, patientId: body.patientId, doctorId: body.doctorId };
            logger.info('Processing appointment creation request', appointmentContext);
            const appointment = {
                appointmentId,
                patientId: body.patientId,
                doctorId: body.doctorId,
                appointmentStatus: 'scheduled',
                scheduleDate: body.scheduleDate,
                duration: body.duration || 30,
                videoLink: body.videoLink,
                paymentId: body.paymentId,
                paymentStatus: body.paymentStatus || 'pending',
                paymentAmount: body.paymentAmount,
                notes: body.notes,
                symptoms: body.symptoms || [],
                createdAt: now
            };
            const dbStart = Date.now();
            await doc.send(new lib_dynamodb_1.PutCommand({ TableName: TABLE, Item: appointment }));
            logger.logDatabaseOperation('put', TABLE, true, Date.now() - dbStart, appointmentContext);
            logger.logBusinessLogic('appointment_creation', true, {
                appointmentId,
                patientId: body.patientId,
                doctorId: body.doctorId,
                scheduleDate: body.scheduleDate
            }, appointmentContext);
            monitor.end(true, { appointmentId });
            return jsonResponse(201, { appointmentId, message: "Appointment created successfully" });
        }
        // Get all appointments with filters
        if (path === "/appointments" && method === "GET") {
            const monitor = new logger_1.PerformanceMonitor(logger, 'get_appointments', logContext);
            const filters = parseFilters(event.queryStringParameters || null);
            logger.info('Fetching appointments with filters', { ...logContext, filters });
            const appointments = await getFilteredAppointments(filters);
            monitor.end(true, { itemCount: appointments.length });
            return jsonResponse(200, { appointments });
        }
        // Get appointments for a specific patient
        if (path === "/appointments/patient" && method === "GET") {
            const monitor = new logger_1.PerformanceMonitor(logger, 'get_patient_appointments', logContext);
            const patientId = (event.queryStringParameters || {})["patientId"];
            if (!patientId) {
                logger.logValidationError(['patientId query parameter required'], logContext);
                monitor.end(false);
                return jsonResponse(400, { message: "patientId query parameter is required" });
            }
            const patientContext = { ...logContext, patientId };
            logger.info('Fetching appointments for patient', patientContext);
            const filters = parseFilters(event.queryStringParameters || null);
            filters.patientId = patientId;
            const appointments = await getFilteredAppointments(filters);
            monitor.end(true, { itemCount: appointments.length });
            return jsonResponse(200, { appointments });
        }
        // Get appointments for a specific doctor
        if (path === "/appointments/doctor" && method === "GET") {
            const monitor = new logger_1.PerformanceMonitor(logger, 'get_doctor_appointments', logContext);
            const doctorId = (event.queryStringParameters || {})["doctorId"];
            if (!doctorId) {
                logger.logValidationError(['doctorId query parameter required'], logContext);
                monitor.end(false);
                return jsonResponse(400, { message: "doctorId query parameter is required" });
            }
            const doctorContext = { ...logContext, doctorId };
            logger.info('Fetching appointments for doctor', doctorContext);
            const filters = parseFilters(event.queryStringParameters || null);
            filters.doctorId = doctorId;
            const appointments = await getFilteredAppointments(filters);
            monitor.end(true, { itemCount: appointments.length });
            return jsonResponse(200, { appointments });
        }
        // Handle appointment-specific routes
        const appointmentIdMatch = path.match(/^\/appointments\/([^\/]+)(\/.*)?$/);
        if (appointmentIdMatch) {
            const appointmentId = decodeURIComponent(appointmentIdMatch[1]);
            const subPath = appointmentIdMatch[2] || "";
            const appointmentContext = { ...logContext, appointmentId };
            // Get specific appointment details
            if (subPath === "" && method === "GET") {
                const monitor = new logger_1.PerformanceMonitor(logger, 'get_appointment', appointmentContext);
                logger.info('Fetching appointment details', appointmentContext);
                const dbStart = Date.now();
                const result = await doc.send(new lib_dynamodb_1.GetCommand({
                    TableName: TABLE,
                    Key: { appointmentId }
                }));
                logger.logDatabaseOperation('get', TABLE, true, Date.now() - dbStart, appointmentContext);
                if (!result.Item) {
                    logger.warn('Appointment not found', appointmentContext);
                    monitor.end(false);
                    return jsonResponse(404, { message: "Appointment not found" });
                }
                const appointment = result.Item;
                const fullContext = { ...appointmentContext, patientId: appointment.patientId, doctorId: appointment.doctorId };
                monitor.end(true);
                return jsonResponse(200, result.Item);
            }
            // Update appointment
            if (subPath === "" && method === "PUT") {
                const monitor = new logger_1.PerformanceMonitor(logger, 'update_appointment', appointmentContext);
                const body = event.body ? JSON.parse(event.body) : {};
                const updateData = body;
                logger.info('Updating appointment', { ...appointmentContext, fieldsToUpdate: Object.keys(body) });
                // Build update expression
                const expressions = [];
                const attrVals = {};
                const attrNames = {};
                let i = 0;
                for (const [key, value] of Object.entries(updateData)) {
                    if (value !== undefined) {
                        i++;
                        const nameKey = `#n${i}`;
                        const valKey = `:v${i}`;
                        expressions.push(`${nameKey} = ${valKey}`);
                        attrNames[nameKey] = key;
                        attrVals[valKey] = value;
                    }
                }
                if (expressions.length === 0) {
                    logger.logValidationError(['no fields to update'], appointmentContext);
                    monitor.end(false);
                    return jsonResponse(400, { message: "No fields to update" });
                }
                // Add updatedAt timestamp
                i++;
                expressions.push(`#n${i} = :v${i}`);
                attrNames[`#n${i}`] = "updatedAt";
                attrVals[`:v${i}`] = new Date().toISOString();
                // If cancelling, add cancellation timestamp
                if (updateData.appointmentStatus === 'cancelled') {
                    i++;
                    expressions.push(`#n${i} = :v${i}`);
                    attrNames[`#n${i}`] = "cancelledAt";
                    attrVals[`:v${i}`] = new Date().toISOString();
                }
                const updateExpr = "SET " + expressions.join(", ");
                const dbStart = Date.now();
                await doc.send(new lib_dynamodb_1.UpdateCommand({
                    TableName: TABLE,
                    Key: { appointmentId },
                    UpdateExpression: updateExpr,
                    ExpressionAttributeNames: attrNames,
                    ExpressionAttributeValues: attrVals
                }));
                logger.logDatabaseOperation('update', TABLE, true, Date.now() - dbStart, appointmentContext);
                logger.logBusinessLogic('appointment_update', true, { fieldsUpdated: Object.keys(body) }, appointmentContext);
                monitor.end(true);
                return jsonResponse(200, { message: "Appointment updated successfully" });
            }
            // Delete appointment (cancel)
            if (subPath === "" && method === "DELETE") {
                const monitor = new logger_1.PerformanceMonitor(logger, 'cancel_appointment', appointmentContext);
                const queryParams = event.queryStringParameters || {};
                const patientId = queryParams.patientId;
                if (!patientId) {
                    logger.logValidationError(['patientId query parameter required for cancellation'], appointmentContext);
                    monitor.end(false);
                    return jsonResponse(400, { message: "patientId query parameter is required for cancellation" });
                }
                const fullContext = { ...appointmentContext, patientId };
                logger.info('Processing appointment cancellation', fullContext);
                // First get the appointment to verify it exists and belongs to the patient
                const dbStart = Date.now();
                const result = await doc.send(new lib_dynamodb_1.GetCommand({
                    TableName: TABLE,
                    Key: { appointmentId }
                }));
                logger.logDatabaseOperation('get', TABLE, true, Date.now() - dbStart, appointmentContext);
                if (!result.Item) {
                    logger.warn('Appointment not found for cancellation', fullContext);
                    monitor.end(false);
                    return jsonResponse(404, { message: "Appointment not found" });
                }
                const appointment = result.Item;
                if (appointment.patientId !== patientId) {
                    logger.warn('Unauthorized cancellation attempt', { ...fullContext, actualPatientId: appointment.patientId });
                    monitor.end(false);
                    return jsonResponse(403, { message: "You can only cancel your own appointments" });
                }
                if (appointment.appointmentStatus === 'cancelled') {
                    logger.warn('Attempt to cancel already cancelled appointment', fullContext);
                    monitor.end(false);
                    return jsonResponse(400, { message: "Appointment is already cancelled" });
                }
                if (appointment.appointmentStatus === 'completed') {
                    logger.warn('Attempt to cancel completed appointment', fullContext);
                    monitor.end(false);
                    return jsonResponse(400, { message: "Cannot cancel a completed appointment" });
                }
                // Update appointment status to cancelled instead of deleting
                const now = new Date().toISOString();
                const updateStart = Date.now();
                await doc.send(new lib_dynamodb_1.UpdateCommand({
                    TableName: TABLE,
                    Key: { appointmentId },
                    UpdateExpression: "SET appointmentStatus = :status, cancelledAt = :cancelledAt, cancelledBy = :cancelledBy, updatedAt = :updatedAt",
                    ExpressionAttributeValues: {
                        ":status": "cancelled",
                        ":cancelledAt": now,
                        ":cancelledBy": patientId,
                        ":updatedAt": now
                    }
                }));
                logger.logDatabaseOperation('update', TABLE, true, Date.now() - updateStart, fullContext);
                logger.logBusinessLogic('appointment_cancellation', true, { cancelledBy: patientId }, fullContext);
                monitor.end(true);
                return jsonResponse(200, { message: "Appointment cancelled successfully" });
            }
        }
        logger.warn('Route not found', logContext);
        return jsonResponse(404, { message: "Route not found" });
    }
    catch (err) {
        logger.error('Unhandled error in handler', logContext, err);
        return jsonResponse(500, {
            message: "Internal server error",
            error: err.message
        });
    }
};
// Export handler with logging middleware
exports.handler = (0, logger_1.withLogging)(handlerImpl, logger);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0RBTytCO0FBQy9CLHFDQUE2QztBQUM3QyxrREFBb0M7QUFDcEMsK0JBQW9DO0FBUXBDLG1EQUF1RjtBQUV2RixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixJQUFJLG1CQUFtQixDQUFDO0FBQ3BFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLFlBQVksQ0FBQztBQUUxRCxNQUFNLEdBQUcsR0FBRyxJQUFBLDBCQUFpQixHQUFFLENBQUM7QUFDaEMsTUFBTSxNQUFNLEdBQUcsSUFBQSxxQkFBWSxFQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLGNBQWMsQ0FBQyxDQUFDO0FBRXhFLDhEQUE4RDtBQUM5RCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBQzVGLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxVQUFrQixFQUFFLElBQVM7SUFDakQsT0FBTztRQUNMLFVBQVU7UUFDVixPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUU7UUFDL0MsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0tBQzNCLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsS0FBNkI7SUFDL0MsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxhQUFhLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUM7SUFDMUUsSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPLElBQUksQ0FBQztJQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLElBQUksQ0FBQztJQUN4QixJQUFJLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBUSxDQUFDO0lBQ2pELENBQUM7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQVMsdUJBQXVCLENBQUMsSUFBOEI7SUFDN0QsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBRTVCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMzQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE1BQU0sWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqRCxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM5QyxDQUFDO2FBQU0sSUFBSSxZQUFZLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUNyRCxDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDL0UsTUFBTSxDQUFDLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsV0FBc0Q7SUFDMUUsTUFBTSxPQUFPLEdBQXVCLEVBQUUsQ0FBQztJQUV2QyxJQUFJLENBQUMsV0FBVztRQUFFLE9BQU8sT0FBTyxDQUFDO0lBRWpDLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBd0IsQ0FBQztRQUN0RSxPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNsRSxDQUFDO0lBRUQsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekIsT0FBTyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQzFDLENBQUM7SUFFRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDdEMsQ0FBQztJQUVELElBQUksV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekIsT0FBTyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQzFDLENBQUM7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsS0FBSyxVQUFVLHVCQUF1QixDQUFDLE9BQTJCO0lBQ2hFLElBQUksWUFBWSxHQUFrQixFQUFFLENBQUM7SUFFckMsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEIseUJBQXlCO1FBQ3pCLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLDJCQUFZLENBQUM7WUFDN0MsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLGVBQWU7WUFDMUIsc0JBQXNCLEVBQUUsd0JBQXdCO1lBQ2hELHlCQUF5QixFQUFFLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUU7U0FDL0QsQ0FBQyxDQUFDLENBQUM7UUFDSixZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQXNCLElBQUksRUFBRSxDQUFDO0lBQ3JELENBQUM7U0FBTSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1Qix3QkFBd0I7UUFDeEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksMkJBQVksQ0FBQztZQUM3QyxTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsY0FBYztZQUN6QixzQkFBc0IsRUFBRSxzQkFBc0I7WUFDOUMseUJBQXlCLEVBQUUsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRTtTQUM3RCxDQUFDLENBQUMsQ0FBQztRQUNKLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBc0IsSUFBSSxFQUFFLENBQUM7SUFDckQsQ0FBQztTQUFNLENBQUM7UUFDTix3QkFBd0I7UUFDeEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksMEJBQVcsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckUsWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFzQixJQUFJLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQsMkJBQTJCO0lBQzNCLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN2QyxnQkFBZ0I7UUFDaEIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztRQUNILENBQUM7UUFFRCxvQkFBb0I7UUFDcEIsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BFLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoRSxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sV0FBVyxHQUFHLEtBQUssRUFBRSxLQUE2QixFQUFvQyxFQUFFO0lBQzVGLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLElBQUssS0FBSyxDQUFDLGNBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksSUFBSSxHQUFHLENBQUM7SUFDOUUsTUFBTSxNQUFNLEdBQUksS0FBSyxDQUFDLGNBQXNCLENBQUMsSUFBSSxFQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7SUFDaEcsTUFBTSxTQUFTLEdBQUksS0FBSyxDQUFDLGNBQXNCLENBQUMsU0FBUyxDQUFDO0lBRTFELE1BQU0sVUFBVSxHQUFHO1FBQ2pCLFNBQVM7UUFDVCxJQUFJO1FBQ0osTUFBTTtRQUNOLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3hDLEVBQUUsRUFBRSxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxRQUFRO0tBQ3pDLENBQUM7SUFFRixJQUFJLENBQUM7UUFDSCwyQkFBMkI7UUFDM0IsSUFBSSxJQUFJLEtBQUssZUFBZSxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLDJCQUFrQixDQUFDLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUVqRixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3RELE1BQU0sZ0JBQWdCLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkQsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFDdkYsQ0FBQztZQUVELE1BQU0sYUFBYSxHQUFHLElBQUEsU0FBTSxHQUFFLENBQUM7WUFDL0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxNQUFNLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxVQUFVLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFaEgsTUFBTSxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBRTNFLE1BQU0sV0FBVyxHQUFnQjtnQkFDL0IsYUFBYTtnQkFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsaUJBQWlCLEVBQUUsV0FBVztnQkFDOUIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFO2dCQUM3QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUztnQkFDOUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO2dCQUNqQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUU7Z0JBQzdCLFNBQVMsRUFBRSxHQUFHO2FBQ2YsQ0FBQztZQUVGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMzQixNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFFMUYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixFQUFFLElBQUksRUFBRTtnQkFDcEQsYUFBYTtnQkFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2FBQ2hDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFFckMsT0FBTyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxDQUFDLENBQUM7UUFDM0YsQ0FBQztRQUVELG9DQUFvQztRQUNwQyxJQUFJLElBQUksS0FBSyxlQUFlLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ2pELE1BQU0sT0FBTyxHQUFHLElBQUksMkJBQWtCLENBQUMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRS9FLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQXFCLElBQUksSUFBSSxDQUFDLENBQUM7WUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFLEdBQUcsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFOUUsTUFBTSxZQUFZLEdBQUcsTUFBTSx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU1RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN0RCxPQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRCwwQ0FBMEM7UUFDMUMsSUFBSSxJQUFJLEtBQUssdUJBQXVCLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ3pELE1BQU0sT0FBTyxHQUFHLElBQUksMkJBQWtCLENBQUMsTUFBTSxFQUFFLDBCQUEwQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRXZGLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDZixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUM5RSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsdUNBQXVDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pGLENBQUM7WUFFRCxNQUFNLGNBQWMsR0FBRyxFQUFFLEdBQUcsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFakUsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUNsRSxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUM5QixNQUFNLFlBQVksR0FBRyxNQUFNLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTVELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELHlDQUF5QztRQUN6QyxJQUFJLElBQUksS0FBSyxzQkFBc0IsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFLENBQUM7WUFDeEQsTUFBTSxPQUFPLEdBQUcsSUFBSSwyQkFBa0IsQ0FBQyxNQUFNLEVBQUUseUJBQXlCLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFdEYsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLG1DQUFtQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxDQUFDLENBQUM7WUFDaEYsQ0FBQztZQUVELE1BQU0sYUFBYSxHQUFHLEVBQUUsR0FBRyxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUM7WUFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUUvRCxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQzVCLE1BQU0sWUFBWSxHQUFHLE1BQU0sdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDdEQsT0FBTyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQscUNBQXFDO1FBQ3JDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUN2QixNQUFNLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QyxNQUFNLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxVQUFVLEVBQUUsYUFBYSxFQUFFLENBQUM7WUFFNUQsbUNBQW1DO1lBQ25DLElBQUksT0FBTyxLQUFLLEVBQUUsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFLENBQUM7Z0JBQ3ZDLE1BQU0sT0FBTyxHQUFHLElBQUksMkJBQWtCLENBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDLENBQUM7Z0JBRXRGLE1BQU0sQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztnQkFFaEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVSxDQUFDO29CQUMzQyxTQUFTLEVBQUUsS0FBSztvQkFDaEIsR0FBRyxFQUFFLEVBQUUsYUFBYSxFQUFFO2lCQUN2QixDQUFDLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUUxRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLGtCQUFrQixDQUFDLENBQUM7b0JBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25CLE9BQU8sWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBRUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQW1CLENBQUM7Z0JBQy9DLE1BQU0sV0FBVyxHQUFHLEVBQUUsR0FBRyxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUVoSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixPQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLENBQUM7WUFFRCxxQkFBcUI7WUFDckIsSUFBSSxPQUFPLEtBQUssRUFBRSxJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUUsQ0FBQztnQkFDdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSwyQkFBa0IsQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztnQkFFekYsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDdEQsTUFBTSxVQUFVLEdBQTZCLElBQUksQ0FBQztnQkFFbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLEdBQUcsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVsRywwQkFBMEI7Z0JBQzFCLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO2dCQUN6QixNQUFNLFNBQVMsR0FBUSxFQUFFLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFVixLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUN0RCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUUsQ0FBQzt3QkFDeEIsQ0FBQyxFQUFFLENBQUM7d0JBQ0osTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQzt3QkFDekIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQzt3QkFDeEIsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxNQUFNLEVBQUUsQ0FBQyxDQUFDO3dCQUMzQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO3dCQUN6QixRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUMzQixDQUFDO2dCQUNILENBQUM7Z0JBRUQsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUM3QixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLENBQUM7b0JBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25CLE9BQU8sWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDLENBQUM7Z0JBQy9ELENBQUM7Z0JBRUQsMEJBQTBCO2dCQUMxQixDQUFDLEVBQUUsQ0FBQztnQkFDSixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDO2dCQUNsQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRTlDLDRDQUE0QztnQkFDNUMsSUFBSSxVQUFVLENBQUMsaUJBQWlCLEtBQUssV0FBVyxFQUFFLENBQUM7b0JBQ2pELENBQUMsRUFBRSxDQUFDO29CQUNKLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDcEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUM7b0JBQ3BDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDaEQsQ0FBQztnQkFFRCxNQUFNLFVBQVUsR0FBRyxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUMzQixNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSw0QkFBYSxDQUFDO29CQUMvQixTQUFTLEVBQUUsS0FBSztvQkFDaEIsR0FBRyxFQUFFLEVBQUUsYUFBYSxFQUFFO29CQUN0QixnQkFBZ0IsRUFBRSxVQUFVO29CQUM1Qix3QkFBd0IsRUFBRSxTQUFTO29CQUNuQyx5QkFBeUIsRUFBRSxRQUFRO2lCQUNwQyxDQUFDLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUU3RixNQUFNLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUM5RyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVsQixPQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDO1lBQzVFLENBQUM7WUFFRCw4QkFBOEI7WUFDOUIsSUFBSSxPQUFPLEtBQUssRUFBRSxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDMUMsTUFBTSxPQUFPLEdBQUcsSUFBSSwyQkFBa0IsQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztnQkFFekYsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQztnQkFDdEQsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztnQkFFeEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNmLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLHFEQUFxRCxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztvQkFDdkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkIsT0FBTyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLHdEQUF3RCxFQUFFLENBQUMsQ0FBQztnQkFDbEcsQ0FBQztnQkFFRCxNQUFNLFdBQVcsR0FBRyxFQUFFLEdBQUcsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLENBQUM7Z0JBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUMscUNBQXFDLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRWhFLDJFQUEyRTtnQkFDM0UsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBVSxDQUFDO29CQUMzQyxTQUFTLEVBQUUsS0FBSztvQkFDaEIsR0FBRyxFQUFFLEVBQUUsYUFBYSxFQUFFO2lCQUN2QixDQUFDLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUUxRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuQixPQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRSxDQUFDO2dCQUVELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFtQixDQUFDO2dCQUMvQyxJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFLENBQUM7b0JBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEVBQUUsRUFBRSxHQUFHLFdBQVcsRUFBRSxlQUFlLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7b0JBQzdHLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25CLE9BQU8sWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxDQUFDLENBQUM7Z0JBQ3JGLENBQUM7Z0JBRUQsSUFBSSxXQUFXLENBQUMsaUJBQWlCLEtBQUssV0FBVyxFQUFFLENBQUM7b0JBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsaURBQWlELEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25CLE9BQU8sWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxDQUFDLENBQUM7Z0JBQzVFLENBQUM7Z0JBRUQsSUFBSSxXQUFXLENBQUMsaUJBQWlCLEtBQUssV0FBVyxFQUFFLENBQUM7b0JBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMseUNBQXlDLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25CLE9BQU8sWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSx1Q0FBdUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pGLENBQUM7Z0JBRUQsNkRBQTZEO2dCQUM3RCxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNyQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQy9CLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLDRCQUFhLENBQUM7b0JBQy9CLFNBQVMsRUFBRSxLQUFLO29CQUNoQixHQUFHLEVBQUUsRUFBRSxhQUFhLEVBQUU7b0JBQ3RCLGdCQUFnQixFQUFFLGlIQUFpSDtvQkFDbkkseUJBQXlCLEVBQUU7d0JBQ3pCLFNBQVMsRUFBRSxXQUFXO3dCQUN0QixjQUFjLEVBQUUsR0FBRzt3QkFDbkIsY0FBYyxFQUFFLFNBQVM7d0JBQ3pCLFlBQVksRUFBRSxHQUFHO3FCQUNsQjtpQkFDRixDQUFDLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFFMUYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixFQUFFLElBQUksRUFBRSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDbkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbEIsT0FBTyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLENBQUMsQ0FBQztZQUM5RSxDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDM0MsT0FBTyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUUzRCxDQUFDO0lBQUMsT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1RCxPQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUU7WUFDdkIsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU87U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLHlDQUF5QztBQUM1QixRQUFBLE9BQU8sR0FBRyxJQUFBLG9CQUFXLEVBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnRWMiwgQVBJR2F0ZXdheVByb3h5UmVzdWx0VjIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHtcbiAgUHV0Q29tbWFuZCxcbiAgR2V0Q29tbWFuZCxcbiAgU2NhbkNvbW1hbmQsXG4gIFF1ZXJ5Q29tbWFuZCxcbiAgVXBkYXRlQ29tbWFuZCxcbiAgRGVsZXRlQ29tbWFuZFxufSBmcm9tIFwiQGF3cy1zZGsvbGliLWR5bmFtb2RiXCI7XG5pbXBvcnQgeyBnZXREeW5hbW9EQkNsaWVudCB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0ICogYXMgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gXCJ1dWlkXCI7XG5pbXBvcnQgeyBcbiAgQXBwb2ludG1lbnQsIFxuICBBcHBvaW50bWVudENyZWF0ZVJlcXVlc3QsIFxuICBBcHBvaW50bWVudFVwZGF0ZVJlcXVlc3QsIFxuICBBcHBvaW50bWVudEZpbHRlcnMsXG4gIEFwcG9pbnRtZW50U3RhdHVzIFxufSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyLCB3aXRoTG9nZ2luZywgUGVyZm9ybWFuY2VNb25pdG9yIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9sb2dnZXJcIjtcblxuY29uc3QgVEFCTEUgPSBwcm9jZXNzLmVudi5BUFBPSU5UTUVOVFNfVEFCTEUgfHwgXCJBcHBvaW50bWVudHNUYWJsZVwiO1xuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCJkZXYtc2VjcmV0XCI7XG5cbmNvbnN0IGRvYyA9IGdldER5bmFtb0RCQ2xpZW50KCk7XG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIocHJvY2Vzcy5lbnYuU0VSVklDRV9OQU1FIHx8ICdhcHBvaW50bWVudHMnKTtcblxuLy8gRW5zdXJlIER5bmFtb0RCIGlzIHVzaW5nIGxvY2FsIGVuZHBvaW50IGluIHRlc3QgZW52aXJvbm1lbnRcbmlmIChwcm9jZXNzLmVudi5EWU5BTU9EQl9FTkRQT0lOVCkge1xuICBsb2dnZXIuaW5mbyhcIlVzaW5nIGxvY2FsIER5bmFtb0RCIGVuZHBvaW50XCIsIHsgZW5kcG9pbnQ6IHByb2Nlc3MuZW52LkRZTkFNT0RCX0VORFBPSU5UIH0pO1xufVxuXG5mdW5jdGlvbiBqc29uUmVzcG9uc2Uoc3RhdHVzQ29kZTogbnVtYmVyLCBib2R5OiBhbnkpOiBBUElHYXRld2F5UHJveHlSZXN1bHRWMiB7XG4gIHJldHVybiB7XG4gICAgc3RhdHVzQ29kZSxcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5QXV0aChldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnRWMikge1xuICBjb25zdCBhdXRoID0gZXZlbnQuaGVhZGVycz8uYXV0aG9yaXphdGlvbiB8fCBldmVudC5oZWFkZXJzPy5BdXRob3JpemF0aW9uO1xuICBpZiAoIWF1dGgpIHJldHVybiBudWxsO1xuICBjb25zdCBtYXRjaCA9IGF1dGgubWF0Y2goL15CZWFyZXJcXHMrKC4rKSQvaSk7XG4gIGlmICghbWF0Y2gpIHJldHVybiBudWxsO1xuICB0cnkge1xuICAgIHJldHVybiBqd3QudmVyaWZ5KG1hdGNoWzFdLCBKV1RfU0VDUkVUKSBhcyBhbnk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUFwcG9pbnRtZW50RGF0YShkYXRhOiBBcHBvaW50bWVudENyZWF0ZVJlcXVlc3QpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGVycm9yczogc3RyaW5nW10gPSBbXTtcbiAgXG4gIGlmICghZGF0YS5wYXRpZW50SWQgfHwgZGF0YS5wYXRpZW50SWQudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgIGVycm9ycy5wdXNoKFwiUGF0aWVudCBJRCBpcyByZXF1aXJlZFwiKTtcbiAgfVxuICBcbiAgaWYgKCFkYXRhLmRvY3RvcklkIHx8IGRhdGEuZG9jdG9ySWQudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgIGVycm9ycy5wdXNoKFwiRG9jdG9yIElEIGlzIHJlcXVpcmVkXCIpO1xuICB9XG4gIFxuICBpZiAoIWRhdGEuc2NoZWR1bGVEYXRlKSB7XG4gICAgZXJyb3JzLnB1c2goXCJTY2hlZHVsZSBkYXRlIGlzIHJlcXVpcmVkXCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHNjaGVkdWxlRGF0ZSA9IG5ldyBEYXRlKGRhdGEuc2NoZWR1bGVEYXRlKTtcbiAgICBpZiAoaXNOYU4oc2NoZWR1bGVEYXRlLmdldFRpbWUoKSkpIHtcbiAgICAgIGVycm9ycy5wdXNoKFwiSW52YWxpZCBzY2hlZHVsZSBkYXRlIGZvcm1hdFwiKTtcbiAgICB9IGVsc2UgaWYgKHNjaGVkdWxlRGF0ZSA8IG5ldyBEYXRlKCkpIHtcbiAgICAgIGVycm9ycy5wdXNoKFwiU2NoZWR1bGUgZGF0ZSBjYW5ub3QgYmUgaW4gdGhlIHBhc3RcIik7XG4gICAgfVxuICB9XG4gIFxuICBpZiAoZGF0YS5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkICYmIChkYXRhLmR1cmF0aW9uIDwgMTUgfHwgZGF0YS5kdXJhdGlvbiA+IDE4MCkpIHtcbiAgICBlcnJvcnMucHVzaChcIkR1cmF0aW9uIG11c3QgYmUgYmV0d2VlbiAxNSBhbmQgMTgwIG1pbnV0ZXNcIik7XG4gIH1cbiAgXG4gIGlmIChkYXRhLnBheW1lbnRBbW91bnQgIT09IHVuZGVmaW5lZCAmJiBkYXRhLnBheW1lbnRBbW91bnQgPCAwKSB7XG4gICAgZXJyb3JzLnB1c2goXCJQYXltZW50IGFtb3VudCBjYW5ub3QgYmUgbmVnYXRpdmVcIik7XG4gIH1cbiAgXG4gIHJldHVybiBlcnJvcnM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRmlsdGVycyhxdWVyeVBhcmFtczogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgdW5kZWZpbmVkPiB8IG51bGwpOiBBcHBvaW50bWVudEZpbHRlcnMge1xuICBjb25zdCBmaWx0ZXJzOiBBcHBvaW50bWVudEZpbHRlcnMgPSB7fTtcbiAgXG4gIGlmICghcXVlcnlQYXJhbXMpIHJldHVybiBmaWx0ZXJzO1xuICBcbiAgaWYgKHF1ZXJ5UGFyYW1zLnN0YXR1cykge1xuICAgIGNvbnN0IHN0YXR1c2VzID0gcXVlcnlQYXJhbXMuc3RhdHVzLnNwbGl0KCcsJykgYXMgQXBwb2ludG1lbnRTdGF0dXNbXTtcbiAgICBmaWx0ZXJzLnN0YXR1cyA9IHN0YXR1c2VzLmxlbmd0aCA9PT0gMSA/IHN0YXR1c2VzWzBdIDogc3RhdHVzZXM7XG4gIH1cbiAgXG4gIGlmIChxdWVyeVBhcmFtcy5mcm9tRGF0ZSkge1xuICAgIGZpbHRlcnMuZnJvbURhdGUgPSBxdWVyeVBhcmFtcy5mcm9tRGF0ZTtcbiAgfVxuICBcbiAgaWYgKHF1ZXJ5UGFyYW1zLnRvRGF0ZSkge1xuICAgIGZpbHRlcnMudG9EYXRlID0gcXVlcnlQYXJhbXMudG9EYXRlO1xuICB9XG4gIFxuICBpZiAocXVlcnlQYXJhbXMucGF0aWVudElkKSB7XG4gICAgZmlsdGVycy5wYXRpZW50SWQgPSBxdWVyeVBhcmFtcy5wYXRpZW50SWQ7XG4gIH1cbiAgXG4gIGlmIChxdWVyeVBhcmFtcy5kb2N0b3JJZCkge1xuICAgIGZpbHRlcnMuZG9jdG9ySWQgPSBxdWVyeVBhcmFtcy5kb2N0b3JJZDtcbiAgfVxuICBcbiAgcmV0dXJuIGZpbHRlcnM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZpbHRlcmVkQXBwb2ludG1lbnRzKGZpbHRlcnM6IEFwcG9pbnRtZW50RmlsdGVycyk6IFByb21pc2U8QXBwb2ludG1lbnRbXT4ge1xuICBsZXQgYXBwb2ludG1lbnRzOiBBcHBvaW50bWVudFtdID0gW107XG4gIFxuICBpZiAoZmlsdGVycy5wYXRpZW50SWQpIHtcbiAgICAvLyBRdWVyeSBieSBwYXRpZW50IGluZGV4XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZG9jLnNlbmQobmV3IFF1ZXJ5Q29tbWFuZCh7XG4gICAgICBUYWJsZU5hbWU6IFRBQkxFLFxuICAgICAgSW5kZXhOYW1lOiBcInBhdGllbnQtaW5kZXhcIixcbiAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246IFwicGF0aWVudElkID0gOnBhdGllbnRJZFwiLFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczogeyBcIjpwYXRpZW50SWRcIjogZmlsdGVycy5wYXRpZW50SWQgfVxuICAgIH0pKTtcbiAgICBhcHBvaW50bWVudHMgPSByZXN1bHQuSXRlbXMgYXMgQXBwb2ludG1lbnRbXSB8fCBbXTtcbiAgfSBlbHNlIGlmIChmaWx0ZXJzLmRvY3RvcklkKSB7XG4gICAgLy8gUXVlcnkgYnkgZG9jdG9yIGluZGV4XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZG9jLnNlbmQobmV3IFF1ZXJ5Q29tbWFuZCh7XG4gICAgICBUYWJsZU5hbWU6IFRBQkxFLFxuICAgICAgSW5kZXhOYW1lOiBcImRvY3Rvci1pbmRleFwiLFxuICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogXCJkb2N0b3JJZCA9IDpkb2N0b3JJZFwiLFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczogeyBcIjpkb2N0b3JJZFwiOiBmaWx0ZXJzLmRvY3RvcklkIH1cbiAgICB9KSk7XG4gICAgYXBwb2ludG1lbnRzID0gcmVzdWx0Lkl0ZW1zIGFzIEFwcG9pbnRtZW50W10gfHwgW107XG4gIH0gZWxzZSB7XG4gICAgLy8gU2NhbiBhbGwgYXBwb2ludG1lbnRzXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZG9jLnNlbmQobmV3IFNjYW5Db21tYW5kKHsgVGFibGVOYW1lOiBUQUJMRSB9KSk7XG4gICAgYXBwb2ludG1lbnRzID0gcmVzdWx0Lkl0ZW1zIGFzIEFwcG9pbnRtZW50W10gfHwgW107XG4gIH1cbiAgXG4gIC8vIEFwcGx5IGFkZGl0aW9uYWwgZmlsdGVyc1xuICByZXR1cm4gYXBwb2ludG1lbnRzLmZpbHRlcihhcHBvaW50bWVudCA9PiB7XG4gICAgLy8gU3RhdHVzIGZpbHRlclxuICAgIGlmIChmaWx0ZXJzLnN0YXR1cykge1xuICAgICAgY29uc3Qgc3RhdHVzQXJyYXkgPSBBcnJheS5pc0FycmF5KGZpbHRlcnMuc3RhdHVzKSA/IGZpbHRlcnMuc3RhdHVzIDogW2ZpbHRlcnMuc3RhdHVzXTtcbiAgICAgIGlmICghc3RhdHVzQXJyYXkuaW5jbHVkZXMoYXBwb2ludG1lbnQuYXBwb2ludG1lbnRTdGF0dXMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gRGF0ZSByYW5nZSBmaWx0ZXJcbiAgICBpZiAoZmlsdGVycy5mcm9tRGF0ZSAmJiBhcHBvaW50bWVudC5zY2hlZHVsZURhdGUgPCBmaWx0ZXJzLmZyb21EYXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGlmIChmaWx0ZXJzLnRvRGF0ZSAmJiBhcHBvaW50bWVudC5zY2hlZHVsZURhdGUgPiBmaWx0ZXJzLnRvRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59XG5cbmNvbnN0IGhhbmRsZXJJbXBsID0gYXN5bmMgKGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudFYyKTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHRWMj4gPT4ge1xuICBjb25zdCBwYXRoID0gZXZlbnQucmF3UGF0aCB8fCAoZXZlbnQucmVxdWVzdENvbnRleHQgYXMgYW55KS5odHRwPy5wYXRoIHx8IFwiL1wiO1xuICBjb25zdCBtZXRob2QgPSAoZXZlbnQucmVxdWVzdENvbnRleHQgYXMgYW55KS5odHRwPy5tZXRob2QgfHwgZXZlbnQucmVxdWVzdENvbnRleHQ/Lmh0dHA/Lm1ldGhvZDtcbiAgY29uc3QgcmVxdWVzdElkID0gKGV2ZW50LnJlcXVlc3RDb250ZXh0IGFzIGFueSkucmVxdWVzdElkO1xuICBcbiAgY29uc3QgbG9nQ29udGV4dCA9IHtcbiAgICByZXF1ZXN0SWQsXG4gICAgcGF0aCxcbiAgICBtZXRob2QsXG4gICAgdXNlckFnZW50OiBldmVudC5oZWFkZXJzPy5bJ3VzZXItYWdlbnQnXSxcbiAgICBpcDogZXZlbnQucmVxdWVzdENvbnRleHQ/Lmh0dHA/LnNvdXJjZUlwXG4gIH07XG5cbiAgdHJ5IHtcbiAgICAvLyBDcmVhdGUgYSBuZXcgYXBwb2ludG1lbnRcbiAgICBpZiAocGF0aCA9PT0gXCIvYXBwb2ludG1lbnRzXCIgJiYgbWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgICAgY29uc3QgbW9uaXRvciA9IG5ldyBQZXJmb3JtYW5jZU1vbml0b3IobG9nZ2VyLCAnY3JlYXRlX2FwcG9pbnRtZW50JywgbG9nQ29udGV4dCk7XG4gICAgICBcbiAgICAgIGNvbnN0IGJvZHkgPSBldmVudC5ib2R5ID8gSlNPTi5wYXJzZShldmVudC5ib2R5KSA6IHt9O1xuICAgICAgY29uc3QgdmFsaWRhdGlvbkVycm9ycyA9IHZhbGlkYXRlQXBwb2ludG1lbnREYXRhKGJvZHkpO1xuICAgICAgXG4gICAgICBpZiAodmFsaWRhdGlvbkVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxvZ2dlci5sb2dWYWxpZGF0aW9uRXJyb3IodmFsaWRhdGlvbkVycm9ycywgbG9nQ29udGV4dCk7XG4gICAgICAgIG1vbml0b3IuZW5kKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIGpzb25SZXNwb25zZSg0MDAsIHsgbWVzc2FnZTogXCJWYWxpZGF0aW9uIGZhaWxlZFwiLCBlcnJvcnM6IHZhbGlkYXRpb25FcnJvcnMgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGFwcG9pbnRtZW50SWQgPSB1dWlkdjQoKTtcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgIGNvbnN0IGFwcG9pbnRtZW50Q29udGV4dCA9IHsgLi4ubG9nQ29udGV4dCwgYXBwb2ludG1lbnRJZCwgcGF0aWVudElkOiBib2R5LnBhdGllbnRJZCwgZG9jdG9ySWQ6IGJvZHkuZG9jdG9ySWQgfTtcbiAgICAgIFxuICAgICAgbG9nZ2VyLmluZm8oJ1Byb2Nlc3NpbmcgYXBwb2ludG1lbnQgY3JlYXRpb24gcmVxdWVzdCcsIGFwcG9pbnRtZW50Q29udGV4dCk7XG4gICAgICBcbiAgICAgIGNvbnN0IGFwcG9pbnRtZW50OiBBcHBvaW50bWVudCA9IHtcbiAgICAgICAgYXBwb2ludG1lbnRJZCxcbiAgICAgICAgcGF0aWVudElkOiBib2R5LnBhdGllbnRJZCxcbiAgICAgICAgZG9jdG9ySWQ6IGJvZHkuZG9jdG9ySWQsXG4gICAgICAgIGFwcG9pbnRtZW50U3RhdHVzOiAnc2NoZWR1bGVkJyxcbiAgICAgICAgc2NoZWR1bGVEYXRlOiBib2R5LnNjaGVkdWxlRGF0ZSxcbiAgICAgICAgZHVyYXRpb246IGJvZHkuZHVyYXRpb24gfHwgMzAsXG4gICAgICAgIHZpZGVvTGluazogYm9keS52aWRlb0xpbmssXG4gICAgICAgIHBheW1lbnRJZDogYm9keS5wYXltZW50SWQsXG4gICAgICAgIHBheW1lbnRTdGF0dXM6IGJvZHkucGF5bWVudFN0YXR1cyB8fCAncGVuZGluZycsXG4gICAgICAgIHBheW1lbnRBbW91bnQ6IGJvZHkucGF5bWVudEFtb3VudCxcbiAgICAgICAgbm90ZXM6IGJvZHkubm90ZXMsXG4gICAgICAgIHN5bXB0b21zOiBib2R5LnN5bXB0b21zIHx8IFtdLFxuICAgICAgICBjcmVhdGVkQXQ6IG5vd1xuICAgICAgfTtcbiAgICAgIFxuICAgICAgY29uc3QgZGJTdGFydCA9IERhdGUubm93KCk7XG4gICAgICBhd2FpdCBkb2Muc2VuZChuZXcgUHV0Q29tbWFuZCh7IFRhYmxlTmFtZTogVEFCTEUsIEl0ZW06IGFwcG9pbnRtZW50IH0pKTtcbiAgICAgIGxvZ2dlci5sb2dEYXRhYmFzZU9wZXJhdGlvbigncHV0JywgVEFCTEUsIHRydWUsIERhdGUubm93KCkgLSBkYlN0YXJ0LCBhcHBvaW50bWVudENvbnRleHQpO1xuICAgICAgXG4gICAgICBsb2dnZXIubG9nQnVzaW5lc3NMb2dpYygnYXBwb2ludG1lbnRfY3JlYXRpb24nLCB0cnVlLCB7IFxuICAgICAgICBhcHBvaW50bWVudElkLCBcbiAgICAgICAgcGF0aWVudElkOiBib2R5LnBhdGllbnRJZCwgXG4gICAgICAgIGRvY3RvcklkOiBib2R5LmRvY3RvcklkLCBcbiAgICAgICAgc2NoZWR1bGVEYXRlOiBib2R5LnNjaGVkdWxlRGF0ZSBcbiAgICAgIH0sIGFwcG9pbnRtZW50Q29udGV4dCk7XG4gICAgICBtb25pdG9yLmVuZCh0cnVlLCB7IGFwcG9pbnRtZW50SWQgfSk7XG4gICAgICBcbiAgICAgIHJldHVybiBqc29uUmVzcG9uc2UoMjAxLCB7IGFwcG9pbnRtZW50SWQsIG1lc3NhZ2U6IFwiQXBwb2ludG1lbnQgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIiB9KTtcbiAgICB9XG5cbiAgICAvLyBHZXQgYWxsIGFwcG9pbnRtZW50cyB3aXRoIGZpbHRlcnNcbiAgICBpZiAocGF0aCA9PT0gXCIvYXBwb2ludG1lbnRzXCIgJiYgbWV0aG9kID09PSBcIkdFVFwiKSB7XG4gICAgICBjb25zdCBtb25pdG9yID0gbmV3IFBlcmZvcm1hbmNlTW9uaXRvcihsb2dnZXIsICdnZXRfYXBwb2ludG1lbnRzJywgbG9nQ29udGV4dCk7XG4gICAgICBcbiAgICAgIGNvbnN0IGZpbHRlcnMgPSBwYXJzZUZpbHRlcnMoZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzIHx8IG51bGwpO1xuICAgICAgbG9nZ2VyLmluZm8oJ0ZldGNoaW5nIGFwcG9pbnRtZW50cyB3aXRoIGZpbHRlcnMnLCB7IC4uLmxvZ0NvbnRleHQsIGZpbHRlcnMgfSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGFwcG9pbnRtZW50cyA9IGF3YWl0IGdldEZpbHRlcmVkQXBwb2ludG1lbnRzKGZpbHRlcnMpO1xuICAgICAgXG4gICAgICBtb25pdG9yLmVuZCh0cnVlLCB7IGl0ZW1Db3VudDogYXBwb2ludG1lbnRzLmxlbmd0aCB9KTtcbiAgICAgIHJldHVybiBqc29uUmVzcG9uc2UoMjAwLCB7IGFwcG9pbnRtZW50cyB9KTtcbiAgICB9XG5cbiAgICAvLyBHZXQgYXBwb2ludG1lbnRzIGZvciBhIHNwZWNpZmljIHBhdGllbnRcbiAgICBpZiAocGF0aCA9PT0gXCIvYXBwb2ludG1lbnRzL3BhdGllbnRcIiAmJiBtZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgIGNvbnN0IG1vbml0b3IgPSBuZXcgUGVyZm9ybWFuY2VNb25pdG9yKGxvZ2dlciwgJ2dldF9wYXRpZW50X2FwcG9pbnRtZW50cycsIGxvZ0NvbnRleHQpO1xuICAgICAgXG4gICAgICBjb25zdCBwYXRpZW50SWQgPSAoZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzIHx8IHt9KVtcInBhdGllbnRJZFwiXTtcbiAgICAgIGlmICghcGF0aWVudElkKSB7XG4gICAgICAgIGxvZ2dlci5sb2dWYWxpZGF0aW9uRXJyb3IoWydwYXRpZW50SWQgcXVlcnkgcGFyYW1ldGVyIHJlcXVpcmVkJ10sIGxvZ0NvbnRleHQpO1xuICAgICAgICBtb25pdG9yLmVuZChmYWxzZSk7XG4gICAgICAgIHJldHVybiBqc29uUmVzcG9uc2UoNDAwLCB7IG1lc3NhZ2U6IFwicGF0aWVudElkIHF1ZXJ5IHBhcmFtZXRlciBpcyByZXF1aXJlZFwiIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBwYXRpZW50Q29udGV4dCA9IHsgLi4ubG9nQ29udGV4dCwgcGF0aWVudElkIH07XG4gICAgICBsb2dnZXIuaW5mbygnRmV0Y2hpbmcgYXBwb2ludG1lbnRzIGZvciBwYXRpZW50JywgcGF0aWVudENvbnRleHQpO1xuICAgICAgXG4gICAgICBjb25zdCBmaWx0ZXJzID0gcGFyc2VGaWx0ZXJzKGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycyB8fCBudWxsKTtcbiAgICAgIGZpbHRlcnMucGF0aWVudElkID0gcGF0aWVudElkO1xuICAgICAgY29uc3QgYXBwb2ludG1lbnRzID0gYXdhaXQgZ2V0RmlsdGVyZWRBcHBvaW50bWVudHMoZmlsdGVycyk7XG4gICAgICBcbiAgICAgIG1vbml0b3IuZW5kKHRydWUsIHsgaXRlbUNvdW50OiBhcHBvaW50bWVudHMubGVuZ3RoIH0pO1xuICAgICAgcmV0dXJuIGpzb25SZXNwb25zZSgyMDAsIHsgYXBwb2ludG1lbnRzIH0pO1xuICAgIH1cblxuICAgIC8vIEdldCBhcHBvaW50bWVudHMgZm9yIGEgc3BlY2lmaWMgZG9jdG9yXG4gICAgaWYgKHBhdGggPT09IFwiL2FwcG9pbnRtZW50cy9kb2N0b3JcIiAmJiBtZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgIGNvbnN0IG1vbml0b3IgPSBuZXcgUGVyZm9ybWFuY2VNb25pdG9yKGxvZ2dlciwgJ2dldF9kb2N0b3JfYXBwb2ludG1lbnRzJywgbG9nQ29udGV4dCk7XG4gICAgICBcbiAgICAgIGNvbnN0IGRvY3RvcklkID0gKGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycyB8fCB7fSlbXCJkb2N0b3JJZFwiXTtcbiAgICAgIGlmICghZG9jdG9ySWQpIHtcbiAgICAgICAgbG9nZ2VyLmxvZ1ZhbGlkYXRpb25FcnJvcihbJ2RvY3RvcklkIHF1ZXJ5IHBhcmFtZXRlciByZXF1aXJlZCddLCBsb2dDb250ZXh0KTtcbiAgICAgICAgbW9uaXRvci5lbmQoZmFsc2UpO1xuICAgICAgICByZXR1cm4ganNvblJlc3BvbnNlKDQwMCwgeyBtZXNzYWdlOiBcImRvY3RvcklkIHF1ZXJ5IHBhcmFtZXRlciBpcyByZXF1aXJlZFwiIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBkb2N0b3JDb250ZXh0ID0geyAuLi5sb2dDb250ZXh0LCBkb2N0b3JJZCB9O1xuICAgICAgbG9nZ2VyLmluZm8oJ0ZldGNoaW5nIGFwcG9pbnRtZW50cyBmb3IgZG9jdG9yJywgZG9jdG9yQ29udGV4dCk7XG4gICAgICBcbiAgICAgIGNvbnN0IGZpbHRlcnMgPSBwYXJzZUZpbHRlcnMoZXZlbnQucXVlcnlTdHJpbmdQYXJhbWV0ZXJzIHx8IG51bGwpO1xuICAgICAgZmlsdGVycy5kb2N0b3JJZCA9IGRvY3RvcklkO1xuICAgICAgY29uc3QgYXBwb2ludG1lbnRzID0gYXdhaXQgZ2V0RmlsdGVyZWRBcHBvaW50bWVudHMoZmlsdGVycyk7XG4gICAgICBcbiAgICAgIG1vbml0b3IuZW5kKHRydWUsIHsgaXRlbUNvdW50OiBhcHBvaW50bWVudHMubGVuZ3RoIH0pO1xuICAgICAgcmV0dXJuIGpzb25SZXNwb25zZSgyMDAsIHsgYXBwb2ludG1lbnRzIH0pO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBhcHBvaW50bWVudC1zcGVjaWZpYyByb3V0ZXNcbiAgICBjb25zdCBhcHBvaW50bWVudElkTWF0Y2ggPSBwYXRoLm1hdGNoKC9eXFwvYXBwb2ludG1lbnRzXFwvKFteXFwvXSspKFxcLy4qKT8kLyk7XG4gICAgaWYgKGFwcG9pbnRtZW50SWRNYXRjaCkge1xuICAgICAgY29uc3QgYXBwb2ludG1lbnRJZCA9IGRlY29kZVVSSUNvbXBvbmVudChhcHBvaW50bWVudElkTWF0Y2hbMV0pO1xuICAgICAgY29uc3Qgc3ViUGF0aCA9IGFwcG9pbnRtZW50SWRNYXRjaFsyXSB8fCBcIlwiO1xuICAgICAgY29uc3QgYXBwb2ludG1lbnRDb250ZXh0ID0geyAuLi5sb2dDb250ZXh0LCBhcHBvaW50bWVudElkIH07XG5cbiAgICAgIC8vIEdldCBzcGVjaWZpYyBhcHBvaW50bWVudCBkZXRhaWxzXG4gICAgICBpZiAoc3ViUGF0aCA9PT0gXCJcIiAmJiBtZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgICAgY29uc3QgbW9uaXRvciA9IG5ldyBQZXJmb3JtYW5jZU1vbml0b3IobG9nZ2VyLCAnZ2V0X2FwcG9pbnRtZW50JywgYXBwb2ludG1lbnRDb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGxvZ2dlci5pbmZvKCdGZXRjaGluZyBhcHBvaW50bWVudCBkZXRhaWxzJywgYXBwb2ludG1lbnRDb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRiU3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkb2Muc2VuZChuZXcgR2V0Q29tbWFuZCh7IFxuICAgICAgICAgIFRhYmxlTmFtZTogVEFCTEUsIFxuICAgICAgICAgIEtleTogeyBhcHBvaW50bWVudElkIH0gXG4gICAgICAgIH0pKTtcbiAgICAgICAgbG9nZ2VyLmxvZ0RhdGFiYXNlT3BlcmF0aW9uKCdnZXQnLCBUQUJMRSwgdHJ1ZSwgRGF0ZS5ub3coKSAtIGRiU3RhcnQsIGFwcG9pbnRtZW50Q29udGV4dCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIXJlc3VsdC5JdGVtKSB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oJ0FwcG9pbnRtZW50IG5vdCBmb3VuZCcsIGFwcG9pbnRtZW50Q29udGV4dCk7XG4gICAgICAgICAgbW9uaXRvci5lbmQoZmFsc2UpO1xuICAgICAgICAgIHJldHVybiBqc29uUmVzcG9uc2UoNDA0LCB7IG1lc3NhZ2U6IFwiQXBwb2ludG1lbnQgbm90IGZvdW5kXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGFwcG9pbnRtZW50ID0gcmVzdWx0Lkl0ZW0gYXMgQXBwb2ludG1lbnQ7XG4gICAgICAgIGNvbnN0IGZ1bGxDb250ZXh0ID0geyAuLi5hcHBvaW50bWVudENvbnRleHQsIHBhdGllbnRJZDogYXBwb2ludG1lbnQucGF0aWVudElkLCBkb2N0b3JJZDogYXBwb2ludG1lbnQuZG9jdG9ySWQgfTtcbiAgICAgICAgXG4gICAgICAgIG1vbml0b3IuZW5kKHRydWUpO1xuICAgICAgICByZXR1cm4ganNvblJlc3BvbnNlKDIwMCwgcmVzdWx0Lkl0ZW0pO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgYXBwb2ludG1lbnRcbiAgICAgIGlmIChzdWJQYXRoID09PSBcIlwiICYmIG1ldGhvZCA9PT0gXCJQVVRcIikge1xuICAgICAgICBjb25zdCBtb25pdG9yID0gbmV3IFBlcmZvcm1hbmNlTW9uaXRvcihsb2dnZXIsICd1cGRhdGVfYXBwb2ludG1lbnQnLCBhcHBvaW50bWVudENvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYm9keSA9IGV2ZW50LmJvZHkgPyBKU09OLnBhcnNlKGV2ZW50LmJvZHkpIDoge307XG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IEFwcG9pbnRtZW50VXBkYXRlUmVxdWVzdCA9IGJvZHk7XG4gICAgICAgIFxuICAgICAgICBsb2dnZXIuaW5mbygnVXBkYXRpbmcgYXBwb2ludG1lbnQnLCB7IC4uLmFwcG9pbnRtZW50Q29udGV4dCwgZmllbGRzVG9VcGRhdGU6IE9iamVjdC5rZXlzKGJvZHkpIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gQnVpbGQgdXBkYXRlIGV4cHJlc3Npb25cbiAgICAgICAgY29uc3QgZXhwcmVzc2lvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgYXR0clZhbHM6IGFueSA9IHt9O1xuICAgICAgICBjb25zdCBhdHRyTmFtZXM6IGFueSA9IHt9O1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh1cGRhdGVEYXRhKSkge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBjb25zdCBuYW1lS2V5ID0gYCNuJHtpfWA7XG4gICAgICAgICAgICBjb25zdCB2YWxLZXkgPSBgOnYke2l9YDtcbiAgICAgICAgICAgIGV4cHJlc3Npb25zLnB1c2goYCR7bmFtZUtleX0gPSAke3ZhbEtleX1gKTtcbiAgICAgICAgICAgIGF0dHJOYW1lc1tuYW1lS2V5XSA9IGtleTtcbiAgICAgICAgICAgIGF0dHJWYWxzW3ZhbEtleV0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChleHByZXNzaW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBsb2dnZXIubG9nVmFsaWRhdGlvbkVycm9yKFsnbm8gZmllbGRzIHRvIHVwZGF0ZSddLCBhcHBvaW50bWVudENvbnRleHQpO1xuICAgICAgICAgIG1vbml0b3IuZW5kKGZhbHNlKTtcbiAgICAgICAgICByZXR1cm4ganNvblJlc3BvbnNlKDQwMCwgeyBtZXNzYWdlOiBcIk5vIGZpZWxkcyB0byB1cGRhdGVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQWRkIHVwZGF0ZWRBdCB0aW1lc3RhbXBcbiAgICAgICAgaSsrO1xuICAgICAgICBleHByZXNzaW9ucy5wdXNoKGAjbiR7aX0gPSA6diR7aX1gKTtcbiAgICAgICAgYXR0ck5hbWVzW2AjbiR7aX1gXSA9IFwidXBkYXRlZEF0XCI7XG4gICAgICAgIGF0dHJWYWxzW2A6diR7aX1gXSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIElmIGNhbmNlbGxpbmcsIGFkZCBjYW5jZWxsYXRpb24gdGltZXN0YW1wXG4gICAgICAgIGlmICh1cGRhdGVEYXRhLmFwcG9pbnRtZW50U3RhdHVzID09PSAnY2FuY2VsbGVkJykge1xuICAgICAgICAgIGkrKztcbiAgICAgICAgICBleHByZXNzaW9ucy5wdXNoKGAjbiR7aX0gPSA6diR7aX1gKTtcbiAgICAgICAgICBhdHRyTmFtZXNbYCNuJHtpfWBdID0gXCJjYW5jZWxsZWRBdFwiO1xuICAgICAgICAgIGF0dHJWYWxzW2A6diR7aX1gXSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgdXBkYXRlRXhwciA9IFwiU0VUIFwiICsgZXhwcmVzc2lvbnMuam9pbihcIiwgXCIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZGJTdGFydCA9IERhdGUubm93KCk7XG4gICAgICAgIGF3YWl0IGRvYy5zZW5kKG5ldyBVcGRhdGVDb21tYW5kKHtcbiAgICAgICAgICBUYWJsZU5hbWU6IFRBQkxFLFxuICAgICAgICAgIEtleTogeyBhcHBvaW50bWVudElkIH0sXG4gICAgICAgICAgVXBkYXRlRXhwcmVzc2lvbjogdXBkYXRlRXhwcixcbiAgICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IGF0dHJOYW1lcyxcbiAgICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiBhdHRyVmFsc1xuICAgICAgICB9KSk7XG4gICAgICAgIGxvZ2dlci5sb2dEYXRhYmFzZU9wZXJhdGlvbigndXBkYXRlJywgVEFCTEUsIHRydWUsIERhdGUubm93KCkgLSBkYlN0YXJ0LCBhcHBvaW50bWVudENvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgbG9nZ2VyLmxvZ0J1c2luZXNzTG9naWMoJ2FwcG9pbnRtZW50X3VwZGF0ZScsIHRydWUsIHsgZmllbGRzVXBkYXRlZDogT2JqZWN0LmtleXMoYm9keSkgfSwgYXBwb2ludG1lbnRDb250ZXh0KTtcbiAgICAgICAgbW9uaXRvci5lbmQodHJ1ZSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ganNvblJlc3BvbnNlKDIwMCwgeyBtZXNzYWdlOiBcIkFwcG9pbnRtZW50IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIERlbGV0ZSBhcHBvaW50bWVudCAoY2FuY2VsKVxuICAgICAgaWYgKHN1YlBhdGggPT09IFwiXCIgJiYgbWV0aG9kID09PSBcIkRFTEVURVwiKSB7XG4gICAgICAgIGNvbnN0IG1vbml0b3IgPSBuZXcgUGVyZm9ybWFuY2VNb25pdG9yKGxvZ2dlciwgJ2NhbmNlbF9hcHBvaW50bWVudCcsIGFwcG9pbnRtZW50Q29udGV4dCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycyB8fCB7fTtcbiAgICAgICAgY29uc3QgcGF0aWVudElkID0gcXVlcnlQYXJhbXMucGF0aWVudElkO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFwYXRpZW50SWQpIHtcbiAgICAgICAgICBsb2dnZXIubG9nVmFsaWRhdGlvbkVycm9yKFsncGF0aWVudElkIHF1ZXJ5IHBhcmFtZXRlciByZXF1aXJlZCBmb3IgY2FuY2VsbGF0aW9uJ10sIGFwcG9pbnRtZW50Q29udGV4dCk7XG4gICAgICAgICAgbW9uaXRvci5lbmQoZmFsc2UpO1xuICAgICAgICAgIHJldHVybiBqc29uUmVzcG9uc2UoNDAwLCB7IG1lc3NhZ2U6IFwicGF0aWVudElkIHF1ZXJ5IHBhcmFtZXRlciBpcyByZXF1aXJlZCBmb3IgY2FuY2VsbGF0aW9uXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZ1bGxDb250ZXh0ID0geyAuLi5hcHBvaW50bWVudENvbnRleHQsIHBhdGllbnRJZCB9O1xuICAgICAgICBsb2dnZXIuaW5mbygnUHJvY2Vzc2luZyBhcHBvaW50bWVudCBjYW5jZWxsYXRpb24nLCBmdWxsQ29udGV4dCk7XG4gICAgICAgIFxuICAgICAgICAvLyBGaXJzdCBnZXQgdGhlIGFwcG9pbnRtZW50IHRvIHZlcmlmeSBpdCBleGlzdHMgYW5kIGJlbG9uZ3MgdG8gdGhlIHBhdGllbnRcbiAgICAgICAgY29uc3QgZGJTdGFydCA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRvYy5zZW5kKG5ldyBHZXRDb21tYW5kKHsgXG4gICAgICAgICAgVGFibGVOYW1lOiBUQUJMRSwgXG4gICAgICAgICAgS2V5OiB7IGFwcG9pbnRtZW50SWQgfSBcbiAgICAgICAgfSkpO1xuICAgICAgICBsb2dnZXIubG9nRGF0YWJhc2VPcGVyYXRpb24oJ2dldCcsIFRBQkxFLCB0cnVlLCBEYXRlLm5vdygpIC0gZGJTdGFydCwgYXBwb2ludG1lbnRDb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmICghcmVzdWx0Lkl0ZW0pIHtcbiAgICAgICAgICBsb2dnZXIud2FybignQXBwb2ludG1lbnQgbm90IGZvdW5kIGZvciBjYW5jZWxsYXRpb24nLCBmdWxsQ29udGV4dCk7XG4gICAgICAgICAgbW9uaXRvci5lbmQoZmFsc2UpO1xuICAgICAgICAgIHJldHVybiBqc29uUmVzcG9uc2UoNDA0LCB7IG1lc3NhZ2U6IFwiQXBwb2ludG1lbnQgbm90IGZvdW5kXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGFwcG9pbnRtZW50ID0gcmVzdWx0Lkl0ZW0gYXMgQXBwb2ludG1lbnQ7XG4gICAgICAgIGlmIChhcHBvaW50bWVudC5wYXRpZW50SWQgIT09IHBhdGllbnRJZCkge1xuICAgICAgICAgIGxvZ2dlci53YXJuKCdVbmF1dGhvcml6ZWQgY2FuY2VsbGF0aW9uIGF0dGVtcHQnLCB7IC4uLmZ1bGxDb250ZXh0LCBhY3R1YWxQYXRpZW50SWQ6IGFwcG9pbnRtZW50LnBhdGllbnRJZCB9KTtcbiAgICAgICAgICBtb25pdG9yLmVuZChmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuIGpzb25SZXNwb25zZSg0MDMsIHsgbWVzc2FnZTogXCJZb3UgY2FuIG9ubHkgY2FuY2VsIHlvdXIgb3duIGFwcG9pbnRtZW50c1wiIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoYXBwb2ludG1lbnQuYXBwb2ludG1lbnRTdGF0dXMgPT09ICdjYW5jZWxsZWQnKSB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oJ0F0dGVtcHQgdG8gY2FuY2VsIGFscmVhZHkgY2FuY2VsbGVkIGFwcG9pbnRtZW50JywgZnVsbENvbnRleHQpO1xuICAgICAgICAgIG1vbml0b3IuZW5kKGZhbHNlKTtcbiAgICAgICAgICByZXR1cm4ganNvblJlc3BvbnNlKDQwMCwgeyBtZXNzYWdlOiBcIkFwcG9pbnRtZW50IGlzIGFscmVhZHkgY2FuY2VsbGVkXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChhcHBvaW50bWVudC5hcHBvaW50bWVudFN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcpIHtcbiAgICAgICAgICBsb2dnZXIud2FybignQXR0ZW1wdCB0byBjYW5jZWwgY29tcGxldGVkIGFwcG9pbnRtZW50JywgZnVsbENvbnRleHQpO1xuICAgICAgICAgIG1vbml0b3IuZW5kKGZhbHNlKTtcbiAgICAgICAgICByZXR1cm4ganNvblJlc3BvbnNlKDQwMCwgeyBtZXNzYWdlOiBcIkNhbm5vdCBjYW5jZWwgYSBjb21wbGV0ZWQgYXBwb2ludG1lbnRcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gVXBkYXRlIGFwcG9pbnRtZW50IHN0YXR1cyB0byBjYW5jZWxsZWQgaW5zdGVhZCBvZiBkZWxldGluZ1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZVN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgYXdhaXQgZG9jLnNlbmQobmV3IFVwZGF0ZUNvbW1hbmQoe1xuICAgICAgICAgIFRhYmxlTmFtZTogVEFCTEUsXG4gICAgICAgICAgS2V5OiB7IGFwcG9pbnRtZW50SWQgfSxcbiAgICAgICAgICBVcGRhdGVFeHByZXNzaW9uOiBcIlNFVCBhcHBvaW50bWVudFN0YXR1cyA9IDpzdGF0dXMsIGNhbmNlbGxlZEF0ID0gOmNhbmNlbGxlZEF0LCBjYW5jZWxsZWRCeSA9IDpjYW5jZWxsZWRCeSwgdXBkYXRlZEF0ID0gOnVwZGF0ZWRBdFwiLFxuICAgICAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgICAgIFwiOnN0YXR1c1wiOiBcImNhbmNlbGxlZFwiLFxuICAgICAgICAgICAgXCI6Y2FuY2VsbGVkQXRcIjogbm93LFxuICAgICAgICAgICAgXCI6Y2FuY2VsbGVkQnlcIjogcGF0aWVudElkLFxuICAgICAgICAgICAgXCI6dXBkYXRlZEF0XCI6IG5vd1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBsb2dnZXIubG9nRGF0YWJhc2VPcGVyYXRpb24oJ3VwZGF0ZScsIFRBQkxFLCB0cnVlLCBEYXRlLm5vdygpIC0gdXBkYXRlU3RhcnQsIGZ1bGxDb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGxvZ2dlci5sb2dCdXNpbmVzc0xvZ2ljKCdhcHBvaW50bWVudF9jYW5jZWxsYXRpb24nLCB0cnVlLCB7IGNhbmNlbGxlZEJ5OiBwYXRpZW50SWQgfSwgZnVsbENvbnRleHQpO1xuICAgICAgICBtb25pdG9yLmVuZCh0cnVlKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBqc29uUmVzcG9uc2UoMjAwLCB7IG1lc3NhZ2U6IFwiQXBwb2ludG1lbnQgY2FuY2VsbGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxvZ2dlci53YXJuKCdSb3V0ZSBub3QgZm91bmQnLCBsb2dDb250ZXh0KTtcbiAgICByZXR1cm4ganNvblJlc3BvbnNlKDQwNCwgeyBtZXNzYWdlOiBcIlJvdXRlIG5vdCBmb3VuZFwiIH0pO1xuICAgIFxuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIGxvZ2dlci5lcnJvcignVW5oYW5kbGVkIGVycm9yIGluIGhhbmRsZXInLCBsb2dDb250ZXh0LCBlcnIpO1xuICAgIHJldHVybiBqc29uUmVzcG9uc2UoNTAwLCB7IFxuICAgICAgbWVzc2FnZTogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiwgXG4gICAgICBlcnJvcjogZXJyLm1lc3NhZ2UgXG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIEV4cG9ydCBoYW5kbGVyIHdpdGggbG9nZ2luZyBtaWRkbGV3YXJlXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IHdpdGhMb2dnaW5nKGhhbmRsZXJJbXBsLCBsb2dnZXIpO1xuIl19

/***/ }),

/***/ 4007:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ DynamoDBServiceException)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4820);


class DynamoDBServiceException extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__/* .ServiceException */ .TJ {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, DynamoDBServiceException.prototype);
    }
}


/***/ }),

/***/ 4040:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  decode: __webpack_require__(7260),
  verify: __webpack_require__(4072),
  sign: __webpack_require__(7651),
  JsonWebTokenError: __webpack_require__(1741),
  NotBeforeError: __webpack_require__(3726),
  TokenExpiredError: __webpack_require__(8980),
};


/***/ }),

/***/ 4072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const JsonWebTokenError = __webpack_require__(1741);
const NotBeforeError = __webpack_require__(3726);
const TokenExpiredError = __webpack_require__(8980);
const decode = __webpack_require__(7260);
const timespan = __webpack_require__(855);
const validateAsymmetricKey = __webpack_require__(7019);
const PS_SUPPORTED = __webpack_require__(4977);
const jws = __webpack_require__(5747);
const {KeyObject, createSecretKey, createPublicKey} = __webpack_require__(6982);

const PUB_KEY_ALGS = ['RS256', 'RS384', 'RS512'];
const EC_KEY_ALGS = ['ES256', 'ES384', 'ES512'];
const RSA_KEY_ALGS = ['RS256', 'RS384', 'RS512'];
const HS_ALGS = ['HS256', 'HS384', 'HS512'];

if (PS_SUPPORTED) {
  PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, 'PS256', 'PS384', 'PS512');
  RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, 'PS256', 'PS384', 'PS512');
}

module.exports = function (jwtString, secretOrPublicKey, options, callback) {
  if ((typeof options === 'function') && !callback) {
    callback = options;
    options = {};
  }

  if (!options) {
    options = {};
  }

  //clone this object since we are going to mutate it.
  options = Object.assign({}, options);

  let done;

  if (callback) {
    done = callback;
  } else {
    done = function(err, data) {
      if (err) throw err;
      return data;
    };
  }

  if (options.clockTimestamp && typeof options.clockTimestamp !== 'number') {
    return done(new JsonWebTokenError('clockTimestamp must be a number'));
  }

  if (options.nonce !== undefined && (typeof options.nonce !== 'string' || options.nonce.trim() === '')) {
    return done(new JsonWebTokenError('nonce must be a non-empty string'));
  }

  if (options.allowInvalidAsymmetricKeyTypes !== undefined && typeof options.allowInvalidAsymmetricKeyTypes !== 'boolean') {
    return done(new JsonWebTokenError('allowInvalidAsymmetricKeyTypes must be a boolean'));
  }

  const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1000);

  if (!jwtString){
    return done(new JsonWebTokenError('jwt must be provided'));
  }

  if (typeof jwtString !== 'string') {
    return done(new JsonWebTokenError('jwt must be a string'));
  }

  const parts = jwtString.split('.');

  if (parts.length !== 3){
    return done(new JsonWebTokenError('jwt malformed'));
  }

  let decodedToken;

  try {
    decodedToken = decode(jwtString, { complete: true });
  } catch(err) {
    return done(err);
  }

  if (!decodedToken) {
    return done(new JsonWebTokenError('invalid token'));
  }

  const header = decodedToken.header;
  let getSecret;

  if(typeof secretOrPublicKey === 'function') {
    if(!callback) {
      return done(new JsonWebTokenError('verify must be called asynchronous if secret or public key is provided as a callback'));
    }

    getSecret = secretOrPublicKey;
  }
  else {
    getSecret = function(header, secretCallback) {
      return secretCallback(null, secretOrPublicKey);
    };
  }

  return getSecret(header, function(err, secretOrPublicKey) {
    if(err) {
      return done(new JsonWebTokenError('error in secret or public key callback: ' + err.message));
    }

    const hasSignature = parts[2].trim() !== '';

    if (!hasSignature && secretOrPublicKey){
      return done(new JsonWebTokenError('jwt signature is required'));
    }

    if (hasSignature && !secretOrPublicKey) {
      return done(new JsonWebTokenError('secret or public key must be provided'));
    }

    if (!hasSignature && !options.algorithms) {
      return done(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
    }

    if (secretOrPublicKey != null && !(secretOrPublicKey instanceof KeyObject)) {
      try {
        secretOrPublicKey = createPublicKey(secretOrPublicKey);
      } catch (_) {
        try {
          secretOrPublicKey = createSecretKey(typeof secretOrPublicKey === 'string' ? Buffer.from(secretOrPublicKey) : secretOrPublicKey);
        } catch (_) {
          return done(new JsonWebTokenError('secretOrPublicKey is not valid key material'))
        }
      }
    }

    if (!options.algorithms) {
      if (secretOrPublicKey.type === 'secret') {
        options.algorithms = HS_ALGS;
      } else if (['rsa', 'rsa-pss'].includes(secretOrPublicKey.asymmetricKeyType)) {
        options.algorithms = RSA_KEY_ALGS
      } else if (secretOrPublicKey.asymmetricKeyType === 'ec') {
        options.algorithms = EC_KEY_ALGS
      } else {
        options.algorithms = PUB_KEY_ALGS
      }
    }

    if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
      return done(new JsonWebTokenError('invalid algorithm'));
    }

    if (header.alg.startsWith('HS') && secretOrPublicKey.type !== 'secret') {
      return done(new JsonWebTokenError((`secretOrPublicKey must be a symmetric key when using ${header.alg}`)))
    } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey.type !== 'public') {
      return done(new JsonWebTokenError((`secretOrPublicKey must be an asymmetric key when using ${header.alg}`)))
    }

    if (!options.allowInvalidAsymmetricKeyTypes) {
      try {
        validateAsymmetricKey(header.alg, secretOrPublicKey);
      } catch (e) {
        return done(e);
      }
    }

    let valid;

    try {
      valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey);
    } catch (e) {
      return done(e);
    }

    if (!valid) {
      return done(new JsonWebTokenError('invalid signature'));
    }

    const payload = decodedToken.payload;

    if (typeof payload.nbf !== 'undefined' && !options.ignoreNotBefore) {
      if (typeof payload.nbf !== 'number') {
        return done(new JsonWebTokenError('invalid nbf value'));
      }
      if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
        return done(new NotBeforeError('jwt not active', new Date(payload.nbf * 1000)));
      }
    }

    if (typeof payload.exp !== 'undefined' && !options.ignoreExpiration) {
      if (typeof payload.exp !== 'number') {
        return done(new JsonWebTokenError('invalid exp value'));
      }
      if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
        return done(new TokenExpiredError('jwt expired', new Date(payload.exp * 1000)));
      }
    }

    if (options.audience) {
      const audiences = Array.isArray(options.audience) ? options.audience : [options.audience];
      const target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];

      const match = target.some(function (targetAudience) {
        return audiences.some(function (audience) {
          return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
        });
      });

      if (!match) {
        return done(new JsonWebTokenError('jwt audience invalid. expected: ' + audiences.join(' or ')));
      }
    }

    if (options.issuer) {
      const invalid_issuer =
              (typeof options.issuer === 'string' && payload.iss !== options.issuer) ||
              (Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1);

      if (invalid_issuer) {
        return done(new JsonWebTokenError('jwt issuer invalid. expected: ' + options.issuer));
      }
    }

    if (options.subject) {
      if (payload.sub !== options.subject) {
        return done(new JsonWebTokenError('jwt subject invalid. expected: ' + options.subject));
      }
    }

    if (options.jwtid) {
      if (payload.jti !== options.jwtid) {
        return done(new JsonWebTokenError('jwt jwtid invalid. expected: ' + options.jwtid));
      }
    }

    if (options.nonce) {
      if (payload.nonce !== options.nonce) {
        return done(new JsonWebTokenError('jwt nonce invalid. expected: ' + options.nonce));
      }
    }

    if (options.maxAge) {
      if (typeof payload.iat !== 'number') {
        return done(new JsonWebTokenError('iat required when maxAge is specified'));
      }

      const maxAgeTimestamp = timespan(options.maxAge, payload.iat);
      if (typeof maxAgeTimestamp === 'undefined') {
        return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
      }
      if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
        return done(new TokenExpiredError('maxAge exceeded', new Date(maxAgeTimestamp * 1000)));
      }
    }

    if (options.complete === true) {
      const signature = decodedToken.signature;

      return done(null, {
        header: header,
        payload: payload,
        signature: signature
      });
    }

    return done(null, payload);
  });
};


/***/ }),

/***/ 4173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const outside = __webpack_require__(5368)
// Determine if version is less than all the versions possible in the range
const ltr = (version, range, options) => outside(version, range, '<', options)
module.exports = ltr


/***/ }),

/***/ 4283:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  h: () => (/* binding */ resolveAwsSdkSigV4Config)
});

// UNUSED EXPORTS: resolveAWSSDKSigV4Config

// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js
var setCredentialFeature = __webpack_require__(244);
// EXTERNAL MODULE: ./node_modules/@smithy/core/dist-es/normalizeProvider.js
var normalizeProvider = __webpack_require__(4367);
;// ./node_modules/@smithy/core/dist-es/util-identity-and-auth/memoizeIdentityProvider.js
const createIsIdentityExpiredFunction = (expirationMs) => (identity) => doesIdentityRequireRefresh(identity) && identity.expiration.getTime() - Date.now() < expirationMs;
const EXPIRATION_MS = 300000;
const isIdentityExpired = createIsIdentityExpiredFunction(EXPIRATION_MS);
const doesIdentityRequireRefresh = (identity) => identity.expiration !== undefined;
const memoizeIdentityProvider = (provider, isExpired, requiresRefresh) => {
    if (provider === undefined) {
        return undefined;
    }
    const normalizedProvider = typeof provider !== "function" ? async () => Promise.resolve(provider) : provider;
    let resolved;
    let pending;
    let hasResult;
    let isConstant = false;
    const coalesceProvider = async (options) => {
        if (!pending) {
            pending = normalizedProvider(options);
        }
        try {
            resolved = await pending;
            hasResult = true;
            isConstant = false;
        }
        finally {
            pending = undefined;
        }
        return resolved;
    };
    if (isExpired === undefined) {
        return async (options) => {
            if (!hasResult || options?.forceRefresh) {
                resolved = await coalesceProvider(options);
            }
            return resolved;
        };
    }
    return async (options) => {
        if (!hasResult || options?.forceRefresh) {
            resolved = await coalesceProvider(options);
        }
        if (isConstant) {
            return resolved;
        }
        if (!requiresRefresh(resolved)) {
            isConstant = true;
            return resolved;
        }
        if (isExpired(resolved)) {
            await coalesceProvider(options);
            return resolved;
        }
        return resolved;
    };
};

// EXTERNAL MODULE: ./node_modules/@smithy/util-hex-encoding/dist-es/index.js
var dist_es = __webpack_require__(8004);
// EXTERNAL MODULE: ./node_modules/@smithy/util-utf8/dist-es/index.js + 3 modules
var util_utf8_dist_es = __webpack_require__(3197);
;// ./node_modules/@smithy/signature-v4/dist-es/constants.js
const ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
const CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
const AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
const SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
const EXPIRES_QUERY_PARAM = "X-Amz-Expires";
const SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
const TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
const REGION_SET_PARAM = "X-Amz-Region-Set";
const AUTH_HEADER = "authorization";
const AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
const DATE_HEADER = "date";
const GENERATED_HEADERS = [AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER];
const SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
const SHA256_HEADER = "x-amz-content-sha256";
const TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
const HOST_HEADER = "host";
const ALWAYS_UNSIGNABLE_HEADERS = {
    authorization: true,
    "cache-control": true,
    connection: true,
    expect: true,
    from: true,
    "keep-alive": true,
    "max-forwards": true,
    pragma: true,
    referer: true,
    te: true,
    trailer: true,
    "transfer-encoding": true,
    upgrade: true,
    "user-agent": true,
    "x-amzn-trace-id": true,
};
const PROXY_HEADER_PATTERN = /^proxy-/;
const SEC_HEADER_PATTERN = /^sec-/;
const UNSIGNABLE_PATTERNS = (/* unused pure expression or super */ null && ([/^proxy-/i, /^sec-/i]));
const ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
const ALGORITHM_IDENTIFIER_V4A = "AWS4-ECDSA-P256-SHA256";
const EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
const UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
const MAX_CACHE_SIZE = 50;
const KEY_TYPE_IDENTIFIER = "aws4_request";
const MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;

;// ./node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js



const signingKeyCache = {};
const cacheQueue = [];
const createScope = (shortDate, region, service) => `${shortDate}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`;
const getSigningKey = async (sha256Constructor, credentials, shortDate, region, service) => {
    const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
    const cacheKey = `${shortDate}:${region}:${service}:${(0,dist_es/* toHex */.n)(credsHash)}:${credentials.sessionToken}`;
    if (cacheKey in signingKeyCache) {
        return signingKeyCache[cacheKey];
    }
    cacheQueue.push(cacheKey);
    while (cacheQueue.length > MAX_CACHE_SIZE) {
        delete signingKeyCache[cacheQueue.shift()];
    }
    let key = `AWS4${credentials.secretAccessKey}`;
    for (const signable of [shortDate, region, service, KEY_TYPE_IDENTIFIER]) {
        key = await hmac(sha256Constructor, key, signable);
    }
    return (signingKeyCache[cacheKey] = key);
};
const clearCredentialCache = () => {
    cacheQueue.length = 0;
    Object.keys(signingKeyCache).forEach((cacheKey) => {
        delete signingKeyCache[cacheKey];
    });
};
const hmac = (ctor, secret, data) => {
    const hash = new ctor(secret);
    hash.update((0,util_utf8_dist_es/* toUint8Array */.Fo)(data));
    return hash.digest();
};

;// ./node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js

const getCanonicalHeaders = ({ headers }, unsignableHeaders, signableHeaders) => {
    const canonical = {};
    for (const headerName of Object.keys(headers).sort()) {
        if (headers[headerName] == undefined) {
            continue;
        }
        const canonicalHeaderName = headerName.toLowerCase();
        if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS ||
            unsignableHeaders?.has(canonicalHeaderName) ||
            PROXY_HEADER_PATTERN.test(canonicalHeaderName) ||
            SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
            if (!signableHeaders || (signableHeaders && !signableHeaders.has(canonicalHeaderName))) {
                continue;
            }
        }
        canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
    }
    return canonical;
};

// EXTERNAL MODULE: ./node_modules/@smithy/is-array-buffer/dist-es/index.js
var is_array_buffer_dist_es = __webpack_require__(3695);
;// ./node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js




const getPayloadHash = async ({ headers, body }, hashConstructor) => {
    for (const headerName of Object.keys(headers)) {
        if (headerName.toLowerCase() === SHA256_HEADER) {
            return headers[headerName];
        }
    }
    if (body == undefined) {
        return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    }
    else if (typeof body === "string" || ArrayBuffer.isView(body) || (0,is_array_buffer_dist_es/* isArrayBuffer */.m)(body)) {
        const hashCtor = new hashConstructor();
        hashCtor.update((0,util_utf8_dist_es/* toUint8Array */.Fo)(body));
        return (0,dist_es/* toHex */.n)(await hashCtor.digest());
    }
    return UNSIGNED_PAYLOAD;
};

;// ./node_modules/@smithy/signature-v4/dist-es/HeaderFormatter.js


class HeaderFormatter {
    format(headers) {
        const chunks = [];
        for (const headerName of Object.keys(headers)) {
            const bytes = (0,util_utf8_dist_es/* fromUtf8 */.ar)(headerName);
            chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
        }
        const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
        let position = 0;
        for (const chunk of chunks) {
            out.set(chunk, position);
            position += chunk.byteLength;
        }
        return out;
    }
    formatHeaderValue(header) {
        switch (header.type) {
            case "boolean":
                return Uint8Array.from([header.value ? 0 : 1]);
            case "byte":
                return Uint8Array.from([2, header.value]);
            case "short":
                const shortView = new DataView(new ArrayBuffer(3));
                shortView.setUint8(0, 3);
                shortView.setInt16(1, header.value, false);
                return new Uint8Array(shortView.buffer);
            case "integer":
                const intView = new DataView(new ArrayBuffer(5));
                intView.setUint8(0, 4);
                intView.setInt32(1, header.value, false);
                return new Uint8Array(intView.buffer);
            case "long":
                const longBytes = new Uint8Array(9);
                longBytes[0] = 5;
                longBytes.set(header.value.bytes, 1);
                return longBytes;
            case "binary":
                const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
                binView.setUint8(0, 6);
                binView.setUint16(1, header.value.byteLength, false);
                const binBytes = new Uint8Array(binView.buffer);
                binBytes.set(header.value, 3);
                return binBytes;
            case "string":
                const utf8Bytes = (0,util_utf8_dist_es/* fromUtf8 */.ar)(header.value);
                const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
                strView.setUint8(0, 7);
                strView.setUint16(1, utf8Bytes.byteLength, false);
                const strBytes = new Uint8Array(strView.buffer);
                strBytes.set(utf8Bytes, 3);
                return strBytes;
            case "timestamp":
                const tsBytes = new Uint8Array(9);
                tsBytes[0] = 8;
                tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
                return tsBytes;
            case "uuid":
                if (!UUID_PATTERN.test(header.value)) {
                    throw new Error(`Invalid UUID received: ${header.value}`);
                }
                const uuidBytes = new Uint8Array(17);
                uuidBytes[0] = 9;
                uuidBytes.set((0,dist_es/* fromHex */.a)(header.value.replace(/\-/g, "")), 1);
                return uuidBytes;
        }
    }
}
var HEADER_VALUE_TYPE;
(function (HEADER_VALUE_TYPE) {
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolTrue"] = 0] = "boolTrue";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolFalse"] = 1] = "boolFalse";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byte"] = 2] = "byte";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["short"] = 3] = "short";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["integer"] = 4] = "integer";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["long"] = 5] = "long";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byteArray"] = 6] = "byteArray";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["string"] = 7] = "string";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["timestamp"] = 8] = "timestamp";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["uuid"] = 9] = "uuid";
})(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
const UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
class Int64 {
    constructor(bytes) {
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
            throw new Error("Int64 buffers must be exactly 8 bytes");
        }
    }
    static fromNumber(number) {
        if (number > 9223372036854776000 || number < -9223372036854776000) {
            throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes = new Uint8Array(8);
        for (let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) {
            bytes[i] = remaining;
        }
        if (number < 0) {
            negate(bytes);
        }
        return new Int64(bytes);
    }
    valueOf() {
        const bytes = this.bytes.slice(0);
        const negative = bytes[0] & 0b10000000;
        if (negative) {
            negate(bytes);
        }
        return parseInt((0,dist_es/* toHex */.n)(bytes), 16) * (negative ? -1 : 1);
    }
    toString() {
        return String(this.valueOf());
    }
}
function negate(bytes) {
    for (let i = 0; i < 8; i++) {
        bytes[i] ^= 0xff;
    }
    for (let i = 7; i > -1; i--) {
        bytes[i]++;
        if (bytes[i] !== 0)
            break;
    }
}

;// ./node_modules/@smithy/signature-v4/dist-es/headerUtil.js
const hasHeader = (soughtHeader, headers) => {
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
            return true;
        }
    }
    return false;
};
const getHeaderValue = (soughtHeader, headers) => {
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
            return headers[headerName];
        }
    }
    return undefined;
};
const deleteHeader = (soughtHeader, headers) => {
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
            delete headers[headerName];
        }
    }
};

// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var protocol_http_dist_es = __webpack_require__(5479);
;// ./node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js

const moveHeadersToQuery = (request, options = {}) => {
    const { headers, query = {} } = protocol_http_dist_es/* HttpRequest */.Kd.clone(request);
    for (const name of Object.keys(headers)) {
        const lname = name.toLowerCase();
        if ((lname.slice(0, 6) === "x-amz-" && !options.unhoistableHeaders?.has(lname)) ||
            options.hoistableHeaders?.has(lname)) {
            query[name] = headers[name];
            delete headers[name];
        }
    }
    return {
        ...request,
        headers,
        query,
    };
};

;// ./node_modules/@smithy/signature-v4/dist-es/prepareRequest.js


const prepareRequest = (request) => {
    request = protocol_http_dist_es/* HttpRequest */.Kd.clone(request);
    for (const headerName of Object.keys(request.headers)) {
        if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
            delete request.headers[headerName];
        }
    }
    return request;
};

// EXTERNAL MODULE: ./node_modules/@smithy/util-middleware/dist-es/index.js + 2 modules
var util_middleware_dist_es = __webpack_require__(7135);
// EXTERNAL MODULE: ./node_modules/@smithy/util-uri-escape/dist-es/escape-uri.js
var escape_uri = __webpack_require__(2531);
;// ./node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js


const getCanonicalQuery = ({ query = {} }) => {
    const keys = [];
    const serialized = {};
    for (const key of Object.keys(query)) {
        if (key.toLowerCase() === SIGNATURE_HEADER) {
            continue;
        }
        const encodedKey = (0,escape_uri/* escapeUri */.o)(key);
        keys.push(encodedKey);
        const value = query[key];
        if (typeof value === "string") {
            serialized[encodedKey] = `${encodedKey}=${(0,escape_uri/* escapeUri */.o)(value)}`;
        }
        else if (Array.isArray(value)) {
            serialized[encodedKey] = value
                .slice(0)
                .reduce((encoded, value) => encoded.concat([`${encodedKey}=${(0,escape_uri/* escapeUri */.o)(value)}`]), [])
                .sort()
                .join("&");
        }
    }
    return keys
        .sort()
        .map((key) => serialized[key])
        .filter((serialized) => serialized)
        .join("&");
};

;// ./node_modules/@smithy/signature-v4/dist-es/utilDate.js
const iso8601 = (time) => toDate(time)
    .toISOString()
    .replace(/\.\d{3}Z$/, "Z");
const toDate = (time) => {
    if (typeof time === "number") {
        return new Date(time * 1000);
    }
    if (typeof time === "string") {
        if (Number(time)) {
            return new Date(Number(time) * 1000);
        }
        return new Date(time);
    }
    return time;
};

;// ./node_modules/@smithy/signature-v4/dist-es/SignatureV4Base.js






class SignatureV4Base {
    constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true, }) {
        this.service = service;
        this.sha256 = sha256;
        this.uriEscapePath = uriEscapePath;
        this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
        this.regionProvider = (0,util_middleware_dist_es/* normalizeProvider */.t)(region);
        this.credentialProvider = (0,util_middleware_dist_es/* normalizeProvider */.t)(credentials);
    }
    createCanonicalRequest(request, canonicalHeaders, payloadHash) {
        const sortedHeaders = Object.keys(canonicalHeaders).sort();
        return `${request.method}
${this.getCanonicalPath(request)}
${getCanonicalQuery(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
    }
    async createStringToSign(longDate, credentialScope, canonicalRequest, algorithmIdentifier) {
        const hash = new this.sha256();
        hash.update((0,util_utf8_dist_es/* toUint8Array */.Fo)(canonicalRequest));
        const hashedRequest = await hash.digest();
        return `${algorithmIdentifier}
${longDate}
${credentialScope}
${(0,dist_es/* toHex */.n)(hashedRequest)}`;
    }
    getCanonicalPath({ path }) {
        if (this.uriEscapePath) {
            const normalizedPathSegments = [];
            for (const pathSegment of path.split("/")) {
                if (pathSegment?.length === 0)
                    continue;
                if (pathSegment === ".")
                    continue;
                if (pathSegment === "..") {
                    normalizedPathSegments.pop();
                }
                else {
                    normalizedPathSegments.push(pathSegment);
                }
            }
            const normalizedPath = `${path?.startsWith("/") ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && path?.endsWith("/") ? "/" : ""}`;
            const doubleEncoded = (0,escape_uri/* escapeUri */.o)(normalizedPath);
            return doubleEncoded.replace(/%2F/g, "/");
        }
        return path;
    }
    validateResolvedCredentials(credentials) {
        if (typeof credentials !== "object" ||
            typeof credentials.accessKeyId !== "string" ||
            typeof credentials.secretAccessKey !== "string") {
            throw new Error("Resolved credential object is not valid");
        }
    }
    formatDate(now) {
        const longDate = iso8601(now).replace(/[\-:]/g, "");
        return {
            longDate,
            shortDate: longDate.slice(0, 8),
        };
    }
    getCanonicalHeaderList(headers) {
        return Object.keys(headers).sort().join(";");
    }
}

;// ./node_modules/@smithy/signature-v4/dist-es/SignatureV4.js











class SignatureV4 extends SignatureV4Base {
    constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true, }) {
        super({
            applyChecksum,
            credentials,
            region,
            service,
            sha256,
            uriEscapePath,
        });
        this.headerFormatter = new HeaderFormatter();
    }
    async presign(originalRequest, options = {}) {
        const { signingDate = new Date(), expiresIn = 3600, unsignableHeaders, unhoistableHeaders, signableHeaders, hoistableHeaders, signingRegion, signingService, } = options;
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? (await this.regionProvider());
        const { longDate, shortDate } = this.formatDate(signingDate);
        if (expiresIn > MAX_PRESIGNED_TTL) {
            return Promise.reject("Signature version 4 presigned URLs" + " must have an expiration date less than one week in" + " the future");
        }
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const request = moveHeadersToQuery(prepareRequest(originalRequest), { unhoistableHeaders, hoistableHeaders });
        if (credentials.sessionToken) {
            request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
        }
        request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
        request.query[CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
        request.query[AMZ_DATE_QUERY_PARAM] = longDate;
        request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        request.query[SIGNED_HEADERS_QUERY_PARAM] = this.getCanonicalHeaderList(canonicalHeaders);
        request.query[SIGNATURE_QUERY_PARAM] = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, await getPayloadHash(originalRequest, this.sha256)));
        return request;
    }
    async sign(toSign, options) {
        if (typeof toSign === "string") {
            return this.signString(toSign, options);
        }
        else if (toSign.headers && toSign.payload) {
            return this.signEvent(toSign, options);
        }
        else if (toSign.message) {
            return this.signMessage(toSign, options);
        }
        else {
            return this.signRequest(toSign, options);
        }
    }
    async signEvent({ headers, payload }, { signingDate = new Date(), priorSignature, signingRegion, signingService }) {
        const region = signingRegion ?? (await this.regionProvider());
        const { shortDate, longDate } = this.formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const hashedPayload = await getPayloadHash({ headers: {}, body: payload }, this.sha256);
        const hash = new this.sha256();
        hash.update(headers);
        const hashedHeaders = (0,dist_es/* toHex */.n)(await hash.digest());
        const stringToSign = [
            EVENT_ALGORITHM_IDENTIFIER,
            longDate,
            scope,
            priorSignature,
            hashedHeaders,
            hashedPayload,
        ].join("\n");
        return this.signString(stringToSign, { signingDate, signingRegion: region, signingService });
    }
    async signMessage(signableMessage, { signingDate = new Date(), signingRegion, signingService }) {
        const promise = this.signEvent({
            headers: this.headerFormatter.format(signableMessage.message.headers),
            payload: signableMessage.message.body,
        }, {
            signingDate,
            signingRegion,
            signingService,
            priorSignature: signableMessage.priorSignature,
        });
        return promise.then((signature) => {
            return { message: signableMessage.message, signature };
        });
    }
    async signString(stringToSign, { signingDate = new Date(), signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? (await this.regionProvider());
        const { shortDate } = this.formatDate(signingDate);
        const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
        hash.update((0,util_utf8_dist_es/* toUint8Array */.Fo)(stringToSign));
        return (0,dist_es/* toHex */.n)(await hash.digest());
    }
    async signRequest(requestToSign, { signingDate = new Date(), signableHeaders, unsignableHeaders, signingRegion, signingService, } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? (await this.regionProvider());
        const request = prepareRequest(requestToSign);
        const { longDate, shortDate } = this.formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        request.headers[AMZ_DATE_HEADER] = longDate;
        if (credentials.sessionToken) {
            request.headers[TOKEN_HEADER] = credentials.sessionToken;
        }
        const payloadHash = await getPayloadHash(request, this.sha256);
        if (!hasHeader(SHA256_HEADER, request.headers) && this.applyChecksum) {
            request.headers[SHA256_HEADER] = payloadHash;
        }
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        const signature = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash));
        request.headers[AUTH_HEADER] =
            `${ALGORITHM_IDENTIFIER} ` +
                `Credential=${credentials.accessKeyId}/${scope}, ` +
                `SignedHeaders=${this.getCanonicalHeaderList(canonicalHeaders)}, ` +
                `Signature=${signature}`;
        return request;
    }
    async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
        const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest, ALGORITHM_IDENTIFIER);
        const hash = new this.sha256(await keyPromise);
        hash.update((0,util_utf8_dist_es/* toUint8Array */.Fo)(stringToSign));
        return (0,dist_es/* toHex */.n)(await hash.digest());
    }
    getSigningKey(credentials, region, shortDate, service) {
        return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
    }
}

;// ./node_modules/@smithy/signature-v4/dist-es/signature-v4a-container.js
const signatureV4aContainer = {
    SignatureV4a: null,
};

;// ./node_modules/@smithy/signature-v4/dist-es/index.js












;// ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js



const resolveAwsSdkSigV4Config = (config) => {
    let inputCredentials = config.credentials;
    let isUserSupplied = !!config.credentials;
    let resolvedCredentials = undefined;
    Object.defineProperty(config, "credentials", {
        set(credentials) {
            if (credentials && credentials !== inputCredentials && credentials !== resolvedCredentials) {
                isUserSupplied = true;
            }
            inputCredentials = credentials;
            const memoizedProvider = normalizeCredentialProvider(config, {
                credentials: inputCredentials,
                credentialDefaultProvider: config.credentialDefaultProvider,
            });
            const boundProvider = bindCallerConfig(config, memoizedProvider);
            if (isUserSupplied && !boundProvider.attributed) {
                resolvedCredentials = async (options) => boundProvider(options).then((creds) => (0,setCredentialFeature/* setCredentialFeature */.g)(creds, "CREDENTIALS_CODE", "e"));
                resolvedCredentials.memoized = boundProvider.memoized;
                resolvedCredentials.configBound = boundProvider.configBound;
                resolvedCredentials.attributed = true;
            }
            else {
                resolvedCredentials = boundProvider;
            }
        },
        get() {
            return resolvedCredentials;
        },
        enumerable: true,
        configurable: true,
    });
    config.credentials = inputCredentials;
    const { signingEscapePath = true, systemClockOffset = config.systemClockOffset || 0, sha256, } = config;
    let signer;
    if (config.signer) {
        signer = (0,normalizeProvider/* normalizeProvider */.t)(config.signer);
    }
    else if (config.regionInfoProvider) {
        signer = () => (0,normalizeProvider/* normalizeProvider */.t)(config.region)()
            .then(async (region) => [
            (await config.regionInfoProvider(region, {
                useFipsEndpoint: await config.useFipsEndpoint(),
                useDualstackEndpoint: await config.useDualstackEndpoint(),
            })) || {},
            region,
        ])
            .then(([regionInfo, region]) => {
            const { signingRegion, signingService } = regionInfo;
            config.signingRegion = config.signingRegion || signingRegion || region;
            config.signingName = config.signingName || signingService || config.serviceId;
            const params = {
                ...config,
                credentials: config.credentials,
                region: config.signingRegion,
                service: config.signingName,
                sha256,
                uriEscapePath: signingEscapePath,
            };
            const SignerCtor = config.signerConstructor || SignatureV4;
            return new SignerCtor(params);
        });
    }
    else {
        signer = async (authScheme) => {
            authScheme = Object.assign({}, {
                name: "sigv4",
                signingName: config.signingName || config.defaultSigningName,
                signingRegion: await (0,normalizeProvider/* normalizeProvider */.t)(config.region)(),
                properties: {},
            }, authScheme);
            const signingRegion = authScheme.signingRegion;
            const signingService = authScheme.signingName;
            config.signingRegion = config.signingRegion || signingRegion;
            config.signingName = config.signingName || signingService || config.serviceId;
            const params = {
                ...config,
                credentials: config.credentials,
                region: config.signingRegion,
                service: config.signingName,
                sha256,
                uriEscapePath: signingEscapePath,
            };
            const SignerCtor = config.signerConstructor || SignatureV4;
            return new SignerCtor(params);
        };
    }
    const resolvedConfig = Object.assign(config, {
        systemClockOffset,
        signingEscapePath,
        signer,
    });
    return resolvedConfig;
};
const resolveAWSSDKSigV4Config = (/* unused pure expression or super */ null && (resolveAwsSdkSigV4Config));
function normalizeCredentialProvider(config, { credentials, credentialDefaultProvider, }) {
    let credentialsProvider;
    if (credentials) {
        if (!credentials?.memoized) {
            credentialsProvider = memoizeIdentityProvider(credentials, isIdentityExpired, doesIdentityRequireRefresh);
        }
        else {
            credentialsProvider = credentials;
        }
    }
    else {
        if (credentialDefaultProvider) {
            credentialsProvider = (0,normalizeProvider/* normalizeProvider */.t)(credentialDefaultProvider(Object.assign({}, config, {
                parentClientConfig: config,
            })));
        }
        else {
            credentialsProvider = async () => {
                throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
            };
        }
    }
    credentialsProvider.memoized = true;
    return credentialsProvider;
}
function bindCallerConfig(config, credentialsProvider) {
    if (credentialsProvider.configBound) {
        return credentialsProvider;
    }
    const fn = async (options) => credentialsProvider({ ...options, callerClientConfig: config });
    fn.memoized = credentialsProvider.memoized;
    fn.configBound = true;
    return fn;
}


/***/ }),

/***/ 4321:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  I: () => (/* reexport */ resolveDefaultsModeConfig)
});

// EXTERNAL MODULE: ./node_modules/@smithy/config-resolver/dist-es/index.js + 13 modules
var dist_es = __webpack_require__(1487);
// EXTERNAL MODULE: ./node_modules/@smithy/node-config-provider/dist-es/index.js + 5 modules
var node_config_provider_dist_es = __webpack_require__(9987);
// EXTERNAL MODULE: ./node_modules/@smithy/property-provider/dist-es/index.js + 6 modules
var property_provider_dist_es = __webpack_require__(8112);
;// ./node_modules/@smithy/util-defaults-mode-node/dist-es/constants.js
const AWS_EXECUTION_ENV = "AWS_EXECUTION_ENV";
const AWS_REGION_ENV = "AWS_REGION";
const AWS_DEFAULT_REGION_ENV = "AWS_DEFAULT_REGION";
const ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
const DEFAULTS_MODE_OPTIONS = ["in-region", "cross-region", "mobile", "standard", "legacy"];
const IMDS_REGION_PATH = "/latest/meta-data/placement/region";

;// ./node_modules/@smithy/util-defaults-mode-node/dist-es/defaultsModeConfig.js
const AWS_DEFAULTS_MODE_ENV = "AWS_DEFAULTS_MODE";
const AWS_DEFAULTS_MODE_CONFIG = "defaults_mode";
const NODE_DEFAULTS_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => {
        return env[AWS_DEFAULTS_MODE_ENV];
    },
    configFileSelector: (profile) => {
        return profile[AWS_DEFAULTS_MODE_CONFIG];
    },
    default: "legacy",
};

;// ./node_modules/@smithy/util-defaults-mode-node/dist-es/resolveDefaultsModeConfig.js





const resolveDefaultsModeConfig = ({ region = (0,node_config_provider_dist_es/* loadConfig */.Z)(dist_es/* NODE_REGION_CONFIG_OPTIONS */.GG), defaultsMode = (0,node_config_provider_dist_es/* loadConfig */.Z)(NODE_DEFAULTS_MODE_CONFIG_OPTIONS), } = {}) => (0,property_provider_dist_es/* memoize */.Bj)(async () => {
    const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
    switch (mode?.toLowerCase()) {
        case "auto":
            return resolveNodeDefaultsModeAuto(region);
        case "in-region":
        case "cross-region":
        case "mobile":
        case "standard":
        case "legacy":
            return Promise.resolve(mode?.toLocaleLowerCase());
        case undefined:
            return Promise.resolve("legacy");
        default:
            throw new Error(`Invalid parameter for "defaultsMode", expect ${DEFAULTS_MODE_OPTIONS.join(", ")}, got ${mode}`);
    }
});
const resolveNodeDefaultsModeAuto = async (clientRegion) => {
    if (clientRegion) {
        const resolvedRegion = typeof clientRegion === "function" ? await clientRegion() : clientRegion;
        const inferredRegion = await inferPhysicalRegion();
        if (!inferredRegion) {
            return "standard";
        }
        if (resolvedRegion === inferredRegion) {
            return "in-region";
        }
        else {
            return "cross-region";
        }
    }
    return "standard";
};
const inferPhysicalRegion = async () => {
    if (process.env[AWS_EXECUTION_ENV] && (process.env[AWS_REGION_ENV] || process.env[AWS_DEFAULT_REGION_ENV])) {
        return process.env[AWS_REGION_ENV] ?? process.env[AWS_DEFAULT_REGION_ENV];
    }
    if (!process.env[ENV_IMDS_DISABLED]) {
        try {
            const { getInstanceMetadataEndpoint, httpRequest } = await __webpack_require__.e(/* import() */ 897).then(__webpack_require__.bind(__webpack_require__, 7897));
            const endpoint = await getInstanceMetadataEndpoint();
            return (await httpRequest({ ...endpoint, path: IMDS_REGION_PATH })).toString();
        }
        catch (e) {
        }
    }
};

;// ./node_modules/@smithy/util-defaults-mode-node/dist-es/index.js



/***/ }),

/***/ 4367:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ normalizeProvider)
/* harmony export */ });
const normalizeProvider = (input) => {
    if (typeof input === "function")
        return input;
    const promisified = Promise.resolve(input);
    return () => promisified;
};


/***/ }),

/***/ 4472:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $: () => (/* binding */ NODE_AUTH_SCHEME_PREFERENCE_OPTIONS)
});

;// ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getArrayForCommaSeparatedString.js
const getArrayForCommaSeparatedString = (str) => typeof str === "string" && str.length > 0 ? str.split(",").map((item) => item.trim()) : [];

;// ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getBearerTokenEnvKey.js
const getBearerTokenEnvKey = (signingName) => `AWS_BEARER_TOKEN_${signingName.replace(/[\s-]/g, "_").toUpperCase()}`;

;// ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js


const NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY = "AWS_AUTH_SCHEME_PREFERENCE";
const NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY = "auth_scheme_preference";
const NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = {
    environmentVariableSelector: (env, options) => {
        if (options?.signingName) {
            const bearerTokenKey = getBearerTokenEnvKey(options.signingName);
            if (bearerTokenKey in env)
                return ["httpBearerAuth"];
        }
        if (!(NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY in env))
            return undefined;
        return getArrayForCommaSeparatedString(env[NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY]);
    },
    configFileSelector: (profile) => {
        if (!(NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY in profile))
            return undefined;
        return getArrayForCommaSeparatedString(profile[NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY]);
    },
    default: [],
};


/***/ }),

/***/ 4506:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const compare = __webpack_require__(3701)
const eq = (a, b, loose) => compare(a, b, loose) === 0
module.exports = eq


/***/ }),

/***/ 4517:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ ScanCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class ScanCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "Scan", {})
    .n("DynamoDBClient", "ScanCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_ScanCommand */ .o$)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_ScanCommand */ .Lm)
    .build() {
}


/***/ }),

/***/ 4542:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  h5: () => (/* binding */ isClockSkewError),
  S0: () => (/* binding */ isRetryableByTrait),
  GQ: () => (/* binding */ isServerError),
  Qb: () => (/* binding */ isThrottlingError),
  bV: () => (/* binding */ isTransientError)
});

// UNUSED EXPORTS: isBrowserNetworkError, isClockSkewCorrectedError

;// ./node_modules/@smithy/service-error-classification/dist-es/constants.js
const CLOCK_SKEW_ERROR_CODES = [
    "AuthFailure",
    "InvalidSignatureException",
    "RequestExpired",
    "RequestInTheFuture",
    "RequestTimeTooSkewed",
    "SignatureDoesNotMatch",
];
const THROTTLING_ERROR_CODES = [
    "BandwidthLimitExceeded",
    "EC2ThrottledException",
    "LimitExceededException",
    "PriorRequestNotComplete",
    "ProvisionedThroughputExceededException",
    "RequestLimitExceeded",
    "RequestThrottled",
    "RequestThrottledException",
    "SlowDown",
    "ThrottledException",
    "Throttling",
    "ThrottlingException",
    "TooManyRequestsException",
    "TransactionInProgressException",
];
const TRANSIENT_ERROR_CODES = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"];
const TRANSIENT_ERROR_STATUS_CODES = [500, 502, 503, 504];
const NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"];
const NODEJS_NETWORK_ERROR_CODES = ["EHOSTUNREACH", "ENETUNREACH", "ENOTFOUND"];

;// ./node_modules/@smithy/service-error-classification/dist-es/index.js

const isRetryableByTrait = (error) => error.$retryable !== undefined;
const isClockSkewError = (error) => CLOCK_SKEW_ERROR_CODES.includes(error.name);
const isClockSkewCorrectedError = (error) => error.$metadata?.clockSkewCorrected;
const isBrowserNetworkError = (error) => {
    const errorMessages = new Set([
        "Failed to fetch",
        "NetworkError when attempting to fetch resource",
        "The Internet connection appears to be offline",
        "Load failed",
        "Network request failed",
    ]);
    const isValid = error && error instanceof TypeError;
    if (!isValid) {
        return false;
    }
    return errorMessages.has(error.message);
};
const isThrottlingError = (error) => error.$metadata?.httpStatusCode === 429 ||
    THROTTLING_ERROR_CODES.includes(error.name) ||
    error.$retryable?.throttling == true;
const isTransientError = (error, depth = 0) => isClockSkewCorrectedError(error) ||
    TRANSIENT_ERROR_CODES.includes(error.name) ||
    NODEJS_TIMEOUT_ERROR_CODES.includes(error?.code || "") ||
    NODEJS_NETWORK_ERROR_CODES.includes(error?.code || "") ||
    TRANSIENT_ERROR_STATUS_CODES.includes(error.$metadata?.httpStatusCode || 0) ||
    isBrowserNetworkError(error) ||
    (error.cause !== undefined && depth <= 10 && isTransientError(error.cause, depth + 1));
const isServerError = (error) => {
    if (error.$metadata?.httpStatusCode !== undefined) {
        const statusCode = error.$metadata.httpStatusCode;
        if (500 <= statusCode && statusCode <= 599 && !isTransientError(error)) {
            return true;
        }
        return false;
    }
    return false;
};


/***/ }),

/***/ 4572:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  E: () => (/* reexport */ fromBase64),
  n: () => (/* reexport */ toBase64)
});

// EXTERNAL MODULE: ./node_modules/@smithy/util-buffer-from/dist-es/index.js
var dist_es = __webpack_require__(9290);
;// ./node_modules/@smithy/util-base64/dist-es/fromBase64.js

const BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
const fromBase64 = (input) => {
    if ((input.length * 3) % 4 !== 0) {
        throw new TypeError(`Incorrect padding on base64 string.`);
    }
    if (!BASE64_REGEX.exec(input)) {
        throw new TypeError(`Invalid base64 string.`);
    }
    const buffer = (0,dist_es/* fromString */.s)(input, "base64");
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
};

// EXTERNAL MODULE: ./node_modules/@smithy/util-utf8/dist-es/index.js + 3 modules
var util_utf8_dist_es = __webpack_require__(3197);
;// ./node_modules/@smithy/util-base64/dist-es/toBase64.js


const toBase64 = (_input) => {
    let input;
    if (typeof _input === "string") {
        input = (0,util_utf8_dist_es/* fromUtf8 */.ar)(_input);
    }
    else {
        input = _input;
    }
    if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
    }
    return (0,dist_es/* fromArrayBuffer */.Q)(input.buffer, input.byteOffset, input.byteLength).toString("base64");
};

;// ./node_modules/@smithy/util-base64/dist-es/index.js




/***/ }),

/***/ 4623:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const semver = __webpack_require__(5864);

module.exports = semver.satisfies(process.version, '>=16.9.0');


/***/ }),

/***/ 4654:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const compare = __webpack_require__(3701)
const neq = (a, b, loose) => compare(a, b, loose) !== 0
module.exports = neq


/***/ }),

/***/ 4820:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Kj: () => (/* reexport */ Client),
  uB: () => (/* reexport */ Command),
  N4: () => (/* reexport */ NoOpLogger),
  $H: () => (/* reexport */ SENSITIVE_STRING),
  TJ: () => (/* reexport */ ServiceException),
  Ss: () => (/* reexport */ _json),
  Px: () => (/* reexport */ collectBody),
  J1: () => (/* reexport */ createAggregatedClient),
  Mw: () => (/* reexport */ decorateServiceException),
  I9: () => (/* reexport */ emitWarningIfUnsupportedVersion),
  ak: () => (/* reexport */ expectBoolean),
  ET: () => (/* reexport */ expectInt32),
  Yy: () => (/* reexport */ expectLong),
  Y0: () => (/* reexport */ expectNonNull),
  r$: () => (/* reexport */ expectNumber),
  Xk: () => (/* reexport */ expectObject),
  lK: () => (/* reexport */ expectString),
  tN: () => (/* reexport */ expectUnion),
  $6: () => (/* reexport */ extended_encode_uri_component/* extendedEncodeURIComponent */.$),
  xA: () => (/* reexport */ getDefaultExtensionConfiguration),
  rm: () => (/* reexport */ getValueFromTextNode),
  eU: () => (/* reexport */ isSerializableHeaderValue),
  JW: () => (/* reexport */ limitedParseDouble),
  lT: () => (/* reexport */ loadConfigsForDefaultMode),
  Tj: () => (/* reexport */ map),
  l3: () => (/* reexport */ parseEpochTimestamp),
  EI: () => (/* reexport */ parseRfc3339DateTime),
  t_: () => (/* reexport */ parseRfc3339DateTimeWithOffset),
  uv: () => (/* reexport */ resolveDefaultRuntimeConfig),
  VA: () => (/* reexport */ serializeFloat),
  xW: () => (/* reexport */ strictParseInt32),
  s: () => (/* reexport */ take),
  jr: () => (/* reexport */ withBaseException)
});

// UNUSED EXPORTS: LazyJsonString, NumericValue, convertMap, copyDocumentWithTransform, dateToUtcString, expectByte, expectFloat32, expectInt, expectShort, generateIdempotencyToken, getArrayIfSingleItem, getDefaultClientConfiguration, handleFloat, limitedParseFloat, limitedParseFloat32, logger, nv, parseBoolean, parseRfc7231DateTime, quoteHeader, resolvedPath, serializeDateTime, splitEvery, splitHeader, strictParseByte, strictParseDouble, strictParseFloat, strictParseFloat32, strictParseInt, strictParseLong, strictParseShort, throwDefaultError

;// ./node_modules/@smithy/middleware-stack/dist-es/MiddlewareStack.js
const getAllAliases = (name, aliases) => {
    const _aliases = [];
    if (name) {
        _aliases.push(name);
    }
    if (aliases) {
        for (const alias of aliases) {
            _aliases.push(alias);
        }
    }
    return _aliases;
};
const getMiddlewareNameWithAliases = (name, aliases) => {
    return `${name || "anonymous"}${aliases && aliases.length > 0 ? ` (a.k.a. ${aliases.join(",")})` : ""}`;
};
const constructStack = () => {
    let absoluteEntries = [];
    let relativeEntries = [];
    let identifyOnResolve = false;
    const entriesNameSet = new Set();
    const sort = (entries) => entries.sort((a, b) => stepWeights[b.step] - stepWeights[a.step] ||
        priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"]);
    const removeByName = (toRemove) => {
        let isRemoved = false;
        const filterCb = (entry) => {
            const aliases = getAllAliases(entry.name, entry.aliases);
            if (aliases.includes(toRemove)) {
                isRemoved = true;
                for (const alias of aliases) {
                    entriesNameSet.delete(alias);
                }
                return false;
            }
            return true;
        };
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    };
    const removeByReference = (toRemove) => {
        let isRemoved = false;
        const filterCb = (entry) => {
            if (entry.middleware === toRemove) {
                isRemoved = true;
                for (const alias of getAllAliases(entry.name, entry.aliases)) {
                    entriesNameSet.delete(alias);
                }
                return false;
            }
            return true;
        };
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    };
    const cloneTo = (toStack) => {
        absoluteEntries.forEach((entry) => {
            toStack.add(entry.middleware, { ...entry });
        });
        relativeEntries.forEach((entry) => {
            toStack.addRelativeTo(entry.middleware, { ...entry });
        });
        toStack.identifyOnResolve?.(stack.identifyOnResolve());
        return toStack;
    };
    const expandRelativeMiddlewareList = (from) => {
        const expandedMiddlewareList = [];
        from.before.forEach((entry) => {
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            }
            else {
                expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
            }
        });
        expandedMiddlewareList.push(from);
        from.after.reverse().forEach((entry) => {
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            }
            else {
                expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
            }
        });
        return expandedMiddlewareList;
    };
    const getMiddlewareList = (debug = false) => {
        const normalizedAbsoluteEntries = [];
        const normalizedRelativeEntries = [];
        const normalizedEntriesNameMap = {};
        absoluteEntries.forEach((entry) => {
            const normalizedEntry = {
                ...entry,
                before: [],
                after: [],
            };
            for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
                normalizedEntriesNameMap[alias] = normalizedEntry;
            }
            normalizedAbsoluteEntries.push(normalizedEntry);
        });
        relativeEntries.forEach((entry) => {
            const normalizedEntry = {
                ...entry,
                before: [],
                after: [],
            };
            for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
                normalizedEntriesNameMap[alias] = normalizedEntry;
            }
            normalizedRelativeEntries.push(normalizedEntry);
        });
        normalizedRelativeEntries.forEach((entry) => {
            if (entry.toMiddleware) {
                const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
                if (toMiddleware === undefined) {
                    if (debug) {
                        return;
                    }
                    throw new Error(`${entry.toMiddleware} is not found when adding ` +
                        `${getMiddlewareNameWithAliases(entry.name, entry.aliases)} ` +
                        `middleware ${entry.relation} ${entry.toMiddleware}`);
                }
                if (entry.relation === "after") {
                    toMiddleware.after.push(entry);
                }
                if (entry.relation === "before") {
                    toMiddleware.before.push(entry);
                }
            }
        });
        const mainChain = sort(normalizedAbsoluteEntries)
            .map(expandRelativeMiddlewareList)
            .reduce((wholeList, expandedMiddlewareList) => {
            wholeList.push(...expandedMiddlewareList);
            return wholeList;
        }, []);
        return mainChain;
    };
    const stack = {
        add: (middleware, options = {}) => {
            const { name, override, aliases: _aliases } = options;
            const entry = {
                step: "initialize",
                priority: "normal",
                middleware,
                ...options,
            };
            const aliases = getAllAliases(name, _aliases);
            if (aliases.length > 0) {
                if (aliases.some((alias) => entriesNameSet.has(alias))) {
                    if (!override)
                        throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
                    for (const alias of aliases) {
                        const toOverrideIndex = absoluteEntries.findIndex((entry) => entry.name === alias || entry.aliases?.some((a) => a === alias));
                        if (toOverrideIndex === -1) {
                            continue;
                        }
                        const toOverride = absoluteEntries[toOverrideIndex];
                        if (toOverride.step !== entry.step || entry.priority !== toOverride.priority) {
                            throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware with ` +
                                `${toOverride.priority} priority in ${toOverride.step} step cannot ` +
                                `be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware with ` +
                                `${entry.priority} priority in ${entry.step} step.`);
                        }
                        absoluteEntries.splice(toOverrideIndex, 1);
                    }
                }
                for (const alias of aliases) {
                    entriesNameSet.add(alias);
                }
            }
            absoluteEntries.push(entry);
        },
        addRelativeTo: (middleware, options) => {
            const { name, override, aliases: _aliases } = options;
            const entry = {
                middleware,
                ...options,
            };
            const aliases = getAllAliases(name, _aliases);
            if (aliases.length > 0) {
                if (aliases.some((alias) => entriesNameSet.has(alias))) {
                    if (!override)
                        throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
                    for (const alias of aliases) {
                        const toOverrideIndex = relativeEntries.findIndex((entry) => entry.name === alias || entry.aliases?.some((a) => a === alias));
                        if (toOverrideIndex === -1) {
                            continue;
                        }
                        const toOverride = relativeEntries[toOverrideIndex];
                        if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
                            throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware ` +
                                `${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden ` +
                                `by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware ${entry.relation} ` +
                                `"${entry.toMiddleware}" middleware.`);
                        }
                        relativeEntries.splice(toOverrideIndex, 1);
                    }
                }
                for (const alias of aliases) {
                    entriesNameSet.add(alias);
                }
            }
            relativeEntries.push(entry);
        },
        clone: () => cloneTo(constructStack()),
        use: (plugin) => {
            plugin.applyToStack(stack);
        },
        remove: (toRemove) => {
            if (typeof toRemove === "string")
                return removeByName(toRemove);
            else
                return removeByReference(toRemove);
        },
        removeByTag: (toRemove) => {
            let isRemoved = false;
            const filterCb = (entry) => {
                const { tags, name, aliases: _aliases } = entry;
                if (tags && tags.includes(toRemove)) {
                    const aliases = getAllAliases(name, _aliases);
                    for (const alias of aliases) {
                        entriesNameSet.delete(alias);
                    }
                    isRemoved = true;
                    return false;
                }
                return true;
            };
            absoluteEntries = absoluteEntries.filter(filterCb);
            relativeEntries = relativeEntries.filter(filterCb);
            return isRemoved;
        },
        concat: (from) => {
            const cloned = cloneTo(constructStack());
            cloned.use(from);
            cloned.identifyOnResolve(identifyOnResolve || cloned.identifyOnResolve() || (from.identifyOnResolve?.() ?? false));
            return cloned;
        },
        applyToStack: cloneTo,
        identify: () => {
            return getMiddlewareList(true).map((mw) => {
                const step = mw.step ??
                    mw.relation +
                        " " +
                        mw.toMiddleware;
                return getMiddlewareNameWithAliases(mw.name, mw.aliases) + " - " + step;
            });
        },
        identifyOnResolve(toggle) {
            if (typeof toggle === "boolean")
                identifyOnResolve = toggle;
            return identifyOnResolve;
        },
        resolve: (handler, context) => {
            for (const middleware of getMiddlewareList()
                .map((entry) => entry.middleware)
                .reverse()) {
                handler = middleware(handler, context);
            }
            if (identifyOnResolve) {
                console.log(stack.identify());
            }
            return handler;
        },
    };
    return stack;
};
const stepWeights = {
    initialize: 5,
    serialize: 4,
    build: 3,
    finalizeRequest: 2,
    deserialize: 1,
};
const priorityWeights = {
    high: 3,
    normal: 2,
    low: 1,
};

;// ./node_modules/@smithy/middleware-stack/dist-es/index.js


;// ./node_modules/@smithy/smithy-client/dist-es/client.js

class Client {
    constructor(config) {
        this.config = config;
        this.middlewareStack = constructStack();
    }
    send(command, optionsOrCb, cb) {
        const options = typeof optionsOrCb !== "function" ? optionsOrCb : undefined;
        const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
        const useHandlerCache = options === undefined && this.config.cacheMiddleware === true;
        let handler;
        if (useHandlerCache) {
            if (!this.handlers) {
                this.handlers = new WeakMap();
            }
            const handlers = this.handlers;
            if (handlers.has(command.constructor)) {
                handler = handlers.get(command.constructor);
            }
            else {
                handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
                handlers.set(command.constructor, handler);
            }
        }
        else {
            delete this.handlers;
            handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
        }
        if (callback) {
            handler(command)
                .then((result) => callback(null, result.output), (err) => callback(err))
                .catch(() => { });
        }
        else {
            return handler(command).then((result) => result.output);
        }
    }
    destroy() {
        this.config?.requestHandler?.destroy?.();
        delete this.handlers;
    }
}

// EXTERNAL MODULE: ./node_modules/@smithy/util-stream/dist-es/index.js + 17 modules
var dist_es = __webpack_require__(6728);
;// ./node_modules/@smithy/core/dist-es/submodules/protocols/collect-stream-body.js

const collectBody = async (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return dist_es/* Uint8ArrayBlobAdapter */.Mu.mutate(streamBody);
    }
    if (!streamBody) {
        return dist_es/* Uint8ArrayBlobAdapter */.Mu.mutate(new Uint8Array());
    }
    const fromContext = context.streamCollector(streamBody);
    return dist_es/* Uint8ArrayBlobAdapter */.Mu.mutate(await fromContext);
};

;// ./node_modules/@smithy/smithy-client/dist-es/collect-stream-body.js


// EXTERNAL MODULE: ./node_modules/@smithy/types/dist-es/index.js + 11 modules
var types_dist_es = __webpack_require__(7523);
;// ./node_modules/@smithy/smithy-client/dist-es/command.js


class Command {
    constructor() {
        this.middlewareStack = constructStack();
    }
    static classBuilder() {
        return new ClassBuilder();
    }
    resolveMiddlewareWithContext(clientStack, configuration, options, { middlewareFn, clientName, commandName, inputFilterSensitiveLog, outputFilterSensitiveLog, smithyContext, additionalContext, CommandCtor, }) {
        for (const mw of middlewareFn.bind(this)(CommandCtor, clientStack, configuration, options)) {
            this.middlewareStack.use(mw);
        }
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog,
            outputFilterSensitiveLog,
            [types_dist_es/* SMITHY_CONTEXT_KEY */.Vf]: {
                commandInstance: this,
                ...smithyContext,
            },
            ...additionalContext,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
}
class ClassBuilder {
    constructor() {
        this._init = () => { };
        this._ep = {};
        this._middlewareFn = () => [];
        this._commandName = "";
        this._clientName = "";
        this._additionalContext = {};
        this._smithyContext = {};
        this._inputFilterSensitiveLog = (_) => _;
        this._outputFilterSensitiveLog = (_) => _;
        this._serializer = null;
        this._deserializer = null;
    }
    init(cb) {
        this._init = cb;
    }
    ep(endpointParameterInstructions) {
        this._ep = endpointParameterInstructions;
        return this;
    }
    m(middlewareSupplier) {
        this._middlewareFn = middlewareSupplier;
        return this;
    }
    s(service, operation, smithyContext = {}) {
        this._smithyContext = {
            service,
            operation,
            ...smithyContext,
        };
        return this;
    }
    c(additionalContext = {}) {
        this._additionalContext = additionalContext;
        return this;
    }
    n(clientName, commandName) {
        this._clientName = clientName;
        this._commandName = commandName;
        return this;
    }
    f(inputFilter = (_) => _, outputFilter = (_) => _) {
        this._inputFilterSensitiveLog = inputFilter;
        this._outputFilterSensitiveLog = outputFilter;
        return this;
    }
    ser(serializer) {
        this._serializer = serializer;
        return this;
    }
    de(deserializer) {
        this._deserializer = deserializer;
        return this;
    }
    sc(operation) {
        this._operationSchema = operation;
        this._smithyContext.operationSchema = operation;
        return this;
    }
    build() {
        const closure = this;
        let CommandRef;
        return (CommandRef = class extends Command {
            static getEndpointParameterInstructions() {
                return closure._ep;
            }
            constructor(...[input]) {
                super();
                this.serialize = closure._serializer;
                this.deserialize = closure._deserializer;
                this.input = input ?? {};
                closure._init(this);
                this.schema = closure._operationSchema;
            }
            resolveMiddleware(stack, configuration, options) {
                return this.resolveMiddlewareWithContext(stack, configuration, options, {
                    CommandCtor: CommandRef,
                    middlewareFn: closure._middlewareFn,
                    clientName: closure._clientName,
                    commandName: closure._commandName,
                    inputFilterSensitiveLog: closure._inputFilterSensitiveLog,
                    outputFilterSensitiveLog: closure._outputFilterSensitiveLog,
                    smithyContext: closure._smithyContext,
                    additionalContext: closure._additionalContext,
                });
            }
        });
    }
}

;// ./node_modules/@smithy/smithy-client/dist-es/constants.js
const SENSITIVE_STRING = "***SensitiveInformation***";

;// ./node_modules/@smithy/smithy-client/dist-es/create-aggregated-client.js
const createAggregatedClient = (commands, Client) => {
    for (const command of Object.keys(commands)) {
        const CommandCtor = commands[command];
        const methodImpl = async function (args, optionsOrCb, cb) {
            const command = new CommandCtor(args);
            if (typeof optionsOrCb === "function") {
                this.send(command, optionsOrCb);
            }
            else if (typeof cb === "function") {
                if (typeof optionsOrCb !== "object")
                    throw new Error(`Expected http options but got ${typeof optionsOrCb}`);
                this.send(command, optionsOrCb || {}, cb);
            }
            else {
                return this.send(command, optionsOrCb);
            }
        };
        const methodName = (command[0].toLowerCase() + command.slice(1)).replace(/Command$/, "");
        Client.prototype[methodName] = methodImpl;
    }
};

;// ./node_modules/@smithy/smithy-client/dist-es/exceptions.js
class ServiceException extends Error {
    constructor(options) {
        super(options.message);
        Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype);
        this.name = options.name;
        this.$fault = options.$fault;
        this.$metadata = options.$metadata;
    }
    static isInstance(value) {
        if (!value)
            return false;
        const candidate = value;
        return (ServiceException.prototype.isPrototypeOf(candidate) ||
            (Boolean(candidate.$fault) &&
                Boolean(candidate.$metadata) &&
                (candidate.$fault === "client" || candidate.$fault === "server")));
    }
    static [Symbol.hasInstance](instance) {
        if (!instance)
            return false;
        const candidate = instance;
        if (this === ServiceException) {
            return ServiceException.isInstance(instance);
        }
        if (ServiceException.isInstance(instance)) {
            if (candidate.name && this.name) {
                return this.prototype.isPrototypeOf(instance) || candidate.name === this.name;
            }
            return this.prototype.isPrototypeOf(instance);
        }
        return false;
    }
}
const decorateServiceException = (exception, additions = {}) => {
    Object.entries(additions)
        .filter(([, v]) => v !== undefined)
        .forEach(([k, v]) => {
        if (exception[k] == undefined || exception[k] === "") {
            exception[k] = v;
        }
    });
    const message = exception.message || exception.Message || "UnknownError";
    exception.message = message;
    delete exception.Message;
    return exception;
};

;// ./node_modules/@smithy/smithy-client/dist-es/default-error-handler.js

const throwDefaultError = ({ output, parsedBody, exceptionCtor, errorCode }) => {
    const $metadata = deserializeMetadata(output);
    const statusCode = $metadata.httpStatusCode ? $metadata.httpStatusCode + "" : undefined;
    const response = new exceptionCtor({
        name: parsedBody?.code || parsedBody?.Code || errorCode || statusCode || "UnknownError",
        $fault: "client",
        $metadata,
    });
    throw decorateServiceException(response, parsedBody);
};
const withBaseException = (ExceptionCtor) => {
    return ({ output, parsedBody, errorCode }) => {
        throwDefaultError({ output, parsedBody, exceptionCtor: ExceptionCtor, errorCode });
    };
};
const deserializeMetadata = (output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"],
});

;// ./node_modules/@smithy/smithy-client/dist-es/defaults-mode.js
const loadConfigsForDefaultMode = (mode) => {
    switch (mode) {
        case "standard":
            return {
                retryMode: "standard",
                connectionTimeout: 3100,
            };
        case "in-region":
            return {
                retryMode: "standard",
                connectionTimeout: 1100,
            };
        case "cross-region":
            return {
                retryMode: "standard",
                connectionTimeout: 3100,
            };
        case "mobile":
            return {
                retryMode: "standard",
                connectionTimeout: 30000,
            };
        default:
            return {};
    }
};

;// ./node_modules/@smithy/smithy-client/dist-es/emitWarningIfUnsupportedVersion.js
let warningEmitted = false;
const emitWarningIfUnsupportedVersion = (version) => {
    if (version && !warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 16) {
        warningEmitted = true;
    }
};

// EXTERNAL MODULE: ./node_modules/@smithy/core/dist-es/submodules/protocols/extended-encode-uri-component.js
var extended_encode_uri_component = __webpack_require__(7916);
;// ./node_modules/@smithy/smithy-client/dist-es/extended-encode-uri-component.js


;// ./node_modules/@smithy/smithy-client/dist-es/extensions/checksum.js


const getChecksumConfiguration = (runtimeConfig) => {
    const checksumAlgorithms = [];
    for (const id in types_dist_es/* AlgorithmId */.dB) {
        const algorithmId = types_dist_es/* AlgorithmId */.dB[id];
        if (runtimeConfig[algorithmId] === undefined) {
            continue;
        }
        checksumAlgorithms.push({
            algorithmId: () => algorithmId,
            checksumConstructor: () => runtimeConfig[algorithmId],
        });
    }
    return {
        addChecksumAlgorithm(algo) {
            checksumAlgorithms.push(algo);
        },
        checksumAlgorithms() {
            return checksumAlgorithms;
        },
    };
};
const resolveChecksumRuntimeConfig = (clientConfig) => {
    const runtimeConfig = {};
    clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
        runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
    });
    return runtimeConfig;
};

;// ./node_modules/@smithy/smithy-client/dist-es/extensions/retry.js
const getRetryConfiguration = (runtimeConfig) => {
    return {
        setRetryStrategy(retryStrategy) {
            runtimeConfig.retryStrategy = retryStrategy;
        },
        retryStrategy() {
            return runtimeConfig.retryStrategy;
        },
    };
};
const resolveRetryRuntimeConfig = (retryStrategyConfiguration) => {
    const runtimeConfig = {};
    runtimeConfig.retryStrategy = retryStrategyConfiguration.retryStrategy();
    return runtimeConfig;
};

;// ./node_modules/@smithy/smithy-client/dist-es/extensions/defaultExtensionConfiguration.js


const getDefaultExtensionConfiguration = (runtimeConfig) => {
    return Object.assign(getChecksumConfiguration(runtimeConfig), getRetryConfiguration(runtimeConfig));
};
const getDefaultClientConfiguration = (/* unused pure expression or super */ null && (getDefaultExtensionConfiguration));
const resolveDefaultRuntimeConfig = (config) => {
    return Object.assign(resolveChecksumRuntimeConfig(config), resolveRetryRuntimeConfig(config));
};

;// ./node_modules/@smithy/smithy-client/dist-es/extensions/index.js


;// ./node_modules/@smithy/smithy-client/dist-es/get-value-from-text-node.js
const getValueFromTextNode = (obj) => {
    const textNodeName = "#text";
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== undefined) {
            obj[key] = obj[key][textNodeName];
        }
        else if (typeof obj[key] === "object" && obj[key] !== null) {
            obj[key] = getValueFromTextNode(obj[key]);
        }
    }
    return obj;
};

;// ./node_modules/@smithy/smithy-client/dist-es/is-serializable-header-value.js
const isSerializableHeaderValue = (value) => {
    return value != null;
};

;// ./node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js
class NoOpLogger {
    trace() { }
    debug() { }
    info() { }
    warn() { }
    error() { }
}

;// ./node_modules/@smithy/smithy-client/dist-es/object-mapping.js
function map(arg0, arg1, arg2) {
    let target;
    let filter;
    let instructions;
    if (typeof arg1 === "undefined" && typeof arg2 === "undefined") {
        target = {};
        instructions = arg0;
    }
    else {
        target = arg0;
        if (typeof arg1 === "function") {
            filter = arg1;
            instructions = arg2;
            return mapWithFilter(target, filter, instructions);
        }
        else {
            instructions = arg1;
        }
    }
    for (const key of Object.keys(instructions)) {
        if (!Array.isArray(instructions[key])) {
            target[key] = instructions[key];
            continue;
        }
        applyInstruction(target, null, instructions, key);
    }
    return target;
}
const convertMap = (target) => {
    const output = {};
    for (const [k, v] of Object.entries(target || {})) {
        output[k] = [, v];
    }
    return output;
};
const take = (source, instructions) => {
    const out = {};
    for (const key in instructions) {
        applyInstruction(out, source, instructions, key);
    }
    return out;
};
const mapWithFilter = (target, filter, instructions) => {
    return map(target, Object.entries(instructions).reduce((_instructions, [key, value]) => {
        if (Array.isArray(value)) {
            _instructions[key] = value;
        }
        else {
            if (typeof value === "function") {
                _instructions[key] = [filter, value()];
            }
            else {
                _instructions[key] = [filter, value];
            }
        }
        return _instructions;
    }, {}));
};
const applyInstruction = (target, source, instructions, targetKey) => {
    if (source !== null) {
        let instruction = instructions[targetKey];
        if (typeof instruction === "function") {
            instruction = [, instruction];
        }
        const [filter = nonNullish, valueFn = pass, sourceKey = targetKey] = instruction;
        if ((typeof filter === "function" && filter(source[sourceKey])) || (typeof filter !== "function" && !!filter)) {
            target[targetKey] = valueFn(source[sourceKey]);
        }
        return;
    }
    let [filter, value] = instructions[targetKey];
    if (typeof value === "function") {
        let _value;
        const defaultFilterPassed = filter === undefined && (_value = value()) != null;
        const customFilterPassed = (typeof filter === "function" && !!filter(void 0)) || (typeof filter !== "function" && !!filter);
        if (defaultFilterPassed) {
            target[targetKey] = _value;
        }
        else if (customFilterPassed) {
            target[targetKey] = value();
        }
    }
    else {
        const defaultFilterPassed = filter === undefined && value != null;
        const customFilterPassed = (typeof filter === "function" && !!filter(value)) || (typeof filter !== "function" && !!filter);
        if (defaultFilterPassed || customFilterPassed) {
            target[targetKey] = value;
        }
    }
};
const nonNullish = (_) => _ != null;
const pass = (_) => _;

;// ./node_modules/@smithy/smithy-client/dist-es/ser-utils.js
const serializeFloat = (value) => {
    if (value !== value) {
        return "NaN";
    }
    switch (value) {
        case Infinity:
            return "Infinity";
        case -Infinity:
            return "-Infinity";
        default:
            return value;
    }
};
const serializeDateTime = (date) => date.toISOString().replace(".000Z", "Z");

;// ./node_modules/@smithy/smithy-client/dist-es/serde-json.js
const _json = (obj) => {
    if (obj == null) {
        return {};
    }
    if (Array.isArray(obj)) {
        return obj.filter((_) => _ != null).map(_json);
    }
    if (typeof obj === "object") {
        const target = {};
        for (const key of Object.keys(obj)) {
            if (obj[key] == null) {
                continue;
            }
            target[key] = _json(obj[key]);
        }
        return target;
    }
    return obj;
};

;// ./node_modules/@smithy/core/dist-es/submodules/serde/parse-utils.js
const parseBoolean = (value) => {
    switch (value) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            throw new Error(`Unable to parse boolean value "${value}"`);
    }
};
const expectBoolean = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "number") {
        if (value === 0 || value === 1) {
            logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (value === 0) {
            return false;
        }
        if (value === 1) {
            return true;
        }
    }
    if (typeof value === "string") {
        const lower = value.toLowerCase();
        if (lower === "false" || lower === "true") {
            logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (lower === "false") {
            return false;
        }
        if (lower === "true") {
            return true;
        }
    }
    if (typeof value === "boolean") {
        return value;
    }
    throw new TypeError(`Expected boolean, got ${typeof value}: ${value}`);
};
const expectNumber = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "string") {
        const parsed = parseFloat(value);
        if (!Number.isNaN(parsed)) {
            if (String(parsed) !== String(value)) {
                logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
            }
            return parsed;
        }
    }
    if (typeof value === "number") {
        return value;
    }
    throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
};
const MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
const expectFloat32 = (value) => {
    const expected = expectNumber(value);
    if (expected !== undefined && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
        if (Math.abs(expected) > MAX_FLOAT) {
            throw new TypeError(`Expected 32-bit float, got ${value}`);
        }
    }
    return expected;
};
const expectLong = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (Number.isInteger(value) && !Number.isNaN(value)) {
        return value;
    }
    throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
};
const expectInt = (/* unused pure expression or super */ null && (expectLong));
const expectInt32 = (value) => expectSizedInt(value, 32);
const expectShort = (value) => expectSizedInt(value, 16);
const expectByte = (value) => expectSizedInt(value, 8);
const expectSizedInt = (value, size) => {
    const expected = expectLong(value);
    if (expected !== undefined && castInt(expected, size) !== expected) {
        throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
    }
    return expected;
};
const castInt = (value, size) => {
    switch (size) {
        case 32:
            return Int32Array.of(value)[0];
        case 16:
            return Int16Array.of(value)[0];
        case 8:
            return Int8Array.of(value)[0];
    }
};
const expectNonNull = (value, location) => {
    if (value === null || value === undefined) {
        if (location) {
            throw new TypeError(`Expected a non-null value for ${location}`);
        }
        throw new TypeError("Expected a non-null value");
    }
    return value;
};
const expectObject = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "object" && !Array.isArray(value)) {
        return value;
    }
    const receivedType = Array.isArray(value) ? "array" : typeof value;
    throw new TypeError(`Expected object, got ${receivedType}: ${value}`);
};
const expectString = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "string") {
        return value;
    }
    if (["boolean", "number", "bigint"].includes(typeof value)) {
        logger.warn(stackTraceWarning(`Expected string, got ${typeof value}: ${value}`));
        return String(value);
    }
    throw new TypeError(`Expected string, got ${typeof value}: ${value}`);
};
const expectUnion = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    const asObject = expectObject(value);
    const setKeys = Object.entries(asObject)
        .filter(([, v]) => v != null)
        .map(([k]) => k);
    if (setKeys.length === 0) {
        throw new TypeError(`Unions must have exactly one non-null member. None were found.`);
    }
    if (setKeys.length > 1) {
        throw new TypeError(`Unions must have exactly one non-null member. Keys ${setKeys} were not null.`);
    }
    return asObject;
};
const strictParseDouble = (value) => {
    if (typeof value == "string") {
        return expectNumber(parseNumber(value));
    }
    return expectNumber(value);
};
const strictParseFloat = (/* unused pure expression or super */ null && (strictParseDouble));
const strictParseFloat32 = (value) => {
    if (typeof value == "string") {
        return expectFloat32(parseNumber(value));
    }
    return expectFloat32(value);
};
const NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
const parseNumber = (value) => {
    const matches = value.match(NUMBER_REGEX);
    if (matches === null || matches[0].length !== value.length) {
        throw new TypeError(`Expected real number, got implicit NaN`);
    }
    return parseFloat(value);
};
const limitedParseDouble = (value) => {
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return expectNumber(value);
};
const handleFloat = (/* unused pure expression or super */ null && (limitedParseDouble));
const limitedParseFloat = (/* unused pure expression or super */ null && (limitedParseDouble));
const limitedParseFloat32 = (value) => {
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return expectFloat32(value);
};
const parseFloatString = (value) => {
    switch (value) {
        case "NaN":
            return NaN;
        case "Infinity":
            return Infinity;
        case "-Infinity":
            return -Infinity;
        default:
            throw new Error(`Unable to parse float value: ${value}`);
    }
};
const strictParseLong = (value) => {
    if (typeof value === "string") {
        return expectLong(parseNumber(value));
    }
    return expectLong(value);
};
const strictParseInt = (/* unused pure expression or super */ null && (strictParseLong));
const strictParseInt32 = (value) => {
    if (typeof value === "string") {
        return expectInt32(parseNumber(value));
    }
    return expectInt32(value);
};
const parse_utils_strictParseShort = (value) => {
    if (typeof value === "string") {
        return expectShort(parseNumber(value));
    }
    return expectShort(value);
};
const strictParseByte = (value) => {
    if (typeof value === "string") {
        return expectByte(parseNumber(value));
    }
    return expectByte(value);
};
const stackTraceWarning = (message) => {
    return String(new TypeError(message).stack || message)
        .split("\n")
        .slice(0, 5)
        .filter((s) => !s.includes("stackTraceWarning"))
        .join("\n");
};
const logger = {
    warn: console.warn,
};

;// ./node_modules/@smithy/core/dist-es/submodules/serde/date-utils.js

const DAYS = (/* unused pure expression or super */ null && (["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]));
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function dateToUtcString(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const dayOfWeek = date.getUTCDay();
    const dayOfMonthInt = date.getUTCDate();
    const hoursInt = date.getUTCHours();
    const minutesInt = date.getUTCMinutes();
    const secondsInt = date.getUTCSeconds();
    const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
    const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
    const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
    const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
    return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year} ${hoursString}:${minutesString}:${secondsString} GMT`;
}
const RFC3339 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
const parseRfc3339DateTime = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339.exec(value);
    if (!match) {
        throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds] = match;
    const year = parse_utils_strictParseShort(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    return buildDate(year, month, day, { hours, minutes, seconds, fractionalMilliseconds });
};
const RFC3339_WITH_OFFSET = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/);
const parseRfc3339DateTimeWithOffset = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339_WITH_OFFSET.exec(value);
    if (!match) {
        throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, offsetStr] = match;
    const year = parse_utils_strictParseShort(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    const date = buildDate(year, month, day, { hours, minutes, seconds, fractionalMilliseconds });
    if (offsetStr.toUpperCase() != "Z") {
        date.setTime(date.getTime() - parseOffsetToMilliseconds(offsetStr));
    }
    return date;
};
const IMF_FIXDATE = (/* unused pure expression or super */ null && (new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/)));
const RFC_850_DATE = (/* unused pure expression or super */ null && (new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/)));
const ASC_TIME = (/* unused pure expression or super */ null && (new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/)));
const parseRfc7231DateTime = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-7231 date-times must be expressed as strings");
    }
    let match = IMF_FIXDATE.exec(value);
    if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
    }
    match = RFC_850_DATE.exec(value);
    if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
            hours,
            minutes,
            seconds,
            fractionalMilliseconds,
        }));
    }
    match = ASC_TIME.exec(value);
    if (match) {
        const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match;
        return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
    }
    throw new TypeError("Invalid RFC-7231 date-time value");
};
const parseEpochTimestamp = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    let valueAsDouble;
    if (typeof value === "number") {
        valueAsDouble = value;
    }
    else if (typeof value === "string") {
        valueAsDouble = strictParseDouble(value);
    }
    else if (typeof value === "object" && value.tag === 1) {
        valueAsDouble = value.value;
    }
    else {
        throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
    }
    if (Number.isNaN(valueAsDouble) || valueAsDouble === Infinity || valueAsDouble === -Infinity) {
        throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
    }
    return new Date(Math.round(valueAsDouble * 1000));
};
const buildDate = (year, month, day, time) => {
    const adjustedMonth = month - 1;
    validateDayOfMonth(year, adjustedMonth, day);
    return new Date(Date.UTC(year, adjustedMonth, day, parseDateValue(time.hours, "hour", 0, 23), parseDateValue(time.minutes, "minute", 0, 59), parseDateValue(time.seconds, "seconds", 0, 60), parseMilliseconds(time.fractionalMilliseconds)));
};
const parseTwoDigitYear = (value) => {
    const thisYear = new Date().getUTCFullYear();
    const valueInThisCentury = Math.floor(thisYear / 100) * 100 + strictParseShort(stripLeadingZeroes(value));
    if (valueInThisCentury < thisYear) {
        return valueInThisCentury + 100;
    }
    return valueInThisCentury;
};
const FIFTY_YEARS_IN_MILLIS = (/* unused pure expression or super */ null && (50 * 365 * 24 * 60 * 60 * 1000));
const adjustRfc850Year = (input) => {
    if (input.getTime() - new Date().getTime() > FIFTY_YEARS_IN_MILLIS) {
        return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
    }
    return input;
};
const parseMonthByShortName = (value) => {
    const monthIdx = MONTHS.indexOf(value);
    if (monthIdx < 0) {
        throw new TypeError(`Invalid month: ${value}`);
    }
    return monthIdx + 1;
};
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const validateDayOfMonth = (year, month, day) => {
    let maxDays = DAYS_IN_MONTH[month];
    if (month === 1 && isLeapYear(year)) {
        maxDays = 29;
    }
    if (day > maxDays) {
        throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year}: ${day}`);
    }
};
const isLeapYear = (year) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
const parseDateValue = (value, type, lower, upper) => {
    const dateVal = strictParseByte(stripLeadingZeroes(value));
    if (dateVal < lower || dateVal > upper) {
        throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
    }
    return dateVal;
};
const parseMilliseconds = (value) => {
    if (value === null || value === undefined) {
        return 0;
    }
    return strictParseFloat32("0." + value) * 1000;
};
const parseOffsetToMilliseconds = (value) => {
    const directionStr = value[0];
    let direction = 1;
    if (directionStr == "+") {
        direction = 1;
    }
    else if (directionStr == "-") {
        direction = -1;
    }
    else {
        throw new TypeError(`Offset direction, ${directionStr}, must be "+" or "-"`);
    }
    const hour = Number(value.substring(1, 3));
    const minute = Number(value.substring(4, 6));
    return direction * (hour * 60 + minute) * 60 * 1000;
};
const stripLeadingZeroes = (value) => {
    let idx = 0;
    while (idx < value.length - 1 && value.charAt(idx) === "0") {
        idx++;
    }
    if (idx === 0) {
        return value;
    }
    return value.slice(idx);
};

;// ./node_modules/@smithy/core/dist-es/submodules/serde/index.js










;// ./node_modules/@smithy/smithy-client/dist-es/index.js






















/***/ }),

/***/ 4848:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)
const compareBuild = (a, b, loose) => {
  const versionA = new SemVer(a, loose)
  const versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}
module.exports = compareBuild


/***/ }),

/***/ 4977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var semver = __webpack_require__(5864);

module.exports = semver.satisfies(process.version, '^6.12.0 || >=8.0.0');


/***/ }),

/***/ 5006:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SPACE_CHARACTERS = /\s+/g

// hoisted class for cyclic dependency
class Range {
  constructor (range, options) {
    options = parseOptions(options)

    if (range instanceof Range) {
      if (
        range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease
      ) {
        return range
      } else {
        return new Range(range.raw, options)
      }
    }

    if (range instanceof Comparator) {
      // just put it in the set and return
      this.raw = range.value
      this.set = [[range]]
      this.formatted = undefined
      return this
    }

    this.options = options
    this.loose = !!options.loose
    this.includePrerelease = !!options.includePrerelease

    // First reduce all whitespace as much as possible so we do not have to rely
    // on potentially slow regexes like \s*. This is then stored and used for
    // future error messages as well.
    this.raw = range.trim().replace(SPACE_CHARACTERS, ' ')

    // First, split on ||
    this.set = this.raw
      .split('||')
      // map the range to a 2d array of comparators
      .map(r => this.parseRange(r.trim()))
      // throw out any comparator lists that are empty
      // this generally means that it was not a valid range, which is allowed
      // in loose mode, but will still throw if the WHOLE range is invalid.
      .filter(c => c.length)

    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${this.raw}`)
    }

    // if we have any that are not the null set, throw out null sets.
    if (this.set.length > 1) {
      // keep the first one, in case they're all null sets
      const first = this.set[0]
      this.set = this.set.filter(c => !isNullSet(c[0]))
      if (this.set.length === 0) {
        this.set = [first]
      } else if (this.set.length > 1) {
        // if we have any that are *, then the range is just *
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c]
            break
          }
        }
      }
    }

    this.formatted = undefined
  }

  get range () {
    if (this.formatted === undefined) {
      this.formatted = ''
      for (let i = 0; i < this.set.length; i++) {
        if (i > 0) {
          this.formatted += '||'
        }
        const comps = this.set[i]
        for (let k = 0; k < comps.length; k++) {
          if (k > 0) {
            this.formatted += ' '
          }
          this.formatted += comps[k].toString().trim()
        }
      }
    }
    return this.formatted
  }

  format () {
    return this.range
  }

  toString () {
    return this.range
  }

  parseRange (range) {
    // memoize range parsing for performance.
    // this is a very hot path, and fully deterministic.
    const memoOpts =
      (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) |
      (this.options.loose && FLAG_LOOSE)
    const memoKey = memoOpts + ':' + range
    const cached = cache.get(memoKey)
    if (cached) {
      return cached
    }

    const loose = this.options.loose
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
    range = range.replace(hr, hyphenReplace(this.options.includePrerelease))
    debug('hyphen replace', range)

    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
    debug('comparator trim', range)

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace)
    debug('tilde trim', range)

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[t.CARETTRIM], caretTrimReplace)
    debug('caret trim', range)

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    let rangeList = range
      .split(' ')
      .map(comp => parseComparator(comp, this.options))
      .join(' ')
      .split(/\s+/)
      // >=0.0.0 is equivalent to *
      .map(comp => replaceGTE0(comp, this.options))

    if (loose) {
      // in loose mode, throw out any that are not valid comparators
      rangeList = rangeList.filter(comp => {
        debug('loose invalid filter', comp, this.options)
        return !!comp.match(re[t.COMPARATORLOOSE])
      })
    }
    debug('range list', rangeList)

    // if any comparators are the null set, then replace with JUST null set
    // if more than one comparator, remove any * comparators
    // also, don't include the same comparator more than once
    const rangeMap = new Map()
    const comparators = rangeList.map(comp => new Comparator(comp, this.options))
    for (const comp of comparators) {
      if (isNullSet(comp)) {
        return [comp]
      }
      rangeMap.set(comp.value, comp)
    }
    if (rangeMap.size > 1 && rangeMap.has('')) {
      rangeMap.delete('')
    }

    const result = [...rangeMap.values()]
    cache.set(memoKey, result)
    return result
  }

  intersects (range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError('a Range is required')
    }

    return this.set.some((thisComparators) => {
      return (
        isSatisfiable(thisComparators, options) &&
        range.set.some((rangeComparators) => {
          return (
            isSatisfiable(rangeComparators, options) &&
            thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options)
              })
            })
          )
        })
      )
    })
  }

  // if ANY of the sets match ALL of its comparators, then pass
  test (version) {
    if (!version) {
      return false
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    for (let i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true
      }
    }
    return false
  }
}

module.exports = Range

const LRU = __webpack_require__(7207)
const cache = new LRU()

const parseOptions = __webpack_require__(9284)
const Comparator = __webpack_require__(2659)
const debug = __webpack_require__(6839)
const SemVer = __webpack_require__(6315)
const {
  safeRe: re,
  t,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace,
} = __webpack_require__(2351)
const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = __webpack_require__(5501)

const isNullSet = c => c.value === '<0.0.0-0'
const isAny = c => c.value === ''

// take a set of comparators and determine whether there
// exists a version which can satisfy it
const isSatisfiable = (comparators, options) => {
  let result = true
  const remainingComparators = comparators.slice()
  let testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const parseComparator = (comp, options) => {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

const isX = id => !id || id.toLowerCase() === 'x' || id === '*'

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
// ~0.0.1 --> >=0.0.1 <0.1.0-0
const replaceTildes = (comp, options) => {
  return comp
    .trim()
    .split(/\s+/)
    .map((c) => replaceTilde(c, options))
    .join(' ')
}

const replaceTilde = (comp, options) => {
  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('tilde', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0-0
      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = `>=${M}.${m}.${p}-${pr
      } <${M}.${+m + 1}.0-0`
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0-0
      ret = `>=${M}.${m}.${p
      } <${M}.${+m + 1}.0-0`
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
// ^0.0.1 --> >=0.0.1 <0.0.2-0
// ^0.1.0 --> >=0.1.0 <0.2.0-0
const replaceCarets = (comp, options) => {
  return comp
    .trim()
    .split(/\s+/)
    .map((c) => replaceCaret(c, options))
    .join(' ')
}

const replaceCaret = (comp, options) => {
  debug('caret', comp, options)
  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  const z = options.includePrerelease ? '-0' : ''
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('caret', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      if (M === '0') {
        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`
      } else {
        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p}-${pr
        } <${+M + 1}.0.0-0`
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p
        } <${+M + 1}.0.0-0`
      }
    }

    debug('caret return', ret)
    return ret
  })
}

const replaceXRanges = (comp, options) => {
  debug('replaceXRanges', comp, options)
  return comp
    .split(/\s+/)
    .map((c) => replaceXRange(c, options))
    .join(' ')
}

const replaceXRange = (comp, options) => {
  comp = comp.trim()
  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    const xM = isX(M)
    const xm = xM || isX(m)
    const xp = xm || isX(p)
    const anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      if (gtlt === '<') {
        pr = '-0'
      }

      ret = `${gtlt + M}.${m}.${p}${pr}`
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`
    } else if (xp) {
      ret = `>=${M}.${m}.0${pr
      } <${M}.${+m + 1}.0-0`
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const replaceStars = (comp, options) => {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp
    .trim()
    .replace(re[t.STAR], '')
}

const replaceGTE0 = (comp, options) => {
  debug('replaceGTE0', comp, options)
  return comp
    .trim()
    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
// TODO build?
const hyphenReplace = incPr => ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr) => {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = `>=${fM}.0.0${incPr ? '-0' : ''}`
  } else if (isX(fp)) {
    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`
  } else if (fpr) {
    from = `>=${from}`
  } else {
    from = `>=${from}${incPr ? '-0' : ''}`
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = `<${+tM + 1}.0.0-0`
  } else if (isX(tp)) {
    to = `<${tM}.${+tm + 1}.0-0`
  } else if (tpr) {
    to = `<=${tM}.${tm}.${tp}-${tpr}`
  } else if (incPr) {
    to = `<${tM}.${tm}.${+tp + 1}-0`
  } else {
    to = `<=${to}`
  }

  return `${from} ${to}`.trim()
}

const testSet = (set, version, options) => {
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (let i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === Comparator.ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}


/***/ }),

/***/ 5122:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ emitWarningIfUnsupportedVersion)
/* harmony export */ });
/* unused harmony export state */
const state = {
    warningEmitted: false,
};
const emitWarningIfUnsupportedVersion = (version) => {
    if (version && !state.warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 18) {
        state.warningEmitted = true;
        process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js 16.x on January 6, 2025.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/74kJMmI`);
    }
};


/***/ }),

/***/ 5172:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  l: () => (/* binding */ getHttpSigningPlugin)
});

// UNUSED EXPORTS: httpSigningMiddlewareOptions

// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var dist_es = __webpack_require__(5479);
// EXTERNAL MODULE: ./node_modules/@smithy/types/dist-es/index.js + 11 modules
var types_dist_es = __webpack_require__(7523);
// EXTERNAL MODULE: ./node_modules/@smithy/util-middleware/dist-es/index.js + 2 modules
var util_middleware_dist_es = __webpack_require__(7135);
;// ./node_modules/@smithy/core/dist-es/middleware-http-signing/httpSigningMiddleware.js



const defaultErrorHandler = (signingProperties) => (error) => {
    throw error;
};
const defaultSuccessHandler = (httpResponse, signingProperties) => { };
const httpSigningMiddleware = (config) => (next, context) => async (args) => {
    if (!dist_es/* HttpRequest */.Kd.isInstance(args.request)) {
        return next(args);
    }
    const smithyContext = (0,util_middleware_dist_es/* getSmithyContext */.u)(context);
    const scheme = smithyContext.selectedHttpAuthScheme;
    if (!scheme) {
        throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
    }
    const { httpAuthOption: { signingProperties = {} }, identity, signer, } = scheme;
    const output = await next({
        ...args,
        request: await signer.sign(args.request, identity, signingProperties),
    }).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
    (signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
    return output;
};

;// ./node_modules/@smithy/core/dist-es/middleware-http-signing/getHttpSigningMiddleware.js

const httpSigningMiddlewareOptions = {
    step: "finalizeRequest",
    tags: ["HTTP_SIGNING"],
    name: "httpSigningMiddleware",
    aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"],
    override: true,
    relation: "after",
    toMiddleware: "retryMiddleware",
};
const getHttpSigningPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(httpSigningMiddleware(config), httpSigningMiddlewareOptions);
    },
});


/***/ }),

/***/ 5317:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 5368:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)
const Comparator = __webpack_require__(2659)
const { ANY } = Comparator
const Range = __webpack_require__(5006)
const satisfies = __webpack_require__(1995)
const gt = __webpack_require__(9671)
const lt = __webpack_require__(6912)
const lte = __webpack_require__(8445)
const gte = __webpack_require__(9540)

const outside = (version, range, hilo, options) => {
  version = new SemVer(version, options)
  range = new Range(range, options)

  let gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisfies the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let high = null
    let low = null

    comparators.forEach((comparator) => {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

module.exports = outside


/***/ }),

/***/ 5384:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Mnemonist Typed Array Helpers
 * ==============================
 *
 * Miscellaneous helpers related to typed arrays.
 */

/**
 * When using an unsigned integer array to store pointers, one might want to
 * choose the optimal word size in regards to the actual numbers of pointers
 * to store.
 *
 * This helpers does just that.
 *
 * @param  {number} size - Expected size of the array to map.
 * @return {TypedArray}
 */
var MAX_8BIT_INTEGER = Math.pow(2, 8) - 1,
    MAX_16BIT_INTEGER = Math.pow(2, 16) - 1,
    MAX_32BIT_INTEGER = Math.pow(2, 32) - 1;

var MAX_SIGNED_8BIT_INTEGER = Math.pow(2, 7) - 1,
    MAX_SIGNED_16BIT_INTEGER = Math.pow(2, 15) - 1,
    MAX_SIGNED_32BIT_INTEGER = Math.pow(2, 31) - 1;

exports.getPointerArray = function(size) {
  var maxIndex = size - 1;

  if (maxIndex <= MAX_8BIT_INTEGER)
    return Uint8Array;

  if (maxIndex <= MAX_16BIT_INTEGER)
    return Uint16Array;

  if (maxIndex <= MAX_32BIT_INTEGER)
    return Uint32Array;

  return Float64Array;
};

exports.getSignedPointerArray = function(size) {
  var maxIndex = size - 1;

  if (maxIndex <= MAX_SIGNED_8BIT_INTEGER)
    return Int8Array;

  if (maxIndex <= MAX_SIGNED_16BIT_INTEGER)
    return Int16Array;

  if (maxIndex <= MAX_SIGNED_32BIT_INTEGER)
    return Int32Array;

  return Float64Array;
};

/**
 * Function returning the minimal type able to represent the given number.
 *
 * @param  {number} value - Value to test.
 * @return {TypedArrayClass}
 */
exports.getNumberType = function(value) {

  // <= 32 bits itnteger?
  if (value === (value | 0)) {

    // Negative
    if (Math.sign(value) === -1) {
      if (value <= 127 && value >= -128)
        return Int8Array;

      if (value <= 32767 && value >= -32768)
        return Int16Array;

      return Int32Array;
    }
    else {

      if (value <= 255)
        return Uint8Array;

      if (value <= 65535)
        return Uint16Array;

      return Uint32Array;
    }
  }

  // 53 bits integer & floats
  // NOTE: it's kinda hard to tell whether we could use 32bits or not...
  return Float64Array;
};

/**
 * Function returning the minimal type able to represent the given array
 * of JavaScript numbers.
 *
 * @param  {array}    array  - Array to represent.
 * @param  {function} getter - Optional getter.
 * @return {TypedArrayClass}
 */
var TYPE_PRIORITY = {
  Uint8Array: 1,
  Int8Array: 2,
  Uint16Array: 3,
  Int16Array: 4,
  Uint32Array: 5,
  Int32Array: 6,
  Float32Array: 7,
  Float64Array: 8
};

// TODO: make this a one-shot for one value
exports.getMinimalRepresentation = function(array, getter) {
  var maxType = null,
      maxPriority = 0,
      p,
      t,
      v,
      i,
      l;

  for (i = 0, l = array.length; i < l; i++) {
    v = getter ? getter(array[i]) : array[i];
    t = exports.getNumberType(v);
    p = TYPE_PRIORITY[t.name];

    if (p > maxPriority) {
      maxPriority = p;
      maxType = t;
    }
  }

  return maxType;
};

/**
 * Function returning whether the given value is a typed array.
 *
 * @param  {any} value - Value to test.
 * @return {boolean}
 */
exports.isTypedArray = function(value) {
  return typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(value);
};

/**
 * Function used to concat byte arrays.
 *
 * @param  {...ByteArray}
 * @return {ByteArray}
 */
exports.concat = function() {
  var length = 0,
      i,
      o,
      l;

  for (i = 0, l = arguments.length; i < l; i++)
    length += arguments[i].length;

  var array = new (arguments[0].constructor)(length);

  for (i = 0, o = 0; i < l; i++) {
    array.set(arguments[i], o);
    o += arguments[i].length;
  }

  return array;
};

/**
 * Function used to initialize a byte array of indices.
 *
 * @param  {number}    length - Length of target.
 * @return {ByteArray}
 */
exports.indices = function(length) {
  var PointerArray = exports.getPointerArray(length);

  var array = new PointerArray(length);

  for (var i = 0; i < length; i++)
    array[i] = i;

  return array;
};


/***/ }),

/***/ 5461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ esm_node_v4)
});

// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6982);
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_);
;// ./node_modules/uuid/dist/esm-node/native.js

/* harmony default export */ const esm_node_native = ({
  randomUUID: (external_crypto_default()).randomUUID
});
// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-node/rng.js
var rng = __webpack_require__(695);
// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-node/stringify.js
var stringify = __webpack_require__(7647);
;// ./node_modules/uuid/dist/esm-node/v4.js




function v4(options, buf, offset) {
  if (esm_node_native.randomUUID && !buf && !options) {
    return esm_node_native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng/* default */.A)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,stringify/* unsafeStringify */.k)(rnds);
}

/* harmony default export */ const esm_node_v4 = (v4);

/***/ }),

/***/ 5479:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Kd: () => (/* reexport */ HttpRequest),
  cS: () => (/* reexport */ HttpResponse),
  eS: () => (/* reexport */ getHttpHandlerExtensionConfiguration),
  jt: () => (/* reexport */ resolveHttpHandlerRuntimeConfig)
});

// UNUSED EXPORTS: Field, Fields, isValidHostname

;// ./node_modules/@smithy/protocol-http/dist-es/extensions/httpExtensionConfiguration.js
const getHttpHandlerExtensionConfiguration = (runtimeConfig) => {
    return {
        setHttpHandler(handler) {
            runtimeConfig.httpHandler = handler;
        },
        httpHandler() {
            return runtimeConfig.httpHandler;
        },
        updateHttpClientConfig(key, value) {
            runtimeConfig.httpHandler?.updateHttpClientConfig(key, value);
        },
        httpHandlerConfigs() {
            return runtimeConfig.httpHandler.httpHandlerConfigs();
        },
    };
};
const resolveHttpHandlerRuntimeConfig = (httpHandlerExtensionConfiguration) => {
    return {
        httpHandler: httpHandlerExtensionConfiguration.httpHandler(),
    };
};

;// ./node_modules/@smithy/protocol-http/dist-es/extensions/index.js


// EXTERNAL MODULE: ./node_modules/@smithy/types/dist-es/index.js + 11 modules
var dist_es = __webpack_require__(7523);
;// ./node_modules/@smithy/protocol-http/dist-es/Field.js

class Field {
    constructor({ name, kind = FieldPosition.HEADER, values = [] }) {
        this.name = name;
        this.kind = kind;
        this.values = values;
    }
    add(value) {
        this.values.push(value);
    }
    set(values) {
        this.values = values;
    }
    remove(value) {
        this.values = this.values.filter((v) => v !== value);
    }
    toString() {
        return this.values.map((v) => (v.includes(",") || v.includes(" ") ? `"${v}"` : v)).join(", ");
    }
    get() {
        return this.values;
    }
}

;// ./node_modules/@smithy/protocol-http/dist-es/httpRequest.js
class HttpRequest {
    constructor(options) {
        this.method = options.method || "GET";
        this.hostname = options.hostname || "localhost";
        this.port = options.port;
        this.query = options.query || {};
        this.headers = options.headers || {};
        this.body = options.body;
        this.protocol = options.protocol
            ? options.protocol.slice(-1) !== ":"
                ? `${options.protocol}:`
                : options.protocol
            : "https:";
        this.path = options.path ? (options.path.charAt(0) !== "/" ? `/${options.path}` : options.path) : "/";
        this.username = options.username;
        this.password = options.password;
        this.fragment = options.fragment;
    }
    static clone(request) {
        const cloned = new HttpRequest({
            ...request,
            headers: { ...request.headers },
        });
        if (cloned.query) {
            cloned.query = cloneQuery(cloned.query);
        }
        return cloned;
    }
    static isInstance(request) {
        if (!request) {
            return false;
        }
        const req = request;
        return ("method" in req &&
            "protocol" in req &&
            "hostname" in req &&
            "path" in req &&
            typeof req["query"] === "object" &&
            typeof req["headers"] === "object");
    }
    clone() {
        return HttpRequest.clone(this);
    }
}
function cloneQuery(query) {
    return Object.keys(query).reduce((carry, paramName) => {
        const param = query[paramName];
        return {
            ...carry,
            [paramName]: Array.isArray(param) ? [...param] : param,
        };
    }, {});
}

;// ./node_modules/@smithy/protocol-http/dist-es/httpResponse.js
class HttpResponse {
    constructor(options) {
        this.statusCode = options.statusCode;
        this.reason = options.reason;
        this.headers = options.headers || {};
        this.body = options.body;
    }
    static isInstance(response) {
        if (!response)
            return false;
        const resp = response;
        return typeof resp.statusCode === "number" && typeof resp.headers === "object";
    }
}

;// ./node_modules/@smithy/protocol-http/dist-es/index.js










/***/ }),

/***/ 5501:
/***/ ((module) => {

"use strict";


// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0'

const MAX_LENGTH = 256
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
/* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16

// Max safe length for a build identifier. The max length minus 6 characters for
// the shortest version with a build 0.0.0+BUILD.
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6

const RELEASE_TYPES = [
  'major',
  'premajor',
  'minor',
  'preminor',
  'patch',
  'prepatch',
  'prerelease',
]

module.exports = {
  MAX_LENGTH,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 0b001,
  FLAG_LOOSE: 0b010,
}


/***/ }),

/***/ 5747:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*global exports*/
var SignStream = __webpack_require__(3387);
var VerifyStream = __webpack_require__(7599);

var ALGORITHMS = [
  'HS256', 'HS384', 'HS512',
  'RS256', 'RS384', 'RS512',
  'PS256', 'PS384', 'PS512',
  'ES256', 'ES384', 'ES512'
];

exports.ALGORITHMS = ALGORITHMS;
exports.sign = SignStream.sign;
exports.verify = VerifyStream.verify;
exports.decode = VerifyStream.decode;
exports.isValid = VerifyStream.isValid;
exports.createSign = function createSign(opts) {
  return new SignStream(opts);
};
exports.createVerify = function createVerify(opts) {
  return new VerifyStream(opts);
};


/***/ }),

/***/ 5864:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// just pre-load all the stuff that index.js lazily exports
const internalRe = __webpack_require__(2351)
const constants = __webpack_require__(5501)
const SemVer = __webpack_require__(6315)
const identifiers = __webpack_require__(9716)
const parse = __webpack_require__(7153)
const valid = __webpack_require__(8300)
const clean = __webpack_require__(871)
const inc = __webpack_require__(9746)
const diff = __webpack_require__(3719)
const major = __webpack_require__(7887)
const minor = __webpack_require__(6651)
const patch = __webpack_require__(180)
const prerelease = __webpack_require__(818)
const compare = __webpack_require__(3701)
const rcompare = __webpack_require__(6813)
const compareLoose = __webpack_require__(8474)
const compareBuild = __webpack_require__(4848)
const sort = __webpack_require__(8080)
const rsort = __webpack_require__(9544)
const gt = __webpack_require__(9671)
const lt = __webpack_require__(6912)
const eq = __webpack_require__(4506)
const neq = __webpack_require__(4654)
const gte = __webpack_require__(9540)
const lte = __webpack_require__(8445)
const cmp = __webpack_require__(630)
const coerce = __webpack_require__(2393)
const Comparator = __webpack_require__(2659)
const Range = __webpack_require__(5006)
const satisfies = __webpack_require__(1995)
const toComparators = __webpack_require__(9278)
const maxSatisfying = __webpack_require__(1017)
const minSatisfying = __webpack_require__(3811)
const minVersion = __webpack_require__(3514)
const validRange = __webpack_require__(6561)
const outside = __webpack_require__(5368)
const gtr = __webpack_require__(9924)
const ltr = __webpack_require__(4173)
const intersects = __webpack_require__(153)
const simplifyRange = __webpack_require__(9388)
const subset = __webpack_require__(6529)
module.exports = {
  parse,
  valid,
  clean,
  inc,
  diff,
  major,
  minor,
  patch,
  prerelease,
  compare,
  rcompare,
  compareLoose,
  compareBuild,
  sort,
  rsort,
  gt,
  lt,
  eq,
  neq,
  gte,
  lte,
  cmp,
  coerce,
  Comparator,
  Range,
  satisfies,
  toComparators,
  maxSatisfying,
  minSatisfying,
  minVersion,
  validRange,
  outside,
  gtr,
  ltr,
  intersects,
  simplifyRange,
  subset,
  SemVer,
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: constants.RELEASE_TYPES,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers,
}


/***/ }),

/***/ 5931:
/***/ ((module) => {

/**
 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;


/***/ }),

/***/ 6111:
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = includes;


/***/ }),

/***/ 6228:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  f2: () => (/* binding */ AwsSdkSigV4Signer)
});

// UNUSED EXPORTS: AWSSDKSigV4Signer, validateSigningProperties

// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var dist_es = __webpack_require__(5479);
;// ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getSkewCorrectedDate.js
const getSkewCorrectedDate = (systemClockOffset) => new Date(Date.now() + systemClockOffset);

;// ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getDateHeader.js

const getDateHeader = (response) => dist_es/* HttpResponse */.cS.isInstance(response) ? response.headers?.date ?? response.headers?.Date : undefined;

;// ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/isClockSkewed.js

const isClockSkewed = (clockTime, systemClockOffset) => Math.abs(getSkewCorrectedDate(systemClockOffset).getTime() - clockTime) >= 300000;

;// ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getUpdatedSystemClockOffset.js

const getUpdatedSystemClockOffset = (clockTime, currentSystemClockOffset) => {
    const clockTimeInMs = Date.parse(clockTime);
    if (isClockSkewed(clockTimeInMs, currentSystemClockOffset)) {
        return clockTimeInMs - Date.now();
    }
    return currentSystemClockOffset;
};

;// ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js


const throwSigningPropertyError = (name, property) => {
    if (!property) {
        throw new Error(`Property \`${name}\` is not resolved for AWS SDK SigV4Auth`);
    }
    return property;
};
const validateSigningProperties = async (signingProperties) => {
    const context = throwSigningPropertyError("context", signingProperties.context);
    const config = throwSigningPropertyError("config", signingProperties.config);
    const authScheme = context.endpointV2?.properties?.authSchemes?.[0];
    const signerFunction = throwSigningPropertyError("signer", config.signer);
    const signer = await signerFunction(authScheme);
    const signingRegion = signingProperties?.signingRegion;
    const signingRegionSet = signingProperties?.signingRegionSet;
    const signingName = signingProperties?.signingName;
    return {
        config,
        signer,
        signingRegion,
        signingRegionSet,
        signingName,
    };
};
class AwsSdkSigV4Signer {
    async sign(httpRequest, identity, signingProperties) {
        if (!dist_es/* HttpRequest */.Kd.isInstance(httpRequest)) {
            throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
        }
        const validatedProps = await validateSigningProperties(signingProperties);
        const { config, signer } = validatedProps;
        let { signingRegion, signingName } = validatedProps;
        const handlerExecutionContext = signingProperties.context;
        if (handlerExecutionContext?.authSchemes?.length ?? 0 > 1) {
            const [first, second] = handlerExecutionContext.authSchemes;
            if (first?.name === "sigv4a" && second?.name === "sigv4") {
                signingRegion = second?.signingRegion ?? signingRegion;
                signingName = second?.signingName ?? signingName;
            }
        }
        const signedRequest = await signer.sign(httpRequest, {
            signingDate: getSkewCorrectedDate(config.systemClockOffset),
            signingRegion: signingRegion,
            signingService: signingName,
        });
        return signedRequest;
    }
    errorHandler(signingProperties) {
        return (error) => {
            const serverTime = error.ServerTime ?? getDateHeader(error.$response);
            if (serverTime) {
                const config = throwSigningPropertyError("config", signingProperties.config);
                const initialSystemClockOffset = config.systemClockOffset;
                config.systemClockOffset = getUpdatedSystemClockOffset(serverTime, config.systemClockOffset);
                const clockSkewCorrected = config.systemClockOffset !== initialSystemClockOffset;
                if (clockSkewCorrected && error.$metadata) {
                    error.$metadata.clockSkewCorrected = true;
                }
            }
            throw error;
        };
    }
    successHandler(httpResponse, signingProperties) {
        const dateHeader = getDateHeader(httpResponse);
        if (dateHeader) {
            const config = throwSigningPropertyError("config", signingProperties.config);
            config.systemClockOffset = getUpdatedSystemClockOffset(dateHeader, config.systemClockOffset);
        }
    }
}
const AWSSDKSigV4Signer = (/* unused pure expression or super */ null && (AwsSdkSigV4Signer));


/***/ }),

/***/ 6315:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const debug = __webpack_require__(6839)
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __webpack_require__(5501)
const { safeRe: re, t } = __webpack_require__(2351)

const parseOptions = __webpack_require__(9284)
const { compareIdentifiers } = __webpack_require__(9716)
class SemVer {
  constructor (version, options) {
    options = parseOptions(options)

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
        version.includePrerelease === !!options.includePrerelease) {
        return version
      } else {
        version = version.version
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }

    debug('SemVer', version, options)
    this.options = options
    this.loose = !!options.loose
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease

    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    this.raw = version

    // these are actually numbers
    this.major = +m[1]
    this.minor = +m[2]
    this.patch = +m[3]

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = []
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      })
    }

    this.build = m[5] ? m[5].split('.') : []
    this.format()
  }

  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`
    }
    return this.version
  }

  toString () {
    return this.version
  }

  compare (other) {
    debug('SemVer.compare', this.version, this.options, other)
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0
      }
      other = new SemVer(other, this.options)
    }

    if (other.version === this.version) {
      return 0
    }

    return this.compareMain(other) || this.comparePre(other)
  }

  compareMain (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }

  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    let i = 0
    do {
      const a = this.prerelease[i]
      const b = other.prerelease[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  compareBuild (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    let i = 0
    do {
      const a = this.build[i]
      const b = other.build[i]
      debug('build compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc (release, identifier, identifierBase) {
    if (release.startsWith('pre')) {
      if (!identifier && identifierBase === false) {
        throw new Error('invalid increment argument: identifier is empty')
      }
      // Avoid an invalid semver results
      if (identifier) {
        const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE])
        if (!match || match[1] !== identifier) {
          throw new Error(`invalid identifier: ${identifier}`)
        }
      }
    }

    switch (release) {
      case 'premajor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.inc('pre', identifier, identifierBase)
        break
      case 'preminor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
        this.inc('pre', identifier, identifierBase)
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0
        this.inc('patch', identifier, identifierBase)
        this.inc('pre', identifier, identifierBase)
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier, identifierBase)
        }
        this.inc('pre', identifier, identifierBase)
        break
      case 'release':
        if (this.prerelease.length === 0) {
          throw new Error(`version ${this.raw} is not a prerelease`)
        }
        this.prerelease.length = 0
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++
        }
        this.minor = 0
        this.patch = 0
        this.prerelease = []
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++
        }
        this.patch = 0
        this.prerelease = []
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++
        }
        this.prerelease = []
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre': {
        const base = Number(identifierBase) ? 1 : 0

        if (this.prerelease.length === 0) {
          this.prerelease = [base]
        } else {
          let i = this.prerelease.length
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++
              i = -2
            }
          }
          if (i === -1) {
            // didn't increment anything
            if (identifier === this.prerelease.join('.') && identifierBase === false) {
              throw new Error('invalid increment argument: identifier already exists')
            }
            this.prerelease.push(base)
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          let prerelease = [identifier, base]
          if (identifierBase === false) {
            prerelease = [identifier]
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease
            }
          } else {
            this.prerelease = prerelease
          }
        }
        break
      }
      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.raw = this.format()
    if (this.build.length) {
      this.raw += `+${this.build.join('.')}`
    }
    return this
  }
}

module.exports = SemVer


/***/ }),

/***/ 6529:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Range = __webpack_require__(5006)
const Comparator = __webpack_require__(2659)
const { ANY } = Comparator
const satisfies = __webpack_require__(1995)
const compare = __webpack_require__(3701)

// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
// - Every simple range `r1, r2, ...` is a null set, OR
// - Every simple range `r1, r2, ...` which is not a null set is a subset of
//   some `R1, R2, ...`
//
// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
// - If c is only the ANY comparator
//   - If C is only the ANY comparator, return true
//   - Else if in prerelease mode, return false
//   - else replace c with `[>=0.0.0]`
// - If C is only the ANY comparator
//   - if in prerelease mode, return true
//   - else replace C with `[>=0.0.0]`
// - Let EQ be the set of = comparators in c
// - If EQ is more than one, return true (null set)
// - Let GT be the highest > or >= comparator in c
// - Let LT be the lowest < or <= comparator in c
// - If GT and LT, and GT.semver > LT.semver, return true (null set)
// - If any C is a = range, and GT or LT are set, return false
// - If EQ
//   - If GT, and EQ does not satisfy GT, return true (null set)
//   - If LT, and EQ does not satisfy LT, return true (null set)
//   - If EQ satisfies every C, return true
//   - Else return false
// - If GT
//   - If GT.semver is lower than any > or >= comp in C, return false
//   - If GT is >=, and GT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the GT.semver tuple, return false
// - If LT
//   - If LT.semver is greater than any < or <= comp in C, return false
//   - If LT is <=, and LT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the LT.semver tuple, return false
// - Else return true

const subset = (sub, dom, options = {}) => {
  if (sub === dom) {
    return true
  }

  sub = new Range(sub, options)
  dom = new Range(dom, options)
  let sawNonNull = false

  OUTER: for (const simpleSub of sub.set) {
    for (const simpleDom of dom.set) {
      const isSub = simpleSubset(simpleSub, simpleDom, options)
      sawNonNull = sawNonNull || isSub !== null
      if (isSub) {
        continue OUTER
      }
    }
    // the null set is a subset of everything, but null simple ranges in
    // a complex range should be ignored.  so if we saw a non-null range,
    // then we know this isn't a subset, but if EVERY simple range was null,
    // then it is a subset.
    if (sawNonNull) {
      return false
    }
  }
  return true
}

const minimumVersionWithPreRelease = [new Comparator('>=0.0.0-0')]
const minimumVersion = [new Comparator('>=0.0.0')]

const simpleSubset = (sub, dom, options) => {
  if (sub === dom) {
    return true
  }

  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY) {
      return true
    } else if (options.includePrerelease) {
      sub = minimumVersionWithPreRelease
    } else {
      sub = minimumVersion
    }
  }

  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease) {
      return true
    } else {
      dom = minimumVersion
    }
  }

  const eqSet = new Set()
  let gt, lt
  for (const c of sub) {
    if (c.operator === '>' || c.operator === '>=') {
      gt = higherGT(gt, c, options)
    } else if (c.operator === '<' || c.operator === '<=') {
      lt = lowerLT(lt, c, options)
    } else {
      eqSet.add(c.semver)
    }
  }

  if (eqSet.size > 1) {
    return null
  }

  let gtltComp
  if (gt && lt) {
    gtltComp = compare(gt.semver, lt.semver, options)
    if (gtltComp > 0) {
      return null
    } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
      return null
    }
  }

  // will iterate one or zero times
  for (const eq of eqSet) {
    if (gt && !satisfies(eq, String(gt), options)) {
      return null
    }

    if (lt && !satisfies(eq, String(lt), options)) {
      return null
    }

    for (const c of dom) {
      if (!satisfies(eq, String(c), options)) {
        return false
      }
    }

    return true
  }

  let higher, lower
  let hasDomLT, hasDomGT
  // if the subset has a prerelease, we need a comparator in the superset
  // with the same tuple and a prerelease, or it's not a subset
  let needDomLTPre = lt &&
    !options.includePrerelease &&
    lt.semver.prerelease.length ? lt.semver : false
  let needDomGTPre = gt &&
    !options.includePrerelease &&
    gt.semver.prerelease.length ? gt.semver : false
  // exception: <1.2.3-0 is the same as <1.2.3
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false
  }

  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>='
    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<='
    if (gt) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomGTPre.major &&
            c.semver.minor === needDomGTPre.minor &&
            c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false
        }
      }
      if (c.operator === '>' || c.operator === '>=') {
        higher = higherGT(gt, c, options)
        if (higher === c && higher !== gt) {
          return false
        }
      } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
        return false
      }
    }
    if (lt) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomLTPre.major &&
            c.semver.minor === needDomLTPre.minor &&
            c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false
        }
      }
      if (c.operator === '<' || c.operator === '<=') {
        lower = lowerLT(lt, c, options)
        if (lower === c && lower !== lt) {
          return false
        }
      } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
        return false
      }
    }
    if (!c.operator && (lt || gt) && gtltComp !== 0) {
      return false
    }
  }

  // if there was a < or >, and nothing in the dom, then must be false
  // UNLESS it was limited by another range in the other direction.
  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
  if (gt && hasDomLT && !lt && gtltComp !== 0) {
    return false
  }

  if (lt && hasDomGT && !gt && gtltComp !== 0) {
    return false
  }

  // we needed a prerelease range in a specific tuple, but didn't get one
  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
  // because it includes prereleases in the 1.2.3 tuple
  if (needDomGTPre || needDomLTPre) {
    return false
  }

  return true
}

// >=1.2.3 is lower than >1.2.3
const higherGT = (a, b, options) => {
  if (!a) {
    return b
  }
  const comp = compare(a.semver, b.semver, options)
  return comp > 0 ? a
    : comp < 0 ? b
    : b.operator === '>' && a.operator === '>=' ? b
    : a
}

// <=1.2.3 is higher than <1.2.3
const lowerLT = (a, b, options) => {
  if (!a) {
    return b
  }
  const comp = compare(a.semver, b.semver, options)
  return comp < 0 ? a
    : comp > 0 ? b
    : b.operator === '<' && a.operator === '<=' ? b
    : a
}

module.exports = subset


/***/ }),

/***/ 6561:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Range = __webpack_require__(5006)
const validRange = (range, options) => {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}
module.exports = validRange


/***/ }),

/***/ 6585:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 6651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)
const minor = (a, loose) => new SemVer(a, loose).minor
module.exports = minor


/***/ }),

/***/ 6728:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Mu: () => (/* reexport */ Uint8ArrayBlobAdapter),
  c9: () => (/* reexport */ sdk_stream_mixin_sdkStreamMixin)
});

// UNUSED EXPORTS: ChecksumStream, createBufferedReadable, createChecksumStream, getAwsChunkedEncodingStream, headStream, isBlob, isReadableStream, splitStream

// EXTERNAL MODULE: ./node_modules/@smithy/util-base64/dist-es/index.js + 2 modules
var dist_es = __webpack_require__(4572);
// EXTERNAL MODULE: ./node_modules/@smithy/util-utf8/dist-es/index.js + 3 modules
var util_utf8_dist_es = __webpack_require__(3197);
;// ./node_modules/@smithy/util-stream/dist-es/blob/transforms.js



function transformToString(payload, encoding = "utf-8") {
    if (encoding === "base64") {
        return (0,dist_es/* toBase64 */.n)(payload);
    }
    return (0,util_utf8_dist_es/* toUtf8 */.Pq)(payload);
}
function transformFromString(str, encoding) {
    if (encoding === "base64") {
        return Uint8ArrayBlobAdapter.mutate((0,dist_es/* fromBase64 */.E)(str));
    }
    return Uint8ArrayBlobAdapter.mutate((0,util_utf8_dist_es/* fromUtf8 */.ar)(str));
}

;// ./node_modules/@smithy/util-stream/dist-es/blob/Uint8ArrayBlobAdapter.js

class Uint8ArrayBlobAdapter extends Uint8Array {
    static fromString(source, encoding = "utf-8") {
        switch (typeof source) {
            case "string":
                return transformFromString(source, encoding);
            default:
                throw new Error(`Unsupported conversion from ${typeof source} to Uint8ArrayBlobAdapter.`);
        }
    }
    static mutate(source) {
        Object.setPrototypeOf(source, Uint8ArrayBlobAdapter.prototype);
        return source;
    }
    transformToString(encoding = "utf-8") {
        return transformToString(this, encoding);
    }
}

// EXTERNAL MODULE: external "stream"
var external_stream_ = __webpack_require__(2203);
;// ./node_modules/@smithy/util-stream/dist-es/checksum/ChecksumStream.js


class ChecksumStream_ChecksumStream extends external_stream_.Duplex {
    constructor({ expectedChecksum, checksum, source, checksumSourceLocation, base64Encoder, }) {
        super();
        if (typeof source.pipe === "function") {
            this.source = source;
        }
        else {
            throw new Error(`@smithy/util-stream: unsupported source type ${source?.constructor?.name ?? source} in ChecksumStream.`);
        }
        this.base64Encoder = base64Encoder ?? dist_es/* toBase64 */.n;
        this.expectedChecksum = expectedChecksum;
        this.checksum = checksum;
        this.checksumSourceLocation = checksumSourceLocation;
        this.source.pipe(this);
    }
    _read(size) { }
    _write(chunk, encoding, callback) {
        try {
            this.checksum.update(chunk);
            this.push(chunk);
        }
        catch (e) {
            return callback(e);
        }
        return callback();
    }
    async _final(callback) {
        try {
            const digest = await this.checksum.digest();
            const received = this.base64Encoder(digest);
            if (this.expectedChecksum !== received) {
                return callback(new Error(`Checksum mismatch: expected "${this.expectedChecksum}" but received "${received}"` +
                    ` in response header "${this.checksumSourceLocation}".`));
            }
        }
        catch (e) {
            return callback(e);
        }
        this.push(null);
        return callback();
    }
}

;// ./node_modules/@smithy/util-stream/dist-es/checksum/ChecksumStream.browser.js
const ReadableStreamRef = typeof ReadableStream === "function" ? ReadableStream : function () { };
class ChecksumStream_browser_ChecksumStream extends (/* unused pure expression or super */ null && (ReadableStreamRef)) {
}

;// ./node_modules/@smithy/util-stream/dist-es/checksum/createChecksumStream.browser.js



const createChecksumStream = ({ expectedChecksum, checksum, source, checksumSourceLocation, base64Encoder, }) => {
    if (!isReadableStream(source)) {
        throw new Error(`@smithy/util-stream: unsupported source type ${source?.constructor?.name ?? source} in ChecksumStream.`);
    }
    const encoder = base64Encoder ?? toBase64;
    if (typeof TransformStream !== "function") {
        throw new Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");
    }
    const transform = new TransformStream({
        start() { },
        async transform(chunk, controller) {
            checksum.update(chunk);
            controller.enqueue(chunk);
        },
        async flush(controller) {
            const digest = await checksum.digest();
            const received = encoder(digest);
            if (expectedChecksum !== received) {
                const error = new Error(`Checksum mismatch: expected "${expectedChecksum}" but received "${received}"` +
                    ` in response header "${checksumSourceLocation}".`);
                controller.error(error);
            }
            else {
                controller.terminate();
            }
        },
    });
    source.pipeThrough(transform);
    const readable = transform.readable;
    Object.setPrototypeOf(readable, ChecksumStream.prototype);
    return readable;
};

;// ./node_modules/@smithy/util-stream/dist-es/checksum/createChecksumStream.js



function createChecksumStream_createChecksumStream(init) {
    if (typeof ReadableStream === "function" && isReadableStream(init.source)) {
        return createChecksumStreamWeb(init);
    }
    return new ChecksumStream(init);
}

;// external "node:stream"
const external_node_stream_namespaceObject = require("node:stream");
;// ./node_modules/@smithy/util-stream/dist-es/createBufferedReadable.js




function createBufferedReadable(upstream, size, logger) {
    if (isReadableStream(upstream)) {
        return createBufferedReadableStream(upstream, size, logger);
    }
    const downstream = new Readable({ read() { } });
    let streamBufferingLoggedWarning = false;
    let bytesSeen = 0;
    const buffers = [
        "",
        new ByteArrayCollector((size) => new Uint8Array(size)),
        new ByteArrayCollector((size) => Buffer.from(new Uint8Array(size))),
    ];
    let mode = -1;
    upstream.on("data", (chunk) => {
        const chunkMode = modeOf(chunk, true);
        if (mode !== chunkMode) {
            if (mode >= 0) {
                downstream.push(flush(buffers, mode));
            }
            mode = chunkMode;
        }
        if (mode === -1) {
            downstream.push(chunk);
            return;
        }
        const chunkSize = sizeOf(chunk);
        bytesSeen += chunkSize;
        const bufferSize = sizeOf(buffers[mode]);
        if (chunkSize >= size && bufferSize === 0) {
            downstream.push(chunk);
        }
        else {
            const newSize = merge(buffers, mode, chunk);
            if (!streamBufferingLoggedWarning && bytesSeen > size * 2) {
                streamBufferingLoggedWarning = true;
                logger?.warn(`@smithy/util-stream - stream chunk size ${chunkSize} is below threshold of ${size}, automatically buffering.`);
            }
            if (newSize >= size) {
                downstream.push(flush(buffers, mode));
            }
        }
    });
    upstream.on("end", () => {
        if (mode !== -1) {
            const remainder = flush(buffers, mode);
            if (sizeOf(remainder) > 0) {
                downstream.push(remainder);
            }
        }
        downstream.push(null);
    });
    return downstream;
}

;// ./node_modules/@smithy/util-stream/dist-es/getAwsChunkedEncodingStream.js

const getAwsChunkedEncodingStream = (readableStream, options) => {
    const { base64Encoder, bodyLengthChecker, checksumAlgorithmFn, checksumLocationName, streamHasher } = options;
    const checksumRequired = base64Encoder !== undefined &&
        checksumAlgorithmFn !== undefined &&
        checksumLocationName !== undefined &&
        streamHasher !== undefined;
    const digest = checksumRequired ? streamHasher(checksumAlgorithmFn, readableStream) : undefined;
    const awsChunkedEncodingStream = new Readable({ read: () => { } });
    readableStream.on("data", (data) => {
        const length = bodyLengthChecker(data) || 0;
        awsChunkedEncodingStream.push(`${length.toString(16)}\r\n`);
        awsChunkedEncodingStream.push(data);
        awsChunkedEncodingStream.push("\r\n");
    });
    readableStream.on("end", async () => {
        awsChunkedEncodingStream.push(`0\r\n`);
        if (checksumRequired) {
            const checksum = base64Encoder(await digest);
            awsChunkedEncodingStream.push(`${checksumLocationName}:${checksum}\r\n`);
            awsChunkedEncodingStream.push(`\r\n`);
        }
        awsChunkedEncodingStream.push(null);
    });
    return awsChunkedEncodingStream;
};

;// ./node_modules/@smithy/util-stream/dist-es/headStream.js



const headStream = (stream, bytes) => {
    if (isReadableStream(stream)) {
        return headWebStream(stream, bytes);
    }
    return new Promise((resolve, reject) => {
        const collector = new Collector();
        collector.limit = bytes;
        stream.pipe(collector);
        stream.on("error", (err) => {
            collector.end();
            reject(err);
        });
        collector.on("error", reject);
        collector.on("finish", function () {
            const bytes = new Uint8Array(Buffer.concat(this.buffers));
            resolve(bytes);
        });
    });
};
class Collector extends external_stream_.Writable {
    constructor() {
        super(...arguments);
        this.buffers = [];
        this.limit = Infinity;
        this.bytesBuffered = 0;
    }
    _write(chunk, encoding, callback) {
        this.buffers.push(chunk);
        this.bytesBuffered += chunk.byteLength ?? 0;
        if (this.bytesBuffered >= this.limit) {
            const excess = this.bytesBuffered - this.limit;
            const tailBuffer = this.buffers[this.buffers.length - 1];
            this.buffers[this.buffers.length - 1] = tailBuffer.subarray(0, tailBuffer.byteLength - excess);
            this.emit("finish");
        }
        callback();
    }
}

// EXTERNAL MODULE: ./node_modules/@smithy/node-http-handler/dist-es/index.js + 16 modules
var node_http_handler_dist_es = __webpack_require__(3621);
// EXTERNAL MODULE: ./node_modules/@smithy/util-buffer-from/dist-es/index.js
var util_buffer_from_dist_es = __webpack_require__(9290);
// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var protocol_http_dist_es = __webpack_require__(5479);
;// ./node_modules/@smithy/fetch-http-handler/dist-es/fetch-http-handler.js




const keepAliveSupport = {
    supported: undefined,
};
class FetchHttpHandler {
    static create(instanceOrOptions) {
        if (typeof instanceOrOptions?.handle === "function") {
            return instanceOrOptions;
        }
        return new FetchHttpHandler(instanceOrOptions);
    }
    constructor(options) {
        if (typeof options === "function") {
            this.configProvider = options().then((opts) => opts || {});
        }
        else {
            this.config = options ?? {};
            this.configProvider = Promise.resolve(this.config);
        }
        if (keepAliveSupport.supported === undefined) {
            keepAliveSupport.supported = Boolean(typeof Request !== "undefined" && "keepalive" in createRequest("https://[::1]"));
        }
    }
    destroy() {
    }
    async handle(request, { abortSignal, requestTimeout } = {}) {
        if (!this.config) {
            this.config = await this.configProvider;
        }
        const requestTimeoutInMs = requestTimeout ?? this.config.requestTimeout;
        const keepAlive = this.config.keepAlive === true;
        const credentials = this.config.credentials;
        if (abortSignal?.aborted) {
            const abortError = new Error("Request aborted");
            abortError.name = "AbortError";
            return Promise.reject(abortError);
        }
        let path = request.path;
        const queryString = buildQueryString(request.query || {});
        if (queryString) {
            path += `?${queryString}`;
        }
        if (request.fragment) {
            path += `#${request.fragment}`;
        }
        let auth = "";
        if (request.username != null || request.password != null) {
            const username = request.username ?? "";
            const password = request.password ?? "";
            auth = `${username}:${password}@`;
        }
        const { port, method } = request;
        const url = `${request.protocol}//${auth}${request.hostname}${port ? `:${port}` : ""}${path}`;
        const body = method === "GET" || method === "HEAD" ? undefined : request.body;
        const requestOptions = {
            body,
            headers: new Headers(request.headers),
            method: method,
            credentials,
        };
        if (this.config?.cache) {
            requestOptions.cache = this.config.cache;
        }
        if (body) {
            requestOptions.duplex = "half";
        }
        if (typeof AbortController !== "undefined") {
            requestOptions.signal = abortSignal;
        }
        if (keepAliveSupport.supported) {
            requestOptions.keepalive = keepAlive;
        }
        if (typeof this.config.requestInit === "function") {
            Object.assign(requestOptions, this.config.requestInit(request));
        }
        let removeSignalEventListener = () => { };
        const fetchRequest = createRequest(url, requestOptions);
        const raceOfPromises = [
            fetch(fetchRequest).then((response) => {
                const fetchHeaders = response.headers;
                const transformedHeaders = {};
                for (const pair of fetchHeaders.entries()) {
                    transformedHeaders[pair[0]] = pair[1];
                }
                const hasReadableStream = response.body != undefined;
                if (!hasReadableStream) {
                    return response.blob().then((body) => ({
                        response: new HttpResponse({
                            headers: transformedHeaders,
                            reason: response.statusText,
                            statusCode: response.status,
                            body,
                        }),
                    }));
                }
                return {
                    response: new HttpResponse({
                        headers: transformedHeaders,
                        reason: response.statusText,
                        statusCode: response.status,
                        body: response.body,
                    }),
                };
            }),
            requestTimeoutFn(requestTimeoutInMs),
        ];
        if (abortSignal) {
            raceOfPromises.push(new Promise((resolve, reject) => {
                const onAbort = () => {
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
                if (typeof abortSignal.addEventListener === "function") {
                    const signal = abortSignal;
                    signal.addEventListener("abort", onAbort, { once: true });
                    removeSignalEventListener = () => signal.removeEventListener("abort", onAbort);
                }
                else {
                    abortSignal.onabort = onAbort;
                }
            }));
        }
        return Promise.race(raceOfPromises).finally(removeSignalEventListener);
    }
    updateHttpClientConfig(key, value) {
        this.config = undefined;
        this.configProvider = this.configProvider.then((config) => {
            config[key] = value;
            return config;
        });
    }
    httpHandlerConfigs() {
        return this.config ?? {};
    }
}

;// ./node_modules/@smithy/fetch-http-handler/dist-es/stream-collector.js

const streamCollector = async (stream) => {
    if ((typeof Blob === "function" && stream instanceof Blob) || stream.constructor?.name === "Blob") {
        if (Blob.prototype.arrayBuffer !== undefined) {
            return new Uint8Array(await stream.arrayBuffer());
        }
        return collectBlob(stream);
    }
    return collectStream(stream);
};
async function collectBlob(blob) {
    const base64 = await readToBase64(blob);
    const arrayBuffer = (0,dist_es/* fromBase64 */.E)(base64);
    return new Uint8Array(arrayBuffer);
}
async function collectStream(stream) {
    const chunks = [];
    const reader = stream.getReader();
    let isDone = false;
    let length = 0;
    while (!isDone) {
        const { done, value } = await reader.read();
        if (value) {
            chunks.push(value);
            length += value.length;
        }
        isDone = done;
    }
    const collected = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
        collected.set(chunk, offset);
        offset += chunk.length;
    }
    return collected;
}
function readToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState !== 2) {
                return reject(new Error("Reader aborted too early"));
            }
            const result = (reader.result ?? "");
            const commaIndex = result.indexOf(",");
            const dataOffset = commaIndex > -1 ? commaIndex + 1 : result.length;
            resolve(result.substring(dataOffset));
        };
        reader.onabort = () => reject(new Error("Read aborted"));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
    });
}

;// ./node_modules/@smithy/fetch-http-handler/dist-es/index.js



// EXTERNAL MODULE: ./node_modules/@smithy/util-hex-encoding/dist-es/index.js
var util_hex_encoding_dist_es = __webpack_require__(8004);
;// ./node_modules/@smithy/util-stream/dist-es/stream-type-check.js
const stream_type_check_isReadableStream = (stream) => typeof ReadableStream === "function" &&
    (stream?.constructor?.name === ReadableStream.name || stream instanceof ReadableStream);
const stream_type_check_isBlob = (blob) => {
    return typeof Blob === "function" && (blob?.constructor?.name === Blob.name || blob instanceof Blob);
};

;// ./node_modules/@smithy/util-stream/dist-es/sdk-stream-mixin.browser.js





const ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
const sdkStreamMixin = (stream) => {
    if (!isBlobInstance(stream) && !stream_type_check_isReadableStream(stream)) {
        const name = stream?.__proto__?.constructor?.name || stream;
        throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${name}`);
    }
    let transformed = false;
    const transformToByteArray = async () => {
        if (transformed) {
            throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
        }
        transformed = true;
        return await streamCollector(stream);
    };
    const blobToWebStream = (blob) => {
        if (typeof blob.stream !== "function") {
            throw new Error("Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\n" +
                "If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body");
        }
        return blob.stream();
    };
    return Object.assign(stream, {
        transformToByteArray: transformToByteArray,
        transformToString: async (encoding) => {
            const buf = await transformToByteArray();
            if (encoding === "base64") {
                return (0,dist_es/* toBase64 */.n)(buf);
            }
            else if (encoding === "hex") {
                return (0,util_hex_encoding_dist_es/* toHex */.n)(buf);
            }
            else if (encoding === undefined || encoding === "utf8" || encoding === "utf-8") {
                return (0,util_utf8_dist_es/* toUtf8 */.Pq)(buf);
            }
            else if (typeof TextDecoder === "function") {
                return new TextDecoder(encoding).decode(buf);
            }
            else {
                throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
            }
        },
        transformToWebStream: () => {
            if (transformed) {
                throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
            }
            transformed = true;
            if (isBlobInstance(stream)) {
                return blobToWebStream(stream);
            }
            else if (stream_type_check_isReadableStream(stream)) {
                return stream;
            }
            else {
                throw new Error(`Cannot transform payload to web stream, got ${stream}`);
            }
        },
    });
};
const isBlobInstance = (stream) => typeof Blob === "function" && stream instanceof Blob;

;// ./node_modules/@smithy/util-stream/dist-es/sdk-stream-mixin.js




const sdk_stream_mixin_ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
const sdk_stream_mixin_sdkStreamMixin = (stream) => {
    if (!(stream instanceof external_stream_.Readable)) {
        try {
            return sdkStreamMixin(stream);
        }
        catch (e) {
            const name = stream?.__proto__?.constructor?.name || stream;
            throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${name}`);
        }
    }
    let transformed = false;
    const transformToByteArray = async () => {
        if (transformed) {
            throw new Error(sdk_stream_mixin_ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
        }
        transformed = true;
        return await (0,node_http_handler_dist_es/* streamCollector */.kv)(stream);
    };
    return Object.assign(stream, {
        transformToByteArray,
        transformToString: async (encoding) => {
            const buf = await transformToByteArray();
            if (encoding === undefined || Buffer.isEncoding(encoding)) {
                return (0,util_buffer_from_dist_es/* fromArrayBuffer */.Q)(buf.buffer, buf.byteOffset, buf.byteLength).toString(encoding);
            }
            else {
                const decoder = new TextDecoder(encoding);
                return decoder.decode(buf);
            }
        },
        transformToWebStream: () => {
            if (transformed) {
                throw new Error(sdk_stream_mixin_ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
            }
            if (stream.readableFlowing !== null) {
                throw new Error("The stream has been consumed by other callbacks.");
            }
            if (typeof external_stream_.Readable.toWeb !== "function") {
                throw new Error("Readable.toWeb() is not supported. Please ensure a polyfill is available.");
            }
            transformed = true;
            return external_stream_.Readable.toWeb(stream);
        },
    });
};

;// ./node_modules/@smithy/util-stream/dist-es/splitStream.js



async function splitStream(stream) {
    if (isReadableStream(stream) || isBlob(stream)) {
        return splitWebStream(stream);
    }
    const stream1 = new PassThrough();
    const stream2 = new PassThrough();
    stream.pipe(stream1);
    stream.pipe(stream2);
    return [stream1, stream2];
}

;// ./node_modules/@smithy/util-stream/dist-es/index.js











/***/ }),

/***/ 6813:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const compare = __webpack_require__(3701)
const rcompare = (a, b, loose) => compare(b, a, loose)
module.exports = rcompare


/***/ }),

/***/ 6827:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  bM: () => (/* reexport */ DEFAULT_UA_APP_ID),
  sM: () => (/* reexport */ getUserAgentPlugin),
  Dc: () => (/* reexport */ resolveUserAgentConfig)
});

// UNUSED EXPORTS: getUserAgentMiddlewareOptions, userAgentMiddleware

// EXTERNAL MODULE: ./node_modules/@smithy/core/dist-es/normalizeProvider.js
var normalizeProvider = __webpack_require__(4367);
;// ./node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js

const DEFAULT_UA_APP_ID = undefined;
function isValidUserAgentAppId(appId) {
    if (appId === undefined) {
        return true;
    }
    return typeof appId === "string" && appId.length <= 50;
}
function resolveUserAgentConfig(input) {
    const normalizedAppIdProvider = (0,normalizeProvider/* normalizeProvider */.t)(input.userAgentAppId ?? DEFAULT_UA_APP_ID);
    const { customUserAgent } = input;
    return Object.assign(input, {
        customUserAgent: typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent,
        userAgentAppId: async () => {
            const appId = await normalizedAppIdProvider();
            if (!isValidUserAgentAppId(appId)) {
                const logger = input.logger?.constructor?.name === "NoOpLogger" || !input.logger ? console : input.logger;
                if (typeof appId !== "string") {
                    logger?.warn("userAgentAppId must be a string or undefined.");
                }
                else if (appId.length > 50) {
                    logger?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
                }
            }
            return appId;
        },
    });
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/util-endpoints/dist-es/index.js + 15 modules
var dist_es = __webpack_require__(643);
// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var protocol_http_dist_es = __webpack_require__(5479);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/client/setFeature.js
var setFeature = __webpack_require__(3415);
;// ./node_modules/@aws-sdk/middleware-user-agent/dist-es/check-features.js

const ACCOUNT_ID_ENDPOINT_REGEX = /\d{12}\.ddb/;
async function checkFeatures(context, config, args) {
    const request = args.request;
    if (request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") {
        (0,setFeature/* setFeature */.J)(context, "PROTOCOL_RPC_V2_CBOR", "M");
    }
    if (typeof config.retryStrategy === "function") {
        const retryStrategy = await config.retryStrategy();
        if (typeof retryStrategy.acquireInitialRetryToken === "function") {
            if (retryStrategy.constructor?.name?.includes("Adaptive")) {
                (0,setFeature/* setFeature */.J)(context, "RETRY_MODE_ADAPTIVE", "F");
            }
            else {
                (0,setFeature/* setFeature */.J)(context, "RETRY_MODE_STANDARD", "E");
            }
        }
        else {
            (0,setFeature/* setFeature */.J)(context, "RETRY_MODE_LEGACY", "D");
        }
    }
    if (typeof config.accountIdEndpointMode === "function") {
        const endpointV2 = context.endpointV2;
        if (String(endpointV2?.url?.hostname).match(ACCOUNT_ID_ENDPOINT_REGEX)) {
            (0,setFeature/* setFeature */.J)(context, "ACCOUNT_ID_ENDPOINT", "O");
        }
        switch (await config.accountIdEndpointMode?.()) {
            case "disabled":
                (0,setFeature/* setFeature */.J)(context, "ACCOUNT_ID_MODE_DISABLED", "Q");
                break;
            case "preferred":
                (0,setFeature/* setFeature */.J)(context, "ACCOUNT_ID_MODE_PREFERRED", "P");
                break;
            case "required":
                (0,setFeature/* setFeature */.J)(context, "ACCOUNT_ID_MODE_REQUIRED", "R");
                break;
        }
    }
    const identity = context.__smithy_context?.selectedHttpAuthScheme?.identity;
    if (identity?.$source) {
        const credentials = identity;
        if (credentials.accountId) {
            (0,setFeature/* setFeature */.J)(context, "RESOLVED_ACCOUNT_ID", "T");
        }
        for (const [key, value] of Object.entries(credentials.$source ?? {})) {
            (0,setFeature/* setFeature */.J)(context, key, value);
        }
    }
}

;// ./node_modules/@aws-sdk/middleware-user-agent/dist-es/constants.js
const USER_AGENT = "user-agent";
const X_AMZ_USER_AGENT = "x-amz-user-agent";
const SPACE = " ";
const UA_NAME_SEPARATOR = "/";
const UA_NAME_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g;
const UA_VALUE_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g;
const UA_ESCAPE_CHAR = "-";

;// ./node_modules/@aws-sdk/middleware-user-agent/dist-es/encode-features.js
const BYTE_LIMIT = 1024;
function encodeFeatures(features) {
    let buffer = "";
    for (const key in features) {
        const val = features[key];
        if (buffer.length + val.length + 1 <= BYTE_LIMIT) {
            if (buffer.length) {
                buffer += "," + val;
            }
            else {
                buffer += val;
            }
            continue;
        }
        break;
    }
    return buffer;
}

;// ./node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js





const userAgentMiddleware = (options) => (next, context) => async (args) => {
    const { request } = args;
    if (!protocol_http_dist_es/* HttpRequest */.Kd.isInstance(request)) {
        return next(args);
    }
    const { headers } = request;
    const userAgent = context?.userAgent?.map(escapeUserAgent) || [];
    const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
    await checkFeatures(context, options, args);
    const awsContext = context;
    defaultUserAgent.push(`m/${encodeFeatures(Object.assign({}, context.__smithy_context?.features, awsContext.__aws_sdk_context?.features))}`);
    const customUserAgent = options?.customUserAgent?.map(escapeUserAgent) || [];
    const appId = await options.userAgentAppId();
    if (appId) {
        defaultUserAgent.push(escapeUserAgent([`app/${appId}`]));
    }
    const prefix = (0,dist_es/* getUserAgentPrefix */.vL)();
    const sdkUserAgentValue = (prefix ? [prefix] : [])
        .concat([...defaultUserAgent, ...userAgent, ...customUserAgent])
        .join(SPACE);
    const normalUAValue = [
        ...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")),
        ...customUserAgent,
    ].join(SPACE);
    if (options.runtime !== "browser") {
        if (normalUAValue) {
            headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT]
                ? `${headers[USER_AGENT]} ${normalUAValue}`
                : normalUAValue;
        }
        headers[USER_AGENT] = sdkUserAgentValue;
    }
    else {
        headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
    }
    return next({
        ...args,
        request,
    });
};
const escapeUserAgent = (userAgentPair) => {
    const name = userAgentPair[0]
        .split(UA_NAME_SEPARATOR)
        .map((part) => part.replace(UA_NAME_ESCAPE_REGEX, UA_ESCAPE_CHAR))
        .join(UA_NAME_SEPARATOR);
    const version = userAgentPair[1]?.replace(UA_VALUE_ESCAPE_REGEX, UA_ESCAPE_CHAR);
    const prefixSeparatorIndex = name.indexOf(UA_NAME_SEPARATOR);
    const prefix = name.substring(0, prefixSeparatorIndex);
    let uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
        uaName = uaName.toLowerCase();
    }
    return [prefix, uaName, version]
        .filter((item) => item && item.length > 0)
        .reduce((acc, item, index) => {
        switch (index) {
            case 0:
                return item;
            case 1:
                return `${acc}/${item}`;
            default:
                return `${acc}#${item}`;
        }
    }, "");
};
const getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: ["SET_USER_AGENT", "USER_AGENT"],
    override: true,
};
const getUserAgentPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
    },
});

;// ./node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js




/***/ }),

/***/ 6839:
/***/ ((module) => {

"use strict";


const debug = (
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {}

module.exports = debug


/***/ }),

/***/ 6912:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const compare = __webpack_require__(3701)
const lt = (a, b, loose) => compare(a, b, loose) < 0
module.exports = lt


/***/ }),

/***/ 6928:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Rq: () => (/* reexport */ getAwsRegionExtensionConfiguration),
  $3: () => (/* reexport */ resolveAwsRegionExtensionConfiguration)
});

// UNUSED EXPORTS: NODE_REGION_CONFIG_FILE_OPTIONS, NODE_REGION_CONFIG_OPTIONS, REGION_ENV_NAME, REGION_INI_NAME, resolveRegionConfig

;// ./node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js
const getAwsRegionExtensionConfiguration = (runtimeConfig) => {
    return {
        setRegion(region) {
            runtimeConfig.region = region;
        },
        region() {
            return runtimeConfig.region;
        },
    };
};
const resolveAwsRegionExtensionConfiguration = (awsRegionExtensionConfiguration) => {
    return {
        region: awsRegionExtensionConfiguration.region(),
    };
};

;// ./node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/config.js
const REGION_ENV_NAME = "AWS_REGION";
const REGION_INI_NAME = "region";
const NODE_REGION_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[REGION_ENV_NAME],
    configFileSelector: (profile) => profile[REGION_INI_NAME],
    default: () => {
        throw new Error("Region is missing");
    },
};
const NODE_REGION_CONFIG_FILE_OPTIONS = {
    preferredFile: "credentials",
};

;// ./node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/index.js



;// ./node_modules/@aws-sdk/region-config-resolver/dist-es/index.js




/***/ }),

/***/ 6982:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 7016:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 7019:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ASYMMETRIC_KEY_DETAILS_SUPPORTED = __webpack_require__(1977);
const RSA_PSS_KEY_DETAILS_SUPPORTED = __webpack_require__(4623);

const allowedAlgorithmsForKeys = {
  'ec': ['ES256', 'ES384', 'ES512'],
  'rsa': ['RS256', 'PS256', 'RS384', 'PS384', 'RS512', 'PS512'],
  'rsa-pss': ['PS256', 'PS384', 'PS512']
};

const allowedCurves = {
  ES256: 'prime256v1',
  ES384: 'secp384r1',
  ES512: 'secp521r1',
};

module.exports = function(algorithm, key) {
  if (!algorithm || !key) return;

  const keyType = key.asymmetricKeyType;
  if (!keyType) return;

  const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];

  if (!allowedAlgorithms) {
    throw new Error(`Unknown key type "${keyType}".`);
  }

  if (!allowedAlgorithms.includes(algorithm)) {
    throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(', ')}.`)
  }

  /*
   * Ignore the next block from test coverage because it gets executed
   * conditionally depending on the Node version. Not ignoring it would
   * prevent us from reaching the target % of coverage for versions of
   * Node under 15.7.0.
   */
  /* istanbul ignore next */
  if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
    switch (keyType) {
    case 'ec':
      const keyCurve = key.asymmetricKeyDetails.namedCurve;
      const allowedCurve = allowedCurves[algorithm];

      if (keyCurve !== allowedCurve) {
        throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
      }
      break;

    case 'rsa-pss':
      if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
        const length = parseInt(algorithm.slice(-3), 10);
        const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;

        if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
          throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
        }

        if (saltLength !== undefined && saltLength > length >> 3) {
          throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`)
        }
      }
      break;
    }
  }
}


/***/ }),

/***/ 7028:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDynamoDBClient = void 0;
const client_dynamodb_1 = __webpack_require__(7602);
const lib_dynamodb_1 = __webpack_require__(3832);
const getDynamoDBClient = () => {
    const clientConfig = {
        region: process.env.AWS_REGION || process.env.REGION || 'us-east-1'
    };
    // Only set endpoint for local development (when DYNAMODB_ENDPOINT is set)
    if (process.env.DYNAMODB_ENDPOINT) {
        clientConfig.endpoint = process.env.DYNAMODB_ENDPOINT;
        // Only set explicit credentials for local development
        clientConfig.credentials = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy'
        };
    }
    // For AWS Lambda, don't set credentials - let IAM role handle it
    const client = new client_dynamodb_1.DynamoDBClient(clientConfig);
    return lib_dynamodb_1.DynamoDBDocumentClient.from(client);
};
exports.getDynamoDBClient = getDynamoDBClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhEQUEwRDtBQUMxRCx3REFBK0Q7QUFFeEQsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLEVBQUU7SUFDcEMsTUFBTSxZQUFZLEdBQVE7UUFDeEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLFdBQVc7S0FDcEUsQ0FBQztJQUVGLDBFQUEwRTtJQUMxRSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNsQyxZQUFZLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7UUFDdEQsc0RBQXNEO1FBQ3RELFlBQVksQ0FBQyxXQUFXLEdBQUc7WUFDekIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksT0FBTztZQUNyRCxlQUFlLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxPQUFPO1NBQzlELENBQUM7SUFDSixDQUFDO0lBQ0QsaUVBQWlFO0lBRWpFLE1BQU0sTUFBTSxHQUFHLElBQUksZ0NBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxPQUFPLHFDQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUM7QUFsQlcsUUFBQSxpQkFBaUIscUJBa0I1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50IH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1keW5hbW9kYlwiO1xuaW1wb3J0IHsgRHluYW1vREJEb2N1bWVudENsaWVudCB9IGZyb20gXCJAYXdzLXNkay9saWItZHluYW1vZGJcIjtcblxuZXhwb3J0IGNvbnN0IGdldER5bmFtb0RCQ2xpZW50ID0gKCkgPT4ge1xuICBjb25zdCBjbGllbnRDb25maWc6IGFueSA9IHtcbiAgICByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04gfHwgcHJvY2Vzcy5lbnYuUkVHSU9OIHx8ICd1cy1lYXN0LTEnXG4gIH07XG5cbiAgLy8gT25seSBzZXQgZW5kcG9pbnQgZm9yIGxvY2FsIGRldmVsb3BtZW50ICh3aGVuIERZTkFNT0RCX0VORFBPSU5UIGlzIHNldClcbiAgaWYgKHByb2Nlc3MuZW52LkRZTkFNT0RCX0VORFBPSU5UKSB7XG4gICAgY2xpZW50Q29uZmlnLmVuZHBvaW50ID0gcHJvY2Vzcy5lbnYuRFlOQU1PREJfRU5EUE9JTlQ7XG4gICAgLy8gT25seSBzZXQgZXhwbGljaXQgY3JlZGVudGlhbHMgZm9yIGxvY2FsIGRldmVsb3BtZW50XG4gICAgY2xpZW50Q29uZmlnLmNyZWRlbnRpYWxzID0ge1xuICAgICAgYWNjZXNzS2V5SWQ6IHByb2Nlc3MuZW52LkFXU19BQ0NFU1NfS0VZX0lEIHx8ICdkdW1teScsXG4gICAgICBzZWNyZXRBY2Nlc3NLZXk6IHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWSB8fCAnZHVtbXknXG4gICAgfTtcbiAgfVxuICAvLyBGb3IgQVdTIExhbWJkYSwgZG9uJ3Qgc2V0IGNyZWRlbnRpYWxzIC0gbGV0IElBTSByb2xlIGhhbmRsZSBpdFxuXG4gIGNvbnN0IGNsaWVudCA9IG5ldyBEeW5hbW9EQkNsaWVudChjbGllbnRDb25maWcpO1xuICByZXR1cm4gRHluYW1vREJEb2N1bWVudENsaWVudC5mcm9tKGNsaWVudCk7XG59O1xuIl19

/***/ }),

/***/ 7042:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ ExecuteStatementCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class ExecuteStatementCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep(_endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S)
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "ExecuteStatement", {})
    .n("DynamoDBClient", "ExecuteStatementCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_ExecuteStatementCommand */ .$K)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_ExecuteStatementCommand */ .Om)
    .build() {
}


/***/ }),

/***/ 7051:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ commonParams),
/* harmony export */   v: () => (/* binding */ resolveClientEndpointParameters)
/* harmony export */ });
const resolveClientEndpointParameters = (options) => {
    return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "dynamodb",
    });
};
const commonParams = {
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    AccountId: { type: "builtInParams", name: "accountId" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
    AccountIdEndpointMode: { type: "builtInParams", name: "accountIdEndpointMode" },
};


/***/ }),

/***/ 7083:
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery(element).on('click', _.before(5, addContactToList));
 * // => Allows adding up to 4 contacts to the list.
 */
function before(n, func) {
  var result;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = undefined;
    }
    return result;
  };
}

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 */
function once(func) {
  return before(2, func);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = once;


/***/ }),

/***/ 7135:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  u: () => (/* reexport */ getSmithyContext),
  t: () => (/* reexport */ normalizeProvider)
});

// EXTERNAL MODULE: ./node_modules/@smithy/types/dist-es/index.js + 11 modules
var dist_es = __webpack_require__(7523);
;// ./node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js

const getSmithyContext = (context) => context[dist_es/* SMITHY_CONTEXT_KEY */.Vf] || (context[dist_es/* SMITHY_CONTEXT_KEY */.Vf] = {});

;// ./node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js
const normalizeProvider = (input) => {
    if (typeof input === "function")
        return input;
    const promisified = Promise.resolve(input);
    return () => promisified;
};

;// ./node_modules/@smithy/util-middleware/dist-es/index.js




/***/ }),

/***/ 7153:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)
const parse = (version, options, throwErrors = false) => {
  if (version instanceof SemVer) {
    return version
  }
  try {
    return new SemVer(version, options)
  } catch (er) {
    if (!throwErrors) {
      return null
    }
    throw er
  }
}

module.exports = parse


/***/ }),

/***/ 7207:
/***/ ((module) => {

"use strict";


class LRUCache {
  constructor () {
    this.max = 1000
    this.map = new Map()
  }

  get (key) {
    const value = this.map.get(key)
    if (value === undefined) {
      return undefined
    } else {
      // Remove the key from the map and add it to the end
      this.map.delete(key)
      this.map.set(key, value)
      return value
    }
  }

  delete (key) {
    return this.map.delete(key)
  }

  set (key, value) {
    const deleted = this.delete(key)

    if (!deleted && value !== undefined) {
      // If cache is full, delete the least recently used item
      if (this.map.size >= this.max) {
        const firstKey = this.map.keys().next().value
        this.delete(firstKey)
      }

      this.map.set(key, value)
    }

    return this
  }
}

module.exports = LRUCache


/***/ }),

/***/ 7210:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ BatchExecuteStatementCommand),
/* harmony export */   g: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.uB)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class BatchExecuteStatementCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep(_endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S)
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "BatchExecuteStatement", {})
    .n("DynamoDBClient", "BatchExecuteStatementCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_BatchExecuteStatementCommand */ .DE)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_BatchExecuteStatementCommand */ .uf)
    .build() {
}


/***/ }),

/***/ 7234:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  rD: () => (/* reexport */ getEndpointPlugin),
  Co: () => (/* reexport */ resolveEndpointConfig)
});

// UNUSED EXPORTS: endpointMiddleware, endpointMiddlewareOptions, getEndpointFromInstructions, resolveEndpointRequiredConfig, resolveParams, toEndpointV1

;// ./node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/s3.js
const resolveParamsForS3 = async (endpointParams) => {
    const bucket = endpointParams?.Bucket || "";
    if (typeof endpointParams.Bucket === "string") {
        endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
    }
    if (isArnBucketName(bucket)) {
        if (endpointParams.ForcePathStyle === true) {
            throw new Error("Path-style addressing cannot be used with ARN buckets");
        }
    }
    else if (!isDnsCompatibleBucketName(bucket) ||
        (bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:")) ||
        bucket.toLowerCase() !== bucket ||
        bucket.length < 3) {
        endpointParams.ForcePathStyle = true;
    }
    if (endpointParams.DisableMultiRegionAccessPoints) {
        endpointParams.disableMultiRegionAccessPoints = true;
        endpointParams.DisableMRAP = true;
    }
    return endpointParams;
};
const DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
const IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
const DOTS_PATTERN = /\.\./;
const DOT_PATTERN = /\./;
const S3_HOSTNAME_PATTERN = /^(.+\.)?s3(-fips)?(\.dualstack)?[.-]([a-z0-9-]+)\./;
const isDnsCompatibleBucketName = (bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
const isArnBucketName = (bucketName) => {
    const [arn, partition, service, , , bucket] = bucketName.split(":");
    const isArn = arn === "arn" && bucketName.split(":").length >= 6;
    const isValidArn = Boolean(isArn && partition && service && bucket);
    if (isArn && !isValidArn) {
        throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
    }
    return isValidArn;
};

;// ./node_modules/@smithy/middleware-endpoint/dist-es/adaptors/createConfigValueProvider.js
const createConfigValueProvider = (configKey, canonicalEndpointParamKey, config) => {
    const configProvider = async () => {
        const configValue = config[configKey] ?? config[canonicalEndpointParamKey];
        if (typeof configValue === "function") {
            return configValue();
        }
        return configValue;
    };
    if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") {
        return async () => {
            const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
            const configValue = credentials?.credentialScope ?? credentials?.CredentialScope;
            return configValue;
        };
    }
    if (configKey === "accountId" || canonicalEndpointParamKey === "AccountId") {
        return async () => {
            const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
            const configValue = credentials?.accountId ?? credentials?.AccountId;
            return configValue;
        };
    }
    if (configKey === "endpoint" || canonicalEndpointParamKey === "endpoint") {
        return async () => {
            if (config.isCustomEndpoint === false) {
                return undefined;
            }
            const endpoint = await configProvider();
            if (endpoint && typeof endpoint === "object") {
                if ("url" in endpoint) {
                    return endpoint.url.href;
                }
                if ("hostname" in endpoint) {
                    const { protocol, hostname, port, path } = endpoint;
                    return `${protocol}//${hostname}${port ? ":" + port : ""}${path}`;
                }
            }
            return endpoint;
        };
    }
    return configProvider;
};

// EXTERNAL MODULE: ./node_modules/@smithy/node-config-provider/dist-es/index.js + 5 modules
var dist_es = __webpack_require__(9987);
// EXTERNAL MODULE: ./node_modules/@smithy/shared-ini-file-loader/dist-es/index.js + 15 modules
var shared_ini_file_loader_dist_es = __webpack_require__(2792);
;// ./node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointUrlConfig.js

const ENV_ENDPOINT_URL = "AWS_ENDPOINT_URL";
const CONFIG_ENDPOINT_URL = "endpoint_url";
const getEndpointUrlConfig = (serviceId) => ({
    environmentVariableSelector: (env) => {
        const serviceSuffixParts = serviceId.split(" ").map((w) => w.toUpperCase());
        const serviceEndpointUrl = env[[ENV_ENDPOINT_URL, ...serviceSuffixParts].join("_")];
        if (serviceEndpointUrl)
            return serviceEndpointUrl;
        const endpointUrl = env[ENV_ENDPOINT_URL];
        if (endpointUrl)
            return endpointUrl;
        return undefined;
    },
    configFileSelector: (profile, config) => {
        if (config && profile.services) {
            const servicesSection = config[["services", profile.services].join(shared_ini_file_loader_dist_es/* CONFIG_PREFIX_SEPARATOR */.QD)];
            if (servicesSection) {
                const servicePrefixParts = serviceId.split(" ").map((w) => w.toLowerCase());
                const endpointUrl = servicesSection[[servicePrefixParts.join("_"), CONFIG_ENDPOINT_URL].join(shared_ini_file_loader_dist_es/* CONFIG_PREFIX_SEPARATOR */.QD)];
                if (endpointUrl)
                    return endpointUrl;
            }
        }
        const endpointUrl = profile[CONFIG_ENDPOINT_URL];
        if (endpointUrl)
            return endpointUrl;
        return undefined;
    },
    default: undefined,
});

;// ./node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromConfig.js


const getEndpointFromConfig = async (serviceId) => (0,dist_es/* loadConfig */.Z)(getEndpointUrlConfig(serviceId ?? ""))();

// EXTERNAL MODULE: ./node_modules/@smithy/url-parser/dist-es/index.js + 1 modules
var url_parser_dist_es = __webpack_require__(2641);
;// ./node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js

const toEndpointV1 = (endpoint) => {
    if (typeof endpoint === "object") {
        if ("url" in endpoint) {
            return (0,url_parser_dist_es/* parseUrl */.D)(endpoint.url);
        }
        return endpoint;
    }
    return (0,url_parser_dist_es/* parseUrl */.D)(endpoint);
};

;// ./node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromInstructions.js




const getEndpointFromInstructions = async (commandInput, instructionsSupplier, clientConfig, context) => {
    if (!clientConfig.isCustomEndpoint) {
        let endpointFromConfig;
        if (clientConfig.serviceConfiguredEndpoint) {
            endpointFromConfig = await clientConfig.serviceConfiguredEndpoint();
        }
        else {
            endpointFromConfig = await getEndpointFromConfig(clientConfig.serviceId);
        }
        if (endpointFromConfig) {
            clientConfig.endpoint = () => Promise.resolve(toEndpointV1(endpointFromConfig));
            clientConfig.isCustomEndpoint = true;
        }
    }
    const endpointParams = await resolveParams(commandInput, instructionsSupplier, clientConfig);
    if (typeof clientConfig.endpointProvider !== "function") {
        throw new Error("config.endpointProvider is not set.");
    }
    const endpoint = clientConfig.endpointProvider(endpointParams, context);
    return endpoint;
};
const resolveParams = async (commandInput, instructionsSupplier, clientConfig) => {
    const endpointParams = {};
    const instructions = instructionsSupplier?.getEndpointParameterInstructions?.() || {};
    for (const [name, instruction] of Object.entries(instructions)) {
        switch (instruction.type) {
            case "staticContextParams":
                endpointParams[name] = instruction.value;
                break;
            case "contextParams":
                endpointParams[name] = commandInput[instruction.name];
                break;
            case "clientContextParams":
            case "builtInParams":
                endpointParams[name] = await createConfigValueProvider(instruction.name, name, clientConfig)();
                break;
            case "operationContextParams":
                endpointParams[name] = instruction.get(commandInput);
                break;
            default:
                throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(instruction));
        }
    }
    if (Object.keys(instructions).length === 0) {
        Object.assign(endpointParams, clientConfig);
    }
    if (String(clientConfig.serviceId).toLowerCase() === "s3") {
        await resolveParamsForS3(endpointParams);
    }
    return endpointParams;
};

;// ./node_modules/@smithy/middleware-endpoint/dist-es/adaptors/index.js



;// ./node_modules/@smithy/core/dist-es/setFeature.js
function setFeature(context, feature, value) {
    if (!context.__smithy_context) {
        context.__smithy_context = {
            features: {},
        };
    }
    else if (!context.__smithy_context.features) {
        context.__smithy_context.features = {};
    }
    context.__smithy_context.features[feature] = value;
}

// EXTERNAL MODULE: ./node_modules/@smithy/util-middleware/dist-es/index.js + 2 modules
var util_middleware_dist_es = __webpack_require__(7135);
;// ./node_modules/@smithy/middleware-endpoint/dist-es/endpointMiddleware.js



const endpointMiddleware = ({ config, instructions, }) => {
    return (next, context) => async (args) => {
        if (config.isCustomEndpoint) {
            setFeature(context, "ENDPOINT_OVERRIDE", "N");
        }
        const endpoint = await getEndpointFromInstructions(args.input, {
            getEndpointParameterInstructions() {
                return instructions;
            },
        }, { ...config }, context);
        context.endpointV2 = endpoint;
        context.authSchemes = endpoint.properties?.authSchemes;
        const authScheme = context.authSchemes?.[0];
        if (authScheme) {
            context["signing_region"] = authScheme.signingRegion;
            context["signing_service"] = authScheme.signingName;
            const smithyContext = (0,util_middleware_dist_es/* getSmithyContext */.u)(context);
            const httpAuthOption = smithyContext?.selectedHttpAuthScheme?.httpAuthOption;
            if (httpAuthOption) {
                httpAuthOption.signingProperties = Object.assign(httpAuthOption.signingProperties || {}, {
                    signing_region: authScheme.signingRegion,
                    signingRegion: authScheme.signingRegion,
                    signing_service: authScheme.signingName,
                    signingName: authScheme.signingName,
                    signingRegionSet: authScheme.signingRegionSet,
                }, authScheme.properties);
            }
        }
        return next({
            ...args,
        });
    };
};

// EXTERNAL MODULE: ./node_modules/@smithy/middleware-serde/dist-es/index.js + 3 modules
var middleware_serde_dist_es = __webpack_require__(1208);
;// ./node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js


const endpointMiddlewareOptions = {
    step: "serialize",
    tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
    name: "endpointV2Middleware",
    override: true,
    relation: "before",
    toMiddleware: middleware_serde_dist_es/* serializerMiddlewareOption */.Ou.name,
};
const getEndpointPlugin = (config, instructions) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(endpointMiddleware({
            config,
            instructions,
        }), endpointMiddlewareOptions);
    },
});

;// ./node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js



const resolveEndpointConfig = (input) => {
    const tls = input.tls ?? true;
    const { endpoint, useDualstackEndpoint, useFipsEndpoint } = input;
    const customEndpointProvider = endpoint != null ? async () => toEndpointV1(await (0,util_middleware_dist_es/* normalizeProvider */.t)(endpoint)()) : undefined;
    const isCustomEndpoint = !!endpoint;
    const resolvedConfig = Object.assign(input, {
        endpoint: customEndpointProvider,
        tls,
        isCustomEndpoint,
        useDualstackEndpoint: (0,util_middleware_dist_es/* normalizeProvider */.t)(useDualstackEndpoint ?? false),
        useFipsEndpoint: (0,util_middleware_dist_es/* normalizeProvider */.t)(useFipsEndpoint ?? false),
    });
    let configuredEndpointPromise = undefined;
    resolvedConfig.serviceConfiguredEndpoint = async () => {
        if (input.serviceId && !configuredEndpointPromise) {
            configuredEndpointPromise = getEndpointFromConfig(input.serviceId);
        }
        return configuredEndpointPromise;
    };
    return resolvedConfig;
};

;// ./node_modules/@smithy/middleware-endpoint/dist-es/index.js








/***/ }),

/***/ 7260:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var jws = __webpack_require__(5747);

module.exports = function (jwt, options) {
  options = options || {};
  var decoded = jws.decode(jwt, options);
  if (!decoded) { return null; }
  var payload = decoded.payload;

  //try parse the payload
  if(typeof payload === 'string') {
    try {
      var obj = JSON.parse(payload);
      if(obj !== null && typeof obj === 'object') {
        payload = obj;
      }
    } catch (e) { }
  }

  //return header if `complete` option is enabled.  header includes claims
  //such as `kid` and `alg` used to select the key within a JWKS needed to
  //verify the signature
  if (options.complete === true) {
    return {
      header: decoded.header,
      payload: payload,
      signature: decoded.signature
    };
  }
  return payload;
};


/***/ }),

/***/ 7523:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  dB: () => (/* reexport */ AlgorithmId),
  Ue: () => (/* reexport */ EndpointURLScheme),
  Ip: () => (/* reexport */ IniSectionType),
  Vf: () => (/* reexport */ SMITHY_CONTEXT_KEY)
});

// UNUSED EXPORTS: FieldPosition, HttpApiKeyAuthLocation, HttpAuthLocation, RequestHandlerProtocol, getDefaultClientConfiguration, resolveDefaultRuntimeConfig

;// ./node_modules/@smithy/types/dist-es/auth/auth.js
var HttpAuthLocation;
(function (HttpAuthLocation) {
    HttpAuthLocation["HEADER"] = "header";
    HttpAuthLocation["QUERY"] = "query";
})(HttpAuthLocation || (HttpAuthLocation = {}));

;// ./node_modules/@smithy/types/dist-es/auth/HttpApiKeyAuth.js
var HttpApiKeyAuthLocation;
(function (HttpApiKeyAuthLocation) {
    HttpApiKeyAuthLocation["HEADER"] = "header";
    HttpApiKeyAuthLocation["QUERY"] = "query";
})(HttpApiKeyAuthLocation || (HttpApiKeyAuthLocation = {}));

;// ./node_modules/@smithy/types/dist-es/auth/index.js







;// ./node_modules/@smithy/types/dist-es/endpoint.js
var EndpointURLScheme;
(function (EndpointURLScheme) {
    EndpointURLScheme["HTTP"] = "http";
    EndpointURLScheme["HTTPS"] = "https";
})(EndpointURLScheme || (EndpointURLScheme = {}));

;// ./node_modules/@smithy/types/dist-es/extensions/checksum.js
var AlgorithmId;
(function (AlgorithmId) {
    AlgorithmId["MD5"] = "md5";
    AlgorithmId["CRC32"] = "crc32";
    AlgorithmId["CRC32C"] = "crc32c";
    AlgorithmId["SHA1"] = "sha1";
    AlgorithmId["SHA256"] = "sha256";
})(AlgorithmId || (AlgorithmId = {}));
const checksum_getChecksumConfiguration = (runtimeConfig) => {
    const checksumAlgorithms = [];
    if (runtimeConfig.sha256 !== undefined) {
        checksumAlgorithms.push({
            algorithmId: () => AlgorithmId.SHA256,
            checksumConstructor: () => runtimeConfig.sha256,
        });
    }
    if (runtimeConfig.md5 != undefined) {
        checksumAlgorithms.push({
            algorithmId: () => AlgorithmId.MD5,
            checksumConstructor: () => runtimeConfig.md5,
        });
    }
    return {
        addChecksumAlgorithm(algo) {
            checksumAlgorithms.push(algo);
        },
        checksumAlgorithms() {
            return checksumAlgorithms;
        },
    };
};
const checksum_resolveChecksumRuntimeConfig = (clientConfig) => {
    const runtimeConfig = {};
    clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
        runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
    });
    return runtimeConfig;
};

;// ./node_modules/@smithy/types/dist-es/extensions/defaultClientConfiguration.js

const getDefaultClientConfiguration = (runtimeConfig) => {
    return getChecksumConfiguration(runtimeConfig);
};
const resolveDefaultRuntimeConfig = (config) => {
    return resolveChecksumRuntimeConfig(config);
};

;// ./node_modules/@smithy/types/dist-es/extensions/index.js




;// ./node_modules/@smithy/types/dist-es/http.js
var FieldPosition;
(function (FieldPosition) {
    FieldPosition[FieldPosition["HEADER"] = 0] = "HEADER";
    FieldPosition[FieldPosition["TRAILER"] = 1] = "TRAILER";
})(FieldPosition || (FieldPosition = {}));

;// ./node_modules/@smithy/types/dist-es/middleware.js
const SMITHY_CONTEXT_KEY = "__smithy_context";

;// ./node_modules/@smithy/types/dist-es/profile.js
var IniSectionType;
(function (IniSectionType) {
    IniSectionType["PROFILE"] = "profile";
    IniSectionType["SSO_SESSION"] = "sso-session";
    IniSectionType["SERVICES"] = "services";
})(IniSectionType || (IniSectionType = {}));

;// ./node_modules/@smithy/types/dist-es/transfer.js
var RequestHandlerProtocol;
(function (RequestHandlerProtocol) {
    RequestHandlerProtocol["HTTP_0_9"] = "http/0.9";
    RequestHandlerProtocol["HTTP_1_0"] = "http/1.0";
    RequestHandlerProtocol["TDS_8_0"] = "tds/8.0";
})(RequestHandlerProtocol || (RequestHandlerProtocol = {}));

;// ./node_modules/@smithy/types/dist-es/index.js










































/***/ }),

/***/ 7599:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global module*/
var Buffer = (__webpack_require__(2861).Buffer);
var DataStream = __webpack_require__(8948);
var jwa = __webpack_require__(8789);
var Stream = __webpack_require__(2203);
var toString = __webpack_require__(2851);
var util = __webpack_require__(9023);
var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

function isObject(thing) {
  return Object.prototype.toString.call(thing) === '[object Object]';
}

function safeJsonParse(thing) {
  if (isObject(thing))
    return thing;
  try { return JSON.parse(thing); }
  catch (e) { return undefined; }
}

function headerFromJWS(jwsSig) {
  var encodedHeader = jwsSig.split('.', 1)[0];
  return safeJsonParse(Buffer.from(encodedHeader, 'base64').toString('binary'));
}

function securedInputFromJWS(jwsSig) {
  return jwsSig.split('.', 2).join('.');
}

function signatureFromJWS(jwsSig) {
  return jwsSig.split('.')[2];
}

function payloadFromJWS(jwsSig, encoding) {
  encoding = encoding || 'utf8';
  var payload = jwsSig.split('.')[1];
  return Buffer.from(payload, 'base64').toString(encoding);
}

function isValidJws(string) {
  return JWS_REGEX.test(string) && !!headerFromJWS(string);
}

function jwsVerify(jwsSig, algorithm, secretOrKey) {
  if (!algorithm) {
    var err = new Error("Missing algorithm parameter for jws.verify");
    err.code = "MISSING_ALGORITHM";
    throw err;
  }
  jwsSig = toString(jwsSig);
  var signature = signatureFromJWS(jwsSig);
  var securedInput = securedInputFromJWS(jwsSig);
  var algo = jwa(algorithm);
  return algo.verify(securedInput, signature, secretOrKey);
}

function jwsDecode(jwsSig, opts) {
  opts = opts || {};
  jwsSig = toString(jwsSig);

  if (!isValidJws(jwsSig))
    return null;

  var header = headerFromJWS(jwsSig);

  if (!header)
    return null;

  var payload = payloadFromJWS(jwsSig);
  if (header.typ === 'JWT' || opts.json)
    payload = JSON.parse(payload, opts.encoding);

  return {
    header: header,
    payload: payload,
    signature: signatureFromJWS(jwsSig)
  };
}

function VerifyStream(opts) {
  opts = opts || {};
  var secretOrKey = opts.secret||opts.publicKey||opts.key;
  var secretStream = new DataStream(secretOrKey);
  this.readable = true;
  this.algorithm = opts.algorithm;
  this.encoding = opts.encoding;
  this.secret = this.publicKey = this.key = secretStream;
  this.signature = new DataStream(opts.signature);
  this.secret.once('close', function () {
    if (!this.signature.writable && this.readable)
      this.verify();
  }.bind(this));

  this.signature.once('close', function () {
    if (!this.secret.writable && this.readable)
      this.verify();
  }.bind(this));
}
util.inherits(VerifyStream, Stream);
VerifyStream.prototype.verify = function verify() {
  try {
    var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
    var obj = jwsDecode(this.signature.buffer, this.encoding);
    this.emit('done', valid, obj);
    this.emit('data', valid);
    this.emit('end');
    this.readable = false;
    return valid;
  } catch (e) {
    this.readable = false;
    this.emit('error', e);
    this.emit('close');
  }
};

VerifyStream.decode = jwsDecode;
VerifyStream.isValid = isValidJws;
VerifyStream.verify = jwsVerify;

module.exports = VerifyStream;


/***/ }),

/***/ 7602:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $Command: () => (/* reexport */ BatchExecuteStatementCommand/* $Command */.g),
  ApproximateCreationDateTimePrecision: () => (/* reexport */ models_0/* ApproximateCreationDateTimePrecision */.Ps),
  AttributeAction: () => (/* reexport */ models_0/* AttributeAction */.V4),
  AttributeValue: () => (/* reexport */ models_0/* AttributeValue */.eK),
  BackupInUseException: () => (/* reexport */ models_0/* BackupInUseException */.Y5),
  BackupNotFoundException: () => (/* reexport */ models_0/* BackupNotFoundException */.p4),
  BackupStatus: () => (/* reexport */ models_0/* BackupStatus */.tC),
  BackupType: () => (/* reexport */ models_0/* BackupType */.dB),
  BackupTypeFilter: () => (/* reexport */ models_0/* BackupTypeFilter */.vv),
  BatchExecuteStatementCommand: () => (/* reexport */ BatchExecuteStatementCommand/* BatchExecuteStatementCommand */.e),
  BatchGetItemCommand: () => (/* reexport */ BatchGetItemCommand/* BatchGetItemCommand */.X),
  BatchStatementErrorCodeEnum: () => (/* reexport */ models_0/* BatchStatementErrorCodeEnum */.Y_),
  BatchWriteItemCommand: () => (/* reexport */ BatchWriteItemCommand/* BatchWriteItemCommand */.S),
  BillingMode: () => (/* reexport */ models_0/* BillingMode */.Xc),
  ComparisonOperator: () => (/* reexport */ models_0/* ComparisonOperator */.mW),
  ConditionalCheckFailedException: () => (/* reexport */ models_0/* ConditionalCheckFailedException */.jP),
  ConditionalOperator: () => (/* reexport */ models_0/* ConditionalOperator */.D6),
  ContinuousBackupsStatus: () => (/* reexport */ models_0/* ContinuousBackupsStatus */.pL),
  ContinuousBackupsUnavailableException: () => (/* reexport */ models_0/* ContinuousBackupsUnavailableException */.k_),
  ContributorInsightsAction: () => (/* reexport */ models_0/* ContributorInsightsAction */.PL),
  ContributorInsightsMode: () => (/* reexport */ models_0/* ContributorInsightsMode */.OC),
  ContributorInsightsStatus: () => (/* reexport */ models_0/* ContributorInsightsStatus */.rd),
  CreateBackupCommand: () => (/* reexport */ CreateBackupCommand),
  CreateGlobalTableCommand: () => (/* reexport */ CreateGlobalTableCommand),
  CreateTableCommand: () => (/* reexport */ CreateTableCommand),
  DeleteBackupCommand: () => (/* reexport */ DeleteBackupCommand),
  DeleteItemCommand: () => (/* reexport */ DeleteItemCommand/* DeleteItemCommand */.P),
  DeleteResourcePolicyCommand: () => (/* reexport */ DeleteResourcePolicyCommand),
  DeleteTableCommand: () => (/* reexport */ DeleteTableCommand),
  DescribeBackupCommand: () => (/* reexport */ DescribeBackupCommand),
  DescribeContinuousBackupsCommand: () => (/* reexport */ DescribeContinuousBackupsCommand),
  DescribeContributorInsightsCommand: () => (/* reexport */ DescribeContributorInsightsCommand),
  DescribeEndpointsCommand: () => (/* reexport */ DescribeEndpointsCommand),
  DescribeExportCommand: () => (/* reexport */ DescribeExportCommand),
  DescribeGlobalTableCommand: () => (/* reexport */ DescribeGlobalTableCommand),
  DescribeGlobalTableSettingsCommand: () => (/* reexport */ DescribeGlobalTableSettingsCommand),
  DescribeImportCommand: () => (/* reexport */ DescribeImportCommand),
  DescribeKinesisStreamingDestinationCommand: () => (/* reexport */ DescribeKinesisStreamingDestinationCommand),
  DescribeLimitsCommand: () => (/* reexport */ DescribeLimitsCommand),
  DescribeTableCommand: () => (/* reexport */ DescribeTableCommand),
  DescribeTableReplicaAutoScalingCommand: () => (/* reexport */ DescribeTableReplicaAutoScalingCommand),
  DescribeTimeToLiveCommand: () => (/* reexport */ DescribeTimeToLiveCommand),
  DestinationStatus: () => (/* reexport */ models_0/* DestinationStatus */.$j),
  DisableKinesisStreamingDestinationCommand: () => (/* reexport */ DisableKinesisStreamingDestinationCommand),
  DuplicateItemException: () => (/* reexport */ models_0/* DuplicateItemException */.UU),
  DynamoDB: () => (/* reexport */ DynamoDB),
  DynamoDBClient: () => (/* reexport */ DynamoDBClient),
  DynamoDBServiceException: () => (/* reexport */ DynamoDBServiceException/* DynamoDBServiceException */.H),
  EnableKinesisStreamingDestinationCommand: () => (/* reexport */ EnableKinesisStreamingDestinationCommand),
  ExecuteStatementCommand: () => (/* reexport */ ExecuteStatementCommand/* ExecuteStatementCommand */.c),
  ExecuteTransactionCommand: () => (/* reexport */ ExecuteTransactionCommand/* ExecuteTransactionCommand */.P),
  ExportConflictException: () => (/* reexport */ models_0/* ExportConflictException */.TM),
  ExportFormat: () => (/* reexport */ models_0/* ExportFormat */.AV),
  ExportNotFoundException: () => (/* reexport */ models_0/* ExportNotFoundException */.v5),
  ExportStatus: () => (/* reexport */ models_0/* ExportStatus */.l2),
  ExportTableToPointInTimeCommand: () => (/* reexport */ ExportTableToPointInTimeCommand),
  ExportType: () => (/* reexport */ models_0/* ExportType */.vY),
  ExportViewType: () => (/* reexport */ models_0/* ExportViewType */.U_),
  GetItemCommand: () => (/* reexport */ GetItemCommand/* GetItemCommand */.Z),
  GetResourcePolicyCommand: () => (/* reexport */ GetResourcePolicyCommand),
  GlobalTableAlreadyExistsException: () => (/* reexport */ models_0/* GlobalTableAlreadyExistsException */.dV),
  GlobalTableNotFoundException: () => (/* reexport */ models_0/* GlobalTableNotFoundException */.Gz),
  GlobalTableStatus: () => (/* reexport */ models_0/* GlobalTableStatus */.SS),
  IdempotentParameterMismatchException: () => (/* reexport */ models_0/* IdempotentParameterMismatchException */.ah),
  ImportConflictException: () => (/* reexport */ models_0/* ImportConflictException */.nK),
  ImportNotFoundException: () => (/* reexport */ models_0/* ImportNotFoundException */.EV),
  ImportStatus: () => (/* reexport */ models_0/* ImportStatus */.yB),
  ImportTableCommand: () => (/* reexport */ ImportTableCommand),
  IndexNotFoundException: () => (/* reexport */ models_0/* IndexNotFoundException */.l8),
  IndexStatus: () => (/* reexport */ models_0/* IndexStatus */.$J),
  InputCompressionType: () => (/* reexport */ models_0/* InputCompressionType */.Tk),
  InputFormat: () => (/* reexport */ models_0/* InputFormat */.CW),
  InternalServerError: () => (/* reexport */ models_0/* InternalServerError */.PO),
  InvalidEndpointException: () => (/* reexport */ models_0/* InvalidEndpointException */.c2),
  InvalidExportTimeException: () => (/* reexport */ models_0/* InvalidExportTimeException */.Qf),
  InvalidRestoreTimeException: () => (/* reexport */ models_0/* InvalidRestoreTimeException */.wT),
  ItemCollectionSizeLimitExceededException: () => (/* reexport */ models_0/* ItemCollectionSizeLimitExceededException */.Ax),
  KeyType: () => (/* reexport */ models_0/* KeyType */._m),
  LimitExceededException: () => (/* reexport */ models_0/* LimitExceededException */.UC),
  ListBackupsCommand: () => (/* reexport */ ListBackupsCommand),
  ListContributorInsightsCommand: () => (/* reexport */ ListContributorInsightsCommand),
  ListExportsCommand: () => (/* reexport */ ListExportsCommand),
  ListGlobalTablesCommand: () => (/* reexport */ ListGlobalTablesCommand),
  ListImportsCommand: () => (/* reexport */ ListImportsCommand),
  ListTablesCommand: () => (/* reexport */ ListTablesCommand),
  ListTagsOfResourceCommand: () => (/* reexport */ ListTagsOfResourceCommand),
  MultiRegionConsistency: () => (/* reexport */ models_0/* MultiRegionConsistency */.kU),
  PointInTimeRecoveryStatus: () => (/* reexport */ models_0/* PointInTimeRecoveryStatus */.Tw),
  PointInTimeRecoveryUnavailableException: () => (/* reexport */ models_0/* PointInTimeRecoveryUnavailableException */.by),
  PolicyNotFoundException: () => (/* reexport */ models_0/* PolicyNotFoundException */.$F),
  ProjectionType: () => (/* reexport */ models_0/* ProjectionType */.Q9),
  ProvisionedThroughputExceededException: () => (/* reexport */ models_0/* ProvisionedThroughputExceededException */.FP),
  PutItemCommand: () => (/* reexport */ PutItemCommand/* PutItemCommand */.q),
  PutResourcePolicyCommand: () => (/* reexport */ PutResourcePolicyCommand),
  QueryCommand: () => (/* reexport */ QueryCommand/* QueryCommand */.s),
  ReplicaAlreadyExistsException: () => (/* reexport */ models_0/* ReplicaAlreadyExistsException */.KV),
  ReplicaNotFoundException: () => (/* reexport */ models_0/* ReplicaNotFoundException */.ZU),
  ReplicaStatus: () => (/* reexport */ models_0/* ReplicaStatus */.rJ),
  ReplicatedWriteConflictException: () => (/* reexport */ models_0/* ReplicatedWriteConflictException */.qF),
  RequestLimitExceeded: () => (/* reexport */ models_0/* RequestLimitExceeded */.kj),
  ResourceInUseException: () => (/* reexport */ models_0/* ResourceInUseException */.WT),
  ResourceNotFoundException: () => (/* reexport */ models_0/* ResourceNotFoundException */.lB),
  RestoreTableFromBackupCommand: () => (/* reexport */ RestoreTableFromBackupCommand),
  RestoreTableToPointInTimeCommand: () => (/* reexport */ RestoreTableToPointInTimeCommand),
  ReturnConsumedCapacity: () => (/* reexport */ models_0/* ReturnConsumedCapacity */.fB),
  ReturnItemCollectionMetrics: () => (/* reexport */ models_0/* ReturnItemCollectionMetrics */.xo),
  ReturnValue: () => (/* reexport */ models_0/* ReturnValue */.q6),
  ReturnValuesOnConditionCheckFailure: () => (/* reexport */ models_0/* ReturnValuesOnConditionCheckFailure */.Nr),
  S3SseAlgorithm: () => (/* reexport */ models_0/* S3SseAlgorithm */.zF),
  SSEStatus: () => (/* reexport */ models_0/* SSEStatus */.a2),
  SSEType: () => (/* reexport */ models_0/* SSEType */.Eu),
  ScalarAttributeType: () => (/* reexport */ models_0/* ScalarAttributeType */.dh),
  ScanCommand: () => (/* reexport */ ScanCommand/* ScanCommand */.Z),
  Select: () => (/* reexport */ models_0/* Select */.l6),
  StreamViewType: () => (/* reexport */ models_0/* StreamViewType */.Mx),
  TableAlreadyExistsException: () => (/* reexport */ models_0/* TableAlreadyExistsException */.kI),
  TableClass: () => (/* reexport */ models_0/* TableClass */.R0),
  TableInUseException: () => (/* reexport */ models_0/* TableInUseException */.Ir),
  TableNotFoundException: () => (/* reexport */ models_0/* TableNotFoundException */.b9),
  TableStatus: () => (/* reexport */ models_0/* TableStatus */.FQ),
  TagResourceCommand: () => (/* reexport */ TagResourceCommand),
  ThrottlingException: () => (/* reexport */ models_0/* ThrottlingException */.x5),
  TimeToLiveStatus: () => (/* reexport */ models_0/* TimeToLiveStatus */.DP),
  TransactGetItemsCommand: () => (/* reexport */ TransactGetItemsCommand/* TransactGetItemsCommand */.S),
  TransactWriteItemsCommand: () => (/* reexport */ TransactWriteItemsCommand/* TransactWriteItemsCommand */.D),
  TransactionCanceledException: () => (/* reexport */ models_0/* TransactionCanceledException */.$Z),
  TransactionConflictException: () => (/* reexport */ models_0/* TransactionConflictException */.sQ),
  TransactionInProgressException: () => (/* reexport */ models_0/* TransactionInProgressException */.Er),
  UntagResourceCommand: () => (/* reexport */ UntagResourceCommand),
  UpdateContinuousBackupsCommand: () => (/* reexport */ UpdateContinuousBackupsCommand),
  UpdateContributorInsightsCommand: () => (/* reexport */ UpdateContributorInsightsCommand),
  UpdateGlobalTableCommand: () => (/* reexport */ UpdateGlobalTableCommand),
  UpdateGlobalTableSettingsCommand: () => (/* reexport */ UpdateGlobalTableSettingsCommand),
  UpdateItemCommand: () => (/* reexport */ UpdateItemCommand/* UpdateItemCommand */.C),
  UpdateKinesisStreamingDestinationCommand: () => (/* reexport */ UpdateKinesisStreamingDestinationCommand),
  UpdateTableCommand: () => (/* reexport */ UpdateTableCommand),
  UpdateTableReplicaAutoScalingCommand: () => (/* reexport */ UpdateTableReplicaAutoScalingCommand),
  UpdateTimeToLiveCommand: () => (/* reexport */ UpdateTimeToLiveCommand),
  WitnessStatus: () => (/* reexport */ models_0/* WitnessStatus */.Ae),
  __Client: () => (/* reexport */ smithy_client_dist_es/* Client */.Kj),
  paginateListContributorInsights: () => (/* reexport */ paginateListContributorInsights),
  paginateListExports: () => (/* reexport */ paginateListExports),
  paginateListImports: () => (/* reexport */ paginateListImports),
  paginateListTables: () => (/* reexport */ paginateListTables),
  paginateQuery: () => (/* reexport */ paginateQuery),
  paginateScan: () => (/* reexport */ paginateScan),
  waitForTableExists: () => (/* reexport */ waitForTableExists),
  waitForTableNotExists: () => (/* reexport */ waitForTableNotExists),
  waitUntilTableExists: () => (/* reexport */ waitUntilTableExists),
  waitUntilTableNotExists: () => (/* reexport */ waitUntilTableNotExists)
});

// EXTERNAL MODULE: ./node_modules/@smithy/util-middleware/dist-es/index.js + 2 modules
var dist_es = __webpack_require__(7135);
;// ./node_modules/@aws-sdk/core/dist-es/submodules/account-id-endpoint/AccountIdEndpointModeConstants.js
const DEFAULT_ACCOUNT_ID_ENDPOINT_MODE = "preferred";
const ACCOUNT_ID_ENDPOINT_MODE_VALUES = ["disabled", "preferred", "required"];
function validateAccountIdEndpointMode(value) {
    return ACCOUNT_ID_ENDPOINT_MODE_VALUES.includes(value);
}

;// ./node_modules/@aws-sdk/core/dist-es/submodules/account-id-endpoint/AccountIdEndpointModeConfigResolver.js


const resolveAccountIdEndpointModeConfig = (input) => {
    const { accountIdEndpointMode } = input;
    const accountIdEndpointModeProvider = (0,dist_es/* normalizeProvider */.t)(accountIdEndpointMode ?? DEFAULT_ACCOUNT_ID_ENDPOINT_MODE);
    return Object.assign(input, {
        accountIdEndpointMode: async () => {
            const accIdMode = await accountIdEndpointModeProvider();
            if (!validateAccountIdEndpointMode(accIdMode)) {
                throw new Error(`Invalid value for accountIdEndpointMode: ${accIdMode}. Valid values are: "required", "preferred", "disabled".`);
            }
            return accIdMode;
        },
    });
};

;// ./node_modules/@aws-sdk/middleware-endpoint-discovery/dist-es/configurations.js
const ENV_ENDPOINT_DISCOVERY = ["AWS_ENABLE_ENDPOINT_DISCOVERY", "AWS_ENDPOINT_DISCOVERY_ENABLED"];
const CONFIG_ENDPOINT_DISCOVERY = "endpoint_discovery_enabled";
const isFalsy = (value) => ["false", "0"].indexOf(value) >= 0;
const NODE_ENDPOINT_DISCOVERY_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => {
        for (let i = 0; i < ENV_ENDPOINT_DISCOVERY.length; i++) {
            const envKey = ENV_ENDPOINT_DISCOVERY[i];
            if (envKey in env) {
                const value = env[envKey];
                if (value === "") {
                    throw Error(`Environment variable ${envKey} can't be empty of undefined, got "${value}"`);
                }
                return !isFalsy(value);
            }
        }
    },
    configFileSelector: (profile) => {
        if (CONFIG_ENDPOINT_DISCOVERY in profile) {
            const value = profile[CONFIG_ENDPOINT_DISCOVERY];
            if (value === undefined) {
                throw Error(`Shared config entry ${CONFIG_ENDPOINT_DISCOVERY} can't be undefined, got "${value}"`);
            }
            return !isFalsy(value);
        }
    },
    default: undefined,
};

// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var protocol_http_dist_es = __webpack_require__(5479);
;// ./node_modules/@aws-sdk/middleware-endpoint-discovery/dist-es/updateDiscoveredEndpointInCache.js
const requestQueue = {};
const updateDiscoveredEndpointInCache_updateDiscoveredEndpointInCache = async (config, options) => new Promise((resolve, reject) => {
    const { endpointCache } = config;
    const { cacheKey, commandName, identifiers } = options;
    const endpoints = endpointCache.get(cacheKey);
    if (endpoints && endpoints.length === 1 && endpoints[0].Address === "") {
        if (options.isDiscoveredEndpointRequired) {
            if (!requestQueue[cacheKey])
                requestQueue[cacheKey] = [];
            requestQueue[cacheKey].push({ resolve, reject });
        }
        else {
            resolve();
        }
    }
    else if (endpoints && endpoints.length > 0) {
        resolve();
    }
    else {
        const placeholderEndpoints = [{ Address: "", CachePeriodInMinutes: 1 }];
        endpointCache.set(cacheKey, placeholderEndpoints);
        const command = new options.endpointDiscoveryCommandCtor({
            Operation: commandName.slice(0, -7),
            Identifiers: identifiers,
        });
        const handler = command.resolveMiddleware(options.clientStack, config, options.options);
        handler(command)
            .then((result) => {
            endpointCache.set(cacheKey, result.output.Endpoints);
            if (requestQueue[cacheKey]) {
                requestQueue[cacheKey].forEach(({ resolve }) => {
                    resolve();
                });
                delete requestQueue[cacheKey];
            }
            resolve();
        })
            .catch((error) => {
            endpointCache.delete(cacheKey);
            const errorToThrow = Object.assign(new Error(`The operation to discover endpoint failed.` +
                ` Please retry, or provide a custom endpoint and disable endpoint discovery to proceed.`), { reason: error });
            if (requestQueue[cacheKey]) {
                requestQueue[cacheKey].forEach(({ reject }) => {
                    reject(errorToThrow);
                });
                delete requestQueue[cacheKey];
            }
            if (options.isDiscoveredEndpointRequired) {
                reject(errorToThrow);
            }
            else {
                endpointCache.set(cacheKey, placeholderEndpoints);
                resolve();
            }
        });
    }
});

;// ./node_modules/@aws-sdk/middleware-endpoint-discovery/dist-es/endpointDiscoveryMiddleware.js



const endpointDiscoveryMiddleware_endpointDiscoveryMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
    if (config.isCustomEndpoint) {
        if (config.isClientEndpointDiscoveryEnabled) {
            throw new Error(`Custom endpoint is supplied; endpointDiscoveryEnabled must not be true.`);
        }
        return next(args);
    }
    const { endpointDiscoveryCommandCtor } = config;
    const { isDiscoveredEndpointRequired, identifiers } = middlewareConfig;
    const clientName = context.clientName;
    const commandName = context.commandName;
    const isEndpointDiscoveryEnabled = await config.endpointDiscoveryEnabled();
    const cacheKey = await getCacheKey(commandName, config, { identifiers });
    if (isDiscoveredEndpointRequired) {
        if (isEndpointDiscoveryEnabled === false) {
            throw new Error(`Endpoint Discovery is disabled but ${commandName} on ${clientName} requires it.` +
                ` Please check your configurations.`);
        }
        await updateDiscoveredEndpointInCache(config, {
            ...middlewareConfig,
            commandName,
            cacheKey,
            endpointDiscoveryCommandCtor,
        });
    }
    else if (isEndpointDiscoveryEnabled) {
        updateDiscoveredEndpointInCache(config, {
            ...middlewareConfig,
            commandName,
            cacheKey,
            endpointDiscoveryCommandCtor,
        });
    }
    const { request } = args;
    if (cacheKey && HttpRequest.isInstance(request)) {
        const endpoint = config.endpointCache.getEndpoint(cacheKey);
        if (endpoint) {
            request.hostname = endpoint;
        }
    }
    return next(args);
};

;// ./node_modules/@aws-sdk/middleware-endpoint-discovery/dist-es/getEndpointDiscoveryPlugin.js

const endpointDiscoveryMiddlewareOptions = {
    name: "endpointDiscoveryMiddleware",
    step: "build",
    tags: ["ENDPOINT_DISCOVERY"],
    override: true,
};
const getEndpointDiscoveryPlugin = (pluginConfig, middlewareConfig) => ({
    applyToStack: (commandStack) => {
        commandStack.add(endpointDiscoveryMiddleware(pluginConfig, middlewareConfig), endpointDiscoveryMiddlewareOptions);
    },
});
const getEndpointDiscoveryRequiredPlugin = (pluginConfig, middlewareConfig) => ({
    applyToStack: (commandStack) => {
        commandStack.add(endpointDiscoveryMiddleware(pluginConfig, { ...middlewareConfig, isDiscoveredEndpointRequired: true }), endpointDiscoveryMiddlewareOptions);
    },
});
const getEndpointDiscoveryOptionalPlugin = (pluginConfig, middlewareConfig) => ({
    applyToStack: (commandStack) => {
        commandStack.add(endpointDiscoveryMiddleware(pluginConfig, { ...middlewareConfig, isDiscoveredEndpointRequired: false }), endpointDiscoveryMiddlewareOptions);
    },
});

// EXTERNAL MODULE: ./node_modules/mnemonist/lru-cache.js
var lru_cache = __webpack_require__(1429);
var lru_cache_default = /*#__PURE__*/__webpack_require__.n(lru_cache);
;// ./node_modules/@aws-sdk/endpoint-cache/dist-es/EndpointCache.js

class EndpointCache {
    cache;
    constructor(capacity) {
        this.cache = new (lru_cache_default())(capacity);
    }
    getEndpoint(key) {
        const endpointsWithExpiry = this.get(key);
        if (!endpointsWithExpiry || endpointsWithExpiry.length === 0) {
            return undefined;
        }
        const endpoints = endpointsWithExpiry.map((endpoint) => endpoint.Address);
        return endpoints[Math.floor(Math.random() * endpoints.length)];
    }
    get(key) {
        if (!this.has(key)) {
            return;
        }
        const value = this.cache.get(key);
        if (!value) {
            return;
        }
        const now = Date.now();
        const endpointsWithExpiry = value.filter((endpoint) => now < endpoint.Expires);
        if (endpointsWithExpiry.length === 0) {
            this.delete(key);
            return undefined;
        }
        return endpointsWithExpiry;
    }
    set(key, endpoints) {
        const now = Date.now();
        this.cache.set(key, endpoints.map(({ Address, CachePeriodInMinutes }) => ({
            Address,
            Expires: now + CachePeriodInMinutes * 60 * 1000,
        })));
    }
    delete(key) {
        this.cache.set(key, []);
    }
    has(key) {
        if (!this.cache.has(key)) {
            return false;
        }
        const endpoints = this.cache.peek(key);
        if (!endpoints) {
            return false;
        }
        return endpoints.length > 0;
    }
    clear() {
        this.cache.clear();
    }
}

;// ./node_modules/@aws-sdk/endpoint-cache/dist-es/index.js



;// ./node_modules/@aws-sdk/middleware-endpoint-discovery/dist-es/resolveEndpointDiscoveryConfig.js

const resolveEndpointDiscoveryConfig = (input, { endpointDiscoveryCommandCtor }) => {
    const { endpointCacheSize, endpointDiscoveryEnabled, endpointDiscoveryEnabledProvider } = input;
    return Object.assign(input, {
        endpointDiscoveryCommandCtor,
        endpointCache: new EndpointCache(endpointCacheSize ?? 1000),
        endpointDiscoveryEnabled: endpointDiscoveryEnabled !== undefined
            ? () => Promise.resolve(endpointDiscoveryEnabled)
            : endpointDiscoveryEnabledProvider,
        isClientEndpointDiscoveryEnabled: endpointDiscoveryEnabled !== undefined,
    });
};

;// ./node_modules/@aws-sdk/middleware-endpoint-discovery/dist-es/index.js




// EXTERNAL MODULE: ./node_modules/@aws-sdk/middleware-host-header/dist-es/index.js
var middleware_host_header_dist_es = __webpack_require__(1095);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/middleware-logger/dist-es/index.js + 1 modules
var middleware_logger_dist_es = __webpack_require__(9359);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/middleware-recursion-detection/dist-es/index.js
var middleware_recursion_detection_dist_es = __webpack_require__(8377);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js + 5 modules
var middleware_user_agent_dist_es = __webpack_require__(6827);
// EXTERNAL MODULE: ./node_modules/@smithy/config-resolver/dist-es/index.js + 13 modules
var config_resolver_dist_es = __webpack_require__(1487);
// EXTERNAL MODULE: ./node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js + 2 modules
var getHttpAuthSchemeEndpointRuleSetPlugin = __webpack_require__(2404);
// EXTERNAL MODULE: ./node_modules/@smithy/core/dist-es/util-identity-and-auth/DefaultIdentityProviderConfig.js
var DefaultIdentityProviderConfig = __webpack_require__(612);
// EXTERNAL MODULE: ./node_modules/@smithy/core/dist-es/middleware-http-signing/getHttpSigningMiddleware.js + 1 modules
var getHttpSigningMiddleware = __webpack_require__(5172);
// EXTERNAL MODULE: ./node_modules/@smithy/middleware-content-length/dist-es/index.js
var middleware_content_length_dist_es = __webpack_require__(649);
// EXTERNAL MODULE: ./node_modules/@smithy/middleware-endpoint/dist-es/index.js + 11 modules
var middleware_endpoint_dist_es = __webpack_require__(7234);
// EXTERNAL MODULE: ./node_modules/@smithy/middleware-retry/dist-es/index.js + 10 modules
var middleware_retry_dist_es = __webpack_require__(3594);
// EXTERNAL MODULE: ./node_modules/@smithy/smithy-client/dist-es/index.js + 26 modules
var smithy_client_dist_es = __webpack_require__(4820);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js + 15 modules
var resolveAwsSdkSigV4Config = __webpack_require__(4283);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/auth/httpAuthSchemeProvider.js


const defaultDynamoDBHttpAuthSchemeParametersProvider = async (config, context, input) => {
    return {
        operation: (0,dist_es/* getSmithyContext */.u)(context).operation,
        region: (await (0,dist_es/* normalizeProvider */.t)(config.region)()) ||
            (() => {
                throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
            })(),
    };
};
function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
            name: "dynamodb",
            region: authParameters.region,
        },
        propertiesExtractor: (config, context) => ({
            signingProperties: {
                config,
                context,
            },
        }),
    };
}
const defaultDynamoDBHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
        default: {
            options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
        }
    }
    return options;
};
const resolveHttpAuthSchemeConfig = (config) => {
    const config_0 = (0,resolveAwsSdkSigV4Config/* resolveAwsSdkSigV4Config */.h)(config);
    return Object.assign(config_0, {
        authSchemePreference: (0,dist_es/* normalizeProvider */.t)(config.authSchemePreference ?? []),
    });
};

// EXTERNAL MODULE: ./node_modules/@smithy/middleware-serde/dist-es/index.js + 3 modules
var middleware_serde_dist_es = __webpack_require__(1208);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/endpoint/EndpointParameters.js
var EndpointParameters = __webpack_require__(7051);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/protocols/Aws_json1_0.js + 1 modules
var Aws_json1_0 = __webpack_require__(8579);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeEndpointsCommand.js






class DescribeEndpointsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep(EndpointParameters/* commonParams */.S)
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeEndpoints", {})
    .n("DynamoDBClient", "DescribeEndpointsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeEndpointsCommand */.QL)
    .de(Aws_json1_0/* de_DescribeEndpointsCommand */.pC)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/package.json
const package_namespaceObject = {"rE":"3.872.0"};
// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/client/emitWarningIfUnsupportedVersion.js
var emitWarningIfUnsupportedVersion = __webpack_require__(5122);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js + 2 modules
var NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = __webpack_require__(4472);
;// ./node_modules/@aws-sdk/core/dist-es/submodules/account-id-endpoint/NodeAccountIdEndpointModeConfigOptions.js

const err = "Invalid AccountIdEndpointMode value";
const _throw = (message) => {
    throw new Error(message);
};
const ENV_ACCOUNT_ID_ENDPOINT_MODE = "AWS_ACCOUNT_ID_ENDPOINT_MODE";
const CONFIG_ACCOUNT_ID_ENDPOINT_MODE = "account_id_endpoint_mode";
const NODE_ACCOUNT_ID_ENDPOINT_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => {
        const value = env[ENV_ACCOUNT_ID_ENDPOINT_MODE];
        if (value && !validateAccountIdEndpointMode(value)) {
            _throw(err);
        }
        return value;
    },
    configFileSelector: (profile) => {
        const value = profile[CONFIG_ACCOUNT_ID_ENDPOINT_MODE];
        if (value && !validateAccountIdEndpointMode(value)) {
            _throw(err);
        }
        return value;
    },
    default: DEFAULT_ACCOUNT_ID_ENDPOINT_MODE,
};

// EXTERNAL MODULE: ./node_modules/@aws-sdk/credential-provider-env/dist-es/index.js + 1 modules
var credential_provider_env_dist_es = __webpack_require__(904);
// EXTERNAL MODULE: ./node_modules/@smithy/property-provider/dist-es/index.js + 6 modules
var property_provider_dist_es = __webpack_require__(8112);
// EXTERNAL MODULE: ./node_modules/@smithy/shared-ini-file-loader/dist-es/index.js + 15 modules
var shared_ini_file_loader_dist_es = __webpack_require__(2792);
;// ./node_modules/@aws-sdk/credential-provider-node/dist-es/remoteProvider.js

const ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
const remoteProvider = async (init) => {
    const { ENV_CMDS_FULL_URI, ENV_CMDS_RELATIVE_URI, fromContainerMetadata, fromInstanceMetadata } = await __webpack_require__.e(/* import() */ 897).then(__webpack_require__.bind(__webpack_require__, 7897));
    if (process.env[ENV_CMDS_RELATIVE_URI] || process.env[ENV_CMDS_FULL_URI]) {
        init.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");
        const { fromHttp } = await __webpack_require__.e(/* import() */ 610).then(__webpack_require__.bind(__webpack_require__, 3610));
        return (0,property_provider_dist_es/* chain */.cy)(fromHttp(init), fromContainerMetadata(init));
    }
    if (process.env[ENV_IMDS_DISABLED] && process.env[ENV_IMDS_DISABLED] !== "false") {
        return async () => {
            throw new property_provider_dist_es/* CredentialsProviderError */.C1("EC2 Instance Metadata Service access disabled", { logger: init.logger });
        };
    }
    init.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata");
    return fromInstanceMetadata(init);
};

;// ./node_modules/@aws-sdk/credential-provider-node/dist-es/defaultProvider.js




let multipleCredentialSourceWarningEmitted = false;
const defaultProvider = (init = {}) => (0,property_provider_dist_es/* memoize */.Bj)((0,property_provider_dist_es/* chain */.cy)(async () => {
    const profile = init.profile ?? process.env[shared_ini_file_loader_dist_es/* ENV_PROFILE */.Ch];
    if (profile) {
        const envStaticCredentialsAreSet = process.env[credential_provider_env_dist_es/* ENV_KEY */.yG] && process.env[credential_provider_env_dist_es/* ENV_SECRET */.pi];
        if (envStaticCredentialsAreSet) {
            if (!multipleCredentialSourceWarningEmitted) {
                const warnFn = init.logger?.warn && init.logger?.constructor?.name !== "NoOpLogger" ? init.logger.warn : console.warn;
                warnFn(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`);
                multipleCredentialSourceWarningEmitted = true;
            }
        }
        throw new property_provider_dist_es/* CredentialsProviderError */.C1("AWS_PROFILE is set, skipping fromEnv provider.", {
            logger: init.logger,
            tryNextLink: true,
        });
    }
    init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv");
    return (0,credential_provider_env_dist_es.fromEnv)(init)();
}, async () => {
    init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");
    const { ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoSession } = init;
    if (!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName && !ssoSession) {
        throw new property_provider_dist_es/* CredentialsProviderError */.C1("Skipping SSO provider in default chain (inputs do not include SSO fields).", { logger: init.logger });
    }
    const { fromSSO } = await __webpack_require__.e(/* import() */ 791).then(__webpack_require__.bind(__webpack_require__, 9791));
    return fromSSO(init)();
}, async () => {
    init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");
    const { fromIni } = await __webpack_require__.e(/* import() */ 789).then(__webpack_require__.bind(__webpack_require__, 2789));
    return fromIni(init)();
}, async () => {
    init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");
    const { fromProcess } = await __webpack_require__.e(/* import() */ 109).then(__webpack_require__.bind(__webpack_require__, 5109));
    return fromProcess(init)();
}, async () => {
    init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");
    const { fromTokenFile } = await __webpack_require__.e(/* import() */ 819).then(__webpack_require__.bind(__webpack_require__, 7819));
    return fromTokenFile(init)();
}, async () => {
    init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider");
    return (await remoteProvider(init))();
}, async () => {
    throw new property_provider_dist_es/* CredentialsProviderError */.C1("Could not load credentials from any providers", {
        tryNextLink: false,
        logger: init.logger,
    });
}), credentialsTreatedAsExpired, credentialsWillNeedRefresh);
const credentialsWillNeedRefresh = (credentials) => credentials?.expiration !== undefined;
const credentialsTreatedAsExpired = (credentials) => credentials?.expiration !== undefined && credentials.expiration.getTime() - Date.now() < 300000;

;// ./node_modules/@aws-sdk/credential-provider-node/dist-es/index.js


// EXTERNAL MODULE: ./node_modules/@aws-sdk/util-user-agent-node/dist-es/index.js + 5 modules
var util_user_agent_node_dist_es = __webpack_require__(3410);
// EXTERNAL MODULE: ./node_modules/@smithy/hash-node/dist-es/index.js
var hash_node_dist_es = __webpack_require__(1701);
// EXTERNAL MODULE: ./node_modules/@smithy/node-config-provider/dist-es/index.js + 5 modules
var node_config_provider_dist_es = __webpack_require__(9987);
// EXTERNAL MODULE: ./node_modules/@smithy/node-http-handler/dist-es/index.js + 16 modules
var node_http_handler_dist_es = __webpack_require__(3621);
// EXTERNAL MODULE: ./node_modules/@smithy/util-body-length-node/dist-es/index.js + 1 modules
var util_body_length_node_dist_es = __webpack_require__(7809);
// EXTERNAL MODULE: ./node_modules/@smithy/util-retry/dist-es/index.js + 8 modules
var util_retry_dist_es = __webpack_require__(3323);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js + 4 modules
var AwsSdkSigV4Signer = __webpack_require__(6228);
// EXTERNAL MODULE: ./node_modules/@smithy/url-parser/dist-es/index.js + 1 modules
var url_parser_dist_es = __webpack_require__(2641);
// EXTERNAL MODULE: ./node_modules/@smithy/util-base64/dist-es/index.js + 2 modules
var util_base64_dist_es = __webpack_require__(4572);
// EXTERNAL MODULE: ./node_modules/@smithy/util-utf8/dist-es/index.js + 3 modules
var util_utf8_dist_es = __webpack_require__(3197);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/util-endpoints/dist-es/index.js + 15 modules
var util_endpoints_dist_es = __webpack_require__(643);
// EXTERNAL MODULE: ./node_modules/@smithy/util-endpoints/dist-es/index.js + 35 modules
var _smithy_util_endpoints_dist_es = __webpack_require__(8545);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/endpoint/ruleset.js
const S = "required", T = "type", U = "fn", V = "argv", W = "ref", X = "properties", Y = "headers";
const a = false, b = "isSet", c = "error", d = "endpoint", e = "tree", f = "PartitionResult", g = "stringEquals", h = "dynamodb", i = "getAttr", j = "aws.parseArn", k = "ParsedArn", l = "isValidHostLabel", m = "FirstArn", n = { [S]: false, [T]: "String" }, o = { [S]: true, "default": false, [T]: "Boolean" }, p = { [U]: "booleanEquals", [V]: [{ [W]: "UseFIPS" }, true] }, q = { [U]: "booleanEquals", [V]: [{ [W]: "UseDualStack" }, true] }, r = {}, s = { [W]: "Region" }, t = { [U]: "booleanEquals", [V]: [{ [U]: i, [V]: [{ [W]: f }, "supportsFIPS"] }, true] }, u = { [U]: "booleanEquals", [V]: [{ [U]: i, [V]: [{ [W]: f }, "supportsDualStack"] }, true] }, v = { "conditions": [{ [U]: b, [V]: [{ [W]: "AccountIdEndpointMode" }] }, { [U]: g, [V]: [{ [W]: "AccountIdEndpointMode" }, "required"] }], "rules": [{ [c]: "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported", [T]: c }], [T]: e }, w = { [U]: b, [V]: [{ [W]: "AccountIdEndpointMode" }] }, x = { [c]: "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported", [T]: c }, y = { [U]: i, [V]: [{ [W]: f }, "name"] }, z = { [d]: { "url": "https://dynamodb.{Region}.{PartitionResult#dnsSuffix}", [X]: {}, [Y]: {} }, [T]: d }, A = { [U]: "not", [V]: [p] }, B = { [c]: "Invalid Configuration: AccountIdEndpointMode is required and DualStack is enabled, but DualStack account endpoints are not supported", [T]: c }, C = { [U]: "not", [V]: [{ [U]: g, [V]: [{ [W]: "AccountIdEndpointMode" }, "disabled"] }] }, D = { [U]: g, [V]: [y, "aws"] }, E = { [U]: "not", [V]: [q] }, F = { [U]: g, [V]: [{ [U]: i, [V]: [{ [W]: k }, "service"] }, h] }, G = { [U]: l, [V]: [{ [U]: i, [V]: [{ [W]: k }, "region"] }, false] }, H = { [U]: g, [V]: [{ [U]: i, [V]: [{ [W]: k }, "region"] }, "{Region}"] }, I = { [U]: l, [V]: [{ [U]: i, [V]: [{ [W]: k }, "accountId"] }, false] }, J = { "url": "https://{ParsedArn#accountId}.ddb.{Region}.{PartitionResult#dnsSuffix}", [X]: {}, [Y]: {} }, K = { [W]: "ResourceArnList" }, L = { [W]: "AccountId" }, M = [p], N = [q], O = [s], P = [w, { [U]: g, [V]: [{ [W]: "AccountIdEndpointMode" }, "required"] }], Q = [A], R = [{ [W]: "ResourceArn" }];
const _data = { version: "1.0", parameters: { Region: n, UseDualStack: o, UseFIPS: o, Endpoint: n, AccountId: n, AccountIdEndpointMode: n, ResourceArn: n, ResourceArnList: { [S]: a, [T]: "stringArray" } }, rules: [{ conditions: [{ [U]: b, [V]: [{ [W]: "Endpoint" }] }], rules: [{ conditions: M, error: "Invalid Configuration: FIPS and custom endpoint are not supported", [T]: c }, { conditions: N, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", [T]: c }, { endpoint: { url: "{Endpoint}", [X]: r, [Y]: r }, [T]: d }], [T]: e }, { conditions: [{ [U]: b, [V]: O }], rules: [{ conditions: [{ [U]: "aws.partition", [V]: O, assign: f }], rules: [{ conditions: [{ [U]: g, [V]: [s, "local"] }], rules: [{ conditions: M, error: "Invalid Configuration: FIPS and local endpoint are not supported", [T]: c }, { conditions: N, error: "Invalid Configuration: Dualstack and local endpoint are not supported", [T]: c }, { endpoint: { url: "http://localhost:8000", [X]: { authSchemes: [{ name: "sigv4", signingName: h, signingRegion: "us-east-1" }] }, [Y]: r }, [T]: d }], [T]: e }, { conditions: [p, q], rules: [{ conditions: [t, u], rules: [v, { endpoint: { url: "https://dynamodb-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", [X]: r, [Y]: r }, [T]: d }], [T]: e }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", [T]: c }], [T]: e }, { conditions: M, rules: [{ conditions: [t], rules: [{ conditions: [{ [U]: g, [V]: [y, "aws-us-gov"] }], rules: [v, z], [T]: e }, v, { endpoint: { url: "https://dynamodb-fips.{Region}.{PartitionResult#dnsSuffix}", [X]: r, [Y]: r }, [T]: d }], [T]: e }, { error: "FIPS is enabled but this partition does not support FIPS", [T]: c }], [T]: e }, { conditions: N, rules: [{ conditions: [u], rules: [{ conditions: P, rules: [{ conditions: Q, rules: [B], [T]: e }, x], [T]: e }, { endpoint: { url: "https://dynamodb.{Region}.{PartitionResult#dualStackDnsSuffix}", [X]: r, [Y]: r }, [T]: d }], [T]: e }, { error: "DualStack is enabled but this partition does not support DualStack", [T]: c }], [T]: e }, { conditions: [w, C, D, A, E, { [U]: b, [V]: R }, { [U]: j, [V]: R, assign: k }, F, G, H, I], endpoint: J, [T]: d }, { conditions: [w, C, D, A, E, { [U]: b, [V]: [K] }, { [U]: i, [V]: [K, "[0]"], assign: m }, { [U]: j, [V]: [{ [W]: m }], assign: k }, F, G, H, I], endpoint: J, [T]: d }, { conditions: [w, C, D, A, E, { [U]: b, [V]: [L] }], rules: [{ conditions: [{ [U]: l, [V]: [L, a] }], rules: [{ endpoint: { url: "https://{AccountId}.ddb.{Region}.{PartitionResult#dnsSuffix}", [X]: r, [Y]: r }, [T]: d }], [T]: e }, { error: "Credentials-sourced account ID parameter is invalid", [T]: c }], [T]: e }, { conditions: P, rules: [{ conditions: Q, rules: [{ conditions: [E], rules: [{ conditions: [D], rules: [{ error: "AccountIdEndpointMode is required but no AccountID was provided or able to be loaded", [T]: c }], [T]: e }, { error: "Invalid Configuration: AccountIdEndpointMode is required but account endpoints are not supported in this partition", [T]: c }], [T]: e }, B], [T]: e }, x], [T]: e }, z], [T]: e }], [T]: e }, { error: "Invalid Configuration: Missing Region", [T]: c }] };
const ruleSet = _data;

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/endpoint/endpointResolver.js



const cache = new _smithy_util_endpoints_dist_es/* EndpointCache */.kS({
    size: 50,
    params: [
        "AccountId",
        "AccountIdEndpointMode",
        "Endpoint",
        "Region",
        "ResourceArn",
        "ResourceArnList",
        "UseDualStack",
        "UseFIPS",
    ],
});
const defaultEndpointResolver = (endpointParams, context = {}) => {
    return cache.get(endpointParams, () => (0,_smithy_util_endpoints_dist_es/* resolveEndpoint */.sO)(ruleSet, {
        endpointParams: endpointParams,
        logger: context.logger,
    }));
};
_smithy_util_endpoints_dist_es/* customEndpointFunctions */.mw.aws = util_endpoints_dist_es/* awsEndpointFunctions */.UF;

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/runtimeConfig.shared.js







const getRuntimeConfig = (config) => {
    return {
        apiVersion: "2012-08-10",
        base64Decoder: config?.base64Decoder ?? util_base64_dist_es/* fromBase64 */.E,
        base64Encoder: config?.base64Encoder ?? util_base64_dist_es/* toBase64 */.n,
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultDynamoDBHttpAuthSchemeProvider,
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
                signer: new AwsSdkSigV4Signer/* AwsSdkSigV4Signer */.f2(),
            },
        ],
        logger: config?.logger ?? new smithy_client_dist_es/* NoOpLogger */.N4(),
        serviceId: config?.serviceId ?? "DynamoDB",
        urlParser: config?.urlParser ?? url_parser_dist_es/* parseUrl */.D,
        utf8Decoder: config?.utf8Decoder ?? util_utf8_dist_es/* fromUtf8 */.ar,
        utf8Encoder: config?.utf8Encoder ?? util_utf8_dist_es/* toUtf8 */.Pq,
    };
};

// EXTERNAL MODULE: ./node_modules/@smithy/util-defaults-mode-node/dist-es/index.js + 3 modules
var util_defaults_mode_node_dist_es = __webpack_require__(4321);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/runtimeConfig.js

















const runtimeConfig_getRuntimeConfig = (config) => {
    (0,smithy_client_dist_es/* emitWarningIfUnsupportedVersion */.I9)(process.version);
    const defaultsMode = (0,util_defaults_mode_node_dist_es/* resolveDefaultsModeConfig */.I)(config);
    const defaultConfigProvider = () => defaultsMode().then(smithy_client_dist_es/* loadConfigsForDefaultMode */.lT);
    const clientSharedValues = getRuntimeConfig(config);
    (0,emitWarningIfUnsupportedVersion/* emitWarningIfUnsupportedVersion */.I)(process.version);
    const loaderConfig = {
        profile: config?.profile,
        logger: clientSharedValues.logger,
    };
    return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        defaultsMode,
        accountIdEndpointMode: config?.accountIdEndpointMode ?? (0,node_config_provider_dist_es/* loadConfig */.Z)(NODE_ACCOUNT_ID_ENDPOINT_MODE_CONFIG_OPTIONS, loaderConfig),
        authSchemePreference: config?.authSchemePreference ?? (0,node_config_provider_dist_es/* loadConfig */.Z)(NODE_AUTH_SCHEME_PREFERENCE_OPTIONS/* NODE_AUTH_SCHEME_PREFERENCE_OPTIONS */.$, loaderConfig),
        bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_dist_es/* calculateBodyLength */.n,
        credentialDefaultProvider: config?.credentialDefaultProvider ?? defaultProvider,
        defaultUserAgentProvider: config?.defaultUserAgentProvider ??
            (0,util_user_agent_node_dist_es/* createDefaultUserAgentProvider */.pf)({ serviceId: clientSharedValues.serviceId, clientVersion: package_namespaceObject.rE }),
        endpointDiscoveryEnabledProvider: config?.endpointDiscoveryEnabledProvider ?? (0,node_config_provider_dist_es/* loadConfig */.Z)(NODE_ENDPOINT_DISCOVERY_CONFIG_OPTIONS, loaderConfig),
        maxAttempts: config?.maxAttempts ?? (0,node_config_provider_dist_es/* loadConfig */.Z)(middleware_retry_dist_es/* NODE_MAX_ATTEMPT_CONFIG_OPTIONS */.qs, config),
        region: config?.region ??
            (0,node_config_provider_dist_es/* loadConfig */.Z)(config_resolver_dist_es/* NODE_REGION_CONFIG_OPTIONS */.GG, { ...config_resolver_dist_es/* NODE_REGION_CONFIG_FILE_OPTIONS */.zH, ...loaderConfig }),
        requestHandler: node_http_handler_dist_es/* NodeHttpHandler */.$c.create(config?.requestHandler ?? defaultConfigProvider),
        retryMode: config?.retryMode ??
            (0,node_config_provider_dist_es/* loadConfig */.Z)({
                ...middleware_retry_dist_es/* NODE_RETRY_MODE_CONFIG_OPTIONS */.kN,
                default: async () => (await defaultConfigProvider()).retryMode || util_retry_dist_es/* DEFAULT_RETRY_MODE */.L0,
            }, config),
        sha256: config?.sha256 ?? hash_node_dist_es/* Hash */.V.bind(null, "sha256"),
        streamCollector: config?.streamCollector ?? node_http_handler_dist_es/* streamCollector */.kv,
        useDualstackEndpoint: config?.useDualstackEndpoint ?? (0,node_config_provider_dist_es/* loadConfig */.Z)(config_resolver_dist_es/* NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS */.e$, loaderConfig),
        useFipsEndpoint: config?.useFipsEndpoint ?? (0,node_config_provider_dist_es/* loadConfig */.Z)(config_resolver_dist_es/* NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS */.Ko, loaderConfig),
        userAgentAppId: config?.userAgentAppId ?? (0,node_config_provider_dist_es/* loadConfig */.Z)(util_user_agent_node_dist_es/* NODE_APP_ID_CONFIG_OPTIONS */.hV, loaderConfig),
    };
};

// EXTERNAL MODULE: ./node_modules/@aws-sdk/region-config-resolver/dist-es/index.js + 3 modules
var region_config_resolver_dist_es = __webpack_require__(6928);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/auth/httpAuthExtensionConfiguration.js
const getHttpAuthExtensionConfiguration = (runtimeConfig) => {
    const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
    let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
    let _credentials = runtimeConfig.credentials;
    return {
        setHttpAuthScheme(httpAuthScheme) {
            const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
            if (index === -1) {
                _httpAuthSchemes.push(httpAuthScheme);
            }
            else {
                _httpAuthSchemes.splice(index, 1, httpAuthScheme);
            }
        },
        httpAuthSchemes() {
            return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
            _httpAuthSchemeProvider = httpAuthSchemeProvider;
        },
        httpAuthSchemeProvider() {
            return _httpAuthSchemeProvider;
        },
        setCredentials(credentials) {
            _credentials = credentials;
        },
        credentials() {
            return _credentials;
        },
    };
};
const resolveHttpAuthRuntimeConfig = (config) => {
    return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials(),
    };
};

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/runtimeExtensions.js




const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
    const extensionConfiguration = Object.assign((0,region_config_resolver_dist_es/* getAwsRegionExtensionConfiguration */.Rq)(runtimeConfig), (0,smithy_client_dist_es/* getDefaultExtensionConfiguration */.xA)(runtimeConfig), (0,protocol_http_dist_es/* getHttpHandlerExtensionConfiguration */.eS)(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0,region_config_resolver_dist_es/* resolveAwsRegionExtensionConfiguration */.$3)(extensionConfiguration), (0,smithy_client_dist_es/* resolveDefaultRuntimeConfig */.uv)(extensionConfiguration), (0,protocol_http_dist_es/* resolveHttpHandlerRuntimeConfig */.jt)(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/DynamoDBClient.js


















class DynamoDBClient extends smithy_client_dist_es/* Client */.Kj {
    config;
    constructor(...[configuration]) {
        const _config_0 = runtimeConfig_getRuntimeConfig(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = (0,EndpointParameters/* resolveClientEndpointParameters */.v)(_config_0);
        const _config_2 = resolveAccountIdEndpointModeConfig(_config_1);
        const _config_3 = (0,middleware_user_agent_dist_es/* resolveUserAgentConfig */.Dc)(_config_2);
        const _config_4 = (0,middleware_retry_dist_es/* resolveRetryConfig */.$z)(_config_3);
        const _config_5 = (0,config_resolver_dist_es/* resolveRegionConfig */.TD)(_config_4);
        const _config_6 = (0,middleware_host_header_dist_es/* resolveHostHeaderConfig */.OV)(_config_5);
        const _config_7 = (0,middleware_endpoint_dist_es/* resolveEndpointConfig */.Co)(_config_6);
        const _config_8 = resolveHttpAuthSchemeConfig(_config_7);
        const _config_9 = resolveEndpointDiscoveryConfig(_config_8, {
            endpointDiscoveryCommandCtor: DescribeEndpointsCommand,
        });
        const _config_10 = resolveRuntimeExtensions(_config_9, configuration?.extensions || []);
        this.config = _config_10;
        this.middlewareStack.use((0,middleware_user_agent_dist_es/* getUserAgentPlugin */.sM)(this.config));
        this.middlewareStack.use((0,middleware_retry_dist_es/* getRetryPlugin */.ey)(this.config));
        this.middlewareStack.use((0,middleware_content_length_dist_es/* getContentLengthPlugin */.vK)(this.config));
        this.middlewareStack.use((0,middleware_host_header_dist_es/* getHostHeaderPlugin */.TC)(this.config));
        this.middlewareStack.use((0,middleware_logger_dist_es/* getLoggerPlugin */.Y7)(this.config));
        this.middlewareStack.use((0,middleware_recursion_detection_dist_es/* getRecursionDetectionPlugin */.n4)(this.config));
        this.middlewareStack.use((0,getHttpAuthSchemeEndpointRuleSetPlugin/* getHttpAuthSchemeEndpointRuleSetPlugin */.w)(this.config, {
            httpAuthSchemeParametersProvider: defaultDynamoDBHttpAuthSchemeParametersProvider,
            identityProviderConfigProvider: async (config) => new DefaultIdentityProviderConfig/* DefaultIdentityProviderConfig */.h({
                "aws.auth#sigv4": config.credentials,
            }),
        }));
        this.middlewareStack.use((0,getHttpSigningMiddleware/* getHttpSigningPlugin */.l)(this.config));
    }
    destroy() {
        super.destroy();
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/BatchExecuteStatementCommand.js
var BatchExecuteStatementCommand = __webpack_require__(7210);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/BatchGetItemCommand.js
var BatchGetItemCommand = __webpack_require__(9051);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/BatchWriteItemCommand.js
var BatchWriteItemCommand = __webpack_require__(8822);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/CreateBackupCommand.js






class CreateBackupCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "CreateBackup", {})
    .n("DynamoDBClient", "CreateBackupCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_CreateBackupCommand */.fN)
    .de(Aws_json1_0/* de_CreateBackupCommand */.Eu)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/CreateGlobalTableCommand.js






class CreateGlobalTableCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "GlobalTableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "CreateGlobalTable", {})
    .n("DynamoDBClient", "CreateGlobalTableCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_CreateGlobalTableCommand */.a_)
    .de(Aws_json1_0/* de_CreateGlobalTableCommand */.V_)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/CreateTableCommand.js






class CreateTableCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "CreateTable", {})
    .n("DynamoDBClient", "CreateTableCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_CreateTableCommand */.jM)
    .de(Aws_json1_0/* de_CreateTableCommand */.a3)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DeleteBackupCommand.js






class DeleteBackupCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "BackupArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DeleteBackup", {})
    .n("DynamoDBClient", "DeleteBackupCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DeleteBackupCommand */.ox)
    .de(Aws_json1_0/* de_DeleteBackupCommand */.VJ)
    .build() {
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DeleteItemCommand.js
var DeleteItemCommand = __webpack_require__(7610);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DeleteResourcePolicyCommand.js






class DeleteResourcePolicyCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "ResourceArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DeleteResourcePolicy", {})
    .n("DynamoDBClient", "DeleteResourcePolicyCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DeleteResourcePolicyCommand */.mE)
    .de(Aws_json1_0/* de_DeleteResourcePolicyCommand */.dH)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DeleteTableCommand.js






class DeleteTableCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DeleteTable", {})
    .n("DynamoDBClient", "DeleteTableCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DeleteTableCommand */.q)
    .de(Aws_json1_0/* de_DeleteTableCommand */.HJ)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeBackupCommand.js






class DescribeBackupCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "BackupArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeBackup", {})
    .n("DynamoDBClient", "DescribeBackupCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeBackupCommand */.ge)
    .de(Aws_json1_0/* de_DescribeBackupCommand */.FG)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeContinuousBackupsCommand.js






class DescribeContinuousBackupsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeContinuousBackups", {})
    .n("DynamoDBClient", "DescribeContinuousBackupsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeContinuousBackupsCommand */.ii)
    .de(Aws_json1_0/* de_DescribeContinuousBackupsCommand */.Fy)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeContributorInsightsCommand.js






class DescribeContributorInsightsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeContributorInsights", {})
    .n("DynamoDBClient", "DescribeContributorInsightsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeContributorInsightsCommand */.Y0)
    .de(Aws_json1_0/* de_DescribeContributorInsightsCommand */.$)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeExportCommand.js






class DescribeExportCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "ExportArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeExport", {})
    .n("DynamoDBClient", "DescribeExportCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeExportCommand */.WP)
    .de(Aws_json1_0/* de_DescribeExportCommand */.Xl)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeGlobalTableCommand.js






class DescribeGlobalTableCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "GlobalTableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeGlobalTable", {})
    .n("DynamoDBClient", "DescribeGlobalTableCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeGlobalTableCommand */.E3)
    .de(Aws_json1_0/* de_DescribeGlobalTableCommand */.Q$)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeGlobalTableSettingsCommand.js






class DescribeGlobalTableSettingsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "GlobalTableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeGlobalTableSettings", {})
    .n("DynamoDBClient", "DescribeGlobalTableSettingsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeGlobalTableSettingsCommand */.IQ)
    .de(Aws_json1_0/* de_DescribeGlobalTableSettingsCommand */.tr)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeImportCommand.js






class DescribeImportCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "ImportArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeImport", {})
    .n("DynamoDBClient", "DescribeImportCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeImportCommand */.Zt)
    .de(Aws_json1_0/* de_DescribeImportCommand */.AZ)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeKinesisStreamingDestinationCommand.js






class DescribeKinesisStreamingDestinationCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeKinesisStreamingDestination", {})
    .n("DynamoDBClient", "DescribeKinesisStreamingDestinationCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeKinesisStreamingDestinationCommand */.Az)
    .de(Aws_json1_0/* de_DescribeKinesisStreamingDestinationCommand */.PL)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeLimitsCommand.js






class DescribeLimitsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep(EndpointParameters/* commonParams */.S)
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeLimits", {})
    .n("DynamoDBClient", "DescribeLimitsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeLimitsCommand */.Ed)
    .de(Aws_json1_0/* de_DescribeLimitsCommand */.pT)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeTableCommand.js






class DescribeTableCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeTable", {})
    .n("DynamoDBClient", "DescribeTableCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeTableCommand */.sG)
    .de(Aws_json1_0/* de_DescribeTableCommand */.XA)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeTableReplicaAutoScalingCommand.js






class DescribeTableReplicaAutoScalingCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeTableReplicaAutoScaling", {})
    .n("DynamoDBClient", "DescribeTableReplicaAutoScalingCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeTableReplicaAutoScalingCommand */.kM)
    .de(Aws_json1_0/* de_DescribeTableReplicaAutoScalingCommand */.js)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DescribeTimeToLiveCommand.js






class DescribeTimeToLiveCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DescribeTimeToLive", {})
    .n("DynamoDBClient", "DescribeTimeToLiveCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DescribeTimeToLiveCommand */.sO)
    .de(Aws_json1_0/* de_DescribeTimeToLiveCommand */.Fe)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/DisableKinesisStreamingDestinationCommand.js






class DisableKinesisStreamingDestinationCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DisableKinesisStreamingDestination", {})
    .n("DynamoDBClient", "DisableKinesisStreamingDestinationCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_DisableKinesisStreamingDestinationCommand */.bl)
    .de(Aws_json1_0/* de_DisableKinesisStreamingDestinationCommand */.EI)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/EnableKinesisStreamingDestinationCommand.js






class EnableKinesisStreamingDestinationCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "EnableKinesisStreamingDestination", {})
    .n("DynamoDBClient", "EnableKinesisStreamingDestinationCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_EnableKinesisStreamingDestinationCommand */.IY)
    .de(Aws_json1_0/* de_EnableKinesisStreamingDestinationCommand */.oY)
    .build() {
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ExecuteStatementCommand.js
var ExecuteStatementCommand = __webpack_require__(7042);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ExecuteTransactionCommand.js
var ExecuteTransactionCommand = __webpack_require__(3325);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ExportTableToPointInTimeCommand.js






class ExportTableToPointInTimeCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "ExportTableToPointInTime", {})
    .n("DynamoDBClient", "ExportTableToPointInTimeCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_ExportTableToPointInTimeCommand */._)
    .de(Aws_json1_0/* de_ExportTableToPointInTimeCommand */.jS)
    .build() {
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/GetItemCommand.js
var GetItemCommand = __webpack_require__(931);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/GetResourcePolicyCommand.js






class GetResourcePolicyCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "ResourceArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "GetResourcePolicy", {})
    .n("DynamoDBClient", "GetResourcePolicyCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_GetResourcePolicyCommand */.bX)
    .de(Aws_json1_0/* de_GetResourcePolicyCommand */.sb)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ImportTableCommand.js






class ImportTableCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "operationContextParams", get: (input) => input?.TableCreationParameters?.TableName },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "ImportTable", {})
    .n("DynamoDBClient", "ImportTableCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_ImportTableCommand */.gG)
    .de(Aws_json1_0/* de_ImportTableCommand */.nU)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ListBackupsCommand.js






class ListBackupsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "ListBackups", {})
    .n("DynamoDBClient", "ListBackupsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_ListBackupsCommand */.GL)
    .de(Aws_json1_0/* de_ListBackupsCommand */.dr)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ListContributorInsightsCommand.js






class ListContributorInsightsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "ListContributorInsights", {})
    .n("DynamoDBClient", "ListContributorInsightsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_ListContributorInsightsCommand */.zc)
    .de(Aws_json1_0/* de_ListContributorInsightsCommand */.K9)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ListExportsCommand.js






class ListExportsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "ListExports", {})
    .n("DynamoDBClient", "ListExportsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_ListExportsCommand */.id)
    .de(Aws_json1_0/* de_ListExportsCommand */.fs)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ListGlobalTablesCommand.js






class ListGlobalTablesCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep(EndpointParameters/* commonParams */.S)
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "ListGlobalTables", {})
    .n("DynamoDBClient", "ListGlobalTablesCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_ListGlobalTablesCommand */.FS)
    .de(Aws_json1_0/* de_ListGlobalTablesCommand */.cK)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ListImportsCommand.js






class ListImportsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "ListImports", {})
    .n("DynamoDBClient", "ListImportsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_ListImportsCommand */.xS)
    .de(Aws_json1_0/* de_ListImportsCommand */.a6)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ListTablesCommand.js






class ListTablesCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep(EndpointParameters/* commonParams */.S)
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "ListTables", {})
    .n("DynamoDBClient", "ListTablesCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_ListTablesCommand */.SG)
    .de(Aws_json1_0/* de_ListTablesCommand */.ZB)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ListTagsOfResourceCommand.js






class ListTagsOfResourceCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "ResourceArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "ListTagsOfResource", {})
    .n("DynamoDBClient", "ListTagsOfResourceCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_ListTagsOfResourceCommand */.Nz)
    .de(Aws_json1_0/* de_ListTagsOfResourceCommand */.cB)
    .build() {
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/PutItemCommand.js
var PutItemCommand = __webpack_require__(1908);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/PutResourcePolicyCommand.js






class PutResourcePolicyCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "ResourceArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "PutResourcePolicy", {})
    .n("DynamoDBClient", "PutResourcePolicyCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_PutResourcePolicyCommand */.ci)
    .de(Aws_json1_0/* de_PutResourcePolicyCommand */.Rj)
    .build() {
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/QueryCommand.js
var QueryCommand = __webpack_require__(1570);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/RestoreTableFromBackupCommand.js






class RestoreTableFromBackupCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TargetTableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "RestoreTableFromBackup", {})
    .n("DynamoDBClient", "RestoreTableFromBackupCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_RestoreTableFromBackupCommand */.Jx)
    .de(Aws_json1_0/* de_RestoreTableFromBackupCommand */.e2)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/RestoreTableToPointInTimeCommand.js






class RestoreTableToPointInTimeCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TargetTableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "RestoreTableToPointInTime", {})
    .n("DynamoDBClient", "RestoreTableToPointInTimeCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_RestoreTableToPointInTimeCommand */.q6)
    .de(Aws_json1_0/* de_RestoreTableToPointInTimeCommand */.rx)
    .build() {
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/ScanCommand.js
var ScanCommand = __webpack_require__(4517);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/TagResourceCommand.js






class TagResourceCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "ResourceArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "TagResource", {})
    .n("DynamoDBClient", "TagResourceCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_TagResourceCommand */.xf)
    .de(Aws_json1_0/* de_TagResourceCommand */.gm)
    .build() {
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/TransactGetItemsCommand.js
var TransactGetItemsCommand = __webpack_require__(7648);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/TransactWriteItemsCommand.js
var TransactWriteItemsCommand = __webpack_require__(1691);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/UntagResourceCommand.js






class UntagResourceCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "ResourceArn" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "UntagResource", {})
    .n("DynamoDBClient", "UntagResourceCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_UntagResourceCommand */.i_)
    .de(Aws_json1_0/* de_UntagResourceCommand */.Hn)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/UpdateContinuousBackupsCommand.js






class UpdateContinuousBackupsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "UpdateContinuousBackups", {})
    .n("DynamoDBClient", "UpdateContinuousBackupsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_UpdateContinuousBackupsCommand */.qK)
    .de(Aws_json1_0/* de_UpdateContinuousBackupsCommand */.lG)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/UpdateContributorInsightsCommand.js






class UpdateContributorInsightsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "UpdateContributorInsights", {})
    .n("DynamoDBClient", "UpdateContributorInsightsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_UpdateContributorInsightsCommand */.go)
    .de(Aws_json1_0/* de_UpdateContributorInsightsCommand */.v2)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/UpdateGlobalTableCommand.js






class UpdateGlobalTableCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "GlobalTableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "UpdateGlobalTable", {})
    .n("DynamoDBClient", "UpdateGlobalTableCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_UpdateGlobalTableCommand */.Vs)
    .de(Aws_json1_0/* de_UpdateGlobalTableCommand */.uU)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/UpdateGlobalTableSettingsCommand.js






class UpdateGlobalTableSettingsCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "GlobalTableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "UpdateGlobalTableSettings", {})
    .n("DynamoDBClient", "UpdateGlobalTableSettingsCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_UpdateGlobalTableSettingsCommand */.wK)
    .de(Aws_json1_0/* de_UpdateGlobalTableSettingsCommand */.r_)
    .build() {
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/UpdateItemCommand.js
var UpdateItemCommand = __webpack_require__(2692);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/UpdateKinesisStreamingDestinationCommand.js






class UpdateKinesisStreamingDestinationCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "UpdateKinesisStreamingDestination", {})
    .n("DynamoDBClient", "UpdateKinesisStreamingDestinationCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_UpdateKinesisStreamingDestinationCommand */.AX)
    .de(Aws_json1_0/* de_UpdateKinesisStreamingDestinationCommand */.LD)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/UpdateTableCommand.js






class UpdateTableCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "UpdateTable", {})
    .n("DynamoDBClient", "UpdateTableCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_UpdateTableCommand */.ih)
    .de(Aws_json1_0/* de_UpdateTableCommand */.xh)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/UpdateTableReplicaAutoScalingCommand.js






class UpdateTableReplicaAutoScalingCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "UpdateTableReplicaAutoScaling", {})
    .n("DynamoDBClient", "UpdateTableReplicaAutoScalingCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_UpdateTableReplicaAutoScalingCommand */.ml)
    .de(Aws_json1_0/* de_UpdateTableReplicaAutoScalingCommand */.He)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/UpdateTimeToLiveCommand.js






class UpdateTimeToLiveCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep({
    ...EndpointParameters/* commonParams */.S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "UpdateTimeToLive", {})
    .n("DynamoDBClient", "UpdateTimeToLiveCommand")
    .f(void 0, void 0)
    .ser(Aws_json1_0/* se_UpdateTimeToLiveCommand */.QC)
    .de(Aws_json1_0/* de_UpdateTimeToLiveCommand */.hw)
    .build() {
}

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/DynamoDB.js



























































const commands = {
    BatchExecuteStatementCommand: BatchExecuteStatementCommand/* BatchExecuteStatementCommand */.e,
    BatchGetItemCommand: BatchGetItemCommand/* BatchGetItemCommand */.X,
    BatchWriteItemCommand: BatchWriteItemCommand/* BatchWriteItemCommand */.S,
    CreateBackupCommand: CreateBackupCommand,
    CreateGlobalTableCommand: CreateGlobalTableCommand,
    CreateTableCommand: CreateTableCommand,
    DeleteBackupCommand: DeleteBackupCommand,
    DeleteItemCommand: DeleteItemCommand/* DeleteItemCommand */.P,
    DeleteResourcePolicyCommand: DeleteResourcePolicyCommand,
    DeleteTableCommand: DeleteTableCommand,
    DescribeBackupCommand: DescribeBackupCommand,
    DescribeContinuousBackupsCommand: DescribeContinuousBackupsCommand,
    DescribeContributorInsightsCommand: DescribeContributorInsightsCommand,
    DescribeEndpointsCommand: DescribeEndpointsCommand,
    DescribeExportCommand: DescribeExportCommand,
    DescribeGlobalTableCommand: DescribeGlobalTableCommand,
    DescribeGlobalTableSettingsCommand: DescribeGlobalTableSettingsCommand,
    DescribeImportCommand: DescribeImportCommand,
    DescribeKinesisStreamingDestinationCommand: DescribeKinesisStreamingDestinationCommand,
    DescribeLimitsCommand: DescribeLimitsCommand,
    DescribeTableCommand: DescribeTableCommand,
    DescribeTableReplicaAutoScalingCommand: DescribeTableReplicaAutoScalingCommand,
    DescribeTimeToLiveCommand: DescribeTimeToLiveCommand,
    DisableKinesisStreamingDestinationCommand: DisableKinesisStreamingDestinationCommand,
    EnableKinesisStreamingDestinationCommand: EnableKinesisStreamingDestinationCommand,
    ExecuteStatementCommand: ExecuteStatementCommand/* ExecuteStatementCommand */.c,
    ExecuteTransactionCommand: ExecuteTransactionCommand/* ExecuteTransactionCommand */.P,
    ExportTableToPointInTimeCommand: ExportTableToPointInTimeCommand,
    GetItemCommand: GetItemCommand/* GetItemCommand */.Z,
    GetResourcePolicyCommand: GetResourcePolicyCommand,
    ImportTableCommand: ImportTableCommand,
    ListBackupsCommand: ListBackupsCommand,
    ListContributorInsightsCommand: ListContributorInsightsCommand,
    ListExportsCommand: ListExportsCommand,
    ListGlobalTablesCommand: ListGlobalTablesCommand,
    ListImportsCommand: ListImportsCommand,
    ListTablesCommand: ListTablesCommand,
    ListTagsOfResourceCommand: ListTagsOfResourceCommand,
    PutItemCommand: PutItemCommand/* PutItemCommand */.q,
    PutResourcePolicyCommand: PutResourcePolicyCommand,
    QueryCommand: QueryCommand/* QueryCommand */.s,
    RestoreTableFromBackupCommand: RestoreTableFromBackupCommand,
    RestoreTableToPointInTimeCommand: RestoreTableToPointInTimeCommand,
    ScanCommand: ScanCommand/* ScanCommand */.Z,
    TagResourceCommand: TagResourceCommand,
    TransactGetItemsCommand: TransactGetItemsCommand/* TransactGetItemsCommand */.S,
    TransactWriteItemsCommand: TransactWriteItemsCommand/* TransactWriteItemsCommand */.D,
    UntagResourceCommand: UntagResourceCommand,
    UpdateContinuousBackupsCommand: UpdateContinuousBackupsCommand,
    UpdateContributorInsightsCommand: UpdateContributorInsightsCommand,
    UpdateGlobalTableCommand: UpdateGlobalTableCommand,
    UpdateGlobalTableSettingsCommand: UpdateGlobalTableSettingsCommand,
    UpdateItemCommand: UpdateItemCommand/* UpdateItemCommand */.C,
    UpdateKinesisStreamingDestinationCommand: UpdateKinesisStreamingDestinationCommand,
    UpdateTableCommand: UpdateTableCommand,
    UpdateTableReplicaAutoScalingCommand: UpdateTableReplicaAutoScalingCommand,
    UpdateTimeToLiveCommand: UpdateTimeToLiveCommand,
};
class DynamoDB extends DynamoDBClient {
}
(0,smithy_client_dist_es/* createAggregatedClient */.J1)(commands, DynamoDB);

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/commands/index.js


























































// EXTERNAL MODULE: ./node_modules/@smithy/core/dist-es/pagination/createPaginator.js
var createPaginator = __webpack_require__(2809);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/pagination/ListContributorInsightsPaginator.js



const paginateListContributorInsights = (0,createPaginator/* createPaginator */.K)(DynamoDBClient, ListContributorInsightsCommand, "NextToken", "NextToken", "MaxResults");

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/pagination/ListExportsPaginator.js



const paginateListExports = (0,createPaginator/* createPaginator */.K)(DynamoDBClient, ListExportsCommand, "NextToken", "NextToken", "MaxResults");

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/pagination/ListImportsPaginator.js



const paginateListImports = (0,createPaginator/* createPaginator */.K)(DynamoDBClient, ListImportsCommand, "NextToken", "NextToken", "PageSize");

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/pagination/ListTablesPaginator.js



const paginateListTables = (0,createPaginator/* createPaginator */.K)(DynamoDBClient, ListTablesCommand, "ExclusiveStartTableName", "LastEvaluatedTableName", "Limit");

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/pagination/QueryPaginator.js



const paginateQuery = (0,createPaginator/* createPaginator */.K)(DynamoDBClient, QueryCommand/* QueryCommand */.s, "ExclusiveStartKey", "LastEvaluatedKey", "Limit");

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/pagination/ScanPaginator.js



const paginateScan = (0,createPaginator/* createPaginator */.K)(DynamoDBClient, ScanCommand/* ScanCommand */.Z, "ExclusiveStartKey", "LastEvaluatedKey", "Limit");

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/pagination/index.js








;// ./node_modules/@smithy/util-waiter/dist-es/utils/sleep.js
const sleep = (seconds) => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

;// ./node_modules/@smithy/util-waiter/dist-es/waiter.js
const waiterServiceDefaults = {
    minDelay: 2,
    maxDelay: 120,
};
var WaiterState;
(function (WaiterState) {
    WaiterState["ABORTED"] = "ABORTED";
    WaiterState["FAILURE"] = "FAILURE";
    WaiterState["SUCCESS"] = "SUCCESS";
    WaiterState["RETRY"] = "RETRY";
    WaiterState["TIMEOUT"] = "TIMEOUT";
})(WaiterState || (WaiterState = {}));
const checkExceptions = (result) => {
    if (result.state === WaiterState.ABORTED) {
        const abortError = new Error(`${JSON.stringify({
            ...result,
            reason: "Request was aborted",
        })}`);
        abortError.name = "AbortError";
        throw abortError;
    }
    else if (result.state === WaiterState.TIMEOUT) {
        const timeoutError = new Error(`${JSON.stringify({
            ...result,
            reason: "Waiter has timed out",
        })}`);
        timeoutError.name = "TimeoutError";
        throw timeoutError;
    }
    else if (result.state !== WaiterState.SUCCESS) {
        throw new Error(`${JSON.stringify(result)}`);
    }
    return result;
};

;// ./node_modules/@smithy/util-waiter/dist-es/poller.js


const exponentialBackoffWithJitter = (minDelay, maxDelay, attemptCeiling, attempt) => {
    if (attempt > attemptCeiling)
        return maxDelay;
    const delay = minDelay * 2 ** (attempt - 1);
    return randomInRange(minDelay, delay);
};
const randomInRange = (min, max) => min + Math.random() * (max - min);
const runPolling = async ({ minDelay, maxDelay, maxWaitTime, abortController, client, abortSignal }, input, acceptorChecks) => {
    const observedResponses = {};
    const { state, reason } = await acceptorChecks(client, input);
    if (reason) {
        const message = createMessageFromResponse(reason);
        observedResponses[message] |= 0;
        observedResponses[message] += 1;
    }
    if (state !== WaiterState.RETRY) {
        return { state, reason, observedResponses };
    }
    let currentAttempt = 1;
    const waitUntil = Date.now() + maxWaitTime * 1000;
    const attemptCeiling = Math.log(maxDelay / minDelay) / Math.log(2) + 1;
    while (true) {
        if (abortController?.signal?.aborted || abortSignal?.aborted) {
            const message = "AbortController signal aborted.";
            observedResponses[message] |= 0;
            observedResponses[message] += 1;
            return { state: WaiterState.ABORTED, observedResponses };
        }
        const delay = exponentialBackoffWithJitter(minDelay, maxDelay, attemptCeiling, currentAttempt);
        if (Date.now() + delay * 1000 > waitUntil) {
            return { state: WaiterState.TIMEOUT, observedResponses };
        }
        await sleep(delay);
        const { state, reason } = await acceptorChecks(client, input);
        if (reason) {
            const message = createMessageFromResponse(reason);
            observedResponses[message] |= 0;
            observedResponses[message] += 1;
        }
        if (state !== WaiterState.RETRY) {
            return { state, reason, observedResponses };
        }
        currentAttempt += 1;
    }
};
const createMessageFromResponse = (reason) => {
    if (reason?.$responseBodyText) {
        return `Deserialization error for body: ${reason.$responseBodyText}`;
    }
    if (reason?.$metadata?.httpStatusCode) {
        if (reason.$response || reason.message) {
            return `${reason.$response.statusCode ?? reason.$metadata.httpStatusCode ?? "Unknown"}: ${reason.message}`;
        }
        return `${reason.$metadata.httpStatusCode}: OK`;
    }
    return String(reason?.message ?? JSON.stringify(reason) ?? "Unknown");
};

;// ./node_modules/@smithy/util-waiter/dist-es/utils/validate.js
const validateWaiterOptions = (options) => {
    if (options.maxWaitTime <= 0) {
        throw new Error(`WaiterConfiguration.maxWaitTime must be greater than 0`);
    }
    else if (options.minDelay <= 0) {
        throw new Error(`WaiterConfiguration.minDelay must be greater than 0`);
    }
    else if (options.maxDelay <= 0) {
        throw new Error(`WaiterConfiguration.maxDelay must be greater than 0`);
    }
    else if (options.maxWaitTime <= options.minDelay) {
        throw new Error(`WaiterConfiguration.maxWaitTime [${options.maxWaitTime}] must be greater than WaiterConfiguration.minDelay [${options.minDelay}] for this waiter`);
    }
    else if (options.maxDelay < options.minDelay) {
        throw new Error(`WaiterConfiguration.maxDelay [${options.maxDelay}] must be greater than WaiterConfiguration.minDelay [${options.minDelay}] for this waiter`);
    }
};

;// ./node_modules/@smithy/util-waiter/dist-es/createWaiter.js



const abortTimeout = (abortSignal) => {
    let onAbort;
    const promise = new Promise((resolve) => {
        onAbort = () => resolve({ state: WaiterState.ABORTED });
        if (typeof abortSignal.addEventListener === "function") {
            abortSignal.addEventListener("abort", onAbort);
        }
        else {
            abortSignal.onabort = onAbort;
        }
    });
    return {
        clearListener() {
            if (typeof abortSignal.removeEventListener === "function") {
                abortSignal.removeEventListener("abort", onAbort);
            }
        },
        aborted: promise,
    };
};
const createWaiter = async (options, input, acceptorChecks) => {
    const params = {
        ...waiterServiceDefaults,
        ...options,
    };
    validateWaiterOptions(params);
    const exitConditions = [runPolling(params, input, acceptorChecks)];
    const finalize = [];
    if (options.abortSignal) {
        const { aborted, clearListener } = abortTimeout(options.abortSignal);
        finalize.push(clearListener);
        exitConditions.push(aborted);
    }
    if (options.abortController?.signal) {
        const { aborted, clearListener } = abortTimeout(options.abortController.signal);
        finalize.push(clearListener);
        exitConditions.push(aborted);
    }
    return Promise.race(exitConditions).then((result) => {
        for (const fn of finalize) {
            fn();
        }
        return result;
    });
};

;// ./node_modules/@smithy/util-waiter/dist-es/index.js



;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/waiters/waitForTableExists.js


const checkState = async (client, input) => {
    let reason;
    try {
        const result = await client.send(new DescribeTableCommand(input));
        reason = result;
        try {
            const returnComparator = () => {
                return result.Table.TableStatus;
            };
            if (returnComparator() === "ACTIVE") {
                return { state: WaiterState.SUCCESS, reason };
            }
        }
        catch (e) { }
    }
    catch (exception) {
        reason = exception;
        if (exception.name && exception.name == "ResourceNotFoundException") {
            return { state: WaiterState.RETRY, reason };
        }
    }
    return { state: WaiterState.RETRY, reason };
};
const waitForTableExists = async (params, input) => {
    const serviceDefaults = { minDelay: 20, maxDelay: 120 };
    return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
const waitUntilTableExists = async (params, input) => {
    const serviceDefaults = { minDelay: 20, maxDelay: 120 };
    const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
    return checkExceptions(result);
};

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/waiters/waitForTableNotExists.js


const waitForTableNotExists_checkState = async (client, input) => {
    let reason;
    try {
        const result = await client.send(new DescribeTableCommand(input));
        reason = result;
    }
    catch (exception) {
        reason = exception;
        if (exception.name && exception.name == "ResourceNotFoundException") {
            return { state: WaiterState.SUCCESS, reason };
        }
    }
    return { state: WaiterState.RETRY, reason };
};
const waitForTableNotExists = async (params, input) => {
    const serviceDefaults = { minDelay: 20, maxDelay: 120 };
    return createWaiter({ ...serviceDefaults, ...params }, input, waitForTableNotExists_checkState);
};
const waitUntilTableNotExists = async (params, input) => {
    const serviceDefaults = { minDelay: 20, maxDelay: 120 };
    const result = await createWaiter({ ...serviceDefaults, ...params }, input, waitForTableNotExists_checkState);
    return checkExceptions(result);
};

;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/waiters/index.js



// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/models/models_0.js
var models_0 = __webpack_require__(8394);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/models/index.js



// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/models/DynamoDBServiceException.js
var DynamoDBServiceException = __webpack_require__(4007);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/index.js









/***/ }),

/***/ 7610:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ DeleteItemCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class DeleteItemCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S,
    ResourceArn: { type: "contextParams", name: "TableName" },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "DeleteItem", {})
    .n("DynamoDBClient", "DeleteItemCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_DeleteItemCommand */ .V$)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_DeleteItemCommand */ ._U)
    .build() {
}


/***/ }),

/***/ 7647:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   k: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8619);

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ 7648:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ TransactGetItemsCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class TransactGetItemsCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S,
    ResourceArnList: {
        type: "operationContextParams",
        get: (input) => input?.TransactItems?.map((obj) => obj?.Get?.TableName),
    },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "TransactGetItems", {})
    .n("DynamoDBClient", "TransactGetItemsCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_TransactGetItemsCommand */ .XL)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_TransactGetItemsCommand */ .GT)
    .build() {
}


/***/ }),

/***/ 7651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const timespan = __webpack_require__(855);
const PS_SUPPORTED = __webpack_require__(4977);
const validateAsymmetricKey = __webpack_require__(7019);
const jws = __webpack_require__(5747);
const includes = __webpack_require__(6111);
const isBoolean = __webpack_require__(7914);
const isInteger = __webpack_require__(8928);
const isNumber = __webpack_require__(3639);
const isPlainObject = __webpack_require__(9001);
const isString = __webpack_require__(5931);
const once = __webpack_require__(7083);
const { KeyObject, createSecretKey, createPrivateKey } = __webpack_require__(6982)

const SUPPORTED_ALGS = ['RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'HS256', 'HS384', 'HS512', 'none'];
if (PS_SUPPORTED) {
  SUPPORTED_ALGS.splice(3, 0, 'PS256', 'PS384', 'PS512');
}

const sign_options_schema = {
  expiresIn: { isValid: function(value) { return isInteger(value) || (isString(value) && value); }, message: '"expiresIn" should be a number of seconds or string representing a timespan' },
  notBefore: { isValid: function(value) { return isInteger(value) || (isString(value) && value); }, message: '"notBefore" should be a number of seconds or string representing a timespan' },
  audience: { isValid: function(value) { return isString(value) || Array.isArray(value); }, message: '"audience" must be a string or array' },
  algorithm: { isValid: includes.bind(null, SUPPORTED_ALGS), message: '"algorithm" must be a valid string enum value' },
  header: { isValid: isPlainObject, message: '"header" must be an object' },
  encoding: { isValid: isString, message: '"encoding" must be a string' },
  issuer: { isValid: isString, message: '"issuer" must be a string' },
  subject: { isValid: isString, message: '"subject" must be a string' },
  jwtid: { isValid: isString, message: '"jwtid" must be a string' },
  noTimestamp: { isValid: isBoolean, message: '"noTimestamp" must be a boolean' },
  keyid: { isValid: isString, message: '"keyid" must be a string' },
  mutatePayload: { isValid: isBoolean, message: '"mutatePayload" must be a boolean' },
  allowInsecureKeySizes: { isValid: isBoolean, message: '"allowInsecureKeySizes" must be a boolean'},
  allowInvalidAsymmetricKeyTypes: { isValid: isBoolean, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean'}
};

const registered_claims_schema = {
  iat: { isValid: isNumber, message: '"iat" should be a number of seconds' },
  exp: { isValid: isNumber, message: '"exp" should be a number of seconds' },
  nbf: { isValid: isNumber, message: '"nbf" should be a number of seconds' }
};

function validate(schema, allowUnknown, object, parameterName) {
  if (!isPlainObject(object)) {
    throw new Error('Expected "' + parameterName + '" to be a plain object.');
  }
  Object.keys(object)
    .forEach(function(key) {
      const validator = schema[key];
      if (!validator) {
        if (!allowUnknown) {
          throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
        }
        return;
      }
      if (!validator.isValid(object[key])) {
        throw new Error(validator.message);
      }
    });
}

function validateOptions(options) {
  return validate(sign_options_schema, false, options, 'options');
}

function validatePayload(payload) {
  return validate(registered_claims_schema, true, payload, 'payload');
}

const options_to_payload = {
  'audience': 'aud',
  'issuer': 'iss',
  'subject': 'sub',
  'jwtid': 'jti'
};

const options_for_objects = [
  'expiresIn',
  'notBefore',
  'noTimestamp',
  'audience',
  'issuer',
  'subject',
  'jwtid',
];

module.exports = function (payload, secretOrPrivateKey, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else {
    options = options || {};
  }

  const isObjectPayload = typeof payload === 'object' &&
                        !Buffer.isBuffer(payload);

  const header = Object.assign({
    alg: options.algorithm || 'HS256',
    typ: isObjectPayload ? 'JWT' : undefined,
    kid: options.keyid
  }, options.header);

  function failure(err) {
    if (callback) {
      return callback(err);
    }
    throw err;
  }

  if (!secretOrPrivateKey && options.algorithm !== 'none') {
    return failure(new Error('secretOrPrivateKey must have a value'));
  }

  if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
    try {
      secretOrPrivateKey = createPrivateKey(secretOrPrivateKey)
    } catch (_) {
      try {
        secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === 'string' ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey)
      } catch (_) {
        return failure(new Error('secretOrPrivateKey is not valid key material'));
      }
    }
  }

  if (header.alg.startsWith('HS') && secretOrPrivateKey.type !== 'secret') {
    return failure(new Error((`secretOrPrivateKey must be a symmetric key when using ${header.alg}`)))
  } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
    if (secretOrPrivateKey.type !== 'private') {
      return failure(new Error((`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`)))
    }
    if (!options.allowInsecureKeySizes &&
      !header.alg.startsWith('ES') &&
      secretOrPrivateKey.asymmetricKeyDetails !== undefined && //KeyObject.asymmetricKeyDetails is supported in Node 15+
      secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
      return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
    }
  }

  if (typeof payload === 'undefined') {
    return failure(new Error('payload is required'));
  } else if (isObjectPayload) {
    try {
      validatePayload(payload);
    }
    catch (error) {
      return failure(error);
    }
    if (!options.mutatePayload) {
      payload = Object.assign({},payload);
    }
  } else {
    const invalid_options = options_for_objects.filter(function (opt) {
      return typeof options[opt] !== 'undefined';
    });

    if (invalid_options.length > 0) {
      return failure(new Error('invalid ' + invalid_options.join(',') + ' option for ' + (typeof payload ) + ' payload'));
    }
  }

  if (typeof payload.exp !== 'undefined' && typeof options.expiresIn !== 'undefined') {
    return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
  }

  if (typeof payload.nbf !== 'undefined' && typeof options.notBefore !== 'undefined') {
    return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
  }

  try {
    validateOptions(options);
  }
  catch (error) {
    return failure(error);
  }

  if (!options.allowInvalidAsymmetricKeyTypes) {
    try {
      validateAsymmetricKey(header.alg, secretOrPrivateKey);
    } catch (error) {
      return failure(error);
    }
  }

  const timestamp = payload.iat || Math.floor(Date.now() / 1000);

  if (options.noTimestamp) {
    delete payload.iat;
  } else if (isObjectPayload) {
    payload.iat = timestamp;
  }

  if (typeof options.notBefore !== 'undefined') {
    try {
      payload.nbf = timespan(options.notBefore, timestamp);
    }
    catch (err) {
      return failure(err);
    }
    if (typeof payload.nbf === 'undefined') {
      return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
    }
  }

  if (typeof options.expiresIn !== 'undefined' && typeof payload === 'object') {
    try {
      payload.exp = timespan(options.expiresIn, timestamp);
    }
    catch (err) {
      return failure(err);
    }
    if (typeof payload.exp === 'undefined') {
      return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
    }
  }

  Object.keys(options_to_payload).forEach(function (key) {
    const claim = options_to_payload[key];
    if (typeof options[key] !== 'undefined') {
      if (typeof payload[claim] !== 'undefined') {
        return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
      }
      payload[claim] = options[key];
    }
  });

  const encoding = options.encoding || 'utf8';

  if (typeof callback === 'function') {
    callback = callback && once(callback);

    jws.createSign({
      header: header,
      privateKey: secretOrPrivateKey,
      payload: payload,
      encoding: encoding
    }).once('error', callback)
      .once('done', function (signature) {
        // TODO: Remove in favor of the modulus length check before signing once node 15+ is the minimum supported version
        if(!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
          return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`))
        }
        callback(null, signature);
      });
  } else {
    let signature = jws.sign({header: header, payload: payload, secret: secretOrPrivateKey, encoding: encoding});
    // TODO: Remove in favor of the modulus length check before signing once node 15+ is the minimum supported version
    if(!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
      throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`)
    }
    return signature
  }
};


/***/ }),

/***/ 7809:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  n: () => (/* reexport */ calculateBodyLength)
});

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(9896);
;// ./node_modules/@smithy/util-body-length-node/dist-es/calculateBodyLength.js

const calculateBodyLength = (body) => {
    if (!body) {
        return 0;
    }
    if (typeof body === "string") {
        return Buffer.byteLength(body);
    }
    else if (typeof body.byteLength === "number") {
        return body.byteLength;
    }
    else if (typeof body.size === "number") {
        return body.size;
    }
    else if (typeof body.start === "number" && typeof body.end === "number") {
        return body.end + 1 - body.start;
    }
    else if (typeof body.path === "string" || Buffer.isBuffer(body.path)) {
        return (0,external_fs_.lstatSync)(body.path).size;
    }
    else if (typeof body.fd === "number") {
        return (0,external_fs_.fstatSync)(body.fd).size;
    }
    throw new Error(`Body Length computation failed for ${body}`);
};

;// ./node_modules/@smithy/util-body-length-node/dist-es/index.js



/***/ }),

/***/ 7887:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)
const major = (a, loose) => new SemVer(a, loose).major
module.exports = major


/***/ }),

/***/ 7914:
/***/ ((module) => {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && objectToString.call(value) == boolTag);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isBoolean;


/***/ }),

/***/ 7916:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ extendedEncodeURIComponent)
/* harmony export */ });
function extendedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
}


/***/ }),

/***/ 8004:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ fromHex),
/* harmony export */   n: () => (/* binding */ toHex)
/* harmony export */ });
const SHORT_TO_HEX = {};
const HEX_TO_SHORT = {};
for (let i = 0; i < 256; i++) {
    let encodedByte = i.toString(16).toLowerCase();
    if (encodedByte.length === 1) {
        encodedByte = `0${encodedByte}`;
    }
    SHORT_TO_HEX[i] = encodedByte;
    HEX_TO_SHORT[encodedByte] = i;
}
function fromHex(encoded) {
    if (encoded.length % 2 !== 0) {
        throw new Error("Hex encoded strings must have an even number length");
    }
    const out = new Uint8Array(encoded.length / 2);
    for (let i = 0; i < encoded.length; i += 2) {
        const encodedByte = encoded.slice(i, i + 2).toLowerCase();
        if (encodedByte in HEX_TO_SHORT) {
            out[i / 2] = HEX_TO_SHORT[encodedByte];
        }
        else {
            throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
        }
    }
    return out;
}
function toHex(bytes) {
    let out = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        out += SHORT_TO_HEX[bytes[i]];
    }
    return out;
}


/***/ }),

/***/ 8080:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const compareBuild = __webpack_require__(4848)
const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose))
module.exports = sort


/***/ }),

/***/ 8112:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  C1: () => (/* reexport */ CredentialsProviderError),
  mZ: () => (/* reexport */ ProviderError),
  Jh: () => (/* reexport */ TokenProviderError),
  cy: () => (/* reexport */ chain),
  VR: () => (/* reexport */ fromStatic),
  Bj: () => (/* reexport */ memoize)
});

;// ./node_modules/@smithy/property-provider/dist-es/ProviderError.js
class ProviderError extends Error {
    constructor(message, options = true) {
        let logger;
        let tryNextLink = true;
        if (typeof options === "boolean") {
            logger = undefined;
            tryNextLink = options;
        }
        else if (options != null && typeof options === "object") {
            logger = options.logger;
            tryNextLink = options.tryNextLink ?? true;
        }
        super(message);
        this.name = "ProviderError";
        this.tryNextLink = tryNextLink;
        Object.setPrototypeOf(this, ProviderError.prototype);
        logger?.debug?.(`@smithy/property-provider ${tryNextLink ? "->" : "(!)"} ${message}`);
    }
    static from(error, options = true) {
        return Object.assign(new this(error.message, options), error);
    }
}

;// ./node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js

class CredentialsProviderError extends ProviderError {
    constructor(message, options = true) {
        super(message, options);
        this.name = "CredentialsProviderError";
        Object.setPrototypeOf(this, CredentialsProviderError.prototype);
    }
}

;// ./node_modules/@smithy/property-provider/dist-es/TokenProviderError.js

class TokenProviderError extends ProviderError {
    constructor(message, options = true) {
        super(message, options);
        this.name = "TokenProviderError";
        Object.setPrototypeOf(this, TokenProviderError.prototype);
    }
}

;// ./node_modules/@smithy/property-provider/dist-es/chain.js

const chain = (...providers) => async () => {
    if (providers.length === 0) {
        throw new ProviderError("No providers in chain");
    }
    let lastProviderError;
    for (const provider of providers) {
        try {
            const credentials = await provider();
            return credentials;
        }
        catch (err) {
            lastProviderError = err;
            if (err?.tryNextLink) {
                continue;
            }
            throw err;
        }
    }
    throw lastProviderError;
};

;// ./node_modules/@smithy/property-provider/dist-es/fromStatic.js
const fromStatic = (staticValue) => () => Promise.resolve(staticValue);

;// ./node_modules/@smithy/property-provider/dist-es/memoize.js
const memoize = (provider, isExpired, requiresRefresh) => {
    let resolved;
    let pending;
    let hasResult;
    let isConstant = false;
    const coalesceProvider = async () => {
        if (!pending) {
            pending = provider();
        }
        try {
            resolved = await pending;
            hasResult = true;
            isConstant = false;
        }
        finally {
            pending = undefined;
        }
        return resolved;
    };
    if (isExpired === undefined) {
        return async (options) => {
            if (!hasResult || options?.forceRefresh) {
                resolved = await coalesceProvider();
            }
            return resolved;
        };
    }
    return async (options) => {
        if (!hasResult || options?.forceRefresh) {
            resolved = await coalesceProvider();
        }
        if (isConstant) {
            return resolved;
        }
        if (requiresRefresh && !requiresRefresh(resolved)) {
            isConstant = true;
            return resolved;
        }
        if (isExpired(resolved)) {
            await coalesceProvider();
            return resolved;
        }
        return resolved;
    };
};

;// ./node_modules/@smithy/property-provider/dist-es/index.js








/***/ }),

/***/ 8218:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ collectBodyString)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4820);

const collectBodyString = (streamBody, context) => (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__/* .collectBody */ .Px)(streamBody, context).then((body) => context.utf8Encoder(body));


/***/ }),

/***/ 8300:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const parse = __webpack_require__(7153)
const valid = (version, options) => {
  const v = parse(version, options)
  return v ? v.version : null
}
module.exports = valid


/***/ }),

/***/ 8377:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n4: () => (/* binding */ getRecursionDetectionPlugin)
/* harmony export */ });
/* unused harmony exports recursionDetectionMiddleware, addRecursionDetectionMiddlewareOptions */
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5479);

const TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
const ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
const ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
const recursionDetectionMiddleware = (options) => (next) => async (args) => {
    const { request } = args;
    if (!_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__/* .HttpRequest */ .Kd.isInstance(request) || options.runtime !== "node") {
        return next(args);
    }
    const traceIdHeader = Object.keys(request.headers ?? {}).find((h) => h.toLowerCase() === TRACE_ID_HEADER_NAME.toLowerCase()) ??
        TRACE_ID_HEADER_NAME;
    if (request.headers.hasOwnProperty(traceIdHeader)) {
        return next(args);
    }
    const functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
    const traceId = process.env[ENV_TRACE_ID];
    const nonEmptyString = (str) => typeof str === "string" && str.length > 0;
    if (nonEmptyString(functionName) && nonEmptyString(traceId)) {
        request.headers[TRACE_ID_HEADER_NAME] = traceId;
    }
    return next({
        ...args,
        request,
    });
};
const addRecursionDetectionMiddlewareOptions = {
    step: "build",
    tags: ["RECURSION_DETECTION"],
    name: "recursionDetectionMiddleware",
    override: true,
    priority: "low",
};
const getRecursionDetectionPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(recursionDetectionMiddleware(options), addRecursionDetectionMiddlewareOptions);
    },
});


/***/ }),

/***/ 8394:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $F: () => (/* binding */ PolicyNotFoundException),
/* harmony export */   $J: () => (/* binding */ IndexStatus),
/* harmony export */   $Z: () => (/* binding */ TransactionCanceledException),
/* harmony export */   $j: () => (/* binding */ DestinationStatus),
/* harmony export */   AV: () => (/* binding */ ExportFormat),
/* harmony export */   Ae: () => (/* binding */ WitnessStatus),
/* harmony export */   Ax: () => (/* binding */ ItemCollectionSizeLimitExceededException),
/* harmony export */   CW: () => (/* binding */ InputFormat),
/* harmony export */   D6: () => (/* binding */ ConditionalOperator),
/* harmony export */   DP: () => (/* binding */ TimeToLiveStatus),
/* harmony export */   EV: () => (/* binding */ ImportNotFoundException),
/* harmony export */   Er: () => (/* binding */ TransactionInProgressException),
/* harmony export */   Eu: () => (/* binding */ SSEType),
/* harmony export */   FP: () => (/* binding */ ProvisionedThroughputExceededException),
/* harmony export */   FQ: () => (/* binding */ TableStatus),
/* harmony export */   Gz: () => (/* binding */ GlobalTableNotFoundException),
/* harmony export */   Ir: () => (/* binding */ TableInUseException),
/* harmony export */   KV: () => (/* binding */ ReplicaAlreadyExistsException),
/* harmony export */   Mx: () => (/* binding */ StreamViewType),
/* harmony export */   Nr: () => (/* binding */ ReturnValuesOnConditionCheckFailure),
/* harmony export */   OC: () => (/* binding */ ContributorInsightsMode),
/* harmony export */   PL: () => (/* binding */ ContributorInsightsAction),
/* harmony export */   PO: () => (/* binding */ InternalServerError),
/* harmony export */   Ps: () => (/* binding */ ApproximateCreationDateTimePrecision),
/* harmony export */   Q9: () => (/* binding */ ProjectionType),
/* harmony export */   Qf: () => (/* binding */ InvalidExportTimeException),
/* harmony export */   R0: () => (/* binding */ TableClass),
/* harmony export */   SS: () => (/* binding */ GlobalTableStatus),
/* harmony export */   TM: () => (/* binding */ ExportConflictException),
/* harmony export */   Tk: () => (/* binding */ InputCompressionType),
/* harmony export */   Tw: () => (/* binding */ PointInTimeRecoveryStatus),
/* harmony export */   UC: () => (/* binding */ LimitExceededException),
/* harmony export */   UU: () => (/* binding */ DuplicateItemException),
/* harmony export */   U_: () => (/* binding */ ExportViewType),
/* harmony export */   V4: () => (/* binding */ AttributeAction),
/* harmony export */   WT: () => (/* binding */ ResourceInUseException),
/* harmony export */   Xc: () => (/* binding */ BillingMode),
/* harmony export */   Y5: () => (/* binding */ BackupInUseException),
/* harmony export */   Y_: () => (/* binding */ BatchStatementErrorCodeEnum),
/* harmony export */   ZU: () => (/* binding */ ReplicaNotFoundException),
/* harmony export */   _m: () => (/* binding */ KeyType),
/* harmony export */   a2: () => (/* binding */ SSEStatus),
/* harmony export */   ah: () => (/* binding */ IdempotentParameterMismatchException),
/* harmony export */   b9: () => (/* binding */ TableNotFoundException),
/* harmony export */   by: () => (/* binding */ PointInTimeRecoveryUnavailableException),
/* harmony export */   c2: () => (/* binding */ InvalidEndpointException),
/* harmony export */   dB: () => (/* binding */ BackupType),
/* harmony export */   dV: () => (/* binding */ GlobalTableAlreadyExistsException),
/* harmony export */   dh: () => (/* binding */ ScalarAttributeType),
/* harmony export */   eK: () => (/* binding */ AttributeValue),
/* harmony export */   fB: () => (/* binding */ ReturnConsumedCapacity),
/* harmony export */   jP: () => (/* binding */ ConditionalCheckFailedException),
/* harmony export */   kI: () => (/* binding */ TableAlreadyExistsException),
/* harmony export */   kU: () => (/* binding */ MultiRegionConsistency),
/* harmony export */   k_: () => (/* binding */ ContinuousBackupsUnavailableException),
/* harmony export */   kj: () => (/* binding */ RequestLimitExceeded),
/* harmony export */   l2: () => (/* binding */ ExportStatus),
/* harmony export */   l6: () => (/* binding */ Select),
/* harmony export */   l8: () => (/* binding */ IndexNotFoundException),
/* harmony export */   lB: () => (/* binding */ ResourceNotFoundException),
/* harmony export */   mW: () => (/* binding */ ComparisonOperator),
/* harmony export */   nK: () => (/* binding */ ImportConflictException),
/* harmony export */   p4: () => (/* binding */ BackupNotFoundException),
/* harmony export */   pL: () => (/* binding */ ContinuousBackupsStatus),
/* harmony export */   q6: () => (/* binding */ ReturnValue),
/* harmony export */   qF: () => (/* binding */ ReplicatedWriteConflictException),
/* harmony export */   rJ: () => (/* binding */ ReplicaStatus),
/* harmony export */   rd: () => (/* binding */ ContributorInsightsStatus),
/* harmony export */   sQ: () => (/* binding */ TransactionConflictException),
/* harmony export */   tC: () => (/* binding */ BackupStatus),
/* harmony export */   v5: () => (/* binding */ ExportNotFoundException),
/* harmony export */   vY: () => (/* binding */ ExportType),
/* harmony export */   vv: () => (/* binding */ BackupTypeFilter),
/* harmony export */   wT: () => (/* binding */ InvalidRestoreTimeException),
/* harmony export */   x5: () => (/* binding */ ThrottlingException),
/* harmony export */   xo: () => (/* binding */ ReturnItemCollectionMetrics),
/* harmony export */   yB: () => (/* binding */ ImportStatus),
/* harmony export */   zF: () => (/* binding */ S3SseAlgorithm)
/* harmony export */ });
/* harmony import */ var _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4007);

const ApproximateCreationDateTimePrecision = {
    MICROSECOND: "MICROSECOND",
    MILLISECOND: "MILLISECOND",
};
const AttributeAction = {
    ADD: "ADD",
    DELETE: "DELETE",
    PUT: "PUT",
};
const ScalarAttributeType = {
    B: "B",
    N: "N",
    S: "S",
};
const BackupStatus = {
    AVAILABLE: "AVAILABLE",
    CREATING: "CREATING",
    DELETED: "DELETED",
};
const BackupType = {
    AWS_BACKUP: "AWS_BACKUP",
    SYSTEM: "SYSTEM",
    USER: "USER",
};
const BillingMode = {
    PAY_PER_REQUEST: "PAY_PER_REQUEST",
    PROVISIONED: "PROVISIONED",
};
const KeyType = {
    HASH: "HASH",
    RANGE: "RANGE",
};
const ProjectionType = {
    ALL: "ALL",
    INCLUDE: "INCLUDE",
    KEYS_ONLY: "KEYS_ONLY",
};
const SSEType = {
    AES256: "AES256",
    KMS: "KMS",
};
const SSEStatus = {
    DISABLED: "DISABLED",
    DISABLING: "DISABLING",
    ENABLED: "ENABLED",
    ENABLING: "ENABLING",
    UPDATING: "UPDATING",
};
const StreamViewType = {
    KEYS_ONLY: "KEYS_ONLY",
    NEW_AND_OLD_IMAGES: "NEW_AND_OLD_IMAGES",
    NEW_IMAGE: "NEW_IMAGE",
    OLD_IMAGE: "OLD_IMAGE",
};
const TimeToLiveStatus = {
    DISABLED: "DISABLED",
    DISABLING: "DISABLING",
    ENABLED: "ENABLED",
    ENABLING: "ENABLING",
};
class BackupInUseException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "BackupInUseException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "BackupInUseException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, BackupInUseException.prototype);
    }
}
class BackupNotFoundException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "BackupNotFoundException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "BackupNotFoundException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, BackupNotFoundException.prototype);
    }
}
const BackupTypeFilter = {
    ALL: "ALL",
    AWS_BACKUP: "AWS_BACKUP",
    SYSTEM: "SYSTEM",
    USER: "USER",
};
const ReturnConsumedCapacity = {
    INDEXES: "INDEXES",
    NONE: "NONE",
    TOTAL: "TOTAL",
};
const ReturnValuesOnConditionCheckFailure = {
    ALL_OLD: "ALL_OLD",
    NONE: "NONE",
};
const BatchStatementErrorCodeEnum = {
    AccessDenied: "AccessDenied",
    ConditionalCheckFailed: "ConditionalCheckFailed",
    DuplicateItem: "DuplicateItem",
    InternalServerError: "InternalServerError",
    ItemCollectionSizeLimitExceeded: "ItemCollectionSizeLimitExceeded",
    ProvisionedThroughputExceeded: "ProvisionedThroughputExceeded",
    RequestLimitExceeded: "RequestLimitExceeded",
    ResourceNotFound: "ResourceNotFound",
    ThrottlingError: "ThrottlingError",
    TransactionConflict: "TransactionConflict",
    ValidationError: "ValidationError",
};
class InternalServerError extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "InternalServerError";
    $fault = "server";
    constructor(opts) {
        super({
            name: "InternalServerError",
            $fault: "server",
            ...opts,
        });
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
class RequestLimitExceeded extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "RequestLimitExceeded";
    $fault = "client";
    ThrottlingReasons;
    constructor(opts) {
        super({
            name: "RequestLimitExceeded",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, RequestLimitExceeded.prototype);
        this.ThrottlingReasons = opts.ThrottlingReasons;
    }
}
class ThrottlingException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ThrottlingException";
    $fault = "client";
    throttlingReasons;
    constructor(opts) {
        super({
            name: "ThrottlingException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ThrottlingException.prototype);
        this.throttlingReasons = opts.throttlingReasons;
    }
}
class InvalidEndpointException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "InvalidEndpointException";
    $fault = "client";
    Message;
    constructor(opts) {
        super({
            name: "InvalidEndpointException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidEndpointException.prototype);
        this.Message = opts.Message;
    }
}
class ProvisionedThroughputExceededException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ProvisionedThroughputExceededException";
    $fault = "client";
    ThrottlingReasons;
    constructor(opts) {
        super({
            name: "ProvisionedThroughputExceededException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ProvisionedThroughputExceededException.prototype);
        this.ThrottlingReasons = opts.ThrottlingReasons;
    }
}
class ResourceNotFoundException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ResourceNotFoundException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ResourceNotFoundException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
    }
}
const ReturnItemCollectionMetrics = {
    NONE: "NONE",
    SIZE: "SIZE",
};
class ItemCollectionSizeLimitExceededException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ItemCollectionSizeLimitExceededException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ItemCollectionSizeLimitExceededException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ItemCollectionSizeLimitExceededException.prototype);
    }
}
class ReplicatedWriteConflictException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ReplicatedWriteConflictException";
    $fault = "client";
    $retryable = {};
    constructor(opts) {
        super({
            name: "ReplicatedWriteConflictException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ReplicatedWriteConflictException.prototype);
    }
}
const ComparisonOperator = {
    BEGINS_WITH: "BEGINS_WITH",
    BETWEEN: "BETWEEN",
    CONTAINS: "CONTAINS",
    EQ: "EQ",
    GE: "GE",
    GT: "GT",
    IN: "IN",
    LE: "LE",
    LT: "LT",
    NE: "NE",
    NOT_CONTAINS: "NOT_CONTAINS",
    NOT_NULL: "NOT_NULL",
    NULL: "NULL",
};
const ConditionalOperator = {
    AND: "AND",
    OR: "OR",
};
const ContinuousBackupsStatus = {
    DISABLED: "DISABLED",
    ENABLED: "ENABLED",
};
const PointInTimeRecoveryStatus = {
    DISABLED: "DISABLED",
    ENABLED: "ENABLED",
};
class ContinuousBackupsUnavailableException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ContinuousBackupsUnavailableException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ContinuousBackupsUnavailableException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ContinuousBackupsUnavailableException.prototype);
    }
}
const ContributorInsightsAction = {
    DISABLE: "DISABLE",
    ENABLE: "ENABLE",
};
const ContributorInsightsMode = {
    ACCESSED_AND_THROTTLED_KEYS: "ACCESSED_AND_THROTTLED_KEYS",
    THROTTLED_KEYS: "THROTTLED_KEYS",
};
const ContributorInsightsStatus = {
    DISABLED: "DISABLED",
    DISABLING: "DISABLING",
    ENABLED: "ENABLED",
    ENABLING: "ENABLING",
    FAILED: "FAILED",
};
class LimitExceededException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "LimitExceededException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "LimitExceededException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, LimitExceededException.prototype);
    }
}
class TableInUseException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "TableInUseException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "TableInUseException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, TableInUseException.prototype);
    }
}
class TableNotFoundException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "TableNotFoundException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "TableNotFoundException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, TableNotFoundException.prototype);
    }
}
const GlobalTableStatus = {
    ACTIVE: "ACTIVE",
    CREATING: "CREATING",
    DELETING: "DELETING",
    UPDATING: "UPDATING",
};
const IndexStatus = {
    ACTIVE: "ACTIVE",
    CREATING: "CREATING",
    DELETING: "DELETING",
    UPDATING: "UPDATING",
};
const ReplicaStatus = {
    ACTIVE: "ACTIVE",
    ARCHIVED: "ARCHIVED",
    ARCHIVING: "ARCHIVING",
    CREATING: "CREATING",
    CREATION_FAILED: "CREATION_FAILED",
    DELETING: "DELETING",
    INACCESSIBLE_ENCRYPTION_CREDENTIALS: "INACCESSIBLE_ENCRYPTION_CREDENTIALS",
    REGION_DISABLED: "REGION_DISABLED",
    REPLICATION_NOT_AUTHORIZED: "REPLICATION_NOT_AUTHORIZED",
    UPDATING: "UPDATING",
};
const TableClass = {
    STANDARD: "STANDARD",
    STANDARD_INFREQUENT_ACCESS: "STANDARD_INFREQUENT_ACCESS",
};
const TableStatus = {
    ACTIVE: "ACTIVE",
    ARCHIVED: "ARCHIVED",
    ARCHIVING: "ARCHIVING",
    CREATING: "CREATING",
    DELETING: "DELETING",
    INACCESSIBLE_ENCRYPTION_CREDENTIALS: "INACCESSIBLE_ENCRYPTION_CREDENTIALS",
    REPLICATION_NOT_AUTHORIZED: "REPLICATION_NOT_AUTHORIZED",
    UPDATING: "UPDATING",
};
class GlobalTableAlreadyExistsException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "GlobalTableAlreadyExistsException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "GlobalTableAlreadyExistsException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, GlobalTableAlreadyExistsException.prototype);
    }
}
const WitnessStatus = {
    ACTIVE: "ACTIVE",
    CREATING: "CREATING",
    DELETING: "DELETING",
};
const MultiRegionConsistency = {
    EVENTUAL: "EVENTUAL",
    STRONG: "STRONG",
};
class ResourceInUseException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ResourceInUseException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ResourceInUseException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ResourceInUseException.prototype);
    }
}
const ReturnValue = {
    ALL_NEW: "ALL_NEW",
    ALL_OLD: "ALL_OLD",
    NONE: "NONE",
    UPDATED_NEW: "UPDATED_NEW",
    UPDATED_OLD: "UPDATED_OLD",
};
class TransactionConflictException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "TransactionConflictException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "TransactionConflictException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, TransactionConflictException.prototype);
    }
}
class PolicyNotFoundException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "PolicyNotFoundException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "PolicyNotFoundException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, PolicyNotFoundException.prototype);
    }
}
const ExportFormat = {
    DYNAMODB_JSON: "DYNAMODB_JSON",
    ION: "ION",
};
const ExportStatus = {
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
    IN_PROGRESS: "IN_PROGRESS",
};
const ExportType = {
    FULL_EXPORT: "FULL_EXPORT",
    INCREMENTAL_EXPORT: "INCREMENTAL_EXPORT",
};
const ExportViewType = {
    NEW_AND_OLD_IMAGES: "NEW_AND_OLD_IMAGES",
    NEW_IMAGE: "NEW_IMAGE",
};
const S3SseAlgorithm = {
    AES256: "AES256",
    KMS: "KMS",
};
class ExportNotFoundException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ExportNotFoundException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ExportNotFoundException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ExportNotFoundException.prototype);
    }
}
class GlobalTableNotFoundException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "GlobalTableNotFoundException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "GlobalTableNotFoundException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, GlobalTableNotFoundException.prototype);
    }
}
const ImportStatus = {
    CANCELLED: "CANCELLED",
    CANCELLING: "CANCELLING",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
    IN_PROGRESS: "IN_PROGRESS",
};
const InputCompressionType = {
    GZIP: "GZIP",
    NONE: "NONE",
    ZSTD: "ZSTD",
};
const InputFormat = {
    CSV: "CSV",
    DYNAMODB_JSON: "DYNAMODB_JSON",
    ION: "ION",
};
class ImportNotFoundException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ImportNotFoundException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ImportNotFoundException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ImportNotFoundException.prototype);
    }
}
const DestinationStatus = {
    ACTIVE: "ACTIVE",
    DISABLED: "DISABLED",
    DISABLING: "DISABLING",
    ENABLE_FAILED: "ENABLE_FAILED",
    ENABLING: "ENABLING",
    UPDATING: "UPDATING",
};
class DuplicateItemException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "DuplicateItemException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "DuplicateItemException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, DuplicateItemException.prototype);
    }
}
class IdempotentParameterMismatchException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "IdempotentParameterMismatchException";
    $fault = "client";
    Message;
    constructor(opts) {
        super({
            name: "IdempotentParameterMismatchException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, IdempotentParameterMismatchException.prototype);
        this.Message = opts.Message;
    }
}
class TransactionInProgressException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "TransactionInProgressException";
    $fault = "client";
    Message;
    constructor(opts) {
        super({
            name: "TransactionInProgressException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, TransactionInProgressException.prototype);
        this.Message = opts.Message;
    }
}
class ExportConflictException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ExportConflictException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ExportConflictException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ExportConflictException.prototype);
    }
}
class InvalidExportTimeException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "InvalidExportTimeException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "InvalidExportTimeException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidExportTimeException.prototype);
    }
}
class PointInTimeRecoveryUnavailableException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "PointInTimeRecoveryUnavailableException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "PointInTimeRecoveryUnavailableException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, PointInTimeRecoveryUnavailableException.prototype);
    }
}
class ImportConflictException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ImportConflictException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ImportConflictException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ImportConflictException.prototype);
    }
}
const Select = {
    ALL_ATTRIBUTES: "ALL_ATTRIBUTES",
    ALL_PROJECTED_ATTRIBUTES: "ALL_PROJECTED_ATTRIBUTES",
    COUNT: "COUNT",
    SPECIFIC_ATTRIBUTES: "SPECIFIC_ATTRIBUTES",
};
class TableAlreadyExistsException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "TableAlreadyExistsException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "TableAlreadyExistsException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, TableAlreadyExistsException.prototype);
    }
}
class InvalidRestoreTimeException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "InvalidRestoreTimeException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "InvalidRestoreTimeException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidRestoreTimeException.prototype);
    }
}
class ReplicaAlreadyExistsException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ReplicaAlreadyExistsException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ReplicaAlreadyExistsException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ReplicaAlreadyExistsException.prototype);
    }
}
class ReplicaNotFoundException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ReplicaNotFoundException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ReplicaNotFoundException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ReplicaNotFoundException.prototype);
    }
}
class IndexNotFoundException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "IndexNotFoundException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "IndexNotFoundException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, IndexNotFoundException.prototype);
    }
}
var AttributeValue;
(function (AttributeValue) {
    AttributeValue.visit = (value, visitor) => {
        if (value.S !== undefined)
            return visitor.S(value.S);
        if (value.N !== undefined)
            return visitor.N(value.N);
        if (value.B !== undefined)
            return visitor.B(value.B);
        if (value.SS !== undefined)
            return visitor.SS(value.SS);
        if (value.NS !== undefined)
            return visitor.NS(value.NS);
        if (value.BS !== undefined)
            return visitor.BS(value.BS);
        if (value.M !== undefined)
            return visitor.M(value.M);
        if (value.L !== undefined)
            return visitor.L(value.L);
        if (value.NULL !== undefined)
            return visitor.NULL(value.NULL);
        if (value.BOOL !== undefined)
            return visitor.BOOL(value.BOOL);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(AttributeValue || (AttributeValue = {}));
class ConditionalCheckFailedException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "ConditionalCheckFailedException";
    $fault = "client";
    Item;
    constructor(opts) {
        super({
            name: "ConditionalCheckFailedException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ConditionalCheckFailedException.prototype);
        this.Item = opts.Item;
    }
}
class TransactionCanceledException extends _DynamoDBServiceException__WEBPACK_IMPORTED_MODULE_0__/* .DynamoDBServiceException */ .H {
    name = "TransactionCanceledException";
    $fault = "client";
    Message;
    CancellationReasons;
    constructor(opts) {
        super({
            name: "TransactionCanceledException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, TransactionCanceledException.prototype);
        this.Message = opts.Message;
        this.CancellationReasons = opts.CancellationReasons;
    }
}


/***/ }),

/***/ 8445:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const compare = __webpack_require__(3701)
const lte = (a, b, loose) => compare(a, b, loose) <= 0
module.exports = lte


/***/ }),

/***/ 8474:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const compare = __webpack_require__(3701)
const compareLoose = (a, b) => compare(a, b, true)
module.exports = compareLoose


/***/ }),

/***/ 8545:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  kS: () => (/* reexport */ EndpointCache),
  mw: () => (/* reexport */ customEndpointFunctions),
  oX: () => (/* reexport */ isIpAddress),
  X8: () => (/* reexport */ isValidHostLabel),
  sO: () => (/* reexport */ resolveEndpoint)
});

// UNUSED EXPORTS: EndpointError

;// ./node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js
class EndpointCache {
    constructor({ size, params }) {
        this.data = new Map();
        this.parameters = [];
        this.capacity = size ?? 50;
        if (params) {
            this.parameters = params;
        }
    }
    get(endpointParams, resolver) {
        const key = this.hash(endpointParams);
        if (key === false) {
            return resolver();
        }
        if (!this.data.has(key)) {
            if (this.data.size > this.capacity + 10) {
                const keys = this.data.keys();
                let i = 0;
                while (true) {
                    const { value, done } = keys.next();
                    this.data.delete(value);
                    if (done || ++i > 10) {
                        break;
                    }
                }
            }
            this.data.set(key, resolver());
        }
        return this.data.get(key);
    }
    size() {
        return this.data.size;
    }
    hash(endpointParams) {
        let buffer = "";
        const { parameters } = this;
        if (parameters.length === 0) {
            return false;
        }
        for (const param of parameters) {
            const val = String(endpointParams[param] ?? "");
            if (val.includes("|;")) {
                return false;
            }
            buffer += val + "|;";
        }
        return buffer;
    }
}

;// ./node_modules/@smithy/util-endpoints/dist-es/lib/isIpAddress.js
const IP_V4_REGEX = new RegExp(`^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$`);
const isIpAddress = (value) => IP_V4_REGEX.test(value) || (value.startsWith("[") && value.endsWith("]"));

;// ./node_modules/@smithy/util-endpoints/dist-es/lib/isValidHostLabel.js
const VALID_HOST_LABEL_REGEX = new RegExp(`^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$`);
const isValidHostLabel = (value, allowSubDomains = false) => {
    if (!allowSubDomains) {
        return VALID_HOST_LABEL_REGEX.test(value);
    }
    const labels = value.split(".");
    for (const label of labels) {
        if (!isValidHostLabel(label)) {
            return false;
        }
    }
    return true;
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js
const customEndpointFunctions = {};

;// ./node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js
const debugId = "endpoints";

;// ./node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js
function toDebugString(input) {
    if (typeof input !== "object" || input == null) {
        return input;
    }
    if ("ref" in input) {
        return `$${toDebugString(input.ref)}`;
    }
    if ("fn" in input) {
        return `${input.fn}(${(input.argv || []).map(toDebugString).join(", ")})`;
    }
    return JSON.stringify(input, null, 2);
}

;// ./node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js
class EndpointError extends Error {
    constructor(message) {
        super(message);
        this.name = "EndpointError";
    }
}

;// ./node_modules/@smithy/util-endpoints/dist-es/types/index.js








;// ./node_modules/@smithy/util-endpoints/dist-es/lib/booleanEquals.js
const booleanEquals = (value1, value2) => value1 === value2;

;// ./node_modules/@smithy/util-endpoints/dist-es/lib/getAttrPathList.js

const getAttrPathList = (path) => {
    const parts = path.split(".");
    const pathList = [];
    for (const part of parts) {
        const squareBracketIndex = part.indexOf("[");
        if (squareBracketIndex !== -1) {
            if (part.indexOf("]") !== part.length - 1) {
                throw new EndpointError(`Path: '${path}' does not end with ']'`);
            }
            const arrayIndex = part.slice(squareBracketIndex + 1, -1);
            if (Number.isNaN(parseInt(arrayIndex))) {
                throw new EndpointError(`Invalid array index: '${arrayIndex}' in path: '${path}'`);
            }
            if (squareBracketIndex !== 0) {
                pathList.push(part.slice(0, squareBracketIndex));
            }
            pathList.push(arrayIndex);
        }
        else {
            pathList.push(part);
        }
    }
    return pathList;
};

;// ./node_modules/@smithy/util-endpoints/dist-es/lib/getAttr.js


const getAttr = (value, path) => getAttrPathList(path).reduce((acc, index) => {
    if (typeof acc !== "object") {
        throw new EndpointError(`Index '${index}' in '${path}' not found in '${JSON.stringify(value)}'`);
    }
    else if (Array.isArray(acc)) {
        return acc[parseInt(index)];
    }
    return acc[index];
}, value);

;// ./node_modules/@smithy/util-endpoints/dist-es/lib/isSet.js
const isSet = (value) => value != null;

;// ./node_modules/@smithy/util-endpoints/dist-es/lib/not.js
const not = (value) => !value;

// EXTERNAL MODULE: ./node_modules/@smithy/types/dist-es/index.js + 11 modules
var dist_es = __webpack_require__(7523);
;// ./node_modules/@smithy/util-endpoints/dist-es/lib/parseURL.js


const DEFAULT_PORTS = {
    [dist_es/* EndpointURLScheme */.Ue.HTTP]: 80,
    [dist_es/* EndpointURLScheme */.Ue.HTTPS]: 443,
};
const parseURL = (value) => {
    const whatwgURL = (() => {
        try {
            if (value instanceof URL) {
                return value;
            }
            if (typeof value === "object" && "hostname" in value) {
                const { hostname, port, protocol = "", path = "", query = {} } = value;
                const url = new URL(`${protocol}//${hostname}${port ? `:${port}` : ""}${path}`);
                url.search = Object.entries(query)
                    .map(([k, v]) => `${k}=${v}`)
                    .join("&");
                return url;
            }
            return new URL(value);
        }
        catch (error) {
            return null;
        }
    })();
    if (!whatwgURL) {
        console.error(`Unable to parse ${JSON.stringify(value)} as a whatwg URL.`);
        return null;
    }
    const urlString = whatwgURL.href;
    const { host, hostname, pathname, protocol, search } = whatwgURL;
    if (search) {
        return null;
    }
    const scheme = protocol.slice(0, -1);
    if (!Object.values(dist_es/* EndpointURLScheme */.Ue).includes(scheme)) {
        return null;
    }
    const isIp = isIpAddress(hostname);
    const inputContainsDefaultPort = urlString.includes(`${host}:${DEFAULT_PORTS[scheme]}`) ||
        (typeof value === "string" && value.includes(`${host}:${DEFAULT_PORTS[scheme]}`));
    const authority = `${host}${inputContainsDefaultPort ? `:${DEFAULT_PORTS[scheme]}` : ``}`;
    return {
        scheme,
        authority,
        path: pathname,
        normalizedPath: pathname.endsWith("/") ? pathname : `${pathname}/`,
        isIp,
    };
};

;// ./node_modules/@smithy/util-endpoints/dist-es/lib/stringEquals.js
const stringEquals = (value1, value2) => value1 === value2;

;// ./node_modules/@smithy/util-endpoints/dist-es/lib/substring.js
const substring = (input, start, stop, reverse) => {
    if (start >= stop || input.length < stop) {
        return null;
    }
    if (!reverse) {
        return input.substring(start, stop);
    }
    return input.substring(input.length - stop, input.length - start);
};

;// ./node_modules/@smithy/util-endpoints/dist-es/lib/uriEncode.js
const uriEncode = (value) => encodeURIComponent(value).replace(/[!*'()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);

;// ./node_modules/@smithy/util-endpoints/dist-es/lib/index.js










;// ./node_modules/@smithy/util-endpoints/dist-es/utils/endpointFunctions.js

const endpointFunctions = {
    booleanEquals: booleanEquals,
    getAttr: getAttr,
    isSet: isSet,
    isValidHostLabel: isValidHostLabel,
    not: not,
    parseURL: parseURL,
    stringEquals: stringEquals,
    substring: substring,
    uriEncode: uriEncode,
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTemplate.js

const evaluateTemplate = (template, options) => {
    const evaluatedTemplateArr = [];
    const templateContext = {
        ...options.endpointParams,
        ...options.referenceRecord,
    };
    let currentIndex = 0;
    while (currentIndex < template.length) {
        const openingBraceIndex = template.indexOf("{", currentIndex);
        if (openingBraceIndex === -1) {
            evaluatedTemplateArr.push(template.slice(currentIndex));
            break;
        }
        evaluatedTemplateArr.push(template.slice(currentIndex, openingBraceIndex));
        const closingBraceIndex = template.indexOf("}", openingBraceIndex);
        if (closingBraceIndex === -1) {
            evaluatedTemplateArr.push(template.slice(openingBraceIndex));
            break;
        }
        if (template[openingBraceIndex + 1] === "{" && template[closingBraceIndex + 1] === "}") {
            evaluatedTemplateArr.push(template.slice(openingBraceIndex + 1, closingBraceIndex));
            currentIndex = closingBraceIndex + 2;
        }
        const parameterName = template.substring(openingBraceIndex + 1, closingBraceIndex);
        if (parameterName.includes("#")) {
            const [refName, attrName] = parameterName.split("#");
            evaluatedTemplateArr.push(getAttr(templateContext[refName], attrName));
        }
        else {
            evaluatedTemplateArr.push(templateContext[parameterName]);
        }
        currentIndex = closingBraceIndex + 1;
    }
    return evaluatedTemplateArr.join("");
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/getReferenceValue.js
const getReferenceValue = ({ ref }, options) => {
    const referenceRecord = {
        ...options.endpointParams,
        ...options.referenceRecord,
    };
    return referenceRecord[ref];
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js




const evaluateExpression = (obj, keyName, options) => {
    if (typeof obj === "string") {
        return evaluateTemplate(obj, options);
    }
    else if (obj["fn"]) {
        return callFunction(obj, options);
    }
    else if (obj["ref"]) {
        return getReferenceValue(obj, options);
    }
    throw new EndpointError(`'${keyName}': ${String(obj)} is not a string, function or reference.`);
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/callFunction.js



const callFunction = ({ fn, argv }, options) => {
    const evaluatedArgs = argv.map((arg) => ["boolean", "number"].includes(typeof arg) ? arg : evaluateExpression(arg, "arg", options));
    const fnSegments = fn.split(".");
    if (fnSegments[0] in customEndpointFunctions && fnSegments[1] != null) {
        return customEndpointFunctions[fnSegments[0]][fnSegments[1]](...evaluatedArgs);
    }
    return endpointFunctions[fn](...evaluatedArgs);
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/evaluateCondition.js



const evaluateCondition = ({ assign, ...fnArgs }, options) => {
    if (assign && assign in options.referenceRecord) {
        throw new EndpointError(`'${assign}' is already defined in Reference Record.`);
    }
    const value = callFunction(fnArgs, options);
    options.logger?.debug?.(`${debugId} evaluateCondition: ${toDebugString(fnArgs)} = ${toDebugString(value)}`);
    return {
        result: value === "" ? true : !!value,
        ...(assign != null && { toAssign: { name: assign, value } }),
    };
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js


const evaluateConditions = (conditions = [], options) => {
    const conditionsReferenceRecord = {};
    for (const condition of conditions) {
        const { result, toAssign } = evaluateCondition(condition, {
            ...options,
            referenceRecord: {
                ...options.referenceRecord,
                ...conditionsReferenceRecord,
            },
        });
        if (!result) {
            return { result };
        }
        if (toAssign) {
            conditionsReferenceRecord[toAssign.name] = toAssign.value;
            options.logger?.debug?.(`${debugId} assign: ${toAssign.name} := ${toDebugString(toAssign.value)}`);
        }
    }
    return { result: true, referenceRecord: conditionsReferenceRecord };
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointHeaders.js


const getEndpointHeaders = (headers, options) => Object.entries(headers).reduce((acc, [headerKey, headerVal]) => ({
    ...acc,
    [headerKey]: headerVal.map((headerValEntry) => {
        const processedExpr = evaluateExpression(headerValEntry, "Header value entry", options);
        if (typeof processedExpr !== "string") {
            throw new EndpointError(`Header '${headerKey}' value '${processedExpr}' is not a string`);
        }
        return processedExpr;
    }),
}), {});

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperty.js



const getEndpointProperty = (property, options) => {
    if (Array.isArray(property)) {
        return property.map((propertyEntry) => getEndpointProperty(propertyEntry, options));
    }
    switch (typeof property) {
        case "string":
            return evaluateTemplate(property, options);
        case "object":
            if (property === null) {
                throw new EndpointError(`Unexpected endpoint property: ${property}`);
            }
            return getEndpointProperties(property, options);
        case "boolean":
            return property;
        default:
            throw new EndpointError(`Unexpected endpoint property type: ${typeof property}`);
    }
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperties.js

const getEndpointProperties = (properties, options) => Object.entries(properties).reduce((acc, [propertyKey, propertyVal]) => ({
    ...acc,
    [propertyKey]: getEndpointProperty(propertyVal, options),
}), {});

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointUrl.js


const getEndpointUrl = (endpointUrl, options) => {
    const expression = evaluateExpression(endpointUrl, "Endpoint URL", options);
    if (typeof expression === "string") {
        try {
            return new URL(expression);
        }
        catch (error) {
            console.error(`Failed to construct URL with ${expression}`, error);
            throw error;
        }
    }
    throw new EndpointError(`Endpoint URL must be a string, got ${typeof expression}`);
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/evaluateEndpointRule.js





const evaluateEndpointRule = (endpointRule, options) => {
    const { conditions, endpoint } = endpointRule;
    const { result, referenceRecord } = evaluateConditions(conditions, options);
    if (!result) {
        return;
    }
    const endpointRuleOptions = {
        ...options,
        referenceRecord: { ...options.referenceRecord, ...referenceRecord },
    };
    const { url, properties, headers } = endpoint;
    options.logger?.debug?.(`${debugId} Resolving endpoint from template: ${toDebugString(endpoint)}`);
    return {
        ...(headers != undefined && {
            headers: getEndpointHeaders(headers, endpointRuleOptions),
        }),
        ...(properties != undefined && {
            properties: getEndpointProperties(properties, endpointRuleOptions),
        }),
        url: getEndpointUrl(url, endpointRuleOptions),
    };
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/evaluateErrorRule.js



const evaluateErrorRule = (errorRule, options) => {
    const { conditions, error } = errorRule;
    const { result, referenceRecord } = evaluateConditions(conditions, options);
    if (!result) {
        return;
    }
    throw new EndpointError(evaluateExpression(error, "Error", {
        ...options,
        referenceRecord: { ...options.referenceRecord, ...referenceRecord },
    }));
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTreeRule.js


const evaluateTreeRule = (treeRule, options) => {
    const { conditions, rules } = treeRule;
    const { result, referenceRecord } = evaluateConditions(conditions, options);
    if (!result) {
        return;
    }
    return evaluateRules(rules, {
        ...options,
        referenceRecord: { ...options.referenceRecord, ...referenceRecord },
    });
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/evaluateRules.js




const evaluateRules = (rules, options) => {
    for (const rule of rules) {
        if (rule.type === "endpoint") {
            const endpointOrUndefined = evaluateEndpointRule(rule, options);
            if (endpointOrUndefined) {
                return endpointOrUndefined;
            }
        }
        else if (rule.type === "error") {
            evaluateErrorRule(rule, options);
        }
        else if (rule.type === "tree") {
            const endpointOrUndefined = evaluateTreeRule(rule, options);
            if (endpointOrUndefined) {
                return endpointOrUndefined;
            }
        }
        else {
            throw new EndpointError(`Unknown endpoint rule: ${rule}`);
        }
    }
    throw new EndpointError(`Rules evaluation failed`);
};

;// ./node_modules/@smithy/util-endpoints/dist-es/utils/index.js



;// ./node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js



const resolveEndpoint = (ruleSetObject, options) => {
    const { endpointParams, logger } = options;
    const { parameters, rules } = ruleSetObject;
    options.logger?.debug?.(`${debugId} Initial EndpointParams: ${toDebugString(endpointParams)}`);
    const paramsWithDefault = Object.entries(parameters)
        .filter(([, v]) => v.default != null)
        .map(([k, v]) => [k, v.default]);
    if (paramsWithDefault.length > 0) {
        for (const [paramKey, paramDefaultValue] of paramsWithDefault) {
            endpointParams[paramKey] = endpointParams[paramKey] ?? paramDefaultValue;
        }
    }
    const requiredParams = Object.entries(parameters)
        .filter(([, v]) => v.required)
        .map(([k]) => k);
    for (const requiredParam of requiredParams) {
        if (endpointParams[requiredParam] == null) {
            throw new EndpointError(`Missing required parameter: '${requiredParam}'`);
        }
    }
    const endpoint = evaluateRules(rules, { endpointParams, logger, referenceRecord: {} });
    options.logger?.debug?.(`${debugId} Resolved endpoint: ${toDebugString(endpoint)}`);
    return endpoint;
};

;// ./node_modules/@smithy/util-endpoints/dist-es/index.js








/***/ }),

/***/ 8579:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  uf: () => (/* binding */ de_BatchExecuteStatementCommand),
  B2: () => (/* binding */ de_BatchGetItemCommand),
  Ki: () => (/* binding */ de_BatchWriteItemCommand),
  Eu: () => (/* binding */ de_CreateBackupCommand),
  V_: () => (/* binding */ de_CreateGlobalTableCommand),
  a3: () => (/* binding */ de_CreateTableCommand),
  VJ: () => (/* binding */ de_DeleteBackupCommand),
  _U: () => (/* binding */ de_DeleteItemCommand),
  dH: () => (/* binding */ de_DeleteResourcePolicyCommand),
  HJ: () => (/* binding */ de_DeleteTableCommand),
  FG: () => (/* binding */ de_DescribeBackupCommand),
  Fy: () => (/* binding */ de_DescribeContinuousBackupsCommand),
  $: () => (/* binding */ de_DescribeContributorInsightsCommand),
  pC: () => (/* binding */ de_DescribeEndpointsCommand),
  Xl: () => (/* binding */ de_DescribeExportCommand),
  Q$: () => (/* binding */ de_DescribeGlobalTableCommand),
  tr: () => (/* binding */ de_DescribeGlobalTableSettingsCommand),
  AZ: () => (/* binding */ de_DescribeImportCommand),
  PL: () => (/* binding */ de_DescribeKinesisStreamingDestinationCommand),
  pT: () => (/* binding */ de_DescribeLimitsCommand),
  XA: () => (/* binding */ de_DescribeTableCommand),
  js: () => (/* binding */ de_DescribeTableReplicaAutoScalingCommand),
  Fe: () => (/* binding */ de_DescribeTimeToLiveCommand),
  EI: () => (/* binding */ de_DisableKinesisStreamingDestinationCommand),
  oY: () => (/* binding */ de_EnableKinesisStreamingDestinationCommand),
  Om: () => (/* binding */ de_ExecuteStatementCommand),
  Fb: () => (/* binding */ de_ExecuteTransactionCommand),
  jS: () => (/* binding */ de_ExportTableToPointInTimeCommand),
  tT: () => (/* binding */ de_GetItemCommand),
  sb: () => (/* binding */ de_GetResourcePolicyCommand),
  nU: () => (/* binding */ de_ImportTableCommand),
  dr: () => (/* binding */ de_ListBackupsCommand),
  K9: () => (/* binding */ de_ListContributorInsightsCommand),
  fs: () => (/* binding */ de_ListExportsCommand),
  cK: () => (/* binding */ de_ListGlobalTablesCommand),
  a6: () => (/* binding */ de_ListImportsCommand),
  ZB: () => (/* binding */ de_ListTablesCommand),
  cB: () => (/* binding */ de_ListTagsOfResourceCommand),
  Gy: () => (/* binding */ de_PutItemCommand),
  Rj: () => (/* binding */ de_PutResourcePolicyCommand),
  qT: () => (/* binding */ de_QueryCommand),
  e2: () => (/* binding */ de_RestoreTableFromBackupCommand),
  rx: () => (/* binding */ de_RestoreTableToPointInTimeCommand),
  Lm: () => (/* binding */ de_ScanCommand),
  gm: () => (/* binding */ de_TagResourceCommand),
  GT: () => (/* binding */ de_TransactGetItemsCommand),
  nF: () => (/* binding */ de_TransactWriteItemsCommand),
  Hn: () => (/* binding */ de_UntagResourceCommand),
  lG: () => (/* binding */ de_UpdateContinuousBackupsCommand),
  v2: () => (/* binding */ de_UpdateContributorInsightsCommand),
  uU: () => (/* binding */ de_UpdateGlobalTableCommand),
  r_: () => (/* binding */ de_UpdateGlobalTableSettingsCommand),
  o8: () => (/* binding */ de_UpdateItemCommand),
  LD: () => (/* binding */ de_UpdateKinesisStreamingDestinationCommand),
  xh: () => (/* binding */ de_UpdateTableCommand),
  He: () => (/* binding */ de_UpdateTableReplicaAutoScalingCommand),
  hw: () => (/* binding */ de_UpdateTimeToLiveCommand),
  DE: () => (/* binding */ se_BatchExecuteStatementCommand),
  "if": () => (/* binding */ se_BatchGetItemCommand),
  J7: () => (/* binding */ se_BatchWriteItemCommand),
  fN: () => (/* binding */ se_CreateBackupCommand),
  a_: () => (/* binding */ se_CreateGlobalTableCommand),
  jM: () => (/* binding */ se_CreateTableCommand),
  ox: () => (/* binding */ se_DeleteBackupCommand),
  V$: () => (/* binding */ se_DeleteItemCommand),
  mE: () => (/* binding */ se_DeleteResourcePolicyCommand),
  q: () => (/* binding */ se_DeleteTableCommand),
  ge: () => (/* binding */ se_DescribeBackupCommand),
  ii: () => (/* binding */ se_DescribeContinuousBackupsCommand),
  Y0: () => (/* binding */ se_DescribeContributorInsightsCommand),
  QL: () => (/* binding */ se_DescribeEndpointsCommand),
  WP: () => (/* binding */ se_DescribeExportCommand),
  E3: () => (/* binding */ se_DescribeGlobalTableCommand),
  IQ: () => (/* binding */ se_DescribeGlobalTableSettingsCommand),
  Zt: () => (/* binding */ se_DescribeImportCommand),
  Az: () => (/* binding */ se_DescribeKinesisStreamingDestinationCommand),
  Ed: () => (/* binding */ se_DescribeLimitsCommand),
  sG: () => (/* binding */ se_DescribeTableCommand),
  kM: () => (/* binding */ se_DescribeTableReplicaAutoScalingCommand),
  sO: () => (/* binding */ se_DescribeTimeToLiveCommand),
  bl: () => (/* binding */ se_DisableKinesisStreamingDestinationCommand),
  IY: () => (/* binding */ se_EnableKinesisStreamingDestinationCommand),
  $K: () => (/* binding */ se_ExecuteStatementCommand),
  OG: () => (/* binding */ se_ExecuteTransactionCommand),
  _: () => (/* binding */ se_ExportTableToPointInTimeCommand),
  iZ: () => (/* binding */ se_GetItemCommand),
  bX: () => (/* binding */ se_GetResourcePolicyCommand),
  gG: () => (/* binding */ se_ImportTableCommand),
  GL: () => (/* binding */ se_ListBackupsCommand),
  zc: () => (/* binding */ se_ListContributorInsightsCommand),
  id: () => (/* binding */ se_ListExportsCommand),
  FS: () => (/* binding */ se_ListGlobalTablesCommand),
  xS: () => (/* binding */ se_ListImportsCommand),
  SG: () => (/* binding */ se_ListTablesCommand),
  Nz: () => (/* binding */ se_ListTagsOfResourceCommand),
  P5: () => (/* binding */ se_PutItemCommand),
  ci: () => (/* binding */ se_PutResourcePolicyCommand),
  xZ: () => (/* binding */ se_QueryCommand),
  Jx: () => (/* binding */ se_RestoreTableFromBackupCommand),
  q6: () => (/* binding */ se_RestoreTableToPointInTimeCommand),
  o$: () => (/* binding */ se_ScanCommand),
  xf: () => (/* binding */ se_TagResourceCommand),
  XL: () => (/* binding */ se_TransactGetItemsCommand),
  K3: () => (/* binding */ se_TransactWriteItemsCommand),
  i_: () => (/* binding */ se_UntagResourceCommand),
  qK: () => (/* binding */ se_UpdateContinuousBackupsCommand),
  go: () => (/* binding */ se_UpdateContributorInsightsCommand),
  Vs: () => (/* binding */ se_UpdateGlobalTableCommand),
  wK: () => (/* binding */ se_UpdateGlobalTableSettingsCommand),
  XN: () => (/* binding */ se_UpdateItemCommand),
  AX: () => (/* binding */ se_UpdateKinesisStreamingDestinationCommand),
  ih: () => (/* binding */ se_UpdateTableCommand),
  ml: () => (/* binding */ se_UpdateTableReplicaAutoScalingCommand),
  QC: () => (/* binding */ se_UpdateTimeToLiveCommand)
});

// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/parseJsonBody.js
var parseJsonBody = __webpack_require__(1919);
// EXTERNAL MODULE: ./node_modules/@smithy/smithy-client/dist-es/index.js + 26 modules
var dist_es = __webpack_require__(4820);
;// ./node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/awsExpectUnion.js

const awsExpectUnion = (value) => {
    if (value == null) {
        return undefined;
    }
    if (typeof value === "object" && "__type" in value) {
        delete value.__type;
    }
    return (0,dist_es/* expectUnion */.tN)(value);
};

// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var protocol_http_dist_es = __webpack_require__(5479);
// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-node/v4.js + 1 modules
var v4 = __webpack_require__(5461);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/models/DynamoDBServiceException.js
var DynamoDBServiceException = __webpack_require__(4007);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/client-dynamodb/dist-es/models/models_0.js
var models_0 = __webpack_require__(8394);
;// ./node_modules/@aws-sdk/client-dynamodb/dist-es/protocols/Aws_json1_0.js






const se_BatchExecuteStatementCommand = async (input, context) => {
    const headers = sharedHeaders("BatchExecuteStatement");
    let body;
    body = JSON.stringify(se_BatchExecuteStatementInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_BatchGetItemCommand = async (input, context) => {
    const headers = sharedHeaders("BatchGetItem");
    let body;
    body = JSON.stringify(se_BatchGetItemInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_BatchWriteItemCommand = async (input, context) => {
    const headers = sharedHeaders("BatchWriteItem");
    let body;
    body = JSON.stringify(se_BatchWriteItemInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_CreateBackupCommand = async (input, context) => {
    const headers = sharedHeaders("CreateBackup");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_CreateGlobalTableCommand = async (input, context) => {
    const headers = sharedHeaders("CreateGlobalTable");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_CreateTableCommand = async (input, context) => {
    const headers = sharedHeaders("CreateTable");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DeleteBackupCommand = async (input, context) => {
    const headers = sharedHeaders("DeleteBackup");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DeleteItemCommand = async (input, context) => {
    const headers = sharedHeaders("DeleteItem");
    let body;
    body = JSON.stringify(se_DeleteItemInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DeleteResourcePolicyCommand = async (input, context) => {
    const headers = sharedHeaders("DeleteResourcePolicy");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DeleteTableCommand = async (input, context) => {
    const headers = sharedHeaders("DeleteTable");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeBackupCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeBackup");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeContinuousBackupsCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeContinuousBackups");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeContributorInsightsCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeContributorInsights");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeEndpointsCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeEndpoints");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeExportCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeExport");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeGlobalTableCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeGlobalTable");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeGlobalTableSettingsCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeGlobalTableSettings");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeImportCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeImport");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeKinesisStreamingDestinationCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeKinesisStreamingDestination");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeLimitsCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeLimits");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeTableCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeTable");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeTableReplicaAutoScalingCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeTableReplicaAutoScaling");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DescribeTimeToLiveCommand = async (input, context) => {
    const headers = sharedHeaders("DescribeTimeToLive");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_DisableKinesisStreamingDestinationCommand = async (input, context) => {
    const headers = sharedHeaders("DisableKinesisStreamingDestination");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_EnableKinesisStreamingDestinationCommand = async (input, context) => {
    const headers = sharedHeaders("EnableKinesisStreamingDestination");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ExecuteStatementCommand = async (input, context) => {
    const headers = sharedHeaders("ExecuteStatement");
    let body;
    body = JSON.stringify(se_ExecuteStatementInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ExecuteTransactionCommand = async (input, context) => {
    const headers = sharedHeaders("ExecuteTransaction");
    let body;
    body = JSON.stringify(se_ExecuteTransactionInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ExportTableToPointInTimeCommand = async (input, context) => {
    const headers = sharedHeaders("ExportTableToPointInTime");
    let body;
    body = JSON.stringify(se_ExportTableToPointInTimeInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_GetItemCommand = async (input, context) => {
    const headers = sharedHeaders("GetItem");
    let body;
    body = JSON.stringify(se_GetItemInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_GetResourcePolicyCommand = async (input, context) => {
    const headers = sharedHeaders("GetResourcePolicy");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ImportTableCommand = async (input, context) => {
    const headers = sharedHeaders("ImportTable");
    let body;
    body = JSON.stringify(se_ImportTableInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ListBackupsCommand = async (input, context) => {
    const headers = sharedHeaders("ListBackups");
    let body;
    body = JSON.stringify(se_ListBackupsInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ListContributorInsightsCommand = async (input, context) => {
    const headers = sharedHeaders("ListContributorInsights");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ListExportsCommand = async (input, context) => {
    const headers = sharedHeaders("ListExports");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ListGlobalTablesCommand = async (input, context) => {
    const headers = sharedHeaders("ListGlobalTables");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ListImportsCommand = async (input, context) => {
    const headers = sharedHeaders("ListImports");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ListTablesCommand = async (input, context) => {
    const headers = sharedHeaders("ListTables");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ListTagsOfResourceCommand = async (input, context) => {
    const headers = sharedHeaders("ListTagsOfResource");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_PutItemCommand = async (input, context) => {
    const headers = sharedHeaders("PutItem");
    let body;
    body = JSON.stringify(se_PutItemInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_PutResourcePolicyCommand = async (input, context) => {
    const headers = sharedHeaders("PutResourcePolicy");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_QueryCommand = async (input, context) => {
    const headers = sharedHeaders("Query");
    let body;
    body = JSON.stringify(se_QueryInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_RestoreTableFromBackupCommand = async (input, context) => {
    const headers = sharedHeaders("RestoreTableFromBackup");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_RestoreTableToPointInTimeCommand = async (input, context) => {
    const headers = sharedHeaders("RestoreTableToPointInTime");
    let body;
    body = JSON.stringify(se_RestoreTableToPointInTimeInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_ScanCommand = async (input, context) => {
    const headers = sharedHeaders("Scan");
    let body;
    body = JSON.stringify(se_ScanInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_TagResourceCommand = async (input, context) => {
    const headers = sharedHeaders("TagResource");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_TransactGetItemsCommand = async (input, context) => {
    const headers = sharedHeaders("TransactGetItems");
    let body;
    body = JSON.stringify(se_TransactGetItemsInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_TransactWriteItemsCommand = async (input, context) => {
    const headers = sharedHeaders("TransactWriteItems");
    let body;
    body = JSON.stringify(se_TransactWriteItemsInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_UntagResourceCommand = async (input, context) => {
    const headers = sharedHeaders("UntagResource");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_UpdateContinuousBackupsCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateContinuousBackups");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_UpdateContributorInsightsCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateContributorInsights");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_UpdateGlobalTableCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateGlobalTable");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_UpdateGlobalTableSettingsCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateGlobalTableSettings");
    let body;
    body = JSON.stringify(se_UpdateGlobalTableSettingsInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_UpdateItemCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateItem");
    let body;
    body = JSON.stringify(se_UpdateItemInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_UpdateKinesisStreamingDestinationCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateKinesisStreamingDestination");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_UpdateTableCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateTable");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_UpdateTableReplicaAutoScalingCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateTableReplicaAutoScaling");
    let body;
    body = JSON.stringify(se_UpdateTableReplicaAutoScalingInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_UpdateTimeToLiveCommand = async (input, context) => {
    const headers = sharedHeaders("UpdateTimeToLive");
    let body;
    body = JSON.stringify((0,dist_es/* _json */.Ss)(input));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const de_BatchExecuteStatementCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_BatchExecuteStatementOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_BatchGetItemCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_BatchGetItemOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_BatchWriteItemCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_BatchWriteItemOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_CreateBackupCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_CreateBackupOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_CreateGlobalTableCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_CreateGlobalTableOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_CreateTableCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_CreateTableOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DeleteBackupCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DeleteBackupOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DeleteItemCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DeleteItemOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DeleteResourcePolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DeleteTableCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DeleteTableOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeBackupCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DescribeBackupOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeContinuousBackupsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DescribeContinuousBackupsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeContributorInsightsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DescribeContributorInsightsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeEndpointsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeExportCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DescribeExportOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeGlobalTableCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DescribeGlobalTableOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeGlobalTableSettingsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DescribeGlobalTableSettingsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeImportCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DescribeImportOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeKinesisStreamingDestinationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeLimitsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeTableCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DescribeTableOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeTableReplicaAutoScalingCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_DescribeTableReplicaAutoScalingOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DescribeTimeToLiveCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_DisableKinesisStreamingDestinationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_EnableKinesisStreamingDestinationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ExecuteStatementCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_ExecuteStatementOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ExecuteTransactionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_ExecuteTransactionOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ExportTableToPointInTimeCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_ExportTableToPointInTimeOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_GetItemCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_GetItemOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_GetResourcePolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ImportTableCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_ImportTableOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ListBackupsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_ListBackupsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ListContributorInsightsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ListExportsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ListGlobalTablesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ListImportsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_ListImportsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ListTablesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ListTagsOfResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_PutItemCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_PutItemOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_PutResourcePolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_QueryCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_QueryOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_RestoreTableFromBackupCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_RestoreTableFromBackupOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_RestoreTableToPointInTimeCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_RestoreTableToPointInTimeOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_ScanCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_ScanOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_TagResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await (0,dist_es/* collectBody */.Px)(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
const de_TransactGetItemsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_TransactGetItemsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_TransactWriteItemsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_TransactWriteItemsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_UntagResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    await (0,dist_es/* collectBody */.Px)(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return response;
};
const de_UpdateContinuousBackupsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_UpdateContinuousBackupsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_UpdateContributorInsightsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_UpdateGlobalTableCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_UpdateGlobalTableOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_UpdateGlobalTableSettingsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_UpdateGlobalTableSettingsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_UpdateItemCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_UpdateItemOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_UpdateKinesisStreamingDestinationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_UpdateTableCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_UpdateTableOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_UpdateTableReplicaAutoScalingCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = de_UpdateTableReplicaAutoScalingOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_UpdateTimeToLiveCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context);
    let contents = {};
    contents = (0,dist_es/* _json */.Ss)(data);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return response;
};
const de_CommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await (0,parseJsonBody/* parseJsonErrorBody */.CG)(output.body, context),
    };
    const errorCode = (0,parseJsonBody/* loadRestJsonErrorCode */.cJ)(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerError":
        case "com.amazonaws.dynamodb#InternalServerError":
            throw await de_InternalServerErrorRes(parsedOutput, context);
        case "RequestLimitExceeded":
        case "com.amazonaws.dynamodb#RequestLimitExceeded":
            throw await de_RequestLimitExceededRes(parsedOutput, context);
        case "ThrottlingException":
        case "com.amazonaws.dynamodb#ThrottlingException":
            throw await de_ThrottlingExceptionRes(parsedOutput, context);
        case "InvalidEndpointException":
        case "com.amazonaws.dynamodb#InvalidEndpointException":
            throw await de_InvalidEndpointExceptionRes(parsedOutput, context);
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.dynamodb#ProvisionedThroughputExceededException":
            throw await de_ProvisionedThroughputExceededExceptionRes(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.dynamodb#ResourceNotFoundException":
            throw await de_ResourceNotFoundExceptionRes(parsedOutput, context);
        case "ItemCollectionSizeLimitExceededException":
        case "com.amazonaws.dynamodb#ItemCollectionSizeLimitExceededException":
            throw await de_ItemCollectionSizeLimitExceededExceptionRes(parsedOutput, context);
        case "ReplicatedWriteConflictException":
        case "com.amazonaws.dynamodb#ReplicatedWriteConflictException":
            throw await de_ReplicatedWriteConflictExceptionRes(parsedOutput, context);
        case "BackupInUseException":
        case "com.amazonaws.dynamodb#BackupInUseException":
            throw await de_BackupInUseExceptionRes(parsedOutput, context);
        case "ContinuousBackupsUnavailableException":
        case "com.amazonaws.dynamodb#ContinuousBackupsUnavailableException":
            throw await de_ContinuousBackupsUnavailableExceptionRes(parsedOutput, context);
        case "LimitExceededException":
        case "com.amazonaws.dynamodb#LimitExceededException":
            throw await de_LimitExceededExceptionRes(parsedOutput, context);
        case "TableInUseException":
        case "com.amazonaws.dynamodb#TableInUseException":
            throw await de_TableInUseExceptionRes(parsedOutput, context);
        case "TableNotFoundException":
        case "com.amazonaws.dynamodb#TableNotFoundException":
            throw await de_TableNotFoundExceptionRes(parsedOutput, context);
        case "GlobalTableAlreadyExistsException":
        case "com.amazonaws.dynamodb#GlobalTableAlreadyExistsException":
            throw await de_GlobalTableAlreadyExistsExceptionRes(parsedOutput, context);
        case "ResourceInUseException":
        case "com.amazonaws.dynamodb#ResourceInUseException":
            throw await de_ResourceInUseExceptionRes(parsedOutput, context);
        case "BackupNotFoundException":
        case "com.amazonaws.dynamodb#BackupNotFoundException":
            throw await de_BackupNotFoundExceptionRes(parsedOutput, context);
        case "ConditionalCheckFailedException":
        case "com.amazonaws.dynamodb#ConditionalCheckFailedException":
            throw await de_ConditionalCheckFailedExceptionRes(parsedOutput, context);
        case "TransactionConflictException":
        case "com.amazonaws.dynamodb#TransactionConflictException":
            throw await de_TransactionConflictExceptionRes(parsedOutput, context);
        case "PolicyNotFoundException":
        case "com.amazonaws.dynamodb#PolicyNotFoundException":
            throw await de_PolicyNotFoundExceptionRes(parsedOutput, context);
        case "ExportNotFoundException":
        case "com.amazonaws.dynamodb#ExportNotFoundException":
            throw await de_ExportNotFoundExceptionRes(parsedOutput, context);
        case "GlobalTableNotFoundException":
        case "com.amazonaws.dynamodb#GlobalTableNotFoundException":
            throw await de_GlobalTableNotFoundExceptionRes(parsedOutput, context);
        case "ImportNotFoundException":
        case "com.amazonaws.dynamodb#ImportNotFoundException":
            throw await de_ImportNotFoundExceptionRes(parsedOutput, context);
        case "DuplicateItemException":
        case "com.amazonaws.dynamodb#DuplicateItemException":
            throw await de_DuplicateItemExceptionRes(parsedOutput, context);
        case "IdempotentParameterMismatchException":
        case "com.amazonaws.dynamodb#IdempotentParameterMismatchException":
            throw await de_IdempotentParameterMismatchExceptionRes(parsedOutput, context);
        case "TransactionCanceledException":
        case "com.amazonaws.dynamodb#TransactionCanceledException":
            throw await de_TransactionCanceledExceptionRes(parsedOutput, context);
        case "TransactionInProgressException":
        case "com.amazonaws.dynamodb#TransactionInProgressException":
            throw await de_TransactionInProgressExceptionRes(parsedOutput, context);
        case "ExportConflictException":
        case "com.amazonaws.dynamodb#ExportConflictException":
            throw await de_ExportConflictExceptionRes(parsedOutput, context);
        case "InvalidExportTimeException":
        case "com.amazonaws.dynamodb#InvalidExportTimeException":
            throw await de_InvalidExportTimeExceptionRes(parsedOutput, context);
        case "PointInTimeRecoveryUnavailableException":
        case "com.amazonaws.dynamodb#PointInTimeRecoveryUnavailableException":
            throw await de_PointInTimeRecoveryUnavailableExceptionRes(parsedOutput, context);
        case "ImportConflictException":
        case "com.amazonaws.dynamodb#ImportConflictException":
            throw await de_ImportConflictExceptionRes(parsedOutput, context);
        case "TableAlreadyExistsException":
        case "com.amazonaws.dynamodb#TableAlreadyExistsException":
            throw await de_TableAlreadyExistsExceptionRes(parsedOutput, context);
        case "InvalidRestoreTimeException":
        case "com.amazonaws.dynamodb#InvalidRestoreTimeException":
            throw await de_InvalidRestoreTimeExceptionRes(parsedOutput, context);
        case "ReplicaAlreadyExistsException":
        case "com.amazonaws.dynamodb#ReplicaAlreadyExistsException":
            throw await de_ReplicaAlreadyExistsExceptionRes(parsedOutput, context);
        case "ReplicaNotFoundException":
        case "com.amazonaws.dynamodb#ReplicaNotFoundException":
            throw await de_ReplicaNotFoundExceptionRes(parsedOutput, context);
        case "IndexNotFoundException":
        case "com.amazonaws.dynamodb#IndexNotFoundException":
            throw await de_IndexNotFoundExceptionRes(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            return throwDefaultError({
                output,
                parsedBody,
                errorCode,
            });
    }
};
const de_BackupInUseExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* BackupInUseException */.Y5({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_BackupNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* BackupNotFoundException */.p4({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ConditionalCheckFailedExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_ConditionalCheckFailedException(body, context);
    const exception = new models_0/* ConditionalCheckFailedException */.jP({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ContinuousBackupsUnavailableExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ContinuousBackupsUnavailableException */.k_({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_DuplicateItemExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* DuplicateItemException */.UU({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ExportConflictExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ExportConflictException */.TM({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ExportNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ExportNotFoundException */.v5({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_GlobalTableAlreadyExistsExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* GlobalTableAlreadyExistsException */.dV({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_GlobalTableNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* GlobalTableNotFoundException */.Gz({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_IdempotentParameterMismatchExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* IdempotentParameterMismatchException */.ah({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ImportConflictExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ImportConflictException */.nK({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ImportNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ImportNotFoundException */.EV({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_IndexNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* IndexNotFoundException */.l8({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_InternalServerErrorRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* InternalServerError */.PO({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_InvalidEndpointExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* InvalidEndpointException */.c2({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_InvalidExportTimeExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* InvalidExportTimeException */.Qf({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_InvalidRestoreTimeExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* InvalidRestoreTimeException */.wT({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ItemCollectionSizeLimitExceededExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ItemCollectionSizeLimitExceededException */.Ax({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_LimitExceededExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* LimitExceededException */.UC({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_PointInTimeRecoveryUnavailableExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* PointInTimeRecoveryUnavailableException */.by({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_PolicyNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* PolicyNotFoundException */.$F({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ProvisionedThroughputExceededExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ProvisionedThroughputExceededException */.FP({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ReplicaAlreadyExistsExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ReplicaAlreadyExistsException */.KV({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ReplicaNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ReplicaNotFoundException */.ZU({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ReplicatedWriteConflictExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ReplicatedWriteConflictException */.qF({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_RequestLimitExceededRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* RequestLimitExceeded */.kj({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ResourceInUseExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ResourceInUseException */.WT({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ResourceNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ResourceNotFoundException */.lB({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_TableAlreadyExistsExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* TableAlreadyExistsException */.kI({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_TableInUseExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* TableInUseException */.Ir({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_TableNotFoundExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* TableNotFoundException */.b9({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_ThrottlingExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* ThrottlingException */.x5({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_TransactionCanceledExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_TransactionCanceledException(body, context);
    const exception = new models_0/* TransactionCanceledException */.$Z({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_TransactionConflictExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* TransactionConflictException */.sQ({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const de_TransactionInProgressExceptionRes = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = (0,dist_es/* _json */.Ss)(body);
    const exception = new models_0/* TransactionInProgressException */.Er({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0,dist_es/* decorateServiceException */.Mw)(exception, body);
};
const se_AttributeUpdates = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_AttributeValueUpdate(value, context);
        return acc;
    }, {});
};
const se_AttributeValue = (input, context) => {
    return models_0/* AttributeValue */.eK.visit(input, {
        B: (value) => ({ B: context.base64Encoder(value) }),
        BOOL: (value) => ({ BOOL: value }),
        BS: (value) => ({ BS: se_BinarySetAttributeValue(value, context) }),
        L: (value) => ({ L: se_ListAttributeValue(value, context) }),
        M: (value) => ({ M: se_MapAttributeValue(value, context) }),
        N: (value) => ({ N: value }),
        NS: (value) => ({ NS: (0,dist_es/* _json */.Ss)(value) }),
        NULL: (value) => ({ NULL: value }),
        S: (value) => ({ S: value }),
        SS: (value) => ({ SS: (0,dist_es/* _json */.Ss)(value) }),
        _: (name, value) => ({ [name]: value }),
    });
};
const se_AttributeValueList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_AttributeValue(entry, context);
    });
};
const se_AttributeValueUpdate = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        Action: [],
        Value: (_) => se_AttributeValue(_, context),
    });
};
const se_AutoScalingPolicyUpdate = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        PolicyName: [],
        TargetTrackingScalingPolicyConfiguration: (_) => se_AutoScalingTargetTrackingScalingPolicyConfigurationUpdate(_, context),
    });
};
const se_AutoScalingSettingsUpdate = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        AutoScalingDisabled: [],
        AutoScalingRoleArn: [],
        MaximumUnits: [],
        MinimumUnits: [],
        ScalingPolicyUpdate: (_) => se_AutoScalingPolicyUpdate(_, context),
    });
};
const se_AutoScalingTargetTrackingScalingPolicyConfigurationUpdate = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        DisableScaleIn: [],
        ScaleInCooldown: [],
        ScaleOutCooldown: [],
        TargetValue: dist_es/* serializeFloat */.VA,
    });
};
const se_BatchExecuteStatementInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ReturnConsumedCapacity: [],
        Statements: (_) => se_PartiQLBatchRequest(_, context),
    });
};
const se_BatchGetItemInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        RequestItems: (_) => se_BatchGetRequestMap(_, context),
        ReturnConsumedCapacity: [],
    });
};
const se_BatchGetRequestMap = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_KeysAndAttributes(value, context);
        return acc;
    }, {});
};
const se_BatchStatementRequest = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ConsistentRead: [],
        Parameters: (_) => se_PreparedStatementParameters(_, context),
        ReturnValuesOnConditionCheckFailure: [],
        Statement: [],
    });
};
const se_BatchWriteItemInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        RequestItems: (_) => se_BatchWriteItemRequestMap(_, context),
        ReturnConsumedCapacity: [],
        ReturnItemCollectionMetrics: [],
    });
};
const se_BatchWriteItemRequestMap = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_WriteRequests(value, context);
        return acc;
    }, {});
};
const se_BinarySetAttributeValue = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return context.base64Encoder(entry);
    });
};
const se_Condition = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        AttributeValueList: (_) => se_AttributeValueList(_, context),
        ComparisonOperator: [],
    });
};
const se_ConditionCheck = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ConditionExpression: [],
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        ExpressionAttributeValues: (_) => se_ExpressionAttributeValueMap(_, context),
        Key: (_) => se_Key(_, context),
        ReturnValuesOnConditionCheckFailure: [],
        TableName: [],
    });
};
const se_Delete = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ConditionExpression: [],
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        ExpressionAttributeValues: (_) => se_ExpressionAttributeValueMap(_, context),
        Key: (_) => se_Key(_, context),
        ReturnValuesOnConditionCheckFailure: [],
        TableName: [],
    });
};
const se_DeleteItemInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ConditionExpression: [],
        ConditionalOperator: [],
        Expected: (_) => se_ExpectedAttributeMap(_, context),
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        ExpressionAttributeValues: (_) => se_ExpressionAttributeValueMap(_, context),
        Key: (_) => se_Key(_, context),
        ReturnConsumedCapacity: [],
        ReturnItemCollectionMetrics: [],
        ReturnValues: [],
        ReturnValuesOnConditionCheckFailure: [],
        TableName: [],
    });
};
const se_DeleteRequest = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        Key: (_) => se_Key(_, context),
    });
};
const se_ExecuteStatementInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ConsistentRead: [],
        Limit: [],
        NextToken: [],
        Parameters: (_) => se_PreparedStatementParameters(_, context),
        ReturnConsumedCapacity: [],
        ReturnValuesOnConditionCheckFailure: [],
        Statement: [],
    });
};
const se_ExecuteTransactionInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ClientRequestToken: [true, (_) => _ ?? (0,v4/* default */.A)()],
        ReturnConsumedCapacity: [],
        TransactStatements: (_) => se_ParameterizedStatements(_, context),
    });
};
const se_ExpectedAttributeMap = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_ExpectedAttributeValue(value, context);
        return acc;
    }, {});
};
const se_ExpectedAttributeValue = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        AttributeValueList: (_) => se_AttributeValueList(_, context),
        ComparisonOperator: [],
        Exists: [],
        Value: (_) => se_AttributeValue(_, context),
    });
};
const se_ExportTableToPointInTimeInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ClientToken: [true, (_) => _ ?? (0,v4/* default */.A)()],
        ExportFormat: [],
        ExportTime: (_) => _.getTime() / 1_000,
        ExportType: [],
        IncrementalExportSpecification: (_) => se_IncrementalExportSpecification(_, context),
        S3Bucket: [],
        S3BucketOwner: [],
        S3Prefix: [],
        S3SseAlgorithm: [],
        S3SseKmsKeyId: [],
        TableArn: [],
    });
};
const se_ExpressionAttributeValueMap = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_AttributeValue(value, context);
        return acc;
    }, {});
};
const se_FilterConditionMap = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_Condition(value, context);
        return acc;
    }, {});
};
const se_Get = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        Key: (_) => se_Key(_, context),
        ProjectionExpression: [],
        TableName: [],
    });
};
const se_GetItemInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        AttributesToGet: dist_es/* _json */.Ss,
        ConsistentRead: [],
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        Key: (_) => se_Key(_, context),
        ProjectionExpression: [],
        ReturnConsumedCapacity: [],
        TableName: [],
    });
};
const se_GlobalSecondaryIndexAutoScalingUpdate = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        IndexName: [],
        ProvisionedWriteCapacityAutoScalingUpdate: (_) => se_AutoScalingSettingsUpdate(_, context),
    });
};
const se_GlobalSecondaryIndexAutoScalingUpdateList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_GlobalSecondaryIndexAutoScalingUpdate(entry, context);
    });
};
const se_GlobalTableGlobalSecondaryIndexSettingsUpdate = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        IndexName: [],
        ProvisionedWriteCapacityAutoScalingSettingsUpdate: (_) => se_AutoScalingSettingsUpdate(_, context),
        ProvisionedWriteCapacityUnits: [],
    });
};
const se_GlobalTableGlobalSecondaryIndexSettingsUpdateList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_GlobalTableGlobalSecondaryIndexSettingsUpdate(entry, context);
    });
};
const se_ImportTableInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ClientToken: [true, (_) => _ ?? (0,v4/* default */.A)()],
        InputCompressionType: [],
        InputFormat: [],
        InputFormatOptions: dist_es/* _json */.Ss,
        S3BucketSource: dist_es/* _json */.Ss,
        TableCreationParameters: dist_es/* _json */.Ss,
    });
};
const se_IncrementalExportSpecification = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ExportFromTime: (_) => _.getTime() / 1_000,
        ExportToTime: (_) => _.getTime() / 1_000,
        ExportViewType: [],
    });
};
const se_Key = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_AttributeValue(value, context);
        return acc;
    }, {});
};
const se_KeyConditions = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_Condition(value, context);
        return acc;
    }, {});
};
const se_KeyList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_Key(entry, context);
    });
};
const se_KeysAndAttributes = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        AttributesToGet: dist_es/* _json */.Ss,
        ConsistentRead: [],
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        Keys: (_) => se_KeyList(_, context),
        ProjectionExpression: [],
    });
};
const se_ListAttributeValue = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_AttributeValue(entry, context);
    });
};
const se_ListBackupsInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        BackupType: [],
        ExclusiveStartBackupArn: [],
        Limit: [],
        TableName: [],
        TimeRangeLowerBound: (_) => _.getTime() / 1_000,
        TimeRangeUpperBound: (_) => _.getTime() / 1_000,
    });
};
const se_MapAttributeValue = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_AttributeValue(value, context);
        return acc;
    }, {});
};
const se_ParameterizedStatement = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        Parameters: (_) => se_PreparedStatementParameters(_, context),
        ReturnValuesOnConditionCheckFailure: [],
        Statement: [],
    });
};
const se_ParameterizedStatements = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_ParameterizedStatement(entry, context);
    });
};
const se_PartiQLBatchRequest = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_BatchStatementRequest(entry, context);
    });
};
const se_PreparedStatementParameters = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_AttributeValue(entry, context);
    });
};
const se_Put = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ConditionExpression: [],
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        ExpressionAttributeValues: (_) => se_ExpressionAttributeValueMap(_, context),
        Item: (_) => se_PutItemInputAttributeMap(_, context),
        ReturnValuesOnConditionCheckFailure: [],
        TableName: [],
    });
};
const se_PutItemInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ConditionExpression: [],
        ConditionalOperator: [],
        Expected: (_) => se_ExpectedAttributeMap(_, context),
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        ExpressionAttributeValues: (_) => se_ExpressionAttributeValueMap(_, context),
        Item: (_) => se_PutItemInputAttributeMap(_, context),
        ReturnConsumedCapacity: [],
        ReturnItemCollectionMetrics: [],
        ReturnValues: [],
        ReturnValuesOnConditionCheckFailure: [],
        TableName: [],
    });
};
const se_PutItemInputAttributeMap = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_AttributeValue(value, context);
        return acc;
    }, {});
};
const se_PutRequest = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        Item: (_) => se_PutItemInputAttributeMap(_, context),
    });
};
const se_QueryInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        AttributesToGet: dist_es/* _json */.Ss,
        ConditionalOperator: [],
        ConsistentRead: [],
        ExclusiveStartKey: (_) => se_Key(_, context),
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        ExpressionAttributeValues: (_) => se_ExpressionAttributeValueMap(_, context),
        FilterExpression: [],
        IndexName: [],
        KeyConditionExpression: [],
        KeyConditions: (_) => se_KeyConditions(_, context),
        Limit: [],
        ProjectionExpression: [],
        QueryFilter: (_) => se_FilterConditionMap(_, context),
        ReturnConsumedCapacity: [],
        ScanIndexForward: [],
        Select: [],
        TableName: [],
    });
};
const se_ReplicaAutoScalingUpdate = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        RegionName: [],
        ReplicaGlobalSecondaryIndexUpdates: (_) => se_ReplicaGlobalSecondaryIndexAutoScalingUpdateList(_, context),
        ReplicaProvisionedReadCapacityAutoScalingUpdate: (_) => se_AutoScalingSettingsUpdate(_, context),
    });
};
const se_ReplicaAutoScalingUpdateList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_ReplicaAutoScalingUpdate(entry, context);
    });
};
const se_ReplicaGlobalSecondaryIndexAutoScalingUpdate = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        IndexName: [],
        ProvisionedReadCapacityAutoScalingUpdate: (_) => se_AutoScalingSettingsUpdate(_, context),
    });
};
const se_ReplicaGlobalSecondaryIndexAutoScalingUpdateList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_ReplicaGlobalSecondaryIndexAutoScalingUpdate(entry, context);
    });
};
const se_ReplicaGlobalSecondaryIndexSettingsUpdate = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        IndexName: [],
        ProvisionedReadCapacityAutoScalingSettingsUpdate: (_) => se_AutoScalingSettingsUpdate(_, context),
        ProvisionedReadCapacityUnits: [],
    });
};
const se_ReplicaGlobalSecondaryIndexSettingsUpdateList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_ReplicaGlobalSecondaryIndexSettingsUpdate(entry, context);
    });
};
const se_ReplicaSettingsUpdate = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        RegionName: [],
        ReplicaGlobalSecondaryIndexSettingsUpdate: (_) => se_ReplicaGlobalSecondaryIndexSettingsUpdateList(_, context),
        ReplicaProvisionedReadCapacityAutoScalingSettingsUpdate: (_) => se_AutoScalingSettingsUpdate(_, context),
        ReplicaProvisionedReadCapacityUnits: [],
        ReplicaTableClass: [],
    });
};
const se_ReplicaSettingsUpdateList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_ReplicaSettingsUpdate(entry, context);
    });
};
const se_RestoreTableToPointInTimeInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        BillingModeOverride: [],
        GlobalSecondaryIndexOverride: dist_es/* _json */.Ss,
        LocalSecondaryIndexOverride: dist_es/* _json */.Ss,
        OnDemandThroughputOverride: dist_es/* _json */.Ss,
        ProvisionedThroughputOverride: dist_es/* _json */.Ss,
        RestoreDateTime: (_) => _.getTime() / 1_000,
        SSESpecificationOverride: dist_es/* _json */.Ss,
        SourceTableArn: [],
        SourceTableName: [],
        TargetTableName: [],
        UseLatestRestorableTime: [],
    });
};
const se_ScanInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        AttributesToGet: dist_es/* _json */.Ss,
        ConditionalOperator: [],
        ConsistentRead: [],
        ExclusiveStartKey: (_) => se_Key(_, context),
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        ExpressionAttributeValues: (_) => se_ExpressionAttributeValueMap(_, context),
        FilterExpression: [],
        IndexName: [],
        Limit: [],
        ProjectionExpression: [],
        ReturnConsumedCapacity: [],
        ScanFilter: (_) => se_FilterConditionMap(_, context),
        Segment: [],
        Select: [],
        TableName: [],
        TotalSegments: [],
    });
};
const se_TransactGetItem = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        Get: (_) => se_Get(_, context),
    });
};
const se_TransactGetItemList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_TransactGetItem(entry, context);
    });
};
const se_TransactGetItemsInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ReturnConsumedCapacity: [],
        TransactItems: (_) => se_TransactGetItemList(_, context),
    });
};
const se_TransactWriteItem = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ConditionCheck: (_) => se_ConditionCheck(_, context),
        Delete: (_) => se_Delete(_, context),
        Put: (_) => se_Put(_, context),
        Update: (_) => se_Update(_, context),
    });
};
const se_TransactWriteItemList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_TransactWriteItem(entry, context);
    });
};
const se_TransactWriteItemsInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ClientRequestToken: [true, (_) => _ ?? (0,v4/* default */.A)()],
        ReturnConsumedCapacity: [],
        ReturnItemCollectionMetrics: [],
        TransactItems: (_) => se_TransactWriteItemList(_, context),
    });
};
const se_Update = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        ConditionExpression: [],
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        ExpressionAttributeValues: (_) => se_ExpressionAttributeValueMap(_, context),
        Key: (_) => se_Key(_, context),
        ReturnValuesOnConditionCheckFailure: [],
        TableName: [],
        UpdateExpression: [],
    });
};
const se_UpdateGlobalTableSettingsInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        GlobalTableBillingMode: [],
        GlobalTableGlobalSecondaryIndexSettingsUpdate: (_) => se_GlobalTableGlobalSecondaryIndexSettingsUpdateList(_, context),
        GlobalTableName: [],
        GlobalTableProvisionedWriteCapacityAutoScalingSettingsUpdate: (_) => se_AutoScalingSettingsUpdate(_, context),
        GlobalTableProvisionedWriteCapacityUnits: [],
        ReplicaSettingsUpdate: (_) => se_ReplicaSettingsUpdateList(_, context),
    });
};
const se_UpdateItemInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        AttributeUpdates: (_) => se_AttributeUpdates(_, context),
        ConditionExpression: [],
        ConditionalOperator: [],
        Expected: (_) => se_ExpectedAttributeMap(_, context),
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        ExpressionAttributeValues: (_) => se_ExpressionAttributeValueMap(_, context),
        Key: (_) => se_Key(_, context),
        ReturnConsumedCapacity: [],
        ReturnItemCollectionMetrics: [],
        ReturnValues: [],
        ReturnValuesOnConditionCheckFailure: [],
        TableName: [],
        UpdateExpression: [],
    });
};
const se_UpdateTableReplicaAutoScalingInput = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        GlobalSecondaryIndexUpdates: (_) => se_GlobalSecondaryIndexAutoScalingUpdateList(_, context),
        ProvisionedWriteCapacityAutoScalingUpdate: (_) => se_AutoScalingSettingsUpdate(_, context),
        ReplicaUpdates: (_) => se_ReplicaAutoScalingUpdateList(_, context),
        TableName: [],
    });
};
const se_WriteRequest = (input, context) => {
    return (0,dist_es/* take */.s)(input, {
        DeleteRequest: (_) => se_DeleteRequest(_, context),
        PutRequest: (_) => se_PutRequest(_, context),
    });
};
const se_WriteRequests = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_WriteRequest(entry, context);
    });
};
const de_ArchivalSummary = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ArchivalBackupArn: dist_es/* expectString */.lK,
        ArchivalDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        ArchivalReason: dist_es/* expectString */.lK,
    });
};
const de_AttributeMap = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_AttributeValue(awsExpectUnion(value), context);
        return acc;
    }, {});
};
const de_AttributeValue = (output, context) => {
    if (output.B != null) {
        return {
            B: context.base64Decoder(output.B),
        };
    }
    if ((0,dist_es/* expectBoolean */.ak)(output.BOOL) !== undefined) {
        return { BOOL: (0,dist_es/* expectBoolean */.ak)(output.BOOL) };
    }
    if (output.BS != null) {
        return {
            BS: de_BinarySetAttributeValue(output.BS, context),
        };
    }
    if (output.L != null) {
        return {
            L: de_ListAttributeValue(output.L, context),
        };
    }
    if (output.M != null) {
        return {
            M: de_MapAttributeValue(output.M, context),
        };
    }
    if ((0,dist_es/* expectString */.lK)(output.N) !== undefined) {
        return { N: (0,dist_es/* expectString */.lK)(output.N) };
    }
    if (output.NS != null) {
        return {
            NS: (0,dist_es/* _json */.Ss)(output.NS),
        };
    }
    if ((0,dist_es/* expectBoolean */.ak)(output.NULL) !== undefined) {
        return { NULL: (0,dist_es/* expectBoolean */.ak)(output.NULL) };
    }
    if ((0,dist_es/* expectString */.lK)(output.S) !== undefined) {
        return { S: (0,dist_es/* expectString */.lK)(output.S) };
    }
    if (output.SS != null) {
        return {
            SS: (0,dist_es/* _json */.Ss)(output.SS),
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
const de_AutoScalingPolicyDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        PolicyName: dist_es/* expectString */.lK,
        TargetTrackingScalingPolicyConfiguration: (_) => de_AutoScalingTargetTrackingScalingPolicyConfigurationDescription(_, context),
    });
};
const de_AutoScalingPolicyDescriptionList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_AutoScalingPolicyDescription(entry, context);
    });
    return retVal;
};
const de_AutoScalingSettingsDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        AutoScalingDisabled: dist_es/* expectBoolean */.ak,
        AutoScalingRoleArn: dist_es/* expectString */.lK,
        MaximumUnits: dist_es/* expectLong */.Yy,
        MinimumUnits: dist_es/* expectLong */.Yy,
        ScalingPolicies: (_) => de_AutoScalingPolicyDescriptionList(_, context),
    });
};
const de_AutoScalingTargetTrackingScalingPolicyConfigurationDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        DisableScaleIn: dist_es/* expectBoolean */.ak,
        ScaleInCooldown: dist_es/* expectInt32 */.ET,
        ScaleOutCooldown: dist_es/* expectInt32 */.ET,
        TargetValue: dist_es/* limitedParseDouble */.JW,
    });
};
const de_BackupDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        BackupDetails: (_) => de_BackupDetails(_, context),
        SourceTableDetails: (_) => de_SourceTableDetails(_, context),
        SourceTableFeatureDetails: (_) => de_SourceTableFeatureDetails(_, context),
    });
};
const de_BackupDetails = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        BackupArn: dist_es/* expectString */.lK,
        BackupCreationDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        BackupExpiryDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        BackupName: dist_es/* expectString */.lK,
        BackupSizeBytes: dist_es/* expectLong */.Yy,
        BackupStatus: dist_es/* expectString */.lK,
        BackupType: dist_es/* expectString */.lK,
    });
};
const de_BackupSummaries = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_BackupSummary(entry, context);
    });
    return retVal;
};
const de_BackupSummary = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        BackupArn: dist_es/* expectString */.lK,
        BackupCreationDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        BackupExpiryDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        BackupName: dist_es/* expectString */.lK,
        BackupSizeBytes: dist_es/* expectLong */.Yy,
        BackupStatus: dist_es/* expectString */.lK,
        BackupType: dist_es/* expectString */.lK,
        TableArn: dist_es/* expectString */.lK,
        TableId: dist_es/* expectString */.lK,
        TableName: dist_es/* expectString */.lK,
    });
};
const de_BatchExecuteStatementOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ConsumedCapacity: (_) => de_ConsumedCapacityMultiple(_, context),
        Responses: (_) => de_PartiQLBatchResponse(_, context),
    });
};
const de_BatchGetItemOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ConsumedCapacity: (_) => de_ConsumedCapacityMultiple(_, context),
        Responses: (_) => de_BatchGetResponseMap(_, context),
        UnprocessedKeys: (_) => de_BatchGetRequestMap(_, context),
    });
};
const de_BatchGetRequestMap = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_KeysAndAttributes(value, context);
        return acc;
    }, {});
};
const de_BatchGetResponseMap = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_ItemList(value, context);
        return acc;
    }, {});
};
const de_BatchStatementError = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Code: dist_es/* expectString */.lK,
        Item: (_) => de_AttributeMap(_, context),
        Message: dist_es/* expectString */.lK,
    });
};
const de_BatchStatementResponse = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Error: (_) => de_BatchStatementError(_, context),
        Item: (_) => de_AttributeMap(_, context),
        TableName: dist_es/* expectString */.lK,
    });
};
const de_BatchWriteItemOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ConsumedCapacity: (_) => de_ConsumedCapacityMultiple(_, context),
        ItemCollectionMetrics: (_) => de_ItemCollectionMetricsPerTable(_, context),
        UnprocessedItems: (_) => de_BatchWriteItemRequestMap(_, context),
    });
};
const de_BatchWriteItemRequestMap = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_WriteRequests(value, context);
        return acc;
    }, {});
};
const de_BillingModeSummary = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        BillingMode: dist_es/* expectString */.lK,
        LastUpdateToPayPerRequestDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
    });
};
const de_BinarySetAttributeValue = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return context.base64Decoder(entry);
    });
    return retVal;
};
const de_CancellationReason = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Code: dist_es/* expectString */.lK,
        Item: (_) => de_AttributeMap(_, context),
        Message: dist_es/* expectString */.lK,
    });
};
const de_CancellationReasonList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_CancellationReason(entry, context);
    });
    return retVal;
};
const de_Capacity = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        CapacityUnits: dist_es/* limitedParseDouble */.JW,
        ReadCapacityUnits: dist_es/* limitedParseDouble */.JW,
        WriteCapacityUnits: dist_es/* limitedParseDouble */.JW,
    });
};
const de_ConditionalCheckFailedException = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Item: (_) => de_AttributeMap(_, context),
        message: dist_es/* expectString */.lK,
    });
};
const de_ConsumedCapacity = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        CapacityUnits: dist_es/* limitedParseDouble */.JW,
        GlobalSecondaryIndexes: (_) => de_SecondaryIndexesCapacityMap(_, context),
        LocalSecondaryIndexes: (_) => de_SecondaryIndexesCapacityMap(_, context),
        ReadCapacityUnits: dist_es/* limitedParseDouble */.JW,
        Table: (_) => de_Capacity(_, context),
        TableName: dist_es/* expectString */.lK,
        WriteCapacityUnits: dist_es/* limitedParseDouble */.JW,
    });
};
const de_ConsumedCapacityMultiple = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_ConsumedCapacity(entry, context);
    });
    return retVal;
};
const de_ContinuousBackupsDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ContinuousBackupsStatus: dist_es/* expectString */.lK,
        PointInTimeRecoveryDescription: (_) => de_PointInTimeRecoveryDescription(_, context),
    });
};
const de_CreateBackupOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        BackupDetails: (_) => de_BackupDetails(_, context),
    });
};
const de_CreateGlobalTableOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        GlobalTableDescription: (_) => de_GlobalTableDescription(_, context),
    });
};
const de_CreateTableOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        TableDescription: (_) => de_TableDescription(_, context),
    });
};
const de_DeleteBackupOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        BackupDescription: (_) => de_BackupDescription(_, context),
    });
};
const de_DeleteItemOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Attributes: (_) => de_AttributeMap(_, context),
        ConsumedCapacity: (_) => de_ConsumedCapacity(_, context),
        ItemCollectionMetrics: (_) => de_ItemCollectionMetrics(_, context),
    });
};
const de_DeleteRequest = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Key: (_) => de_Key(_, context),
    });
};
const de_DeleteTableOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        TableDescription: (_) => de_TableDescription(_, context),
    });
};
const de_DescribeBackupOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        BackupDescription: (_) => de_BackupDescription(_, context),
    });
};
const de_DescribeContinuousBackupsOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ContinuousBackupsDescription: (_) => de_ContinuousBackupsDescription(_, context),
    });
};
const de_DescribeContributorInsightsOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ContributorInsightsMode: dist_es/* expectString */.lK,
        ContributorInsightsRuleList: dist_es/* _json */.Ss,
        ContributorInsightsStatus: dist_es/* expectString */.lK,
        FailureException: dist_es/* _json */.Ss,
        IndexName: dist_es/* expectString */.lK,
        LastUpdateDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        TableName: dist_es/* expectString */.lK,
    });
};
const de_DescribeExportOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ExportDescription: (_) => de_ExportDescription(_, context),
    });
};
const de_DescribeGlobalTableOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        GlobalTableDescription: (_) => de_GlobalTableDescription(_, context),
    });
};
const de_DescribeGlobalTableSettingsOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        GlobalTableName: dist_es/* expectString */.lK,
        ReplicaSettings: (_) => de_ReplicaSettingsDescriptionList(_, context),
    });
};
const de_DescribeImportOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ImportTableDescription: (_) => de_ImportTableDescription(_, context),
    });
};
const de_DescribeTableOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Table: (_) => de_TableDescription(_, context),
    });
};
const de_DescribeTableReplicaAutoScalingOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        TableAutoScalingDescription: (_) => de_TableAutoScalingDescription(_, context),
    });
};
const de_ExecuteStatementOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ConsumedCapacity: (_) => de_ConsumedCapacity(_, context),
        Items: (_) => de_ItemList(_, context),
        LastEvaluatedKey: (_) => de_Key(_, context),
        NextToken: dist_es/* expectString */.lK,
    });
};
const de_ExecuteTransactionOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ConsumedCapacity: (_) => de_ConsumedCapacityMultiple(_, context),
        Responses: (_) => de_ItemResponseList(_, context),
    });
};
const de_ExportDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        BilledSizeBytes: dist_es/* expectLong */.Yy,
        ClientToken: dist_es/* expectString */.lK,
        EndTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        ExportArn: dist_es/* expectString */.lK,
        ExportFormat: dist_es/* expectString */.lK,
        ExportManifest: dist_es/* expectString */.lK,
        ExportStatus: dist_es/* expectString */.lK,
        ExportTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        ExportType: dist_es/* expectString */.lK,
        FailureCode: dist_es/* expectString */.lK,
        FailureMessage: dist_es/* expectString */.lK,
        IncrementalExportSpecification: (_) => de_IncrementalExportSpecification(_, context),
        ItemCount: dist_es/* expectLong */.Yy,
        S3Bucket: dist_es/* expectString */.lK,
        S3BucketOwner: dist_es/* expectString */.lK,
        S3Prefix: dist_es/* expectString */.lK,
        S3SseAlgorithm: dist_es/* expectString */.lK,
        S3SseKmsKeyId: dist_es/* expectString */.lK,
        StartTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        TableArn: dist_es/* expectString */.lK,
        TableId: dist_es/* expectString */.lK,
    });
};
const de_ExportTableToPointInTimeOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ExportDescription: (_) => de_ExportDescription(_, context),
    });
};
const de_GetItemOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ConsumedCapacity: (_) => de_ConsumedCapacity(_, context),
        Item: (_) => de_AttributeMap(_, context),
    });
};
const de_GlobalSecondaryIndexDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Backfilling: dist_es/* expectBoolean */.ak,
        IndexArn: dist_es/* expectString */.lK,
        IndexName: dist_es/* expectString */.lK,
        IndexSizeBytes: dist_es/* expectLong */.Yy,
        IndexStatus: dist_es/* expectString */.lK,
        ItemCount: dist_es/* expectLong */.Yy,
        KeySchema: dist_es/* _json */.Ss,
        OnDemandThroughput: dist_es/* _json */.Ss,
        Projection: dist_es/* _json */.Ss,
        ProvisionedThroughput: (_) => de_ProvisionedThroughputDescription(_, context),
        WarmThroughput: dist_es/* _json */.Ss,
    });
};
const de_GlobalSecondaryIndexDescriptionList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_GlobalSecondaryIndexDescription(entry, context);
    });
    return retVal;
};
const de_GlobalTableDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        CreationDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        GlobalTableArn: dist_es/* expectString */.lK,
        GlobalTableName: dist_es/* expectString */.lK,
        GlobalTableStatus: dist_es/* expectString */.lK,
        ReplicationGroup: (_) => de_ReplicaDescriptionList(_, context),
    });
};
const de_ImportSummary = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        CloudWatchLogGroupArn: dist_es/* expectString */.lK,
        EndTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        ImportArn: dist_es/* expectString */.lK,
        ImportStatus: dist_es/* expectString */.lK,
        InputFormat: dist_es/* expectString */.lK,
        S3BucketSource: dist_es/* _json */.Ss,
        StartTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        TableArn: dist_es/* expectString */.lK,
    });
};
const de_ImportSummaryList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_ImportSummary(entry, context);
    });
    return retVal;
};
const de_ImportTableDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ClientToken: dist_es/* expectString */.lK,
        CloudWatchLogGroupArn: dist_es/* expectString */.lK,
        EndTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        ErrorCount: dist_es/* expectLong */.Yy,
        FailureCode: dist_es/* expectString */.lK,
        FailureMessage: dist_es/* expectString */.lK,
        ImportArn: dist_es/* expectString */.lK,
        ImportStatus: dist_es/* expectString */.lK,
        ImportedItemCount: dist_es/* expectLong */.Yy,
        InputCompressionType: dist_es/* expectString */.lK,
        InputFormat: dist_es/* expectString */.lK,
        InputFormatOptions: dist_es/* _json */.Ss,
        ProcessedItemCount: dist_es/* expectLong */.Yy,
        ProcessedSizeBytes: dist_es/* expectLong */.Yy,
        S3BucketSource: dist_es/* _json */.Ss,
        StartTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        TableArn: dist_es/* expectString */.lK,
        TableCreationParameters: dist_es/* _json */.Ss,
        TableId: dist_es/* expectString */.lK,
    });
};
const de_ImportTableOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ImportTableDescription: (_) => de_ImportTableDescription(_, context),
    });
};
const de_IncrementalExportSpecification = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ExportFromTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        ExportToTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        ExportViewType: dist_es/* expectString */.lK,
    });
};
const de_ItemCollectionKeyAttributeMap = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_AttributeValue(awsExpectUnion(value), context);
        return acc;
    }, {});
};
const de_ItemCollectionMetrics = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ItemCollectionKey: (_) => de_ItemCollectionKeyAttributeMap(_, context),
        SizeEstimateRangeGB: (_) => de_ItemCollectionSizeEstimateRange(_, context),
    });
};
const de_ItemCollectionMetricsMultiple = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_ItemCollectionMetrics(entry, context);
    });
    return retVal;
};
const de_ItemCollectionMetricsPerTable = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_ItemCollectionMetricsMultiple(value, context);
        return acc;
    }, {});
};
const de_ItemCollectionSizeEstimateRange = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return (0,dist_es/* limitedParseDouble */.JW)(entry);
    });
    return retVal;
};
const de_ItemList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_AttributeMap(entry, context);
    });
    return retVal;
};
const de_ItemResponse = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Item: (_) => de_AttributeMap(_, context),
    });
};
const de_ItemResponseList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_ItemResponse(entry, context);
    });
    return retVal;
};
const de_Key = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_AttributeValue(awsExpectUnion(value), context);
        return acc;
    }, {});
};
const de_KeyList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_Key(entry, context);
    });
    return retVal;
};
const de_KeysAndAttributes = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        AttributesToGet: dist_es/* _json */.Ss,
        ConsistentRead: dist_es/* expectBoolean */.ak,
        ExpressionAttributeNames: dist_es/* _json */.Ss,
        Keys: (_) => de_KeyList(_, context),
        ProjectionExpression: dist_es/* expectString */.lK,
    });
};
const de_ListAttributeValue = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_AttributeValue(awsExpectUnion(entry), context);
    });
    return retVal;
};
const de_ListBackupsOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        BackupSummaries: (_) => de_BackupSummaries(_, context),
        LastEvaluatedBackupArn: dist_es/* expectString */.lK,
    });
};
const de_ListImportsOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ImportSummaryList: (_) => de_ImportSummaryList(_, context),
        NextToken: dist_es/* expectString */.lK,
    });
};
const de_MapAttributeValue = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_AttributeValue(awsExpectUnion(value), context);
        return acc;
    }, {});
};
const de_PartiQLBatchResponse = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_BatchStatementResponse(entry, context);
    });
    return retVal;
};
const de_PointInTimeRecoveryDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        EarliestRestorableDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        LatestRestorableDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        PointInTimeRecoveryStatus: dist_es/* expectString */.lK,
        RecoveryPeriodInDays: dist_es/* expectInt32 */.ET,
    });
};
const de_ProvisionedThroughputDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        LastDecreaseDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        LastIncreaseDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        NumberOfDecreasesToday: dist_es/* expectLong */.Yy,
        ReadCapacityUnits: dist_es/* expectLong */.Yy,
        WriteCapacityUnits: dist_es/* expectLong */.Yy,
    });
};
const de_PutItemInputAttributeMap = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_AttributeValue(awsExpectUnion(value), context);
        return acc;
    }, {});
};
const de_PutItemOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Attributes: (_) => de_AttributeMap(_, context),
        ConsumedCapacity: (_) => de_ConsumedCapacity(_, context),
        ItemCollectionMetrics: (_) => de_ItemCollectionMetrics(_, context),
    });
};
const de_PutRequest = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Item: (_) => de_PutItemInputAttributeMap(_, context),
    });
};
const de_QueryOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ConsumedCapacity: (_) => de_ConsumedCapacity(_, context),
        Count: dist_es/* expectInt32 */.ET,
        Items: (_) => de_ItemList(_, context),
        LastEvaluatedKey: (_) => de_Key(_, context),
        ScannedCount: dist_es/* expectInt32 */.ET,
    });
};
const de_ReplicaAutoScalingDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        GlobalSecondaryIndexes: (_) => de_ReplicaGlobalSecondaryIndexAutoScalingDescriptionList(_, context),
        RegionName: dist_es/* expectString */.lK,
        ReplicaProvisionedReadCapacityAutoScalingSettings: (_) => de_AutoScalingSettingsDescription(_, context),
        ReplicaProvisionedWriteCapacityAutoScalingSettings: (_) => de_AutoScalingSettingsDescription(_, context),
        ReplicaStatus: dist_es/* expectString */.lK,
    });
};
const de_ReplicaAutoScalingDescriptionList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_ReplicaAutoScalingDescription(entry, context);
    });
    return retVal;
};
const de_ReplicaDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        GlobalSecondaryIndexes: dist_es/* _json */.Ss,
        KMSMasterKeyId: dist_es/* expectString */.lK,
        OnDemandThroughputOverride: dist_es/* _json */.Ss,
        ProvisionedThroughputOverride: dist_es/* _json */.Ss,
        RegionName: dist_es/* expectString */.lK,
        ReplicaInaccessibleDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        ReplicaStatus: dist_es/* expectString */.lK,
        ReplicaStatusDescription: dist_es/* expectString */.lK,
        ReplicaStatusPercentProgress: dist_es/* expectString */.lK,
        ReplicaTableClassSummary: (_) => de_TableClassSummary(_, context),
        WarmThroughput: dist_es/* _json */.Ss,
    });
};
const de_ReplicaDescriptionList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_ReplicaDescription(entry, context);
    });
    return retVal;
};
const de_ReplicaGlobalSecondaryIndexAutoScalingDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        IndexName: dist_es/* expectString */.lK,
        IndexStatus: dist_es/* expectString */.lK,
        ProvisionedReadCapacityAutoScalingSettings: (_) => de_AutoScalingSettingsDescription(_, context),
        ProvisionedWriteCapacityAutoScalingSettings: (_) => de_AutoScalingSettingsDescription(_, context),
    });
};
const de_ReplicaGlobalSecondaryIndexAutoScalingDescriptionList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_ReplicaGlobalSecondaryIndexAutoScalingDescription(entry, context);
    });
    return retVal;
};
const de_ReplicaGlobalSecondaryIndexSettingsDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        IndexName: dist_es/* expectString */.lK,
        IndexStatus: dist_es/* expectString */.lK,
        ProvisionedReadCapacityAutoScalingSettings: (_) => de_AutoScalingSettingsDescription(_, context),
        ProvisionedReadCapacityUnits: dist_es/* expectLong */.Yy,
        ProvisionedWriteCapacityAutoScalingSettings: (_) => de_AutoScalingSettingsDescription(_, context),
        ProvisionedWriteCapacityUnits: dist_es/* expectLong */.Yy,
    });
};
const de_ReplicaGlobalSecondaryIndexSettingsDescriptionList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_ReplicaGlobalSecondaryIndexSettingsDescription(entry, context);
    });
    return retVal;
};
const de_ReplicaSettingsDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        RegionName: dist_es/* expectString */.lK,
        ReplicaBillingModeSummary: (_) => de_BillingModeSummary(_, context),
        ReplicaGlobalSecondaryIndexSettings: (_) => de_ReplicaGlobalSecondaryIndexSettingsDescriptionList(_, context),
        ReplicaProvisionedReadCapacityAutoScalingSettings: (_) => de_AutoScalingSettingsDescription(_, context),
        ReplicaProvisionedReadCapacityUnits: dist_es/* expectLong */.Yy,
        ReplicaProvisionedWriteCapacityAutoScalingSettings: (_) => de_AutoScalingSettingsDescription(_, context),
        ReplicaProvisionedWriteCapacityUnits: dist_es/* expectLong */.Yy,
        ReplicaStatus: dist_es/* expectString */.lK,
        ReplicaTableClassSummary: (_) => de_TableClassSummary(_, context),
    });
};
const de_ReplicaSettingsDescriptionList = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_ReplicaSettingsDescription(entry, context);
    });
    return retVal;
};
const de_RestoreSummary = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        RestoreDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        RestoreInProgress: dist_es/* expectBoolean */.ak,
        SourceBackupArn: dist_es/* expectString */.lK,
        SourceTableArn: dist_es/* expectString */.lK,
    });
};
const de_RestoreTableFromBackupOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        TableDescription: (_) => de_TableDescription(_, context),
    });
};
const de_RestoreTableToPointInTimeOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        TableDescription: (_) => de_TableDescription(_, context),
    });
};
const de_ScanOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ConsumedCapacity: (_) => de_ConsumedCapacity(_, context),
        Count: dist_es/* expectInt32 */.ET,
        Items: (_) => de_ItemList(_, context),
        LastEvaluatedKey: (_) => de_Key(_, context),
        ScannedCount: dist_es/* expectInt32 */.ET,
    });
};
const de_SecondaryIndexesCapacityMap = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_Capacity(value, context);
        return acc;
    }, {});
};
const de_SourceTableDetails = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        BillingMode: dist_es/* expectString */.lK,
        ItemCount: dist_es/* expectLong */.Yy,
        KeySchema: dist_es/* _json */.Ss,
        OnDemandThroughput: dist_es/* _json */.Ss,
        ProvisionedThroughput: dist_es/* _json */.Ss,
        TableArn: dist_es/* expectString */.lK,
        TableCreationDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        TableId: dist_es/* expectString */.lK,
        TableName: dist_es/* expectString */.lK,
        TableSizeBytes: dist_es/* expectLong */.Yy,
    });
};
const de_SourceTableFeatureDetails = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        GlobalSecondaryIndexes: dist_es/* _json */.Ss,
        LocalSecondaryIndexes: dist_es/* _json */.Ss,
        SSEDescription: (_) => de_SSEDescription(_, context),
        StreamDescription: dist_es/* _json */.Ss,
        TimeToLiveDescription: dist_es/* _json */.Ss,
    });
};
const de_SSEDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        InaccessibleEncryptionDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        KMSMasterKeyArn: dist_es/* expectString */.lK,
        SSEType: dist_es/* expectString */.lK,
        Status: dist_es/* expectString */.lK,
    });
};
const de_TableAutoScalingDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Replicas: (_) => de_ReplicaAutoScalingDescriptionList(_, context),
        TableName: dist_es/* expectString */.lK,
        TableStatus: dist_es/* expectString */.lK,
    });
};
const de_TableClassSummary = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        LastUpdateDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        TableClass: dist_es/* expectString */.lK,
    });
};
const de_TableDescription = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ArchivalSummary: (_) => de_ArchivalSummary(_, context),
        AttributeDefinitions: dist_es/* _json */.Ss,
        BillingModeSummary: (_) => de_BillingModeSummary(_, context),
        CreationDateTime: (_) => (0,dist_es/* expectNonNull */.Y0)((0,dist_es/* parseEpochTimestamp */.l3)((0,dist_es/* expectNumber */.r$)(_))),
        DeletionProtectionEnabled: dist_es/* expectBoolean */.ak,
        GlobalSecondaryIndexes: (_) => de_GlobalSecondaryIndexDescriptionList(_, context),
        GlobalTableVersion: dist_es/* expectString */.lK,
        GlobalTableWitnesses: dist_es/* _json */.Ss,
        ItemCount: dist_es/* expectLong */.Yy,
        KeySchema: dist_es/* _json */.Ss,
        LatestStreamArn: dist_es/* expectString */.lK,
        LatestStreamLabel: dist_es/* expectString */.lK,
        LocalSecondaryIndexes: dist_es/* _json */.Ss,
        MultiRegionConsistency: dist_es/* expectString */.lK,
        OnDemandThroughput: dist_es/* _json */.Ss,
        ProvisionedThroughput: (_) => de_ProvisionedThroughputDescription(_, context),
        Replicas: (_) => de_ReplicaDescriptionList(_, context),
        RestoreSummary: (_) => de_RestoreSummary(_, context),
        SSEDescription: (_) => de_SSEDescription(_, context),
        StreamSpecification: dist_es/* _json */.Ss,
        TableArn: dist_es/* expectString */.lK,
        TableClassSummary: (_) => de_TableClassSummary(_, context),
        TableId: dist_es/* expectString */.lK,
        TableName: dist_es/* expectString */.lK,
        TableSizeBytes: dist_es/* expectLong */.Yy,
        TableStatus: dist_es/* expectString */.lK,
        WarmThroughput: dist_es/* _json */.Ss,
    });
};
const de_TransactGetItemsOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ConsumedCapacity: (_) => de_ConsumedCapacityMultiple(_, context),
        Responses: (_) => de_ItemResponseList(_, context),
    });
};
const de_TransactionCanceledException = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        CancellationReasons: (_) => de_CancellationReasonList(_, context),
        Message: dist_es/* expectString */.lK,
    });
};
const de_TransactWriteItemsOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ConsumedCapacity: (_) => de_ConsumedCapacityMultiple(_, context),
        ItemCollectionMetrics: (_) => de_ItemCollectionMetricsPerTable(_, context),
    });
};
const de_UpdateContinuousBackupsOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        ContinuousBackupsDescription: (_) => de_ContinuousBackupsDescription(_, context),
    });
};
const de_UpdateGlobalTableOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        GlobalTableDescription: (_) => de_GlobalTableDescription(_, context),
    });
};
const de_UpdateGlobalTableSettingsOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        GlobalTableName: dist_es/* expectString */.lK,
        ReplicaSettings: (_) => de_ReplicaSettingsDescriptionList(_, context),
    });
};
const de_UpdateItemOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        Attributes: (_) => de_AttributeMap(_, context),
        ConsumedCapacity: (_) => de_ConsumedCapacity(_, context),
        ItemCollectionMetrics: (_) => de_ItemCollectionMetrics(_, context),
    });
};
const de_UpdateTableOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        TableDescription: (_) => de_TableDescription(_, context),
    });
};
const de_UpdateTableReplicaAutoScalingOutput = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        TableAutoScalingDescription: (_) => de_TableAutoScalingDescription(_, context),
    });
};
const de_WriteRequest = (output, context) => {
    return (0,dist_es/* take */.s)(output, {
        DeleteRequest: (_) => de_DeleteRequest(_, context),
        PutRequest: (_) => de_PutRequest(_, context),
    });
};
const de_WriteRequests = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_WriteRequest(entry, context);
    });
    return retVal;
};
const deserializeMetadata = (output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"],
});
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const throwDefaultError = (0,dist_es/* withBaseException */.jr)(DynamoDBServiceException/* DynamoDBServiceException */.H);
const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
        headers,
    };
    if (resolvedHostname !== undefined) {
        contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
        contents.body = body;
    }
    return new protocol_http_dist_es/* HttpRequest */.Kd(contents);
};
function sharedHeaders(operation) {
    return {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": `DynamoDB_20120810.${operation}`,
    };
}


/***/ }),

/***/ 8611:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 8619:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ esm_node_validate)
});

;// ./node_modules/uuid/dist/esm-node/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// ./node_modules/uuid/dist/esm-node/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ const esm_node_validate = (validate);

/***/ }),

/***/ 8789:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Buffer = (__webpack_require__(2861).Buffer);
var crypto = __webpack_require__(6982);
var formatEcdsa = __webpack_require__(2010);
var util = __webpack_require__(9023);

var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".'
var MSG_INVALID_SECRET = 'secret must be a string or buffer';
var MSG_INVALID_VERIFIER_KEY = 'key must be a string or a buffer';
var MSG_INVALID_SIGNER_KEY = 'key must be a string, a buffer or an object';

var supportsKeyObjects = typeof crypto.createPublicKey === 'function';
if (supportsKeyObjects) {
  MSG_INVALID_VERIFIER_KEY += ' or a KeyObject';
  MSG_INVALID_SECRET += 'or a KeyObject';
}

function checkIsPublicKey(key) {
  if (Buffer.isBuffer(key)) {
    return;
  }

  if (typeof key === 'string') {
    return;
  }

  if (!supportsKeyObjects) {
    throw typeError(MSG_INVALID_VERIFIER_KEY);
  }

  if (typeof key !== 'object') {
    throw typeError(MSG_INVALID_VERIFIER_KEY);
  }

  if (typeof key.type !== 'string') {
    throw typeError(MSG_INVALID_VERIFIER_KEY);
  }

  if (typeof key.asymmetricKeyType !== 'string') {
    throw typeError(MSG_INVALID_VERIFIER_KEY);
  }

  if (typeof key.export !== 'function') {
    throw typeError(MSG_INVALID_VERIFIER_KEY);
  }
};

function checkIsPrivateKey(key) {
  if (Buffer.isBuffer(key)) {
    return;
  }

  if (typeof key === 'string') {
    return;
  }

  if (typeof key === 'object') {
    return;
  }

  throw typeError(MSG_INVALID_SIGNER_KEY);
};

function checkIsSecretKey(key) {
  if (Buffer.isBuffer(key)) {
    return;
  }

  if (typeof key === 'string') {
    return key;
  }

  if (!supportsKeyObjects) {
    throw typeError(MSG_INVALID_SECRET);
  }

  if (typeof key !== 'object') {
    throw typeError(MSG_INVALID_SECRET);
  }

  if (key.type !== 'secret') {
    throw typeError(MSG_INVALID_SECRET);
  }

  if (typeof key.export !== 'function') {
    throw typeError(MSG_INVALID_SECRET);
  }
}

function fromBase64(base64) {
  return base64
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function toBase64(base64url) {
  base64url = base64url.toString();

  var padding = 4 - base64url.length % 4;
  if (padding !== 4) {
    for (var i = 0; i < padding; ++i) {
      base64url += '=';
    }
  }

  return base64url
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
}

function typeError(template) {
  var args = [].slice.call(arguments, 1);
  var errMsg = util.format.bind(util, template).apply(null, args);
  return new TypeError(errMsg);
}

function bufferOrString(obj) {
  return Buffer.isBuffer(obj) || typeof obj === 'string';
}

function normalizeInput(thing) {
  if (!bufferOrString(thing))
    thing = JSON.stringify(thing);
  return thing;
}

function createHmacSigner(bits) {
  return function sign(thing, secret) {
    checkIsSecretKey(secret);
    thing = normalizeInput(thing);
    var hmac = crypto.createHmac('sha' + bits, secret);
    var sig = (hmac.update(thing), hmac.digest('base64'))
    return fromBase64(sig);
  }
}

var bufferEqual;
var timingSafeEqual = 'timingSafeEqual' in crypto ? function timingSafeEqual(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return crypto.timingSafeEqual(a, b)
} : function timingSafeEqual(a, b) {
  if (!bufferEqual) {
    bufferEqual = __webpack_require__(1045);
  }

  return bufferEqual(a, b)
}

function createHmacVerifier(bits) {
  return function verify(thing, signature, secret) {
    var computedSig = createHmacSigner(bits)(thing, secret);
    return timingSafeEqual(Buffer.from(signature), Buffer.from(computedSig));
  }
}

function createKeySigner(bits) {
 return function sign(thing, privateKey) {
    checkIsPrivateKey(privateKey);
    thing = normalizeInput(thing);
    // Even though we are specifying "RSA" here, this works with ECDSA
    // keys as well.
    var signer = crypto.createSign('RSA-SHA' + bits);
    var sig = (signer.update(thing), signer.sign(privateKey, 'base64'));
    return fromBase64(sig);
  }
}

function createKeyVerifier(bits) {
  return function verify(thing, signature, publicKey) {
    checkIsPublicKey(publicKey);
    thing = normalizeInput(thing);
    signature = toBase64(signature);
    var verifier = crypto.createVerify('RSA-SHA' + bits);
    verifier.update(thing);
    return verifier.verify(publicKey, signature, 'base64');
  }
}

function createPSSKeySigner(bits) {
  return function sign(thing, privateKey) {
    checkIsPrivateKey(privateKey);
    thing = normalizeInput(thing);
    var signer = crypto.createSign('RSA-SHA' + bits);
    var sig = (signer.update(thing), signer.sign({
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
    }, 'base64'));
    return fromBase64(sig);
  }
}

function createPSSKeyVerifier(bits) {
  return function verify(thing, signature, publicKey) {
    checkIsPublicKey(publicKey);
    thing = normalizeInput(thing);
    signature = toBase64(signature);
    var verifier = crypto.createVerify('RSA-SHA' + bits);
    verifier.update(thing);
    return verifier.verify({
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
    }, signature, 'base64');
  }
}

function createECDSASigner(bits) {
  var inner = createKeySigner(bits);
  return function sign() {
    var signature = inner.apply(null, arguments);
    signature = formatEcdsa.derToJose(signature, 'ES' + bits);
    return signature;
  };
}

function createECDSAVerifer(bits) {
  var inner = createKeyVerifier(bits);
  return function verify(thing, signature, publicKey) {
    signature = formatEcdsa.joseToDer(signature, 'ES' + bits).toString('base64');
    var result = inner(thing, signature, publicKey);
    return result;
  };
}

function createNoneSigner() {
  return function sign() {
    return '';
  }
}

function createNoneVerifier() {
  return function verify(thing, signature) {
    return signature === '';
  }
}

module.exports = function jwa(algorithm) {
  var signerFactories = {
    hs: createHmacSigner,
    rs: createKeySigner,
    ps: createPSSKeySigner,
    es: createECDSASigner,
    none: createNoneSigner,
  }
  var verifierFactories = {
    hs: createHmacVerifier,
    rs: createKeyVerifier,
    ps: createPSSKeyVerifier,
    es: createECDSAVerifer,
    none: createNoneVerifier,
  }
  var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
  if (!match)
    throw typeError(MSG_INVALID_ALGORITHM, algorithm);
  var algo = (match[1] || match[3]).toLowerCase();
  var bits = match[2];

  return {
    sign: signerFactories[algo](bits),
    verify: verifierFactories[algo](bits),
  }
};


/***/ }),

/***/ 8822:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ BatchWriteItemCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class BatchWriteItemCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S,
    ResourceArnList: { type: "operationContextParams", get: (input) => Object.keys(input?.RequestItems ?? {}) },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "BatchWriteItem", {})
    .n("DynamoDBClient", "BatchWriteItemCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_BatchWriteItemCommand */ .J7)
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_BatchWriteItemCommand */ .Ki)
    .build() {
}


/***/ }),

/***/ 8928:
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = isInteger;


/***/ }),

/***/ 8948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global module, process*/
var Buffer = (__webpack_require__(2861).Buffer);
var Stream = __webpack_require__(2203);
var util = __webpack_require__(9023);

function DataStream(data) {
  this.buffer = null;
  this.writable = true;
  this.readable = true;

  // No input
  if (!data) {
    this.buffer = Buffer.alloc(0);
    return this;
  }

  // Stream
  if (typeof data.pipe === 'function') {
    this.buffer = Buffer.alloc(0);
    data.pipe(this);
    return this;
  }

  // Buffer or String
  // or Object (assumedly a passworded key)
  if (data.length || typeof data === 'object') {
    this.buffer = data;
    this.writable = false;
    process.nextTick(function () {
      this.emit('end', data);
      this.readable = false;
      this.emit('close');
    }.bind(this));
    return this;
  }

  throw new TypeError('Unexpected data type ('+ typeof data + ')');
}
util.inherits(DataStream, Stream);

DataStream.prototype.write = function write(data) {
  this.buffer = Buffer.concat([this.buffer, Buffer.from(data)]);
  this.emit('data', data);
};

DataStream.prototype.end = function end(data) {
  if (data)
    this.write(data);
  this.emit('end', data);
  this.emit('close');
  this.writable = false;
  this.readable = false;
};

module.exports = DataStream;


/***/ }),

/***/ 8980:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JsonWebTokenError = __webpack_require__(1741);

var TokenExpiredError = function (message, expiredAt) {
  JsonWebTokenError.call(this, message);
  this.name = 'TokenExpiredError';
  this.expiredAt = expiredAt;
};

TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);

TokenExpiredError.prototype.constructor = TokenExpiredError;

module.exports = TokenExpiredError;

/***/ }),

/***/ 9001:
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;


/***/ }),

/***/ 9023:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 9051:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ BatchGetItemCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7234);
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1208);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4820);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7051);
/* harmony import */ var _protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8579);






class BatchGetItemCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__/* .Command */ .uB
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__/* .commonParams */ .S,
    ResourceArnList: { type: "operationContextParams", get: (input) => Object.keys(input?.RequestItems ?? {}) },
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__/* .getSerdePlugin */ .TM)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__/* .getEndpointPlugin */ .rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("DynamoDB_20120810", "BatchGetItem", {})
    .n("DynamoDBClient", "BatchGetItemCommand")
    .f(void 0, void 0)
    .ser(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .se_BatchGetItemCommand */ ["if"])
    .de(_protocols_Aws_json1_0__WEBPACK_IMPORTED_MODULE_4__/* .de_BatchGetItemCommand */ .B2)
    .build() {
}


/***/ }),

/***/ 9278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Range = __webpack_require__(5006)

// Mostly just for testing and legacy API reasons
const toComparators = (range, options) =>
  new Range(range, options).set
    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '))

module.exports = toComparators


/***/ }),

/***/ 9284:
/***/ ((module) => {

"use strict";


// parse out just the options we care about
const looseOption = Object.freeze({ loose: true })
const emptyOpts = Object.freeze({ })
const parseOptions = options => {
  if (!options) {
    return emptyOpts
  }

  if (typeof options !== 'object') {
    return looseOption
  }

  return options
}
module.exports = parseOptions


/***/ }),

/***/ 9290:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ fromArrayBuffer),
/* harmony export */   s: () => (/* binding */ fromString)
/* harmony export */ });
/* harmony import */ var _smithy_is_array_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3695);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(181);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_1__);


const fromArrayBuffer = (input, offset = 0, length = input.byteLength - offset) => {
    if (!(0,_smithy_is_array_buffer__WEBPACK_IMPORTED_MODULE_0__/* .isArrayBuffer */ .m)(input)) {
        throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof input} (${input})`);
    }
    return buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(input, offset, length);
};
const fromString = (input, encoding) => {
    if (typeof input !== "string") {
        throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
    }
    return encoding ? buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(input, encoding) : buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(input);
};


/***/ }),

/***/ 9359:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Y7: () => (/* reexport */ getLoggerPlugin)
});

// UNUSED EXPORTS: loggerMiddleware, loggerMiddlewareOptions

;// ./node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js
const loggerMiddleware = () => (next, context) => async (args) => {
    try {
        const response = await next(args);
        const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
        const { overrideInputFilterSensitiveLog, overrideOutputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
        const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
        const outputFilterSensitiveLog = overrideOutputFilterSensitiveLog ?? context.outputFilterSensitiveLog;
        const { $metadata, ...outputWithoutMetadata } = response.output;
        logger?.info?.({
            clientName,
            commandName,
            input: inputFilterSensitiveLog(args.input),
            output: outputFilterSensitiveLog(outputWithoutMetadata),
            metadata: $metadata,
        });
        return response;
    }
    catch (error) {
        const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
        const { overrideInputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
        const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
        logger?.error?.({
            clientName,
            commandName,
            input: inputFilterSensitiveLog(args.input),
            error,
            metadata: error.$metadata,
        });
        throw error;
    }
};
const loggerMiddlewareOptions = {
    name: "loggerMiddleware",
    tags: ["LOGGER"],
    step: "initialize",
    override: true,
};
const getLoggerPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
    },
});

;// ./node_modules/@aws-sdk/middleware-logger/dist-es/index.js



/***/ }),

/***/ 9388:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.
const satisfies = __webpack_require__(1995)
const compare = __webpack_require__(3701)
module.exports = (versions, range, options) => {
  const set = []
  let first = null
  let prev = null
  const v = versions.sort((a, b) => compare(a, b, options))
  for (const version of v) {
    const included = satisfies(version, range, options)
    if (included) {
      prev = version
      if (!first) {
        first = version
      }
    } else {
      if (prev) {
        set.push([first, prev])
      }
      prev = null
      first = null
    }
  }
  if (first) {
    set.push([first, null])
  }

  const ranges = []
  for (const [min, max] of set) {
    if (min === max) {
      ranges.push(min)
    } else if (!max && min === v[0]) {
      ranges.push('*')
    } else if (!max) {
      ranges.push(`>=${min}`)
    } else if (min === v[0]) {
      ranges.push(`<=${max}`)
    } else {
      ranges.push(`${min} - ${max}`)
    }
  }
  const simplified = ranges.join(' || ')
  const original = typeof range.raw === 'string' ? range.raw : String(range)
  return simplified.length < original.length ? simplified : range
}


/***/ }),

/***/ 9540:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const compare = __webpack_require__(3701)
const gte = (a, b, loose) => compare(a, b, loose) >= 0
module.exports = gte


/***/ }),

/***/ 9544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const compareBuild = __webpack_require__(4848)
const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose))
module.exports = rsort


/***/ }),

/***/ 9671:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const compare = __webpack_require__(3701)
const gt = (a, b, loose) => compare(a, b, loose) > 0
module.exports = gt


/***/ }),

/***/ 9716:
/***/ ((module) => {

"use strict";


const numeric = /^[0-9]+$/
const compareIdentifiers = (a, b) => {
  const anum = numeric.test(a)
  const bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a)

module.exports = {
  compareIdentifiers,
  rcompareIdentifiers,
}


/***/ }),

/***/ 9746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const SemVer = __webpack_require__(6315)

const inc = (version, release, options, identifier, identifierBase) => {
  if (typeof (options) === 'string') {
    identifierBase = identifier
    identifier = options
    options = undefined
  }

  try {
    return new SemVer(
      version instanceof SemVer ? version.version : version,
      options
    ).inc(release, identifier, identifierBase).version
  } catch (er) {
    return null
  }
}
module.exports = inc


/***/ }),

/***/ 9896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 9924:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// Determine if version is greater than all the versions possible in the range.
const outside = __webpack_require__(5368)
const gtr = (version, range, options) => outside(version, range, '>', options)
module.exports = gtr


/***/ }),

/***/ 9938:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * Mnemonist Iterable Function
 * ============================
 *
 * Harmonized iteration helpers over mixed iterable targets.
 */
var forEach = __webpack_require__(156);

var typed = __webpack_require__(5384);

/**
 * Function used to determine whether the given object supports array-like
 * random access.
 *
 * @param  {any} target - Target object.
 * @return {boolean}
 */
function isArrayLike(target) {
  return Array.isArray(target) || typed.isTypedArray(target);
}

/**
 * Function used to guess the length of the structure over which we are going
 * to iterate.
 *
 * @param  {any} target - Target object.
 * @return {number|undefined}
 */
function guessLength(target) {
  if (typeof target.length === 'number')
    return target.length;

  if (typeof target.size === 'number')
    return target.size;

  return;
}

/**
 * Function used to convert an iterable to an array.
 *
 * @param  {any}   target - Iteration target.
 * @return {array}
 */
function toArray(target) {
  var l = guessLength(target);

  var array = typeof l === 'number' ? new Array(l) : [];

  var i = 0;

  // TODO: we could optimize when given target is array like
  forEach(target, function(value) {
    array[i++] = value;
  });

  return array;
}

/**
 * Same as above but returns a supplementary indices array.
 *
 * @param  {any}   target - Iteration target.
 * @return {array}
 */
function toArrayWithIndices(target) {
  var l = guessLength(target);

  var IndexArray = typeof l === 'number' ?
    typed.getPointerArray(l) :
    Array;

  var array = typeof l === 'number' ? new Array(l) : [];
  var indices = typeof l === 'number' ? new IndexArray(l) : [];

  var i = 0;

  // TODO: we could optimize when given target is array like
  forEach(target, function(value) {
    array[i] = value;
    indices[i] = i++;
  });

  return [array, indices];
}

/**
 * Exporting.
 */
exports.isArrayLike = isArrayLike;
exports.guessLength = guessLength;
exports.toArray = toArray;
exports.toArrayWithIndices = toArrayWithIndices;


/***/ }),

/***/ 9987:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* reexport */ loadConfig)
});

// EXTERNAL MODULE: ./node_modules/@smithy/property-provider/dist-es/index.js + 6 modules
var dist_es = __webpack_require__(8112);
;// ./node_modules/@smithy/node-config-provider/dist-es/getSelectorName.js
function getSelectorName(functionString) {
    try {
        const constants = new Set(Array.from(functionString.match(/([A-Z_]){3,}/g) ?? []));
        constants.delete("CONFIG");
        constants.delete("CONFIG_PREFIX_SEPARATOR");
        constants.delete("ENV");
        return [...constants].join(", ");
    }
    catch (e) {
        return functionString;
    }
}

;// ./node_modules/@smithy/node-config-provider/dist-es/fromEnv.js


const fromEnv = (envVarSelector, options) => async () => {
    try {
        const config = envVarSelector(process.env, options);
        if (config === undefined) {
            throw new Error();
        }
        return config;
    }
    catch (e) {
        throw new dist_es/* CredentialsProviderError */.C1(e.message || `Not found in ENV: ${getSelectorName(envVarSelector.toString())}`, { logger: options?.logger });
    }
};

// EXTERNAL MODULE: ./node_modules/@smithy/shared-ini-file-loader/dist-es/index.js + 15 modules
var shared_ini_file_loader_dist_es = __webpack_require__(2792);
;// ./node_modules/@smithy/node-config-provider/dist-es/fromSharedConfigFiles.js



const fromSharedConfigFiles = (configSelector, { preferredFile = "config", ...init } = {}) => async () => {
    const profile = (0,shared_ini_file_loader_dist_es/* getProfileName */.Bz)(init);
    const { configFile, credentialsFile } = await (0,shared_ini_file_loader_dist_es/* loadSharedConfigFiles */.p6)(init);
    const profileFromCredentials = credentialsFile[profile] || {};
    const profileFromConfig = configFile[profile] || {};
    const mergedProfile = preferredFile === "config"
        ? { ...profileFromCredentials, ...profileFromConfig }
        : { ...profileFromConfig, ...profileFromCredentials };
    try {
        const cfgFile = preferredFile === "config" ? configFile : credentialsFile;
        const configValue = configSelector(mergedProfile, cfgFile);
        if (configValue === undefined) {
            throw new Error();
        }
        return configValue;
    }
    catch (e) {
        throw new dist_es/* CredentialsProviderError */.C1(e.message || `Not found in config files w/ profile [${profile}]: ${getSelectorName(configSelector.toString())}`, { logger: init.logger });
    }
};

;// ./node_modules/@smithy/node-config-provider/dist-es/fromStatic.js

const isFunction = (func) => typeof func === "function";
const fromStatic = (defaultValue) => isFunction(defaultValue) ? async () => await defaultValue() : (0,dist_es/* fromStatic */.VR)(defaultValue);

;// ./node_modules/@smithy/node-config-provider/dist-es/configLoader.js




const loadConfig = ({ environmentVariableSelector, configFileSelector, default: defaultValue }, configuration = {}) => {
    const { signingName, logger } = configuration;
    const envOptions = { signingName, logger };
    return (0,dist_es/* memoize */.Bj)((0,dist_es/* chain */.cy)(fromEnv(environmentVariableSelector, envOptions), fromSharedConfigFiles(configFileSelector, configuration), fromStatic(defaultValue)));
};

;// ./node_modules/@smithy/node-config-provider/dist-es/index.js



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".handler.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			792: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					var installedChunk = require("./" + __webpack_require__.u(chunkId));
/******/ 					if (!installedChunks[chunkId]) {
/******/ 						installChunk(installedChunk);
/******/ 					}
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(3920);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;