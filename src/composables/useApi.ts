import { ref } from 'vue';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export function useApi<TResponse = any, TBody = any>() {
    const data = ref<TResponse|null>(null);
    const error = ref<string|null>(null);
    const loading = ref<boolean>(false);

    async function handleRequest(
        url: string,
        method: HTTPMethod,
        body?: TBody
    ) {
        loading.value = true;
        error.value = null;
       
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: body ? JSON.stringify(body): undefined
            });

            // Si Code de retour HTTP != 2XX
            if(!res.ok) {
                throw new Error(`Error: es.status`);
            }

            const dataJson = await res.json();
            data.value = dataJson;

        } catch(error: any) {
            error.value = error.message || 'Unknown Error';
            return null;
        } finally {
            loading.value = false;
        }
    }

    // Action Crud
    const get = (url: string) => handleRequest(url, "GET");
    const post = (url: string, body: TBody) => handleRequest(url, "POST", body);
    const put = (url: string, body: TBody) => handleRequest(url, "PUT", body);
    const del = (url: string) => handleRequest(url, "DELETE");
    

    return {
        data,
        error,
        loading,
        get,
        post,
        put,
        del //car delete mot réservé
    }
}


/*
const { data, error, loading, get } = useApi<Todo[]>();

get('/todos');

data.value // remplie


const { data, error, post } = useApi<Todo, Todo>();

post('/todos', {
    id: 100,
    
})
*/