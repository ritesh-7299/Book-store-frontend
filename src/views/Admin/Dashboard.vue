<template>
    <div class="container">
        <AdminHeader />
        <div class="row mt-2">
            <div class="col-4"></div>
            <div class="col-6">
                <form class="d-flex center" @submit.prevent="getData">
                    <input class="form-control me-2" @input="getData" v-model="search" type="search"
                        placeholder="Search by title-author-published-isbn-genre-publisher..." aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div class="col-2">
                <button type="button" @click="addBook" class="btn btn-secondary">Add Book</button>
            </div>
        </div>
        <div class="row mt-2">
            <p class="text-center mt-2 fs-2" v-if="noData">No Data Found</p>
            <table class="table table-bordered" v-else>
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Publisher</th>
                        <th scope="col">Published Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in tableData" :key="data.id">
                        <td>{{ data.title }}</td>
                        <td>{{ data.author }}</td>
                        <td>{{ data.publisher }}</td>
                        <td>{{ data.published }}</td>
                        <td>
                            <router-link class="m-1" :to="{
                                name: 'admin.edit',
                                params: { id: data.id }
                            }">
                                Edit
                            </router-link>
                            <router-link class="m-1" :to="{
                                name: 'admin.show',
                                params: { id: data.id }
                            }">
                                View
                            </router-link>
                            <span @click.prevent="deleteBook(data.id, data.title)">
                                <a aria-current="page" href="" class="router-link-active router-link-exact-active m-1">
                                    Delete
                                </a>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="row">
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                        <li class="page-item" v-for="link in pagination.links">
                            <button class="page-link" :class="link.active ? 'active' : ''" @click="getPageData(link.url)"
                                v-html="link.label"></button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import AdminHeader from '../../components/Admin/AdminHeader.vue';
export default {
    components: { AdminHeader },
    data() {
        return {
            search: '',
            tableData: [],
            errors: [],
            pagination: {
                links: [],
            },
            token: localStorage.getItem("token"),
            url: this.$hostname + "/api/book",
            noData: false
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            axios.get(this.url, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    token: this.token
                },
                params: {
                    search: this.search
                }
            })
                .then(response => {
                    this.tableData = response.data.data
                    this.pagination.links = response.data.meta.links;
                    if (this.tableData.length == 0) {
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
        deleteBook(id, title) {
            if (confirm("Are you sure you want to delete " + title + " book?")) {
                axios.delete(this.$hostname + "/api/book/" + id, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        token: this.token
                    }
                })
                    .then(response => {
                        if (response.data.success) {
                            alert(title + " book is deleted.")
                            this.getData()
                        }
                    })
                    .catch(e => {
                        this.errors.push(e);
                    });
            }
        },
        addBook() {
            this.$router.push({ name: "admin.create" });
        }
    },
}
</script>