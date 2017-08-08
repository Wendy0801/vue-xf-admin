<template>
	<el-row class="panel">
		<el-col :span="24" class="panel-top">
			<el-col :span="20" style="font-size:26px;padding-left: 20px;">
				<!--<img src="/static/images/logo.png" class="logo"> -->
				<span>联合通讯APP项目后台管理系统</span>
			</el-col>
			<el-col :span="4" class="rightbar">
				<span @click="logout" style="cursor: default;">退出登录</span>
				<!--<el-dropdown trigger="click">-->
				<!--<span class="el-dropdown-link" style="color:#c0ccda;cursor: pointer;"><img :src="this.sysUserAvatar" class="head"> {{sysUserName}}-->
				<!--</span>-->
				<!--<el-dropdown-menu slot="dropdown">-->
				<!--<el-dropdown-item>我的消息</el-dropdown-item>-->
				<!--<el-dropdown-item>设置</el-dropdown-item>-->
				<!--<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>-->
				<!--</el-dropdown-menu>-->
				<!--</el-dropdown>-->
			</el-col>
		</el-col>
		<el-col :span="24" class="panel-center">
			<!--<el-col :span="4">-->
			<aside style="width:230px;">
				<div v-if="allRoutes.length>0">
					<el-menu :default-active="$route.path" theme="dark" unique-opened router >
						<template v-for="(first,index) in allRoutes">
							<el-submenu :index="`${index+0}`" v-if="first.children&&!first.hidden&&first.isAuth">
								<template slot="title"><i :class="first.iconCls"></i>{{first.name}}</template>
								<template v-for="(second,indexSecond) in first.children">
									<el-submenu :index="`${index+0}-${indexSecond+0}`" v-if="second.children&&second.isAuth">
										<template slot="title" v-if="second.isAuth">{{second.name}}</template>
										<el-menu-item v-for="(third,indexThird) in second.children" :index="third.path" v-if="!third.hidden&&third.isAuth">{{third.name}}</el-menu-item>
									</el-submenu>
									<el-menu-item v-if="!second.children&&!second.hidden&&second.isAuth" :index="second.path">{{second.name}}</el-menu-item>
								</template>
							</el-submenu>
							<el-menu-item v-if="!first.children&&!first.hidden&&first.isAuth" :index="first.path">{{first.name}}</el-menu-item>
						</template>
					</el-menu>
				</div>
			</aside>
			<!--</el-col>-->
			<!--<el-col :span="20" class="panel-c-c">-->
			<section class="panel-c-c">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" style="margin-bottom:15px;">
						<strong style="width:200px;float:left;color: #475669;">{{$route.name}}</strong>
						<el-breadcrumb separator="/" style="float:right;">
							<el-breadcrumb-item v-for="item in $route.matched">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" style="background-color:#fff;box-sizing: border-box;">
						<!--<transition name="fade">-->
						<router-view></router-view>
						<!--</transition>-->
					</el-col>
				</div>
			</section>
			<!--</el-col>-->
		</el-col>
	</el-row>
</template>

<script>
	import ApiService from 'SERVICES/api.service';
	export default {
		data() {
			return {
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
				},
				allRoutes:[]
				
			}
		},
		mounted() {
			this.allRoutes = this.$router.options.routes.slice() ;
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
			this.setAuthRoutes();
		},
		methods: {
			setAuthRoutes(){
				var authStr = ApiService.getCookie('authList');
				var authList = authStr.split(',');
				// var authList = ['/bannerList','/userHomepage','/change-password','/activityIntroduce','/generalHomepage']
				for (var i = 0, len = this.allRoutes.length; i < len; i++) {
					var first = this.allRoutes[i];
					if(!first.children){
						continue ;
					}
					for (var j = 0, jLen = first.children.length; j < jLen; j++) {
						var secode = first.children[j];
						if (secode.children) { // 还有下层,再遍历
							var third = secode.children;
							for (var k = 0, kLen = third.length; k < kLen; k++) {
								// 第三层的path做判断
								if (setAuth(third[k])) {
									// 自己加 isAuth , second加isAuth ,first加isAuth
									// console.log('三级验证通过')
									third[k].isAuth = true;
									secode.isAuth = true;
									first.isAuth = true;
								}
							}
						} else { // 没有下层,验证己身
							if (setAuth(secode)) {
								secode.isAuth = true;
								first.isAuth = true;
								// console.log('二级验证通过')
							}
						}
					}
				}
				function setAuth(route) {
					var _isInAuthList = authList.filter(item => route.path === item);
					return _isInAuthList.length > 0;
				}
			},
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('ssId');
					_this.$router.push('/login');
				}).catch(() => {

				});


			}
		},
	}

</script>

<style lang="scss" scoped>
	@import '../themes/_variable.scss';
	.logo {
		height: 40px;
		width: auto;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
	
	.panel {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}
	
	.panel-top {
		height: 60px;
		line-height: 60px;
		background: $mtc;
		color: #fff;
	}
	
	.panel-top .rightbar {
		text-align: right;
		padding-right: 35px;
	}
	
	.panel-top .rightbar .head {
		width: 40px;
		height: 40px;
		border-radius: 20px;
		margin: 10px 0px 10px 10px;
		float: right;
	}
	
	.panel-center {
		background: $cbc;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
	}
	
	.panel-c-c {
		background: #f1f2f7;
		position: absolute;
		right: 0px;
		top: 0px;
		bottom: 0px;
		left: 230px;
		overflow-y: scroll;
		padding: 20px;
	}
	
	.logout {
		background: url(../assets/logout_36.png);
		background-size: contain;
		width: 20px;
		height: 20px;
		float: left;
	}
	
	.logo {
		width: 40px;
		float: left;
		margin: 10px 10px 10px 18px;
	}
	
	.tip-logout {
		float: right;
		margin-right: 20px;
		padding-top: 5px;
	}
	
	.tip-logout i {
		cursor: pointer;
	}
	
	.admin {
		color: #c0ccda;
		text-align: center;
	}
	
	.el-dropdown {
		color: #fff;
	}
	
	.el-dropdown-link {
		color: #fff;
	}
	.iconfont{
		margin-right: 10px;
	}
</style>