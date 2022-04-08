
const leap = new Date(new Date().getFullYear(), 1, 29).getDate() === 29

export interface Month {
    id: string
    title: string
    day: number
}

export const months: Month[] = [
    {
        id: '1',
        title: 'January',
        day: 31
    },
    {
        id: '2',
        title: 'February',
        day: leap ? 29 : 28
    },
    {
        id: '3',
        title: 'March',
        day: 31
    },
    {
        id: '3',
        title: 'March',
        day: 31
    },
    {
        id: '4',
        title: 'April',
        day: 30
    },
    {
        id: '5',
        title: 'May',
        day: 31
    },
    {
        id: '6',
        title: 'June',
        day: 30
    },
    {
        id: '7',
        title: 'July',
        day: 31
    },
    {
        id: '8',
        title: 'August',
        day: 31
    },
    {
        id: '9',
        title: 'September',
        day: 30
    },
    {
        id: '10',
        title: 'October',
        day: 31
    },
    {
        id: '11',
        title: 'November',
        day: 30
    },
    {
        id: '12',
        title: 'December',
        day: 31
    }
]



