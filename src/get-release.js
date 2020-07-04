export default `
        (function getRelease() {
    class Release {
        constructor(props) {
            this.id = props.id;
            this.type = props.type;
            this.searchableByStores = props.searchableByStores;
            this.title = props.title;
            this.titleSearch = props.titleSearch;
            this.artists = props.artists;
            this.artistsSearch = props.artistsSearch;
            this.releaseDate = props.releaseDate;
            this.label = props.label;
            this.labelUrl = props.labelUrl;
            this.cover = props.cover;
            this.url = props.url;
        }
    }
    
    const id = document.querySelectorAll('.interior-release-chart-artwork-parent ul li')[2].lastElementChild.innerText;
    const type = 'release';
    const searchableByStores = true;
    const title = document.querySelector('h1').innerText;
    const titleSearch = title;
    let artists = [];
    if (document.querySelector('h1').nextElementSibling.querySelector('span').childElementCount > 0) {
        artists = Array.from(document.querySelector('h1').nextElementSibling.querySelectorAll('span [data-artist]')).map(el => el.innerText);
    } else {
        artists.push(document.querySelector('h1').nextElementSibling.querySelector('span').innerText);
    }
    const artistsSearch = [ ...artists ];
    const releaseDate = document.querySelectorAll('.interior-release-chart-artwork-parent ul li')[0].lastElementChild.innerText;
    const label = document.querySelectorAll('.interior-release-chart-artwork-parent ul li')[1].lastElementChild.innerText;
    const labelUrl = document.querySelectorAll('.interior-release-chart-artwork-parent ul li')[1].lastElementChild.firstElementChild.href;
    const cover = document.querySelector('.interior-release-chart-artwork').src;
    const url = document.URL;
      
    return new Release({ id, type, searchableByStores, title, titleSearch, artists, artistsSearch, releaseDate, label, labelUrl, cover, url });
})();
      `
