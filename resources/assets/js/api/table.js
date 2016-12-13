import Vue from 'vue';

export default {
    getData( NameTable ){
             return new Promise( (resolve, reject) => {
                 Vue.http.get('/' + NameTable).then(response => {
                     if (response.body.length > 0) {
                         resolve(JSON.parse(response.body));
                     }
                 }).catch( response => {
                     reject( response.body );
                 });
             });
    },
    setValue( NameModel, parameters ) {
        return new Promise( resolve => {
            Vue.http.post('/' + NameModel, parameters).then( response => {
                resolve(response.body);
            })
        });
    },
    deleteRow( NameModel, parameters){
        return new Promise( resolve => {
            Vue.http.delete('/' + NameModel + '?id=' + parameters.id ).then( response => {
                resolve(response.body);
            })
        })
    }
}