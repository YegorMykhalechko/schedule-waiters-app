import {reactive, readonly} from 'vue'
import axios from "axios";
import { Post, today, thisWeek, thisMonth } from './mocks'

interface State {
    posts: PostState
}

interface PostState {
    ids: string[]
    all: Map<string, Post>
    loaded: boolean
}

class Store {
    state: State

    constructor(initial: State) {
        this.state = reactive(initial)
    }

    getState() {
        return readonly(this.state)
    }

    async fetchPosts() {
        const response = await axios.get<Post[]>('/posts')
        const postState: PostState = {
            all: new Map(),
            ids: [],
            loaded: false
        }
        for (const post of response.data) {
            postState.ids.push(post.id)
            postState.all.set(post.id, post)
        }
        this.state.posts = postState
    }
}

const all = new Map<string, Post>()

const store = new Store({
    posts: {
        all,
        ids: [],
        loaded: false
    }
})

export function  useStore() {
    return store
}

store.getState().posts.loaded

