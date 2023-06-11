import { createStore } from 'vuex';

type authType = {
  userID: string | null;
  userName: string | null;
};

type dataType = {
  inputList: detailsType[];
  categoryList: categoryType[];
  statisticsData: statisticsType[];
  auth: authType;
};

export default createStore<dataType>({
  state: {
    inputList: [],
    categoryList: [],
    statisticsData: [],
    auth: {
      userID: sessionStorage.getItem('userID'),
      userName: sessionStorage.getItem('userName')
    }
  },
  getters: {
  },
  mutations: {
    initInputList: (state) => {
      state.inputList = [];
      const input: detailsType = {
        detailsID: 0,
        categoryID: state.categoryList[0].categoryID,
        detailDate: '',
        price: null,
        memo: null,
      };
      state.inputList.push(input);
    },
    loadCategory: (state) => {
      const c1 = {
        categoryID: 1,
        categoryName: 'cate1'
      };
      state.categoryList.push(c1);
      const c2 = {
        categoryID: 2,
        categoryName: 'cate2'
      };
      state.categoryList.push(c2);
      const c3 = {
        categoryID: 3,
        categoryName: 'cate3'
      };
      state.categoryList.push(c3);
      const c4 = {
        categoryID: 4,
        categoryName: 'cate4'
      };
      state.categoryList.push(c4);
    },
    setAuth: (state, payload: authType) => {
      state.auth.userID = payload.userID;
      state.auth.userName = payload.userName;
      sessionStorage.setItem('userID', String(payload.userID));
      sessionStorage.setItem('userName', String(payload.userName));
    },
    setCategory: (state, payload: categoryType[]) => {
      // console.log('start');
      // console.log(payload);
      state.categoryList = [];
      for(let i = 0; i < payload.length; i++){
        // console.log(i);
        const tmp: categoryType = payload[i];
        // console.log(tmp);
        state.categoryList.push(tmp);
      }
    },
    setStatisticsData: (state, payload: statisticsType[]) => {
      state.statisticsData = [];
      const oldestDate = payload[payload.length - 1].month
      const oldestYear = Number(oldestDate.split('-')[0]);
      const oldestMonth = Number(oldestDate.split('-')[1]);
      let index = 0;
      const nowDate = new Date();
      const nowYear = nowDate.getFullYear();
      const nowMonth = nowDate.getMonth() + 1;
      if((oldestYear > nowYear) || ((oldestYear === nowYear) && (oldestMonth > nowMonth))) return;
      for(let y = nowYear; y >= oldestYear; y--){
        for(let m = 12; m >= 1; m--){
          if(y === nowYear && m > nowMonth) continue;
          const tmp = (index < payload.length) ? payload[index].month : null;
          const tmpYear = (tmp !== null) ? Number(tmp.split('-')[0]) : null;
          const tmpMonth = (tmp !== null) ? Number(tmp.split('-')[1]) : null;
          if((tmpMonth && tmpYear) && (y === tmpYear && m === tmpMonth)){
            const tmpData: statisticsType = payload[index];
            let total = 0;
            state.categoryList.forEach((elem: categoryType) => {
              total += Number(tmpData[elem.categoryName]);
            });
            const data: statisticsType = tmpData;
            data.month = data.month.replace('-', '/');
            data.total = total;
            state.statisticsData.push(data);
            index++;
          }
          else{
            const data: statisticsType = {
              month: String(y) + '/' + String(m),
              total: Number(0),
            };
            state.categoryList.forEach((elem: categoryType) => {
              data[elem.categoryName] = Number(0);
            });
            state.statisticsData.push(data);
          }
          if(y === oldestYear && m <= oldestMonth ) break;
        }
      }
      // console.log(state.statisticsData);
    },
    add: (state) => {
      const data = {
        detailsID: 0,
        categoryID: state.categoryList[0].categoryID,
        detailDate: '',
        price: null,
        memo: null,
      };
      state.inputList.push(data);
    },
  },
  actions: {
    loadCategory: (ctx) => {
      ctx.commit('loadCategory');
    },
    setCategory: (ctx, payload: categoryType[]) => {
      ctx.commit('setCategory', payload);
    },
    setStatisticsData: (ctx, payload: statisticsType[]) => {
      ctx.commit('setStatisticsData', payload);
    },
    add: (ctx) => {
      ctx.commit('add');
    },
  },
  modules: {
  }
})
