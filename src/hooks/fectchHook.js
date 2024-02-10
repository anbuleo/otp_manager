import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../common/Common.js";




let URL = import.meta.env.VITE_SERVER_DOMIN

axios.defaults.baseURL = URL


/** custom hook */
export default  function useFetch(query){
    
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })
    console.log(getData)
    useEffect(() => {
        

        const fetchData = async () => {
            if(query){
                console.log(query)
                let user = await getUsername()
                const res =  await axios.get(`/api/${query}`);
                const { data, status } =  await axios.get(`/api/${query}`);
               console.log(res)
                if(status === 201 ||status ===200){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data.user, status: status }));
                   
                }

                setData(prev => ({ ...prev, isLoading: false}));
            }
           

            try {
                // setData(prev => ({ ...prev, isLoading: true}));

                let user = await getUsername()
                console.log(user)

                const  { uername }  = !query ? await getUsername() : '';

                
                
               
                const { data, status } = !query ? await axios.get(`/api/user/${uername}`) : await axios.get(`/api/${query}`);
              console.log(data,uername)
                if(status === 201 ||status ===200){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data.user, status: status }));
                   
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                console.log(error)
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

        
    }, [query]);

    return [getData, setData];
}