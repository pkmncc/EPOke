declare module 'ps' {
    type ID = '' | string & {__isID: true}
    type Generation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    type Stat = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe'
    type Gender = 'M' | 'F' | 'N' | ''
    type StatsTable<T = number> = {[stat in Stat]: T }
    interface Nature {
        name: string
        plus?: Stat
        minus?: Stat
        [k: string]: any
    }
    type PokemonSet<T = string> = {
        name: string,
        species: T,
        item: T,
        ability: T,
        moves: T[],
        nature: T,
        gender: Gender,
        evs: StatsTable<number>,
        ivs: StatsTable<number>,
        forcedLevel?: number,
        level: number,
        shiny?: boolean,
        happiness?: number,
        pokeball?: T,
        hpType?: string,
    }
    interface Effect {
        id: ID
        name: string
        exists: boolean
    }
    interface Ability extends Effect {}
    interface Item extends Effect {
        megaStone?: string
        megaEvolves?: string
    }
    type MoveCategory = 'Physical' | 'Special' | 'Status'
    interface Move extends Effect {
        basePower: number
        category: MoveCategory
        type: string
    }
    type Nonstandard = 'Glitch' | 'Past' | 'Future' | 'CAP' | 'LGPE' | 'Pokestar' | 'Custom'
    interface Species extends Effect {
        abilities: {0: string, 1?: string, H?: string, S?: string}
        baseStats: StatsTable<number>
        species: string
        types: string[]
        baseSpecies?: string
        forme?: string
        isNonstandard?: Nonstandard | null
        tier?: string
        eventOnly?: boolean
    }
    interface Type {
        damageTaken: {[attackingTypeNameOrEffectid: string]: number}
        HPdvs?: Partial<StatsTable<number>>
        HPivs?: Partial<StatsTable<number>>
    }
    interface DexTable<T> {
        [key: string]: T
    }
    interface Format {
        id: ID
        defaultLevel?: number
        maxLevel?: number
    }
    class Dex {
        static get(): Dex;
        static forFormat(format?: string): Promise<Dex>

        Abilities: DexTable<Ability>
        Items: DexTable<Item>
        Moves: DexTable<Move>
        Species: DexTable<Species>

        Aliases: {[id: string]: string}
        Natures: DexTable<Nature>
        Types: DexTable<Type>

        format: Format
        gen: Generation

        getAbility(name: string): Ability | undefined
        getItem(name: string): Item | undefined
        getMove(name: string): Move | undefined
        getSpecies(name: string): Species | undefined

        getNature(name: string): Nature | undefined
        getType(name: string): Type | undefined

        hasFormatsDataTier(name: string): boolean
    }
    class TeamValidator {
        constructor(dex: Dex)
        validateTeam(team: PokemonSet[], skipSets?: Record<string, Record<string, boolean>>): string[] | null
        validateSet(set: PokemonSet): string[] | null
        checkSpecies(species: string): [string[] | null, Record<string, boolean>]
    }
    function toID(text: any): ID
    function getNature(n: string): Nature | undefined
    function getStat(s: string): Stat | undefined
    function displayStat(str: string, full?: boolean, gen?: Generation): string
    function calcStat(stat: Stat, base: number, iv: number, ev: number, level: number, nature?: Nature, gen?: Generation): number
    function statToEV(stat: Stat, val: number, base: number, iv: number, level: number, nature?: Nature, gen?: Generation): number
    function hiddenPower(ivs: StatsTable<number>, gen?: number): {type: string, basePower: number} | undefined
}