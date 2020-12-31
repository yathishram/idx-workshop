import { IDX } from '@ceramicstudio/idx'


export async function createIDX(ceramic, definitions) {
    const idx = new IDX({ ceramic, aliases: definitions })
    return idx
}