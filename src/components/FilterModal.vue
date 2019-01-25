<template>
    <div>
        <b-button v-bind:class="{ on:modalCheck }" @click="filterModal">필터</b-button>
        
        <div class="filter-select-modal" v-if="modalCheck">
            <div class="filter-box">
                <h3>필터</h3>
                <button class="close-btn" @click="closeModal">X</button>
                <label><input type="checkbox" id="1" value="1" v-model="checkedNums"> 카테고리1</label>
                <label><input type="checkbox" id="2" value="2" v-model="checkedNums"> 카테고리2</label>
                <label><input type="checkbox" id="3" value="3" v-model="checkedNums"> 카테고리3</label>
                <div>
                    <b-button @click="save" v-on:click="$EventBus.$emit('click-icon')">저장</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modalCheck: false,
            checkedNums: [],
        }
    },
    methods: {
        filterModal() {
            this.modalCheck = true
        },
        save() {
            this.modalCheck = false
            this.$emit('childs-event', this.checkedNums)
        },
        closeModal() {
            this.modalCheck = false
        }
    }
}
</script>

<style lang="less">
.filter-select-modal {
        display: block;
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        z-index: 0;
    .filter-box {
        background: white;
        width:400px;
        padding:1rem;
        position: absolute;
        top:40%;
        left:40%;
        z-index: 999;
    }
    .close-btn {
        position: absolute;
        right:1rem;
        top:1rem;
        background: none;
        border:none;
        cursor: pointer;
    }
}

</style>
