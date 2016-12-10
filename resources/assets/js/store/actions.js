import table from '../api/table';

export default {
    AllData( store ) {
        let NameTable = store.getters.NameTable;
        return table.getData( NameTable ).then( ( responce ) => {
             return new Promise( resolve => {
                store.commit('setAllData', responce);
                 resolve(responce);
             }).then( responce => {
                 for (var first in responce) break;
                  let list = Object.getOwnPropertyNames(responce[first]);

                 for (let element in ['__ob__'])
                 {
                     list.splice( list.indexOf(['__ob__'][element]), 1);
                 }
                store.commit('setTitleColumns', list);
             });
         });
    },
    changeValue( store, parameters ){
        let NameTable = store.getters.NameTable;

        return table.setValue( NameTable, parameters).then( response => {
            store.commit('setSpecificallyPlace', response);
        });

    }
}