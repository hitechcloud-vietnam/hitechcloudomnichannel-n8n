import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

export type HiTechCloudOmnichannelContext = IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions;

export async function hiTechCloudOmnichannelApiRequest(
	this: HiTechCloudOmnichannelContext,
	method: IHttpRequestMethods,
	path: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('hiTechCloudOmnichannelApi');
	const baseUrl = (credentials.apiUrl as string).replace(/\/$/, '');

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}${path}`,
		json: true,
	};

	if (Object.keys(body).length > 0) {
		options.body = body;
	}
	if (Object.keys(qs).length > 0) {
		options.qs = qs;
	}

	return (await this.helpers.httpRequestWithAuthentication.call(
		this,
		'hiTechCloudOmnichannelApi',
		options,
	)) as IDataObject;
}
