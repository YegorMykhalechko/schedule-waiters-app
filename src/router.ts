import {createRouter, createWebHistory} from 'vue-router'

export function routerWithStore() {
    return createRouter({
        history: createWebHistory(process.env.NODE_ENV === 'production' ? '/vuejs-composition-api-course' : undefined),
        routes: []
    })
}
