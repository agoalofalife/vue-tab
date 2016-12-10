<template>
    <div >
        <div class="search">
            <input type="text" class="form-control"  placeholder="Название таблицы" @input="handlerNameTable($event)">
        </div>
        <table class="table table-hover" v-if="state">
            <thead>
            <tr>
                <th  v-for="title in AllColumns">{{ title }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="value in AllData" @dblclick="rename($event)"  v-on:keyup.enter="enter($event)">
                <td v-for="(column, property) in value"  :data-id="value.id" :data-title="property" >{{ column }}</td>
            </tr>
            </tbody>
        </table>
        <p v-else> <img class="preloader" src="/images/preloader.gif"></p>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'AllData',
                'AllColumns'
            ]),
        },
        data(){
          return {
              state : false,
              NameTable : null
          }
        },
        methods : {
            handlerNameTable(e){
                this.state = false;
                this.$store.commit( 'setNameTable', e.target.value );

                this.$store.dispatch('AllData').then( () => {
                    this.state = this.$store.getters.AllData;
                } );
            },
            rename(e) {

                this.preRename(e.target);
                let input            = document.createElement('input');
                input.dataset.id     = e.target.dataset.id;
                input.dataset.title  = e.target.dataset.title;
                input.className      = 'form-control';
                input.value          = e.target.textContent;
                e.target.replaceWith(input);
            },
            enter(e) {
                this.$store.dispatch('changeValue',{
                    id    : e.target.dataset.id,
                    title : e.target.dataset.title,
                    value : e.target.value
                }).then( () => {
                 this.preRename();
                })
            },
            preRename(  ){
                let currentInput = document.querySelector('.table input');

                if ( currentInput !== null )
                {
                    let td           = document.createElement('td');
                    td.innerHTML     = currentInput.value;
                    this.assignAttributes(td, currentInput);
                    currentInput.replaceWith(td);
                }
            },
            assignAttributes(elem, target){
                elem.dataset.id    = target.dataset.id,
                elem.dataset.title = target.dataset.title
            }
        },
        created(){
            this.$store.dispatch('AllData').then( () => {
                this.state = this.$store.getters.AllData;
            } );
        }
    }
</script>
<style scoped>
    .search {
        margin: 40px 350px;
    }
    .preloader{
        width: 20%;
        display: block;
        margin: 0 auto;
    }
</style>