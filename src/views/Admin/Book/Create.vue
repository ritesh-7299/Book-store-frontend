<template>
    <div class="container">
        <AdminHeader />
        <div class="row justify-content-center">

            <div class="col-sm-6 mt-4">
                <h2 class="text-primary text-center">Add Book</h2>
                <form enctype="multipart/form-data" @submit.prevent="submit()">
                    <div class="row">
                        <div class="form-group mt-2 col-6">
                            <label for="title">Title:</label>
                            <input type="text" class="form-control" v-model="form.title" id="title" />
                            <p class="text-danger" v-if="errors && errors.title">{{ errors['title'][0] }}</p>
                        </div>
                        <div class="form-group mt-2 col-6">
                            <label for="author">Author name:</label>
                            <input type="text" class="form-control" v-model="form.author" id="author" />
                            <p class="text-danger" v-if="errors && errors.author">{{ errors['author'][0] }}</p>
                        </div>
                    </div>
                    <div class="form-group mt-2">
                        <label for="description">Description:</label>
                        <textarea class="form-control" v-model="form.description" id="description" rows="3"></textarea>
                        <p class="text-danger" v-if="errors && errors.description">{{ errors['description'][0] }}</p>
                    </div>
                    <div class="row">
                        <div class="form-group mt-2 col-6">
                            <label for="genre">Genre:</label>
                            <input type="text" class="form-control" v-model="form.genre" id="genre" />
                            <p class="text-danger" v-if="errors && errors.genre">{{ errors['genre'][0] }}</p>
                        </div>
                        <div class="form-group mt-2 col-6">
                            <label for="isbn">Isbn:</label>
                            <input type="text" class="form-control" v-model="form.isbn" id="isbn" />
                            <p class="text-danger" v-if="errors && errors.isbn">{{ errors['isbn'][0] }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group mt-2 col-6">
                            <label for="publisher">Publisher name:</label>
                            <input type="text" class="form-control" v-model="form.publisher" id="publisher" />
                            <p class="text-danger" v-if="errors && errors.publisher">{{ errors['publisher'][0] }}</p>
                        </div>
                        <div class="form-group mt-2 col-6">
                            <label for="published">Published date:</label>
                            <input type="date" class="form-control" v-model="form.published" id="published" />
                            <p class="text-danger" v-if="errors && errors.published">{{ errors['published'][0] }}</p>
                        </div>
                    </div>
                    <div class="form-group mt-2 col-6">
                        <label class="form-label" for="file">Upload file</label>
                        <input type="file" class="form-control" @change="uploadFile" id="file" />
                        <p class="text-danger" v-if="errors && errors.file">{{ errors['file'][0] }}</p>
                    </div>
                    <div class="mt-2 row">
                        <div class="col-3">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                        <div class="col-3">
                            <button type="botton" @click="goBack" class="btn btn-secondary">Go Back</button>
                        </div>
                    </div>

                </form>
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
    methods: {
        submit() {
            this.errors = [];
            const config = {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'token': this.token,
                    'content-type': 'multipart/form-data'
                }
            }
            let data = new FormData();

            data.append('title', this.form.title)
            data.append('author', this.form.author)
            data.append('genre', this.form.genre)
            data.append('description', this.form.description)
            data.append('isbn', this.form.isbn)
            data.append('file', this.form.file)
            data.append('published', this.form.published)
            data.append('publisher', this.form.publisher)

            console.log(data)

            axios.get(this.$hostname + '/sanctum/csrf-cookie').then(response => {
                axios.post(this.$hostname + '/api/book', data, config).then(response => {
                    if (response.data.success) {
                        alert("data saved!")
                        this.goBack()
                    }
                }).catch((e) => {
                    this.errors = e.response.data.errors;
                })
            });
        },
        uploadFile(e) {
            this.form.file = e.target.files[0];
        },
        goBack() {
            this.$router.push({ name: 'admin.dashboard' })
        }
    }
}
</script>