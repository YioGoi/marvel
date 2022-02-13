// Types
import {
    pagedResultModel,
    charactersQueryParamTypes,
    characterListResultItemType
} from 'models'

// API
import Config from './Config'
import { marvelHttp } from './httpService'

// serialize func for preparing the query
function serialize(obj: any) {
    let str = []
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
        }
    return '?' + str.join("&")
}

// Fiter params query
function getFinalFilterParam(qp: charactersQueryParamTypes) {
    const pageFieldsAndFilterObjs: charactersQueryParamTypes = {
        apikey: qp.apikey,
        limit: qp.limit,
        offset: qp.offset,
    }
    const query = serialize(pageFieldsAndFilterObjs)
    return query
}

const getCharactersService = async (
    queryParams: charactersQueryParamTypes
): Promise<pagedResultModel<characterListResultItemType> | undefined> => {
    const filterParams = getFinalFilterParam(queryParams)
    let result = await marvelHttp().get(Config.API.GET_CHARACTERS + filterParams)
    return result.data
}

export default getCharactersService