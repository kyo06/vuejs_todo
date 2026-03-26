<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import type { Todo } from '@/types/Todo';
import { onMounted } from 'vue';
import { TodoListValidator } from '@/types/Todo';

const { data: todos, error, loading, get } = useApi<Todo[]>();

onMounted(async () => {
  await get('http://localhost:3000/musics');
  /*
  //Avec Exception
  try {
    TodoListValidator.parse(todos.value);
    console.log('valid');
  } catch (e) {
    console.log(e);
  }
  */

  // Sans exception
  const resValidation = TodoListValidator.safeParse(todos.value);
  if (resValidation.success) {
    console.log('valid');
  } else {
    console.log(resValidation.error);
  }
});

</script>

<template>
  <main>
    <h2>Liste des tâches</h2>
    <p v-if="loading">
      En cours de chargement...
    </p>
    <p v-else>
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
    </ul>
    </p>
    <p v-if="error">
      Erreur trouvé lors du chargement des données {{ error }}
    </p>
  </main>
</template>
