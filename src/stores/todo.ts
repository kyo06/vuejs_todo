import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { TodoListValidator, TodoValidator, type Todo, type TodoList } from '@/types/Todo';
import { useApi } from '@/composables/useApi';

const URL_TODO_API = 'http://localhost:3000/todos'

//Store doit avoir un nom unique
export const useTodoStore = defineStore('todo.store', () => {
    //States
    const todos = ref<TodoList>([]);
    const todo = ref<Todo>({
        id: "-1",
        text: '',
        completed: false
    });
    const loading = ref(false);
    const error = ref<string | null>(null);

    //Getters (computed)
    const countActiveTodos = computed<number>(() => {
        return todos.value.filter(t => !t.completed).length
    })

    //Actions
    async function fetchTodos() {
        loading.value = true;
        error.value = null;
        try {
            const { data, get } = useApi<TodoList>();
            await get(URL_TODO_API)
            TodoListValidator.parse(data.value);
            todos.value = data.value as TodoList || [];
        } catch(err) {
            error.value = 'Error lors du chargement des todos : ' + err;
        } finally {
            loading.value = false;
        }
    }

    async function fetchOne(id: string) {
        loading.value = true;
        error.value = null;
        try {
            const { data, get } = useApi<Todo>();
            await get(`${URL_TODO_API}/${id}`)
            todo.value = data.value as Todo;
        } catch(err) {
            error.value = `Error lors du chargement du todo id -> ${id} : ` + err;
        } finally {
            loading.value = false;
        }
    }

    // async function createTodo(newTodo: Omit<Todo, "id">) {
    async function createTodo(newTodo: Pick<Todo, "text" | "completed">) {
        loading.value = true;
        error.value = null;
        try {
            // TodoValidator.parse(newTodo);
            const { post } = useApi<TodoList>();
            await post(URL_TODO_API, newTodo);         
        } catch(err) {
            error.value = 'Error lors de la création du todo : ' + err;
        } finally {
            loading.value = false;
        }
    }

    async function modifyTodo(id: string, newTodo: Todo) {
        loading.value = true;
        error.value = null;
        try {
            // TodoValidator.parse(newTodo);
            const { put } = useApi<TodoList>();
            await put(`${URL_TODO_API}/${id}`, newTodo);         
        } catch(err) {
            error.value = 'Error lors de la modification du todo : ' + err;
        } finally {
            loading.value = false;
        }
    }

    async function deleteTodo(id: string) {
        loading.value = true;
        error.value = null;
        try {
            const { del } = useApi<string>();
            await del(`${URL_TODO_API}/${id}`)
            await fetchTodos();
        } catch(err) {
            error.value = 'Error lors de la suppression de todo';
        } finally {
            loading.value = false;
        }
    }

    return {
        todos,
        todo,
        loading,
        error,
        countActiveTodos,
        fetchTodos,
        fetchOne,
        createTodo,
        modifyTodo,
        deleteTodo,
    }

});