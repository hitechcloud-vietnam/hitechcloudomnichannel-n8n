const { test } = require('node:test');
const assert = require('node:assert/strict');
const { HiTechCloudOmnichannelApi } = require('../dist/credentials/HiTechCloudOmnichannelApi.credentials.js');

test('HiTechCloudOmnichannelApi authenticates with a Bearer header built from the access token', () => {
	const credential = new HiTechCloudOmnichannelApi();

	assert.equal(credential.name, 'HiTechCloudOmnichannelApi');
	assert.equal(credential.authenticate.type, 'generic');
	assert.equal(
		credential.authenticate.properties.headers.Authorization,
		'=Bearer {{$credentials.accessToken}}',
	);
});

test('HiTechCloudOmnichannelApi tests the credential against GET /v1/workspaces', () => {
	const credential = new HiTechCloudOmnichannelApi();

	assert.equal(credential.test.request.method, 'GET');
	assert.equal(credential.test.request.url, '/v1/workspaces');
});

test('HiTechCloudOmnichannelApi marks the access token as a password field', () => {
	const credential = new HiTechCloudOmnichannelApi();
	const accessToken = credential.properties.find((p) => p.name === 'accessToken');

	assert.ok(accessToken, 'accessToken property should exist');
	assert.equal(accessToken.typeOptions.password, true);
});
