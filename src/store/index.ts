import { createStore } from 'vuex';

type dataType = {
  inputList: detailsType[];
};

export default createStore<dataType>({
  state: {
    inputList: [{
      detailsID: 0,
      categoryID: 1,
      detailDate: '',
      price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    }],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
