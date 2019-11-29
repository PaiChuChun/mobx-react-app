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