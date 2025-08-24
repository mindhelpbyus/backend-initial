"use strict";
exports.id = 631;
exports.ids = [631];
exports.modules = {

/***/ 5536:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ NoAuthSigner)
/* harmony export */ });
class NoAuthSigner {
    async sign(httpRequest, identity, signingProperties) {
        return httpRequest;
    }
}


/***/ }),

/***/ 8631:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  CreateTokenCommand: () => (/* reexport */ CreateTokenCommand),
  SSOOIDCClient: () => (/* reexport */ SSOOIDCClient)
});

// UNUSED EXPORTS: $Command, AccessDeniedException, AuthorizationPendingException, CreateTokenRequestFilterSensitiveLog, CreateTokenResponseFilterSensitiveLog, ExpiredTokenException, InternalServerException, InvalidClientException, InvalidGrantException, InvalidRequestException, InvalidScopeException, SSOOIDC, SSOOIDCServiceException, SlowDownException, UnauthorizedClientException, UnsupportedGrantTypeException, __Client

// EXTERNAL MODULE: ./node_modules/@aws-sdk/middleware-host-header/dist-es/index.js
var dist_es = __webpack_require__(1095);
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
// EXTERNAL MODULE: ./node_modules/@smithy/util-middleware/dist-es/index.js + 2 modules
var util_middleware_dist_es = __webpack_require__(7135);
;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/auth/httpAuthSchemeProvider.js


const defaultSSOOIDCHttpAuthSchemeParametersProvider = async (config, context, input) => {
    return {
        operation: (0,util_middleware_dist_es/* getSmithyContext */.u)(context).operation,
        region: (await (0,util_middleware_dist_es/* normalizeProvider */.t)(config.region)()) ||
            (() => {
                throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
            })(),
    };
};
function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
            name: "sso-oauth",
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
function createSmithyApiNoAuthHttpAuthOption(authParameters) {
    return {
        schemeId: "smithy.api#noAuth",
    };
}
const defaultSSOOIDCHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
        case "CreateToken": {
            options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
            break;
        }
        default: {
            options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
        }
    }
    return options;
};
const resolveHttpAuthSchemeConfig = (config) => {
    const config_0 = (0,resolveAwsSdkSigV4Config/* resolveAwsSdkSigV4Config */.h)(config);
    return Object.assign(config_0, {
        authSchemePreference: (0,util_middleware_dist_es/* normalizeProvider */.t)(config.authSchemePreference ?? []),
    });
};

;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/endpoint/EndpointParameters.js
const resolveClientEndpointParameters = (options) => {
    return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "sso-oauth",
    });
};
const commonParams = {
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
};

// EXTERNAL MODULE: ./node_modules/@aws-sdk/nested-clients/package.json
var nested_clients_package = __webpack_require__(9955);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/client/emitWarningIfUnsupportedVersion.js
var emitWarningIfUnsupportedVersion = __webpack_require__(5122);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js + 2 modules
var NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = __webpack_require__(4472);
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
// EXTERNAL MODULE: ./node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/noAuth.js
var noAuth = __webpack_require__(5536);
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
;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/endpoint/ruleset.js
const u = "required", v = "fn", w = "argv", x = "ref";
const a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = "getAttr", i = { [u]: false, "type": "String" }, j = { [u]: true, "default": false, "type": "Boolean" }, k = { [x]: "Endpoint" }, l = { [v]: c, [w]: [{ [x]: "UseFIPS" }, true] }, m = { [v]: c, [w]: [{ [x]: "UseDualStack" }, true] }, n = {}, o = { [v]: h, [w]: [{ [x]: g }, "supportsFIPS"] }, p = { [x]: g }, q = { [v]: c, [w]: [true, { [v]: h, [w]: [p, "supportsDualStack"] }] }, r = [l], s = [m], t = [{ [x]: "Region" }];
const _data = { version: "1.0", parameters: { Region: i, UseDualStack: j, UseFIPS: j, Endpoint: i }, rules: [{ conditions: [{ [v]: b, [w]: [k] }], rules: [{ conditions: r, error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d }, { conditions: s, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", type: d }, { endpoint: { url: k, properties: n, headers: n }, type: e }], type: f }, { conditions: [{ [v]: b, [w]: t }], rules: [{ conditions: [{ [v]: "aws.partition", [w]: t, assign: g }], rules: [{ conditions: [l, m], rules: [{ conditions: [{ [v]: c, [w]: [a, o] }, q], rules: [{ endpoint: { url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", type: d }], type: f }, { conditions: r, rules: [{ conditions: [{ [v]: c, [w]: [o, a] }], rules: [{ conditions: [{ [v]: "stringEquals", [w]: [{ [v]: h, [w]: [p, "name"] }, "aws-us-gov"] }], endpoint: { url: "https://oidc.{Region}.amazonaws.com", properties: n, headers: n }, type: e }, { endpoint: { url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "FIPS is enabled but this partition does not support FIPS", type: d }], type: f }, { conditions: s, rules: [{ conditions: [q], rules: [{ endpoint: { url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "DualStack is enabled but this partition does not support DualStack", type: d }], type: f }, { endpoint: { url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n }, type: e }], type: f }], type: f }, { error: "Invalid Configuration: Missing Region", type: d }] };
const ruleSet = _data;

;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/endpoint/endpointResolver.js



const cache = new _smithy_util_endpoints_dist_es/* EndpointCache */.kS({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"],
});
const defaultEndpointResolver = (endpointParams, context = {}) => {
    return cache.get(endpointParams, () => (0,_smithy_util_endpoints_dist_es/* resolveEndpoint */.sO)(ruleSet, {
        endpointParams: endpointParams,
        logger: context.logger,
    }));
};
_smithy_util_endpoints_dist_es/* customEndpointFunctions */.mw.aws = util_endpoints_dist_es/* awsEndpointFunctions */.UF;

;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/runtimeConfig.shared.js








const getRuntimeConfig = (config) => {
    return {
        apiVersion: "2019-06-10",
        base64Decoder: config?.base64Decoder ?? util_base64_dist_es/* fromBase64 */.E,
        base64Encoder: config?.base64Encoder ?? util_base64_dist_es/* toBase64 */.n,
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultSSOOIDCHttpAuthSchemeProvider,
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
                signer: new AwsSdkSigV4Signer/* AwsSdkSigV4Signer */.f2(),
            },
            {
                schemeId: "smithy.api#noAuth",
                identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                signer: new noAuth/* NoAuthSigner */.m(),
            },
        ],
        logger: config?.logger ?? new smithy_client_dist_es/* NoOpLogger */.N4(),
        serviceId: config?.serviceId ?? "SSO OIDC",
        urlParser: config?.urlParser ?? url_parser_dist_es/* parseUrl */.D,
        utf8Decoder: config?.utf8Decoder ?? util_utf8_dist_es/* fromUtf8 */.ar,
        utf8Encoder: config?.utf8Encoder ?? util_utf8_dist_es/* toUtf8 */.Pq,
    };
};

// EXTERNAL MODULE: ./node_modules/@smithy/util-defaults-mode-node/dist-es/index.js + 3 modules
var util_defaults_mode_node_dist_es = __webpack_require__(4321);
;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/runtimeConfig.js














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
        authSchemePreference: config?.authSchemePreference ?? (0,node_config_provider_dist_es/* loadConfig */.Z)(NODE_AUTH_SCHEME_PREFERENCE_OPTIONS/* NODE_AUTH_SCHEME_PREFERENCE_OPTIONS */.$, loaderConfig),
        bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_dist_es/* calculateBodyLength */.n,
        defaultUserAgentProvider: config?.defaultUserAgentProvider ??
            (0,util_user_agent_node_dist_es/* createDefaultUserAgentProvider */.pf)({ serviceId: clientSharedValues.serviceId, clientVersion: nested_clients_package/* version */.rE }),
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
// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var protocol_http_dist_es = __webpack_require__(5479);
;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/auth/httpAuthExtensionConfiguration.js
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

;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/runtimeExtensions.js




const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
    const extensionConfiguration = Object.assign((0,region_config_resolver_dist_es/* getAwsRegionExtensionConfiguration */.Rq)(runtimeConfig), (0,smithy_client_dist_es/* getDefaultExtensionConfiguration */.xA)(runtimeConfig), (0,protocol_http_dist_es/* getHttpHandlerExtensionConfiguration */.eS)(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0,region_config_resolver_dist_es/* resolveAwsRegionExtensionConfiguration */.$3)(extensionConfiguration), (0,smithy_client_dist_es/* resolveDefaultRuntimeConfig */.uv)(extensionConfiguration), (0,protocol_http_dist_es/* resolveHttpHandlerRuntimeConfig */.jt)(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};

;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/SSOOIDCClient.js















class SSOOIDCClient extends smithy_client_dist_es/* Client */.Kj {
    config;
    constructor(...[configuration]) {
        const _config_0 = runtimeConfig_getRuntimeConfig(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = resolveClientEndpointParameters(_config_0);
        const _config_2 = (0,middleware_user_agent_dist_es/* resolveUserAgentConfig */.Dc)(_config_1);
        const _config_3 = (0,middleware_retry_dist_es/* resolveRetryConfig */.$z)(_config_2);
        const _config_4 = (0,config_resolver_dist_es/* resolveRegionConfig */.TD)(_config_3);
        const _config_5 = (0,dist_es/* resolveHostHeaderConfig */.OV)(_config_4);
        const _config_6 = (0,middleware_endpoint_dist_es/* resolveEndpointConfig */.Co)(_config_5);
        const _config_7 = resolveHttpAuthSchemeConfig(_config_6);
        const _config_8 = resolveRuntimeExtensions(_config_7, configuration?.extensions || []);
        this.config = _config_8;
        this.middlewareStack.use((0,middleware_user_agent_dist_es/* getUserAgentPlugin */.sM)(this.config));
        this.middlewareStack.use((0,middleware_retry_dist_es/* getRetryPlugin */.ey)(this.config));
        this.middlewareStack.use((0,middleware_content_length_dist_es/* getContentLengthPlugin */.vK)(this.config));
        this.middlewareStack.use((0,dist_es/* getHostHeaderPlugin */.TC)(this.config));
        this.middlewareStack.use((0,middleware_logger_dist_es/* getLoggerPlugin */.Y7)(this.config));
        this.middlewareStack.use((0,middleware_recursion_detection_dist_es/* getRecursionDetectionPlugin */.n4)(this.config));
        this.middlewareStack.use((0,getHttpAuthSchemeEndpointRuleSetPlugin/* getHttpAuthSchemeEndpointRuleSetPlugin */.w)(this.config, {
            httpAuthSchemeParametersProvider: defaultSSOOIDCHttpAuthSchemeParametersProvider,
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

// EXTERNAL MODULE: ./node_modules/@smithy/middleware-serde/dist-es/index.js + 3 modules
var middleware_serde_dist_es = __webpack_require__(1208);
;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/models/SSOOIDCServiceException.js


class SSOOIDCServiceException extends smithy_client_dist_es/* ServiceException */.TJ {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, SSOOIDCServiceException.prototype);
    }
}

;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/models/models_0.js


class AccessDeniedException extends SSOOIDCServiceException {
    name = "AccessDeniedException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "AccessDeniedException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AccessDeniedException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class AuthorizationPendingException extends SSOOIDCServiceException {
    name = "AuthorizationPendingException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "AuthorizationPendingException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AuthorizationPendingException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
const CreateTokenRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.clientSecret && { clientSecret: smithy_client_dist_es/* SENSITIVE_STRING */.$H }),
    ...(obj.refreshToken && { refreshToken: smithy_client_dist_es/* SENSITIVE_STRING */.$H }),
    ...(obj.codeVerifier && { codeVerifier: smithy_client_dist_es/* SENSITIVE_STRING */.$H }),
});
const CreateTokenResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.accessToken && { accessToken: smithy_client_dist_es/* SENSITIVE_STRING */.$H }),
    ...(obj.refreshToken && { refreshToken: smithy_client_dist_es/* SENSITIVE_STRING */.$H }),
    ...(obj.idToken && { idToken: smithy_client_dist_es/* SENSITIVE_STRING */.$H }),
});
class ExpiredTokenException extends SSOOIDCServiceException {
    name = "ExpiredTokenException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "ExpiredTokenException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ExpiredTokenException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class InternalServerException extends SSOOIDCServiceException {
    name = "InternalServerException";
    $fault = "server";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "InternalServerException",
            $fault: "server",
            ...opts,
        });
        Object.setPrototypeOf(this, InternalServerException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class InvalidClientException extends SSOOIDCServiceException {
    name = "InvalidClientException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "InvalidClientException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidClientException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class InvalidGrantException extends SSOOIDCServiceException {
    name = "InvalidGrantException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "InvalidGrantException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidGrantException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class InvalidRequestException extends SSOOIDCServiceException {
    name = "InvalidRequestException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "InvalidRequestException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidRequestException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class InvalidScopeException extends SSOOIDCServiceException {
    name = "InvalidScopeException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "InvalidScopeException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidScopeException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class SlowDownException extends SSOOIDCServiceException {
    name = "SlowDownException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "SlowDownException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, SlowDownException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class UnauthorizedClientException extends SSOOIDCServiceException {
    name = "UnauthorizedClientException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "UnauthorizedClientException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, UnauthorizedClientException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class UnsupportedGrantTypeException extends SSOOIDCServiceException {
    name = "UnsupportedGrantTypeException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "UnsupportedGrantTypeException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, UnsupportedGrantTypeException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}

// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/parseJsonBody.js
var parseJsonBody = __webpack_require__(1919);
// EXTERNAL MODULE: ./node_modules/@smithy/core/dist-es/submodules/protocols/requestBuilder.js + 1 modules
var requestBuilder = __webpack_require__(9212);
;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/protocols/Aws_restJson1.js





const se_CreateTokenCommand = async (input, context) => {
    const b = (0,requestBuilder/* requestBuilder */.l)(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/token");
    let body;
    body = JSON.stringify((0,smithy_client_dist_es/* take */.s)(input, {
        clientId: [],
        clientSecret: [],
        code: [],
        codeVerifier: [],
        deviceCode: [],
        grantType: [],
        redirectUri: [],
        refreshToken: [],
        scope: (_) => (0,smithy_client_dist_es/* _json */.Ss)(_),
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
const de_CreateTokenCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0,smithy_client_dist_es/* map */.Tj)({
        $metadata: deserializeMetadata(output),
    });
    const data = (0,smithy_client_dist_es/* expectNonNull */.Y0)((0,smithy_client_dist_es/* expectObject */.Xk)(await (0,parseJsonBody/* parseJsonBody */.Y2)(output.body, context)), "body");
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        accessToken: smithy_client_dist_es/* expectString */.lK,
        expiresIn: smithy_client_dist_es/* expectInt32 */.ET,
        idToken: smithy_client_dist_es/* expectString */.lK,
        refreshToken: smithy_client_dist_es/* expectString */.lK,
        tokenType: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    return contents;
};
const de_CommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await (0,parseJsonBody/* parseJsonErrorBody */.CG)(output.body, context),
    };
    const errorCode = (0,parseJsonBody/* loadRestJsonErrorCode */.cJ)(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.ssooidc#AccessDeniedException":
            throw await de_AccessDeniedExceptionRes(parsedOutput, context);
        case "AuthorizationPendingException":
        case "com.amazonaws.ssooidc#AuthorizationPendingException":
            throw await de_AuthorizationPendingExceptionRes(parsedOutput, context);
        case "ExpiredTokenException":
        case "com.amazonaws.ssooidc#ExpiredTokenException":
            throw await de_ExpiredTokenExceptionRes(parsedOutput, context);
        case "InternalServerException":
        case "com.amazonaws.ssooidc#InternalServerException":
            throw await de_InternalServerExceptionRes(parsedOutput, context);
        case "InvalidClientException":
        case "com.amazonaws.ssooidc#InvalidClientException":
            throw await de_InvalidClientExceptionRes(parsedOutput, context);
        case "InvalidGrantException":
        case "com.amazonaws.ssooidc#InvalidGrantException":
            throw await de_InvalidGrantExceptionRes(parsedOutput, context);
        case "InvalidRequestException":
        case "com.amazonaws.ssooidc#InvalidRequestException":
            throw await de_InvalidRequestExceptionRes(parsedOutput, context);
        case "InvalidScopeException":
        case "com.amazonaws.ssooidc#InvalidScopeException":
            throw await de_InvalidScopeExceptionRes(parsedOutput, context);
        case "SlowDownException":
        case "com.amazonaws.ssooidc#SlowDownException":
            throw await de_SlowDownExceptionRes(parsedOutput, context);
        case "UnauthorizedClientException":
        case "com.amazonaws.ssooidc#UnauthorizedClientException":
            throw await de_UnauthorizedClientExceptionRes(parsedOutput, context);
        case "UnsupportedGrantTypeException":
        case "com.amazonaws.ssooidc#UnsupportedGrantTypeException":
            throw await de_UnsupportedGrantTypeExceptionRes(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            return throwDefaultError({
                output,
                parsedBody,
                errorCode,
            });
    }
};
const throwDefaultError = (0,smithy_client_dist_es/* withBaseException */.jr)(SSOOIDCServiceException);
const de_AccessDeniedExceptionRes = async (parsedOutput, context) => {
    const contents = (0,smithy_client_dist_es/* map */.Tj)({});
    const data = parsedOutput.body;
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        error: smithy_client_dist_es/* expectString */.lK,
        error_description: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    const exception = new AccessDeniedException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,smithy_client_dist_es/* decorateServiceException */.Mw)(exception, parsedOutput.body);
};
const de_AuthorizationPendingExceptionRes = async (parsedOutput, context) => {
    const contents = (0,smithy_client_dist_es/* map */.Tj)({});
    const data = parsedOutput.body;
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        error: smithy_client_dist_es/* expectString */.lK,
        error_description: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    const exception = new AuthorizationPendingException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,smithy_client_dist_es/* decorateServiceException */.Mw)(exception, parsedOutput.body);
};
const de_ExpiredTokenExceptionRes = async (parsedOutput, context) => {
    const contents = (0,smithy_client_dist_es/* map */.Tj)({});
    const data = parsedOutput.body;
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        error: smithy_client_dist_es/* expectString */.lK,
        error_description: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    const exception = new ExpiredTokenException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,smithy_client_dist_es/* decorateServiceException */.Mw)(exception, parsedOutput.body);
};
const de_InternalServerExceptionRes = async (parsedOutput, context) => {
    const contents = (0,smithy_client_dist_es/* map */.Tj)({});
    const data = parsedOutput.body;
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        error: smithy_client_dist_es/* expectString */.lK,
        error_description: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    const exception = new InternalServerException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,smithy_client_dist_es/* decorateServiceException */.Mw)(exception, parsedOutput.body);
};
const de_InvalidClientExceptionRes = async (parsedOutput, context) => {
    const contents = (0,smithy_client_dist_es/* map */.Tj)({});
    const data = parsedOutput.body;
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        error: smithy_client_dist_es/* expectString */.lK,
        error_description: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    const exception = new InvalidClientException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,smithy_client_dist_es/* decorateServiceException */.Mw)(exception, parsedOutput.body);
};
const de_InvalidGrantExceptionRes = async (parsedOutput, context) => {
    const contents = (0,smithy_client_dist_es/* map */.Tj)({});
    const data = parsedOutput.body;
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        error: smithy_client_dist_es/* expectString */.lK,
        error_description: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    const exception = new InvalidGrantException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,smithy_client_dist_es/* decorateServiceException */.Mw)(exception, parsedOutput.body);
};
const de_InvalidRequestExceptionRes = async (parsedOutput, context) => {
    const contents = (0,smithy_client_dist_es/* map */.Tj)({});
    const data = parsedOutput.body;
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        error: smithy_client_dist_es/* expectString */.lK,
        error_description: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    const exception = new InvalidRequestException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,smithy_client_dist_es/* decorateServiceException */.Mw)(exception, parsedOutput.body);
};
const de_InvalidScopeExceptionRes = async (parsedOutput, context) => {
    const contents = (0,smithy_client_dist_es/* map */.Tj)({});
    const data = parsedOutput.body;
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        error: smithy_client_dist_es/* expectString */.lK,
        error_description: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    const exception = new InvalidScopeException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,smithy_client_dist_es/* decorateServiceException */.Mw)(exception, parsedOutput.body);
};
const de_SlowDownExceptionRes = async (parsedOutput, context) => {
    const contents = (0,smithy_client_dist_es/* map */.Tj)({});
    const data = parsedOutput.body;
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        error: smithy_client_dist_es/* expectString */.lK,
        error_description: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    const exception = new SlowDownException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,smithy_client_dist_es/* decorateServiceException */.Mw)(exception, parsedOutput.body);
};
const de_UnauthorizedClientExceptionRes = async (parsedOutput, context) => {
    const contents = (0,smithy_client_dist_es/* map */.Tj)({});
    const data = parsedOutput.body;
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        error: smithy_client_dist_es/* expectString */.lK,
        error_description: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    const exception = new UnauthorizedClientException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,smithy_client_dist_es/* decorateServiceException */.Mw)(exception, parsedOutput.body);
};
const de_UnsupportedGrantTypeExceptionRes = async (parsedOutput, context) => {
    const contents = (0,smithy_client_dist_es/* map */.Tj)({});
    const data = parsedOutput.body;
    const doc = (0,smithy_client_dist_es/* take */.s)(data, {
        error: smithy_client_dist_es/* expectString */.lK,
        error_description: smithy_client_dist_es/* expectString */.lK,
    });
    Object.assign(contents, doc);
    const exception = new UnsupportedGrantTypeException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,smithy_client_dist_es/* decorateServiceException */.Mw)(exception, parsedOutput.body);
};
const deserializeMetadata = (output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"],
});
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));

;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/commands/CreateTokenCommand.js







class CreateTokenCommand extends smithy_client_dist_es/* Command */.uB
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        (0,middleware_serde_dist_es/* getSerdePlugin */.TM)(config, this.serialize, this.deserialize),
        (0,middleware_endpoint_dist_es/* getEndpointPlugin */.rD)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("AWSSSOOIDCService", "CreateToken", {})
    .n("SSOOIDCClient", "CreateTokenCommand")
    .f(CreateTokenRequestFilterSensitiveLog, CreateTokenResponseFilterSensitiveLog)
    .ser(se_CreateTokenCommand)
    .de(de_CreateTokenCommand)
    .build() {
}

;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/SSOOIDC.js



const commands = {
    CreateTokenCommand: CreateTokenCommand,
};
class SSOOIDC extends SSOOIDCClient {
}
(0,smithy_client_dist_es/* createAggregatedClient */.J1)(commands, SSOOIDC);

;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/commands/index.js


;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/models/index.js


;// ./node_modules/@aws-sdk/nested-clients/dist-es/submodules/sso-oidc/index.js







/***/ }),

/***/ 9212:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  l: () => (/* binding */ requestBuilder)
});

// UNUSED EXPORTS: RequestBuilder

// EXTERNAL MODULE: ./node_modules/@smithy/protocol-http/dist-es/index.js + 5 modules
var dist_es = __webpack_require__(5479);
// EXTERNAL MODULE: ./node_modules/@smithy/core/dist-es/submodules/protocols/extended-encode-uri-component.js
var extended_encode_uri_component = __webpack_require__(7916);
;// ./node_modules/@smithy/core/dist-es/submodules/protocols/resolve-path.js

const resolvedPath = (resolvedPath, input, memberName, labelValueProvider, uriLabel, isGreedyLabel) => {
    if (input != null && input[memberName] !== undefined) {
        const labelValue = labelValueProvider();
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: " + memberName + ".");
        }
        resolvedPath = resolvedPath.replace(uriLabel, isGreedyLabel
            ? labelValue
                .split("/")
                .map((segment) => (0,extended_encode_uri_component/* extendedEncodeURIComponent */.$)(segment))
                .join("/")
            : (0,extended_encode_uri_component/* extendedEncodeURIComponent */.$)(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: " + memberName + ".");
    }
    return resolvedPath;
};

;// ./node_modules/@smithy/core/dist-es/submodules/protocols/requestBuilder.js


function requestBuilder(input, context) {
    return new RequestBuilder(input, context);
}
class RequestBuilder {
    constructor(input, context) {
        this.input = input;
        this.context = context;
        this.query = {};
        this.method = "";
        this.headers = {};
        this.path = "";
        this.body = null;
        this.hostname = "";
        this.resolvePathStack = [];
    }
    async build() {
        const { hostname, protocol = "https", port, path: basePath } = await this.context.endpoint();
        this.path = basePath;
        for (const resolvePath of this.resolvePathStack) {
            resolvePath(this.path);
        }
        return new dist_es/* HttpRequest */.Kd({
            protocol,
            hostname: this.hostname || hostname,
            port,
            method: this.method,
            path: this.path,
            query: this.query,
            body: this.body,
            headers: this.headers,
        });
    }
    hn(hostname) {
        this.hostname = hostname;
        return this;
    }
    bp(uriLabel) {
        this.resolvePathStack.push((basePath) => {
            this.path = `${basePath?.endsWith("/") ? basePath.slice(0, -1) : basePath || ""}` + uriLabel;
        });
        return this;
    }
    p(memberName, labelValueProvider, uriLabel, isGreedyLabel) {
        this.resolvePathStack.push((path) => {
            this.path = resolvedPath(path, this.input, memberName, labelValueProvider, uriLabel, isGreedyLabel);
        });
        return this;
    }
    h(headers) {
        this.headers = headers;
        return this;
    }
    q(query) {
        this.query = query;
        return this;
    }
    b(body) {
        this.body = body;
        return this;
    }
    m(method) {
        this.method = method;
        return this;
    }
}


/***/ }),

/***/ 9955:
/***/ ((module) => {

module.exports = {"rE":"3.864.0"};

/***/ })

};
;