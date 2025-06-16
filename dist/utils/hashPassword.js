import bcrypt from "bcrypt";
export async function hash(data) {
    const salt = await bcrypt.genSalt();
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData;
}
export async function unHash(hash, plaintext) {
    const compare = await bcrypt.compare(plaintext, hash);
    return compare;
}
