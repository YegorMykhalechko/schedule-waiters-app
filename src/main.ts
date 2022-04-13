import { createApp } from 'vue'
import App from './App.vue'
import 'highlight.js/styles/atom-one-dark.css'
import axios from "axios";
import { Post, today, thisWeek, thisMonth } from './mocks'


function delay() {
    return new Promise(res => {
        setTimeout(res, 2000);
    });
}

// @ts-ignore
// axios.get = async(url: string) => {
//     if(url === '/posts') {
//         await delay()
//         return Promise.resolve({
//             data: [today, thisWeek, thisMonth]
//         });
//
//     }
// }

const app = createApp(App)
app.mount('#app')
