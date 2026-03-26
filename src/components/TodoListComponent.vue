<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import TodoItemComponent from './TodoItemComponent.vue';
import { useTodoStore } from '@/stores/todo';

const store = useTodoStore();
// Utiliser storeToRefs pour rendre les states en ref
// Même s'ils ont été déclaré ref dans la store
const { todos, loading, error } = storeToRefs(store);

onMounted(() => {
    store.fetchTodos();
});

async function deleteTodoFromEvent(id: string) {
    await store.deleteTodo(id);
}

</script>

<template>
    <main>
        <h2>Liste des tâches</h2>
        <p v-if="loading">
            En cours de chargement...
        </p>
        <ul v-if="!loading">
            <TodoItemComponent v-for="todo in todos" :key="todo.id" :todo="todo" @delete="deleteTodoFromEvent" />
        </ul>
        <p v-if="error">
            {{ error }}
        </p>
    </main>
</template>
