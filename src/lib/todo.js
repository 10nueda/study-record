import { supabase } from "../utils/supabase";

export const getAllTodos = async () => {
    const response = await supabase.from("study-record").select("*");
    if (response.error) {
        throw new Error(response.error.message);
    }
    return response.data;
}

export const addTodo = async (contents, time) => {
    await supabase.from("study-record").insert({ contents: contents, time: time })
}

export const deleteTodo = async (id) => {
    await supabase.from("study-record").delete().eq("id", id)
}