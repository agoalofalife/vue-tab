<template>
    <div>
        <sidebar v-on:filterChange="filterChange" v-on:renameColumnTitle="renameColumnTitle"></sidebar>

        <div class="col-md-2 centering titleCoumnnAlias" v-show="renameColumn">
        <input v-for="title in TitleColumnsAlias" class="form-control form-group inputColumnAlias" :value="title" v-if="ActionColumn.indexOf(title) == -1">
            <button class="btn btn-primary btn-xs" @click="saveColumnAlias">Сохранить</button>
        </div>

        <div class="filter-list" v-show="filterState">
            <div class="list-group">
                <a href="#" class="list-group-item active">
                  Скрыть колонки
                </a>
                <a href="#" class="list-group-item" v-for="column in AllColumns" :data-name="column" v-if="ActionColumn.indexOf(column) == -1">
                    <label><input type="checkbox" :checked="ClosedСolumn.indexOf(column) != -1">  {{ column }}</label></a>
                <button type="button" class="btn btn-primary btn-lg active filter-btn" @click="saveFilter($event)">Сохранить</button>
            </div>
        </div>
        <div class="search">
            <input type="text" class="form-control"  placeholder="Название таблицы" @input="handlerNameTable($event)">
        </div>
        <div class="col-lg-11 col-md-11 centering">
            <div class="table-responsive ">
                <table class="table table-bordered" v-if="state" >
                    <thead>
                    <tr>
                        <th  class="active" v-for="title in TitleColumnsAlias" v-if="ClosedСolumn.indexOf(title) == -1">{{ title }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="value in AllData" @dblclick="rename($event)"  v-on:keyup.enter="enter($event)" :data-id="value.id" >
                        <td v-for="(column, property) in value"  :data-id="value.id" :data-title="property" v-if="ClosedСolumn.indexOf(property) == -1">{{ column }}</td>
                        <td>
                            <button class="btn btn-danger btn-xs">delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p v-else> <img class="preloader" src="/images/preloader.gif"></p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import sidebar from './sidebar.vue';
    import ls from 'local-storage';

    export default {
        computed: {
            ...mapGetters([
                'AllData',
                'AllColumns',
                'ClosedСolumn',
                'ActionColumn',
                'TitleColumnsAlias'
            ]),
        },
        data(){
          return {
              state        : false,
              NameTable    : null,
              filterState  : false,
              renameColumn : false,

          }
        },
        methods : {
            handlerNameTable(e){
                this.state = false;
                this.$store.commit( 'setNameTable', e.target.value );

                this.$store.dispatch('AllData').then( () => {
                    this.state = this.$store.getters.AllData;
                });
                this.$store.commit( 'setClosedColumns',  ls.get('ClosedСolumn') !== null ? ls.get('ClosedСolumn')[ls.get('NameTable')] : []);
            },
            rename(e) {
                this.resetInput(e.target);
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
                 this.resetInput();
                })
            },
            resetInput(){
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
            },
            remove(e){
                let id =  e.target.closest('tr').dataset.id;
                this.$store.dispatch('removeRow', {
                    id : id
                });
            },
            filterChange(){
                this.filterState = !this.filterState;
            },
            renameColumnTitle(){
                this.renameColumn = !this.renameColumn;
            },
            saveFilter(event){
                var filterOn   = event.target.parentElement.querySelectorAll('input[type=checkbox]:checked'),
                    casheArray = [];

                filterOn.forEach( checkbox => {
                    casheArray.push( checkbox.closest('a').dataset.name );
                });

                this.$store.commit('setClosedColumns', casheArray);

                this.filterState = false;
            },
            /**
             * save new name columns
             */
            saveColumnAlias(){
                let cacheAlias = [];
                Array.prototype.slice.call(document.getElementsByClassName('inputColumnAlias')).forEach( value => {
                    cacheAlias.push(value.value);
                });
                this.$store.commit( 'setTitleColumnsAlias', cacheAlias );
                this.renameColumn = false;
            }
        },
        created(){
            this.$store.dispatch('AllData').then( () => {
                this.state = this.$store.getters.AllData;
                this.$store.commit( 'setNameTable', ls.get('NameTable') ||  this.$store.getters.NameTable);

                this.$store.commit( 'setClosedColumns',  ls.get('ClosedСolumn') !== null ? ls.get('ClosedСolumn')[ls.get('NameTable')] : []);
            });

        },
        components:{
            sidebar
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

    .filter-list{
        z-index: 1000;
        margin-left: 40%;
        width: 40%;
    }
    .filter-btn{
        z-index: 1000;
        margin-left: 40%;
        margin-top: 1%;
        position: relative;
    }
    .centering{
        margin: 0 auto;
        float: none;
    }
    .titleCoumnnAlias{
        margin-top: 50px;
    }
</style>