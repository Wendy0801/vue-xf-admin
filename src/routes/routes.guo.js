const CoreLayout = resolve => require(['LAYOUTS/Core.layout'], resolve);
const IndexLayout = resolve => require(['LAYOUTS/Index.layout'], resolve);

// guo route
import NotFound from 'PAGES/not-found/not-found'
const Main = resolve => require(['PAGES/Main'], resolve);
const Form = resolve => require(['PAGES/nav1/Form'], resolve);
const user = resolve => require(['PAGES/nav1/user'], resolve);

const BannerList = resolve => require([`../pages.guo/banner/bannerList`], resolve)
const BannerEdit = resolve => require([`../pages.guo/banner/bannerEdit`], resolve)
const NewsHomepage = resolve => require([`../pages.guo/newsHomepage/newsHomepage`], resolve)
const UserHomepage = resolve => require([`../pages.guo/userHomepage/userHomepage`], resolve)
const VideoHomepage = resolve => require([`../pages.guo/videoHomepage/videoHomepage`], resolve)
const GeneralHomepage = resolve => require([`../pages.guo/generalHomepage/generalHomepage`], resolve)
const Advert = resolve => require([`../pages.guo/advert/advert`], resolve)
const AdvertEdit = resolve => require([`../pages.guo/advert/advertEdit`], resolve)
const SearchKeyword = resolve => require(['../pages.guo/searchKeyword/searchKeyword'], resolve)

const NewsList = resolve => require([`../pages.guo/newsList/newsList`], resolve)
const NewsAdd = resolve => require([`../pages.guo/newsList/newsAdd`], resolve)
const NewsEdit = resolve => require([`../pages.guo/newsList/newsEdit`], resolve)
const NewsCategory = resolve => require([`../pages.guo/newsCategory/newsCategory`], resolve)
const NewsLabel = resolve => require([`../pages.guo/newsLabel/newsLabel`], resolve)

const ActivityList = resolve => require([`../pages.guo/activityList/activityList`], resolve)
const ActivityEdit = resolve => require([`../pages.guo/activityList/activityEdit`], resolve)
const SignUpList = resolve => require([`../pages.guo/signUpList`], resolve)
const ShowVideoOrder = resolve => require([`../pages.guo/showVideoOrder`], resolve)
const ShowPlayerOrder = resolve => require([`../pages.guo/showplayerOrder`], resolve)
const FashionShowOrder = resolve => require([`../pages.guo/fashionShowOrder`], resolve)
const TalentVideoOrder = resolve => require([`../pages.guo/talentVideoOrder`], resolve)
// const ActivityRule = resolve => require([`../pages.guo/activityRule/activityRule`], resolve)
// const ActivityIntroduce = resolve => require([`../pages.guo/activityIntroduce/activityIntroduce`], resolve)
const WxLottery = resolve => require([`../pages.guo/wxLottery/wxLottery`], resolve)

const VideoContent = resolve => require([`../pages.guo/videoContent/videoContent`], resolve)
const Comment = resolve => require([`../pages.guo/comment/comment`], resolve)
const Picture = resolve => require([`../pages.guo/picture/picture`], resolve)

const UserList = resolve => require(['PAGES/user-list/user-list'], resolve);
const Feedback = resolve => require(['PAGES/feedback/feedback'], resolve);
const UserNotice = resolve => require(['PAGES/user-notice/user-notice'], resolve);
const AddNotice = resolve => require(['PAGES/add-notice/add-notice'], resolve);
const AuthorList = resolve => require(['PAGES/author-list/author-list'], resolve);
const AuthorEdit = resolve => require(['PAGES/author-edit/author-edit'], resolve);
const SensitiveWords = resolve => require(['../pages.guo/sensitiveWords/sensitiveWords'], resolve);
const PushList = resolve => require(['../pages.guo/pushList/pushList'], resolve);

const Administration = resolve => require(['../pages.guo/administration/administration'], resolve);
const Role = resolve => require(['../pages.guo/role/role'], resolve);
const ChangePassword = resolve => require(['PAGES/change-password/change-password'], resolve);
const AuthorizationList = resolve => require(['PAGES/authorization-list/authorization-list'], resolve);

const OperateRule = resolve => require(['../pages.guo/operateRule/operateRule'], resolve);
const FictitiousUsers = resolve => require(['../pages.guo/fictitiousUsers/fictitiousUsers'], resolve);
const FictitiousEdit = resolve => require(['../pages.guo/fictitiousUsers/fictitiousEdit'], resolve)
const CommentLibrary = resolve => require(['../pages.guo/commentLibrary/commentLibrary'], resolve);

let guoRoutes = [
    {
        path: '/',
        component: CoreLayout,
        name: '主页管理',
        iconCls: 'iconfont icon-icon_home', //图标样式class,
        isAuth: false,
        children: [
            { path: '/bannerList', component: BannerList, isAuth: false, name: '轮播管理' },
            { path: '/bannerEdit', component: BannerEdit, hidden: true, name: '新增轮播图' },
            { path: '/bannerEdit/:bannerId', component: BannerEdit, hidden: true, name: '编辑轮播图' },
            {
                path: '/newsHomepage', component: IndexLayout, name: '内容区管理', isAuth: false, children: [
                    { path: '/newsHomepage', component: NewsHomepage, isAuth: false, name: '主页内容区资讯设置', },
                    { path: '/userHomepage', component: UserHomepage, isAuth: false, name: '主页内容区选手设置', },
                    { path: '/videoHomepage', component: VideoHomepage, isAuth: false, name: '主页内容区视频设置', },
                    { path: '/generalHomepage', component: GeneralHomepage, isAuth: false, name: '已设置主页内容综合管理' },
                ]
            },
            { path: '/advert', component: Advert, isAuth: false, name: '广告位banner' },
            { path: '/advertEdit', component: AdvertEdit, isAuth: false, name: '广告位banner新增' },
            { path: '/advertEdit/:advertId', component: AdvertEdit, isAuth: false, name: '广告位banner编辑' },
            { path: '/searchKeyword', component: SearchKeyword, isAuth: false, name: '搜索词管理' },

        ]
    },
    {
        path: '/',
        component: CoreLayout,
        name: '资讯管理',
        iconCls: 'iconfont icon-icon_information',
        isAuth: false,
        children: [
            { path: '/newsList', component: NewsList, isAuth: false, name: '资讯管理列表' },
            { path: '/newsAdd', component: NewsAdd, hidden: true, isAuth: false, name: '新增资讯' },
            { path: '/newsEdit/:newsId', component: NewsEdit, hidden: true, isAuth: false, name: '编辑资讯' },
            { path: '/newsCategory', component: NewsCategory, isAuth: false, name: '资讯分类管理列表' },
            { path: '/newsLabel', component: NewsLabel, isAuth: false, name: '资讯标签管理列表' },
        ]
    },
    {
        path: '/',
        component: CoreLayout,
        name: '活动管理',
        iconCls: 'iconfont icon-icon_activity',
        isAuth: false,
        children: [
            { path: '/activityList', component: ActivityList, isAuth: false, name: '活动列表页管理' },
            { path: '/activityEdit', component: ActivityEdit, hidden: true, name: '新增活动' },
            { path: '/activityEdit/:activityId', component: ActivityEdit, hidden: true, name: '编辑活动' },
            { path: '/signUpList', component: SignUpList, isAuth: false, hidden: true, name: '综合报名用户' },
            { path: '/signUpList/:actiId', component: SignUpList, isAuth: false, hidden: true, name: '报名用户' },
            { path: '/showVideoOrder', component: ShowVideoOrder, isAuth: false, hidden: true, name: '综合参赛视频排序管理' },
            { path: '/showVideoOrder/:actiId', component: ShowVideoOrder, isAuth: false, hidden: true, name: '参赛视频排序管理' },
            { path: '/showplayerOrder', component: ShowPlayerOrder, isAuth: false, hidden: true, name: '综合参赛达人排序管理' },
            { path: '/showplayerOrder/:actiId', component: ShowPlayerOrder, isAuth: false, hidden: true, name: '参赛达人排序管理' },
            { path: '/wxLottery', component: WxLottery, isAuth: false, name: '微信自动回复抽奖' },
            // {
            //     path: '/',
            //     component: IndexLayout,
            //     name: '第二季选秀管理',
            //     iconCls: 'fa fa-bar-chart',
            //     isAuth: false,
            //     children: [
            //         { path: '/signUpList', component: SignUpList, isAuth: false, name: '报名用户' },
            //         { path: '/signUpList/:actiId', component: SignUpList, isAuth: false, name: '报名用户' },
            //         { path: '/showVideoOrder', component: ShowVideoOrder, isAuth: false, name: '参赛视频排序管理' },
            //         { path: '/showVideoOrder/:actiId', component: ShowVideoOrder, isAuth: false, name: '参赛视频排序管理' },
            //         { path: '/showplayerOrder', component: ShowPlayerOrder, isAuth: false, name: '参赛达人排序管理' },
            //         { path: '/showplayerOrder/:actiId', component: ShowPlayerOrder, isAuth: false, name: '参赛达人排序管理' },
            //         // { path: '/activityRule', component: ActivityRule, isAuth:false,name: '赛事规则' },
            //         // { path: '/activityIntroduce', component: ActivityIntroduce,isAuth:false, name: '赛事介绍描述' },
            //     ]
            // },
            // {
            //     path: '/',
            //     component: IndexLayout,
            //     name: '发现模块',
            //     iconCls: 'fa fa-bar-chart',
            //     isAuth:false,
            //     children: [
            //         { path: '/fashionShowOrder', component: FashionShowOrder,isAuth:false, name: '红人秀顺序管理' },
            //         { path: '/talentVideoOrder', component: TalentVideoOrder, isAuth:false,name: '才艺视频顺序管理' },
            //     ]
            // }
        ]
    },

    {
        path: '/',
        component: CoreLayout,
        name: '用户生产内容管理',
        isAuth: false,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/videoContent', component: VideoContent, isAuth: false, name: '视频内容管理' },
            { path: '/comment', component: Comment, isAuth: false, name: '评论内容管理' },
            { path: '/picture', component: Picture, isAuth: false, name: '图片内容管理' },
        ]
    },
    {
        path: '/',
        component: CoreLayout,
        name: '运营机器人',
        isAuth: false,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/operateRule', component: OperateRule, isAuth: false, name: '运营规则' },
            { path: '/fictitiousUsers', component: FictitiousUsers, isAuth: false, name: '虚拟用户' },
            { path: '/fictitiousEdit', component: FictitiousEdit, isAuth: false, name: '新增虚拟用户', hidden: true },
            { path: '/fictitiousEdit/:custId', component: FictitiousEdit, isAuth: false, name: '编辑虚拟用户', hidden: true },
            { path: '/commentLibrary', component: CommentLibrary, isAuth: false, name: '评论库' }
        ]
    },
    {
        path: '/',
        isAuth: false,
        component: CoreLayout,
        name: '系统后台',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/user-list', component: UserList, isAuth: false, name: '用户账号管理' },
            {
                path: '/user-notice', component: IndexLayout, isAuth: false, name: '用户通知', children: [
                    { path: '/user-notice', component: UserNotice, isAuth: false, name: '用户通知列表' },
                    { path: '/add-notice', component: AddNotice, isAuth: false, name: '添加用户通知' },
                    { path: '/add-notice/:noticeId', component: AddNotice, isAuth: false, name: '编辑用户通知', hidden: true },
                    { path: '/author-list', component: AuthorList, isAuth: false, name: '发布者编辑列表' },
                    { path: '/author-edit', component: AuthorEdit, isAuth: false, name: '添加发布者' },
                    { path: '/author-edit/:authorId', component: AuthorEdit, isAuth: false, name: '编辑添加发布者', hidden: true },
                ]
            },
            { path: '/pushList', component: PushList, isAuth: false, name: '消息推送列表' },
            { path: '/sensitiveWords', component: SensitiveWords, isAuth: false, name: '敏感词' },
            { path: '/feedback', component: Feedback, isAuth: false, name: '意见反馈' },
        ]
    },
    {
        path: '/',
        isAuth: false,
        component: CoreLayout,
        name: '后台权限管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/administration', component: Administration, isAuth: false, name: '管理员及权限' },
            { path: '/role', component: Role, isAuth: false, name: '角色类型管理' },
            { path: '/change-password', component: ChangePassword, isAuth: false, name: '修改密码' },
            { path: '/authorization-list', component: AuthorizationList, isAuth: false, name: '权限列表' },
        ]
    },
    {
        path: '*',
        component: NotFound,
        name: '',
        hidden: true
    }
]
export default guoRoutes;