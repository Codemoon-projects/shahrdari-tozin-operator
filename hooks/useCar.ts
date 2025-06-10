import { useConfirm } from '@/hooks/common/useConfirm'
import { type CarType, Car_set } from '@/store/slices/Car'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetcher } from '@/lib/axios'
import { useEffect } from 'react'



export function useCar(){
        
    const { openConfirmModal } = useConfirm();
    const Car_data = useAppSelector(store => store.Car).data;
    const dispatch = useAppDispatch();
    const get_Car_data_ba8ab8 = async (confirm:boolean=false) =>  {
    
        // check for confirm when this function is opened
        if (confirm) {
        const isConfirmed = await openConfirmModal()
        if (!isConfirmed) { return false }
        }
        // get data and read from server
        const response = await fetcher.get('Car/ba8ab8/')
        const serverData = response.data.Car
        
        // set response of server on state
        dispatch(Car_set(serverData))
    };
    
    
    useEffect(() =>  {
    
        // get from server here
        get_Car_data_ba8ab8()
    }, [])
    return { Car_data, get_Car_data_ba8ab8 }
    }