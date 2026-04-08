import { createDirectus, rest } from '@directus/sdk';

const url = import.meta.env.VITE_DIRECTUS_URL;

console.log('Directus URL:', url); // debug

export function getDirectusClient() {
	return createDirectus(url).with(rest());
}

export default getDirectusClient;
