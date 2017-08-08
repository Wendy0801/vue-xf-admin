<template>
    <div>
<!--
        <div v-if="routeData.length>0">

            <el-menu :default-active="$route.path" unique-opened router>
                <template v-for="(first,index) in $router.options.routes">
                    <el-submenu :index="`${index+0}`" v-if="first.children&&!first.hidden">
                        <template slot="title">{{first.name}}{{index+0}}</template>

                        <template v-for="(second,indexSecond) in first.children">
                            <el-submenu  :index="`${index+0}-${indexSecond+0}`" v-if="second.children">
                                <template slot="title">{{second.name}}{{`${index+0}-${indexSecond+0}`}}</template>

                                <el-menu-item v-for="(third,indexThird) in second.children" :index="third.path">{{third.name}}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="second.path">{{second.name}}</el-menu-item>
                        </template>


                    </el-submenu>
                    <el-menu-item v-if="!first.children&&!first.hidden" :index="first.path">{{first.name}}</el-menu-item>
                </template>

            </el-menu>

        </div>-->
    </div>
</template>
<script>
    import ApiService from 'SERVICES/api.service';
    export default {
        data() {
            return {


            }
        },
        mounted() {

            console.log(this.$router.options.routes);
            // this.routeData = this.$router.options.routes;
            // console.log(this.routeData[0])
        },
        methods: {

        }
    }

</script>
<style lang="scss" src="./welcome.scss" scoped></style>