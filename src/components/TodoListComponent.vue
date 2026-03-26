<script setup lang="ts">
import { onMounted } from 'vue';
import TodoItemComponent from './TodoItemComponent.vue';
import { useTodoStore } from '@/stores/todo';

const { todos, loading, error, fetchTodos, deleteTodo } = useTodoStore();

onMounted(async () => {
    await fetchTodos();
});

async function deleteTodoFromEvent(id: string) {
    await deleteTodo(id);
}

</script>

<template>
    <main>
        <h2>Liste des tâches</h2>
        <p v-if="loading">
            En cours de chargement...
        </p>
        <p v-else>
        <ul>
            <TodoItemComponent v-for="todo in todos" :key="todo.id" :todo="todo" @delete="deleteTodoFromEvent" />
        </ul>
        </p>
        <p v-if="error">
            Erreur trouvé lors du chargement des données {{ error }}
        </p>
    </main>
</template>
