"use strict";
exports.id = 819;
exports.ids = [819];
exports.modules = {

/***/ 7819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  fromTokenFile: () => (/* reexport */ fromTokenFile),
  fromWebToken: () => (/* reexport */ fromWebToken)
});

// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js
var setCredentialFeature = __webpack_require__(244);
// EXTERNAL MODULE: ./node_modules/@smithy/property-provider/dist-es/index.js + 6 modules
var dist_es = __webpack_require__(8112);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(9896);
;// ./node_modules/@aws-sdk/credential-provider-web-identity/dist-es/fromWebToken.js
const fromWebToken = (init) => async (awsIdentityProperties) => {
    init.logger?.debug("@aws-sdk/credential-provider-web-identity - fromWebToken");
    const { roleArn, roleSessionName, webIdentityToken, providerId, policyArns, policy, durationSeconds } = init;
    let { roleAssumerWithWebIdentity } = init;
    if (!roleAssumerWithWebIdentity) {
        const { getDefaultRoleAssumerWithWebIdentity } = await __webpack_require__.e(/* import() */ 218).then(__webpack_require__.bind(__webpack_require__, 4218));
        roleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity({
            ...init.clientConfig,
            credentialProviderLogger: init.logger,
            parentClientConfig: {
                ...awsIdentityProperties?.callerClientConfig,
                ...init.parentClientConfig,
            },
        }, init.clientPlugins);
    }
    return roleAssumerWithWebIdentity({
        RoleArn: roleArn,
        RoleSessionName: roleSessionName ?? `aws-sdk-js-session-${Date.now()}`,
        WebIdentityToken: webIdentityToken,
        ProviderId: providerId,
        PolicyArns: policyArns,
        Policy: policy,
        DurationSeconds: durationSeconds,
    });
};

;// ./node_modules/@aws-sdk/credential-provider-web-identity/dist-es/fromTokenFile.js




const ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
const ENV_ROLE_ARN = "AWS_ROLE_ARN";
const ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";
const fromTokenFile = (init = {}) => async () => {
    init.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
    const webIdentityTokenFile = init?.webIdentityTokenFile ?? process.env[ENV_TOKEN_FILE];
    const roleArn = init?.roleArn ?? process.env[ENV_ROLE_ARN];
    const roleSessionName = init?.roleSessionName ?? process.env[ENV_ROLE_SESSION_NAME];
    if (!webIdentityTokenFile || !roleArn) {
        throw new dist_es/* CredentialsProviderError */.C1("Web identity configuration not specified", {
            logger: init.logger,
        });
    }
    const credentials = await fromWebToken({
        ...init,
        webIdentityToken: (0,external_fs_.readFileSync)(webIdentityTokenFile, { encoding: "ascii" }),
        roleArn,
        roleSessionName,
    })();
    if (webIdentityTokenFile === process.env[ENV_TOKEN_FILE]) {
        (0,setCredentialFeature/* setCredentialFeature */.g)(credentials, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h");
    }
    return credentials;
};

;// ./node_modules/@aws-sdk/credential-provider-web-identity/dist-es/index.js




/***/ })

};
;