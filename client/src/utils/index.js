/**
 * This block of code imports the FileSaver library and the surpriseMePrompts constant from the ../constants file.
 * It also exports two functions: getRandomPrompts and downloadImage.
 */
import FileSaver from 'file-saver';
import {surpriseMePrompts} from '../constants';

/**
 * This function returns a random prompt from the surpriseMePrompts array, excluding the prompt passed as an argument.
 * @param {string} prompt - The prompt to exclude from the random selection.
 * @returns {string} - A random prompt from the surpriseMePrompts array.
 */
export function getRandomPrompts(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];
    if (prompt === randomPrompt) return getRandomPrompts(prompt);

    return randomPrompt;
}

/**
 * This function downloads an image file with a specified name.
 * @param {string} _id - The ID of the file to download.
 * @param {Blob} photo - The image file to download.
 */
export async function downloadImage(_id, photo){
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}