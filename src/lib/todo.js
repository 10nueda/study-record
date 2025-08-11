import { supabase } from "../utils/supabase";

export async function GetAllTodos(){
    const response = await supabase.from("study-record").select("*");
    if(response.error){
        throw new Error(response.error.message);
    }
    return response.data;
}