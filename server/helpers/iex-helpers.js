const IEX_API_KEY = process.env.IEX_API_KEY;
const IEX_PREFIX = 'https://cloud.iexapis.com/v1';
const IEX_SUFFIX = `?token=${IEX_API_KEY}`;

export default {IEX_PREFIX, IEX_SUFFIX};