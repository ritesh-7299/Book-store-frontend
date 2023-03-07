<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">My Book Store</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div v-if="!showLinks" class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <router-link class="px-5" :to="{
                    name: 'admin.login'
                }">
                    Login
                </router-link>
                <router-link :to="{
                    name: 'admin.register'
                }">
                    Register
                </router-link>
            </div>
            <div v-else class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <a aria-current="page" href="" @click.prevent="logout()"
                    class="router-link-active router-link-exact-active px-5"> Logout
                </a>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    data() {
        return {
            showLinks: localStorage.getItem('token') ? true : false
        }
    },

    methods: {
        logout() {
            localStorage.removeItem("token");
            this.$router.push({ name: 'admin.login' })
        }
    }
}
</script>