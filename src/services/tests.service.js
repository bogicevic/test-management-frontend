import BaseHttpService from './base-http.service';
import queryString from 'query-string';

export default class TestsService extends BaseHttpService {
    fetchTests({ status, search }) {
        const queryObj = {};

        if (status.length) {
            queryObj.status = status;
        }

        if (search.length) {
            queryObj.search = search;
        }

        const queryStr = queryString.stringify(queryObj);
        return this.get('tests' + (queryStr ? `?${queryStr}` : ''));
    }

    async deleteTest(id) {
        await this.delete(`tests/${id}`);
    }

    updateTestStatus(id, status) {
        return this.patch(`tests/${id}/status`, { status });
    }

    createTest(doorsId, description) {
        return this.post(`tests`, { doorsId, description });
    }
}
