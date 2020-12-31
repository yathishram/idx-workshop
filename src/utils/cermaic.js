import Ceramic from '@ceramicnetwork/http-client'


const CERAMIC_URL = 'https://ceramic-dev.3boxlabs.com'
const API_URL = "http://localhost:7007"

export async function createCeramic() {
    const ceramic = new Ceramic(CERAMIC_URL);
    return Promise.resolve(ceramic)
}