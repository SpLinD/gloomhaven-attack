import {type Card} from "./cards.ts";

const shuffleCards = (cards: Card[]
) => {
    return cards.map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
}

export default shuffleCards