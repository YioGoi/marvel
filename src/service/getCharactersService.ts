// Types
import {
    pagedResultModel,
    charactersQueryParamTypes,
    characterListResultItemType
} from 'models'

// API
import Config from './Config'
import { marvelHttp } from './httpService'


function getFinalFilterParam(qp: charactersQueryParamTypes) {
    const pageFieldsAndFilterObjs: charactersQueryParamTypes = {
        apikey: qp.apikey,
        limit: qp.limit,
        offset: qp.offset,
    }
    const json = JSON.stringify(pageFieldsAndFilterObjs)
    return encodeURIComponent(json)
}

const getCharactersService = async (
    queryParams: charactersQueryParamTypes
): Promise<pagedResultModel<characterListResultItemType> | undefined> => {
    const filterParams = getFinalFilterParam(queryParams)
    let result = await marvelHttp().get(Config.API.GET_CHARACTERS + filterParams)
    console.log(result)
    return result.data
}

export default getCharactersService