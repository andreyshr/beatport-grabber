export default `
        (function getTrack() {
    class Track {
        constructor(props) {
            this.id = props.id;
            this.type = props.type;
            this.num = props.num;
            this.title = props.title;
            this.titleSearch = props.titleSearch;
            this.artists = props.artists;
            this.artistsSearch = props.artistsSearch;
            this.remixers = props.remixers;
            this.releaseDate = props.releaseDate;
            this.genre = props.genre;
            this.bpm = props.bpm;
            this.key = props.key;
            this.cover = props.cover;
            this.trackLength = props.trackLength;
            this.label = props.label;
            this.labelUrl = props.labelUrl;
            this.url = props.url;
            this.searchableByStores = props.searchableByStores;
        }
    }
    
    const id = document.querySelector('.interior-track-actions.ec-item[data-ec-id]').dataset.ecId;
    const num = ''; 
    const key = '';
    const type = 'track';
    const searchableByStores = true;
    const title = document.querySelector('.interior-title h1:first-of-type').innerText + ' ' + '<span class="remixed">' + document.querySelector('.interior-title h1:last-of-type').innerText + '</span>';
    const titleSearch = document.querySelector('.interior-title h1:first-of-type').innerText;
    const artists = Array.from(document.querySelectorAll('.interior-track-artists:nth-of-type(1) span:last-of-type [data-artist]')).map(el => el.innerText);
    const artistsSearch = Array.from(document.querySelectorAll('.interior-track-artists:nth-of-type(1) span:last-of-type [data-artist]')).map(el => el.innerText);
    const remixers = Array.from(document.querySelectorAll('.interior-track-artists:nth-of-type(2) span:last-of-type [data-artist]')).map(el => el.innerText);
    const cover = document.querySelector('.interior-track-release-artwork').src;
    const releaseDate = document.querySelector('.interior-track-released span:last-of-type').innerText;
    const genre = document.querySelector('.interior-track-genre span:last-of-type').innerText;
    const bpm = document.querySelector('.interior-track-bpm span:last-of-type').innerText;
    const trackLength = document.querySelector('.interior-track-length span:last-of-type').innerText;
    const label = document.querySelector('.interior-track-content-item.interior-track-labels').lastElementChild.innerText;
    const labelUrl = document.querySelector('.interior-track-content-item.interior-track-labels').lastElementChild.firstElementChild.href;
    const url = document.URL;

    return new Track({ id, num, bpm, key, genre, title, titleSearch, artists, artistsSearch, remixers, cover, releaseDate, label, labelUrl, url, type, searchableByStores });
})();
      `
