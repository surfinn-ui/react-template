import { ApiResponse } from 'apisauce';
import axios from 'axios';
import { IEpisodeModel } from '../../models/Episode.model';
import { api } from './api';
import { ApiBase } from './api.base';
import { getGeneralApiProblem } from './api.problem';
import { TApiResponse, TListOkResult } from './api.types';

class EpisodeApi extends ApiBase {
  baseUrl = 'https://api.rss2json.com/v1/api.json';

  async getEpisodes() {
    const response: ApiResponse<TApiResponse<IEpisodeModel>> = await axios.get(
      this.baseUrl,
      {
        params: {
          rss_url: 'https://feeds.simplecast.com/hEI_f9Dx',
        },
      },
    );

    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

    const result = response.data as any;
    return {
      kind: 'ok',
      data: result.items,
      info: result.feed,
    } as TListOkResult<IEpisodeModel>;
  }

  async fetch() {
    const response: ApiResponse<TApiResponse<IEpisodeModel>> =
      await api.apisauce.get(this.baseUrl, {
        rss_url: 'https://feeds.simplecast.com/hEI_f9Dx',
      });

    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

    const result = response.data as any;
    return {
      kind: 'ok',
      data: result.items,
      info: result.feed,
    } as TListOkResult<IEpisodeModel>;
  }
}

export const episodeApi = new EpisodeApi();
