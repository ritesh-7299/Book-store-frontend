<template>
    <div class="container">
        <AdminHeader />
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">
                <h2 class="text-primary text-center">View Book</h2>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row">Title</th>
                            <td>{{ form.title }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Author name</th>
                            <td>{{ form.author }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Description</th>
                            <td>{{ form.description }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Genre</th>
                            <td>{{ form.genre }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Isbn</th>
                            <td>{{ form.isbn }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Publisher name</th>
                            <td>{{ form.publisher }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Published date</th>
                            <td>{{ form.published }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Image</th>
                            <td><img class="img-thumbnail" :src="form.file" /></td>
                        </tr>
                    </tbody>
                </table>
                <div class="mt-2 row">
                    <div class="col-3">
                        <button type="botton" @click="goBack" class="btn btn-secondary">Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import AdminHeader from '../../../components/Admin/AdminHeader.vue';

export default {
    components: { AdminHeader },
    data() {
        return {
            id: this.$route.params.id,
            form: {
                title: "",
                author: "",
                genre: "",
                description: "",
                isbn: "",
                file: "",
                published: "",
                publisher: ""
            },
            errors: [],
            token: localStorage.getItem("token")
        };
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            axios.get(this.$hostname + '/sanctum/csrf-cookie').then(response => {
                axios.get(this.$hostname + '/api/book/' + this.id, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                    }
                }).then(response => {
                    if (response.data.success) {
                        this.form = response.data.data;
                    }
                })
            });
        },
        goBack() {
            this.$router.push({ name: 'admin.dashboard' })
        }
    }
}
</script>