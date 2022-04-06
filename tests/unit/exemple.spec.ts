import { mount } from '@vue/test-utils'
import TimeLine from '../../src/components/TimeLine.vue'

describe('TimeLine', () => {
    it('renders today post default', () => {
        const wrapper = mount(TimeLine)

        console.log(wrapper.html())
        expect(wrapper.html()).toContain('6th Apr')
    })
})
