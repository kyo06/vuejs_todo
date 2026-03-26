import * as z from 'zod';

/*
export interface Todo {
    id: number
    text: string
    completed: boolean
}
*/

export const TodoValidator = z.object({
    id: z.string(),
    text: z.string().min(2),
    completed: z.boolean() // .optional() --> completed?: boolean
})

// equivalent à l'interface Todo
export type Todo = z.infer<typeof TodoValidator>;


export const TodoListValidator = z.array(TodoValidator);
export type TodoList = z.infer<typeof TodoListValidator>;