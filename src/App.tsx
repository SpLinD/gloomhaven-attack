import {useCallback, useState} from 'react'
import './App.css'
import {blessingCard, type Card, curseCard, defaultCards} from "./helpers/cards.ts";
import shuffleCards from "./helpers/shuffleCards.ts";


function App() {
    const [cards, setCards] = useState(shuffleCards(defaultCards));
    const [drawnCards, setDrawnCards] = useState<Card[]>([])
    const [needsReshuffle, setNeedsReshuffle] = useState(false)

    const shuffleDeck = useCallback(() => {
        setCards(shuffleCards([...cards, ...drawnCards.filter(card => card.putInDeckAfterDraw)]));
        setDrawnCards([]);
        setNeedsReshuffle(false);
    }, [cards, drawnCards]);

    const drawCard = useCallback(() => {
        const drawnCard = cards[cards.length - 1]
        setDrawnCards([...drawnCards, drawnCard])
        setCards(prev => prev.slice(0, -1))
        if (drawnCard.reshuffle) {
            setNeedsReshuffle(true)
        }
    }, [cards, drawnCards])

    const drawWithAdvantage = useCallback(() => {
        const drawnCard1 = cards[cards.length - 1]
        const drawnCard2 = cards[cards.length - 2]
        let usedCard = drawnCard1
        if (drawnCard2.value > drawnCard1.value) {
            usedCard = drawnCard2
            setDrawnCards([...drawnCards, drawnCard1, drawnCard2])
        } else {
            setDrawnCards([...drawnCards, drawnCard2, drawnCard1])
        }
        setCards(prev => prev.slice(0, -2))
        if (usedCard.reshuffle) {
            setNeedsReshuffle(true)
        }
    }, [cards, drawnCards])

    const drawWithDisadvantage = useCallback(() => {
        const drawnCard1 = cards[cards.length - 1]
        const drawnCard2 = cards[cards.length - 2]
        let usedCard = drawnCard1
        if (drawnCard2.value < drawnCard1.value) {
            usedCard = drawnCard2
            setDrawnCards([...drawnCards, drawnCard1, drawnCard2])
        } else {
            setDrawnCards([...drawnCards, drawnCard2, drawnCard1])
        }
        setCards(prev => prev.slice(0, -2))
        if (usedCard.reshuffle) {
            setNeedsReshuffle(true)
        }
    }, [cards, drawnCards])

    const addBlessing = useCallback(() => {
        setCards(prev => shuffleCards([...prev, blessingCard]))
    }, [])

    const addCurse = useCallback(() => {
        setCards(prev => shuffleCards([...prev, curseCard]))
    }, [])

    return (
        <>
            <div className="card">
                <span>cards left: {cards.length}</span>
                <div className="card-stack">
                    {cards.map((_, i) => (
                        <img
                            key={i}
                            src="images/top-small.jpg"
                            alt={`card-${i}`}
                            className="card-image"
                            style={{
                                '--x': `${i}px`,
                                '--y': `${i}px`,
                                '--z': cards.length - i,
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
                <div className="card-stack">
                    {[...drawnCards].reverse().map((card, i) => (
                        <img
                            key={i}
                            src={card.image}
                            alt={`card-${i}`}
                            className="card-image"
                            style={{
                                '--x': `${i}px`,
                                '--y': `${i}px`,
                                '--z': drawnCards.length - i,
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
                <button onClick={needsReshuffle ? shuffleDeck : drawCard}>
                    {needsReshuffle ? 'Shuffle Deck' : 'Draw Card'}
                </button>
                <div className="draw-button-container">
                    <button onClick={drawWithDisadvantage} disabled={needsReshuffle}>
                        Draw with disadvantage
                    </button>

                    <button onClick={drawWithAdvantage} disabled={needsReshuffle}>
                        Draw with advantage
                    </button>
                </div>
                <div className="add-button-container">
                    <button onClick={addCurse} disabled={needsReshuffle}>
                        Add Curse
                    </button>
                    <button onClick={addBlessing} disabled={needsReshuffle}>
                        Add blessing
                    </button>
                </div>
            </div>
        </>
    )
}

export default App
