"use strict";
exports.id = 109;
exports.ids = [109];
exports.modules = {

/***/ 5109:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  fromProcess: () => (/* reexport */ fromProcess)
});

// EXTERNAL MODULE: ./node_modules/@smithy/shared-ini-file-loader/dist-es/index.js + 15 modules
var dist_es = __webpack_require__(2792);
// EXTERNAL MODULE: ./node_modules/@smithy/property-provider/dist-es/index.js + 6 modules
var property_provider_dist_es = __webpack_require__(8112);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(5317);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(9023);
// EXTERNAL MODULE: ./node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js
var setCredentialFeature = __webpack_require__(244);
;// ./node_modules/@aws-sdk/credential-provider-process/dist-es/getValidatedProcessCredentials.js

const getValidatedProcessCredentials = (profileName, data, profiles) => {
    if (data.Version !== 1) {
        throw Error(`Profile ${profileName} credential_process did not return Version 1.`);
    }
    if (data.AccessKeyId === undefined || data.SecretAccessKey === undefined) {
        throw Error(`Profile ${profileName} credential_process returned invalid credentials.`);
    }
    if (data.Expiration) {
        const currentTime = new Date();
        const expireTime = new Date(data.Expiration);
        if (expireTime < currentTime) {
            throw Error(`Profile ${profileName} credential_process returned expired credentials.`);
        }
    }
    let accountId = data.AccountId;
    if (!accountId && profiles?.[profileName]?.aws_account_id) {
        accountId = profiles[profileName].aws_account_id;
    }
    const credentials = {
        accessKeyId: data.AccessKeyId,
        secretAccessKey: data.SecretAccessKey,
        ...(data.SessionToken && { sessionToken: data.SessionToken }),
        ...(data.Expiration && { expiration: new Date(data.Expiration) }),
        ...(data.CredentialScope && { credentialScope: data.CredentialScope }),
        ...(accountId && { accountId }),
    };
    (0,setCredentialFeature/* setCredentialFeature */.g)(credentials, "CREDENTIALS_PROCESS", "w");
    return credentials;
};

;// ./node_modules/@aws-sdk/credential-provider-process/dist-es/resolveProcessCredentials.js




const resolveProcessCredentials = async (profileName, profiles, logger) => {
    const profile = profiles[profileName];
    if (profiles[profileName]) {
        const credentialProcess = profile["credential_process"];
        if (credentialProcess !== undefined) {
            const execPromise = (0,external_util_.promisify)(external_child_process_.exec);
            try {
                const { stdout } = await execPromise(credentialProcess);
                let data;
                try {
                    data = JSON.parse(stdout.trim());
                }
                catch {
                    throw Error(`Profile ${profileName} credential_process returned invalid JSON.`);
                }
                return getValidatedProcessCredentials(profileName, data, profiles);
            }
            catch (error) {
                throw new property_provider_dist_es/* CredentialsProviderError */.C1(error.message, { logger });
            }
        }
        else {
            throw new property_provider_dist_es/* CredentialsProviderError */.C1(`Profile ${profileName} did not contain credential_process.`, { logger });
        }
    }
    else {
        throw new property_provider_dist_es/* CredentialsProviderError */.C1(`Profile ${profileName} could not be found in shared credentials file.`, {
            logger,
        });
    }
};

;// ./node_modules/@aws-sdk/credential-provider-process/dist-es/fromProcess.js


const fromProcess = (init = {}) => async ({ callerClientConfig } = {}) => {
    init.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");
    const profiles = await (0,dist_es/* parseKnownFiles */.YU)(init);
    return resolveProcessCredentials((0,dist_es/* getProfileName */.Bz)({
        profile: init.profile ?? callerClientConfig?.profile,
    }), profiles, init.logger);
};

;// ./node_modules/@aws-sdk/credential-provider-process/dist-es/index.js



/***/ })

};
;