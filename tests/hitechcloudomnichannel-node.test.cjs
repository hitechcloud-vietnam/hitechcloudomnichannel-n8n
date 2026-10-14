const { test } = require('node:test');
const assert = require('node:assert/strict');
const { HiTechCloudOmnichannel } = require('../dist/nodes/HiTechCloudOmnichannel/HiTechCloudOmnichannel.node.js');

test('HiTechCloudOmnichannel node exposes Contact and Custom resources', () => {
	const node = new HiTechCloudOmnichannel();
	const resource = node.description.properties.find(
		(p) => p.name === 'resource' && !p.displayOptions,
	);

	assert.deepEqual(
		resource.options.map((o) => o.value),
		['contact', 'custom'],
	);
});

test('HiTechCloudOmnichannel node exposes the 12 documented contact operations', () => {
	const node = new HiTechCloudOmnichannel();
	const contactOperation = node.description.properties.find(
		(p) => p.name === 'operation' && p.displayOptions?.show?.resource?.includes('contact'),
	);

	const values = contactOperation.options.map((o) => o.value).sort();
	const expected = [
		'addTags',
		'create',
		'delete',
		'deleteCustomField',
		'findByCustomField',
		'get',
		'list',
		'removeTags',
		'sendFlow',
		'sendMessage',
		'setCustomFields',
		'upsert',
	].sort();

	assert.deepEqual(values, expected);
});

test('HiTechCloudOmnichannel node exposes a generic "API Call" operation under Custom', () => {
	const node = new HiTechCloudOmnichannel();
	const customOperation = node.description.properties.find(
		(p) => p.name === 'operation' && p.displayOptions?.show?.resource?.includes('custom'),
	);

	assert.deepEqual(
		customOperation.options.map((o) => o.value),
		['apiCall'],
	);
});

test('HiTechCloudOmnichannel node requires the hiTechCloudOmnichannelApi credential', () => {
	const node = new HiTechCloudOmnichannel();

	assert.deepEqual(node.description.credentials, [{ name: 'hiTechCloudOmnichannelApi', required: true }]);
});
