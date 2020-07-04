<template>
    <table class="data-table">
        <tr>
            <th v-for="header in headers" :key="header.value">{{ header.text }}</th>
        </tr>
        <tr v-if="noData">
            <td :colspan="headers.length" style="padding: 20px">{{ noDataText }}</td>
        </tr>
        <tr v-if="noResults">
            <td :colspan="headers.length" style="padding: 20px">{{ noResultsText }}</td>
        </tr>
        <tr v-for="(item, id) in items" :key="id">
            <td v-for="header in headers" :key="`${id}-${header.value}`">
                <slot :name="header.value" :item="item" :id="id">
                    {{ item[header.value] }}
                </slot>
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "DataTable",
        props: {
          headers: {
              type: Array,
              default: () => [],
          },
          items: {
              type: [Object, Array],
              default: () => {},
          },
          noResults: {
              type: Boolean,
              default: false,
          },
          noData: {
              type: Boolean,
              default: false,
          },
          noDataText: {
              type: String,
              default: 'Your wishlist is empty'
          },
          noResultsText: {
              type: String,
              default: 'Nothing found'
          }
        },
    }
</script>

<style lang="scss" scoped>
    table {
        border-collapse: collapse;
        width: 100%;
    }

    th:first-of-type,
    td:first-of-type {
        padding-left: 12px;
    }

    th:last-of-type,
    td:last-of-type {
        padding-right: 12px;
    }

    th {
        padding: 8px 4px 4px 4px;
        text-align: left;
        font-size: 13px;
        text-transform: uppercase;
        font-weight: 400;
        vertical-align: text-top;
        letter-spacing: 0.4px;
        position: sticky;
        top: 0;
        background: #262626;
    }

    td {
        padding: 4px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.3px;
        background: #373737;
        border-bottom: 3px solid #262626;
        vertical-align: top;
    }

    td:nth-of-type(2) {
        max-width: 210px;
        color: #39c1de;
    }

    td:nth-last-of-type(2) {
        vertical-align: middle;
        text-align: center;
        line-height: 0;
    }

    td:last-of-type {
        vertical-align: middle;
        text-align: center;
        line-height: 0;
        font-size: 15px;
    }

    td a {
        display: inline-block;
        color: #ffffff;
        text-decoration: none;

        &:first-of-type {
            margin-bottom: 4px;
        }
    }

    td a:hover {
        text-decoration: underline;
    }
</style>
