<template>

<div class="detail-area" >
    <div class="login-pop" v-if="loginPop">
        <h3>회원가입</h3>
        <div class="txt-box">
            지금 가입하면 꿈꾸던 기업에 재직중인 현직자와<br/><span class="red">익명</span>으로 대화할 수 있습니다.
        </div>
        <div class="sns-login-btn">
            <button type="button" class="facebook">페이스북 계정으로 회원가입</button>
            <button type="button" class="google">구글 계정으로 회원가입</button>
            <button type="button" class="naver">네이버 계정으로 회원가입</button>
        </div>
        <div class="close" @click="close">나중에하기</div>
    </div>
    <div v-else class="detail-page">
        <div class="detail-content">
            <h3>{{categoryDetail.title}}</h3>
            <div class="content-info">{{categoryDetail.email}} | {{categoryDetail.date}}</div>
            <p>
                {{categoryDetail.contents}}
            </p>
            <div class="reple-area">

                <div class="reple" v-for="list in categoryReple">
                    <div class="reple-info">
                        {{list.date}}<br/>
                        {{list.email}}
                    </div>
                    <div class="reple-txt">
                        {{list.contents}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


</template>

<script>
export default {
    data() {
        return {
            loginPop:true,
            categoryDetail: '',
            categoryReple: []
        }
    },
    methods: {
        close() {
            this.loginPop = false
        },
        getDetail() {
            let detailURL = "detail.php?req_no=3"
            this.$http.get(`http://comento.cafe24.com/${detailURL}`)
            .then(response => {
                console.log(response.data.detail)
                let dInfo = {
                    title : response.data.detail.article.title,
                    contents: response.data.detail.article.contents,
                    email: response.data.detail.article.email,
                    date : response.data.detail.article.updated_at
                }
                response.data.detail.replies.map(reple => {
                    let repleInfo = {
                        email: reple.email,
                        contents: reple.contents,
                        date: reple.updated_at
                    }
                    this.categoryReple.push(repleInfo)
                })
                this.categoryDetail = dInfo
            })
        },
    },
    created() {
        this.getDetail()
    }


}
</script>

<style lang="less">
.common-page {
    width:50%;
    min-width: 480px;
    margin:1rem auto;
    height:auto;
    @media (max-width:480px) {
        width:100%;
        min-width: 0;
        margin:0;
        padding:1rem;
        text-align: justify;
        word-break: break-all;
    }
}

.detail-area {
    .common-page;
    .red {
        color:red;
    }
    .login-pop {
        background: white;
        width:30%;
        min-width:480px;
        height:auto;
        padding:1rem;
        position: absolute;
        top:20%;
        left:30%;
        text-align: center;
        &:before{
            content:'';
            display: block;
            background: rgba(0, 0, 0, 0.7);
            position: fixed;
            width:100%;
            height:100%;
            top:0;
            left:0;
            z-index: -1;
        }
        .txt-box {
            border:1px solid #cccccc;
            padding:1rem;
            margin:2rem 0;
        }
        .sns-login-btn {
            button {
                color:white;
                padding:1rem;
                width:100%;
                text-align: center;
                display: block;
                margin-bottom:1rem;
                background: none;
                border:none;
                cursor:pointer;
            }
            .facebook {
                background: #3b5998;
            }
            .google {
                background: #ea4335;
            }
            .naver {
                background: #00bd39;
            }
            
        }
        @media (max-width:480px) {
            position: initial;
            min-width:0;
            width:100%;
            margin:0 auto;
            height: auto;
        }
    }
    .detail-content {
        .content-info {
            margin:1rem 0;
        }
        .reple-area {
            border-top:1px solid #cccccc;
            padding-top:1rem;
            .reple {
                margin-bottom:1rem;
                overflow: auto;
            }
            .reple-info {
                float: left;
                width:30%
            }
            .reple-txt {
                float: left;
                width:70%;
            }
        }
    }
}
</style>
