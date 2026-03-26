<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '@/stores/todo'
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();

//Le pathVariable id de edit
const id = route.params.id as string;

const store = useTodoStore();
// Utiliser storeToRefs pour rendre les states en ref
// Même s'ils ont été déclaré ref dans la store
const { todo: newTodo, loading, error } = storeToRefs(store);

onMounted(() => {
    if (id) {
        store.fetchOne(id);
    }
});

async function addOrEditTodo() {
    if (!id) {
        //Ajout
        await store.createTodo({ text: newTodo.value.text, completed: false });
    } else {
        await store.modifyTodo(id, newTodo.value);
    }
    newTodo.value.text = '';
    router.push('/');
}

</script>

<template>
    <h1 v-if="!id">Ajouter une tâche</h1>
    <h1 v-if="id">Modifier la tâche</h1>

    <form @submit.prevent="addOrEditTodo">
        <input v-model="newTodo.text" type="text" placeholder="Remplir" required />
        <button type="submit" :disabled="loading">
            {{ loading ? 'En cours...' : !id ? 'Ajouter' : 'Modifier' }}
        </button>
    </form>
    <div v-if="error">{{ error }}</div>

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
