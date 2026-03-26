<script setup lang="ts">
import type { Todo } from '@/types/Todo';
import router from '@/router';

const props = defineProps<{
    todo: Todo
}>();

const emit = defineEmits<{
    (e: 'delete', id: string): void
}>();

function emitDelete() {
    emit('delete', props.todo.id);
}

function redirectToEdit() {
    //router.push(`/edit/${props.todo.id}`);
    router.push({
        name: 'edit',
        params: { id: props.todo.id }
    });
}

</script>

<template>
    <li :class="{ completed: todo.completed }">
        <span>{{ todo.text }}</span>
        <button @click.stop="redirectToEdit">
            ✎
        </button>
        <button @click.stop="emitDelete">
            ❌
        </button>
    </li>

</template>


<style scoped>
li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
}

li span {
    flex: 1;
}

.completed {
    text-decoration: line-through;
    opacity: 0.6;
}
</style>
