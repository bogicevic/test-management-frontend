import { observable, action } from 'mobx';

export default class TestsStore {
    @observable tests = [];
    @observable filters = { status: '', search: '' };

    constructor(testsService) {
        this.testsService = testsService;
    }

    updateFilters({ status, search }) {
        this.filters.status = status;
        this.filters.search = search;
        this.fetchTests();
    }

    @action
    resetTests() {
        this.tests = [];
    }

    @action
    async fetchTests() {
        const result = await this.testsService.fetchTests(this.filters);

        if (result) {
            this.tests = result.data;
        }
    }

    @action
    async createTest(doorsId, description) {
        const result = await this.testsService.createTest(doorsId, description);

        if (result) {
            this.tests.push(result.data);
        }
    }

    @action
    async deleteTest(id) {
        const idx = this.tests.findIndex((test) => test.id === id);
        await this.testsService.deleteTest(id);
        this.tests.splice(idx, 1);
    }

    @action
    async updateTestStatus(id, status) {
        const test = this.tests.find((test) => test.id === id);
        await this.testsService.updateTestStatus(id, status);
        test.status = status;
    }
}
