<template>
  <div>
    <header>
      <button v-if="isReleasePath" @click="addButtonHandler(getRelease, saveItem)" type="button">Add release to wishlist</button>
      <button v-if="isTrackPath" @click="addButtonHandler(getTrack, saveItem)" type="button">Add track to wishlist</button>
      <button v-if="isChartPath" @click="addButtonHandler(getChart, saveItem)" type="button">Add chart to wishlist</button>
      <button @click="clearButtonHandler" type="button">Clear</button>
      <label>
        <input v-model="query" type="text" placeholder="Search...">
      </label>
    </header>
    <div class="tabs-buttons">
      <button @click="tab = 'releases'" type="button" class="tabs-button" :class="{ 'tabs-button--active' : tab === 'releases' }">Releases</button>
      <button @click="tab = 'tracks'" type="button" class="tabs-button" :class="{ 'tabs-button--active' : tab === 'tracks' }">Tracks</button>
      <button @click="tab = 'charts'" type="button" class="tabs-button" :class="{ 'tabs-button--active' : tab === 'charts' }">Charts</button>
    </div>
    <data-table :headers="headers"
                :items="filteredItems"
                :no-data="!query && Object.keys(items).length === 0 && items.constructor === Object"
                :no-results="!!query && Object.keys(filteredItems).length === 0 && filteredItems.constructor === Object">
      <template v-slot:title="{ item }">
        <a :href="item.url" target="_blank" v-html="item.title"></a>
        <template v-if="item.searchableByStores">
          <br>
          <a target="_blank" style="margin-right: 6px" title="Search in Google Play Market" :href="`https://play.google.com/store/search?q=${item.artistsSearch.join(', ')} ${item.titleSearch}&c=music`">
            <img src="../icons/google-play-market.png" width="20" height="20" alt="">
          </a>
          <a target="_blank" title="Search in Apple Music" :href="`https://music.apple.com/ru/search?term=${item.artistsSearch.join(', ')} ${item.titleSearch}`">
            <img src="../icons/apple-music.png" width="20" height="20" alt="">
          </a>
        </template>
      </template>
      <template v-slot:artists="{ item }">
        <span v-html="item.artists.join(', ')"></span>
      </template>
      <template v-slot:remixers="{ item }">
        <span v-html="item.remixers.join(', ')"></span>
      </template>
      <template v-slot:releaseDate="{ item }">
        <span v-html="item.releaseDate"></span>
      </template>
      <template v-slot:dateCreated="{ item }">
        <span v-html="item.dateCreated"></span>
      </template>
      <template v-slot:label="{ item }">
        <a :href="item.labelUrl" target="_blank" v-html="item.label"></a>
      </template>
      <template v-slot:id="{ item }">
        <span v-html="item.id"></span>
      </template>
      <template v-slot:genre="{ item }">
        <span v-html="item.genre"></span>
      </template>
      <template v-slot:genres="{ item }">
        <span v-html="item.genres"></span>
      </template>
      <template v-slot:bpm="{ item }">
        <span v-html="item.bpm"></span>
      </template>
      <template v-slot:cover="{ item }">
        <img :src="item.cover" width="50" height="50" alt="">
      </template>
      <template v-slot:action="{ item, id }">
        <span @click="removeButtonHandler(id)" style="cursor:pointer;">x</span>
      </template>
    </data-table>
  </div>
</template>

<script>
// components
import DataTable from "./DataTable";

// utils
import getRelease from '../get-release';
import getTrack from '../get-track';
import getChart from '../get-chart';
import createError from "../create-error";

// static data
import headers from '../table-headers';

export default {
  components: {
    DataTable,
  },
  data () {
    return {
      releases: {},
      tracks: {},
      charts: {},
      query: '',
      tab: 'releases',
      getRelease: getRelease,
      getTrack: getTrack,
      getChart: getChart,
      isReleasePath: false,
      isTrackPath: false,
      isChartPath: false,
      searchFields: ['title', 'artists', 'releaseDate', 'dateCreated', 'label', 'id', 'genre', 'genres', 'bpm'],
    }
  },
  computed: {
    reg() {
      if (!this.query) return null;
      return new RegExp(`(${this.query})(?![^<>]*>)`, 'ig');
    },
    headers() {
      switch (this.tab) {
        case 'releases':
          return headers.releases;
        case 'tracks':
          return headers.tracks;
        case 'charts':
          return headers.charts;
        default:
          return [];
      }
    },
    items() {
      switch (this.tab) {
        case 'releases':
          return this.releases;
        case 'tracks':
          return this.tracks;
        case 'charts':
          return this.charts;
        default:
          return [];
      }
    },
    filteredItems() {
      const { items } = this;
      if (!this.query || this.query.length < 1) return items;
      const result = {};
      Object.keys(items).forEach(id => {
        let fits = false;
        Object.keys(items[id]).forEach(prop => {
          if (!this.searchFields.includes(prop)) return;
          if (typeof items[id][prop] === 'string') {
            if (items[id][prop].toLowerCase().indexOf(this.query.toLowerCase()) !== -1) {
              fits = true;
              if (!result[id]) result[id] = {};
              result[id][prop] = items[id][prop].replace(this.reg, match => `<span style="background: #ff499a;">${match}</span>`);
            }
          }
          if (Array.isArray(items[id][prop])) {
            if (items[id][prop].join().toLowerCase().indexOf(this.query.toLowerCase()) !== -1) {
              fits = true;
              if (!result[id]) result[id] = {};
              result[id][prop] = items[id][prop].map(el => el.replace(this.reg, match => `<span style="background: #ff499a;">${match}</span>`));
            }
          }
        });
        if (fits) {
          Object.keys(items[id]).forEach(prop => {
            if (!result[id][prop]) result[id][prop] = items[id][prop];
          });
        }
      });
      return result;
    }
  },
  methods: {
    saveItem(result) {
      const item = result[0];
      const { id, type } = item;

      chrome.storage.sync.get(id, (res) => {
        if (!res[id]) {
          return chrome.storage.sync.set({[id]: item}, () => {
            const error = chrome.runtime.lastError;
            if (error) return createError(error);
            return this.$set(this[type + 's'], id, item), this.tab = type + 's';
          });
        }
        return alert(`You have already added this ${type}`);
      });
    },
    addButtonHandler(code, cb) {
      return chrome.tabs.query({active: true}, (tabs) => {
        const tab = tabs[0];
        chrome.tabs.executeScript(tab.id, {
          code
        }, cb);
      });
    },
    removeButtonHandler(id) {
      return chrome.storage.sync.remove(id, () => {
        if (this.tab === 'releases') this.$delete(this.releases, id);
        if (this.tab === 'tracks') this.$delete(this.tracks, id);
        if (this.tab === 'charts') this.$delete(this.charts, id);
      });
    },
    clearButtonHandler() {
      return chrome.storage.sync.clear(() => {
        const error = chrome.runtime.lastError;
        if (error) return createError(error);
        return this.$set(this, 'releases', {}), this.$set(this, 'tracks', {}), this.$set(this, 'charts', {});
      });
    },
    setLocation() {
      chrome.tabs.query({active: true}, (tabs) => {
        const tab = tabs[0];
        chrome.tabs.executeScript(tab.id, {
          code: `
          (function checkLocation() {
             if (document.location.origin !== 'https://www.beatport.com') return null;
             if (document.location.pathname.indexOf('/release/') !== -1) return 'isReleasePath';
             if (document.location.pathname.indexOf('/track/') !== -1) return 'isTrackPath';
             if (document.location.pathname.indexOf('/chart/') !== -1) return 'isChartPath';
          })()
          `
        }, (result) => {
          if (result && result[0] === 'isReleasePath') {
            this.isReleasePath = true;
            this.tab = 'releases';
          }
          if (result && result[0] === 'isTrackPath') {
            this.isTrackPath = true;
            this.tab = 'tracks'
          }
          if (result && result[0] === 'isChartPath') {
            this.isChartPath = true;
            this.tab = 'charts';
          }
        });
      });
    }
  },
  created() {
    this.setLocation();

    chrome.storage.sync.get(null, (res) => {
      if (Object.keys(res).length === 0 && res.constructor === Object) return;
      const tracks = {};
      const releases = {};
      const charts = {};
      for (let id in res) {
        if (res[id].type === 'release') releases[id] = res[id];
        if (res[id].type === 'track') tracks[id] = res[id];
        if (res[id].type === 'chart') charts[id] = res[id];
      }
      this.$set(this, 'releases', releases);
      this.$set(this, 'tracks', tracks);
      this.$set(this, 'charts', charts);
    });
  }
}
</script>

<style lang="scss">
  body {
    font-family: 'Source Sans Pro', sans-serif;
    width: 640px;
    padding: 0;
    margin: 0;
    background: #262626;
    color: #fff;
  }

  header {
    display: flex;
    padding: 12px;
  }

  button {
    background: #ff53a0;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    border: none;
    padding: 8px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 3px;
  }

  button:hover {
    background: #ff499a;
  }

  button:first-of-type {
    margin-right: 8px
  }

  .tabs-buttons {
    padding: 6px 12px;
  }

  button.tabs-button {
    background: transparent !important;
    font-size: 16px;
    position: relative;
    border-radius: 0;
    padding: 2px 0;
    margin-right: 8px;
    outline: none;
  }

  button.tabs-button.tabs-button--active {
    border-bottom: 2px solid #94d500;

    &::after {
      position: absolute;
      content: "";
      z-index: 1;
      width: 0;
      height: 0;
      top: calc(100% + 2px);
      left: calc(50% - 7px);
      border-color: #94d500 #262626 #262626;
      border-style: solid;
      border-width: 5px 7px;
    }
  }

  label {
    margin-left: auto;
  }

  input {
    box-sizing: border-box;
    min-height: 30px;
    border: 2px solid #94d500;
    outline: none;
    background: transparent;
    color: #ffffff;
  }

  input[disabled] {
    opacity: 0.3;
  }

  .remixed {
    color: #8c8c8c;
  }
</style>
