<template>
    <div class="container">
        <AdminHeader />
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">
                <p class="text-danger" v-if="errors && errors.message">{{ errors.message[0] }}</p>
                <form @submit.prevent="login()">
                    <div class="form-group mt-3">
                        <label for="email">Email Address:</label>
                        <input type="email" v-model="form.email" class="form-control" id="email" />
                        <p class="text-danger" v-if="errors && errors.email">{{ errors['email'][0] }}</p>
                    </div>
                    <div class="form-group mt-3">
                        <label for="password">Password:</label>
                        <input type="password" v-model="form.password" class="form-control" id="password" />
                        <p class="text-danger" v-if="errors && errors.password">{{ errors['password'][0] }}</p>
                    </div>
                    <button type="submit" class="btn btn-primary mt-3">Login</button>
                </form>
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
            form: {
                email: '',
                password: ''
            },
            errors: []
        };
    },
    methods: {
        login() {
            this.errors = [];
            axios.get(this.$hostname + '/sanctum/csrf-cookie').then(response => {
                axios.post(this.$hostname + '/api/login', this.form).then(response => {
                    if (response.data.success) {
                        localStorage.setItem('token', response.data.data.token)
                        this.$router.push({ name: 'admin.dashboard' })
                    }
                }).catch((e) => {
                    this.errors = e.response.data.message;
                })
            });

        }
    }
}
</script>