export type ActionType = 'add' | 'edit' | 'delete' | 'view' |'export' | 'import'

export const usePage = () => {
    const action = ref<ActionType[]>([])

    const setAction = (value: ActionType[]) => {
        action.value = value
    }

    const isAction = (value: ActionType):boolean => {
        return action.value.includes(value)
    }
    
    const getData = () => {

    }
    
    const refresh = () => {
        
    }
    
    return {
        action,
        isAction,
        setAction,
        getData,
        refresh
    }
}