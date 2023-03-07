<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <svg class="bi me-2" width="40" height="32">
                <use xlink:href="#bootstrap"></use>
            </svg>
            <span class="fs-4">Filters</span>
        </a>
        <hr>
        <ul class="list-unstyled ps-0">
            <li class="mb-1" v-for="(filters, key) in filterData">
                <button class="btn btn-toggle align-items-center rounded collapsed fs-5 fw-bold text-capitalize"
                    data-bs-toggle="collapse" :data-bs-target="'#' + key" aria-expanded="false">
                    {{ key }}
                </button>
                <div class="collapse over overflow-list collapse show" :class="key in activeFilters ?? 'collapse show'"
                    :id="key">
                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li v-for="value in filters">
                            <input class="form-check-input" @change="getData(key, value)" type="checkbox"
                                :checked="Object.values(activeFilters).includes(value)" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                                &nbsp;&nbsp;{{ value }}
                            </label>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        filterData: Object
    },
    data() {
        return {
            activeFilters: {}
        }
    },
    methods: {
        getData(key, value) {
            if (Object.values(this.activeFilters).includes(value)) {
                delete this.activeFilters[key];
            } else {
                this.activeFilters[key] = value;
            }
            this.$emit('filterGetData', this.activeFilters);
        }
    }
}
</script>