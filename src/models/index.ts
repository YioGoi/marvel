export interface charactersQueryParamTypes {
    apikey: string | undefined
    limit: number
    offset: number
}

export interface pagedResultModel<T> {
    code: number
    status: string
    copyright: string
    attributionText: string
    attributionHTML: string
    etag: string
    data: {
        offset: number
        limit: number
        total: number
        count: number
        results: T[]
    }

}

export interface characterListResultItemType {
    id: number
    name: string
    description: string
    modified: string
    thumbnail: {}
    resourceURI: string
    comics: {}
    series: {}
    stories: {}
    events: {}
    urls: {}[]
}