import { type ActionType } from '@/store/slices/Action'



interface ActionProps{data: ActionType;
}

export default function Action_712daa_list_item({data}: ActionProps){
        
    const {name} = data
    return (<div >
    
    <p >
    
    { name }
    </p>
    </div>)
    }