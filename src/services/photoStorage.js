import { set, get, del, keys } from 'idb-keyval';
import { v4 as uuidv4 } from 'uuid';

export const savePhotos = async(photos) => {
    const photoRefs = [];

    for(const photo of photos){
        const id = `photo_${uuidv4()}`;
        await set(id, photo);

        photoRefs.push({
            id,
            name: photo.name,
            type: photo.type,
            size: photo.size
        });
    }

    return photoRefs;
};

export const getPhoto = async(id) => {
    return await get(id);
};

export const cleanupPhotos = async(photoRefs) => {
    for(const ref of photoRefs){
        await del(ref.id);
    };
};