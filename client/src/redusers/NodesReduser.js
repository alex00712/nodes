export const nodesReduser = (state, action) => {
    switch (action.type) {
        case 'load-all':
            state = action.payload
            return state

        case 'delete':
            return state.filter(node => node._id !== action.payload)

        case 'update':
            return state.map(node=>{
                if(node._id === action.payload){
                    node.checked = true
                }
                return node
            })
        
        default:
            return state
    }
}