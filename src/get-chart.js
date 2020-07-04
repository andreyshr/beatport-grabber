export default `
        (function getChart() {
    class Chart {
        constructor(props) {
            this.id = props.id;
            this.title = props.title;
            this.artists = props.artists;
            this.dateCreated = props.dateCreated;
            this.cover = props.cover;
            this.url = props.url;
            this.type = props.type;
            this.genres = props.genres;
        }
    }
    
    const id = document.querySelector('.interior-release-chart-actions.ec-item[data-ec-id]').dataset.ecId;
    const title = document.querySelector('h1').innerText;
    let artists = [];
    if (document.querySelector('h1').nextElementSibling.querySelector('span:last-of-type').childElementCount > 0) {
        artists = Array.from(document.querySelector('h1').nextElementSibling.querySelectorAll('span:last-of-type [data-artist]')).map(el => el.innerText);
    } else {
        artists.push(document.querySelector('h1').nextElementSibling.querySelector('span:last-of-type').innerText);
    }
    const cover = document.querySelector('.interior-release-chart-artwork').src;
    const dateCreated = document.querySelectorAll('.interior-release-chart-artwork-parent ul li')[0].lastElementChild.innerText;
    const url = document.URL;
    const type = 'chart';
    const genres = document.querySelector('.interior-release-chart-content-list li:nth-of-type(2) span:last-of-type').innerText;

    return new Chart({ id, title, artists, cover, dateCreated, url, type, genres });
})();
      `
