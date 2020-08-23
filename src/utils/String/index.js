export function slugify(str){
    str = str.toLowerCase().replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-'); // collapse whitespace and replace by -

    return str;
}