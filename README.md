# WeStudy

![westudy workflow](https://github.com/SJTU-IS-SE-01/westudy/actions/workflows/node.js.yml/badge.svg)

## 一、项目介绍 

### 软件用户类别

该软件定位于需要自主学习的但在学习中遇到问题又难以及时找到同伴交流的大学生群体。

### 开发目的

当下大学生在学习方面普遍感到孤单，缺少同学共同交流。部分乐于助人的同学也缺少提供帮助或者分享笔记的机会。该软件提供交流以及答疑的渠道，而不至于因为打开其他社交软件而浪费时间。

同时，图书馆自习室座位常需要同学自己寻找，并花费大量时间寻找座位。即使如此，他们也很难找到满意的位置。通过该软件，可以将图书馆自习室划分为不同模块，使得学习内容相近或者自习需求相似的同学坐在一起，初步计划按照学科分区或按照专业分区。

### 功能

1、图书馆自习室空闲座位实时显示与预约：座位分为预约中、使用中、空闲三种情况，每天0：00开放当天预约通道，预约时间段分为上午中午晚上，预约后需要在指定时间段到预约座位扫码打卡，若超出预约时间仍未打卡，则座位自动恢复空闲状态，供其他同学预约学习。同学使用完座位之后，在软件上面选择离开，座位恢复空闲状态。

2、信用分管理机制，对预约而不到的以及走后不手动解除占用的人进行扣分，连续暗示学习和签退的进行加分，分数过低的人，其预约操作将延迟生效

3、学习资料的分享与下载：以学科为单位，大家可以共享自己所拥有的学科学习资料。

4、匿名提问与解答：当遇到难以解决的问题时，可以在讨论区发布问题，其他同学可以进行回复讨论。初步考虑，是否在自习分区中设置有声区域，可以供同学们当面讨论探讨问题，提高交流效率，但考虑到图书馆自习的特殊性，此功能有待后续进一步讨论。

5、每个分区开放一个线上聊天室，供大家交流学习或是在学习一段时间后约跑/约饭……

6、学习圈打卡功能：实行每日打卡功能，鼓励同学坚持学习。

## 二、项目构建方法

### 构建

```shell
git clone https://github.com/SJTU-IS-SE-01/westudy.git
cd westudy
npm install
npm start
```

### 测试
```shell
npm test
```
- 语法、代码风格检查
```shell
npm run test-syntax
```
- 后端API测试
```shell
npm run test-backend
```


## 三、项目开发流程

请发起`pull requsets`。


## 四、API文档

### 查询某时间段座位是否被占用

url: /api/seatcheck/:id/:Btime/:Etime

method: http get

| 参数名 | 类型     | 必填 | 说明                 |
| ------ | -------- | ---- | -------------------- |
| id     | char     | 是   | 座位号               |
| Btime  | DATETIME | 是   | 查询时间段的开始时间 |
| Etime  | DATETIME | 是   | 查询时间段的结束时间 |

返回正确JSON示例

```json
{
  "status": 0,
  "msg": "0",
  "results": 1,
}
```

返回错误JSON示例

```json
{
  "status": 1,
  "msg": "0",
  "results": 1,
}
```

```josn
{
  "status": 1,
  "msg": "Btime>Etime",
  "results": {},
}
```

### 查询学生信息

url: /api/students/query

method: http get

| 参数名 | 类型    | 必填 | 说明   |
| ------ | ------- | ---- | ------ |
| Id     | varchar | 是   | 学号   |
| Name   | varchar | 是   | 姓名   |
| Major  | varchar | 是   | 专业   |
| Credit | int     | 是   | 信誉分 |
| email  | varchar | 是   | 邮箱   |

返回正确JSON示例

```json
{ 
  "status": 0,
  "msg": "ok",
  "results": {},
}
```

返回错误JSON示例

```json
{
  "status": 1,
  "msg": "error",
  "results": {},
 }
```

### 修改信誉分

url: /api/students/quary

method: http post

| 参数名 | 类型    | 必填 | 说明   |
| ------ | ------- | ---- | ------ |
| Id     | varchar | 是   | 学号   |
| Credit | int     | 是   | 信誉分 |

返回正确JSON示例

```json
{ 
  "status": 0,
  "msg": "ok",
  "results": {},
}
```

返回错误JSON示例

```json
{
  "status": 1,
  "msg": "error",
  "results": {},
}
```

### 增加座位预约

url: /api/students/addappointment

method: http post

| 参数名 | 类型     | 必填 | 说明     |
| ------ | -------- | ---- | -------- |
| Btime  | DATETIME | 是   | 开始时间 |
| Etime  | DATETIME | 是   | 结束时间 |
| Snum   | char     | 是   | 座位号   |

返回正确JSON示例

```json
{ 

  "status": 0,
  "msg": "ok",
  "results": {},
}
```

返回错误JSON示例

```json
{
  "status": 1,
  "msg": "error",
  "results": {},
}
```

### 查询座位预约信息

url: /api/students/seatsapt

method: http get

| 参数  | 类型     | 必填 | 说明     |
| ----- | -------- | ---- | -------- |
| Btime | DATETIME | 是   | 开始时间 |
| Etime | DATETIME | 是   | 结束时间 |
| Snum  | char     | 是   | 座位号   |
| ID    | varchar  | 是   | 学号     |

返回正确JSON示例

```json
{  
  "status": 0,    
  "msg": "ok",
  "results": {},
}
```

返回错误JSON示例

```json
{   
  "status": 1,
  "msg": "error", 
  "results": {},
}
```
##### 查询某个楼层区域的座位信息

url:api/seats/query

method:http get

| 参数    | 类型    | 必填 | 说明 |
| ------- | ------- | ---- | ---- |
| Subject | varchar | 是   | 学科 |
| Snum    | char    | 是   | 编号 |
| Area    | char    | 是   | 区域 |
| Floor   | char    | 是   | 楼层 |

返回正确JSON示例

```javascript
{ 

   status: 0,
    msg: 'ok',
    results: {},


}
```

返回错误JSON示例

```javascript
{

   status: 1,
    msg: 'error',
    results: {},

}


```



### 登陆（获取验证码）

url: /api/login/code

method: http post

| 参数  | 类型     | 必填 | 说明     |
| ----- | -------- | ---- | -------- |
| email | varchar | 是   | 邮箱 |

返回正确JSON示例

```json
{  
  "status": 0,    
  "msg": "ok",
  "results": {},
}
```

返回错误JSON示例

```json
{   
  "status": 1,
  "msg": "error", 
  "results": {},
}
```

### 登陆

url: /api/login

method: http post

| 参数  | 类型     | 必填 | 说明     |
| ----- | -------- | ---- | -------- |
| email | varchar | 是   | 邮箱 |
| code | varchar | 是   | 验证码 |

返回正确JSON示例

```json
{  
  "status": 0,    
  "msg": "ok",
  "results": {},
}
```

返回错误JSON示例

```json
{   
  "status": 1,
  "msg": "err", 
  "results": "code is not correct.",
}
```
