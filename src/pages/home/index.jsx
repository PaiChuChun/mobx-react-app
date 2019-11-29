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