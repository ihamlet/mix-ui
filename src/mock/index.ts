import Mock from 'mockjs'
import user from './user'
const mocks = [...user]
//设置延时时间
Mock.setup({
    timeout: '300-600',
})

type MockParams = {
    type: 'post' | 'get' | string,
    url: string,
    response: (option: any) => any
}

export const mockXHR = () => {
    let i: MockParams
    for (i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || 'get', i.response);
    }
}