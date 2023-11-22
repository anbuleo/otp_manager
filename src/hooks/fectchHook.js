import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../common/Common.js";




let URL = import.meta.env.VITE_SERVER_DOMIN

axios.defaults.baseURL = URL


/** custom hook */
export  function useFetch(query){
    
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {
        

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true}));
                let user = await getUsername()


                const  { uername }  = !query ? await getUsername() : '';

                
                
               
                const { data, status } = !query ? await axios.get(`/api/user/${uername}`) : await axios.get(`/api/${query}`);
               console.log(user.username)
                if(status === 201 ||status ===200){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data.user, status: status }));
                   
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}