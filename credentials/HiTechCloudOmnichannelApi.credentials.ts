import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HiTechCloudOmnichannelApi implements ICredentialType {
	name = 'hiTechCloudOmnichannelApi';
	displayName = 'HiTechCloudOmnichannel API';
	icon = { light: 'file:../nodes/HiTechCloudOmnichannel/icons/hitechcloudomnichannel.png', dark: 'file:../nodes/HiTechCloudOmnichannel/icons/hitechcloudomnichannel.dark.png' } as const;
	documentationUrl = 'https://hitechcloud.vn/docs/api-reference/api-overview';

	properties: INodeProperties[] = [
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://app.hitechcloud.vn/api',
			required: true,
			description:
				'The base URL for the HiTechCloudOmnichannel API. Use the default for HiTechCloudOmnichannel Cloud, or https://your-domain/api for self-hosted.',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Workspace API token from Settings > Integrations > HiTechCloudOmnichannel API Access Token',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiUrl.replace(/\\/$/, "")}}',
			url: '/v1/workspaces',
			method: 'GET',
		},
	};
}
