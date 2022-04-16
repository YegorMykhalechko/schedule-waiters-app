import { ref } from "vue";

const show = ref(false)
const component = ref()
const props = ref()

export function useModal() {
    return {
        component,
        show,
        props,
        showModal: () => show.value = true,
        hideModal: () => show.value = false,
    }
}
