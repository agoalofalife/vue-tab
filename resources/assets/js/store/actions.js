import table from '../api/table';

export default {
    AllData( store ) {
        let NameTable = store.getters.NameTable;
        return table.getData( NameTable ).then( response => {
             return new Promise( resolve => {
                store.commit('setAllData', response);
                 resolve(response);
             }).then( response => {
                 for (var first in response) break;
                  let list = Object.getOwnPropertyNames(response[first]);

                 for (let element in ['__ob__'])
                 {
                     list.splice( list.indexOf(['__ob__'][element]), 1);
                 }

                store.commit('setTitleColumns', list);
             }).catch( response => {
                 // response from server with error
             });
         });
    },
    changeValue( store, parameters ){
        let NameTable = store.getters.NameTable;

        return table.setValue( NameTable, parameters).then( response => {
            store.commit('setSpecificallyPlace', response);
        });
    },
    removeRow( store, parameters) {
        let NameTable = store.getters.NameTable;

        return table.deleteRow( NameTable, parameters).then( response => {
            store.commit( 'remove', response.id );
        })
    }
}