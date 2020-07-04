export default function createError(error = {}) {
    switch (error) {
        case error.message === 'QUOTA_BYTES_PER_ITEM quota exceeded':
            return alert('\'Sorry. Item is too large for chrome.storage.sync:(');
        default:
            return alert('Something wrong');
    }
}
