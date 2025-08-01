export interface Card {
    image: string
    value: number
    reshuffle: boolean
    putInDeckAfterDraw: boolean
}

const minusOneCard = {image: 'images/-1-small.jpg', value: -1, reshuffle: false, putInDeckAfterDraw: true}
const zeroCard = {image: 'images/0-small.jpg', value: 0, reshuffle: false, putInDeckAfterDraw: true}
const plusOneCard = {image: 'images/1-small.jpg', value: +1, reshuffle: false, putInDeckAfterDraw: true}


export const defaultCards: Card[] = [{image: 'images/null-small.jpg', value: -10, reshuffle: true, putInDeckAfterDraw: true}, {
    image: 'images/2x-small.jpg',
    value: +10,
    reshuffle: true,
    putInDeckAfterDraw: true
}, {
    image: 'images/-2-small.jpg',
    value: -2,
    reshuffle: false,
    putInDeckAfterDraw: true
},
    minusOneCard,
    minusOneCard, minusOneCard, minusOneCard, minusOneCard,
    zeroCard,
    zeroCard, zeroCard, zeroCard, zeroCard, zeroCard,
    plusOneCard,
    plusOneCard, plusOneCard, plusOneCard, plusOneCard, {
        image: 'images/2-small.jpg',
        value: +2,
        reshuffle: false,
        putInDeckAfterDraw: true
    }]

export const blessingCard: Card = {image: 'images/bless-small.jpg', value: 10, reshuffle: false, putInDeckAfterDraw: false}

export const curseCard: Card = {image: 'images/curse-small.jpg', value: -10, reshuffle: false, putInDeckAfterDraw: false}