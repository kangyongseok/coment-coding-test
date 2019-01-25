<template>
    <div class="view-list-contents">
        <div class="view-top">
            <FilterModal class="filter-btn"  @childs-event="checkNum" />
            <div class="align-btn">
                <b-button v-bind:class="asc" name="asc" @click="align">오름차순</b-button>
                <b-button v-bind:class="desc" name="desc" @click="align">내림차순</b-button>
            </div>
        </div>
        <div v-cloak  v-for="(cateData, index) in categoryData">
            <CategoryItem 
                :title="cateData.title"
                :content="cateData.contents"
                :email="cateData.email"
                :date="cateData.date"
                :boardNum="cateData.boardNum"
                :categoryNum="cateData.categoryNum"
                :categoryName="categoryName"
            />
            <SponItem v-if="(index + 1) % 4 === 0"/>
        </div>
        <div v-if="loding" class="loading">Loading....</div>
    </div>
</template>

<script>
import FilterModal from './FilterModal.vue'
import CategoryItem from './CategoryItem.vue'
import SponItem from './SponItem.vue'

const baseURL = "http://comento.cafe24.com/"

export default {
    components: { FilterModal, CategoryItem, SponItem },

    data() {
        return {
            alignName: "asc",
            asc: {active: true},
            desc: {active: false},
            sponData: [1, 2, 3, 4, 5],
            count:1,
            categoryUrlNum: '1',
            categoryData: [],
            categoryDataSub:[],
            categoryName: [],
            loding: true,
            
        }
    },
    methods: {

        checkNum: function(num) {
            this.categoryUrlNum = num
            this.getAPIReplace(this.alignName)
        },
        align(e) {
            if(e.target.name === "asc") {
                this.asc.active = true
                this.desc.active = false
                this.alignName = "asc"
            } else {
                this.asc.active = false
                this.desc.active = true
                this.alignName = "desc"
            }
            this.getAPIReplace(e.target.name)
        },
        infinit() {
            let that = this
            window.onscroll = function(ev) {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    that.count++
                    setTimeout(() => {
                        that.getAPI(that.alignName)
                        that.loading = false
                    },2000)
                }
            }
        },
        
        getCategoryName() {
            this.$http.get(`${baseURL}category.php`)
            .then(response => {
                response.data.list.map(nameList => {
                    let nameInfo = {
                        no: nameList.no,
                        name: nameList.name
                    }
                    this.categoryName.push(nameInfo)
                })
            })
        },
        getAPI(a) {
            let requestURL = `request.php?page=${this.count}&ord=${a}&category=${this.categoryUrlNum[0]}`
            this.$http.get(`${baseURL}${requestURL}`)
            .then(response => {
                response.data.list.map(info => {
                    let apiInfo = {
                        title: info.title,
                        email:info.email,
                        contents: info.contents,
                        date: info.updated_at,
                        boardNum: info.no,
                        categoryNum: info.category_no
                    }
                    this.categoryData.push(apiInfo)
                })
            })
        },
        getAPIReplace(a) {
            let requestURL = `request.php?page=${this.count}&ord=${a}&category=${this.categoryUrlNum[0]}`
            this.$http.get(`${baseURL}${requestURL}`)
            .then(response => {
                response.data.list.map(info => {
                    let apiInfo = {
                        title: info.title,
                        email:info.email,
                        contents: info.contents,
                        date: info.updated_at,
                        boardNum: info.no,
                        categoryNum: info.category_no
                    }
                    this.categoryDataSub.push(apiInfo)
                    this.categoryData = this.categoryDataSub
                })
            })
            this.reset()
        },
        reset() {
            this.categoryDataSub = []
        },


    },
    created() {
        this.getAPI(this.alignName)
        this.infinit()
        this.getCategoryName()
        this.getDetail()
    }
}
</script>

<style lang="less" scoped>
.btn-secondary:not(:disabled):not(.disabled).active, .btn-secondary:not(:disabled):not(.disabled):active, .show>.btn-secondary.dropdown-toggle .active {
    background: black
}

.loading {
    font-size:2rem;
    font-weight:600;
}

[v-cloak] {
    display: none;
}

.view-list-contents {
    width:60%;
    min-width: 480px;
    margin:1rem auto;
    .view-top {
        overflow: auto;
    }
    .filter-btn {
        float: left;
    }
    .align-btn {
        float:right;
    }
}
</style>
