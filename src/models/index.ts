export interface charactersQueryParamTypes {
    apikey: string | undefined
    limit: number
    offset: number
}
export interface comicsQueryParamTypes {
    apikey: string | undefined
    id: number
    limit: number
}

export interface pagedResultModel<T> {
    code: number
    status: string
    copyright: string
    attributionText: string
    attributionHTML: string
    etag: string
    data?: {
        offset: number
        limit: number
        total: number
        count: number
        results: T[]
    } | undefined
}

export interface characterListResultItemType {
    id: number
    name: string
    description: string
    modified: string
    thumbnail: {
        path: string
        extension: string
    }
    resourceURI: string
    comics: {}
    series: {}
    stories: {}
    events: {}
    urls: {}[]
}
export interface comicListResultItemType {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: null;
    modified: string;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    dates: {}[]
    thumbnail: {
        path: string
        extension: string
    }
}

export interface charactersStates {
    loading: boolean
    error: boolean
    errorString: string | undefined
    characterList: {} | null | undefined
    comicListById: {} | null | undefined
    offset: number
}

export type LocationTypes = {
    state: {
        character: {}
    } | any
}