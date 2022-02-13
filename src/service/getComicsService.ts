// Types
import {
    pagedResultModel,
    comicListResultItemType,
    comicsQueryParamTypes
} from 'models'

// API
import Config from './Config'
import { marvelHttp } from './httpService'

// Custom query for character detail page
// Get id for character id and other params for queries
function serialize(obj: any) {
    let clone = Object.assign({}, obj)
    let currentId = clone.id

    delete obj.id

    let str = []
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
        }
    return `/${currentId}/comics?${str.join('&')}`
}

// Filter params query
function getFinalFilterParam(qp: comicsQueryParamTypes) {
    const pageFieldsAndFilterObjs: comicsQueryParamTypes = {
        apikey: qp.apikey,
        id: qp.id,
        limit: qp.limit,
    }
    const query = serialize(pageFieldsAndFilterObjs)
    return query
}

const getComicsService = async (
    queryParams: comicsQueryParamTypes
): Promise<pagedResultModel<comicListResultItemType> | undefined> => {
    const filterParams = getFinalFilterParam(queryParams)
    let result = await marvelHttp().get(Config.API.GET_CHARACTERS + filterParams)
    return result.data
}

export default getComicsService