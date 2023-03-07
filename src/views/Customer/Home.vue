<template>
    <div class="container">
        <Header />
        <div class="row mt-2">
            <div class="col-4">
            </div>
            <div class="col-6">
                <form class="d-flex center" @submit.prevent="getData">
                    <input class="form-control me-2" @input="getData" v-model="searchText" type="search"
                        placeholder="Search by title-author-published-isbn-genre-publisher..." aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div class="col-2">
            </div>
        </div>
        <p class="text-center mt-2 fs-2" v-if="noData">No Data Found</p>
        <div class="row mt-3" v-else>
            <div class="col-3">
                <Filter :filterData="filterData" @filterGetData="getFilterData" />
            </div>
            <div class="col-9">
                <div class="row">
                    <div v-for="book in books" class="col-6 col-xl-4">
                        <div class="card" style="width: 18rem;">
                            <img :src="book.image" :alt="book.name">
                            <div class="card-body">
                                <router-link :to="{
                                    name: 'show',
                                    params: { id: book.id }
                                }">
                                    <h5 class="card-title">{{ book.title }}</h5>
                                </router-link>
                                <p class="card-text">{{ book.description }}</p>
                                <p class="font-weight-bold">{{ book.published }}, {{ book.publisher }}</p>
                                <p class="font-weight-bold">Author: {{ book.author }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-end">
                            <li class="page-item" v-for="link in pagination.links">
                                <button class="page-link" :class="link.active ? 'active' : ''"
                                    @click="getPageData(link.url)" v-html="link.label"></button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
import Filter from '../../components/Filter.vue';
import Header from '../../components/Header.vue';
import { RouterLink, RouterView } from 'vue-router';

export default {
    components: { Filter, Header },
    data() {
        return {
            searchText: "",
            books: [],
            pagination: {
                links: [],
            },
            filters: {},
            filterData: [],
            errors: [],
            url: this.$hostname + "/api/index",
            noData: false
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let data = {}
            if (this.searchText) {
                data = { search: this.searchText }
            }
            if (Object.keys(this.filters).length > 0) {
                Object.assign(data, this.filters);
            }

            axios.get(this.url, { params: data })
                .then(response => {
                    this.books = response.data.data;
                    this.pagination.links = response.data.meta.links;
                    this.filterData = response.data.filters;
                    this.filters = {}
                    if (this.books.length == 0) {
                        this.noData = true
                    } else {
                        this.noData = false
                    }
                })
                .catch(e => {
                    this.errors.push(e);
                });
        },
        getPageData(url) {
            this.url = url;
            this.getData();
        },
        getFilterData(data) {
            this.filters = data;
            this.getData();
        }
    }
}
</script>