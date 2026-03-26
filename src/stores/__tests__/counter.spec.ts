import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { useCounterStore } from '../counter';

describe('Counter Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    
    it("increment compteur", () => {
        const store = useCounterStore();

        store.increment();
        store.increment();
        store.increment();
        store.increment();
        
        expect(store.count).toBe(4);
    })


});
