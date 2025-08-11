import { supabase } from "../utils/supabase";

export async function GetAllTodos() {
    const response = await supabase.from("study-record").select("*");
    if (response.error) {
        throw new Error(response.error.message);
    }
    return response.data;
}

export const addTodo = async (title, time) => {
    await supabase.from("study-record").insert({ contents: title, time: time })
}

export const deleteTodo = async (id) => {
    await supabase.from("study-record").delete().eq("id", id)
}