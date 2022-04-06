import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import TimeLine from '../../src/components/TimeLine.vue'
import { today, thisWeek, thisMonth } from '../../src/mocks'

describe('TimeLine', () => {
    it('renders today post default', () => {
        const wrapper = mount(TimeLine)
        expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    })

    it('update when the period is click', async() => {
        const wrapper = mount(TimeLine)

        await wrapper.get('[data-test="This Week"]').trigger('click')

        expect(wrapper.html()).toContain(today.created.format('Do MMM'))
        expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    })

    it('update when the period is click', async() => {
        const wrapper = mount(TimeLine)

        await wrapper.get('[data-test="This Month"]').trigger('click')

        expect(wrapper.html()).toContain(today.created.format('Do MMM'))
        expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
        expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
    })
})
