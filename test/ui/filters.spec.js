import { filterByIgnoreList } from 'ui/utils/filters';

const matchingUrls = [
    'http://the-dude.hot-update.json',
    '/el-duderino.hot-update.json',
    '*.hot-update.json',
    '*.hot-update.json?dude=true'
]

const nonMatchingUrls = [
    'https://mimic.js.org?isReady=true',
    '*.cold-update.json'
]

const toRequest = (url) => ({ url });

describe('ui filter utils', () => {
    it('filterByIgnoreList - should filter out patterns', () => {
        const matches = matchingUrls
            .map(toRequest)
            .filter(filterByIgnoreList);
        expect(matches.length).toBe(0);
    });

    it('filterByIgnoreList - should keep non-matching', () => {
        const matches = nonMatchingUrls
            .map(toRequest)
            .filter(filterByIgnoreList);
        expect(matches.length).toBe(nonMatchingUrls.length);
    });
});
