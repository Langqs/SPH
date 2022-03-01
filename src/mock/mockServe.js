//引入mockjs模块
import Mock from 'mockjs';
//把json数据格式引入进来
import banner from '@/mock/banner.json';
import floor from '@/mock/floor.json';

//mock数据
Mock.mock("/mock/banner",{code:200,data:banner})//模拟首页的轮播图
Mock.mock("/mock/floor",{code:200,data:floor})