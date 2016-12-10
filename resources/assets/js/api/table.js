import Vue from 'vue';

export default {
    getData( NameTable ){
             return new Promise((resolve) => {
                 Vue.http.get('/' + NameTable).then(( responce ) => {
                     if ( responce.body.length > 0 ) {
                         resolve(JSON.parse(responce.body ));
                     }
                 });
        }, reject => {
                 reject();
                    });
    },
    setValue( NameModel, parameters ) {
        return new Promise( (resolve) => {
            Vue.http.post('/' + NameModel, parameters).then( response => {
                resolve(response.body);
            })
        });
    }
}