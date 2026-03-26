<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

import { useTodoStore } from '@/stores/todo';
import type { Todo } from '@/types/Todo';
import router from '@/router';

const newTodo = ref<Todo>({
    id: '-1',
    text: '',
    completed: false
})

const store = useTodoStore();
// Utiliser storeToRefs pour rendre les states en ref
// Même s'ils ont été déclaré ref dans la store
const { loading, error } = storeToRefs(store);

async function addTodo() {
    await store.createTodo(newTodo.value);
    newTodo.value.text = '';
    router.push('/');
}

</script>

<template>
    <h1>Ajouter une tâche</h1>

    <form @submit.prevent="addTodo">
        <input v-model="newTodo.text" type="text" placeholder="Ajouter une tâche..." required />
        <button type="submit" :disabled="loading">
            {{ loading ? 'Ajout...' : 'Ajouter' }}
        </button>
    </form>

</template>



<style scoped>
.container {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
}

h1 {
    text-align: center;
    color: #333;
}

form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

input {
    flex: 1;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover:not(:disabled) {
    background-color: #45a049;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.error {
    color: #ff5722;
    text-align: center;
    margin-bottom: 20px;
}

.navigation {
    text-align: center;
    margin-top: 20px;
}

.navigation a {
    color: #4CAF50;
    text-decoration: none;
}

.navigation a:hover {
    text-decoration: underline;
}
</style>
