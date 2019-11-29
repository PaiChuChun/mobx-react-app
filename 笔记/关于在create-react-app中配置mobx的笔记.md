# 关于在create-react-app中配置mobx的笔记



说明： mobx 需要使用decorator 修饰器语法 但项目默认是不支持的  此时我们需要配置以下

### 一 create-react-app创建项目后，要先使用 npm run eject 弹出webpack配置 否则我们的packge.json 没有我们需要的配置项

> ![](C:\Users\Administrator\Desktop\react 手记\image-mobx\1575013854(1).jpg)
>
>  此时我们的package.json 的最后就会有我们需要的babel配置,项目包中会多出 config，scripts两个文件夹。

### 二. 安装支持装饰器所需依赖:

> ```node.js
> cnpm i --save-dev @babel/plugin-proposal-decorators
> ```
>
> ![](C:\Users\Administrator\Desktop\react 手记\image-mobx\1575016969(1).jpg)

### 三. 安装 @babel/plugin-proposal-decorators

> ```node
> cnpm i --save-dev @babel/plugin-proposal-class-properties
> ```
>
> ![](C:\Users\Administrator\Desktop\react 手记\image-mobx\1575017206(1).jpg)
>
>  现在修饰器语法应该没问题了 开始装mobx 

### 四.安装Mobx 和 mobx-react

> ```node
> cnpm install mobx mobx-react --save 
> ```
>
> mobx mobx-react 让mobx 和react简历链接

### 五 .配置 package.json

> ```json
> "babel": {
>     "presets": [
>       "react-app"
>     ]
> ```

修改为：

> ```json
> "babel": {
>         "plugins": [
>             [
>                 "@babel/plugin-proposal-decorators",
>                 {
>                     "legacy": true
>                 }
>             ],
>             [
>                 "@babel/plugin-proposal-class-properties",
>                 {
>                     "loose": true
>                 }
>             ]
>         ],
>         "presets": [
>             "react-app"
>         ]
>     },
> ```
>
>  现在运行项目  就不会报错了 。
>
> 接下来配置eslint（create-react-app搭建的项目默认开启了eslint，会对es6的新语法进行实时编译的检查，这里需要处理一下）
>
> ```json
> "eslintConfig": {
>         "extends": "react-app"
>     },
> ```
>
> 修改为：
>
> ```json
> "eslintConfig": {
>         "parserOptions": {
>             "ecmaFeatures": {
>                 "legacyDecorators": true
>             }
>         },
>         "extends": "react-app"
>     },
> ```
>
> 配置完成

### 六 .开始操作啦

推荐时间处理插件 moment  处理时间方便

```none
cnpm i -S moment
```

src文件下创建store文件夹  创建index.js用于存放mobx管理的变量

```js
import {
    observable, 
    action,
    computed
} from "mobx"


// moment 时间处理插件使用方便
import moment from "moment"

// 定义一个类 储存状态变量
class AppStore {
    // observable 引入变量
    @observable time = ""
    @observable todos = []

    // 计算 当变量发生变化的时候 自动进行计算
    @computed get desc(){
        return `${this.time} 还有 ${this.todos.length}条任务待完成`
    }

    // 所有操作store中数据的方法， 建议使用定义action 的方式这样显得规范
    @action addTodo(todo){
        this.todos.push(todo)
    }
    @action deleteTodo(){
        this.todos.pop()
    }
    @action resetTodo(){
        this.todos = []
    }
    @action getNow(){
        this.time = moment().format("YYYY-MM-DD HH:mm:ss")
    }
}


setInterval(() => {
    store.getNow()
},1000)


// 实例化
const store = new AppStore()

export default store
```

修改app.js

```jsx

import React from 'react';

import { Provider } from "mobx-react"
import store from "./store"

import Home from "./pages/home"

import './App.css';


// Provider 提供一个上下文 在Provider中的变量都受到mobx 管理

function App() {
  return (
    <div className="App">
      <Provider store={store}>
            {/* 其中的变量都收到store管理*/}
            <Home />
      </Provider>
    </div>
  );
}

export default App;
```

创建pages文件夹 在pages中创建home组件 创建index.jsx

```jsx
import React, { Component } from 'react';

import { inject, observer } from "mobx-react"

import "./index.css"
// @inject ("store")注入store   @observer 观察  如果store中的变量发生变化  这里做出改变
@inject("store") @observer

class Home extends Component {

    handleTodos = (type) => {
        let { store } = this.props
        switch (type) {
            case "add":
                store.addTodo("共享单车")
                break;
            case "delete":
                store.deleteTodo()
                break;
            case "reset":
                store.resetTodo()
                break;

            default:
                break;
        }
    }

    render() {
        // 使用
        let { store } = this.props
        return (
            <div className="home">
                <h2>关于在react使用mobx的练习</h2>
                <div>{store.desc}</div>
                <button onClick={() => {this.handleTodos("add")}}>添加一条任务</button>
                <button onClick={() => {this.handleTodos("delete")}}>删除一条任务</button>
                <button onClick={() => {this.handleTodos("reset")}}>任务重置</button>
                {
                    store.todos.map((item,index) => {
                        return (
                            <div key={index}>{item}</div>
                        )
                    })
                }

            </div>
        );
    }
}

export default Home;
```

实现效果如下：

![](C:\Users\Administrator\Desktop\react 手记\image-mobx\1575020723(1).jpg)

