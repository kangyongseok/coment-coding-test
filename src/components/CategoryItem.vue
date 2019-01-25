<template>
    <div  class="category-item">
        <div class="item-header">
            <div class="category-name">{{this.cname}}</div>
            <div class="category-num">{{this.boardNum}}</div>
        </div>
        <div>{{this.email}} | {{this.date}}</div>
        <div>
            <h4><router-link to="/detail">{{this.title}}</router-link></h4>
            <p><router-link to="/detail">{{this.content}}</router-link></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cname: '',
            cnum:''
        }
    },
    created() {
        this.compare()
        this.$EventBus.$on('click-icon', () => { 
            this.compare()
        });
    },
    methods: {
        compare() {
            this.categoryName.map(nameList => {
                if(nameList.no === this.categoryNum) {
                    this.cname = nameList.name
                }
            })
        },

    },
    props: [
        'title',
        'content',
        'email',
        'date',
        'boardNum',
        'categoryNum',
        'categoryName'
    ]
}
</script>

<style lang="less">
.category-item {
    background: white;
    margin:1rem 0;
    padding:1rem;
    .item-header {
        border-bottom:1px solid #cccccc;
        overflow: auto;
        margin-bottom:1rem;
        padding-bottom:1rem;
    }
    .category-name {
        float:left
    }
    .category-num {
        float:right;
    }
    h4 {
        margin:1rem 0;
    }
    p {
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis
    }
}
</style>
