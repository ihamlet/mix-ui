import Mock from "mockjs"
export default [{
    url: '/api/user/list',
    type: 'post',
    response: ({ body }: any) => {
        // 获取请求中的分页参数
        const page = body.page || 1
        const pageSize = body.pageSize || 10
        
        // 模拟数据列表
        let list = []
        for (let i = 0; i < pageSize; i++) {
            list.push(Mock.mock({
                id: '@increment(1)', // 自增ID
                name: '@cname', // 中文名字
                email: '@email', // 邮箱
                // 其他字段...
            }))
        }
        
        // 计算总数
        const total = 1000
        
        // 返回分页数据
        return {
            code: 200,
            message: 'success',
            data: {
                list,
                total,
                page,
                pageSize
            }
        }

    }   
}]