<template>
    <div class="container">
        <Header />
        <div class="row mt-5">
            <div class="row">
                <div class="col-md-5">
                    <div class="project-info-box mt-0">
                        <h5>Book Description</h5>
                        <p class="mb-0">{{ book.description }}</p>
                    </div>

                    <div class="project-info-box">
                        <p><b>Title:</b> {{ book.title }}</p>
                        <p><b>Published Date:</b> {{ book.published }}</p>
                        <p><b>Author:</b> {{ book.author }}</p>
                        <p><b>Publisher:</b> {{ book.publisher }}</p>
                        <p><b>Isbn:</b> {{ book.isbn }}</p>
                    </div>

                    <div class="project-info-box mt-0 mb-0">
                        <p class="mb-0">
                            <router-link :to="{
                                name: 'home'
                            }"><a href="#" class="btn btn-primary">Go Back</a></router-link>
                        </p>
                    </div>
                </div>

                <div class="col-md-7">
                    <img :src="book.image" :alt="book.title" class="rounded">
                    <div class="project-info-box">
                        <p><b>Genre:</b> {{ book.genre }}</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
import Header from '../../components/Header.vue';

export default {
    components: { Header },
    data() {
        return {
            id: this.$route.params.id,
            book: [],
            errors: []
        };
    },
    mounted() {
        this.getData(this.$hostname + "/api/show/" + this.id);
    },
    methods: {
        getData(url) {
            axios.get(url)
                .then(response => {
                    this.book = response.data.data;
                })
                .catch(e => {
                    this.errors.push(e);
                });
        }
    },

}
</script>
<style scoped>
body {
    background: #f5f5f5;
    margin-top: 20px;
}

.project {
    margin: 15px 0;
}

.no-gutter .project {
    margin: 0 !important;
    padding: 0 !important;
}

.has-spacer {
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 30px;
}

.has-spacer-extra-space {
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 30px;
}

.has-side-spacer {
    margin-left: 30px;
    margin-right: 30px;
}

.project-title {
    font-size: 1.25rem;
}

.project-skill {
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0.06rem;
}

.project-info-box {
    margin: 15px 0;
    background-color: #fff;
    padding: 30px 40px;
    border-radius: 5px;
}

.project-info-box p {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #d5dadb;
}

.project-info-box p:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
}

img {
    width: 300px;
    height: 400px;
}

.rounded {
    border-radius: 5px !important;
}

.btn-xs.btn-icon {
    width: 34px;
    height: 34px;
    max-width: 34px !important;
    max-height: 34px !important;
    font-size: 10px;
    line-height: 34px;
}

.btn-circle {
    border-radius: 50% !important;
}

.project-info-box p {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #d5dadb;
}

p {
    font-family: "Barlow", sans-serif !important;
    font-weight: 300;
    font-size: 1rem;
    color: #686c6d;
    letter-spacing: 0.03rem;
    margin-bottom: 10px;
}

b,
strong {
    font-weight: 700 !important;
}
</style>